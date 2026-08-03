import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const DISHES = [
  {
    id: 0,
    name: 'Khorovats <em>Lori</em>',
    desc: 'Pork tenderloin over vine-wood coals, blistered peppers, tonir lavash',
    price: '8,900 ֏',
    meta: 'Vine-wood<br />coals',
    img: 'https://t90182917214.p.clickup-attachments.com/t90182917214/e1c6ff7a-1aca-42fc-b53f-eee57989cbe7/generated-image-7e1ccea4-9e2d-44a4-98bc-b68033ca9493.png?view=open',
    alt: 'Khorovats: charcoal-grilled pork with peppers and lavash',
  },
  {
    id: 1,
    name: 'Ghapama <em>for two</em>',
    desc: 'Whole roast pumpkin, saffron rice, apricot, walnut, mountain honey',
    price: '6,400 ֏',
    meta: 'Tonir<br />roasted',
    img: 'https://t90182917214.p.clickup-attachments.com/t90182917214/5cc4e51c-0977-41f7-af45-8050743cbe3c/generated-image-e6123536-005d-4fe3-9efe-a68ac59523f5.png?view=open',
    alt: 'Ghapama: roast pumpkin filled with saffron rice and dried fruit',
  },
  {
    id: 2,
    name: 'Ishkhan <em>Sevan trout</em>',
    desc: 'Grilled whole, tarragon butter, charred lemon, wild dill',
    price: '12,500 ֏',
    meta: 'Lake Sevan<br />daily',
    img: 'https://t90182917214.p.clickup-attachments.com/t90182917214/eab3963f-01c9-43b6-acf0-4af075a98a4d/generated-image-b1421db0-c031-4603-9f4d-a1f7ee9d04c3.png?view=open',
    alt: 'Grilled whole Sevan trout with herbs and charred lemon',
  },
  {
    id: 3,
    name: 'Tolma <em>vine leaf</em>',
    desc: 'Lamb, rice and herbs, cultured matsun, dried mint, sumac',
    price: '5,200 ֏',
    meta: 'Matsun<br />house-cultured',
    img: 'https://t90182917214.p.clickup-attachments.com/t90182917214/b48aa9ba-3a58-46b2-802b-52b0b77efef3/generated-image-9588f842-b098-4fe1-998c-5be7497fc9aa.png?view=open',
    alt: 'Tolma: vine leaf rolls topped with matsun, mint and sumac',
  },
  {
    id: 4,
    name: 'Basturma <em>42 days</em>',
    desc: 'Air-cured beef in chaman crust, brined cheese, walnut, lavash',
    price: '7,800 ֏',
    meta: '42 days<br />air-cured',
    img: 'https://t90182917214.p.clickup-attachments.com/t90182917214/b7fc6257-acab-4659-bce6-a2cbbd2fddd0/generated-image-c742fb10-69f6-4d29-b609-c40a6febd0fa.png?view=open',
    alt: 'Sliced basturma with lavash, brined cheese and walnuts',
  },
]

const Signatures = () => {
  const [activeDish, setActiveDish] = useState(0)

  const setActive = (index) => {
    setActiveDish(index)
  }

  return (
    <section className="sig" id="signatures" aria-labelledby="sig-title">
      <div className="sig__head">
        <h2 id="sig-title" data-rise>
          Five dishes<br />we <em>refuse</em> to change
        </h2>
        <p className="sig__note" data-rise style={{ '--d': '120ms' }}>
          Every recipe below came from a grandmother in Lori, Syunik or Gyumri. We only changed the fire.
        </p>
      </div>

      <div className="sig__body">
        <div className="sig__menu">
          <ul className="menu" id="menu">
            {DISHES.map((dish) => (
              <li key={dish.id}>
                <button
                  className={`menu__row ${activeDish === dish.id ? 'is-active' : ''}`}
                  type="button"
                  data-dish={dish.id}
                  data-rise
                  style={{ '--d': `${dish.id * 70}ms` }}
                  onMouseEnter={() => setActive(dish.id)}
                  onFocus={() => setActive(dish.id)}
                  onClick={() => setActive(dish.id)}
                >
                  <span className="menu__num">{String(dish.id + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="menu__name" dangerouslySetInnerHTML={{ __html: dish.name }} />
                    <span className="menu__desc">{dish.desc}</span>
                  </span>
                  <span className="menu__price">{dish.price}</span>
                  {typeof window !== 'undefined' && window.innerWidth < 900 && (
                    <img
                      className="menu__thumb"
                      loading="lazy"
                      alt=""
                      src={dish.img}
                    />
                  )}
                </button>
              </li>
            ))}
            <li aria-hidden="true" style={{ borderTop: '1px solid var(--line-soft)' }}></li>
          </ul>
          <a className="sig__more" href="#signatures">
            The full menu <ArrowRight width="14" height="14" aria-hidden="true" />
          </a>
        </div>

        <div>
          <figure className="plate" id="plate" aria-live="polite">
            {DISHES.map((dish) => (
              <img
                key={dish.id}
                src={dish.img}
                alt={dish.alt}
                data-plate={dish.id}
                loading={dish.id === 0 ? 'eager' : 'lazy'}
                className={`is-shown ${activeDish === dish.id ? '' : 'hidden'}`}
              />
            ))}
            <figcaption className="plate__cap">
              <strong id="plate-name">{DISHES[activeDish].name.replace(/<[^>]*>/g, '')}</strong>
              <small id="plate-meta" dangerouslySetInnerHTML={{ __html: DISHES[activeDish].meta }} />
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default Signatures
