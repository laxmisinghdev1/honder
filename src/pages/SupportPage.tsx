import { useState } from 'react'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionContainer } from '../components/ui/SectionContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { BadgePill } from '../components/ui/BadgePill'
import { CTAButton } from '../components/ui/CTAButton'
import { PageHero } from '../components/ui/PageHero'
import { useLanguage } from '../i18n/LanguageContext'
import { contactDetails, supportHeroPhrases } from '../data/hondar'
import { FiSettings, FiDisc, FiBox, FiTool } from 'react-icons/fi'

const copy = {
  es: {
    eyebrow: 'Soporte y garantía', title: 'Estamos aquí para ayudarte',
    description: 'Garantía, repuestos, mantenimiento y soporte técnico para tu equipo Hondar.',
    tabs: ['Garantía', 'Repuestos', 'Mantenimiento', 'Contacto'],
    warranty: {
      title: 'Política de garantía', duration: '12 meses desde la fecha de compra.',
      coversTitle: 'Cubre',
      notCoversTitle: 'No cubre',
      covers: ['Defectos de fabricación en boot y frame', 'Problemas estructurales no causados por uso', 'Fallas en el sistema de freno original'],
      notCovers: ['Desgaste normal de ruedas y rodamientos', 'Daños por caídas o uso indebido', 'Modificaciones realizadas por el usuario'],
      claimLabel: 'Solicitar garantía por WhatsApp',
    },
    spareParts: {
      title: 'Repuestos disponibles',
      items: [
        { name: 'Ruedas Hondar 80mm', desc: 'Repuesto individual o en pack.', icon: 'disc' },
        { name: 'Rodamientos ABEC', desc: 'Rodamientos de repuesto para todos los modelos.', icon: 'settings' },
        { name: 'Frenos', desc: 'Frenos de goma y plástico compatibles.', icon: 'box' },
        { name: 'Cierres y hebillas', desc: 'Consultar modelo específico.', icon: 'tool' },
      ],
      cta: 'Consultar repuesto disponible',
    },
    maintenance: {
      title: 'Cuidado y mantenimiento',
      tips: [
        { title: 'Rodamientos', desc: 'Limpia con limpiador sin aceite. Lubrica con aceite específico para rodamientos cada 2-3 meses o al notar resistencia.' },
        { title: 'Ruedas', desc: 'Rota las ruedas cada 20-30 horas de uso para desgaste parejo. Reemplaza cuando el diámetro baje 10 mm del original.' },
        { title: 'Boot', desc: 'Limpia con paño húmedo. Evita solventes. Guarda en lugar seco sin presión sobre el boot.' },
        { title: 'Freno', desc: 'Revisa el desgaste después de cada sesión. Reemplaza cuando reste menos de 1 cm de goma.' },
      ],
    },
    contact: {
      title: 'Contactar soporte', desc: 'Respuesta en 24 horas hábiles por WhatsApp o email.',
      whatsapp: 'WhatsApp', email: 'Email',
    },
  },
  en: {
    eyebrow: 'Support & warranty', title: 'We are here to help',
    description: 'Warranty, spare parts, maintenance, and technical support for your Hondar gear.',
    tabs: ['Warranty', 'Spare Parts', 'Maintenance', 'Contact'],
    warranty: {
      title: 'Warranty policy', duration: '12 months from purchase date.',
      coversTitle: 'Covers',
      notCoversTitle: 'Not Covered',
      covers: ['Manufacturing defects in boot and frame', 'Structural issues not caused by use', 'Original brake system failures'],
      notCovers: ['Normal wear on wheels and bearings', 'Damage from falls or misuse', 'User-made modifications'],
      claimLabel: 'Request warranty via WhatsApp',
    },
    spareParts: {
      title: 'Available spare parts',
      items: [
        { name: 'Hondar 80mm wheels', desc: 'Individual or pack replacement.', icon: 'disc' },
        { name: 'ABEC bearings', desc: 'Replacement bearings for all models.', icon: 'settings' },
        { name: 'Brakes', desc: 'Compatible rubber and plastic brakes.', icon: 'box' },
        { name: 'Buckles and closures', desc: 'Ask about your specific model.', icon: 'tool' },
      ],
      cta: 'Check available spare part',
    },
    maintenance: {
      title: 'Care and maintenance',
      tips: [
        { title: 'Bearings', desc: 'Clean with oil-free cleaner. Lubricate with bearing-specific oil every 2-3 months or when you feel resistance.' },
        { title: 'Wheels', desc: 'Rotate wheels every 20-30 hours of use for even wear. Replace when diameter drops 10 mm from original.' },
        { title: 'Boot', desc: 'Wipe with a damp cloth. Avoid solvents. Store in a dry place without pressure on the boot.' },
        { title: 'Brake', desc: 'Check wear after each session. Replace when less than 1 cm of rubber remains.' },
      ],
    },
    contact: {
      title: 'Contact support', desc: '24-hour response via WhatsApp or email.',
      whatsapp: 'WhatsApp', email: 'Email',
    },
  },
  pt: {
    eyebrow: 'Suporte e garantia', title: 'Estamos aqui para ajudar',
    description: 'Garantia, peças de reposição, manutenção e suporte técnico para seu equipamento Hondar.',
    tabs: ['Garantia', 'Peças', 'Manutenção', 'Contato'],
    warranty: {
      title: 'Política de garantia', duration: '12 meses a partir da data de compra.',
      coversTitle: 'Cobre',
      notCoversTitle: 'Não Cobre',
      covers: ['Defeitos de fabricação no boot e frame', 'Problemas estruturais não causados pelo uso', 'Falhas no sistema de freio original'],
      notCovers: ['Desgaste normal de rodas e rolamentos', 'Danos por quedas ou uso indevido', 'Modificações feitas pelo usuário'],
      claimLabel: 'Solicitar garantia pelo WhatsApp',
    },
    spareParts: {
      title: 'Peças disponíveis',
      items: [
        { name: 'Rodas Hondar 80mm', desc: 'Reposição avulsa ou em pack.', icon: 'disc' },
        { name: 'Rolamentos ABEC', desc: 'Rolamentos de reposição para todos os modelos.', icon: 'settings' },
        { name: 'Freios', desc: 'Freios de borracha e plástico compatíveis.', icon: 'box' },
        { name: 'Fivelas e fechos', desc: 'Consulte o modelo específico.', icon: 'tool' },
      ],
      cta: 'Verificar peça disponível',
    },
    maintenance: {
      title: 'Cuidado e manutenção',
      tips: [
        { title: 'Rolamentos', desc: 'Limpe com limpador sem óleo. Lubrifique com óleo específico a cada 2-3 meses ou ao sentir resistência.' },
        { title: 'Rodas', desc: 'Rode as rodas a cada 20-30 horas de uso para desgaste uniforme. Substitua quando o diâmetro cair 10 mm.' },
        { title: 'Boot', desc: 'Limpe com pano úmido. Evite solventes. Guarde em local seco sem pressão sobre o boot.' },
        { title: 'Freio', desc: 'Verifique o desgaste após cada sessão. Substitua quando restar menos de 1 cm de borracha.' },
      ],
    },
    contact: {
      title: 'Contatar suporte', desc: 'Resposta em 24 horas úteis pelo WhatsApp ou e-mail.',
      whatsapp: 'WhatsApp', email: 'E-mail',
    },
  },
  zh: {
    eyebrow: '支持与保修', title: '我们随时为您提供帮助',
    description: '为您的 Hondar 装备提供保修、备品备件、维护保养和技术支持。',
    tabs: ['保修', '配件', '保养', '联系'],
    warranty: {
      title: '保修政策', duration: '自购买之日起 12 个月。',
      coversTitle: '涵盖',
      notCoversTitle: '不涵盖',
      covers: ['靴体和框架制造缺陷', '非正常使用导致的结构问题', '原装刹车系统故障'],
      notCovers: ['轮子和轴承的正常磨损', '摔倒或不当使用造成的损坏', '用户自行改装'],
      claimLabel: '通过 WhatsApp 申请保修',
    },
    spareParts: {
      title: '可用配件',
      items: [
        { name: 'Hondar 80mm 轮子', desc: '单颗或套装替换。', icon: 'disc' },
        { name: 'ABEC 轴承', desc: '适用于所有型号的替换轴承。', icon: 'settings' },
        { name: '刹车', desc: '兼容的橡胶和塑料刹车。', icon: 'box' },
        { name: '扣件', desc: '请咨询具体型号。', icon: 'tool' },
      ],
      cta: '查询可用配件',
    },
    maintenance: {
      title: '保养与维护',
      tips: [
        { title: '轴承', desc: '使用无油清洗剂清洁。每 2-3 个月用专用轴承油润滑，或在感到阻力时润滑。' },
        { title: '轮子', desc: '每 20-30 小时换位一次以均匀磨损。当直径减少 10 mm 时更换。' },
        { title: '靴体', desc: '用湿布擦拭。避免使用溶剂。存放于干燥处，避免对靴体施压。' },
        { title: '刹车', desc: '每次滑行后检查磨损。当橡胶剩余不足 1 cm 时更换。' },
      ],
    },
    contact: {
      title: '联系支持', desc: '通过 WhatsApp 或 邮件，24 小时内回复。',
      whatsapp: 'WhatsApp', email: '邮件',
    },
  },
} as const

function PartIcon({ type }: { type: string }) {
  if (type === 'disc') return <FiDisc size={20} />
  if (type === 'settings') return <FiSettings size={20} />
  if (type === 'box') return <FiBox size={20} />
  return <FiTool size={20} />
}

export function SupportPage() {
  const { language } = useLanguage()
  const c = copy[language]
  const [activeTab, setActiveTab] = useState(0)
  const [warrantyTab, setWarrantyTab] = useState<'covers' | 'notCovers'>('covers')

  return (
    <main className="page-main support-page">
      <PageHero
        badge={c.eyebrow}
        titlePrefix={c.title + ' '}
        carouselItems={supportHeroPhrases[language]}
        description={c.description}
        modifier="support"
      />

      <SectionContainer>
        {/* Tabs */}
        <div className="support-page__tabs">
          {c.tabs.map((tab, i) => (
            <button
              key={i}
              className={`support-page__tab ${activeTab === i ? 'support-page__tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatedSection direction="up" distance={28} blur={6}>
          {activeTab === 0 && (
            <div className="support-page__panel">
              <SectionHeading eyebrow="" title={c.warranty.title} description={c.warranty.duration} />
              
              <div className="support-page__warranty-toggle">
                <BadgePill
                  active={warrantyTab === 'covers'}
                  color={warrantyTab === 'covers' ? 'accent' : 'muted'}
                  onClick={() => setWarrantyTab('covers')}
                >
                  {c.warranty.coversTitle}
                </BadgePill>
                <BadgePill
                  active={warrantyTab === 'notCovers'}
                  color={warrantyTab === 'notCovers' ? 'accent' : 'muted'}
                  onClick={() => setWarrantyTab('notCovers')}
                >
                  {c.warranty.notCoversTitle}
                </BadgePill>
              </div>

              <div className="support-page__warranty-content">
                {warrantyTab === 'covers' ? (
                  <ul className="support-page__warranty-list">
                    {c.warranty.covers.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="support-page__warranty-list">
                    {c.warranty.notCovers.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
              
              <CTAButton href={contactDetails.phoneHref} target="_blank" rel="noreferrer">
                {c.warranty.claimLabel}
              </CTAButton>
            </div>
          )}

          {activeTab === 1 && (
            <div className="support-page__panel">
              <SectionHeading eyebrow="" title={c.spareParts.title} description="" />
              <div className="support-page__parts-grid">
                {c.spareParts.items.map((item, i) => (
                  <div key={i} className="support-page__part-card">
                    <PartIcon type={item.icon} />
                    <strong>{item.name}</strong>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
              <CTAButton href={contactDetails.phoneHref} target="_blank" rel="noreferrer">
                {c.spareParts.cta}
              </CTAButton>
            </div>
          )}

          {activeTab === 2 && (
            <div className="support-page__panel">
              <SectionHeading eyebrow="" title={c.maintenance.title} description="" />
              <div className="support-page__tips-grid">
                {c.maintenance.tips.map((tip, i) => (
                  <AnimatedSection key={i} className="support-page__tip-card" delay={i * 0.1} direction="up" distance={20}>
                    <strong>{tip.title}</strong>
                    <p>{tip.desc}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="support-page__panel">
              <SectionHeading eyebrow="" title={c.contact.title} description={c.contact.desc} />
              <div className="support-page__contact-btns" style={{ gap: '1rem', display: 'flex' }}>
                <CTAButton href={contactDetails.phoneHref} target="_blank" rel="noreferrer">
                  {c.contact.whatsapp}
                </CTAButton>
                <CTAButton href={contactDetails.emailHref} variant="secondary">
                  {c.contact.email}
                </CTAButton>
              </div>
            </div>
          )}
        </AnimatedSection>
      </SectionContainer>
    </main>
  )
}
