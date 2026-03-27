import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiEye } from 'react-icons/fi'
import { ProductQuickView } from '../components/catalog/ProductQuickView'
import { ContactSection } from '../components/sections/ContactSection'
import { ProductFigure } from '../components/layout/ProductFigure'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { BadgePill } from '../components/ui/BadgePill'
import { CTAButton } from '../components/ui/CTAButton'
import { SectionContainer } from '../components/ui/SectionContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TypingCarousel } from '../components/ui/TypingCarousel'
import { PageLoader } from '../components/ui/PageLoader'
import { useCart } from '../context/CartContext'

import {
  benefitsPhrasesByLanguage,
  catalogPhrasesByLanguage,
  contactDetails,
  getBenefits,
  getCategories,
  getCategoryFilters,
  getFaqs,
  getHeroStats,
  getProducts,
  getRolloutModules,
  heroPhrasesByLanguage,
  heroVideoUrl,
  shippingPhrasesByLanguage,
  tickerItemsByLanguage,
  type CategoryKey,
  type Product,
} from '../data/hondar'
import { useLanguage } from '../i18n/LanguageContext'

const sectionGalleryImages = [
  'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519766304817-4f37bda74a26?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1200&q=80',
]
const heroVideoPoster =
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80'
const catalogSearchCopy = {
  es: { label: 'Buscar productos', placeholder: 'Busca por nombre, categoria o uso' },
  en: { label: 'Search products', placeholder: 'Search by name, category, or use' },
  pt: { label: 'Buscar produtos', placeholder: 'Busque por nome, categoria ou uso' },
  zh: { label: '搜索产品', placeholder: '按名称、类别或用途搜索' },
} as const

export function HomePage() {
  const { addItem } = useCart()
  const { language, t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<CategoryKey>('all')
  const [catalogQuery, setCatalogQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const products = useMemo(() => getProducts(language), [language])
  const categoryFilters = useMemo(() => getCategoryFilters(language), [language])
  const heroStats = useMemo(() => getHeroStats(language), [language])
  const benefits = useMemo(() => getBenefits(language), [language])
  const categories = useMemo(() => getCategories(language), [language])
  const rolloutModules = useMemo(() => getRolloutModules(language), [language])
  const faqs = useMemo(() => getFaqs(language), [language])
  const tickerItems = tickerItemsByLanguage[language]
  const searchCopy = catalogSearchCopy[language]

  const filteredProducts = useMemo(() => {
    const normalizedQuery = catalogQuery.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = activeFilter === 'all' || product.categoryKey === activeFilter
      if (!matchesCategory) return false
      if (!normalizedQuery) return true
      const searchableText = `${product.name} ${product.category} ${product.blurb}`.toLowerCase()
      return searchableText.includes(normalizedQuery)
    })
  }, [activeFilter, catalogQuery, products])

  return (
    <>
      <PageLoader isLoading={!isVideoLoaded} />
      
      <ProductQuickView
        product={selectedProduct}
        language={language}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product) => {
          addItem({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            priceLabel: product.priceLabel,
          })
          setSelectedProduct(null)
        }}
      />

      <section className="hero-section" id="inicio">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={heroVideoPoster}
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlayThrough={() => setIsVideoLoaded(true)}
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-section__inner">
          <div className="hero-grid">
            <AnimatedSection className="hero-copy" distance={34}>
              <BadgePill color="accent-soft" className="hero-kicker">
                {t('hero.badge')}
              </BadgePill>
              <p className="hero-eyebrow">{t('hero.eyebrow')}</p>
              <h1 className="hero-title">
                <span>{t('hero.headingPrefix')}</span>
                <TypingCarousel items={heroPhrasesByLanguage[language]} tag="span" className="hero-carousel" />
              </h1>
              <p className="hero-description">{t('hero.description')}</p>

              <div className="hero-actions">
                <CTAButton href="#catalogo">{t('hero.primaryCta')}</CTAButton>
                <CTAButton href={contactDetails.phoneHref} variant="secondary" target="_blank" rel="noreferrer">
                  {t('hero.secondaryCta')}
                </CTAButton>
              </div>

              <div className="hero-stats">
                {heroStats.map((stat, index) => (
                  <AnimatedSection key={stat.label} delay={index * 0.08} className="hero-stat-card">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="ticker-band" aria-hidden="true">
        <div className="ticker-band__track">
          {tickerItems.concat(tickerItems).map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <AnimatedSection direction="up" distance={38} blur={6}>
        <SectionContainer id="catalogo">
          <AnimatedSection direction="left" distance={30}>
            <SectionHeading
              eyebrow={t('catalog.eyebrow')}
              title={<TypingCarousel items={catalogPhrasesByLanguage[language]} tag="span" />}
              description={t('catalog.description')}
            />
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.06} distance={28}>
            <div className="filter-row">
              {categoryFilters.map((filter) => (
                <BadgePill
                  key={filter.key}
                  active={filter.key === activeFilter}
                  color={filter.key === activeFilter ? 'accent' : 'muted'}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </BadgePill>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.1} distance={24}>
            <div className="catalog-search-row">
              <label className="catalog-search">
                <span className="catalog-search__label">{searchCopy.label}</span>
                <input
                  className="catalog-search__input"
                  type="search"
                  value={catalogQuery}
                  placeholder={searchCopy.placeholder}
                  onChange={(event) => setCatalogQuery(event.target.value)}
                />
              </label>
              <Link to="/shop" className="catalog-view-all-btn">
                {t('catalog.viewAll') || 'Ver catálogo completo'}
                <FiChevronRight size={18} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <AnimatedSection
                key={product.id}
                className="product-card"
                delay={index * 0.07}
                direction={index % 4 === 0 ? 'up' : index % 4 === 1 ? 'left' : index % 4 === 2 ? 'right' : 'down'}
                distance={30}
                scale={0.95}
                blur={8}
              >
                <button
                  className="product-card__visual"
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="product-card__badges">
                    <BadgePill color="accent-soft">{product.category}</BadgePill>
                    <Link to={`/product/${product.id}`} className="product-card__view-detail" onClick={(e) => e.stopPropagation()}>
                      <FiEye size={14} />
                    </Link>
                  </div>
                  <ProductFigure
                    figure={product.figure}
                    tone={product.tone}
                    imageUrl={product.imageUrl}
                    imageAlt={product.name}
                  />
                </button>

                <div className="product-card__body">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.blurb}</p>
                  </div>

                  <div className="product-card__footer">
                    <div>
                      <strong>{product.priceLabel}</strong>
                      <span>{product.category}</span>
                    </div>

                    <CTAButton
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          category: product.category,
                          price: product.price,
                          priceLabel: product.priceLabel,
                        })
                      }
                    >
                      {t('hero.addToCart')}
                    </CTAButton>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </SectionContainer>
      </AnimatedSection>

      <AnimatedSection direction="down" distance={34} blur={6}>
        <SectionContainer id="ventajas" className="immersive-section immersive-section--benefits">
          <div className="section-atmosphere section-atmosphere--speed" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <AnimatedSection direction="right" distance={28}>
            <SectionHeading
              eyebrow={t('benefits.eyebrow')}
              title={<TypingCarousel items={benefitsPhrasesByLanguage[language]} tag="h2" />}
              description={t('benefits.description')}
            />
          </AnimatedSection>

          <div className="benefit-grid">
            {benefits.map((benefit, index) => (
              <AnimatedSection
                key={benefit.title}
                className="benefit-card"
                direction={index === 0 ? 'left' : index === 1 ? 'up' : 'right'}
                delay={index * 0.1}
                distance={32}
                scale={0.96}
                blur={8}
              >
                <span className="benefit-card__index">0{index + 1}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </SectionContainer>
      </AnimatedSection>

      <AnimatedSection direction="up" distance={40} blur={8}>
        <SectionContainer className="categories-section immersive-section immersive-section--gallery">
          <div className="section-photo-marquee" aria-hidden="true">
            <div className="section-photo-marquee__track">
              {sectionGalleryImages.concat(sectionGalleryImages).map((image, index) => (
                <div key={`${image}-${index}`} className="section-photo-marquee__item">
                  <img src={image} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <AnimatedSection direction="left" distance={28}>
            <SectionHeading
              eyebrow={t('categories.eyebrow')}
              title={t('categories.title')}
              description={t('categories.description')}
            />
          </AnimatedSection>

          <div className="category-grid">
            {categories.map((category, index) => (
              <AnimatedSection
                key={category.title}
                className="category-card"
                direction={index % 2 === 0 ? 'right' : 'left'}
                delay={index * 0.08}
                distance={34}
                scale={0.97}
                blur={8}
              >
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span>{category.detail}</span>
              </AnimatedSection>
            ))}
          </div>
        </SectionContainer>
      </AnimatedSection>

      <AnimatedSection direction="left" distance={40} blur={8}>
        <SectionContainer className="band-section immersive-section immersive-section--route">
          <div className="section-route-lines" aria-hidden="true">
            <span />
            <span />
          </div>
          <AnimatedSection className="band-section__copy" direction="up" distance={26}>
            <SectionHeading
              eyebrow={t('shipping.eyebrow')}
              title={<TypingCarousel items={shippingPhrasesByLanguage[language]} tag="h2" />}
              description={t('shipping.description')}
            />
          </AnimatedSection>

          <div className="band-section__cards">
            <AnimatedSection className="band-card" delay={0.05} direction="left" distance={30} scale={0.97} blur={6}>
              <strong>{t('shipping.card1.title')}</strong>
              <p>{t('shipping.card1.description')}</p>
            </AnimatedSection>
            <AnimatedSection className="band-card" delay={0.13} direction="up" distance={30} scale={0.97} blur={6}>
              <strong>{t('shipping.card2.title')}</strong>
              <p>{t('shipping.card2.description')}</p>
            </AnimatedSection>
            <AnimatedSection className="band-card" delay={0.21} direction="right" distance={30} scale={0.97} blur={6}>
              <strong>{t('shipping.card3.title')}</strong>
              <p>{t('shipping.card3.description')}</p>
            </AnimatedSection>
          </div>
        </SectionContainer>
      </AnimatedSection>

      <AnimatedSection direction="right" distance={38} blur={8}>
        <SectionContainer id="escala" className="immersive-section immersive-section--trust">
          <div className="section-atmosphere section-atmosphere--trust" aria-hidden="true">
            <span />
            <span />
          </div>
          <AnimatedSection direction="down" distance={24}>
            <SectionHeading
              eyebrow={t('trust.eyebrow')}
              title={t('trust.title')}
              description={t('trust.description')}
            />
          </AnimatedSection>

          <div className="rollout-grid">
            {rolloutModules.map((module, index) => (
              <AnimatedSection
                key={module.title}
                className="rollout-card"
                delay={index * 0.1}
                direction={index === 0 ? 'left' : index === 1 ? 'down' : 'right'}
                distance={34}
                scale={0.97}
                blur={8}
              >
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </SectionContainer>
      </AnimatedSection>

      <AnimatedSection direction="up" distance={34} blur={6}>
        <SectionContainer id="faq" narrow className="immersive-section immersive-section--faq">
          <AnimatedSection direction="left" distance={24}>
            <SectionHeading
              eyebrow={t('faq.eyebrow')}
              title={t('faq.title')}
              description={t('faq.description')}
            />
          </AnimatedSection>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <AnimatedSection
                key={faq.question}
                className="faq-item"
                delay={index * 0.08}
                direction={index % 2 === 0 ? 'left' : 'right'}
                distance={28}
                scale={0.98}
                blur={6}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </AnimatedSection>
            ))}
          </div>
        </SectionContainer>
      </AnimatedSection>

      <AnimatedSection>
        <SectionContainer id="contacto" className="final-cta-section">
          <ContactSection />
        </SectionContainer>
      </AnimatedSection>
    </>
  )
}
