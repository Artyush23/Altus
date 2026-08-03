import React from 'react'
import { Clock, MapPin, Navigation, Phone } from 'lucide-react'

const hours = [
  ['Monday - Thursday', '11:00 - 23:00'],
  ['Friday - Saturday', '11:00 - 00:00'],
  ['Sunday', '12:00 - 22:00'],
]

const Contact = () => {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-band section-band--warm">
      <div className="section-shell split-layout">
        <div>
          <p className="section-kicker" data-rise>
            Contact
          </p>
          <h2 id="contact-title" className="section-title" data-rise style={{ '--d': '80ms' }}>
            Find Altus<br />in <em>Yerevan</em>
          </h2>
          <p className="section-note" data-rise style={{ '--d': '140ms' }}>
            A short walk from Republic Square, with the tonir warm, the grill glowing, and a table
            ready for your next gathering.
          </p>

          <div className="contact-list">
            <div className="info-row" data-rise style={{ '--d': '200ms' }}>
              <MapPin size={22} aria-hidden="true" />
              <div>
                <h3>Address</h3>
                <p>12 Pushkin St, Yerevan 0010, Armenia</p>
              </div>
            </div>
            <div className="info-row" data-rise style={{ '--d': '260ms' }}>
              <Phone size={22} aria-hidden="true" />
              <div>
                <h3>Phone</h3>
                <p>+374 10 555 199</p>
              </div>
            </div>
            <div className="info-row" data-rise style={{ '--d': '320ms' }}>
              <Clock size={22} aria-hidden="true" />
              <div>
                <h3>Working hours</h3>
                <dl className="hours-list">
                  {hours.map(([day, time]) => (
                    <div key={day}>
                      <dt>{day}</dt>
                      <dd>{time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="map-placeholder" data-rise style={{ '--d': '220ms' }}>
          <div className="map-card">
            <MapPin size={34} aria-hidden="true" />
            <h3>Map placeholder</h3>
            <p>Interactive map embed can be connected here when the exact venue listing is ready.</p>
            <a
              className="text-link"
              href="https://maps.google.com/?q=12%20Pushkin%20St%20Yerevan"
              target="_blank"
              rel="noreferrer"
            >
              Open directions
              <Navigation size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
