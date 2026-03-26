import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionContainer } from '../components/ui/SectionContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { BadgePill } from '../components/ui/BadgePill'
import { CTAButton } from '../components/ui/CTAButton'
import { PageHero } from '../components/ui/PageHero'
import { useLanguage } from '../i18n/LanguageContext'
import { contactDetails, whereToBuyHeroPhrases } from '../data/hondar'
import { FiMessageCircle, FiInstagram, FiMapPin, FiShoppingBag, FiExternalLink } from 'react-icons/fi'

const copy = {
  es: {
    eyebrow: 'Dónde comprar', title: 'Compra Hondar en Chile',
    description: 'Encuentra nuestros productos en tiendas online, retailers oficiales y marketplaces.',
    onlineTitle: 'Compra en línea', retailersTitle: 'Retailers oficiales',
    marketplaceTitle: 'Marketplaces', pickupTitle: 'Retiro en tienda',
    pickupDesc: 'Coordina retiro en Santiago o región contactándonos directamente.',
    whatsappCta: 'Consultar disponibilidad',
    retailers: [
      { name: 'Kamaro.cl', url: 'https://www.kamaro.cl', desc: 'Tienda oficial con catálogo actualizado y stock real.', region: 'Chile' },
      { name: 'Openboxstore.cl', url: 'https://openboxstore.cl', desc: 'Marketplace con productos Hondar y otras marcas urbanas.', region: 'Chile' },
      { name: 'Pedalcity.cl', url: '#', desc: 'Retailer especializado en deportes urbanos y equipamiento.', region: 'Chile' },
    ],
    marketplaces: [
      { name: 'Mercado Libre', url: '#', desc: 'Búsqueda "Hondar" en MercadoLibre Chile.' },
      { name: 'Ripley.com', url: '#', desc: 'Selección de patines en tienda online Ripley.' },
    ],
    byChannel: 'Compra por canal',
    channels: [
      { label: 'WhatsApp directo', icon: 'whatsapp', desc: 'Asesoría y compra directa, stock en tiempo real.', cta: 'Escribir', href: contactDetails.phoneHref },
      { label: 'Instagram', icon: 'instagram', desc: 'Novedades, videos y DM para consultas rápidas.', cta: 'Ir a Instagram', href: 'https://instagram.com/hondar' },
      { label: 'Tiendas físicas', icon: 'store', desc: 'Consultar punto de venta cercano vía WhatsApp.', cta: 'Consultar', href: contactDetails.phoneHref },
    ],
  },
  en: {
    eyebrow: 'Where to buy', title: 'Buy Hondar in Chile',
    description: 'Find our products at online stores, official retailers, and marketplaces.',
    onlineTitle: 'Buy online', retailersTitle: 'Official retailers',
    marketplaceTitle: 'Marketplaces', pickupTitle: 'Store pickup',
    pickupDesc: 'Coordinate pickup in Santiago or your region by contacting us directly.',
    whatsappCta: 'Check availability',
    retailers: [
      { name: 'Kamaro.cl', url: 'https://www.kamaro.cl', desc: 'Official store with updated catalog and real stock.', region: 'Chile' },
      { name: 'Openboxstore.cl', url: 'https://openboxstore.cl', desc: 'Marketplace with Hondar and other urban brands.', region: 'Chile' },
      { name: 'Pedalcity.cl', url: '#', desc: 'Specialist retailer in urban sports gear.', region: 'Chile' },
    ],
    marketplaces: [
      { name: 'Mercado Libre', url: '#', desc: 'Search "Hondar" on MercadoLibre Chile.' },
      { name: 'Ripley.com', url: '#', desc: 'Skate selection on the Ripley online store.' },
    ],
    byChannel: 'Buy by channel',
    channels: [
      { label: 'WhatsApp direct', icon: 'whatsapp', desc: 'Direct purchase with real-time stock info.', cta: 'Message us', href: contactDetails.phoneHref },
      { label: 'Instagram', icon: 'instagram', desc: 'News, videos, and DM for quick queries.', cta: 'Go to Instagram', href: 'https://instagram.com/hondar' },
      { label: 'Physical stores', icon: 'store', desc: 'Ask about the nearest point of sale via WhatsApp.', cta: 'Ask us', href: contactDetails.phoneHref },
    ],
  },
  pt: {
    eyebrow: 'Onde comprar', title: 'Compre Hondar no Chile',
    description: 'Encontre nossos produtos em lojas online, varejistas oficiais e marketplaces.',
    onlineTitle: 'Compre online', retailersTitle: 'Varejistas oficiais',
    marketplaceTitle: 'Marketplaces', pickupTitle: 'Retirada na loja',
    pickupDesc: 'Coordene a retirada em Santiago ou na sua região entrando em contato diretamente.',
    whatsappCta: 'Verificar disponibilidade',
    retailers: [
      { name: 'Kamaro.cl', url: 'https://www.kamaro.cl', desc: 'Loja oficial com catálogo atualizado e estoque real.', region: 'Chile' },
      { name: 'Openboxstore.cl', url: 'https://openboxstore.cl', desc: 'Marketplace com Hondar e outras marcas urbanas.', region: 'Chile' },
      { name: 'Pedalcity.cl', url: '#', desc: 'Varejista especializado em esportes urbanos.', region: 'Chile' },
    ],
    marketplaces: [
      { name: 'Mercado Libre', url: '#', desc: 'Pesquise "Hondar" no MercadoLibre Chile.' },
      { name: 'Ripley.com', url: '#', desc: 'Seleção de patins na loja online Ripley.' },
    ],
    byChannel: 'Compre por canal',
    channels: [
      { label: 'WhatsApp direto', icon: 'whatsapp', desc: 'Compra direta com informação de estoque em tempo real.', cta: 'Escrever', href: contactDetails.phoneHref },
      { label: 'Instagram', icon: 'instagram', desc: 'Novidades, vídeos e DM para consultas rápidas.', cta: 'Ir ao Instagram', href: 'https://instagram.com/hondar' },
      { label: 'Lojas físicas', icon: 'store', desc: 'Pergunte sobre o ponto de venda mais próximo via WhatsApp.', cta: 'Consultar', href: contactDetails.phoneHref },
    ],
  },
  zh: {
    eyebrow: '购买渠道', title: '在智利购买 Hondar',
    description: '在我们的网店、官方零售商和电商平台上购买我们的产品。',
    onlineTitle: '线上购买', retailersTitle: '官方零售商',
    marketplaceTitle: '电商平台', pickupTitle: '到店自取',
    pickupDesc: '请通过联系我们来协调在圣地亚哥或你所在地区的自取事宜。',
    whatsappCta: '查询库存',
    retailers: [
      { name: 'Kamaro.cl', url: 'https://www.kamaro.cl', desc: '官方商店，目录更新频繁，真实库存。', region: '智利' },
      { name: 'Openboxstore.cl', url: 'https://openboxstore.cl', desc: '包含 Hondar 及其他城市品牌的综合平台。', region: '智利' },
      { name: 'Pedalcity.cl', url: '#', desc: '城市运动装备专营零售商。', region: '智利' },
    ],
    marketplaces: [
      { name: 'Mercado Libre', url: '#', desc: '在 MercadoLibre 智利搜索 "Hondar"。' },
      { name: 'Ripley.com', url: '#', desc: '在 Ripley 线上商店选购轮滑产品。' },
    ],
    byChannel: '按渠道购买',
    channels: [
      { label: 'WhatsApp 直接购买', icon: 'whatsapp', desc: '实时库存信息，直接购买。', cta: '发消息', href: contactDetails.phoneHref },
      { label: 'Instagram', icon: 'instagram', desc: '新品、视频与快速私信咨询。', cta: '访问 Instagram', href: 'https://instagram.com/hondar' },
      { label: '实体店', icon: 'store', desc: '通过 WhatsApp 查询最近销售点。', cta: '咨询', href: contactDetails.phoneHref },
    ],
  },
} as const

function ChannelIcon({ type }: { type: string }) {
  if (type === 'whatsapp') return <FiMessageCircle size={24} />
  if (type === 'instagram') return <FiInstagram size={24} />
  return <FiMapPin size={24} />
}

export function WhereToBuyPage() {
  const { language } = useLanguage()
  const c = copy[language]

  return (
    <main className="page-main where-to-buy-page">
      <PageHero
        badge={c.eyebrow}
        titlePrefix={c.title + ' '}
        carouselItems={whereToBuyHeroPhrases[language]}
        description={c.description}
        modifier="where-to-buy"
      />

      <SectionContainer>
        {/* Channel cards */}
        <AnimatedSection direction="up" distance={32} blur={6}>
          <SectionHeading eyebrow="" title={c.byChannel} description="" />
          <div className="where-to-buy__channels">
            {c.channels.map((ch, i) => (
              <AnimatedSection key={i} className="where-to-buy__channel-card" delay={i * 0.1} direction="up" distance={24}>
                <span className="where-to-buy__channel-icon"><ChannelIcon type={ch.icon} /></span>
                <strong>{ch.label}</strong>
                <p>{ch.desc}</p>
                <CTAButton href={ch.href} target="_blank" rel="noreferrer" size="sm">{ch.cta}</CTAButton>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Official retailers */}
        <AnimatedSection direction="left" distance={32} blur={6}>
          <SectionHeading eyebrow="" title={c.retailersTitle} description="" />
          <div className="where-to-buy__retailers">
            {c.retailers.map((r, i) => (
              <AnimatedSection key={i} className="where-to-buy__retailer-card" delay={i * 0.1} direction="up" distance={24}>
                <div className="where-to-buy__retailer-header">
                  <div className="where-to-buy__retailer-name">
                    <FiShoppingBag size={18} />
                    <strong>{r.name}</strong>
                  </div>
                  <BadgePill color="accent-soft">{r.region}</BadgePill>
                </div>
                <p>{r.desc}</p>
                {r.url !== '#' && (
                  <a href={r.url} target="_blank" rel="noreferrer" className="where-to-buy__retailer-link">
                    {r.name}
                    <FiExternalLink size={14} />
                  </a>
                )}
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Marketplaces */}
        <AnimatedSection direction="right" distance={32} blur={6}>
          <SectionHeading eyebrow="" title={c.marketplaceTitle} description="" />
          <div className="where-to-buy__marketplaces">
            {c.marketplaces.map((m, i) => (
              <div key={i} className="where-to-buy__marketplace-card">
                <FiShoppingBag size={20} />
                <strong>{m.name}</strong>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Pickup */}
        <AnimatedSection direction="up" distance={28}>
          <div className="where-to-buy__pickup">
            <FiMapPin size={24} />
            <h2>{c.pickupTitle}</h2>
            <p>{c.pickupDesc}</p>
            <CTAButton href={contactDetails.phoneHref} target="_blank" rel="noreferrer">{c.whatsappCta}</CTAButton>
          </div>
        </AnimatedSection>
      </SectionContainer>
    </main>
  )
}
