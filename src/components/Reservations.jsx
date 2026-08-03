import React from 'react'
import { CalendarDays, Clock, Mail, Phone, Users } from 'lucide-react'

const Reservations = () => {
  return (
    <section id="reservations" aria-labelledby="reservations-title" className="section-band section-band--deep">
      <div className="section-shell split-layout">
        <div>
          <p className="section-kicker" data-rise>
            Reservations
          </p>
          <h2 id="reservations-title" className="section-title" data-rise style={{ '--d': '80ms' }}>
            Book a table<br />by the <em>fire</em>
          </h2>
          <p className="section-note" data-rise style={{ '--d': '140ms' }}>
            Join us for slow-roasted Armenian classics, warm lavash from the tonir, and a dining
            room built for long evenings with family and friends.
          </p>

          <div className="info-stack info-stack--two">
            <article className="editorial-panel" data-rise style={{ '--d': '200ms' }}>
              <Clock size={24} aria-hidden="true" />
              <h3>Dinner service</h3>
              <p>Daily from 11:00 to 23:00</p>
            </article>
            <article className="editorial-panel" data-rise style={{ '--d': '260ms' }}>
              <Phone size={24} aria-hidden="true" />
              <h3>Prefer to call?</h3>
              <p>+374 10 555 199</p>
            </article>
          </div>
        </div>

        <form className="booking-form" data-rise style={{ '--d': '220ms' }}>
          <div className="form-grid">
            <label className="field">
              <span>Name</span>
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label className="field">
              <span><Phone size={16} aria-hidden="true" /> Phone</span>
              <input type="tel" name="phone" placeholder="+374" />
            </label>
            <label className="field">
              <span><CalendarDays size={16} aria-hidden="true" /> Date</span>
              <input type="date" name="date" />
            </label>
            <label className="field">
              <span><Clock size={16} aria-hidden="true" /> Time</span>
              <input type="time" name="time" />
            </label>
            <label className="field">
              <span><Users size={16} aria-hidden="true" /> Guests</span>
              <select name="guests" defaultValue="2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((guestCount) => (
                  <option key={guestCount} value={guestCount}>
                    {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span><Mail size={16} aria-hidden="true" /> Email</span>
              <input type="email" name="email" placeholder="you@example.com" />
            </label>
          </div>

          <label className="field field--full">
            <span>Occasion or notes</span>
            <textarea name="notes" placeholder="Birthday, window table, dietary notes..." />
          </label>

          <button className="btn btn--gold form-submit" type="submit">
            <span className="btn__label">
              <span>Reserve Table</span>
              <span>Send Request</span>
            </span>
            <CalendarDays size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  )
}

export default Reservations
