import type { ProductFigure as ProductFigureType, ProductTone } from '../../data/hondar'

export function ProductFigure({
  figure,
  tone,
  imageUrl,
  imageAlt,
}: {
  figure: ProductFigureType
  tone: ProductTone
  imageUrl?: string
  imageAlt?: string
}) {
  if (imageUrl) {
    return (
      <div className={`product-figure product-figure--image tone-${tone}`}>
        <img className="product-figure__image" src={imageUrl} alt={imageAlt ?? ''} loading="lazy" />
        <span className="product-figure__brandwash" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className={`product-figure product-figure--${figure} tone-${tone}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}
