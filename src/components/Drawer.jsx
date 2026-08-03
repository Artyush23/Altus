import React, { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

const Drawer = ({ open, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const drawerRef = useRef(null)

  useEffect(() => {
    if (open) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
        document.body.style.overflow = ''
      }, 520)
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!isVisible && !open) return null

  return (
    <div
      className={`drawer ${open ? 'is-open' : ''}`}
      id="drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      ref={drawerRef}
    >
      <div className="drawer__top">
        <button
          className="drawer__close"
          type="button"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X width="18" height="18" aria-hidden="true" />
        </button>
      </div>
      <nav className="drawer__nav" aria-label="Mobile">
        <a href="#signatures" style={{ '--i': 0 }} onClick={onClose}>
          Menu
        </a>
        <a href="#story" style={{ '--i': 1 }} onClick={onClose}>
          Our Story
        </a>
        <a href="#gallery" style={{ '--i': 2 }} onClick={onClose}>
          Gallery
        </a>
        <a href="#reservations" style={{ '--i': 3 }} onClick={onClose}>
          Reservations
        </a>
        <a href="#contact" style={{ '--i': 4 }} onClick={onClose}>
          Contact
        </a>
      </nav>
      <div className="drawer__foot">
        <span>12 Pushkin St, Yerevan 0010</span>
        <a className="btn btn--gold" href="#reservations" onClick={onClose}>
          <span className="btn__label">
            <span>Reserve Table</span>
            <span>Book a Table</span>
          </span>
        </a>
      </div>
    </div>
  )
}

export default Drawer
