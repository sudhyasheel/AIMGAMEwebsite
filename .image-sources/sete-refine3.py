from PIL import Image, ImageDraw
import numpy as np
import os

OUT = "/app/frontend/public/assets"
TMP = "/app/.image-sources/sete-work"
W, H = 1200, 950

def log(*a): print(*a, flush=True)

def clean_gradient(i):
    strips = []
    for s in "bcd":
        ex = np.asarray(Image.open(f"{OUT}/scholar-{s}-{i}.jpg").convert("RGB")).astype(float)
        strips.append(ex[:, :90, :])
        strips.append(ex[:, -90:, :])
    allm = np.concatenate(strips, axis=1)  # H x 540 x 3
    col = np.median(allm, axis=1)
    k = 15
    pad = np.pad(col, ((k//2, k//2), (0, 0)), mode="edge")
    sm = np.stack([np.convolve(pad[:, c], np.ones(k)/k, mode="valid") for c in range(3)], axis=1)
    return np.repeat(sm[:, None, :].astype(np.uint8), W, axis=1).copy()

gradients = [clean_gradient(i) for i in range(1, 6)]
gm = Image.new('RGB', (5*140, 130), (255, 255, 255))
for i, g in enumerate(gradients):
    t = Image.fromarray(g); t.thumbnail((130, 120))
    gm.paste(t, (i*140+5, 5))
gm.save(f"{TMP}/gradients-check2.png")
log("gradients rebuilt (cross-set)")

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

def composite(cut, panel, h_frac, w_frac, flatten_bottom=0):
    canvas = gradients[panel].copy()
    cw, ch = cut.size
    scale = min((H*h_frac)/ch, (W*w_frac)/cw)
    nw, nh = int(cw*scale), int(ch*scale)
    cut2 = cut.resize((nw, nh), Image.LANCZOS)
    if flatten_bottom:
        a = np.asarray(cut2).copy()
        a[-flatten_bottom:, :, 3] = 0
        cut2 = Image.fromarray(a)
    base = Image.fromarray(canvas)
    base.paste(cut2, ((W-nw)//2, H-nh), cut2)
    return np.asarray(base)

def finish(name, cut, panel, hf, wf, fb=0):
    Image.fromarray(fit84(composite(cut, panel, hf, wf, fb))).save(f"{TMP}/{name}_final.jpg", quality=90)
    log(name, "done", cut.size)

# e2 from cleaned cut2 (already saved), panel 2 (idx 1)
e2 = Image.open(f"{TMP}/e2_cut3.png").convert("RGBA")
finish("e2", e2, 1, 0.92, 0.96, fb=4)

# e3 from cleaned cut3, flatten bottom rows (dupatta streaks)
e3 = Image.open(f"{TMP}/e3_cut3.png").convert("RGBA")
finish("e3", e3, 2, 0.93, 0.90, fb=8)

# e4, e5 from cut3
e4 = Image.open(f"{TMP}/e4_cut3.png").convert("RGBA")
finish("e4", e4, 3, 0.88, 0.90, fb=4)
e5 = Image.open(f"{TMP}/e5_cut3.png").convert("RGBA")
finish("e5", e5, 4, 0.92, 0.95, fb=4)

m = Image.new('RGB', (5*260, 220), (240, 240, 240))
for i, n in enumerate(["e1_final.jpg", "e2_final.jpg", "e3_final.jpg", "e4_final.jpg", "e5_final.jpg"]):
    t = Image.open(f"{TMP}/{n}"); t.thumbnail((250, 210))
    m.paste(t, (i*260+5, 5))
m.save(f"{TMP}/finals3.png")
log("ALL DONE")
