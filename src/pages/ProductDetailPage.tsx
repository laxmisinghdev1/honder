import { useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { BadgePill } from '../components/ui/BadgePill'
import { CTAButton } from '../components/ui/CTAButton'
import { SectionContainer } from '../components/ui/SectionContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProductFigure } from '../components/layout/ProductFigure'
import { useCart } from '../context/CartContext'
import { getProducts } from '../data/hondar'
import { useLanguage } from '../i18n/LanguageContext'
import { FiChevronLeft, FiChevronRight, FiShield, FiTruck, FiEye } from 'react-icons/fi'

const copy = {
  es: {
    backToShop: 'Volver al catálogo',
    notFound: 'Producto no encontrado',
    notFoundDesc: 'El producto que buscas no existe o fue removido.',
    backHome: 'Ir al inicio',
    addToCart: 'Agregar al carrito',
    addedToCart: '¡Agregado!',
    askWhatsApp: 'Consultar por WhatsApp',
    sizeHelp: 'Ayuda con la talla',
    sizeHelpLink: '/size-guide',
    idealFor: 'Ideal para',
    notIdealFor: 'No ideal para',
    specs: 'Especificaciones técnicas',
    related: 'Productos relacionados',
    warranty: '12 meses de garantía',
    warrantyDesc: 'Todos los patines Hondar incluyen garantía contra defectos de fabricación.',
    delivery: 'Despacho a todo Chile',
    deliveryDesc: 'Coordinamos envío o retiro según cobertura disponible.',
    selectSize: 'Seleccionar talla',
    quantity: 'Cantidad',
    discipline: 'Disciplina',
    level: 'Nivel',
    wheelSize: 'Tamaño de rueda',
    material: 'Material del boot',
    bearings: 'Rodamientos',
  },
  en: {
    backToShop: 'Back to catalog',
    notFound: 'Product not found',
    notFoundDesc: 'The product you are looking for does not exist or was removed.',
    backHome: 'Go to home',
    addToCart: 'Add to cart',
    addedToCart: 'Added!',
    askWhatsApp: 'Ask on WhatsApp',
    sizeHelp: 'Size help',
    sizeHelpLink: '/size-guide',
    idealFor: 'Ideal for',
    notIdealFor: 'Not ideal for',
    specs: 'Technical specifications',
    related: 'Related products',
    warranty: '12-month warranty',
    warrantyDesc: 'All Hondar skates include a warranty against manufacturing defects.',
    delivery: 'Delivery across Chile',
    deliveryDesc: 'We coordinate shipping or pickup based on available coverage.',
    selectSize: 'Select size',
    quantity: 'Quantity',
    discipline: 'Discipline',
    level: 'Level',
    wheelSize: 'Wheel size',
    material: 'Boot material',
    bearings: 'Bearings',
  },
  pt: {
    backToShop: 'Voltar ao catálogo',
    notFound: 'Produto não encontrado',
    notFoundDesc: 'O produto que você procura não existe ou foi removido.',
    backHome: 'Ir ao início',
    addToCart: 'Adicionar ao carrinho',
    addedToCart: 'Adicionado!',
    askWhatsApp: 'Perguntar no WhatsApp',
    sizeHelp: 'Ajuda com tamanho',
    sizeHelpLink: '/size-guide',
    idealFor: 'Ideal para',
    notIdealFor: 'Não ideal para',
    specs: 'Especificações técnicas',
    related: 'Produtos relacionados',
    warranty: '12 meses de garantia',
    warrantyDesc: 'Todos os patins Hondar incluem garantia contra defeitos de fabricação.',
    delivery: 'Entrega em todo o Chile',
    deliveryDesc: 'Coordenamos envio ou retirada conforme a cobertura disponível.',
    selectSize: 'Selecionar tamanho',
    quantity: 'Quantidade',
    discipline: 'Disciplina',
    level: 'Nível',
    wheelSize: 'Tamanho da roda',
    material: 'Material do boot',
    bearings: 'Rolamentos',
  },
  zh: {
    backToShop: '返回目录',
    notFound: '未找到产品',
    notFoundDesc: '你查找的产品不存在或已被移除。',
    backHome: '返回首页',
    addToCart: '加入购物车',
    addedToCart: '已添加！',
    askWhatsApp: '通过 WhatsApp 咨询',
    sizeHelp: '尺码帮助',
    sizeHelpLink: '/size-guide',
    idealFor: '适合',
    notIdealFor: '不适合',
    specs: '技术规格',
    related: '相关产品',
    warranty: '12个月保修',
    warrantyDesc: '所有 Hondar 轮滑鞋均附带制造缺陷保修。',
    delivery: '全智利配送',
    deliveryDesc: '根据覆盖范围协调发货或自取。',
    selectSize: '选择尺码',
    quantity: '数量',
    discipline: '运动',
    level: '级别',
    wheelSize: '轮子尺寸',
    material: '靴体材质',
    bearings: '轴承',
  },
} as const

// Extended product specs keyed by product id
const productSpecs: Record<string, {
  discipline: Record<string, string>
  level: Record<string, string>
  wheelSize: Record<string, string>
  material: Record<string, string>
  bearings: Record<string, string>
  idealFor: Record<string, string[]>
  notIdealFor: Record<string, string[]>
  sizes: string[]
  images: string[]
}> = {
  'hondar-patin-en-linea-holy-rosada-escuela': {
    discipline: { es: 'Urbano / Escuela', en: 'Urban / School', pt: 'Urbano / Escola', zh: '城市 / 学校' },
    level: { es: 'Principiante', en: 'Beginner', pt: 'Iniciante', zh: '初学者' },
    wheelSize: { es: '76–80 mm', en: '76–80 mm', pt: '76–80 mm', zh: '76–80 mm' },
    material: { es: 'Plástico termoplástico', en: 'Thermoplastic', pt: 'Termoplástico', zh: '热塑性塑料' },
    bearings: { es: 'ABEC-5', en: 'ABEC-5', pt: 'ABEC-5', zh: 'ABEC-5' },
    idealFor: {
      es: ['Aprender a patinar', 'Uso recreativo', 'Desplazarse en ciudad', 'Niños y adultos principiantes'],
      en: ['Learning to skate', 'Recreational use', 'Urban commuting', 'Kids and beginner adults'],
      pt: ['Aprender a patinar', 'Uso recreativo', 'Deslocamento urbano', 'Crianças e adultos iniciantes'],
      zh: ['学习轮滑', '休闲用途', '城市通勤', '儿童与初学者成人'],
    },
    notIdealFor: {
      es: ['Freeskate agresivo', 'Velocidad avanzada', 'Patinaje artístico competitivo'],
      en: ['Aggressive freeskate', 'Advanced speed', 'Competitive artistic skating'],
      pt: ['Freeskate agressivo', 'Velocidade avançada', 'Patinagem artística competitiva'],
      zh: ['激进 freeskate', '高速竞技', '竞技艺术滑冰'],
    },
    sizes: ['33', '34', '35', '36', '37', '38', '39', '40'],
    images: [
      'https://www.kamaro.cl/cdn/shop/files/hondarholyescuelarosa.png?v=1704218577',
      'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'hondar-patin-roller-titan-3x110mm': {
    discipline: { es: 'Velocidad / Fitness', en: 'Speed / Fitness', pt: 'Velocidade / Fitness', zh: '速度 / 健身' },
    level: { es: 'Intermedio–Avanzado', en: 'Intermediate–Advanced', pt: 'Intermediário–Avançado', zh: '中高级' },
    wheelSize: { es: '3×110 mm', en: '3×110 mm', pt: '3×110 mm', zh: '3×110 mm' },
    material: { es: 'Fibra de carbono + plástico', en: 'Carbon fiber + plastic', pt: 'Fibra de carbono + plástico', zh: '碳纤维 + 塑料' },
    bearings: { es: 'ABEC-9', en: 'ABEC-9', pt: 'ABEC-9', zh: 'ABEC-9' },
    idealFor: {
      es: ['Fitness y distancias largas', 'Patinaje urbano rápido', 'Riders con experiencia previa'],
      en: ['Fitness and long distances', 'Fast urban skating', 'Riders with prior experience'],
      pt: ['Fitness e longas distâncias', 'Patinagem urbana rápida', 'Riders com experiência prévia'],
      zh: ['健身与长途滑行', '快速城市滑冰', '有经验的滑手'],
    },
    notIdealFor: {
      es: ['Principiantes absolutos', 'Patinaje artístico', 'Pistas de hielo'],
      en: ['Complete beginners', 'Artistic skating', 'Ice rinks'],
      pt: ['Iniciantes absolutos', 'Patinagem artística', 'Pistas de gelo'],
      zh: ['完全初学者', '艺术滑冰', '冰场'],
    },
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    images: [
      'https://www.kamaro.cl/cdn/shop/files/HondarPatinTitan110.png?v=1698853486',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    ],
  },
}

// Default specs for products without detailed info
const defaultSpec = (lang: string) => ({
  discipline: { es: 'Urbano', en: 'Urban', pt: 'Urbano', zh: '城市' }[lang] || 'Urbano',
  level: { es: 'General', en: 'General', pt: 'Geral', zh: '通用' }[lang] || 'General',
  wheelSize: { es: 'Ver descripción', en: 'See description', pt: 'Ver descrição', zh: '见描述' }[lang] || 'Ver descripción',
  material: { es: 'Ver descripción', en: 'See description', pt: 'Ver descrição', zh: '见描述' }[lang] || 'Ver descripción',
  bearings: { es: 'ABEC-7', en: 'ABEC-7', pt: 'ABEC-7', zh: 'ABEC-7' }[lang] || 'ABEC-7',
  idealFor: [],
  notIdealFor: [],
  sizes: ['36', '37', '38', '39', '40', '41', '42'],
  images: [] as string[],
})

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const { addItem } = useCart()
  const c = copy[language]
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [mainImage, setMainImage] = useState(0)

  const allProducts = useMemo(() => getProducts(language), [language])
  const product = allProducts.find((p) => p.id === id)
  const spec = (id && productSpecs[id]) ? productSpecs[id] : null
  const images = spec?.images?.length ? spec.images : product ? [product.imageUrl] : []
  const sizes = spec?.sizes || defaultSpec(language).sizes

  const related = useMemo(
    () => allProducts.filter((p) => p.categoryKey === product?.categoryKey && p.id !== id).slice(0, 4),
    [allProducts, product, id]
  )

  if (!product) {
    return (
      <main className="page-main not-found-page">
        <SectionContainer narrow>
          <AnimatedSection direction="up" distance={32}>
            <h1>{c.notFound}</h1>
            <p>{c.notFoundDesc}</p>
            <CTAButton onClick={() => navigate('/')}>{c.backHome}</CTAButton>
          </AnimatedSection>
        </SectionContainer>
      </main>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      priceLabel: product.priceLabel,
      quantity: qty
    })
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
  }

  return (
    <main className="page-main product-detail-page">
      <SectionContainer>
        <AnimatedSection direction="left" distance={20}>
          <Link to="/shop" className="product-detail__back">
            <FiChevronLeft size={18} />
            <span>{c.backToShop}</span>
          </Link>
        </AnimatedSection>

        <div className="product-detail__layout">
          {/* Gallery */}
          <AnimatedSection className="product-detail__gallery" direction="left" distance={36} blur={8}>
            <div className="product-detail__main-image">
              <img src={images[mainImage] || product.imageUrl} alt={product.name} />
            </div>
            {images.length > 1 && (
              <div className="product-detail__thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`product-detail__thumb ${mainImage === i ? 'product-detail__thumb--active' : ''}`}
                    onClick={() => setMainImage(i)}
                    type="button"
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges - moved below gallery (item 6.4e) */}
            <div className="product-detail__trust">
              <div className="product-detail__trust-item">
                <span className="product-detail__trust-icon"><FiShield size={22} /></span>
                <div>
                  <strong>{c.warranty}</strong>
                  <p>{c.warrantyDesc}</p>
                </div>
              </div>
              <div className="product-detail__trust-item">
                <span className="product-detail__trust-icon"><FiTruck size={22} /></span>
                <div>
                  <strong>{c.delivery}</strong>
                  <p>{c.deliveryDesc}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Info panel */}
          <AnimatedSection className="product-detail__info" direction="right" distance={36} blur={8}>
            <BadgePill color="accent-soft">{product.category}</BadgePill>
            <h1 className="product-detail__title">{product.name}</h1>
            <p className="product-detail__blurb">{product.blurb}</p>
            <div className="product-detail__price">
              <strong>{product.priceLabel}</strong>
              <BadgePill color="accent">CLP</BadgePill>
            </div>

            {/* Size selector */}
            <div className="product-detail__sizes">
              <div className="product-detail__sizes-header">
                <span>{c.selectSize}</span>
                <Link to="/size-guide" className="product-detail__size-link">
                  {c.sizeHelp}
                  <FiChevronRight size={14} />
                </Link>
              </div>
              <div className="product-detail__size-grid">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`product-detail__size-btn ${selectedSize === size ? 'product-detail__size-btn--active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="product-detail__quantity">
              <span>{c.quantity}</span>
              <div className="product-detail__qty-controls">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="product-detail__ctas">
              <CTAButton onClick={handleAddToCart} className="product-detail__add-btn">
                {addedFeedback ? c.addedToCart : c.addToCart}
              </CTAButton>
              <CTAButton
                href={`https://wa.me/56988188648?text=Hola, quiero consultar sobre: ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
              >
                {c.askWhatsApp}
              </CTAButton>
            </div>

            {/* Specs */}
            <div className="product-detail__specs">
              <h2 className="product-detail__specs-title">{c.specs}</h2>
              <div className="product-detail__specs-grid">
                <span className="spec-label">{c.discipline}</span>
                <span className="spec-value">{spec ? (spec.discipline as Record<string, string>)[language] : defaultSpec(language).discipline}</span>
                <span className="spec-label">{c.level}</span>
                <span className="spec-value">{spec ? (spec.level as Record<string, string>)[language] : defaultSpec(language).level}</span>
                <span className="spec-label">{c.wheelSize}</span>
                <span className="spec-value">{spec ? (spec.wheelSize as Record<string, string>)[language] : defaultSpec(language).wheelSize}</span>
                <span className="spec-label">{c.material}</span>
                <span className="spec-value">{spec ? (spec.material as Record<string, string>)[language] : defaultSpec(language).material}</span>
                <span className="spec-label">{c.bearings}</span>
                <span className="spec-value">{spec ? (spec.bearings as Record<string, string>)[language] : defaultSpec(language).bearings}</span>
              </div>
            </div>

            {/* Ideal for - COMMENTED OUT per item 6.4f */}
            {/* {spec && (spec.idealFor as Record<string, string[]>)[language]?.length > 0 && (
              <div className="product-detail__fit">
                <div className="product-detail__fit-block product-detail__fit-block--yes">
                  <strong>{c.idealFor}</strong>
                  <ul>
                    {((spec.idealFor as Record<string, string[]>)[language] || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="product-detail__fit-block product-detail__fit-block--no">
                  <strong>{c.notIdealFor}</strong>
                  <ul>
                    {((spec.notIdealFor as Record<string, string[]>)[language] || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )} */}
          </AnimatedSection>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <AnimatedSection direction="up" distance={32} blur={6}>
            <SectionHeading eyebrow="" title={c.related} description="" />
            <div className="product-grid product-grid--related">
              {related.map((p, index) => (
                <AnimatedSection key={p.id} className="product-card" delay={index * 0.08} direction="up" distance={24} scale={0.96} blur={6}>
                  <Link to={`/product/${p.id}`} className="product-card__visual">
                    <div className="product-card__badges">
                      <BadgePill color="accent-soft">{p.category}</BadgePill>
                      <span className="product-card__view-detail"><FiEye size={14} /></span>
                    </div>
                    <ProductFigure figure={p.figure} tone={p.tone} imageUrl={p.imageUrl} imageAlt={p.name} />
                  </Link>
                  <div className="product-card__body">
                    <div>
                      <h3>{p.name}</h3>
                      <p>{p.blurb}</p>
                    </div>
                    <div className="product-card__footer">
                      <strong>{p.priceLabel}</strong>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        )}
      </SectionContainer>
    </main>
  )
}
