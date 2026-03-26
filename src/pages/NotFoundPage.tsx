import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionContainer } from '../components/ui/SectionContainer'
import { CTAButton } from '../components/ui/CTAButton'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  es: { code: '404', title: 'Página no encontrada', desc: 'La página que buscas no existe o fue movida.', cta: 'Volver al inicio', shop: 'Ir al catálogo' },
  en: { code: '404', title: 'Page not found', desc: 'The page you are looking for does not exist or was moved.', cta: 'Go to home', shop: 'Browse catalog' },
  pt: { code: '404', title: 'Página não encontrada', desc: 'A página que você procura não existe ou foi movida.', cta: 'Voltar ao início', shop: 'Ir ao catálogo' },
  zh: { code: '404', title: '页面未找到', desc: '你访问的页面不存在或已被移动。', cta: '返回首页', shop: '浏览产品目录' },
} as const

export function NotFoundPage() {
  const { language } = useLanguage()
  const c = copy[language]

  return (
    <main className="page-main not-found-page">
      <SectionContainer narrow>
        <AnimatedSection direction="up" distance={40} className="not-found-page__content">
          <span className="not-found-page__code">{c.code}</span>
          <h1>{c.title}</h1>
          <p>{c.desc}</p>
          <div className="not-found-page__ctas">
            <CTAButton href="/">{c.cta}</CTAButton>
            <CTAButton href="/shop" variant="secondary">{c.shop}</CTAButton>
          </div>
        </AnimatedSection>
      </SectionContainer>
    </main>
  )
}
