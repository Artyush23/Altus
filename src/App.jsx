import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import Drawer from './components/Drawer'
import Hero from './components/Hero'
import Signatures from './components/Signatures'
import OurStory from './components/OurStory'
import Gallery from './components/Gallery'
import Reservations from './components/Reservations'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [navStuck, setNavStuck] = useState(false)

  const handleLogoClick = (event) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const makeLive = () => document.body.classList.add('is-live')
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(makeLive))
      const fallback = setTimeout(makeLive, 900)
      return () => clearTimeout(fallback)
    }
    requestAnimationFrame(makeLive)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setNavStuck(window.scrollY > 48)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-rise]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
    )

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleAnchorClick = (event) => {
      const href = event.currentTarget.getAttribute('href')
      if (!href || !href.startsWith('#')) return

      const target = document.querySelector(href)
      if (!target) return

      event.preventDefault()
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      setDrawerOpen(false)
    }

    const anchors = document.querySelectorAll('a[href^="#"]')
    anchors.forEach((anchor) => anchor.addEventListener('click', handleAnchorClick))
    return () => anchors.forEach((anchor) => anchor.removeEventListener('click', handleAnchorClick))
  }, [])

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <div className="relative min-h-screen bg-[#0A1817] text-[#F5F2ED]">
      {/* Skip link */}
      <a
        className="skip"
        href="#signatures"
      >
        Skip to menu
      </a>

      {/* Film grain overlay */}
      <div className="grain" aria-hidden="true"></div>

      {/* Header & Navigation */}
      <header
        className={`nav ${navStuck ? 'is-stuck' : ''}`}
        data-enter="down"
        style={{ '--d': '100ms' }}
      >
        <a className="brand" href="#" aria-label="Altus, home" onClick={handleLogoClick}>
          <svg
            viewBox="0 0 26 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M13 1.4 24.3 8v16L13 30.6 1.7 24V8L13 1.4Z"
              stroke="currentColor"
              strokeOpacity="0.38"
              strokeWidth="1"
            />
            <path
              d="M13 5.6 20.6 10v12L13 26.4 5.4 22V10L13 5.6Z"
              stroke="oklch(73.5% .073 82)"
              strokeOpacity="0.55"
              strokeWidth="0.8"
            />
            <path
              className="flame"
              d="M13 10.2c2.5 2.3 3.9 4.1 3.9 6.2 0 2.4-1.8 4.1-3.9 4.1s-3.9-1.7-3.9-4.1c0-2.1 1.4-3.9 3.9-6.2Z"
              fill="oklch(66.5% .163 48)"
            />
            <path
              className="flame"
              d="M13 14.1c1.2 1.2 1.8 2.1 1.8 3.2 0 1.2-.8 2-1.8 2s-1.8-.8-1.8-2c0-1.1.6-2 1.8-3.2Z"
              fill="oklch(88% .09 88)"
            />
          </svg>
          <span>
            <span className="brand__word">Altus</span>
            <span className="brand__sub">Yerevan · Est. 1998</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href="#signatures">Menu</a>
          <a href="#story">Our Story</a>
          <a href="#gallery">Gallery</a>
          <a href="#reservations">Reservations</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav__right">
          <a className="btn btn--gold nav__reserve" href="#reservations">
            <span className="btn__label">
              <span>Reserve Table</span>
              <span>Book a Table</span>
            </span>
          </a>
          <button
            className="burger"
            type="button"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="drawer"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu width="18" height="18" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Hero Section */}
      <Hero />

      <main id="top">
        {/* Signatures Section */}
        <Signatures />

        {/* Our Story Section */}
        <OurStory />

        {/* Gallery Section */}
        <Gallery />

        {/* Reservations Section */}
        <Reservations />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}

export default App
