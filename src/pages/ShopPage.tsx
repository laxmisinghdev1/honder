import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { BadgePill } from '../components/ui/BadgePill'
import { CTAButton } from '../components/ui/CTAButton'
import { SectionContainer } from '../components/ui/SectionContainer'
import { ProductFigure } from '../components/layout/ProductFigure'
import { FiChevronDown, FiEye, FiChevronRight } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { getCategoryFilters, getProducts, shopHeroPhrases, type CategoryKey } from '../data/hondar'
import { useLanguage } from '../i18n/LanguageContext'
import { PageHero } from '../components/ui/PageHero'

const shopCopy = {
  es: {
    eyebrow: 'Catálogo completo',
    title: 'Encuentra tu equipo ideal',
    description: 'Patines en línea, triskates, quad artístico, accesorios y repuestos. Todo el catálogo Hondar en un solo lugar.',
    searchLabel: 'Buscar en el catálogo',
    searchPlaceholder: 'Nombre, categoría, uso…',
    sortLabel: 'Ordenar por',
    sortOptions: [
      { value: 'default', label: 'Destacados' },
      { value: 'price-asc', label: 'Precio: menor a mayor' },
      { value: 'price-desc', label: 'Precio: mayor a menor' },
      { value: 'name-asc', label: 'Nombre A-Z' },
    ],
    shopByRider: 'Compra por tipo de patinador',
    riderTypes: [
      { label: 'Principiantes', key: 'beginner', href: '/shop?level=beginner' },
      { label: 'Urbano / Freeskate', key: 'urban', href: '/shop?level=urban' },
      { label: 'Artístico', key: 'artistic', href: '/shop?level=artistic' },
      { label: 'Niños', key: 'kids', href: '/shop?level=kids' },
    ],
    noResults: 'No se encontraron productos con ese filtro.',
    addToCart: 'Agregar al carrito',
    viewDetail: 'Ver detalle',
    resultsCount: (n: number) => `${n} producto${n === 1 ? '' : 's'}`,
    promoTitle: 'Ofertas de temporada',
    promoDescription: 'Descuentos activos en modelos seleccionados. Escríbenos por WhatsApp para confirmar disponibilidad.',
  },
  en: {
    eyebrow: 'Full catalog',
    title: 'Find your ideal gear',
    description: 'Inline skates, triskates, artistic quad, accessories, and spare parts. The full Hondar catalog in one place.',
    searchLabel: 'Search the catalog',
    searchPlaceholder: 'Name, category, use…',
    sortLabel: 'Sort by',
    sortOptions: [
      { value: 'default', label: 'Featured' },
      { value: 'price-asc', label: 'Price: low to high' },
      { value: 'price-desc', label: 'Price: high to low' },
      { value: 'name-asc', label: 'Name A-Z' },
    ],
    shopByRider: 'Shop by rider type',
    riderTypes: [
      { label: 'Beginners', key: 'beginner', href: '/shop?level=beginner' },
      { label: 'Urban / Freeskate', key: 'urban', href: '/shop?level=urban' },
      { label: 'Artistic', key: 'artistic', href: '/shop?level=artistic' },
      { label: 'Kids', key: 'kids', href: '/shop?level=kids' },
    ],
    noResults: 'No products found for that filter.',
    addToCart: 'Add to cart',
    viewDetail: 'View detail',
    resultsCount: (n: number) => `${n} product${n === 1 ? '' : 's'}`,
    promoTitle: 'Seasonal Deals',
    promoDescription: 'Active discounts on selected models. Message us on WhatsApp to confirm availability.',
  },
  pt: {
    eyebrow: 'Catálogo completo',
    title: 'Encontre seu equipamento ideal',
    description: 'Patins inline, triskates, quad artístico, acessórios e peças. Todo o catálogo Hondar em um só lugar.',
    searchLabel: 'Buscar no catálogo',
    searchPlaceholder: 'Nome, categoria, uso…',
    sortLabel: 'Ordenar por',
    sortOptions: [
      { value: 'default', label: 'Destacados' },
      { value: 'price-asc', label: 'Preço: menor ao maior' },
      { value: 'price-desc', label: 'Preço: maior ao menor' },
      { value: 'name-asc', label: 'Nome A-Z' },
    ],
    shopByRider: 'Compre por tipo de patinador',
    riderTypes: [
      { label: 'Iniciantes', key: 'beginner', href: '/shop?level=beginner' },
      { label: 'Urbano / Freeskate', key: 'urban', href: '/shop?level=urban' },
      { label: 'Artístico', key: 'artistic', href: '/shop?level=artistic' },
      { label: 'Crianças', key: 'kids', href: '/shop?level=kids' },
    ],
    noResults: 'Nenhum produto encontrado para esse filtro.',
    addToCart: 'Adicionar ao carrinho',
    viewDetail: 'Ver detalhe',
    resultsCount: (n: number) => `${n} produto${n === 1 ? '' : 's'}`,
    promoTitle: 'Ofertas da temporada',
    promoDescription: 'Descontos ativos em modelos selecionados. Fale conosco no WhatsApp para confirmar disponibilidade.',
  },
  zh: {
    eyebrow: '完整目录',
    title: '找到你的理想装备',
    description: '直排轮滑、三轮滑鞋、艺术四轮、配件与零配件。Hondar 全系列产品尽在一处。',
    searchLabel: '搜索产品目录',
    searchPlaceholder: '名称、类别、用途…',
    sortLabel: '排序方式',
    sortOptions: [
      { value: 'default', label: '推荐' },
      { value: 'price-asc', label: '价格：低到高' },
      { value: 'price-desc', label: '价格：高到低' },
      { value: 'name-asc', label: '名称 A-Z' },
    ],
    shopByRider: '按滑手类型选购',
    riderTypes: [
      { label: '初学者', key: 'beginner', href: '/shop?level=beginner' },
      { label: '城市 / Freeskate', key: 'urban', href: '/shop?level=urban' },
      { label: '艺术', key: 'artistic', href: '/shop?level=artistic' },
      { label: '儿童', key: 'kids', href: '/shop?level=kids' },
    ],
    noResults: '该筛选条件下未找到产品。',
    addToCart: '加入购物车',
    viewDetail: '查看详情',
    resultsCount: (n: number) => `${n} 件产品`,
    promoTitle: '季节性优惠',
    promoDescription: '部分型号正在享受折扣。请通过 WhatsApp 联系确认库存。',
  },
} as const

// Map rider type query params to category keys
const riderToCategoryMap: Record<string, CategoryKey[]> = {
  beginner: ['inline'],
  urban: ['inline'],
  artistic: ['quad'],
  kids: ['inline'],
}

export function ShopPage() {
  const { language } = useLanguage()
  const { addItem } = useCart()
  const copy = shopCopy[language]
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<CategoryKey>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')
  const [sortOpen, setSortOpen] = useState(false)
  const [riderOpen, setRiderOpen] = useState(false)

  const activeRider = searchParams.get('level') || ''

  const allProducts = useMemo(() => getProducts(language), [language])
  const categoryFilters = useMemo(() => getCategoryFilters(language), [language])

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      const matchCat = activeFilter === 'all' || p.categoryKey === activeFilter
      if (!matchCat) return false

      // Apply rider type filter
      if (activeRider && riderToCategoryMap[activeRider]) {
        const allowedCats = riderToCategoryMap[activeRider]
        if (!allowedCats.includes(p.categoryKey as CategoryKey)) return false
      }

      if (!query.trim()) return true
      const searchable = `${p.name} ${p.category} ${p.blurb}`.toLowerCase()
      return searchable.includes(query.toLowerCase())
    })

    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'name-asc') result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [allProducts, activeFilter, activeRider, query, sort])

  const handleRiderClick = (key: string) => {
    if (activeRider === key) {
      setSearchParams({})
    } else {
      setSearchParams({ level: key })
    }
  }

  const currentSortLabel = copy.sortOptions.find((o) => o.value === sort)?.label || copy.sortOptions[0].label
  const currentRiderLabel = copy.riderTypes.find((r) => r.key === activeRider)?.label || copy.shopByRider

  return (
    <main className="page-main shop-page">
      {/* Hero */}
      <PageHero
        badge={copy.eyebrow}
        titlePrefix={copy.title + ' '}
        carouselItems={shopHeroPhrases[language]}
        description={copy.description}
        modifier="shop"
      />

      {/* Promo strip (Ticker) */}
      <div className="ticker-band shop-page__promo-strip" aria-hidden="true">
        <div className="ticker-band__track">
          {Array(6).fill(null).map((_, index) => (
            <span key={index}>
              <strong>{copy.promoTitle}</strong> — {copy.promoDescription}
              <a href="https://wa.me/56988188648" target="_blank" rel="noreferrer" className="shop-page__promo-cta">
                WhatsApp
              </a>
            </span>
          ))}
        </div>
      </div>

      {/* Category Tiles */}
      <AnimatedSection direction="up" distance={24} blur={4}>
        <SectionContainer>
          <div className="shop-page__category-tiles">
            {[
              { slug: 'inline', name: { es: 'Patines en línea', en: 'Inline skates', pt: 'Patins inline', zh: '直排轮滑' } },
              { slug: 'quad', name: { es: 'Quad / Artístico', en: 'Quad / Artistic', pt: 'Quad / Artístico', zh: 'Quad / 艺术' } },
              { slug: 'wheels', name: { es: 'Ruedas y accesorios', en: 'Wheels & accessories', pt: 'Rodas e acessórios', zh: '轮子和配件' } },
              { slug: 'protection', name: { es: 'Protección', en: 'Protection', pt: 'Proteção', zh: '护具' } },
            ].map((cat, i) => (
              <AnimatedSection key={cat.slug} delay={i * 0.08} direction="up" distance={20}>
                <Link to={`/category/${cat.slug}`} className="shop-page__category-tile">
                  <span>{cat.name[language]}</span>
                  <FiChevronRight size={18} />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </SectionContainer>
      </AnimatedSection>





      {/* Catalog */}
      <AnimatedSection direction="up" distance={38} blur={6}>
        <SectionContainer>
          {/* Controls */}
          <div className="shop-page__controls" style={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'space-between', width: "100%" }}>
            <div className="shop-page__filters" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {categoryFilters.map((f) => (
                  <BadgePill
                    key={f.key}
                    active={f.key === activeFilter}
                    color={f.key === activeFilter ? 'accent' : 'muted'}
                    onClick={() => setActiveFilter(f.key)}
                  >
                    {f.label}
                  </BadgePill>
                ))}
              </div>
              <label className="catalog-search shop-page__search">
                <span className="catalog-search__label">{copy.searchLabel}</span>
                <input
                  className="catalog-search__input"
                  type="search"
                  value={query}
                  placeholder={copy.searchPlaceholder}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>
            <div className="shop-page__search-sort">


              {/* Rider Custom dropdown  */}
              <div className="shop-page__sort-wrapper">
                <button
                  type="button"
                  className="shop-page__sort-trigger"
                  onClick={() => setRiderOpen((v) => !v)}
                  aria-label={copy.shopByRider}
                >
                  <span>{currentRiderLabel}</span>
                  <FiChevronDown size={16} className={`shop-page__sort-chevron ${riderOpen ? 'shop-page__sort-chevron--open' : ''}`} />
                </button>
                {riderOpen && (
                  <div className="shop-page__sort-menu">
                    <button
                      type="button"
                      className={`shop-page__sort-option ${!activeRider ? 'shop-page__sort-option--active' : ''}`}
                      onClick={() => {
                        setSearchParams({})
                        setRiderOpen(false)
                      }}
                    >
                      {copy.shopByRider} {/* Reset option */}
                    </button>
                    {copy.riderTypes.map((rider) => (
                      <button
                        key={rider.key}
                        type="button"
                        className={`shop-page__sort-option ${activeRider === rider.key ? 'shop-page__sort-option--active' : ''}`}
                        onClick={() => {
                          handleRiderClick(rider.key)
                          setRiderOpen(false)
                        }}
                      >
                        {rider.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom dropdown instead of native select */}
              <div className="shop-page__sort-wrapper">
                <button
                  type="button"
                  className="shop-page__sort-trigger"
                  onClick={() => setSortOpen((v) => !v)}
                  aria-label={copy.sortLabel}
                >
                  <span>{currentSortLabel}</span>
                  <FiChevronDown size={16} className={`shop-page__sort-chevron ${sortOpen ? 'shop-page__sort-chevron--open' : ''}`} />
                </button>
                {sortOpen && (
                  <div className="shop-page__sort-menu">
                    {copy.sortOptions.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        className={`shop-page__sort-option ${sort === o.value ? 'shop-page__sort-option--active' : ''}`}
                        onClick={() => {
                          setSort(o.value)
                          setSortOpen(false)
                        }}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="shop-page__count">{copy.resultsCount(filtered.length)}</p>

          {filtered.length === 0 ? (
            <p className="shop-page__no-results">{copy.noResults}</p>
          ) : (
            <div className="product-grid">
              {filtered.map((product, index) => (
                <AnimatedSection
                  key={product.id}
                  className="product-card"
                  delay={index * 0.06}
                  direction={index % 4 === 0 ? 'up' : index % 4 === 1 ? 'left' : index % 4 === 2 ? 'right' : 'down'}
                  distance={28}
                  scale={0.95}
                  blur={8}
                >
                  <Link to={`/product/${product.id}`} className="product-card__visual">
                    <div className="product-card__badges">
                      <BadgePill color="accent-soft">{product.category}</BadgePill>
                      <span className="product-card__view-detail">
                        <FiEye size={14} />
                      </span>
                    </div>
                    <ProductFigure
                      figure={product.figure}
                      tone={product.tone}
                      imageUrl={product.imageUrl}
                      imageAlt={product.name}
                    />
                  </Link>

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
                        {copy.addToCart}
                      </CTAButton>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </SectionContainer>
      </AnimatedSection>
    </main>
  )
}
