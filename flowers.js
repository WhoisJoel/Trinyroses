

'use strict';


const FLOWER_DATA = [
  { id: 'fc',  x: 210, y: 148, size: 'large',   petals: 8, z: 10, sway: 'sway-a', delay: 0.00 },
  { id: 'fl1', x: 115, y: 205, size: 'medium',  petals: 8, z: 8,  sway: 'sway-b', delay: 0.12 },
  { id: 'fr1', x: 305, y: 205, size: 'medium',  petals: 8, z: 8,  sway: 'sway-c', delay: 0.22 },
  { id: 'fl2', x:  52, y: 262, size: 'smedium', petals: 8, z: 6,  sway: 'sway-c', delay: 0.34 },
  { id: 'fr2', x: 368, y: 262, size: 'smedium', petals: 8, z: 6,  sway: 'sway-a', delay: 0.44 },
  { id: 'fb1', x: 162, y:  85, size: 'small',   petals: 7, z: 4,  sway: 'sway-b', delay: 0.56 },
  { id: 'fb2', x: 258, y:  85, size: 'small',   petals: 7, z: 4,  sway: 'sway-c', delay: 0.66 },
];

const RIBBON_X = 210;
const RIBBON_Y = 382;

const STEM_CURVES = [
  { to: [210, 168], cp: [210, 295] },
  { to: [115, 225], cp: [162, 318] },
  { to: [305, 225], cp: [258, 318] },
  { to: [ 52, 280], cp: [128, 348] },
  { to: [368, 280], cp: [292, 348] },
  { to: [162, 102], cp: [190, 282] },
  { to: [258, 102], cp: [232, 282] },
];

const LEAVES = [
  { cx: 148, cy: 325, rx: 24, ry: 9,  angle: -38 },
  { cx: 272, cy: 320, rx: 24, ry: 9,  angle:  38 },
  { cx: 108, cy: 290, rx: 19, ry: 7,  angle: -28 },
  { cx: 312, cy: 285, rx: 19, ry: 7,  angle:  28 },
  { cx: 172, cy: 262, rx: 16, ry: 6,  angle: -22 },
  { cx: 248, cy: 265, rx: 16, ry: 6,  angle:  22 },
];


function buildFlowers() {
  const bouquet = document.getElementById('bouquet');

  FLOWER_DATA.forEach(fl => {
    const div = document.createElement('div');
    div.className = `flower ${fl.size}`;
    div.id = fl.id;

    div.style.left   = `${fl.x}px`;
    div.style.top    = `${fl.y}px`;
    div.style.zIndex = fl.z;

    const swayDuration = (3.2 + Math.random() * 1.8).toFixed(2);
    const swayDelay    = (fl.delay + 0.85).toFixed(2);

    div.style.animationName           = `bloom-in, ${fl.sway}`;
    div.style.animationDuration       = `0.75s, ${swayDuration}s`;
    div.style.animationDelay          = `${fl.delay}s, ${swayDelay}s`;
    div.style.animationFillMode       = 'both, none';
    div.style.animationTimingFunction = 'cubic-bezier(0.175,0.885,0.32,1.275), ease-in-out';
    div.style.animationIterationCount = '1, infinite';

    const angleStep = 360 / fl.petals;
    for (let i = 0; i < fl.petals; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.transform = `rotate(${i * angleStep}deg)`;
      div.appendChild(petal);
    }

    const center = document.createElement('div');
    center.className = 'flower-center';
    div.appendChild(center);

    bouquet.appendChild(div);
  });
}

function buildStems() {
  const NS  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'stems-svg');
  svg.setAttribute('viewBox', '0 0 420 500');
  svg.setAttribute('xmlns', NS);
  svg.setAttribute('aria-hidden', 'true');

  STEM_CURVES.forEach((s, i) => {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('class', 'stem-path');
    path.setAttribute('d',
      `M${RIBBON_X},${RIBBON_Y} Q${s.cp[0]},${s.cp[1]} ${s.to[0]},${s.to[1]}`
    );
    const w = i < 3 ? 3.2 : i < 5 ? 2.6 : 2.2;
    path.setAttribute('stroke-width', w);
    svg.appendChild(path);
  });

  LEAVES.forEach(l => {
    const ellipse = document.createElementNS(NS, 'ellipse');
    ellipse.setAttribute('class', 'leaf-shape');
    ellipse.setAttribute('cx', l.cx);
    ellipse.setAttribute('cy', l.cy);
    ellipse.setAttribute('rx', l.rx);
    ellipse.setAttribute('ry', l.ry);
    ellipse.setAttribute('transform', `rotate(${l.angle},${l.cx},${l.cy})`);

    const vein = document.createElementNS(NS, 'line');
    vein.setAttribute('x1', l.cx);
    vein.setAttribute('y1', l.cy - l.rx * 0.6);
    vein.setAttribute('x2', l.cx);
    vein.setAttribute('y2', l.cy + l.rx * 0.6);
    vein.setAttribute('stroke', 'rgba(100,180,80,0.35)');
    vein.setAttribute('stroke-width', '0.8');
    vein.setAttribute('transform', `rotate(${l.angle},${l.cx},${l.cy})`);

    svg.appendChild(ellipse);
    svg.appendChild(vein);
  });

  const bouquet = document.getElementById('bouquet');
  bouquet.insertBefore(svg, bouquet.firstChild.nextSibling);
}



function buildRibbon() {
  const wrap = document.createElement('div');
  wrap.className = 'ribbon-wrap';

  wrap.innerHTML = `
    <div class="ribbon-bow">
      <div class="bow-loop bow-left"></div>
      <div class="bow-knot"></div>
      <div class="bow-loop bow-right"></div>
    </div>
    <div class="ribbon-band"></div>
    <div class="ribbon-tails">
      <div class="ribbon-tail left"></div>
      <div class="ribbon-tail right"></div>
    </div>
  `;

  document.getElementById('bouquet').appendChild(wrap);
}



function buildCardOrnaments() {
  const card = document.querySelector('.message-card');
  ['tl', 'tr', 'bl', 'br'].forEach(pos => {
    const span = document.createElement('span');
    span.className = `corner-mark ${pos}`;
    span.setAttribute('aria-hidden', 'true');
    span.textContent = '✦';
    card.appendChild(span);
  });
}


const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
let W = 0, H = 0;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2× for performance
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}



class FallingPetal {
  constructor(isInitial = false) {
    this._init(isInitial);
  }

  _init(scattered = false) {
    this.x         = Math.random() * W;
    this.y         = scattered ? Math.random() * H : -25;
    this.vx        = (Math.random() - 0.5) * 0.9;
    this.vy        = 0.55 + Math.random() * 1.1;
    this.rotation  = Math.random() * Math.PI * 2;
    this.rotSpeed  = (Math.random() - 0.5) * 0.055;
    this.swing     = Math.random() * Math.PI * 2;
    this.swingAmt  = 0.4 + Math.random() * 0.5;
    this.swingSpd  = 0.018 + Math.random() * 0.018;
    this.w         = 7 + Math.random() * 9;
    this.h         = this.w * (1.75 + Math.random() * 0.5);
    this.opacity   = 0.35 + Math.random() * 0.45;
    this.hue       = 42 + Math.random() * 18;   // dorados
    this.sat       = 88 + Math.random() * 12;
    this.lit       = 58 + Math.random() * 28;
  }

  update() {
    this.swing  += this.swingSpd;
    this.x      += this.vx + Math.sin(this.swing) * this.swingAmt;
    this.y      += this.vy;
    this.rotation += this.rotSpeed;
    if (this.y > H + 35) this._init(false);
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;

    const grad = ctx.createRadialGradient(0, -this.h * 0.2, 0, 0, 0, this.h * 0.65);
    grad.addColorStop(0,   `hsla(${this.hue + 18}, ${this.sat}%, ${Math.min(this.lit + 18, 95)}%, 1)`);
    grad.addColorStop(0.55,`hsla(${this.hue},      ${this.sat}%, ${this.lit}%, 1)`);
    grad.addColorStop(1,   `hsla(${this.hue - 12}, ${this.sat - 8}%, ${this.lit - 18}%, 0.7)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.w / 2, this.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}



class Sparkle {
  constructor() {
    this._init();
  }

  _init() {
    this.x       = Math.random() * W;
    this.y       = Math.random() * H;
    this.size    = 0.8 + Math.random() * 2.8;
    this.life    = 0;
    this.maxLife = 55 + Math.random() * 90;
    this.hue     = 45 + Math.random() * 20;
    this.drift   = (Math.random() - 0.5) * 0.4;
    this.rise    = -(0.1 + Math.random() * 0.25);
  }

  update() {
    this.life++;
    this.x += this.drift;
    this.y += this.rise;
    if (this.life >= this.maxLife) this._init();
  }

  draw() {
    const t = this.life / this.maxLife;
    const alpha = Math.sin(t * Math.PI) * 0.9;
    const r     = this.size * (0.3 + Math.sin(t * Math.PI) * 0.7);

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    const pts = 4;
    for (let i = 0; i < pts; i++) {
      const a  = (i * Math.PI * 2) / pts;
      const ai = a + Math.PI / pts;
      const xo = Math.cos(a) * r;
      const yo = Math.sin(a) * r;
      const xi = Math.cos(ai) * r * 0.22;
      const yi = Math.sin(ai) * r * 0.22;
      if (i === 0) ctx.moveTo(xo, yo); else ctx.lineTo(xo, yo);
      ctx.lineTo(xi, yi);
    }
    ctx.closePath();

    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    g.addColorStop(0,   `hsla(${this.hue + 15}, 100%, 95%, 1)`);
    g.addColorStop(1,   `hsla(${this.hue},      100%, 75%, 0)`);
    ctx.fillStyle = g;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 80%, 0.08)`;
    ctx.fill();

    ctx.restore();
  }
}



class DustParticle {
  constructor() {
    this._init();
  }

  _init() {
    this.x       = Math.random() * W;
    this.y       = Math.random() * H;
    this.r       = 1 + Math.random() * 2;
    this.life    = 0;
    this.maxLife = 80 + Math.random() * 120;
    this.vx      = (Math.random() - 0.5) * 0.3;
    this.vy      = -(0.05 + Math.random() * 0.2);
    this.hue     = 50 + Math.random() * 15;
  }

  update() {
    this.life++;
    this.x += this.vx;
    this.y += this.vy;
    if (this.life >= this.maxLife || this.y < -10) this._init();
  }

  draw() {
    const t = this.life / this.maxLife;
    const alpha = Math.sin(t * Math.PI) * 0.4;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 95%, 78%, 1)`;
    ctx.fill();
    ctx.restore();
  }
}



let fallingPetals = [];
let sparkles      = [];
let dustParticles = [];

function initParticles() {
  fallingPetals = Array.from({ length: 22 }, () => new FallingPetal(true));
  sparkles      = Array.from({ length: 28 }, () => new Sparkle());
  dustParticles = Array.from({ length: 35 }, () => new DustParticle());
}



function animate() {
  ctx.clearRect(0, 0, W, H);

  dustParticles.forEach(p => { p.update(); p.draw(); });
  fallingPetals.forEach(p => { p.update(); p.draw(); });
  sparkles.forEach(s      => { s.update(); s.draw(); });

  requestAnimationFrame(animate);
}


window.addEventListener('resize', resizeCanvas);

document.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();

  buildFlowers();
  buildStems();
  buildRibbon();
  buildCardOrnaments();

  initParticles();
  animate();
});