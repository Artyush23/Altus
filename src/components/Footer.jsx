import React from 'react'
import { Camera, Flame, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <a className="site-footer__brand" href="#hero" aria-label="Altus home">
            <span className="site-footer__mark">
              <Flame size={22} aria-hidden="true" />
            </span>
            <span>
              <span className="site-footer__word">Altus</span>
              <span className="site-footer__sub">Armenian table</span>
            </span>
          </a>
          <p className="site-footer__copy">
            Traditional Armenian cooking shaped by charcoal, tonir bread, mountain herbs, and
            recipes carried through generations.
          </p>
        </div>

        <div>
          <h2>Visit</h2>
          <div className="site-footer__meta">
            <p>
              <MapPin size={18} aria-hidden="true" />
              12 Pushkin St, Yerevan 0010
            </p>
            <p>
              <Phone size={18} aria-hidden="true" />
              +374 10 555 199
            </p>
            <p>
              <Mail size={18} aria-hidden="true" />
              hello@altus.am
            </p>
          </div>
        </div>

        <div>
          <h2>Explore</h2>
          <nav className="site-footer__links" aria-label="Footer">
            <a href="#signatures">Menu</a>
            <a href="#story">Our Story</a>
            <a href="#gallery">Gallery</a>
            <a href="#reservations">Reservations</a>
          </nav>
          <a
            className="site-footer__social"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <Camera size={18} aria-hidden="true" />
            Follow the fire
          </a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© 2026 Altus Armenian Restaurant. All rights reserved.</p>
        <p>Yerevan · Est. 1998</p>
      </div>
    </footer>
  )
}

export default Footer
