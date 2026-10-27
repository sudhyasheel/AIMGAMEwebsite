from PIL import Image, ImageDraw
import numpy as np
from rembg import remove, new_session
import io, os

OUT = "/app/frontend/public/assets"
SRC = "/app/.image-sources"
TMP = "/app/.image-sources/sete-work"
os.makedirs(TMP, exist_ok=True)
W, H = 1200, 950

def log(*a): print(*a, flush=True)

# ---------- clean gradients: per-row median of both margins ----------
def clean_gradient(i):
    ex = np.asarray(Image.open(f"{OUT}/scholar-b-{i}.jpg").convert("RGB")).astype(float)
    margins = np.concatenate([ex[:, :90, :], ex[:, -90:, :]], axis=1)  # H x 180 x 3
    col = np.median(margins, axis=1)  # H x 3
    # smooth vertically
    k = 15
    pad = np.pad(col, ((k//2, k//2), (0, 0)), mode="edge")
    sm = np.stack([np.convolve(pad[:, c], np.ones(k)/k, mode="valid") for c in range(3)], axis=1)
    return np.repeat(sm[:, None, :].astype(np.uint8), W, axis=1).copy()

gradients = [clean_gradient(i) for i in range(1, 6)]
gm = Image.new('RGB', (5*140, 130), (255, 255, 255))
for i, g in enumerate(gradients):
    t = Image.fromarray(g); t.thumbnail((130, 120))
    gm.paste(t, (i*140+5, 5))
gm.save(f"{TMP}/gradients-check.png")
log("gradients rebuilt")

sess = new_session("u2net")

def raw_cutout(path):
    im = Image.open(path).convert("RGB")
    im.thumbnail((1100, 1100))
    buf = io.BytesIO(); im.save(buf, format="PNG")
    return Image.open(io.BytesIO(remove(buf.getvalue(), session=sess))).convert("RGBA")

def tighten(im, pad=6):
    a = np.asarray(im)
    ys, xs = np.nonzero(a[..., 3] > 10)
    return im.crop((max(0, xs.min()-pad), max(0, ys.min()-pad),
                    min(a.shape[1], xs.max()+pad), min(a.shape[0], ys.max()+pad)))

def fit84(arr):
    im = Image.fromarray(arr)
    nw, nh = int(W*0.84), int(H*0.84)
    small = np.asarray(im.resize((nw, nh), Image.LANCZOS))
    out = np.empty((H, W, 3), dtype=np.uint8)
    ox, oy = (W-nw)//2, (H-nh)//2
    out[oy:oy+nh, ox:ox+nw] = small
    out[:oy, ox:ox+nw] = small[0:1, :]; out[oy+nh:, ox:ox+nw] = small[-1:, :]
    out[oy:oy+nh, :ox] = small[:, 0:1]; out[oy:oy+nh, ox+nw:] = small[:, -1:]
    out[:oy, :ox] = small[0, 0]; out[:oy, ox+nw:] = small[0, -1]
    out[oy+nh:, :ox] = small[-1, 0]; out[oy+nh:, ox+nw:] = small[-1, -1]
    return out

def composite(cut, panel, h_frac, w_frac):
    canvas = gradients[panel].copy()
    cw, ch = cut.size
    scale = min((H*h_frac)/ch, (W*w_frac)/cw)
    nw, nh = int(cw*scale), int(ch*scale)
    cut2 = cut.resize((nw, nh), Image.LANCZOS)
    base = Image.fromarray(canvas)
    base.paste(cut2, ((W-nw)//2, H-nh), cut2)
    return np.asarray(base)

def clear_polys(cut, polys):
    mask = Image.new("L", cut.size, 0)
    d = ImageDraw.Draw(mask)
    for p in polys:
        d.polygon(p, fill=255)
    a = np.asarray(cut).copy()
    a[..., 3] = np.where(np.asarray(mask) > 0, 0, a[..., 3])
    return Image.fromarray(a)

def finish(name, cut, panel, hf, wf):
    cut = tighten(cut)
    cut.save(f"{TMP}/{name}_cut3.png")
    Image.fromarray(fit84(composite(cut, panel, hf, wf))).save(f"{TMP}/{name}_final.jpg", quality=90)
    log(name, "done", cut.size)

# ---------- e2: guitar girl (from cleaned cut2 + sliver clears) ----------
e2 = Image.open(f"{TMP}/e2_cut2.png").convert("RGBA")
w2, h2 = e2.size
def S2(p): return [(int(x*w2/1027.0), int(y*h2/1088.0)) for x, y in p]
e2 = clear_polys(e2, [
    S2([(0, 505), (40, 505), (40, 600), (0, 600)]),            # left red strip
    S2([(740, 465), (810, 460), (815, 630), (745, 625)]),      # red cushion behind right elbow
    S2([(778, 630), (830, 630), (830, 690), (778, 690)]),      # light patch right of waist
])
finish("e2", e2, 1, 0.92, 0.96)

# ---------- e3: victory pose (tighten first, then clear stick) ----------
e3 = tighten(raw_cutout(f"{SRC}/e3.webp"))
w3, h3 = e3.size
e3 = clear_polys(e3, [
    [(int(w3*0.90), 0), (w3, 0), (w3, int(h3*0.38)), (int(w3*0.90), int(h3*0.38))],
])
finish("e3", e3, 2, 0.93, 0.90)

# ---------- e4: poster girl ----------
poster = Image.open(f"{SRC}/e4.jpg").convert("RGB")
crop = poster.crop((190, 145, 507, 720))
buf = io.BytesIO(); crop.save(buf, format="PNG")
e4 = Image.open(io.BytesIO(remove(buf.getvalue(), session=sess))).convert("RGBA")
a = np.asarray(e4).copy()
hh, ww = a.shape[:2]
R, G, B = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
yellowish = (R > 150) & (G > 120) & (B < 140) & (np.abs(R - G) < 90)
greenish = (G > 90) & (G > R + 25) & (G > B + 25)
region = np.zeros((hh, ww), dtype=bool)
region[:240, :160] = True
region[-40:, :] = True
kill = (yellowish | greenish) & region
a[..., 3] = np.where(kill, 0, a[..., 3])
finish("e4", Image.fromarray(a), 3, 0.88, 0.90)

# ---------- e5: graduate ----------
finish("e5", raw_cutout(f"{SRC}/e5.jpg"), 4, 0.92, 0.95)

# ---------- e1 scene (already fine, keep) ----------
log("e1 kept from previous run")

m = Image.new('RGB', (5*260, 220), (240, 240, 240))
for i, n in enumerate(["e1_final.jpg", "e2_final.jpg", "e3_final.jpg", "e4_final.jpg", "e5_final.jpg"]):
    t = Image.open(f"{TMP}/{n}"); t.thumbnail((250, 210))
    m.paste(t, (i*260+5, 5))
m.save(f"{TMP}/finals2.png")
log("ALL DONE")
