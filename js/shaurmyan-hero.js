
/* ============================================================================
   ShaurmYAN — front-end behaviour
   Modules: nav / drawer / spotlight (canvas mask) / atmosphere / scroll / index
   Every loop is rAF driven, pauses off-screen, and honours reduced motion.
   ============================================================================ */
(() => {
  'use strict';

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp  = (a, b, t) => a + (b - a) * t;

  if (window.lucide) window.lucide.createIcons();

  /* ---------- entrance ---------------------------------------------------- */
  const live = () => document.body.classList.add('is-live');
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => requestAnimationFrame(live));
    setTimeout(live, 900); // never wait on a slow font
  } else { requestAnimationFrame(live); }

  /* ---------- nav + drawer ------------------------------------------------ */
  const nav = document.querySelector('.nav');
  const drawer = document.getElementById('drawer');
  const main = document.querySelector('main');
  let lastFocus = null;

  const openDrawer = () => {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    main.setAttribute('inert', '');
    nav.setAttribute('inert', '');
    drawer.querySelector('[data-close-drawer]').focus();
    document.querySelector('[data-open-drawer]').setAttribute('aria-expanded', 'true');
  };
  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
    main.removeAttribute('inert');
    nav.removeAttribute('inert');
    document.querySelector('[data-open-drawer]').setAttribute('aria-expanded', 'false');
    setTimeout(() => { drawer.hidden = true; }, 520);
    if (lastFocus) lastFocus.focus();
  };
  document.querySelector('[data-open-drawer]').addEventListener('click', openDrawer);
  drawer.querySelector('[data-close-drawer]').addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
  });

  /* ---------- shared scroll frame ---------------------------------------- */
  const hero = document.getElementById('hero');
  let scrollP = 0, scrollTicking = false;

  const onScroll = () => {
    const h = hero.offsetHeight || 1;
    scrollP = clamp(scrollY / (h * 0.9), 0, 1);
    hero.style.setProperty('--sp', scrollP.toFixed(4));
    nav.classList.toggle('is-stuck', scrollY > 48);
    scrollTicking = false;
  };
  addEventListener('scroll', () => {
    if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- reveal spotlight (canvas radial mask) ----------------------- */
  /* Image 2 is painted to a canvas, then clipped with a feathered radial
     gradient via destination-in. The centre eases toward the pointer, so the
     light has weight instead of snapping.                                    */
  const createSpotlight = () => {
    const cv = document.getElementById('reveal');
    const glow = document.getElementById('glow');
    const ctx = cv.getContext('2d', { alpha: true });
    if (!ctx) return;

    const img = new Image();
    img.decoding = 'async';
    img.src = 'https://t90182917214.p.clickup-attachments.com/t90182917214/fbef552a-183e-43d9-a631-fb9470c71985/generated-image-2525edbb-7029-489a-8ed4-e9af2363e064.png?view=open';

    let W = 0, H = 0, dpr = 1, ready = false, visible = true, raf = 0;
    const pt = { x: innerWidth * 0.62, y: innerHeight * 0.52 };  // eased position
    const to = { x: pt.x, y: pt.y };                             // target
    let strength = 0, idle = true, idleAt = performance.now();
    const t0 = performance.now();

    const radius = () => Math.min(280, Math.max(150, Math.min(W, H) * 0.42));

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.75);
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener('resize', resize);

    /* pointer -------------------------------------------------------------- */
    const move = (x, y) => { to.x = x; to.y = y; idle = false; idleAt = performance.now(); };
    hero.addEventListener('pointermove', e => move(e.clientX, e.clientY), { passive: true });
    hero.addEventListener('touchmove', e => {
      const t = e.touches[0]; if (t) move(t.clientX, t.clientY);
    }, { passive: true });

    /* only run while the hero is on screen -------------------------------- */
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 }).observe(hero);

    const cover = (iw, ih, zoom) => {
      const s = Math.max(W / iw, H / ih) * zoom;
      const w = iw * s, h = ih * s;
      return { x: (W - w) / 2, y: (H - h) / 2, w, h };
    };

    const frame = now => {
      raf = requestAnimationFrame(frame);
      if (!ready || !visible) return;

      /* idle drift: a slow lissajous so the light lives even without a mouse */
      if (now - idleAt > 2600) idle = true;
      if (idle) {
        const t = (now - t0) / 1000;
        to.x = W * (0.5 + 0.27 * Math.sin(t * 0.19));
        to.y = H * (0.48 + 0.20 * Math.sin(t * 0.13 + 1.1));
      }

      const ease = REDUCED ? 1 : 0.075;
      pt.x = lerp(pt.x, to.x, ease);
      pt.y = lerp(pt.y, to.y, ease);
      strength = lerp(strength, 1 - scrollP * 0.85, 0.06);

      const r = radius();
      const breathe = REDUCED ? 1.08 : 1.09 + 0.05 * (0.5 + 0.5 * Math.sin((now - t0) / 12000));
      const box = cover(img.naturalWidth, img.naturalHeight, breathe);

      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, box.x, box.y + scrollP * 60, box.w, box.h);

      /* feathered mask */
      ctx.globalCompositeOperation = 'destination-in';
      const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r);
      const a = clamp(strength, 0, 1);
      g.addColorStop(0.00, `rgba(255,255,255,${0.98 * a})`);
      g.addColorStop(0.42, `rgba(255,255,255,${0.90 * a})`);
      g.addColorStop(0.64, `rgba(255,255,255,${0.58 * a})`);
      g.addColorStop(0.82, `rgba(255,255,255,${0.22 * a})`);
      g.addColorStop(1.00, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';

      /* bloom rides along, one transform per frame */
      glow.style.transform = `translate3d(${pt.x}px,${pt.y}px,0) scale(${(r / 380).toFixed(3)})`;
      glow.style.opacity = (0.85 * a).toFixed(3);
    };

    img.addEventListener('load', () => {
      ready = true;
      cv.classList.add('is-armed');
      raf = requestAnimationFrame(frame);
    });
    img.addEventListener('error', () => { cv.remove(); glow.remove(); });
    addEventListener('pagehide', () => cancelAnimationFrame(raf));
  };
  createSpotlight();

  /* ---------- atmosphere: smoke + embers ---------------------------------- */
  /* One pre-rendered puff sprite, blitted with alpha/scale. Embers are additive
     dots. Counts scale with viewport; both are near-subliminal by design.     */
  const createAtmosphere = () => {
    if (REDUCED) return;
    const cv = document.getElementById('atmos');
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1, visible = true;
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener('resize', resize);

    /* smoke sprite */
    const puff = document.createElement('canvas');
    puff.width = puff.height = 192;
    const pc = puff.getContext('2d');
    const pg = pc.createRadialGradient(96, 96, 0, 96, 96, 96);
    pg.addColorStop(0, 'rgba(226,214,198,0.5)');
    pg.addColorStop(0.45, 'rgba(206,192,175,0.14)');
    pg.addColorStop(1, 'rgba(196,186,172,0)');
    pc.fillStyle = pg; pc.fillRect(0, 0, 192, 192);

    const rnd = (a, b) => a + Math.random() * (b - a);
    const small = innerWidth < 700;

    const smoke = Array.from({ length: small ? 4 : 7 }, () => ({
      x: rnd(0, W), y: rnd(H * 0.2, H * 1.1), s: rnd(1.6, 4.2),
      vy: rnd(-0.10, -0.03), vx: rnd(-0.06, 0.07), a: rnd(0.03, 0.085), rot: rnd(0, 6.28)
    }));
    const embers = Array.from({ length: small ? 12 : 22 }, () => ({
      x: rnd(0, W), y: rnd(0, H), r: rnd(0.5, 1.7),
      vy: rnd(-0.42, -0.14), ph: rnd(0, 6.28), sp: rnd(0.006, 0.017), life: rnd(0, 1)
    }));

    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 }).observe(hero);

    let raf = 0;
    const frame = now => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      ctx.clearRect(0, 0, W, H);

      /* smoke */
      for (const s of smoke) {
        s.x += s.vx; s.y += s.vy; s.rot += 0.0006;
        if (s.y < -220) { s.y = H + rnd(40, 180); s.x = rnd(0, W); }
        if (s.x < -220) s.x = W + 200; if (s.x > W + 220) s.x = -200;
        ctx.globalAlpha = s.a;
        const d = 192 * s.s;
        ctx.save();
        ctx.translate(s.x, s.y); ctx.rotate(s.rot);
        ctx.drawImage(puff, -d / 2, -d / 2, d, d);
        ctx.restore();
      }

      /* embers */
      ctx.globalCompositeOperation = 'lighter';
      for (const e of embers) {
        e.y += e.vy; e.ph += e.sp;
        e.x += Math.sin(e.ph) * 0.28;
        e.life += 0.0022;
        if (e.y < -20 || e.life > 1) {
          e.y = H + rnd(0, 60); e.x = rnd(0, W); e.life = 0;
        }
        const fade = Math.sin(Math.min(e.life, 1) * Math.PI);
        const flick = 0.65 + 0.35 * Math.sin(e.ph * 3.1);
        ctx.globalAlpha = 0.38 * fade * flick;
        ctx.fillStyle = e.r > 1.2 ? 'rgb(233,122,43)' : 'rgb(226,190,128)';
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, 6.2832); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);
    addEventListener('pagehide', () => cancelAnimationFrame(raf));
  };
  createAtmosphere();

  /* ---------- scroll reveals --------------------------------------------- */
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
  document.querySelectorAll('[data-rise]').forEach(el => io.observe(el));

  /* ---------- signature index: hover/focus drives the sticky plate -------- */
  const createDishIndex = () => {
    const rows = [...document.querySelectorAll('[data-dish]')];
    const shots = [...document.querySelectorAll('[data-plate]')];
    const name = document.getElementById('plate-name');
    const meta = document.getElementById('plate-meta');
    const copy = [
      ['Khorovats', 'Vine-wood<br />coals'],
      ['Ghapama', 'Tonir<br />roasted'],
      ['Ishkhan', 'Lake Sevan<br />daily'],
      ['Tolma', 'Matsun<br />house-cultured'],
      ['Basturma', '42 days<br />air-cured']
    ];
    let active = 0;

    const setActive = i => {
      if (i === active) return;
      active = i;
      rows.forEach((r, n) => r.classList.toggle('is-active', n === i));
      shots.forEach((s, n) => s.classList.toggle('is-shown', n === i));
      name.textContent = copy[i][0];
      meta.innerHTML = copy[i][1];
    };

    rows.forEach((row, i) => {
      row.addEventListener('pointerenter', () => setActive(i));
      row.addEventListener('focus', () => setActive(i));
      row.addEventListener('click', () => setActive(i));
      /* mobile thumb, injected so desktop never downloads it twice */
      if (innerWidth < 900) {
        const img = document.createElement('img');
        img.className = 'menu__thumb';
        img.loading = 'lazy'; img.alt = '';
        img.src = shots[i].currentSrc || shots[i].src;
        row.insertBefore(img, row.firstChild.nextSibling);
      }
    });
    rows[0].classList.add('is-active');
  };
  createDishIndex();

  /* ---------- smooth anchor scrolling ------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    });
  });
})();
