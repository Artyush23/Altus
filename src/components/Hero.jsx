import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Flame } from 'lucide-react'

const Hero = () => {
  const heroRef = useRef(null)
  const revealRef = useRef(null)
  const glowRef = useRef(null)
  const particlesRef = useRef(null)
  const scrollPRef = useRef(0)
  const [scrollP, setScrollP] = useState(0)

  // Check reduced motion preference
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  // Sticky nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const h = heroRef.current.offsetHeight || 1
        const progress = Math.min(1, Math.max(0, window.scrollY / (h * 0.9)))
        scrollPRef.current = progress
        setScrollP(progress)
        heroRef.current.style.setProperty('--sp', progress.toFixed(4))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Spotlight canvas magic
  useEffect(() => {
    if (!heroRef.current || !revealRef.current || !glowRef.current) return

    const heroElement = heroRef.current
    const cv = revealRef.current
    const glow = glowRef.current
    const ctx = cv.getContext('2d', { alpha: true })
    if (!ctx) return

    const img = new Image()
    img.decoding = 'async'
    // Use a placeholder image URL - should be replaced with actual asset
    img.src = 'https://t90182917214.p.clickup-attachments.com/t90182917214/fbef552a-183e-43d9-a631-fb9470c71985/generated-image-2525edbb-7029-489a-8ed4-e9af2363e064.png?view=open'

    let W = 0,
      H = 0,
      dpr = 1,
      ready = false,
      visible = true,
      raf = 0

    const pt = { x: innerWidth * 0.62, y: innerHeight * 0.52 }
    const to = { x: pt.x, y: pt.y }
    let strength = 0,
      idle = true,
      idleAt = performance.now()
    const t0 = performance.now()

    const radius = () => Math.min(280, Math.max(150, Math.min(W, H) * 0.42))

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.75)
      W = heroElement.clientWidth
      H = heroElement.clientHeight
      cv.width = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const move = (x, y) => {
      to.x = x
      to.y = y
      idle = false
      idleAt = performance.now()
    }

    const handlePointerMove = (e) => move(e.clientX, e.clientY)

    const handleTouchMove = (e) => {
      const t = e.touches[0]
      if (t) move(t.clientX, t.clientY)
    }

    heroElement.addEventListener('pointermove', handlePointerMove, { passive: true })
    heroElement.addEventListener('touchmove', handleTouchMove, { passive: true })

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(heroElement)

    const cover = (iw, ih, zoom) => {
      const s = Math.max(W / iw, H / ih) * zoom
      const w = iw * s
      const h = ih * s
      return { x: (W - w) / 2, y: (H - h) / 2, w, h }
    }

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (!ready || !visible) return

      if (now - idleAt > 2600) idle = true
      if (idle) {
        const t = (now - t0) / 1000
        to.x = W * (0.5 + 0.27 * Math.sin(t * 0.19))
        to.y = H * (0.48 + 0.2 * Math.sin(t * 0.13 + 1.1))
      }

      const ease = reducedMotion ? 1 : 0.075
      pt.x = pt.x + (to.x - pt.x) * ease
      pt.y = pt.y + (to.y - pt.y) * ease
      const currentScrollP = scrollPRef.current
      strength = strength + (1 - currentScrollP * 0.85 - strength) * 0.06

      const r = radius()
      const breathe = reducedMotion ? 1.08 : 1.09 + 0.05 * Math.sin((now - t0) / 12000)
      const box = cover(img.naturalWidth, img.naturalHeight, breathe)

      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(img, box.x, box.y + currentScrollP * 60, box.w, box.h)

      // Feathered mask
      ctx.globalCompositeOperation = 'destination-in'
      const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r)
      const a = Math.min(1, Math.max(0, strength))
      g.addColorStop(0.0, `rgba(255,255,255,${0.98 * a})`)
      g.addColorStop(0.42, `rgba(255,255,255,${0.9 * a})`)
      g.addColorStop(0.64, `rgba(255,255,255,${0.58 * a})`)
      g.addColorStop(0.82, `rgba(255,255,255,${0.22 * a})`)
      g.addColorStop(1.0, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'source-over'

      glow.style.transform = `translate3d(${pt.x}px,${pt.y}px,0) scale(${(r / 380).toFixed(3)})`
      glow.style.opacity = (0.85 * a).toFixed(3)
    }

    img.addEventListener('load', () => {
      ready = true
      cv.classList.add('is-armed')
      raf = requestAnimationFrame(frame)
    })

    img.addEventListener('error', () => {
      cv.remove()
      glow.remove()
    })

    const handlePageHide = () => cancelAnimationFrame(raf)
    window.addEventListener('pagehide', handlePageHide)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pagehide', handlePageHide)
      heroElement.removeEventListener('pointermove', handlePointerMove)
      heroElement.removeEventListener('touchmove', handleTouchMove)
      observer.disconnect()
    }
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion || !heroRef.current || !particlesRef.current) return

    const heroElement = heroRef.current
    const cv = particlesRef.current
    const ctx = cv.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let visible = true
    let raf = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = heroElement.clientWidth
      height = heroElement.clientHeight
      cv.width = Math.round(width * dpr)
      cv.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const puff = document.createElement('canvas')
    puff.width = 192
    puff.height = 192
    const puffCtx = puff.getContext('2d')
    const puffGradient = puffCtx.createRadialGradient(96, 96, 0, 96, 96, 96)
    puffGradient.addColorStop(0, 'rgba(226,214,198,0.5)')
    puffGradient.addColorStop(0.45, 'rgba(206,192,175,0.14)')
    puffGradient.addColorStop(1, 'rgba(196,186,172,0)')
    puffCtx.fillStyle = puffGradient
    puffCtx.fillRect(0, 0, 192, 192)

    const random = (min, max) => min + Math.random() * (max - min)
    const smallViewport = window.innerWidth < 700
    const smoke = Array.from({ length: smallViewport ? 4 : 7 }, () => ({
      x: random(0, width),
      y: random(height * 0.2, height * 1.1),
      scale: random(1.6, 4.2),
      vy: random(-0.1, -0.03),
      vx: random(-0.06, 0.07),
      alpha: random(0.03, 0.085),
      rotation: random(0, 6.28),
    }))
    const embers = Array.from({ length: smallViewport ? 12 : 22 }, () => ({
      x: random(0, width),
      y: random(0, height),
      radius: random(0.5, 1.7),
      vy: random(-0.42, -0.14),
      phase: random(0, 6.28),
      speed: random(0.006, 0.017),
      life: random(0, 1),
    }))

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    }, { threshold: 0 })
    observer.observe(heroElement)

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible) return

      ctx.clearRect(0, 0, width, height)

      smoke.forEach((puffState) => {
        puffState.x += puffState.vx
        puffState.y += puffState.vy
        puffState.rotation += 0.0006

        if (puffState.y < -220) {
          puffState.y = height + random(40, 180)
          puffState.x = random(0, width)
        }
        if (puffState.x < -220) puffState.x = width + 200
        if (puffState.x > width + 220) puffState.x = -200

        ctx.globalAlpha = puffState.alpha
        const diameter = 192 * puffState.scale
        ctx.save()
        ctx.translate(puffState.x, puffState.y)
        ctx.rotate(puffState.rotation)
        ctx.drawImage(puff, -diameter / 2, -diameter / 2, diameter, diameter)
        ctx.restore()
      })

      ctx.globalCompositeOperation = 'lighter'
      embers.forEach((ember) => {
        ember.y += ember.vy
        ember.phase += ember.speed
        ember.x += Math.sin(ember.phase) * 0.28
        ember.life += 0.0022

        if (ember.y < -20 || ember.life > 1) {
          ember.y = height + random(0, 60)
          ember.x = random(0, width)
          ember.life = 0
        }

        const fade = Math.sin(Math.min(ember.life, 1) * Math.PI)
        const flicker = 0.65 + 0.35 * Math.sin(ember.phase * 3.1)
        ctx.globalAlpha = 0.38 * fade * flicker
        ctx.fillStyle = ember.radius > 1.2 ? 'rgb(233,122,43)' : 'rgb(226,190,128)'
        ctx.beginPath()
        ctx.arc(ember.x, ember.y, ember.radius, 0, 6.2832)
        ctx.fill()
      })

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [reducedMotion])

  return (
    <section
      className="hero"
      id="hero"
      aria-labelledby="hero-title"
      ref={heroRef}
      style={{ '--sp': scrollP }}
    >
      {/* Background image */}
      <div className="hero__bg" aria-hidden="true">
        <img
          src="https://t90182917214.p.clickup-attachments.com/t90182917214/e1c6ff7a-1aca-42fc-b53f-eee57989cbe7/generated-image-7e1ccea4-9e2d-44a4-98bc-b68033ca9493.png?view=open"
          alt="Armenian khorovats kebab plated with grilled peppers, lavash and pomegranate on a walnut table"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Canvas layers */}
      <canvas className="hero__reveal" id="reveal" ref={revealRef} aria-hidden="true"></canvas>
      <div className="hero__glow" id="glow" ref={glowRef} aria-hidden="true"></div>
      <div className="hero__grade" aria-hidden="true"></div>
      <canvas className="hero__particles" id="atmos" ref={particlesRef} aria-hidden="true"></canvas>

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow" data-enter="fade" style={{ '--d': '280ms' }}>
            Charcoal &amp; Tonir <em>№ 01</em>
          </p>

          <h1 className="display" id="hero-title">
            <span className="l1" data-enter="blur" style={{ '--d': '360ms' }}>
              Taste the Fire
            </span>
            <span className="l2" data-enter="blur" style={{ '--d': '500ms' }}>
              of Arme<b>nia</b>
            </span>
          </h1>

          <p className="lead" data-enter="up" style={{ '--d': '660ms' }}>
            Authentic Armenian flavors crafted over open fire using traditional
            recipes, premium ingredients, and generations of culinary heritage.
          </p>

          <div className="hero__cta" data-enter="up" style={{ '--d': '800ms' }}>
            <a className="btn btn--gold" href="#reservations">
              <span className="btn__label">
                <span>Reserve Table</span>
                <span>Tonight, 19:30</span>
              </span>
              <Flame width="15" height="15" aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href="#signatures">
              <span className="btn__label">
                <span>View Menu</span>
                <span>18 Dishes</span>
              </span>
              <ArrowUpRight width="15" height="15" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div
        className="hero__foot"
        data-enter="fade"
        style={{ '--d': '1000ms' }}
      >
        <p className="hero__hint">
          <span className="dot"></span> Move to find the fire
        </p>
        <div className="scrollcue">
          <i></i> <span>Scroll</span>
        </div>
        <p style={{ letterSpacing: '.06em' }}>
          Fires lit at 11:00 · Last order 23:00
        </p>
      </div>
      <p className="hero__geo" data-enter="fade" style={{ '--d': '1100ms' }}>
        40.1792° N · 44.4991° E
      </p>
    </section>
  )
}

export default Hero
