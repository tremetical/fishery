/*
 * A small, dependency-free confetti burst for pass moments. Fully
 * self-cleaning, honors prefers-reduced-motion, and pulls its colors from
 * the theme tokens so night mode celebrates in red like everything else.
 */

export function confetti(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const style = getComputedStyle(document.documentElement);
  const colors = ['--accent', '--info', '--caution', '--special']
    .map((v) => style.getPropertyValue(v).trim())
    .filter(Boolean);
  if (colors.length === 0) return;

  const canvas = document.createElement('canvas');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const W = window.innerWidth;
  const H = window.innerHeight;
  const N = 90;
  const parts = Array.from({ length: N }, () => ({
    x: W / 2 + (Math.random() - 0.5) * W * 0.3,
    y: H * 0.35,
    vx: (Math.random() - 0.5) * 9,
    vy: -6 - Math.random() * 7,
    w: 5 + Math.random() * 5,
    h: 3 + Math.random() * 4,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.35,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  const t0 = performance.now();
  const DURATION = 1500;

  const tick = (t: number) => {
    const elapsed = t - t0;
    ctx.clearRect(0, 0, W, H);
    const fade = Math.max(0, 1 - elapsed / DURATION);
    for (const p of parts) {
      p.vy += 0.28;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.globalAlpha = fade;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (elapsed < DURATION) requestAnimationFrame(tick);
    else canvas.remove();
  };
  requestAnimationFrame(tick);
}
