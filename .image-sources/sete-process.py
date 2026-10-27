from PIL import Image
import numpy as np
from rembg import remove
import io

OUT = "/app/frontend/public/assets"
SRC = "/app/.image-sources"
TMP = "/app/.image-sources/sete-work"
W, H = 1200, 950

def log(*a):
    print(*a, flush=True)

import os
os.makedirs(TMP, exist_ok=True)

log("building gradients from existing scholar-b set")
gradients = []
for i in range(1, 6):
    ex = np.asarray(Image.open(f"{OUT}/scholar-b-{i}.jpg").convert("RGB"))
    col = ex[:, 8:9, :]
    gradients.append(np.repeat(col, W, axis=1).copy())
log("gradients ready")

def fit84(arr):
    im = Image.fromarray(arr)
    nw, nh = int(W*0.84), int(H*0.84)
    small = np.asarray(im.resize((nw, nh), Image.LANCZOS))
    out = np.empty((H, W, 3), dtype=np.uint8)
    ox, oy = (W-nw)//2, (H-nh)//2
    out[oy:oy+nh, ox:ox+nw] = small
    out[:oy, ox:ox+nw] = small[0:1, :]
    out[oy+nh:, ox:ox+nw] = small[-1:, :]
    out[oy:oy+nh, :ox] = small[:, 0:1]
    out[oy:oy+nh, ox+nw:] = small[:, -1:]
    out[:oy, :ox] = small[0, 0]; out[:oy, ox+nw:] = small[0, -1]
    out[oy+nh:, :ox] = small[-1, 0]; out[oy+nh:, ox+nw:] = small[-1, -1]
    return out

def cutout(path):
    with open(path, "rb") as f:
        res = remove(f.read())
    im = Image.open(io.BytesIO(res)).convert("RGBA")
    a = np.asarray(im)
    ys, xs = np.nonzero(a[..., 3] > 10)
    pad = 6
    x0, x1 = max(0, xs.min()-pad), min(a.shape[1], xs.max()+pad)
    y0, y1 = max(0, ys.min()-pad), min(a.shape[0], ys.max()+pad)
    return im.crop((x0, y0, x1, y1))

def composite(cut, panel, h_frac=0.90, w_frac=0.95):
    canvas = gradients[panel].copy()
    cw, ch = cut.size
    scale = min((H*h_frac)/ch, (W*w_frac)/cw)
    nw, nh = int(cw*scale), int(ch*scale)
    cut2 = cut.resize((nw, nh), Image.LANCZOS)
    cx = (W - nw)//2
    cy = H - nh
    base = Image.fromarray(canvas)
    base.paste(cut2, (cx, cy), cut2)
    return np.asarray(base)

jobs = [
    ("e1", f"{SRC}/e1.jpg",  0, 0.0, 0.0),
    ("e2", f"{SRC}/e2.jpg",  1, 0.92, 0.96),
    ("e3", f"{SRC}/e3.webp", 2, 0.93, 0.90),
    ("e4", f"{SRC}/e4.jpg",  3, 0.88, 0.90),
    ("e5", f"{SRC}/e5.jpg",  4, 0.92, 0.95),
]

c1 = cutout(jobs[0][1])
c1.save(f"{TMP}/e1_cut.png")
log("e1 cutout:", c1.size)

for name, path, panel, hf, wf in jobs[1:]:
    cut = cutout(path)
    cut.save(f"{TMP}/{name}_cut.png")
    arr = composite(cut, panel, hf, wf)
    Image.fromarray(fit84(arr)).save(f"{TMP}/{name}_final.jpg", quality=90)
    log(name, "done", cut.size)

log("ALL DONE")
