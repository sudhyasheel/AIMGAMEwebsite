from rembg import remove, new_session
from PIL import Image, ImageDraw
import numpy as np
from scipy import ndimage

PANEL = ["#E8490F", "#1E7A3C", "#F2A500", "#E8490F", "#1E7A3C"]
CANVAS = (1200, 950)

def hex2rgb(h):
    h = h.lstrip('#')
    return np.array([int(h[i:i+2], 16) for i in (0, 2, 4)], dtype=float)

def gradient_bg(size, hexcolor, cx=0.5, cy=0.42):
    # tight glow behind subject, EXACT panel colour well before edges (no colour band at outline)
    w, h = size
    base = hex2rgb(hexcolor)
    center = base + (255 - base) * 0.20
    yy, xx = np.mgrid[0:h, 0:w]
    t = np.clip(np.sqrt(((xx/w-cx)*2)**2 + ((yy/h-cy)*2)**2), 0, 1)
    t = np.clip((t - 0.30) / 0.45, 0, 1) ** 1.2   # glow pure to 30% radius, exact base from 75%
    img = (center * (1 - t[..., None]) + base * t[..., None]).astype(np.uint8)
    return Image.fromarray(img, 'RGB').convert('RGBA')

def clean_alpha(an, lo=18, min_island=2500):
    an = an.astype(float)
    an[an < lo] = 0
    lab, n = ndimage.label(an > 8)
    if n:
        sizes = ndimage.sum_labels(an > 8, lab, range(1, n+1))
        keep = {i+1 for i, s in enumerate(sizes) if s >= min_island}
        an[(~np.isin(lab, list(keep))) & (lab > 0)] = 0
    return an

def cut_a(img, sess, fg, bg, er):
    return remove(img, session=sess, alpha_matting=True,
                  alpha_matting_foreground_threshold=fg,
                  alpha_matting_background_threshold=bg,
                  alpha_matting_erode_size=er)

def finish(i, im, an, frac, out, lo_trim=20, pad=0):
    cut = Image.merge('RGBA', (*im.split(), Image.fromarray(an.astype(np.uint8))))
    ys, xs = np.where(an > lo_trim)
    y0, y1 = max(0, ys.min()-pad), min(an.shape[0], ys.max()+1+pad)
    x0, x1 = max(0, xs.min()-pad), min(an.shape[1], xs.max()+1+pad)
    cut = cut.crop((x0, y0, x1, y1))
    bg = gradient_bg(CANVAS, PANEL[i-1])
    scale = min(CANVAS[1]*frac / cut.height, CANVAS[0]*0.96 / cut.width)
    subj = cut.resize((max(1,int(cut.width*scale)), max(1,int(cut.height*scale))), Image.LANCZOS)
    bg.alpha_composite(subj, ((CANVAS[0]-subj.width)//2, CANVAS[1]-subj.height))
    bg.convert('RGB').save(out, quality=92)
    print(out.split('/')[-1], 'done')

sess_isnet = new_session('isnet-general-use')
sess_u2 = new_session('u2net')
OUT = '/app/frontend/public/assets'

# ---- SET A: tl-1..5 (original composition preserved, glow gradient bg) ----
for i in range(1, 6):
    im = Image.open(f'/app/.image-sources/seta/tl-{i}.jpg').convert('RGB')
    m = cut_a(im, sess_isnet, 240, 10, 6)
    a = clean_alpha(np.array(m.split()[-1]))
    bg = gradient_bg(im.size, PANEL[i-1])
    Image.alpha_composite(bg, Image.merge('RGBA', (*im.split(), Image.fromarray(a.astype(np.uint8))))).convert('RGB').save(f'{OUT}/tl-{i}.jpg', quality=92)
    print(f'tl-{i} done')

# ---- SET B: scholar-b ----
im = Image.open('/app/.image-sources/setb/b1.jpg').convert('RGB')
finish(1, im, clean_alpha(np.array(cut_a(im, sess_isnet, 245, 15, 11).split()[-1])), 0.92, f'{OUT}/scholar-b-1.jpg')

im = Image.open('/app/.image-sources/setb/b2.jpg').convert('RGB')
finish(2, im, clean_alpha(np.array(cut_a(im, sess_u2, 240, 10, 6).split()[-1])), 0.88, f'{OUT}/scholar-b-2.jpg', lo_trim=6, pad=10)

for i in (3, 4):
    im = Image.open(f'/app/.image-sources/setb/b{i}.jpg').convert('RGB')
    finish(i, im, clean_alpha(np.array(cut_a(im, sess_u2, 245, 15, 11).split()[-1])), 0.92, f'{OUT}/scholar-b-{i}.jpg')

im = Image.open('/app/.image-sources/setb/b5.jpg').convert('RGB')
finish(5, im, clean_alpha(np.array(cut_a(im, sess_isnet, 238, 8, 6).split()[-1]), lo=24), 0.94, f'{OUT}/scholar-b-5.jpg')

# ---- SET C: scholar-c ----
im = Image.open('/app/.image-sources/setc/c1.jpg').convert('RGB')
a = np.array(cut_a(im, sess_isnet, 245, 15, 11).split()[-1]).astype(float)
board = np.zeros_like(a); board[0:562, 452:914] = 255
a = np.maximum(a, board); a[:, 914:] = 0
finish(1, im, clean_alpha(a, min_island=800), 0.92, f'{OUT}/scholar-c-1.jpg')

im = Image.open('/app/.image-sources/setc/c2.webp').convert('RGB')
finish(2, im, clean_alpha(np.array(cut_a(im, sess_u2, 240, 10, 6).split()[-1])), 0.88, f'{OUT}/scholar-c-2.jpg', lo_trim=6, pad=10)

im = Image.open('/app/.image-sources/setc/c3.webp').convert('RGB')
finish(3, im, clean_alpha(np.array(cut_a(im, sess_u2, 245, 15, 11).split()[-1])), 0.92, f'{OUT}/scholar-c-3.jpg')

im = Image.open('/app/.image-sources/setc/c4.jpg').convert('RGB')
finish(4, im, clean_alpha(np.array(cut_a(im, sess_isnet, 240, 10, 8).split()[-1]), min_island=400), 0.92, f'{OUT}/scholar-c-4.jpg')

im = Image.open('/app/.image-sources/setc/c5b.png').convert('RGB')
a = np.array(cut_a(im, sess_isnet, 238, 8, 6).split()[-1]).astype(float)
cert = Image.new('L', im.size, 0)
ImageDraw.Draw(cert).polygon([(338,190),(493,200),(487,312),(332,302)], fill=255)
a = np.maximum(a, np.array(cert).astype(float))
finish(5, im, clean_alpha(a, lo=24, min_island=1200), 0.94, f'{OUT}/scholar-c-5.jpg')

# ---- SET D: scholar-d ----
im = Image.open('/app/.image-sources/setd/d1.jpg').convert('RGB')
a = np.array(cut_a(im, sess_isnet, 245, 15, 11).split()[-1]).astype(float)
board = np.zeros_like(a); board[0:775, 530:1192] = 255
a = np.maximum(a, board); a[:, 1198:] = 0
finish(1, im, clean_alpha(a, min_island=800), 0.92, f'{OUT}/scholar-d-1.jpg')

# d2: full pipeline incl. canvas-space paint cleanup, rebuilt on new gradient
im = Image.open('/app/.image-sources/setd/d2.webp').convert('RGB')
a = np.array(cut_a(im, sess_isnet, 240, 10, 8).split()[-1]).astype(float)
a[680:, :300] = 0
a[:, 1930:] = 0
a = np.clip((a - 90) * 2.2, 0, 255)
lab, n = ndimage.label(a > 8)
sizes = ndimage.sum_labels(a > 8, lab, range(1, n+1))
keep = {i+1 for i, s in enumerate(sizes) if s >= 1500}
a[(~np.isin(lab, list(keep))) & (lab > 0)] = 0
cut = Image.merge('RGBA', (*im.split(), Image.fromarray(a.astype(np.uint8))))
ys, xs = np.where(a > 20)
cut = cut.crop((xs.min(), ys.min(), xs.max()+1, ys.max()+1))
bg = gradient_bg(CANVAS, PANEL[1])
scale = min(CANVAS[1]*0.88 / cut.height, CANVAS[0]*0.96 / cut.width)
subj = cut.resize((max(1,int(cut.width*scale)), max(1,int(cut.height*scale))), Image.LANCZOS)
bg.alpha_composite(subj, ((CANVAS[0]-subj.width)//2, CANVAS[1]-subj.height))
comp = np.array(bg.convert('RGB'))
w, h = CANVAS
yy, xx = np.mgrid[0:h, 0:w]
t = np.clip(np.sqrt(((xx/w-0.5)*2)**2 + ((yy/h-0.42)*2)**2), 0, 1)
t = np.clip((t - 0.30) / 0.45, 0, 1) ** 1.2
base = hex2rgb(PANEL[1]); grad = ((base + (255-base)*0.20)*(1-t[..., None]) + base*t[..., None]).astype(np.uint8)
def paint(x0, y0, x1, y1):
    comp[y0:y1, x0:x1] = grad[y0:y1, x0:x1]
paint(575, 555, 648, 695)
paint(795, 555, 840, 604)
paint(590, 790, 735, 950)
paint(0, 760, 175, 950)
paint(640, 550, 762, 605)
paint(795, 550, 848, 607)
paint(698, 812, 736, 950)
mask = Image.new('L', (w, h), 0)
ImageDraw.Draw(mask).polygon([(635,550),(778,550),(778,612),(706,612),(706,708),(635,708)], fill=255)
mm = np.array(mask)[..., None] > 0
comp = np.where(mm, grad, comp)
Image.fromarray(comp).save(f'{OUT}/scholar-d-2.jpg', quality=92)
print('scholar-d-2 done')

im = Image.open('/app/.image-sources/setd/d3.webp').convert('RGB')
finish(3, im, clean_alpha(np.array(cut_a(im, sess_isnet, 245, 15, 11).split()[-1])), 0.92, f'{OUT}/scholar-d-3.jpg')

im = Image.open('/app/.image-sources/setd/d4.jpg').convert('RGB')
finish(4, im, clean_alpha(np.array(cut_a(im, sess_isnet, 240, 10, 8).split()[-1]), min_island=600), 0.92, f'{OUT}/scholar-d-4.jpg')

im = Image.open('/app/.image-sources/setd/d5.png').convert('RGB')
finish(5, im, clean_alpha(np.array(cut_a(im, sess_isnet, 238, 8, 6).split()[-1]), lo=24, min_island=600), 0.94, f'{OUT}/scholar-d-5.jpg')

print('ALL DONE')
