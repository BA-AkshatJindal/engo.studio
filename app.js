/* =============================================
   ENGO.STUDIO — app.js
   Landing Page Interactions & Canvas
   ============================================= */

// ── Typewriter effect ──
const lines = [
  { text: 'engo run --workspace forward-deployed', delay: 60 },
  { text: '✔ AI Copilot initialized', output: true },
  { text: 'engo preview --port 3000 --live', delay: 60 },
  { text: '⚡ Live preview at http://localhost:3000', output: true },
  { text: 'engo ship --env production', delay: 60 },
  { text: '🚀 Deployed in 4.2s', output: true },
];

let lineIndex = 0;
let charIndex  = 0;
let isTyping   = false;

const typedEl    = document.getElementById('typed-text');
const termBody   = document.getElementById('terminal-body');

function typeNextChar() {
  if (lineIndex >= lines.length) { lineIndex = 0; }
  const line = lines[lineIndex];

  if (line.output) {
    appendOutput(line.text);
    lineIndex++;
    setTimeout(typeNextChar, 700);
    return;
  }

  if (charIndex < line.text.length) {
    typedEl.textContent += line.text[charIndex];
    charIndex++;
    setTimeout(typeNextChar, line.delay || 70);
  } else {
    charIndex = 0;
    lineIndex++;
    setTimeout(() => {
      appendOutput('');
      typedEl.textContent = '';
      setTimeout(typeNextChar, 400);
    }, 400);
  }
}

function appendOutput(text) {
  if (text) {
    const div = document.createElement('div');
    div.className = 'terminal-output';
    div.textContent = text;
    termBody.insertBefore(div, termBody.lastElementChild);
  }
  // Keep only last 6 output lines
  const outputs = termBody.querySelectorAll('.terminal-output');
  if (outputs.length > 6) outputs[0].remove();
}

setTimeout(typeNextChar, 1200);

// ── Nav scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Scroll reveal ──
const revealEls = document.querySelectorAll(
  '.feature-card, .stat-card, .workflow-step, .stack-pill, .about-inner > *'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 6) * 60}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ── Toast ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ── Animated canvas background ──
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

let hue = 240;
const PARTICLES = [];
const COUNT     = 90;

for (let i = 0; i < COUNT; i++) {
  PARTICLES.push({
    x:  Math.random() * W,
    y:  Math.random() * H,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r:  Math.random() * 2.2 + 0.4,
  });
}

// Mouse interaction
const mouse = { x: W / 2, y: H / 2 };
document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function lerp(a, b, t) { return a + (b - a) * t; }

function drawFrame() {
  ctx.clearRect(0, 0, W, H);

  // Subtle gradient aurora
  const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 400);
  grad.addColorStop(0, `hsla(${hue}, 80%, 55%, 0.04)`);
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Connections
  for (let i = 0; i < PARTICLES.length; i++) {
    for (let j = i + 1; j < PARTICLES.length; j++) {
      const dx   = PARTICLES[i].x - PARTICLES[j].x;
      const dy   = PARTICLES[i].y - PARTICLES[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        const alpha = (1 - dist / 130) * 0.35;
        ctx.strokeStyle = `hsla(${hue}, 70%, 65%, ${alpha})`;
        ctx.lineWidth   = 0.6;
        ctx.beginPath();
        ctx.moveTo(PARTICLES[i].x, PARTICLES[i].y);
        ctx.lineTo(PARTICLES[j].x, PARTICLES[j].y);
        ctx.stroke();
      }
    }
  }

  // Dots
  for (const p of PARTICLES) {
    // Mouse repulsion
    const dx   = p.x - mouse.x;
    const dy   = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      p.vx += (dx / dist) * 0.08;
      p.vy += (dy / dist) * 0.08;
    }

    // Speed limit
    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (speed > 1.5) { p.vx *= 0.95; p.vy *= 0.95; }

    ctx.fillStyle = `hsla(${hue + 20}, 85%, 75%, 0.85)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  }

  // Slowly shift hue
  hue = (hue + 0.05) % 360;

  requestAnimationFrame(drawFrame);
}

drawFrame();
