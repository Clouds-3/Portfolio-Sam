/* ═══════════════════════════════════════════════
   PRAVEEN SAMUVEL — PORTFOLIO JAVASCRIPT
   js/main.js
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ── */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 800);
  });

  /* ── SET PHOTO FROM EMBEDDED DATA ── */
  const photoEl = document.getElementById('hero-photo');
  if (photoEl && typeof PHOTO_DATA !== 'undefined') {
    photoEl.src = PHOTO_DATA;
  }

  /* ══════════════════════════════════════════
     PARTICLE / NEURAL NETWORK CANVAS
  ══════════════════════════════════════════ */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const PARTICLE_COUNT = 100;
  const CONNECT_DIST   = 120;
  const MOUSE_DIST     = 180;

  class Particle {
    constructor() { this.reset(true); }
    reset(random = false) {
      this.x   = Math.random() * W;
      this.y   = random ? Math.random() * H : (Math.random() < 0.5 ? -5 : H + 5);
      this.vx  = (Math.random() - 0.5) * 0.5;
      this.vy  = (Math.random() - 0.5) * 0.5;
      this.r   = Math.random() * 1.6 + 0.4;
      this.a   = Math.random() * 0.5 + 0.15;
      this.hue = Math.random() < 0.7 ? 195 : (Math.random() < 0.5 ? 270 : 160);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue},100%,60%,${this.a})`;
      ctx.fill();
    }
  }

  const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  const mouse = { x: W / 2, y: H / 2 };
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < CONNECT_DIST) {
          const alpha = 0.14 * (1 - d / CONNECT_DIST);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
      const dm = Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y);
      if (dm < MOUSE_DIST) {
        const alpha = 0.28 * (1 - dm / MOUSE_DIST);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
        ctx.lineWidth = 0.9;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
  }
  animateCanvas();

  /* ══════════════════════════════════════════
     TYPING EFFECT
  ══════════════════════════════════════════ */
  const roles = [
    'Full Stack Developer',
    'Cloud Support & Administrator',
    'React.js Engineer',
    'PHP & CodeIgniter Dev',
    'Cyber Security Graduate',
    'MCA 2025 Passout'
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;
  const typedEl = document.getElementById('typed-role');

  function typeLoop() {
    const word = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = word.slice(0, ++charIdx);
      if (charIdx === word.length) { deleting = true; setTimeout(typeLoop, 1600); return; }
    } else {
      typedEl.textContent = word.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(typeLoop, deleting ? 55 : 95);
  }
  typeLoop();

  /* ══════════════════════════════════════════
     SCROLL REVEAL (IntersectionObserver)
  ══════════════════════════════════════════ */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // stagger children if data-stagger
        const children = e.target.querySelectorAll('[data-delay]');
        children.forEach(child => {
          child.style.transitionDelay = child.dataset.delay;
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => revealObserver.observe(el));

  /* ══════════════════════════════════════════
     SKILL BAR ANIMATION
  ══════════════════════════════════════════ */
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.bar-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 150);
        });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));

  /* ══════════════════════════════════════════
     COUNTER ANIMATION (stats)
  ══════════════════════════════════════════ */
  function animateCounter(el, target, suffix = '') {
    let count = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(interval);
    }, 40);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const counters = e.target.querySelectorAll('[data-count]');
        counters.forEach(c => {
          animateCounter(c, +c.dataset.count, c.dataset.suffix || '');
        });
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) counterObserver.observe(heroStats);

  /* ══════════════════════════════════════════
     3D TILT ON CARDS
  ══════════════════════════════════════════ */
  function addTilt(selector, intensity = 8) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
    });
  }
  addTilt('.project-card', 7);
  addTilt('.skill-card', 6);
  addTilt('.edu-card', 5);
  addTilt('.tip-card', 5);

  /* ══════════════════════════════════════════
     NAV — SCROLL BEHAVIOUR & ACTIVE LINK
  ══════════════════════════════════════════ */
  const nav = document.querySelector('nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // shrink nav
    nav.classList.toggle('scrolled', window.scrollY > 50);

    // active link highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  /* ══════════════════════════════════════════
     MOBILE HAMBURGER MENU
  ══════════════════════════════════════════ */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  hamburger?.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileLinks.forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

  /* ══════════════════════════════════════════
     CUSTOM CURSOR (desktop only)
  ══════════════════════════════════════════ */
  if (window.innerWidth > 768) {
    const dot  = document.createElement('div'); dot.className  = 'cursor-dot';
    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function cursorLoop() {
      requestAnimationFrame(cursorLoop);
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
    })();

    document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width  = '60px';
        ring.style.height = '60px';
        ring.style.borderColor = 'rgba(0,212,255,0.7)';
        dot.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width  = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(0,212,255,0.4)';
        dot.style.opacity = '1';
      });
    });
  }

  /* ══════════════════════════════════════════
     CONTACT FORM SUBMIT
  ══════════════════════════════════════════ */
  const submitBtn = document.getElementById('submit-btn');
  submitBtn?.addEventListener('click', () => {
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #06ffa5, #00d4ff)';
    submitBtn.style.color = '#04080f';
    setTimeout(() => {
      submitBtn.textContent = 'Send Message →';
      submitBtn.style.background = '';
      submitBtn.style.color = '';
    }, 3000);
  });

  /* ══════════════════════════════════════════
     EMPLOYEE / WORK ANIMATION (canvas overlay)
     Animated dev working at desk — right side
  ══════════════════════════════════════════ */
  const workCanvas = document.getElementById('work-canvas');
  if (workCanvas) {
    const wctx = workCanvas.getContext('2d');
    workCanvas.width  = 340;
    workCanvas.height = 260;

    let t = 0;
    const DARK  = '#0b1524';
    const CYAN  = '#00d4ff';
    const PURP  = '#7c3aed';
    const GREEN = '#06ffa5';
    const GOLD  = '#fbbf24';
    const DESK  = '#111d30';

    function drawWorkScene() {
      requestAnimationFrame(drawWorkScene);
      t += 0.03;
      wctx.clearRect(0, 0, 340, 260);

      /* ─ desk ─ */
      wctx.fillStyle = DESK;
      wctx.beginPath();
      wctx.roundRect(30, 180, 280, 14, 4);
      wctx.fill();
      // desk legs
      wctx.fillStyle = '#0c1525';
      wctx.fillRect(50,  194, 10, 50);
      wctx.fillRect(280, 194, 10, 50);

      /* ─ monitor ─ */
      wctx.fillStyle = '#070d1a';
      wctx.beginPath();
      wctx.roundRect(90, 80, 160, 100, 6);
      wctx.fill();
      wctx.strokeStyle = CYAN;
      wctx.lineWidth = 1.5;
      wctx.beginPath();
      wctx.roundRect(90, 80, 160, 100, 6);
      wctx.stroke();
      // monitor stand
      wctx.fillStyle = '#0a1322';
      wctx.fillRect(163, 180, 14, 6);
      wctx.fillRect(153, 184, 34, 4);

      /* ─ code lines on screen ─ */
      const lines = [
        { c: PURP, w: 30, x: 102 },
        { c: CYAN, w: 60, x: 102 },
        { c: GREEN,w: 45, x: 102 },
        { c: CYAN, w: 75, x: 102 },
        { c: PURP, w: 25, x: 102 },
        { c: GREEN,w: 55, x: 102 },
      ];
      lines.forEach((l, i) => {
        const y = 96 + i * 12;
        wctx.fillStyle = l.c + '60';
        wctx.beginPath();
        wctx.roundRect(l.x, y, l.w, 5, 2);
        wctx.fill();
        // animated highlight on current line
        if (Math.floor(t / 1) % lines.length === i) {
          wctx.fillStyle = l.c + 'cc';
          wctx.beginPath();
          wctx.roundRect(l.x, y, l.w * (0.4 + 0.6 * Math.abs(Math.sin(t * 2))), 5, 2);
          wctx.fill();
        }
      });
      // cursor blink on screen
      if (Math.floor(t * 2) % 2 === 0) {
        const ci = Math.floor(t / 1) % lines.length;
        wctx.fillStyle = CYAN;
        wctx.fillRect(102 + lines[ci].w * (0.4 + 0.6 * Math.abs(Math.sin(t * 2))), 96 + ci * 12, 3, 7);
      }

      /* ─ keyboard ─ */
      wctx.fillStyle = '#0a1322';
      wctx.beginPath();
      wctx.roundRect(115, 170, 110, 10, 3);
      wctx.fill();
      for (let k = 0; k < 10; k++) {
        wctx.fillStyle = k === Math.floor(t * 3) % 10 ? CYAN + '99' : '#1a2840';
        wctx.beginPath();
        wctx.roundRect(118 + k * 10, 172, 8, 6, 1);
        wctx.fill();
      }

      /* ─ coffee mug ─ */
      wctx.fillStyle = '#0a1322';
      wctx.beginPath();
      wctx.roundRect(58, 158, 22, 22, 3);
      wctx.fill();
      wctx.strokeStyle = GOLD + '88';
      wctx.lineWidth = 1;
      wctx.beginPath();
      wctx.roundRect(58, 158, 22, 22, 3);
      wctx.stroke();
      // mug handle
      wctx.beginPath();
      wctx.arc(83, 167, 6, -0.5, 0.5, false);
      wctx.lineWidth = 2;
      wctx.strokeStyle = '#1a2840';
      wctx.stroke();
      // steam
      for (let s = 0; s < 3; s++) {
        const sx = 63 + s * 6;
        const sy = 155 + Math.sin(t * 2 + s) * 3;
        wctx.beginPath();
        wctx.moveTo(sx, sy);
        wctx.bezierCurveTo(sx - 3, sy - 6, sx + 3, sy - 10, sx, sy - 14);
        wctx.strokeStyle = `rgba(255,255,255,${0.15 + 0.1 * Math.sin(t + s)})`;
        wctx.lineWidth = 1;
        wctx.stroke();
      }

      /* ─ person (stick figure with movement) ─ */
      const bodyX = 170;
      const headY = 130;
      const blink = Math.floor(t * 1.5) % 8 === 0;
      const typing = Math.abs(Math.sin(t * 4)) > 0.7;

      // head
      wctx.beginPath();
      wctx.arc(bodyX, headY - 30, 18, 0, Math.PI * 2);
      wctx.fillStyle = '#c8a882';
      wctx.fill();
      // hair
      wctx.fillStyle = '#1a0a00';
      wctx.beginPath();
      wctx.ellipse(bodyX, headY - 43, 18, 9, 0, Math.PI, 0);
      wctx.fill();
      // eyes
      wctx.fillStyle = '#1a1a1a';
      if (!blink) {
        wctx.beginPath(); wctx.arc(bodyX - 6, headY - 30, 2, 0, Math.PI * 2); wctx.fill();
        wctx.beginPath(); wctx.arc(bodyX + 6, headY - 30, 2, 0, Math.PI * 2); wctx.fill();
      } else {
        wctx.fillRect(bodyX - 8, headY - 31, 5, 1);
        wctx.fillRect(bodyX + 4, headY - 31, 5, 1);
      }
      // slight smile
      wctx.beginPath();
      wctx.arc(bodyX, headY - 24, 5, 0.2, Math.PI - 0.2);
      wctx.strokeStyle = '#8b6a4a';
      wctx.lineWidth = 1;
      wctx.stroke();

      // neck
      wctx.fillStyle = '#c8a882';
      wctx.fillRect(bodyX - 5, headY - 12, 10, 12);

      // body (shirt — black like his photo)
      wctx.fillStyle = '#1a1a2e';
      wctx.beginPath();
      wctx.roundRect(bodyX - 20, headY, 40, 50, 4);
      wctx.fill();
      // collar
      wctx.fillStyle = '#111128';
      wctx.beginPath();
      wctx.moveTo(bodyX - 10, headY);
      wctx.lineTo(bodyX, headY + 12);
      wctx.lineTo(bodyX + 10, headY);
      wctx.fill();

      // arms
      const armY = headY + 15;
      const armSwing = typing ? Math.sin(t * 8) * 4 : 0;
      // left arm
      wctx.beginPath();
      wctx.moveTo(bodyX - 20, armY);
      wctx.quadraticCurveTo(bodyX - 38, armY + 20, bodyX - 30 + armSwing, headY + 60);
      wctx.strokeStyle = '#1a1a2e';
      wctx.lineWidth = 8;
      wctx.lineCap = 'round';
      wctx.stroke();
      // right arm
      wctx.beginPath();
      wctx.moveTo(bodyX + 20, armY);
      wctx.quadraticCurveTo(bodyX + 38, armY + 20, bodyX + 30 - armSwing, headY + 60);
      wctx.strokeStyle = '#1a1a2e';
      wctx.stroke();

      // hands
      wctx.fillStyle = '#c8a882';
      wctx.beginPath(); wctx.arc(bodyX - 30 + armSwing, headY + 60, 5, 0, Math.PI * 2); wctx.fill();
      wctx.beginPath(); wctx.arc(bodyX + 30 - armSwing, headY + 60, 5, 0, Math.PI * 2); wctx.fill();

      /* ─ floating code snippets ─ */
      const snippets = ['<div/>', 'const', 'async', '=>', '{}', 'useState', 'fetch()'];
      snippets.forEach((s, i) => {
        const angle = (i / snippets.length) * Math.PI * 2 + t * 0.3;
        const radius = 120 + Math.sin(t + i) * 10;
        const sx = 170 + Math.cos(angle) * radius;
        const sy = 120 + Math.sin(angle) * 70;
        const alpha = 0.3 + 0.2 * Math.sin(t + i);
        if (sx > 5 && sx < 335 && sy > 5 && sy < 255) {
          wctx.font = '9px Fira Code, monospace';
          wctx.fillStyle = i % 2 === 0 ? `rgba(0,212,255,${alpha})` : `rgba(6,255,165,${alpha})`;
          wctx.fillText(s, sx, sy);
        }
      });

      /* ─ WiFi / signal ─ */
      for (let w = 0; w < 3; w++) {
        const wa = (t * 2) % (Math.PI * 2);
        const wr = 8 + w * 7;
        wctx.beginPath();
        wctx.arc(305, 100, wr, Math.PI * 1.1 + wa * 0.05, Math.PI * 1.9 - wa * 0.05);
        wctx.strokeStyle = `rgba(0,212,255,${0.5 - w * 0.12})`;
        wctx.lineWidth = 1.5;
        wctx.stroke();
      }
      wctx.fillStyle = CYAN;
      wctx.beginPath();
      wctx.arc(305, 107, 2, 0, Math.PI * 2);
      wctx.fill();

      /* ─ frame label ─ */
      wctx.font = 'bold 9px Space Grotesk, sans-serif';
      wctx.fillStyle = 'rgba(0,212,255,0.4)';
      wctx.fillText('// dev mode: on', 90, 76);
    }
    drawWorkScene();
  }

  /* ══════════════════════════════════════════
     SMOOTH SCROLL for anchor links
  ══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
