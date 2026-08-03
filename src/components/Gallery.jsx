import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const GALLERY_IMAGES = [
  {
    id: 1,
    src: 'https://t90182917214.p.clickup-attachments.com/t90182917214/e1c6ff7a-1aca-42fc-b53f-eee57989cbe7/generated-image-7e1ccea4-9e2d-44a4-98bc-b68033ca9493.png?view=open',
    alt: 'Armenian khorovats kebab with grilled peppers and lavash',
    caption: 'Khorovats - Charcoal Grilled',
  },
  {
    id: 2,
    src: 'https://t90182917214.p.clickup-attachments.com/t90182917214/5cc4e51c-0977-41f7-af45-8050743cbe3c/generated-image-e6123536-005d-4fe3-9efe-a68ac59523f5.png?view=open',
    alt: 'Ghapama roast pumpkin with saffron rice and dried fruit',
    caption: 'Ghapama - Traditional Roast',
  },
  {
    id: 3,
    src: 'https://t90182917214.p.clickup-attachments.com/t90182917214/eab3963f-01c9-43b6-acf0-4af075a98a4d/generated-image-b1421db0-c031-4603-9f4d-a1f7ee9d04c3.png?view=open',
    alt: 'Grilled whole Sevan trout with herbs',
    caption: 'Ishkhan - Lake Sevan Trout',
  },
  {
    id: 4,
    src: 'https://t90182917214.p.clickup-attachments.com/t90182917214/b48aa9ba-3a58-46b2-802b-52b0b77efef3/generated-image-9588f842-b098-4fe1-998c-5be7497fc9aa.png?view=open',
    alt: 'Tolma vine leaf rolls with matsun and mint',
    caption: 'Tolma - Vine Leaf Rolls',
  },
  {
    id: 5,
    src: 'https://t90182917214.p.clickup-attachments.com/t90182917214/b7fc6257-acab-4659-bce6-a2cbbd2fddd0/generated-image-c742fb10-69f6-4d29-b609-c40a6febd0fa.png?view=open',
    alt: 'Basturma air-cured beef with lavash and walnuts',
    caption: 'Basturma - 42 Days Cured',
  },
  {
    id: 6,
    src: 'https://t90182917214.p.clickup-attachments.com/t90182917214/fbef552a-183e-43d9-a631-fb9470c71985/generated-image-2525edbb-7029-489a-8ed4-e9af2363e064.png?view=open',
    alt: 'Tonir oven and traditional Armenian bread',
    caption: 'Tonir - Wood-Fired Oven',
  },
]

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const openLightbox = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = ''
  }

  const goToNext = () => {
    if (!selectedImage) return
    const index = GALLERY_IMAGES.findIndex((image) => image.id === selectedImage.id)
    setSelectedImage(GALLERY_IMAGES[(index + 1) % GALLERY_IMAGES.length])
  }

  const goToPrev = () => {
    if (!selectedImage) return
    const index = GALLERY_IMAGES.findIndex((image) => image.id === selectedImage.id)
    setSelectedImage(GALLERY_IMAGES[(index - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length])
  }

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-band section-band--warm">
      <div className="section-shell">
        <div className="section-head">
          <div>
            <p className="section-kicker" data-rise>
              Gallery
            </p>
            <h2 id="gallery-title" className="section-title" data-rise style={{ '--d': '80ms' }}>
              From the hearth<br />to the <em>table</em>
            </h2>
          </div>
          <p className="section-note" data-rise style={{ '--d': '140ms' }}>
            A glimpse into the warmth and flavors that define Altus, from charcoal and tonir to
            quiet details at the table.
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY_IMAGES.map((image, index) => (
            <button
              key={image.id}
              className="gallery-tile"
              type="button"
              onClick={() => openLightbox(image)}
              aria-label={`View ${image.caption}`}
              data-rise
              style={{ '--d': `${index * 60}ms` }}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
              <span className="gallery-tile__shade">
                <span className="gallery-tile__caption">{image.caption}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Image preview" onClick={closeLightbox}>
          <button className="modal__button modal__button--close" type="button" onClick={closeLightbox} aria-label="Close preview">
            <X width="24" height="24" aria-hidden="true" />
          </button>
          <button className="modal__button modal__button--prev" type="button" onClick={(event) => { event.stopPropagation(); goToPrev() }} aria-label="Previous image">
            <ChevronLeft width="30" height="30" aria-hidden="true" />
          </button>
          <img src={selectedImage.src} alt={selectedImage.alt} onClick={(event) => event.stopPropagation()} />
          <button className="modal__button modal__button--next" type="button" onClick={(event) => { event.stopPropagation(); goToNext() }} aria-label="Next image">
            <ChevronRight width="30" height="30" aria-hidden="true" />
          </button>
          <p className="modal__caption">{selectedImage.caption}</p>
        </div>
      )}
    </section>
  )
}

export default Gallery
