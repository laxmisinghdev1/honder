import type { CarouselItem } from '../components/ui/TypingCarousel'
import type { SupportedLanguage } from '../i18n/LanguageContext'

export type ProductTone = 'primary' | 'secondary' | 'accent' | 'light'
export type ProductFigure = 'inline' | 'deck' | 'quad' | 'helmet'
export type CategoryKey = 'all' | 'inline' | 'wheels' | 'quad' | 'protection'

export type Product = {
  id: string
  name: string
  categoryKey: Exclude<CategoryKey, 'all'>
  category: string
  price: number
  priceLabel: string
  figure: ProductFigure
  tone: ProductTone
  imageUrl: string
  blurb: string
}

type LocalizedText = Record<SupportedLanguage, string>

type HeroStat = {
  value: string
  label: string
}

type Benefit = {
  title: string
  description: string
}

type CategoryCard = {
  title: string
  description: string
  detail: string
}

type RolloutCard = {
  title: string
  description: string
}

type FaqItem = {
  question: string
  answer: string
}

const categoryLabels: Record<Exclude<CategoryKey, 'all'>, LocalizedText> = {
  inline: {
    es: 'Patines en línea',
    en: 'Inline skates',
    pt: 'Patins inline',
    zh: '直排轮滑',
  },
  wheels: {
    es: 'Ruedas',
    en: 'Wheels',
    pt: 'Rodas',
    zh: '轮子',
  },
  quad: {
    es: 'Patines quad',
    en: 'Quad skates',
    pt: 'Patins quad',
    zh: '四轮滑鞋',
  },
  protection: {
    es: 'Protección',
    en: 'Protection',
    pt: 'Proteção',
    zh: '护具',
  },
}

const allFilterLabels: LocalizedText = {
  es: 'Todos',
  en: 'All',
  pt: 'Todos',
  zh: '全部',
}

const productCatalog = [
  {
    id: 'ruedas-hondar-80mm-1-uni',
    name: 'Ruedas Hondar 80mm 1 uni',
    categoryKey: 'wheels' as const,
    price: 5000,
    priceLabel: '$5.000',
    figure: 'inline' as const,
    tone: 'primary' as const,
    imageUrl: 'https://www.kamaro.cl/cdn/shop/files/ruedas_hondar_ploma_80mm.webp?v=1767113035',
    blurb: {
      es: 'Rueda individual de 80 mm para renovar setups urbanos con agarre y giro parejo.',
      en: 'Single 80 mm wheel for refreshing urban setups with balanced grip and roll.',
      pt: 'Roda avulsa de 80 mm para renovar setups urbanos com boa aderência e giro.',
      zh: '适合城市轮滑配置的单颗 80 mm 替换轮。',
    },
  },
  {
    id: 'hondar-patin-en-linea-holy-rosada-escuela',
    name: 'Hondar Patín en línea Holy Rosada Escuela',
    categoryKey: 'inline' as const,
    price: 78000,
    priceLabel: '$78.000',
    figure: 'inline' as const,
    tone: 'secondary' as const,
    imageUrl: 'https://www.kamaro.cl/cdn/shop/files/hondarholyescuelarosa.png?v=1704218577',
    blurb: {
      es: 'Modelo escuela pensado para aprendizaje, estabilidad y uso recreativo diario.',
      en: 'School-oriented inline model built for learning, stability, and daily recreation.',
      pt: 'Modelo escola pensado para aprendizado, estabilidade e uso recreativo diário.',
      zh: '面向入门与日常练习的学校型直排轮款式。',
    },
  },
  {
    id: 'hondar-skull-inline-hd-4x80mm-turqueza',
    name: 'Hondar Skull Patín en línea HD 4x80mm Turquesa',
    categoryKey: 'inline' as const,
    price: 115000,
    priceLabel: '$115.000',
    figure: 'inline' as const,
    tone: 'accent' as const,
    imageUrl: 'https://www.kamaro.cl/cdn/shop/files/X_patines-hd-inline-new-skull-rosa-80mm5409.jpg?v=1700842171',
    blurb: {
      es: 'Freeskate rígido de 4x80 mm con presencia agresiva, soporte firme y enfoque urbano.',
      en: 'Rigid 4x80 mm freeskate with aggressive styling, firm support, and urban focus.',
      pt: 'Freeskate rígido 4x80 mm com visual forte, suporte firme e foco urbano.',
      zh: '4x80 mm 硬壳 freeskate，适合城市滑行。',
    },
  },
  {
    id: 'hondar-quad-paralelo-crs-blanco',
    name: 'Hondar Quad Paralelo CRS Blanco',
    categoryKey: 'quad' as const,
    price: 48900,
    priceLabel: '$48.900',
    figure: 'quad' as const,
    tone: 'light' as const,
    imageUrl: 'https://www.kamaro.cl/cdn/shop/files/HondarQuadParaleloCRSBlanco.png?v=1698853608',
    blurb: {
      es: 'Patín quad blanco para escuela y pista, con base estable y look clásico.',
      en: 'White quad skate for school and rink use with a stable base and classic look.',
      pt: 'Patim quad branco para escola e pista com base estável e visual clássico.',
      zh: '白色 quad 滑鞋，适合学校与场地使用。',
    },
  },
  {
    id: 'hondar-kit-proteccion',
    name: 'Hondar Kit protección',
    categoryKey: 'protection' as const,
    price: 25000,
    priceLabel: '$25.000',
    figure: 'helmet' as const,
    tone: 'light' as const,
    imageUrl: 'https://www.kamaro.cl/cdn/shop/files/HondarKitproteccion-1.png?v=1698853152',
    blurb: {
      es: 'Set de protección para sesiones urbanas y escuela, pensado para sumar confianza.',
      en: 'Protection kit for urban and school sessions designed to add confidence.',
      pt: 'Kit de proteção para sessões urbanas e escola, pensado para mais confiança.',
      zh: '适合城市与学校场景的护具套装。',
    },
  },
  {
    id: 'hondar-patin-roller-titan-3x110mm',
    name: 'Hondar Patín Roller Titan 3x110mm',
    categoryKey: 'inline' as const,
    price: 120000,
    priceLabel: '$120.000',
    figure: 'inline' as const,
    tone: 'primary' as const,
    imageUrl: 'https://www.kamaro.cl/cdn/shop/files/HondarPatinTitan110.png?v=1698853486',
    blurb: {
      es: 'Triskate de 3x110 mm para avanzar con más velocidad, zancada larga y respuesta firme.',
      en: '3x110 mm triskate for more speed, longer stride, and a firm response.',
      pt: 'Triskate 3x110 mm para mais velocidade, passada longa e resposta firme.',
      zh: '3x110 mm 三轮配置，主打速度与长步幅。',
    },
  },
  {
    id: 'hondar-patin-en-linea-holy-azul-escuela',
    name: 'Hondar Patín en línea Holy Azul Escuela',
    categoryKey: 'inline' as const,
    price: 78000,
    priceLabel: '$78.000',
    figure: 'inline' as const,
    tone: 'secondary' as const,
    imageUrl: 'https://www.kamaro.cl/cdn/shop/files/PatinesenlineaHolyGrisAzul_3_1024x_d1dc7fe3-9660-4be9-ad5e-c7c8b1b7c724.webp?v=1700773024',
    blurb: {
      es: 'Versión azul de la línea Holy Escuela, pensada para aprendizaje y rodaje recreativo.',
      en: 'Blue Holy Escuela version built for learning and recreational skating.',
      pt: 'Versão azul da linha Holy Escuela, pensada para aprendizado e uso recreativo.',
      zh: 'Holy Escuela 蓝色版本，适合学习与休闲滑行。',
    },
  },
  {
    id: 'hondar-skull-inline-hd-4x80mm-fucsia',
    name: 'Hondar Skull Patín en línea HD 4x80mm Fucsia',
    categoryKey: 'inline' as const,
    price: 115000,
    priceLabel: '$115.000',
    figure: 'inline' as const,
    tone: 'accent' as const,
    imageUrl: 'https://www.kamaro.cl/cdn/shop/files/HondarSkullInlineHD4x80mm.png?v=1717432941',
    blurb: {
      es: 'Otra variante Skull 4x80 mm con identidad más visible y enfoque freeskate urbano.',
      en: 'Another Skull 4x80 mm variant with bolder identity and urban freeskate focus.',
      pt: 'Outra variante Skull 4x80 mm com identidade mais forte e foco freeskate urbano.',
      zh: '另一款 Skull 4x80 mm 配色，强调城市 freeskate 风格。',
    },
  },
] satisfies Array<{
  id: string
  name: string
  categoryKey: Exclude<CategoryKey, 'all'>
  price: number
  priceLabel: string
  figure: ProductFigure
  tone: ProductTone
  imageUrl: string
  blurb: LocalizedText
}>

const heroStatsByLanguage: Record<SupportedLanguage, HeroStat[]> = {
  es: [
    { value: '24/7', label: 'Atención para resolver dudas de compra' },
    { value: 'CLP', label: 'Precios claros para comprar en Chile' },
    { value: 'Fast', label: 'Checkout simple desde móvil o escritorio' },
  ],
  en: [
    { value: '24/7', label: 'Support to answer purchase questions' },
    { value: 'CLP', label: 'Clear pricing for shoppers in Chile' },
    { value: 'Fast', label: 'Simple checkout from mobile or desktop' },
  ],
  pt: [
    { value: '24/7', label: 'Atendimento para tirar dúvidas de compra' },
    { value: 'CLP', label: 'Preços claros para comprar no Chile' },
    { value: 'Fast', label: 'Checkout simples no celular ou desktop' },
  ],
  zh: [
    { value: '24/7', label: '随时解答购买疑问' },
    { value: 'CLP', label: '面向智利消费者的清晰价格' },
    { value: 'Fast', label: '手机与电脑都能快速结账' },
  ],
}

export const heroPhrasesByLanguage: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: 'patines con velocidad y control.', highlight: { word: 'velocidad', variant: 'hot' } },
    { text: 'tablas con actitud street.', highlight: { word: 'street', variant: 'warm' } },
    { text: 'equipamiento para moverte con estilo.', highlight: { word: 'estilo', variant: 'ink' } },
  ],
  en: [
    { text: 'skates with speed and control.', highlight: { word: 'speed', variant: 'hot' } },
    { text: 'boards with true street attitude.', highlight: { word: 'street', variant: 'warm' } },
    { text: 'gear built to move with style.', highlight: { word: 'style', variant: 'ink' } },
  ],
  pt: [
    { text: 'patins com velocidade e controle.', highlight: { word: 'velocidade', variant: 'hot' } },
    { text: 'shapes com atitude street.', highlight: { word: 'street', variant: 'warm' } },
    { text: 'equipamentos para se mover com estilo.', highlight: { word: 'estilo', variant: 'ink' } },
  ],
  zh: [
    { text: '兼顾速度与控制的滑行装备。', highlight: { word: '速度', variant: 'hot' } },
    { text: '真正有街头态度的滑板。', highlight: { word: '街头', variant: 'warm' } },
    { text: '让你更有风格地出发。', highlight: { word: '风格', variant: 'ink' } },
  ],
}

export const finalPhrasesByLanguage: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: '¿Listo para salir a rodar?', highlight: { word: 'salir a rodar', variant: 'gold' } },
    { text: 'Escríbenos y encuentra tu setup ideal.', highlight: { word: 'setup ideal', variant: 'warm' } },
  ],
  en: [
    { text: 'Ready to roll?', highlight: { word: 'roll', variant: 'gold' } },
    { text: 'Message us to find your ideal setup.', highlight: { word: 'ideal setup', variant: 'warm' } },
  ],
  pt: [
    { text: 'Pronto para sair e andar?', highlight: { word: 'sair e andar', variant: 'gold' } },
    { text: 'Fale conosco para encontrar o setup ideal.', highlight: { word: 'setup ideal', variant: 'warm' } },
  ],
  zh: [
    { text: '准备好出发去滑了吗？', highlight: { word: '出发', variant: 'gold' } },
    { text: '联系我们，找到最适合你的配置。', highlight: { word: '最适合', variant: 'warm' } },
  ],
}

export const benefitsPhrasesByLanguage: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: 'Compra rápido, elige mejor y rueda con respaldo.', highlight: { word: 'respaldo', variant: 'gold' } },
    { text: 'Encuentra equipo claro para ciudad, park y calle.', highlight: { word: 'equipo', variant: 'warm' } },
    { text: 'Todo listo para comparar, comprar y salir a rodar.', highlight: { word: 'salir a rodar', variant: 'hot' } },
  ],
  en: [
    { text: 'Shop faster, choose better, and ride with support.', highlight: { word: 'support', variant: 'gold' } },
    { text: 'Find clear gear for city, park, and street sessions.', highlight: { word: 'gear', variant: 'warm' } },
    { text: 'Everything ready to compare, buy, and get rolling.', highlight: { word: 'get rolling', variant: 'hot' } },
  ],
  pt: [
    { text: 'Compre rápido, escolha melhor e ande com suporte.', highlight: { word: 'suporte', variant: 'gold' } },
    { text: 'Encontre produtos claros para cidade, park e rua.', highlight: { word: 'produtos', variant: 'warm' } },
    { text: 'Tudo pronto para comparar, comprar e sair andando.', highlight: { word: 'sair andando', variant: 'hot' } },
  ],
  zh: [
    { text: '买得更快，选得更准，滑得更安心。', highlight: { word: '更安心', variant: 'gold' } },
    { text: '为城市、park 与街头场景找到更清晰的装备。', highlight: { word: '装备', variant: 'warm' } },
    { text: '从比较到下单，再到出发滑行，一步到位。', highlight: { word: '出发滑行', variant: 'hot' } },
  ],
}

export const catalogPhrasesByLanguage: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: 'Patines, tablas y protección para salir a rodar.', highlight: { word: 'salir a rodar', variant: 'warm' } },
    { text: 'Modelos reales de Hondar para ciudad, escuela y freeskate.', highlight: { word: 'Modelos reales', variant: 'gold' } },
    { text: 'Una vitrina clara para comparar, elegir y comprar mejor.', highlight: { word: 'comprar mejor', variant: 'hot' } },
  ],
  en: [
    { text: 'Skates, boards, and protection built to get rolling.', highlight: { word: 'get rolling', variant: 'warm' } },
    { text: 'Real Hondar models for city, school, and freeskate use.', highlight: { word: 'Real Hondar models', variant: 'gold' } },
    { text: 'A clear shelf to compare, choose, and buy with confidence.', highlight: { word: 'buy with confidence', variant: 'hot' } },
  ],
  pt: [
    { text: 'Patins, shapes e proteção para sair e andar.', highlight: { word: 'sair e andar', variant: 'warm' } },
    { text: 'Modelos reais da Hondar para cidade, escola e freeskate.', highlight: { word: 'Modelos reais', variant: 'gold' } },
    { text: 'Uma vitrine clara para comparar, escolher e comprar melhor.', highlight: { word: 'comprar melhor', variant: 'hot' } },
  ],
  zh: [
    { text: '轮滑、滑板与护具，帮助你马上出发。', highlight: { word: '马上出发', variant: 'warm' } },
    { text: '真实的 Hondar 车型，适合城市、学校与 freeskate。', highlight: { word: '真实的 Hondar', variant: 'gold' } },
    { text: '更清晰地比较、选择并放心购买。', highlight: { word: '放心购买', variant: 'hot' } },
  ],
}

export const shippingPhrasesByLanguage: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: 'Compra con información clara antes de pagar.', highlight: { word: 'información clara', variant: 'gold' } },
    { text: 'Revisa pagos, cobertura y soporte antes del checkout.', highlight: { word: 'soporte', variant: 'warm' } },
    { text: 'Confirma tu compra con ayuda real y despacho coordinado.', highlight: { word: 'ayuda real', variant: 'hot' } },
  ],
  en: [
    { text: 'Buy with clear information before you pay.', highlight: { word: 'clear information', variant: 'gold' } },
    { text: 'Review payment, coverage, and support before checkout.', highlight: { word: 'support', variant: 'warm' } },
    { text: 'Confirm your order with real guidance and coordinated delivery.', highlight: { word: 'real guidance', variant: 'hot' } },
  ],
  pt: [
    { text: 'Compre com informação clara antes de pagar.', highlight: { word: 'informação clara', variant: 'gold' } },
    { text: 'Revise pagamento, cobertura e suporte antes do checkout.', highlight: { word: 'suporte', variant: 'warm' } },
    { text: 'Confirme sua compra com ajuda real e entrega coordenada.', highlight: { word: 'ajuda real', variant: 'hot' } },
  ],
  zh: [
    { text: '付款前先看清信息，再安心下单。', highlight: { word: '看清信息', variant: 'gold' } },
    { text: '在结账前先确认支付、覆盖范围与支持。', highlight: { word: '支持', variant: 'warm' } },
    { text: '用真实协助与配送确认，让下单更安心。', highlight: { word: '真实协助', variant: 'hot' } },
  ],
}

export const shopHeroPhrases: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: 'encuentra tu setup perfecto.', highlight: { word: 'perfecto', variant: 'warm' } },
    { text: 'inline, quad y protección.', highlight: { word: 'protección', variant: 'gold' } },
    { text: 'para cada nivel y disciplina.', highlight: { word: 'disciplina', variant: 'hot' } },
  ],
  en: [
    { text: 'find your perfect setup.', highlight: { word: 'perfect', variant: 'warm' } },
    { text: 'inline, quad, and protection.', highlight: { word: 'protection', variant: 'gold' } },
    { text: 'for every level and discipline.', highlight: { word: 'discipline', variant: 'hot' } },
  ],
  pt: [
    { text: 'encontre seu setup perfeito.', highlight: { word: 'perfeito', variant: 'warm' } },
    { text: 'inline, quad e proteção.', highlight: { word: 'proteção', variant: 'gold' } },
    { text: 'para cada nível e disciplina.', highlight: { word: 'disciplina', variant: 'hot' } },
  ],
  zh: [
    { text: '找到你的完美配置。', highlight: { word: '完美', variant: 'warm' } },
    { text: '直排、四轮与护具。', highlight: { word: '护具', variant: 'gold' } },
    { text: '适合每个级别和运动。', highlight: { word: '运动', variant: 'hot' } },
  ],
}

export const sizeGuideHeroPhrases: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: 'la talla correcta para andar mejor.', highlight: { word: 'andar mejor', variant: 'warm' } },
    { text: 'cada pie tiene su medida ideal.', highlight: { word: 'medida ideal', variant: 'gold' } },
  ],
  en: [
    { text: 'the right size for a better ride.', highlight: { word: 'better ride', variant: 'warm' } },
    { text: 'every foot has its ideal fit.', highlight: { word: 'ideal fit', variant: 'gold' } },
  ],
  pt: [
    { text: 'o tamanho certo para andar melhor.', highlight: { word: 'andar melhor', variant: 'warm' } },
    { text: 'cada pé tem sua medida ideal.', highlight: { word: 'medida ideal', variant: 'gold' } },
  ],
  zh: [
    { text: '找到对的尺码，滑得更好。', highlight: { word: '更好', variant: 'warm' } },
    { text: '每只脚都有它的理想尺寸。', highlight: { word: '理想尺寸', variant: 'gold' } },
  ],
}

export const whereToBuyHeroPhrases: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: 'online, en tienda o por WhatsApp.', highlight: { word: 'WhatsApp', variant: 'warm' } },
    { text: 'la forma más fácil de conseguir Hondar.', highlight: { word: 'más fácil', variant: 'gold' } },
  ],
  en: [
    { text: 'online, in-store, or via WhatsApp.', highlight: { word: 'WhatsApp', variant: 'warm' } },
    { text: 'the easiest way to get Hondar.', highlight: { word: 'easiest', variant: 'gold' } },
  ],
  pt: [
    { text: 'online, na loja ou pelo WhatsApp.', highlight: { word: 'WhatsApp', variant: 'warm' } },
    { text: 'a forma mais fácil de ter Hondar.', highlight: { word: 'mais fácil', variant: 'gold' } },
  ],
  zh: [
    { text: '线上、店铺或通过 WhatsApp。', highlight: { word: 'WhatsApp', variant: 'warm' } },
    { text: '获取 Hondar 最便捷的方式。', highlight: { word: '最便捷', variant: 'gold' } },
  ],
}

export const supportHeroPhrases: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: 'garantía, repuestos y ayuda real.', highlight: { word: 'ayuda real', variant: 'warm' } },
    { text: 'mantén tu equipo siempre listo.', highlight: { word: 'siempre listo', variant: 'gold' } },
  ],
  en: [
    { text: 'warranty, spare parts, and real help.', highlight: { word: 'real help', variant: 'warm' } },
    { text: 'keep your gear ready to roll.', highlight: { word: 'ready to roll', variant: 'gold' } },
  ],
  pt: [
    { text: 'garantia, peças de reposição e ajuda real.', highlight: { word: 'ajuda real', variant: 'warm' } },
    { text: 'mantenha seu equipamento sempre pronto.', highlight: { word: 'sempre pronto', variant: 'gold' } },
  ],
  zh: [
    { text: '保修、备件与真实帮助。', highlight: { word: '真实帮助', variant: 'warm' } },
    { text: '让你的装备随时可上路。', highlight: { word: '随时', variant: 'gold' } },
  ],
}

export const aboutHeroPhrases: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: 'equipamiento urbano con propósito.', highlight: { word: 'propósito', variant: 'warm' } },
    { text: 'clara, funcional y accesible.', highlight: { word: 'accesible', variant: 'gold' } },
  ],
  en: [
    { text: 'urban gear with purpose.', highlight: { word: 'purpose', variant: 'warm' } },
    { text: 'clear, functional, and accessible.', highlight: { word: 'accessible', variant: 'gold' } },
  ],
  pt: [
    { text: 'equipamento urbano com propósito.', highlight: { word: 'propósito', variant: 'warm' } },
    { text: 'clara, funcional e acessível.', highlight: { word: 'acessível', variant: 'gold' } },
  ],
  zh: [
    { text: '有目标的城市装备品牌。', highlight: { word: '目标', variant: 'warm' } },
    { text: '清晰、实用、可及。', highlight: { word: '可及', variant: 'gold' } },
  ],
}

export const blogHeroPhrases: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: 'guías, consejos y noticias de la comunidad.', highlight: { word: 'comunidad', variant: 'warm' } },
    { text: 'aprende antes de comprar.', highlight: { word: 'aprende', variant: 'gold' } },
  ],
  en: [
    { text: 'guides, tips, and community news.', highlight: { word: 'community', variant: 'warm' } },
    { text: 'learn before you buy.', highlight: { word: 'learn', variant: 'gold' } },
  ],
  pt: [
    { text: 'guias, dicas e notícias da comunidade.', highlight: { word: 'comunidade', variant: 'warm' } },
    { text: 'aprenda antes de comprar.', highlight: { word: 'aprenda', variant: 'gold' } },
  ],
  zh: [
    { text: '指南、建议和社区新闻。', highlight: { word: '社区', variant: 'warm' } },
    { text: '先了解，再购买。', highlight: { word: '了解', variant: 'gold' } },
  ],
}

export const contactHeroPhrases: Record<SupportedLanguage, CarouselItem[]> = {
  es: [
    { text: 'escríbenos, estamos para ayudarte.', highlight: { word: 'ayudarte', variant: 'warm' } },
    { text: 'respuesta real, no un bot.', highlight: { word: 'respuesta real', variant: 'gold' } },
  ],
  en: [
    { text: 'reach out, we are here to help.', highlight: { word: 'help', variant: 'warm' } },
    { text: 'real answers, not a chatbot.', highlight: { word: 'real answers', variant: 'gold' } },
  ],
  pt: [
    { text: 'escreva, estamos aqui para ajudar.', highlight: { word: 'ajudar', variant: 'warm' } },
    { text: 'resposta real, não um bot.', highlight: { word: 'resposta real', variant: 'gold' } },
  ],
  zh: [
    { text: '联系我们，我们就在这里。', highlight: { word: '就在这里', variant: 'warm' } },
    { text: '真人回复，不是机器人。', highlight: { word: '真人回复', variant: 'gold' } },
  ],
}

const benefitsByLanguage: Record<SupportedLanguage, Benefit[]> = {
  es: [
    { title: 'Compra simple', description: 'Agrega productos, revisa tu pedido y avanza a pago sin pasos innecesarios.' },
    { title: 'Selección urbana', description: 'Patines, patinetas y protección para ciudad, park y uso diario.' },
    { title: 'Ayuda rápida', description: 'Soporte por chat y contacto directo para resolver tallas, stock y medios de pago.' },
  ],
  en: [
    { title: 'Simple shopping', description: 'Add products, review your order, and move to payment without extra friction.' },
    { title: 'Urban selection', description: 'Skates, skateboards, and protection built for city rides, parks, and daily use.' },
    { title: 'Fast support', description: 'Chat support and direct contact for sizing, stock, and payment questions.' },
  ],
  pt: [
    { title: 'Compra simples', description: 'Adicione produtos, revise o pedido e avance ao pagamento sem atrito.' },
    { title: 'Seleção urbana', description: 'Patins, skates e proteção para cidade, park e uso diário.' },
    { title: 'Suporte rápido', description: 'Atendimento por chat e contato direto para dúvidas de tamanho, estoque e pagamento.' },
  ],
  zh: [
    { title: '购买简单', description: '加入商品、确认订单、快速进入支付，不走弯路。' },
    { title: '城市精选', description: '面向通勤、街滑与日常使用的轮滑、滑板与护具选择。' },
    { title: '响应迅速', description: '通过聊天与直接联系解决尺码、库存和支付问题。' },
  ],
}

const categoriesByLanguage: Record<SupportedLanguage, CategoryCard[]> = {
  es: [
    { title: 'Patines urbanos', description: 'Modelos para desplazarte, entrenar y ganar velocidad con estabilidad.', detail: 'Opciones para ciudad, trayecto y sesiones técnicas.' },
    { title: 'Patinetas street', description: 'Decks con look limpio y medidas pensadas para calle, park y trucos.', detail: 'Tablas, configuraciones y accesorios para cada estilo.' },
    { title: 'Protección esencial', description: 'Cascos y complementos para rodar con más confianza.', detail: 'Seguridad cómoda para sumar al carrito en segundos.' },
  ],
  en: [
    { title: 'Urban skates', description: 'Models built for commuting, practice, and stable speed.', detail: 'Options for city rides, daily movement, and technical sessions.' },
    { title: 'Street skateboards', description: 'Clean-looking decks sized for street riding, park sessions, and tricks.', detail: 'Boards, setups, and accessories for different riding styles.' },
    { title: 'Essential protection', description: 'Helmets and protective gear to ride with more confidence.', detail: 'Comfortable safety add-ons that fit naturally into the cart.' },
  ],
  pt: [
    { title: 'Patins urbanos', description: 'Modelos para deslocamento, treino e velocidade com estabilidade.', detail: 'Opções para cidade, trajeto e sessões técnicas.' },
    { title: 'Skates street', description: 'Shapes com visual limpo e medidas pensadas para rua, park e manobras.', detail: 'Shapes, setups e acessórios para estilos diferentes.' },
    { title: 'Proteção essencial', description: 'Capacetes e itens de proteção para andar com mais confiança.', detail: 'Segurança confortável para adicionar ao carrinho rapidamente.' },
  ],
  zh: [
    { title: '城市轮滑', description: '适合通勤、练习和稳定提速的款式选择。', detail: '覆盖城市滑行、日常出行与技术训练。' },
    { title: '街式滑板', description: '外观干净、尺寸均衡，适合街头、滑板公园与动作练习。', detail: '不同风格所需的板面、配置与配件。' },
    { title: '基础护具', description: '头盔与护具让你上路更安心。', detail: '舒适防护，可快速加入购物车。' },
  ],
}

const rolloutModulesByLanguage: Record<SupportedLanguage, RolloutCard[]> = {
  es: [
    { title: 'Pagos flexibles', description: 'Compra con Mercado Pago o Getnet según el flujo disponible para tu pedido.' },
    { title: 'Despacho en Chile', description: 'Prepara tu compra para coordinar entrega o envío según cobertura.' },
    { title: 'Asesoría real', description: 'Consulta por talla, uso recomendado y productos complementarios antes de pagar.' },
  ],
  en: [
    { title: 'Flexible payments', description: 'Pay with Mercado Pago or Getnet depending on the active flow for your order.' },
    { title: 'Shipping in Chile', description: 'Prepare your order to coordinate delivery or shipping based on coverage.' },
    { title: 'Real guidance', description: 'Ask about sizing, product use, and complementary gear before paying.' },
  ],
  pt: [
    { title: 'Pagamentos flexíveis', description: 'Pague com Mercado Pago ou Getnet conforme o fluxo ativo para o pedido.' },
    { title: 'Entrega no Chile', description: 'Prepare a compra para combinar entrega ou envio conforme a cobertura.' },
    { title: 'Orientação real', description: 'Pergunte sobre tamanho, uso ideal e produtos complementares antes de pagar.' },
  ],
  zh: [
    { title: '支付灵活', description: '根据当前流程，可选择 Mercado Pago 或 Getnet 完成支付。' },
    { title: '智利配送', description: '下单后可根据覆盖范围安排发货或交付。' },
    { title: '真实建议', description: '付款前可先咨询尺码、使用场景与搭配商品。' },
  ],
}

const faqsByLanguage: Record<SupportedLanguage, FaqItem[]> = {
  es: [
    { question: '¿Cómo elijo la talla correcta?', answer: 'Puedes escribirnos por chat o WhatsApp y te ayudamos a elegir según tu uso y medida.' },
    { question: '¿Qué medios de pago aceptan?', answer: 'El flujo contempla pago con Mercado Pago y Getnet, según la configuración disponible.' },
    { question: '¿Hacen envíos dentro de Chile?', answer: 'Sí. Puedes dejar tu ciudad o comuna al iniciar el checkout para coordinar cobertura y despacho.' },
  ],
  en: [
    { question: 'How do I choose the right size?', answer: 'You can message us through chat or WhatsApp and we will help based on your size and riding style.' },
    { question: 'Which payment methods do you accept?', answer: 'The current flow supports Mercado Pago and Getnet depending on the available configuration.' },
    { question: 'Do you ship within Chile?', answer: 'Yes. Leave your city or district during checkout so delivery coverage can be confirmed.' },
  ],
  pt: [
    { question: 'Como escolho o tamanho certo?', answer: 'Fale conosco pelo chat ou WhatsApp e ajudamos conforme sua medida e tipo de uso.' },
    { question: 'Quais formas de pagamento vocês aceitam?', answer: 'O fluxo atual aceita Mercado Pago e Getnet conforme a configuração disponível.' },
    { question: 'Vocês enviam para dentro do Chile?', answer: 'Sim. Informe sua cidade ou comuna no checkout para confirmar cobertura e entrega.' },
  ],
  zh: [
    { question: '如何选择合适的尺码？', answer: '你可以通过聊天或 WhatsApp 联系我们，我们会根据尺寸和使用方式给出建议。' },
    { question: '支持哪些支付方式？', answer: '当前流程支持 Mercado Pago 与 Getnet，具体取决于可用配置。' },
    { question: '可以在智利境内发货吗？', answer: '可以。结账时填写你的城市或区域，我们会确认配送覆盖范围。' },
  ],
}

export const tickerItemsByLanguage: Record<SupportedLanguage, string[]> = {
  es: ['inline urbano', 'tablas street', 'protección esencial', 'checkout rápido', 'soporte directo', 'compra segura'],
  en: ['urban inline', 'street decks', 'essential protection', 'fast checkout', 'direct support', 'secure shopping'],
  pt: ['inline urbano', 'shapes street', 'proteção essencial', 'checkout rápido', 'suporte direto', 'compra segura'],
  zh: ['城市轮滑', '街式板面', '基础护具', '快速结账', '直接支持', '安心购买'],
}

export const heroVideoUrl = 'https://sfdg2asfvn512.t3.storage.dev/hondar_hero.mp4'
export const contactVideoUrl = 'https://sfdg2asfvn512.t3.storage.dev/contact_hondar.mp4'

export const navItems = [
  { key: 'nav.home', href: '#inicio' },
  { key: 'nav.catalog', href: '#catalogo' },
  { key: 'nav.benefits', href: '#ventajas' },
  { key: 'nav.scale', href: '#escala' },
  { key: 'nav.contact', href: '#contacto' },
]

export function getCategoryFilters(language: SupportedLanguage) {
  return [
    { key: 'all' as const, label: allFilterLabels[language] },
    { key: 'inline' as const, label: categoryLabels.inline[language] },
    { key: 'wheels' as const, label: categoryLabels.wheels[language] },
    { key: 'quad' as const, label: categoryLabels.quad[language] },
    { key: 'protection' as const, label: categoryLabels.protection[language] },
  ]
}

export function getProducts(language: SupportedLanguage): Product[] {
  return productCatalog.map((product) => ({
    id: product.id,
    name: product.name,
    categoryKey: product.categoryKey,
    category: categoryLabels[product.categoryKey][language],
    price: product.price,
    priceLabel: product.priceLabel,
    figure: product.figure,
    tone: product.tone,
    imageUrl: product.imageUrl,
    blurb: product.blurb[language],
  }))
}

export function getHeroStats(language: SupportedLanguage) {
  return heroStatsByLanguage[language]
}

export function getBenefits(language: SupportedLanguage) {
  return benefitsByLanguage[language]
}

export function getCategories(language: SupportedLanguage) {
  return categoriesByLanguage[language]
}

export function getRolloutModules(language: SupportedLanguage) {
  return rolloutModulesByLanguage[language]
}

export function getFaqs(language: SupportedLanguage) {
  return faqsByLanguage[language]
}

export const floatingActions = [
  {
    platform: 'instagram' as const,
    url: 'https://instagram.com/hondar',
    label: 'Instagram HONDAR',
  },
  {
    platform: 'whatsapp' as const,
    url: 'https://wa.me/56988188648',
    label: 'WhatsApp HONDAR',
  },
]

export const contactDetails = {
  phoneDisplay: '+56 9 8818 8648',
  phoneHref: 'https://wa.me/56988188648',
  email: 'chuang.charles@gmail.com',
  emailHref: 'mailto:chuang.charles@gmail.com?subject=HONDAR%20-%20Consulta%20de%20productos',
}
