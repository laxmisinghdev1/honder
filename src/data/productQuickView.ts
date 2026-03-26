import type { SupportedLanguage } from '../i18n/LanguageContext'

type ProductDetailContent = {
  strapline: string
  description: string
  highlights: string[]
  specs: Array<{ label: string; value: string }>
}

type ProductQuickViewCopy = {
  galleryLabel: string
  highlightsLabel: string
  specsLabel: string
  ratingLabel: string
  commentsLabel: string
  commentsEmpty: string
  nameLabel: string
  namePlaceholder: string
  commentPlaceholder: string
  submitComment: string
  addToCart: string
  close: string
  averageLabel: string
  defaultReviewerName: string
  starsLabel: string
}

export const productQuickViewCopyByLanguage: Record<SupportedLanguage, ProductQuickViewCopy> = {
  es: {
    galleryLabel: 'Vista del producto',
    highlightsLabel: 'Puntos clave',
    specsLabel: 'Ficha rápida',
    ratingLabel: 'Tu calificación',
    commentsLabel: 'Comentarios',
    commentsEmpty: 'Aún no hay comentarios. Sé la primera persona en dejar una opinión.',
    nameLabel: 'Tu nombre',
    namePlaceholder: 'Cómo quieres firmar tu comentario',
    commentPlaceholder: 'Comparte tu experiencia, uso recomendado o lo que más te gustó.',
    submitComment: 'Publicar comentario',
    addToCart: 'Agregar al carrito',
    close: 'Cerrar',
    averageLabel: 'Calificación promedio',
    defaultReviewerName: 'Cliente HONDAR',
    starsLabel: 'estrellas',
  },
  en: {
    galleryLabel: 'Product view',
    highlightsLabel: 'Highlights',
    specsLabel: 'Quick specs',
    ratingLabel: 'Your rating',
    commentsLabel: 'Comments',
    commentsEmpty: 'There are no comments yet. Be the first to share an opinion.',
    nameLabel: 'Your name',
    namePlaceholder: 'How should your comment be signed?',
    commentPlaceholder: 'Share your experience, best use case, or what stood out.',
    submitComment: 'Post comment',
    addToCart: 'Add to cart',
    close: 'Close',
    averageLabel: 'Average rating',
    defaultReviewerName: 'HONDAR rider',
    starsLabel: 'stars',
  },
  pt: {
    galleryLabel: 'Visão do produto',
    highlightsLabel: 'Destaques',
    specsLabel: 'Ficha rápida',
    ratingLabel: 'Sua avaliação',
    commentsLabel: 'Comentários',
    commentsEmpty: 'Ainda não há comentários. Seja a primeira pessoa a deixar uma opinião.',
    nameLabel: 'Seu nome',
    namePlaceholder: 'Como deseja assinar seu comentário',
    commentPlaceholder: 'Conte sua experiência, melhor uso ou o que mais gostou.',
    submitComment: 'Publicar comentário',
    addToCart: 'Adicionar ao carrinho',
    close: 'Fechar',
    averageLabel: 'Avaliação média',
    defaultReviewerName: 'Cliente HONDAR',
    starsLabel: 'estrelas',
  },
  zh: {
    galleryLabel: '产品视图',
    highlightsLabel: '重点信息',
    specsLabel: '快速参数',
    ratingLabel: '你的评分',
    commentsLabel: '评论',
    commentsEmpty: '暂时还没有评论。成为第一个留下意见的人。',
    nameLabel: '你的名字',
    namePlaceholder: '你的评论希望署名为什么？',
    commentPlaceholder: '分享你的体验、推荐用法，或你最喜欢的部分。',
    submitComment: '发布评论',
    addToCart: '加入购物车',
    close: '关闭',
    averageLabel: '平均评分',
    defaultReviewerName: 'HONDAR 用户',
    starsLabel: '星',
  },
}

export const productQuickViewContentByLanguage: Record<SupportedLanguage, Record<string, ProductDetailContent>> = {
  es: {
    'ruedas-hondar-80mm-1-uni': {
      strapline: 'Rueda de recambio para setups inline de uso urbano.',
      description:
        'Tomamos este producto desde los resultados de Kamaro para dejar la sección destacada con precio e imagen reales. Es una opción práctica para reemplazo, mantenimiento o combinación de color.',
      highlights: ['Formato individual', 'Diámetro 80 mm', 'Pensada para uso urbano y escuela'],
      specs: [
        { label: 'Categoría', value: 'Ruedas' },
        { label: 'Presentación', value: '1 unidad' },
        { label: 'Precio visto', value: '$5.000' },
      ],
    },
    'hondar-patin-en-linea-holy-rosada-escuela': {
      strapline: 'Patín en línea orientado a escuela y aprendizaje.',
      description:
        'Modelo enfocado en control, estabilidad y entrada al patinaje recreativo. La ficha se armó a partir del nombre, tipo y precio visibles en la página compartida.',
      highlights: ['Enfoque escuela', 'Uso recreativo', 'Precio real tomado desde Kamaro'],
      specs: [
        { label: 'Categoría', value: 'Patines en línea' },
        { label: 'Línea', value: 'Holy Escuela' },
        { label: 'Precio visto', value: '$78.000' },
      ],
    },
    'hondar-skull-inline-hd-4x80mm-turqueza': {
      strapline: 'Freeskate 4x80 mm con perfil más rígido y urbano.',
      description:
        'Este modelo destaca por su configuración 4x80 mm y un look más agresivo. La descripción se sintetiza desde la información visible del resultado de búsqueda.',
      highlights: ['Configuración 4x80 mm', 'Perfil freeskate', 'Visual turquesa destacado'],
      specs: [
        { label: 'Categoría', value: 'Patines en línea' },
        { label: 'Setup', value: '4x80 mm' },
        { label: 'Precio visto', value: '$115.000' },
      ],
    },
    'hondar-quad-paralelo-crs-blanco': {
      strapline: 'Quad blanco para escuela, pista y sesiones controladas.',
      description:
        'Seleccionado para mostrar variedad dentro del catálogo destacado. Mantiene precio, nombre e imagen reales extraídos del HTML que compartiste.',
      highlights: ['Formato quad', 'Color blanco', 'Base estable para uso recreativo'],
      specs: [
        { label: 'Categoría', value: 'Patines quad' },
        { label: 'Modelo', value: 'CRS Blanco' },
        { label: 'Precio visto', value: '$48.900' },
      ],
    },
    'hondar-kit-proteccion': {
      strapline: 'Kit de protección para completar el setup inicial.',
      description:
        'Se incorporó para que la sección destacada no muestre solo patines. Es una opción directa para escuela, ciudad y sesiones donde quieres sumar seguridad.',
      highlights: ['Categoría protección', 'Complemento para inicio', 'Precio accesible'],
      specs: [
        { label: 'Categoría', value: 'Protección' },
        { label: 'Formato', value: 'Kit' },
        { label: 'Precio visto', value: '$25.000' },
      ],
    },
    'hondar-patin-roller-titan-3x110mm': {
      strapline: 'Triskate para avanzar con más velocidad y zancada larga.',
      description:
        'Quedó dentro de los destacados como opción más rápida dentro de la selección. El contenido editorial se infiere desde el nombre del producto y su configuración visible.',
      highlights: ['Configuración 3x110 mm', 'Orientación urbana', 'Precio real desde Kamaro'],
      specs: [
        { label: 'Categoría', value: 'Patines en línea' },
        { label: 'Setup', value: '3x110 mm' },
        { label: 'Precio visto', value: '$120.000' },
      ],
    },
    'hondar-patin-en-linea-holy-azul-escuela': {
      strapline: 'Variante azul de Holy Escuela para aprendizaje y rodaje recreativo.',
      description:
        'Se suma para ampliar la vitrina destacada con una segunda alternativa de entrada dentro de la línea Holy. Mantiene imagen y precio reales del origen.',
      highlights: ['Línea escuela', 'Color azul', 'Entrada al patinaje recreativo'],
      specs: [
        { label: 'Categoría', value: 'Patines en línea' },
        { label: 'Línea', value: 'Holy Escuela' },
        { label: 'Precio visto', value: '$78.000' },
      ],
    },
    'hondar-skull-inline-hd-4x80mm-fucsia': {
      strapline: 'Skull 4x80 mm en versión fucsia con perfil freeskate.',
      description:
        'Queda como octavo destacado para reforzar la familia Skull dentro del escaparate principal y darle más peso visual a la categoría inline.',
      highlights: ['Setup 4x80 mm', 'Colorway fucsia', 'Perfil urbano más agresivo'],
      specs: [
        { label: 'Categoría', value: 'Patines en línea' },
        { label: 'Setup', value: '4x80 mm' },
        { label: 'Precio visto', value: '$115.000' },
      ],
    },
  },
  en: {
    'ruedas-hondar-80mm-1-uni': {
      strapline: 'Replacement wheel for urban inline setups.',
      description:
        'This featured entry uses the real product name, price, and image from the Kamaro search results shared in the brief.',
      highlights: ['Single wheel format', '80 mm diameter', 'Built for urban and school use'],
      specs: [
        { label: 'Category', value: 'Wheels' },
        { label: 'Format', value: '1 unit' },
        { label: 'Listed price', value: '$5.000' },
      ],
    },
    'hondar-patin-en-linea-holy-rosada-escuela': {
      strapline: 'Inline skate aimed at school and learning use.',
      description:
        'The editorial summary is inferred from the visible product title, type, image, and price on the source page.',
      highlights: ['School-oriented', 'Recreational use', 'Real price from Kamaro'],
      specs: [
        { label: 'Category', value: 'Inline skates' },
        { label: 'Line', value: 'Holy Escuela' },
        { label: 'Listed price', value: '$78.000' },
      ],
    },
    'hondar-skull-inline-hd-4x80mm-turqueza': {
      strapline: 'Rigid 4x80 mm freeskate with an urban profile.',
      description:
        'This item was selected to represent a more performance-oriented inline option inside the featured grid.',
      highlights: ['4x80 mm setup', 'Freeskate profile', 'Turquoise colorway'],
      specs: [
        { label: 'Category', value: 'Inline skates' },
        { label: 'Setup', value: '4x80 mm' },
        { label: 'Listed price', value: '$115.000' },
      ],
    },
    'hondar-quad-paralelo-crs-blanco': {
      strapline: 'White quad skate for school, rink, and stable sessions.',
      description:
        'Included to diversify the featured section with a real quad product from the supplied search results.',
      highlights: ['Quad format', 'White finish', 'Stable recreational base'],
      specs: [
        { label: 'Category', value: 'Quad skates' },
        { label: 'Model', value: 'CRS Blanco' },
        { label: 'Listed price', value: '$48.900' },
      ],
    },
    'hondar-kit-proteccion': {
      strapline: 'Protection kit to complete an entry-level setup.',
      description:
        'Added so the highlighted section includes safety gear alongside skates and wheels.',
      highlights: ['Protection category', 'Good starter add-on', 'Accessible price point'],
      specs: [
        { label: 'Category', value: 'Protection' },
        { label: 'Format', value: 'Kit' },
        { label: 'Listed price', value: '$25.000' },
      ],
    },
    'hondar-patin-roller-titan-3x110mm': {
      strapline: 'Triskate setup for more speed and longer strides.',
      description:
        'This summary is inferred from the visible product naming and setup on the source page.',
      highlights: ['3x110 mm setup', 'Urban speed focus', 'Real price from Kamaro'],
      specs: [
        { label: 'Category', value: 'Inline skates' },
        { label: 'Setup', value: '3x110 mm' },
        { label: 'Listed price', value: '$120.000' },
      ],
    },
    'hondar-patin-en-linea-holy-azul-escuela': {
      strapline: 'Blue Holy Escuela variant for learning and recreational use.',
      description:
        'Added to expand the featured shelf with another entry-level inline option using real image and price data.',
      highlights: ['School-oriented line', 'Blue version', 'Entry-level recreational use'],
      specs: [
        { label: 'Category', value: 'Inline skates' },
        { label: 'Line', value: 'Holy Escuela' },
        { label: 'Listed price', value: '$78.000' },
      ],
    },
    'hondar-skull-inline-hd-4x80mm-fucsia': {
      strapline: 'Fuchsia Skull 4x80 mm variant with freeskate profile.',
      description:
        'This eighth featured card reinforces the Skull family and adds stronger color energy to the inline lineup.',
      highlights: ['4x80 mm setup', 'Fuchsia colorway', 'Aggressive urban profile'],
      specs: [
        { label: 'Category', value: 'Inline skates' },
        { label: 'Setup', value: '4x80 mm' },
        { label: 'Listed price', value: '$115.000' },
      ],
    },
  },
  pt: {
    'ruedas-hondar-80mm-1-uni': {
      strapline: 'Roda de reposição para setups inline urbanos.',
      description:
        'Esta entrada usa nome, preço e imagem reais dos resultados de busca da Kamaro compartilhados no pedido.',
      highlights: ['Formato avulso', 'Diâmetro 80 mm', 'Pensada para uso urbano e escola'],
      specs: [
        { label: 'Categoria', value: 'Rodas' },
        { label: 'Formato', value: '1 unidade' },
        { label: 'Preço visto', value: '$5.000' },
      ],
    },
    'hondar-patin-en-linea-holy-rosada-escuela': {
      strapline: 'Patim inline voltado para escola e aprendizado.',
      description:
        'O resumo editorial foi inferido a partir do título, tipo, imagem e preço visíveis na página original.',
      highlights: ['Foco escola', 'Uso recreativo', 'Preço real da Kamaro'],
      specs: [
        { label: 'Categoria', value: 'Patins inline' },
        { label: 'Linha', value: 'Holy Escuela' },
        { label: 'Preço visto', value: '$78.000' },
      ],
    },
    'hondar-skull-inline-hd-4x80mm-turqueza': {
      strapline: 'Freeskate rígido 4x80 mm com perfil urbano.',
      description:
        'Selecionado para representar uma opção mais esportiva dentro da grade destacada.',
      highlights: ['Setup 4x80 mm', 'Perfil freeskate', 'Cor turquesa'],
      specs: [
        { label: 'Categoria', value: 'Patins inline' },
        { label: 'Setup', value: '4x80 mm' },
        { label: 'Preço visto', value: '$115.000' },
      ],
    },
    'hondar-quad-paralelo-crs-blanco': {
      strapline: 'Patim quad branco para escola, pista e sessões estáveis.',
      description:
        'Incluído para variar a seção destacada com um produto quad real vindo dos resultados fornecidos.',
      highlights: ['Formato quad', 'Acabamento branco', 'Base recreativa estável'],
      specs: [
        { label: 'Categoria', value: 'Patins quad' },
        { label: 'Modelo', value: 'CRS Blanco' },
        { label: 'Preço visto', value: '$48.900' },
      ],
    },
    'hondar-kit-proteccion': {
      strapline: 'Kit de proteção para completar o setup inicial.',
      description:
        'Adicionado para que os destaques incluam segurança junto com patins e rodas.',
      highlights: ['Categoria proteção', 'Bom complemento inicial', 'Preço acessível'],
      specs: [
        { label: 'Categoria', value: 'Proteção' },
        { label: 'Formato', value: 'Kit' },
        { label: 'Preço visto', value: '$25.000' },
      ],
    },
    'hondar-patin-roller-titan-3x110mm': {
      strapline: 'Triskate para mais velocidade e passada longa.',
      description:
        'O texto foi inferido a partir do nome e da configuração visível na página de origem.',
      highlights: ['Setup 3x110 mm', 'Foco urbano rápido', 'Preço real da Kamaro'],
      specs: [
        { label: 'Categoria', value: 'Patins inline' },
        { label: 'Setup', value: '3x110 mm' },
        { label: 'Preço visto', value: '$120.000' },
      ],
    },
    'hondar-patin-en-linea-holy-azul-escuela': {
      strapline: 'Versão azul de Holy Escuela para aprendizado e uso recreativo.',
      description:
        'Adicionada para ampliar a vitrine destacada com outra opção de entrada usando imagem e preço reais.',
      highlights: ['Linha escola', 'Versão azul', 'Uso recreativo inicial'],
      specs: [
        { label: 'Categoria', value: 'Patins inline' },
        { label: 'Linha', value: 'Holy Escuela' },
        { label: 'Preço visto', value: '$78.000' },
      ],
    },
    'hondar-skull-inline-hd-4x80mm-fucsia': {
      strapline: 'Variante fúcsia do Skull 4x80 mm com perfil freeskate.',
      description:
        'Este oitavo destaque reforça a família Skull e traz mais energia visual para a linha inline.',
      highlights: ['Setup 4x80 mm', 'Colorway fúcsia', 'Perfil urbano agressivo'],
      specs: [
        { label: 'Categoria', value: 'Patins inline' },
        { label: 'Setup', value: '4x80 mm' },
        { label: 'Preço visto', value: '$115.000' },
      ],
    },
  },
  zh: {
    'ruedas-hondar-80mm-1-uni': {
      strapline: '适合城市 inline 轮滑的替换轮。',
      description:
        '这个产品卡片使用了你提供的 Kamaro 搜索结果中的真实名称、价格和图片，适合替换、保养或混搭颜色。',
      highlights: ['单个轮子规格', '直径 80 mm', '适合城市与入门练习'],
      specs: [
        { label: '类别', value: '轮子' },
        { label: '规格', value: '1 个' },
        { label: '展示价格', value: '$5.000' },
      ],
    },
    'hondar-patin-en-linea-holy-rosada-escuela': {
      strapline: '面向学校与初学者的直排轮。',
      description:
        '这款产品强调控制感、稳定性与休闲入门体验，文案基于页面上可见的名称、类型与价格整理而成。',
      highlights: ['学校入门定位', '休闲使用', '真实价格来自 Kamaro'],
      specs: [
        { label: '类别', value: '直排轮' },
        { label: '系列', value: 'Holy Escuela' },
        { label: '展示价格', value: '$78.000' },
      ],
    },
    'hondar-skull-inline-hd-4x80mm-turqueza': {
      strapline: '4x80 mm 的城市型 freeskate 配置。',
      description:
        '这款型号以 4x80 mm 设定和更强烈的街头风格为特点，文案基于搜索结果里的可见信息进行提炼。',
      highlights: ['4x80 mm 配置', 'Freeskate 风格', '亮眼的蓝绿色版本'],
      specs: [
        { label: '类别', value: '直排轮' },
        { label: '配置', value: '4x80 mm' },
        { label: '展示价格', value: '$115.000' },
      ],
    },
    'hondar-quad-paralelo-crs-blanco': {
      strapline: '适合学校、场地与稳定滑行的白色 quad 轮滑。',
      description:
        '我们把它加入精选区，是为了让展示不只包含直排轮，也保留了你提供来源中的真实价格、名称与图片。',
      highlights: ['Quad 结构', '白色外观', '稳定的休闲基础'],
      specs: [
        { label: '类别', value: '四轮轮滑' },
        { label: '型号', value: 'CRS Blanco' },
        { label: '展示价格', value: '$48.900' },
      ],
    },
    'hondar-kit-proteccion': {
      strapline: '补完整套装备的护具套装。',
      description:
        '加入这个产品是为了让精选区不只展示鞋类，也能覆盖安全装备，适合学校、城市与日常练习场景。',
      highlights: ['护具类别', '适合入门补全', '价格更容易接受'],
      specs: [
        { label: '类别', value: '护具' },
        { label: '规格', value: '套装' },
        { label: '展示价格', value: '$25.000' },
      ],
    },
    'hondar-patin-roller-titan-3x110mm': {
      strapline: '更快、更长步幅的三轮配置。',
      description:
        '它作为精选区里速度取向更强的一款保留下来，文字依据商品名称与页面可见配置整理而成。',
      highlights: ['3x110 mm 配置', '偏向城市速度', '真实价格来自 Kamaro'],
      specs: [
        { label: '类别', value: '直排轮' },
        { label: '配置', value: '3x110 mm' },
        { label: '展示价格', value: '$120.000' },
      ],
    },
    'hondar-patin-en-linea-holy-azul-escuela': {
      strapline: 'Holy Escuela 蓝色版本，适合学习与休闲滑行。',
      description:
        '它补充了精选区里的入门选择，使用真实图片与价格，保持和原始来源一致。',
      highlights: ['学校入门系列', '蓝色版本', '适合休闲入门使用'],
      specs: [
        { label: '类别', value: '直排轮' },
        { label: '系列', value: 'Holy Escuela' },
        { label: '展示价格', value: '$78.000' },
      ],
    },
    'hondar-skull-inline-hd-4x80mm-fucsia': {
      strapline: 'Fucsia 配色的 Skull 4x80 mm freeskate。',
      description:
        '作为第八个精选产品，它强化了 Skull 系列在主展示区的存在感，也让 inline 类别更有视觉冲击力。',
      highlights: ['4x80 mm 配置', '亮色 fucsia 配色', '更激进的城市风格'],
      specs: [
        { label: '类别', value: '直排轮' },
        { label: '配置', value: '4x80 mm' },
        { label: '展示价格', value: '$115.000' },
      ],
    },
  },
}
