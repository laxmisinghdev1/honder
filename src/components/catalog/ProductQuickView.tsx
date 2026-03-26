import { useEffect, useMemo, useState } from 'react'
import type { Product } from '../../data/hondar'
import { productQuickViewContentByLanguage, productQuickViewCopyByLanguage } from '../../data/productQuickView'
import type { SupportedLanguage } from '../../i18n/LanguageContext'
import { ProductFigure } from '../layout/ProductFigure'
import { BadgePill } from '../ui/BadgePill'
import { CTAButton } from '../ui/CTAButton'
import { IconClose, IconStar } from '../ui/ActionIcons'

type ProductReview = {
  id: string
  name: string
  rating: number
  comment: string
  createdAt: string
}

type ProductQuickViewProps = {
  product: Product | null
  language: SupportedLanguage
  onClose: () => void
  onAddToCart: (product: Product) => void
}

const REVIEWS_STORAGE_KEY = 'hondar_product_reviews_v1'

function readStoredReviews(): Record<string, ProductReview[]> {
  const raw = window.localStorage.getItem(REVIEWS_STORAGE_KEY)
  if (!raw) {
    return {}
  }

  try {
    return JSON.parse(raw) as Record<string, ProductReview[]>
  } catch {
    window.localStorage.removeItem(REVIEWS_STORAGE_KEY)
    return {}
  }
}

function writeStoredReviews(reviews: Record<string, ProductReview[]>) {
  window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews))
}

export function ProductQuickView({ product, language, onClose, onAddToCart }: ProductQuickViewProps) {
  const copy = productQuickViewCopyByLanguage[language]
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [draftName, setDraftName] = useState('')
  const [draftComment, setDraftComment] = useState('')
  const [draftRating, setDraftRating] = useState(5)

  useEffect(() => {
    if (!product) {
      return
    }

    const storedReviews = readStoredReviews()
    setReviews(storedReviews[product.id] ?? [])
    setDraftName('')
    setDraftComment('')
    setDraftRating(5)
  }, [product])

  useEffect(() => {
    if (!product) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, product])

  const content = useMemo(() => {
    if (!product) {
      return null
    }

    return productQuickViewContentByLanguage[language][product.id]
  }, [language, product])

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return draftRating
    }

    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  }, [draftRating, reviews])

  if (!product || !content) {
    return null
  }

  const currentProduct = product

  function handleSubmitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (draftComment.trim().length < 8) {
      return
    }

    const nextReview: ProductReview = {
      id: `${currentProduct.id}-${Date.now()}`,
      name: draftName.trim() || copy.defaultReviewerName,
      rating: draftRating,
      comment: draftComment.trim(),
      createdAt: new Date().toISOString(),
    }

    const nextReviews = [nextReview, ...reviews]
    const storedReviews = readStoredReviews()
    storedReviews[currentProduct.id] = nextReviews
    writeStoredReviews(storedReviews)
    setReviews(nextReviews)
    setDraftComment('')
    setDraftName('')
    setDraftRating(5)
  }

  return (
    <div className="product-quick-view-overlay" role="dialog" aria-modal="true" aria-labelledby={`quick-view-title-${currentProduct.id}`} onClick={onClose}>
      <div className="product-quick-view" onClick={(event) => event.stopPropagation()}>
        <button className="product-quick-view__close" type="button" onClick={onClose} aria-label={copy.close}>
          <IconClose width={18} height={18} />
        </button>

        <div className="product-quick-view__media">
          <span className="product-quick-view__eyebrow">{copy.galleryLabel}</span>
          <BadgePill color="accent-soft">{currentProduct.category}</BadgePill>
          <div className="product-quick-view__figure-shell">
            <ProductFigure
              figure={currentProduct.figure}
              tone={currentProduct.tone}
              imageUrl={currentProduct.imageUrl}
              imageAlt={currentProduct.name}
            />
          </div>
        </div>

        <div className="product-quick-view__content">
          <div className="product-quick-view__header">
            <div>
              <p className="product-quick-view__strapline">{content.strapline}</p>
              <h3 id={`quick-view-title-${currentProduct.id}`}>{currentProduct.name}</h3>
            </div>
            <strong>{currentProduct.priceLabel}</strong>
          </div>

          <p className="product-quick-view__description">{content.description}</p>

          <div className="product-quick-view__meta">
            <section className="product-quick-view__panel">
              <p>{copy.highlightsLabel}</p>
              <ul className="product-quick-view__list">
                {content.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>

            <section className="product-quick-view__panel">
              <p>{copy.specsLabel}</p>
              <dl className="product-quick-view__specs">
                {content.specs.map((spec) => (
                  <div key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <section className="product-quick-view__reviews">
            <div className="product-quick-view__reviews-header">
              <div>
                <p>{copy.averageLabel}</p>
                <strong>{averageRating.toFixed(1)} / 5</strong>
              </div>
              <div className="product-quick-view__stars" aria-label={`${averageRating.toFixed(1)} ${copy.starsLabel}`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconStar
                    key={star}
                    width={18}
                    height={18}
                    className={star <= Math.round(averageRating) ? 'is-active' : ''}
                  />
                ))}
              </div>
            </div>

            <form className="product-quick-view__review-form" onSubmit={handleSubmitReview}>
              <div className="product-quick-view__field-row">
                <label className="product-quick-view__field">
                  <span>{copy.nameLabel}</span>
                  <input value={draftName} placeholder={copy.namePlaceholder} onChange={(event) => setDraftName(event.target.value)} />
                </label>

                <div className="product-quick-view__field">
                  <span>{copy.ratingLabel}</span>
                  <div className="product-quick-view__rating-picker">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`product-quick-view__rating-button ${star <= draftRating ? 'is-selected' : ''}`}
                        onClick={() => setDraftRating(star)}
                        aria-label={`${star} ${copy.starsLabel}`}
                      >
                        <IconStar width={18} height={18} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <label className="product-quick-view__field">
                <span>{copy.commentsLabel}</span>
                <textarea
                  rows={4}
                  value={draftComment}
                  placeholder={copy.commentPlaceholder}
                  onChange={(event) => setDraftComment(event.target.value)}
                />
              </label>

              <div className="product-quick-view__actions">
                <CTAButton type="button" variant="secondary" onClick={() => onAddToCart(currentProduct)}>
                  {copy.addToCart}
                </CTAButton>
                <CTAButton type="submit">{copy.submitComment}</CTAButton>
              </div>
            </form>

            <div className="product-quick-view__comment-list">
              {reviews.length === 0 ? <p className="product-quick-view__empty">{copy.commentsEmpty}</p> : null}
              {reviews.map((review) => (
                <article key={review.id} className="product-quick-view__comment-card">
                  <div className="product-quick-view__comment-header">
                    <strong>{review.name}</strong>
                    <div className="product-quick-view__stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <IconStar
                          key={star}
                          width={14}
                          height={14}
                          className={star <= review.rating ? 'is-active' : ''}
                        />
                      ))}
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
