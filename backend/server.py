from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import razorpay

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
ADMIN_KEY = os.environ.get('ADMIN_KEY', '')

RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', '')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', '')
rzp = None
if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET:
    rzp = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

app = FastAPI()
api_router = APIRouter(prefix="/api")


class SubmissionIn(BaseModel):
    kind: str
    name: str
    email: str
    phone: Optional[str] = ""
    org: Optional[str] = ""
    message: Optional[str] = ""
    amount: Optional[float] = None
    meta: Optional[dict] = {}


class DonationOrderIn(BaseModel):
    amount: float
    name: str
    email: str
    phone: Optional[str] = ""


class DonationVerifyIn(BaseModel):
    order_id: str
    payment_id: str
    signature: str


@api_router.get("/")
async def root():
    return {"message": "AimGame API — Responsible Charity Society"}


@api_router.post("/submissions")
async def create_submission(payload: SubmissionIn):
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    doc["status"] = "new"
    await db.submissions.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


@api_router.get("/submissions")
async def list_submissions(x_admin_key: str = Header(default="")):
    if not ADMIN_KEY or x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Invalid admin key")
    docs = await db.submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    return {"submissions": docs}


@api_router.get("/donations/config")
async def donation_config():
    return {"enabled": rzp is not None}


@api_router.post("/donations/create-order")
async def create_donation_order(payload: DonationOrderIn):
    if not rzp:
        raise HTTPException(status_code=503, detail="payments_not_configured")
    if payload.amount < 1:
        raise HTTPException(status_code=400, detail="Invalid amount")
    order = rzp.order.create({
        "amount": int(round(payload.amount * 100)),
        "currency": "INR",
        "payment_capture": 1,
        "notes": {"name": payload.name, "email": payload.email, "purpose": "AimGame donation"},
    })
    doc = {
        "id": str(uuid.uuid4()),
        "kind": "donation",
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "org": "",
        "message": "",
        "amount": payload.amount,
        "meta": {"razorpay_order_id": order["id"], "simulated": False},
        "status": "created",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.submissions.insert_one(doc)
    return {"order_id": order["id"], "amount": order["amount"], "key_id": RAZORPAY_KEY_ID}


@api_router.post("/donations/verify")
async def verify_donation(payload: DonationVerifyIn):
    if not rzp:
        raise HTTPException(status_code=503, detail="payments_not_configured")
    try:
        rzp.utility.verify_payment_signature({
            "razorpay_order_id": payload.order_id,
            "razorpay_payment_id": payload.payment_id,
            "razorpay_signature": payload.signature,
        })
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid payment signature")
    await db.submissions.update_one(
        {"meta.razorpay_order_id": payload.order_id},
        {"$set": {"status": "paid", "meta.razorpay_payment_id": payload.payment_id}},
    )
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
