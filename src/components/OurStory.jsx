import React from 'react'
import { Flame, HeartHandshake, Leaf, Utensils } from 'lucide-react'

const storyCards = [
  {
    title: 'The Fire of Armenia',
    copy: 'Open-fire cooking sits at the center of the Altus kitchen, from charcoal khorovats to lavash pulled warm from the tonir.',
    icon: Flame,
  },
  {
    title: 'Three Generations',
    copy: 'Our recipes were passed through family tables in Lori, Syunik, and Gyumri before finding their home in Yerevan.',
    icon: HeartHandshake,
  },
  {
    title: 'Market-Led Cooking',
    copy: 'Seasonal herbs, stone fruit, fresh vegetables, walnuts, and brined cheeses shape the rhythm of every menu.',
    icon: Leaf,
  },
  {
    title: 'Tradition, Served Simply',
    copy: 'Generous plates, patient preparation, and flavors built for another toast keep the soul of the table intact.',
    icon: Utensils,
  },
]

const OurStory = () => {
  return (
    <section id="story" aria-labelledby="story-title" className="section-band section-band--deep">
      <div className="section-shell">
        <div className="section-head">
          <div>
            <p className="section-kicker" data-rise>
              Our story
            </p>
            <h2 id="story-title" className="section-title" data-rise style={{ '--d': '80ms' }}>
              A family table,<br />carried <em>forward</em>
            </h2>
          </div>
          <p className="section-note" data-rise style={{ '--d': '140ms' }}>
            Since 1998, Altus has cooked with the patience of Armenian homes: smoke, herbs, lavash,
            mountain produce, and dishes made to be shared.
          </p>
        </div>

        <div className="editorial-grid editorial-grid--four">
          {storyCards.map(({ title, copy, icon: Icon }, index) => (
            <article key={title} className="editorial-panel" data-rise style={{ '--d': `${index * 70}ms` }}>
              <Icon size={28} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurStory
