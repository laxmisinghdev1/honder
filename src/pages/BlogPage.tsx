import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionContainer } from '../components/ui/SectionContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { BadgePill } from '../components/ui/BadgePill'
import { CTAButton } from '../components/ui/CTAButton'
import { PageHero } from '../components/ui/PageHero'
import { useLanguage } from '../i18n/LanguageContext'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiChevronLeft, FiClock, FiCalendar } from 'react-icons/fi'
import { blogHeroPhrases } from '../data/hondar'

const copy = {
  es: {
    eyebrow: 'Blog y guías', title: 'Aprende antes de decidir',
    description: 'Guías de compra, mantenimiento, comparativas y consejos para todos los niveles.',
    categories: ['Todos', 'Guías de compra', 'Mantenimiento', 'Principiantes', 'Seguridad'],
    readMore: 'Leer artículo',
    shopCta: 'Ver catálogo de productos',
    backToBlog: 'Volver al blog',
  },
  en: {
    eyebrow: 'Blog & guides', title: 'Learn before you decide',
    description: 'Buying guides, maintenance tips, comparisons, and advice for all levels.',
    categories: ['All', 'Buying guides', 'Maintenance', 'Beginners', 'Safety'],
    readMore: 'Read article',
    shopCta: 'Browse product catalog',
    backToBlog: 'Back to blog',
  },
  pt: {
    eyebrow: 'Blog e guias', title: 'Aprenda antes de decidir',
    description: 'Guias de compra, manutenção, comparativos e dicas para todos os níveis.',
    categories: ['Todos', 'Guias de compra', 'Manutenção', 'Iniciantes', 'Segurança'],
    readMore: 'Ler artigo',
    shopCta: 'Ver catálogo de produtos',
    backToBlog: 'Voltar ao blog',
  },
  zh: {
    eyebrow: '博客与指南', title: '在决定之前先学习',
    description: '购买指南、维护技巧、对比分析与各级别建议。',
    categories: ['全部', '购买指南', '维护保养', '初学者', '安全'],
    readMore: '阅读文章',
    shopCta: '浏览产品目录',
    backToBlog: '返回博客',
  },
} as const

const articles = [
  {
    id: 'como-elegir-primeros-patines',
    category: { es: 'Guías de compra', en: 'Buying guides', pt: 'Guias de compra', zh: '购买指南' },
    title: { es: 'Cómo elegir sus primeros patines', en: 'How to choose your first skates', pt: 'Como escolher seus primeiros patins', zh: '如何选择你的第一双轮滑鞋' },
    excerpt: { es: 'Una guía completa para principiantes: tipos, tallas y errores que evitar.', en: 'A complete guide for beginners: types, sizes, and mistakes to avoid.', pt: 'Um guia completo para iniciantes: tipos, tamanhos e erros a evitar.', zh: '初学者完整指南：类型、尺码与常见错误。' },
    date: '2025-03-01',
    readTime: { es: '5 min', en: '5 min', pt: '5 min', zh: '5 分钟' },
    image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'inline-vs-triskate-vs-quad',
    category: { es: 'Guías de compra', en: 'Buying guides', pt: 'Guias de compra', zh: '购买指南' },
    title: { es: 'Inline vs Triskate vs Quad: ¿cuál elegir?', en: 'Inline vs Triskate vs Quad: which to choose?', pt: 'Inline vs Triskate vs Quad: qual escolher?', zh: 'Inline vs Triskate vs Quad：怎么选？' },
    excerpt: { es: 'Comparativa detallada para ayudarte a elegir según tu estilo de patinaje.', en: 'Detailed comparison to help you choose based on your skating style.', pt: 'Comparativo detalhado para ajudar você a escolher conforme seu estilo.', zh: '根据你的滑行风格帮助你做出选择的详细对比。' },
    date: '2025-02-15',
    readTime: { es: '7 min', en: '7 min', pt: '7 min', zh: '7 分钟' },
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mantenimiento-rodamientos-ruedas',
    category: { es: 'Mantenimiento', en: 'Maintenance', pt: 'Manutenção', zh: '维护保养' },
    title: { es: 'Cómo mantener rodamientos y ruedas', en: 'How to maintain bearings and wheels', pt: 'Como manter rolamentos e rodas', zh: '如何维护轴承与轮子' },
    excerpt: { es: 'Todo lo que necesitas saber para prolongar la vida de tu equipo.', en: 'Everything you need to know to extend the life of your gear.', pt: 'Tudo o que você precisa saber para prolongar a vida do seu equipamento.', zh: '延长装备寿命所需了解的一切。' },
    date: '2025-01-20',
    readTime: { es: '6 min', en: '6 min', pt: '6 min', zh: '6 分钟' },
    image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a26?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cuando-reemplazar-repuestos',
    category: { es: 'Mantenimiento', en: 'Maintenance', pt: 'Manutenção', zh: '维护保养' },
    title: { es: 'Cuándo reemplazar piezas en tus patines', en: 'When to replace parts on your skates', pt: 'Quando substituir peças nos seus patins', zh: '何时更换轮滑零件' },
    excerpt: { es: 'Señales claras de que es hora de cambiar ruedas, rodamientos o freno.', en: 'Clear signs that it is time to replace wheels, bearings, or the brake.', pt: 'Sinais claros de que é hora de trocar rodas, rolamentos ou freio.', zh: '需要更换轮子、轴承或刹车的明显信号。' },
    date: '2024-12-10',
    readTime: { es: '4 min', en: '4 min', pt: '4 min', zh: '4 分钟' },
    image: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'talla-correcta-patines',
    category: { es: 'Principiantes', en: 'Beginners', pt: 'Iniciantes', zh: '初学者' },
    title: { es: 'La talla correcta: el error más frecuente', en: 'The right size: the most common mistake', pt: 'O tamanho certo: o erro mais frequente', zh: '正确尺码：最常见的错误' },
    excerpt: { es: 'Muchos compradores piden una talla más grande. Aquí te explicamos por qué es un error.', en: 'Many buyers order a size up. Here we explain why that is a mistake.', pt: 'Muitos compradores pedem um tamanho maior. Aqui explicamos por que é um erro.', zh: '很多用户会买大一号。这里解释为什么这样做是错的。' },
    date: '2024-11-05',
    readTime: { es: '3 min', en: '3 min', pt: '3 min', zh: '3 分钟' },
    image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'consejos-seguridad-patinaje',
    category: { es: 'Seguridad', en: 'Safety', pt: 'Segurança', zh: '安全' },
    title: { es: 'Consejos de seguridad para patinar en ciudad', en: 'Safety tips for urban skating', pt: 'Dicas de segurança para patinar na cidade', zh: '城市轮滑安全建议' },
    excerpt: { es: 'Casco, protecciones y hábitos esenciales para rodar con más confianza.', en: 'Helmet, pads, and essential habits for safer riding.', pt: 'Capacete, proteções e hábitos essenciais para andar com mais confiança.', zh: '头盔、护具和必备习惯，让你上路更安全。' },
    date: '2024-10-20',
    readTime: { es: '4 min', en: '4 min', pt: '4 min', zh: '4 分钟' },
    image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a26?auto=format&fit=crop&w=600&q=80',
  },
]

export function BlogPage() {
  const { language } = useLanguage()
  const c = copy[language]
  const featured = articles[0]

  return (
    <main className="page-main blog-page">
      <PageHero
        badge={c.eyebrow}
        titlePrefix={c.title + ' '}
        carouselItems={blogHeroPhrases[language]}
        description={c.description}
        modifier="blog"
      />

      <SectionContainer>
        {/* Featured */}
        <AnimatedSection direction="up" distance={32} blur={6}>
          <Link to={`/blog/${featured.id}`} className="blog-page__featured">
            <div className="blog-page__featured-image">
              <img src={featured.image} alt={featured.title[language]} loading="lazy" />
            </div>
            <div className="blog-page__featured-content">
              <BadgePill color="accent">{featured.category[language]}</BadgePill>
              <h2>{featured.title[language]}</h2>
              <p>{featured.excerpt[language]}</p>
              <span className="blog-page__read-more">
                {c.readMore}
                <FiChevronRight size={16} />
              </span>
            </div>
          </Link>
        </AnimatedSection>

        {/* Grid */}
        <AnimatedSection direction="up" distance={28} blur={6}>
          <SectionHeading eyebrow="" title="" description="" />
          <div className="blog-page__grid">
            {articles.slice(1).map((article, i) => (
              <AnimatedSection key={article.id} className="blog-page__card" delay={i * 0.08} direction="up" distance={24} blur={6}>
                <Link to={`/blog/${article.id}`}>
                  <div className="blog-page__card-image">
                    <img src={article.image} alt={article.title[language]} loading="lazy" />
                  </div>
                  <div className="blog-page__card-content">
                    <BadgePill color="accent-soft">{article.category[language]}</BadgePill>
                    <h3>{article.title[language]}</h3>
                    <p>{article.excerpt[language]}</p>
                    <div className="blog-page__card-footer">
                      <div className="blog-page__card-meta">
                        <span><FiCalendar size={13} /> {article.date}</span>
                        <span><FiClock size={13} /> {article.readTime[language]}</span>
                      </div>
                      <span className="blog-page__read-more blog-page__read-more--sm">
                        {c.readMore}
                        <FiChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" distance={24}>
          <div className="blog-page__shop-cta">
            <CTAButton href="/shop">{c.shopCta}</CTAButton>
          </div>
        </AnimatedSection>
      </SectionContainer>
    </main>
  )
}

export function BlogPostPage() {
  const { language } = useLanguage()
  const c = copy[language]

  return (
    <main className="page-main blog-post-page">
      <SectionContainer>
        <AnimatedSection direction="up" distance={28}>
          <Link to="/blog" className="product-detail__back">
            <FiChevronLeft size={18} />
            <span>{c.backToBlog}</span>
          </Link>
        </AnimatedSection>
        <AnimatedSection direction="up" distance={32} blur={6}>
          <div className="blog-post__layout">
            <div className="blog-post__image">
              <img src={articles[0].image} alt={articles[0].title[language]} />
            </div>
            <div className="blog-post__content">
              <div className="blog-post__header" style={{ marginTop: '1rem' }}>
                <BadgePill color="accent">{articles[0].category[language]}</BadgePill>
                <h1>{articles[0].title[language]}</h1>
                <p className="blog-post__excerpt">{articles[0].excerpt[language]}</p>
              </div>
              <div className="blog-post__body">
                <p>{articles[0].excerpt[language]}</p>
                <p>{`// TODO: Full article content will be added further.`}</p>
              </div>
              <div className="blog-post__cta">
                <CTAButton href="/shop">{c.shopCta}</CTAButton>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </SectionContainer>
    </main>
  )
}
