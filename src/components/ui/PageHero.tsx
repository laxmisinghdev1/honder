import type { ReactNode } from 'react'
import { AnimatedSection } from './AnimatedSection'
import { BadgePill } from './BadgePill'
import { TypingCarousel, type CarouselItem } from './TypingCarousel'

const DEFAULT_POSTER =
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80'
const DEFAULT_VIDEO =
  'https://sfdg2asfvn512.t3.storage.dev/hondar_hero.mp4'

export function PageHero({
  videoSrc = DEFAULT_VIDEO,
  videoPoster = DEFAULT_POSTER,
  badge,
  titlePrefix = '',
  carouselItems,
  staticTitle,
  description,
  modifier = '',
  children,
}: {
  videoSrc?: string
  videoPoster?: string
  badge?: string
  titlePrefix?: string
  carouselItems?: CarouselItem[]
  staticTitle?: string
  description?: string
  modifier?: string
  children?: ReactNode
}) {
  const modClass = modifier ? ` page-hero--${modifier}` : ''

  return (
    <section className={`page-hero page-hero--video${modClass}`}>
      <video
        className="page-hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={videoPoster}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="page-hero__overlay" />

      <AnimatedSection className="page-hero__content" direction="up" distance={34}>
        {badge && <BadgePill color="accent-soft" className="hero-kicker">{badge}</BadgePill>}

        {carouselItems && carouselItems.length > 0 ? (
          <h1 className="page-hero__animated-title">
            {titlePrefix && <span>{titlePrefix}</span>}
            <TypingCarousel items={carouselItems} tag="span" className="hero-carousel" />
          </h1>
        ) : staticTitle ? (
          <h1>{staticTitle}</h1>
        ) : null}

        {description && <p>{description}</p>}

        {children}
      </AnimatedSection>
    </section>
  )
}
