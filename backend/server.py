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

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
ADMIN_KEY = os.environ.get('ADMIN_KEY', '')

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
