import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionContainer } from '../components/ui/SectionContainer'
import { CTAButton } from '../components/ui/CTAButton'
import { PageHero } from '../components/ui/PageHero'
import { useLanguage } from '../i18n/LanguageContext'
import { aboutHeroPhrases } from '../data/hondar'

const copy = {
  es: {
    eyebrow: 'La marca', title: 'Qué es Hondar',
    description: 'Una marca de equipamiento urbano diseñada para quienes se mueven con intención.',
    philosophy: { title: 'Filosofía', text: 'Hondar nace con una premisa simple: el equipamiento urbano tiene que ser claro, funcional y accesible. No más decisiones de compra difusas. No más dudas sobre talla, disciplina o uso. Solo el producto correcto para la persona correcta.' },
    focus: { title: 'Enfoque de producto', text: 'Patines en línea para aprendizaje y velocidad. Triskates para fitness y distancias largas. Quad y artístico para quienes buscan expresión. Accesorios y protección para completar cada setup.' },
    whoFor: { title: 'Para quién es', items: ['Riders urbanos de todas las edades', 'Principiantes en busca de su primer setup confiable', 'Intermedios que quieren progresar con buen equipo', 'Familias que buscan seguridad y claridad al comprar'] },
    disciplines: { title: 'Disciplinas que cubre', items: ['Inline urbano y freeskate', 'Velocidad y fitness (triskate)', 'Artístico y quad', 'Escuela y aprendizaje'] },
    trust: { title: 'Por qué confiar en Hondar', items: ['Presencia real en retailers chilenos', 'Catálogo verificado con stock actualizado', 'Soporte directo por WhatsApp e Instagram', 'Precios claros en CLP sin sorpresas'] },
    cta: { label: 'Explorar el catálogo', href: '/shop' },
  },
  en: {
    eyebrow: 'The brand', title: 'What is Hondar',
    description: 'An urban gear brand designed for those who move with intention.',
    philosophy: { title: 'Philosophy', text: 'Hondar starts with a simple premise: urban gear has to be clear, functional, and accessible. No more blurry purchase decisions. No more doubts about sizing, discipline, or use. Just the right product for the right person.' },
    focus: { title: 'Product focus', text: 'Inline skates for learning and speed. Triskates for fitness and long distances. Quad and artistic for those seeking expression. Accessories and protection to complete every setup.' },
    whoFor: { title: 'Who it is for', items: ['Urban riders of all ages', 'Beginners looking for their first reliable setup', 'Intermediate riders who want to progress with good gear', 'Families seeking clarity and safety when buying'] },
    disciplines: { title: 'Disciplines covered', items: ['Urban inline and freeskate', 'Speed and fitness (triskate)', 'Artistic and quad', 'School and beginner skating'] },
    trust: { title: 'Why trust Hondar', items: ['Real presence in Chilean retailers', 'Verified catalog with updated stock', 'Direct support via WhatsApp and Instagram', 'Clear CLP pricing with no surprises'] },
    cta: { label: 'Explore the catalog', href: '/shop' },
  },
  pt: {
    eyebrow: 'A marca', title: 'O que é Hondar',
    description: 'Uma marca de equipamento urbano criada para quem se move com intenção.',
    philosophy: { title: 'Filosofia', text: 'Hondar nasce com uma premissa simples: o equipamento urbano deve ser claro, funcional e acessível. Sem mais decisões de compra confusas. Sem dúvidas sobre tamanho, disciplina ou uso. Só o produto certo para a pessoa certa.' },
    focus: { title: 'Foco de produto', text: 'Patins inline para aprendizado e velocidade. Triskates para fitness e longas distâncias. Quad e artístico para quem busca expressão. Acessórios e proteção para completar cada setup.' },
    whoFor: { title: 'Para quem é', items: ['Riders urbanos de todas as idades', 'Iniciantes em busca de seu primeiro setup confiável', 'Intermediários que querem progredir com bom equipamento', 'Famílias que buscam segurança e clareza ao comprar'] },
    disciplines: { title: 'Disciplinas cobertas', items: ['Inline urbano e freeskate', 'Velocidade e fitness (triskate)', 'Artístico e quad', 'Escola e aprendizado'] },
    trust: { title: 'Por que confiar na Hondar', items: ['Presença real em varejistas chilenos', 'Catálogo verificado com estoque atualizado', 'Suporte direto pelo WhatsApp e Instagram', 'Preços claros em CLP sem surpresas'] },
    cta: { label: 'Explorar o catálogo', href: '/shop' },
  },
  zh: {
    eyebrow: '品牌', title: 'Hondar 是什么',
    description: '一个为有目的而动的人设计的城市装备品牌。',
    philosophy: { title: '品牌理念', text: 'Hondar 源于一个简单的前提：城市装备必须清晰、实用、可及。不再有模糊的购买决策。不再有关于尺码、运动类型或用途的疑惑。只需为对的人提供对的产品。' },
    focus: { title: '产品重点', text: '直排轮滑适合学习与速度练习。三轮滑鞋适合健身与长途滑行。Quad 和艺术滑冰适合追求表达的滑手。配件与护具帮助完善每一套装备。' },
    whoFor: { title: '适合人群', items: ['各年龄段城市滑手', '寻找第一套可靠装备的初学者', '希望用好装备进步的中级滑手', '购买时寻求安全与清晰度的家庭'] },
    disciplines: { title: '覆盖运动类型', items: ['城市直排与 Freeskate', '速度与健身（三轮）', '艺术与 Quad', '学校与入门'] },
    trust: { title: '为何信任 Hondar', items: ['在智利零售商中的真实存在', '经验证的目录，库存持续更新', '通过 WhatsApp 和 Instagram 直接支持', 'CLP 价格清晰，无隐藏费用'] },
    cta: { label: '探索产品目录', href: '/shop' },
  },
} as const

export function AboutPage() {
  const { language } = useLanguage()
  const c = copy[language]

  return (
    <main className="page-main about-page">
      <PageHero
        badge={c.eyebrow}
        titlePrefix={c.title + ' '}
        carouselItems={aboutHeroPhrases[language]}
        description={c.description}
        modifier="about"
      />

      <SectionContainer>
        <AnimatedSection direction="up" distance={32} blur={6}>
          <div className="about-page__block">
            <h2>{c.philosophy.title}</h2>
            <p>{c.philosophy.text}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="left" distance={32} blur={6}>
          <div className="about-page__block">
            <h2>{c.focus.title}</h2>
            <p>{c.focus.text}</p>
          </div>
        </AnimatedSection>

        <div className="about-page__grid">
          {[c.whoFor, c.disciplines, c.trust].map((section, i) => (
            <AnimatedSection key={i} className="about-page__card" delay={i * 0.1} direction="up" distance={28} blur={6}>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection direction="up" distance={24}>
          <div className="about-page__cta">
            <CTAButton href={c.cta.href}>{c.cta.label}</CTAButton>
          </div>
        </AnimatedSection>
      </SectionContainer>
    </main>
  )
}
