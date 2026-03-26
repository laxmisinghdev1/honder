import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { BadgePill } from '../components/ui/BadgePill'
import { CTAButton } from '../components/ui/CTAButton'
import { SectionContainer } from '../components/ui/SectionContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProductFigure } from '../components/layout/ProductFigure'
import { FiChevronLeft, FiEye, FiChevronDown } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { getProducts, shopHeroPhrases, type CategoryKey } from '../data/hondar'
import { useLanguage } from '../i18n/LanguageContext'
import { PageHero } from '../components/ui/PageHero'

/* ——— Category metadata ——— */
type CategoryMeta = {
  slug: string
  categoryKey: Exclude<CategoryKey, 'all'>
  name: Record<string, string>
  description: Record<string, string>
  buyingAdvice: Record<string, string>
  faq: { q: Record<string, string>; a: Record<string, string> }[]
}

const categories: CategoryMeta[] = [
  {
    slug: 'inline',
    categoryKey: 'inline',
    name: { es: 'Patines en línea', en: 'Inline skates', pt: 'Patins inline', zh: '直排轮滑' },
    description: {
      es: 'Desde modelos de aprendizaje hasta freeskate urbano de alta gama. Explora toda la línea de patines inline Hondar.',
      en: 'From learning models to high-end urban freeskate. Explore the full Hondar inline skate line.',
      pt: 'Desde modelos de aprendizado até freeskate urbano de ponta. Explore toda a linha de patins inline Hondar.',
      zh: '从入门款到高端城市自由式。探索 Hondar 直排轮滑全线产品。',
    },
    buyingAdvice: {
      es: 'Si eres principiante, busca un boot con buen soporte de tobillo y ruedas de 76‑80 mm. Para patinadores urbanos intermedios, un frame más largo con ruedas de 80‑84 mm ofrece mayor velocidad y estabilidad.',
      en: 'If you are a beginner, look for a boot with good ankle support and 76‑80 mm wheels. For intermediate urban skaters, a longer frame with 80‑84 mm wheels offers more speed and stability.',
      pt: 'Se você é iniciante, procure um boot com bom suporte de tornozelo e rodas de 76‑80 mm. Para patinadores urbanos intermediários, um frame mais longo com rodas de 80‑84 mm oferece mais velocidade e estabilidade.',
      zh: '初学者选择脚踝支撑良好、轮径 76‑80 mm 的鞋款。中级城市滑手推荐更长刀架配 80‑84 mm 轮子，速度和稳定性更佳。',
    },
    faq: [
      {
        q: { es: '¿Qué talla de patín inline debo elegir?', en: 'What inline skate size should I choose?', pt: 'Qual tamanho de patins inline devo escolher?', zh: '我应该选什么尺码的直排轮滑？' },
        a: { es: 'Sigue nuestra guía de tallas para medir tu pie y encontrar la talla correcta. Nunca compres una talla más grande "por las dudas".', en: 'Follow our size guide to measure your foot and find the right size. Never buy a size up "just in case".', pt: 'Siga nosso guia de tamanhos para medir seu pé e encontrar o tamanho certo. Nunca compre um tamanho maior "por precaução".', zh: '请参考我们的尺码指南测量脚长，找到合适的尺码。切勿"以防万一"购买大一号。' },
      },
      {
        q: { es: '¿Cuál es la diferencia entre inline y triskate?', en: 'What is the difference between inline and triskate?', pt: 'Qual é a diferença entre inline e triskate?', zh: '直排和三轮有什么区别？' },
        a: { es: 'Los inline tienen 4 ruedas por patín, los triskate tienen 3 ruedas más grandes. Los triskate son mejores para velocidad y distancias largas.', en: 'Inline skates have 4 wheels per skate, triskates have 3 larger wheels. Triskates are better for speed and long distances.', pt: 'Patins inline têm 4 rodas por patins, triskates têm 3 rodas maiores. Triskates são melhores para velocidade e longas distâncias.', zh: '直排每只鞋4轮，三轮每只鞋3个大轮。三轮更适合速度和长距离。' },
      },
    ],
  },
  {
    slug: 'quad',
    categoryKey: 'quad',
    name: { es: 'Patines quad / artístico', en: 'Quad / Artistic skates', pt: 'Patins quad / artístico', zh: 'Quad / 艺术轮滑' },
    description: {
      es: 'Patines quad para escuela, artístico y aprendizaje. Base estable y diseño clásico para todas las edades.',
      en: 'Quad skates for school, artistic, and learning. Stable base and classic design for all ages.',
      pt: 'Patins quad para escola, artístico e aprendizado. Base estável e design clássico para todas as idades.',
      zh: '适用于学校、艺术和入门的四轮滑鞋。稳定底座和经典设计，适合所有年龄。',
    },
    buyingAdvice: {
      es: 'Los quad son perfectos para aprender: su base ancha ofrece estabilidad natural. Para artístico, busca un boot con buena rigidez y un frame de aluminio.',
      en: 'Quads are perfect for learning: their wide base provides natural stability. For artistic skating, look for a rigid boot with an aluminium frame.',
      pt: 'Quads são perfeitos para aprender: sua base larga oferece estabilidade natural. Para artístico, procure um boot com bom rigidez e frame de alumínio.',
      zh: '四轮鞋非常适合初学者：宽底盘提供天然稳定性。艺术滑冰推荐硬鞋体搭配铝框。',
    },
    faq: [
      {
        q: { es: '¿A qué edad puede empezar un niño con quads?', en: 'At what age can a child start with quads?', pt: 'Com que idade uma criança pode começar com quads?', zh: '孩子几岁可以开始用四轮鞋？' },
        a: { es: 'Desde los 3‑4 años con modelos ajustables. Siempre con casco y protecciones completas.', en: 'From age 3‑4 with adjustable models. Always with full helmet and pads.', pt: 'A partir dos 3‑4 anos com modelos ajustáveis. Sempre com capacete e proteções completas.', zh: '3-4岁起可使用可调节款。务必全程佩戴头盔和护具。' },
      },
    ],
  },
  {
    slug: 'wheels',
    categoryKey: 'wheels',
    name: { es: 'Ruedas y accesorios', en: 'Wheels & accessories', pt: 'Rodas e acessórios', zh: '轮子和配件' },
    description: {
      es: 'Ruedas de repuesto, rodamientos y accesorios esenciales para mantener tu equipo en forma.',
      en: 'Replacement wheels, bearings, and essential accessories to keep your gear in top shape.',
      pt: 'Rodas de reposição, rolamentos e acessórios essenciais para manter seu equipamento em forma.',
      zh: '替换轮子、轴承和必备配件，保持你的装备处于最佳状态。',
    },
    buyingAdvice: {
      es: 'Cambia tus ruedas cuando el diámetro se reduzca 10 mm del original o cuando notes desgaste irregular. Rota cada 20‑30 horas de uso.',
      en: 'Replace your wheels when the diameter drops 10 mm from original or you notice uneven wear. Rotate every 20‑30 hours of use.',
      pt: 'Substitua suas rodas quando o diâmetro cair 10 mm do original ou quando notar desgaste irregular. Rode a cada 20‑30 horas de uso.',
      zh: '当轮径比原始减少 10 mm 或发现不均匀磨损时更换。每使用 20‑30 小时轮换一次。',
    },
    faq: [
      {
        q: { es: '¿Qué dureza de rueda necesito?', en: 'What wheel hardness do I need?', pt: 'Que dureza de roda preciso?', zh: '我需要什么硬度的轮子？' },
        a: { es: '82A‑85A para uso urbano en exteriores, 88A‑90A para indoor y artístico. Más blandas = más agarre, más duras = más velocidad.', en: '82A‑85A for outdoor urban use, 88A‑90A for indoor and artistic. Softer = more grip, harder = more speed.', pt: '82A‑85A para uso urbano externo, 88A‑90A para indoor e artístico. Mais macias = mais aderência, mais duras = mais velocidade.', zh: '82A‑85A 适合户外城市使用，88A‑90A 适合室内和艺术滑冰。越软抓地力越强，越硬速度越快。' },
      },
    ],
  },
  {
    slug: 'protection',
    categoryKey: 'protection',
    name: { es: 'Protección', en: 'Protection', pt: 'Proteção', zh: '护具' },
    description: {
      es: 'Cascos, rodilleras, coderas y muñequeras para patinar con confianza y seguridad.',
      en: 'Helmets, knee pads, elbow pads, and wrist guards for safe and confident skating.',
      pt: 'Capacetes, joelheiras, cotoveleiras e munhequeiras para patinar com confiança e segurança.',
      zh: '头盔、护膝、护肘和护腕，让你安全自信地滑行。',
    },
    buyingAdvice: {
      es: 'Un casco es obligatorio para cualquier nivel. Las protecciones de muñeca son las más importantes después del casco — la muñeca es la lesión más común en patinaje.',
      en: 'A helmet is mandatory at any level. Wrist guards are the most important pads after the helmet — wrist injuries are the most common in skating.',
      pt: 'Capacete é obrigatório em qualquer nível. Proteções de pulso são as mais importantes depois do capacete — lesões no pulso são as mais comuns no patins.',
      zh: '头盔在任何级别都是必须的。头盔之后，护腕是最重要的护具——手腕是轮滑中最常见的受伤部位。',
    },
    faq: [
      {
        q: { es: '¿Necesito protecciones si soy principiante?', en: 'Do I need pads as a beginner?', pt: 'Preciso de proteções como iniciante?', zh: '初学者需要护具吗？' },
        a: { es: 'Absolutamente. Los principiantes caen con más frecuencia. Casco + muñequeras + rodilleras es lo mínimo recomendado.', en: 'Absolutely. Beginners fall more often. Helmet + wrist guards + knee pads are the minimum we recommend.', pt: 'Com certeza. Iniciantes caem mais frequentemente. Capacete + munhequeiras + joelheiras é o mínimo recomendado.', zh: '当然需要。初学者跌倒更频繁。头盔 + 护腕 + 护膝是最低推荐配置。' },
      },
    ],
  },
]

const pageCopy = {
  es: { backToShop: 'Volver a la tienda', addToCart: 'Agregar al carrito', viewDetail: 'Ver detalle', buyingAdvice: 'Consejo de compra', faq: 'Preguntas frecuentes', sizeCta: 'Ver guía de tallas', supportCta: 'Soporte y garantía', noProducts: 'No hay productos en esta categoría.', sortOptions: [{ value: 'default', label: 'Destacados' }, { value: 'price-asc', label: 'Precio: menor a mayor' }, { value: 'price-desc', label: 'Precio: mayor a menor' }, { value: 'name-asc', label: 'Nombre A-Z' }] },
  en: { backToShop: 'Back to shop', addToCart: 'Add to cart', viewDetail: 'View detail', buyingAdvice: 'Buying advice', faq: 'Frequently asked questions', sizeCta: 'View size guide', supportCta: 'Support & warranty', noProducts: 'No products in this category.', sortOptions: [{ value: 'default', label: 'Featured' }, { value: 'price-asc', label: 'Price: low to high' }, { value: 'price-desc', label: 'Price: high to low' }, { value: 'name-asc', label: 'Name A-Z' }] },
  pt: { backToShop: 'Voltar à loja', addToCart: 'Adicionar ao carrinho', viewDetail: 'Ver detalhe', buyingAdvice: 'Conselho de compra', faq: 'Perguntas frequentes', sizeCta: 'Ver guia de tamanhos', supportCta: 'Suporte e garantia', noProducts: 'Não há produtos nesta categoria.', sortOptions: [{ value: 'default', label: 'Destacados' }, { value: 'price-asc', label: 'Preço: menor ao maior' }, { value: 'price-desc', label: 'Preço: maior ao menor' }, { value: 'name-asc', label: 'Nome A-Z' }] },
  zh: { backToShop: '返回商店', addToCart: '加入购物车', viewDetail: '查看详情', buyingAdvice: '购买建议', faq: '常见问题', sizeCta: '查看尺码指南', supportCta: '支持与保修', noProducts: '该分类暂无产品。', sortOptions: [{ value: 'default', label: '推荐' }, { value: 'price-asc', label: '价格：低到高' }, { value: 'price-desc', label: '价格：高到低' }, { value: 'name-asc', label: '名称 A-Z' }] },
} as const

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const { language } = useLanguage()
  const { addItem } = useCart()
  const allProducts = useMemo(() => getProducts(language), [language])
  const c = pageCopy[language]

  const category = categories.find((cat) => cat.slug === slug)

  const [sort, setSort] = useState('default')
  const [sortOpen, setSortOpen] = useState(false)

  const filtered = useMemo(() => {
    if (!category) return []
    let result = allProducts.filter((p) => p.categoryKey === category.categoryKey)
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'name-asc') result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [allProducts, category, sort])

  const currentSortLabel = c.sortOptions.find((o) => o.value === sort)?.label || c.sortOptions[0].label

  if (!category) {
    return (
      <main className="page-main">
        <SectionContainer>
          <AnimatedSection direction="up" distance={28}>
            <Link to="/shop" className="product-detail__back">
              <FiChevronLeft size={18} />
              <span>{c.backToShop}</span>
            </Link>
            <p style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>Category not found.</p>
          </AnimatedSection>
        </SectionContainer>
      </main>
    )
  }

  return (
    <main className="page-main category-page">
      {/* Category Hero */}
      <PageHero
        badge={category.name[language]}
        titlePrefix={category.name[language] + ' - '}
        carouselItems={shopHeroPhrases[language]}
        description={category.description[language]}
        modifier="category"
      />

      <SectionContainer>
        {/* Back + Sort */}
        <AnimatedSection direction="up" distance={24} className="category-page__toolbar-section">
          <div className="category-page__toolbar">
            <Link to="/shop" className="product-detail__back">
              <FiChevronLeft size={18} />
              <span>{c.backToShop}</span>
            </Link>
            <div className="shop-page__sort-wrapper">
              <button type="button" className="shop-page__sort-trigger" onClick={() => setSortOpen((v) => !v)}>
                <span>{currentSortLabel}</span>
                <FiChevronDown size={16} className={`shop-page__sort-chevron ${sortOpen ? 'shop-page__sort-chevron--open' : ''}`} />
              </button>
              {sortOpen && (
                <div className="shop-page__sort-menu">
                  {c.sortOptions.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      className={`shop-page__sort-option ${sort === o.value ? 'shop-page__sort-option--active' : ''}`}
                      onClick={() => { setSort(o.value); setSortOpen(false) }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <p className="shop-page__no-results">{c.noProducts}</p>
        ) : (
          <div className="product-grid">
            {filtered.map((product, index) => (
              <AnimatedSection
                key={product.id}
                className="product-card"
                delay={index * 0.06}
                direction="up"
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
                  <ProductFigure figure={product.figure} tone={product.tone} imageUrl={product.imageUrl} imageAlt={product.name} />
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
                      onClick={() => addItem({ id: product.id, name: product.name, category: product.category, price: product.price, priceLabel: product.priceLabel })}
                    >
                      {c.addToCart}
                    </CTAButton>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* Buying Advice */}
        <AnimatedSection direction="up" distance={28} blur={6}>
          <div className="category-page__advice">
            <SectionHeading eyebrow="" title={c.buyingAdvice} description="" />
            <p>{category.buyingAdvice[language]}</p>
          </div>
        </AnimatedSection>

        {/* FAQ */}
        {category.faq.length > 0 && (
          <AnimatedSection direction="up" distance={28} blur={6}>
            <SectionHeading eyebrow="" title={c.faq} description="" />
            <div className="category-page__faq-list">
              {category.faq.map((item, i) => (
                <AnimatedSection key={i} className="faq-item" delay={i * 0.1} direction="up" distance={20}>
                  <h3>{item.q[language]}</h3>
                  <p>{item.a[language]}</p>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* CTAs */}
        <AnimatedSection direction="up" distance={24}>
          <div className="category-page__ctas">
            <CTAButton href="/size-guide">{c.sizeCta}</CTAButton>
            <CTAButton href="/support" variant="secondary">{c.supportCta}</CTAButton>
          </div>
        </AnimatedSection>
      </SectionContainer>
    </main>
  )
}
