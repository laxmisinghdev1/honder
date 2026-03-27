import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionContainer } from '../components/ui/SectionContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTAButton } from '../components/ui/CTAButton'
import { PageHero } from '../components/ui/PageHero'
import { useLanguage } from '../i18n/LanguageContext'
import { contactDetails, sizeGuideHeroPhrases } from '../data/hondar'
import { Link } from 'react-router-dom'

const copy = {
  es: {
    eyebrow: 'Guía de tallas', title: 'Encuentra tu talla perfecta',
    description: 'Para patines, elegir la talla correcta es clave para el confort, el control y la seguridad.',
    measureTitle: 'Cómo medir tu pie',
    measureSteps: [
      'Apoya el pie sobre una hoja de papel en el suelo.',
      'Marca el punto más largo del talón y el dedo más largo.',
      'Mide la distancia en centímetros.',
      'Usa la tabla correspondiente a tu tipo de patín.',
    ],
    tableTitle: 'Tabla de tallas Hondar',
    kidsAdultTitle: 'Niños vs Adultos',
    kidsAdultDesc: 'Los modelos Holy están disponibles en tallas 33–43. Los triskates Titan son para adultos desde talla 38.',
    faqTitle: 'Errores comunes de talla',
    faqItems: [
      { q: '¿Debo pedir una talla más grande?', a: 'No necesariamente. Mide tu pie en cm y usa las tablas.' },
      { q: 'El patín me aprieta en mi talla habitual', a: 'Prueba un número más. WhatsApp para orientación personalizada.' },
      { q: '¿Los niños deben comprar talla más grande?', a: 'No más de medio número. Un patín grande reduce el control.' },
    ],
    askCta: 'Consultar mi talla por WhatsApp',
    shopCta: 'Ir al catálogo',
    chartHeaders: ['Talla', 'CM de pie', 'EU'],
  },
  en: {
    eyebrow: 'Size guide', title: 'Find your perfect size',
    description: 'For skates, choosing the right size is key for comfort, control, and safety.',
    measureTitle: 'How to measure your foot',
    measureSteps: [
      'Stand on a sheet of paper on the floor.',
      'Mark the longest point of your heel and longest toe.',
      'Measure the distance in centimeters.',
      'Use the chart for your skate type.',
    ],
    tableTitle: 'Hondar size chart',
    kidsAdultTitle: 'Kids vs Adults',
    kidsAdultDesc: 'Holy models are available in sizes 33–43. Titan triskates are for adults from size 38.',
    faqTitle: 'Common sizing mistakes',
    faqItems: [
      { q: 'Should I order a size up?', a: 'Not necessarily. Measure your foot in cm and use the charts.' },
      { q: 'The skate feels tight in my usual size', a: 'Try one size up. Message on WhatsApp for personalized guidance.' },
      { q: 'Should kids buy a size up?', a: 'No more than half a size. A big skate reduces control.' },
    ],
    askCta: 'Ask about my size on WhatsApp',
    shopCta: 'Go to the catalog',
    chartHeaders: ['Size', 'Foot cm', 'EU'],
  },
  pt: {
    eyebrow: 'Guia de tamanhos', title: 'Encontre seu tamanho perfeito',
    description: 'Para patins, escolher o tamanho certo é fundamental para conforto, controle e segurança.',
    measureTitle: 'Como medir seu pé',
    measureSteps: [
      'Apoie o pé sobre uma folha de papel no chão.',
      'Marque o ponto mais longo do calcanhar e do dedo mais longo.',
      'Meça a distância em centímetros.',
      'Use a tabela do tipo de patim.',
    ],
    tableTitle: 'Tabela de tamanhos Hondar',
    kidsAdultTitle: 'Crianças vs Adultos',
    kidsAdultDesc: 'Modelos Holy disponíveis nos tamanhos 33–43. Triskates Titan são para adultos a partir de 38.',
    faqTitle: 'Erros comuns de tamanho',
    faqItems: [
      { q: 'Devo pedir um tamanho maior?', a: 'Não necessariamente. Meça o pé em cm e use as tabelas.' },
      { q: 'O patim aperta no meu tamanho habitual', a: 'Experimente um número maior. WhatsApp para orientação personalizada.' },
      { q: 'Crianças devem comprar tamanho maior?', a: 'No máximo meio número. Um patim grande demais reduz o controle.' },
    ],
    askCta: 'Consultar meu tamanho no WhatsApp',
    shopCta: 'Ir ao catálogo',
    chartHeaders: ['Tamanho', 'CM do pé', 'EU'],
  },
  zh: {
    eyebrow: '尺码指南', title: '找到你的完美尺码',
    description: '对于轮滑鞋来说，选择正确的尺码对于舒适度、控制性和安全性至关重要。',
    measureTitle: '如何测量你的脚',
    measureSteps: [
      '将脚踩在地板的纸上。',
      '标记脚跟最长点和最长脚趾位置。',
      '用厘米测量两点之间的距离。',
      '使用对应类型的尺码表。',
    ],
    tableTitle: 'Hondar 尺码表',
    kidsAdultTitle: '儿童 vs 成人',
    kidsAdultDesc: 'Holy 系列提供 33–43 码。Titan 三轮仅供成人，从 38 码起。',
    faqTitle: '常见尺码错误',
    faqItems: [
      { q: '我该买大一号吗？', a: '不一定。请测量脚长（厘米），再参照尺码表。' },
      { q: '我平时穿的尺码偏紧', a: '可以试试大一号。可通过 WhatsApp 咨询个性化建议。' },
      { q: '儿童是否应该买大一号？', a: '最多只大半码。鞋太大会降低控制能力。' },
    ],
    askCta: '通过 WhatsApp 咨询尺码',
    shopCta: '进入产品目录',
    chartHeaders: ['尺码', '脚长 cm', '欧码'],
  },
} as const

const sizeChart = [
  ['33', '20.5–21', '33'], ['34', '21–21.5', '34'], ['35', '21.5–22', '35'],
  ['36', '22–22.5', '36'], ['37', '22.5–23', '37'], ['38', '23–23.5', '38'],
  ['39', '23.5–24', '39'], ['40', '24–24.5', '40'], ['41', '24.5–25', '41'],
  ['42', '25–25.5', '42'], ['43', '25.5–26', '43'], ['44', '26–26.5', '44'], ['45', '26.5–27', '45'],
]

export function SizeGuidePage() {
  const { language } = useLanguage()
  const c = copy[language]

  return (
    <main className="page-main size-guide-page">
      <PageHero
        badge={c.eyebrow}
        titlePrefix={c.title + ' '}
        carouselItems={sizeGuideHeroPhrases[language]}
        description={c.description}
        modifier="size-guide"
      />

      <SectionContainer>
        <AnimatedSection direction="up" distance={32} blur={6}>
          <div className="size-guide__measure-block">
            <SectionHeading eyebrow="" title={c.measureTitle} description="" />
            <div className="size-guide__steps">
              {c.measureSteps.map((step, i) => (
                <div key={i} className="size-guide__step">
                  <span className="size-guide__step-num">0{i + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" distance={28} blur={5}>
          <div className="size-guide__table-section">
            <h2 className="size-guide__table-title">{c.tableTitle}</h2>
            <div className="size-guide__table-wrapper">
              <table className="size-guide__table">
                <thead>
                  <tr>{c.chartHeaders.map((h) => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {sizeChart.map((row) => (
                    <tr key={row[0]}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="left" distance={32} blur={6}>
          <div className="size-guide__kids-adults">
            <h2>{c.kidsAdultTitle}</h2>
            <p>{c.kidsAdultDesc}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" distance={28} blur={6}>
          <SectionHeading eyebrow="" title={c.faqTitle} description="" />
          <div className="faq-list">
            {c.faqItems.map((item, i) => (
              <div key={i} className="faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" distance={24}>
          <div className="size-guide__ctas">
            <CTAButton href={contactDetails.phoneHref} target="_blank" rel="noreferrer">{c.askCta}</CTAButton>
            <Link className="catalog-view-all-btn" style={{ borderRadius: "10px" }} to="/shop">{c.shopCta}</Link>
          </div>
        </AnimatedSection>
      </SectionContainer>
    </main>
  )
}
