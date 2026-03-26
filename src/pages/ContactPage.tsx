import { useState } from 'react'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionContainer } from '../components/ui/SectionContainer'
import { CTAButton } from '../components/ui/CTAButton'
import { PageHero } from '../components/ui/PageHero'
import { useLanguage } from '../i18n/LanguageContext'
import { contactDetails, contactVideoUrl, contactHeroPhrases } from '../data/hondar'
import { FiMapPin, FiMail, FiMessageCircle, FiClock, FiCheck } from 'react-icons/fi'

const copy = {
  es: {
    eyebrow: 'Contacto', title: 'Hablemos',
    subtitle: 'Déjanos tus datos y te respondemos a la brevedad.',
    info: { company: 'HONDAR', location: 'Chile — envíos a todo el país', businessHours: 'Lun–Sáb 10:00–20:00 CLT' },
    form: {
      name: 'Nombre', namePlaceholder: 'Ej: María González',
      company: 'Empresa (opcional)', companyPlaceholder: 'Ej: Mi empresa',
      email: 'Email', emailPlaceholder: 'Ej: maria@correo.com',
      phone: 'Teléfono', phonePlaceholder: 'Ej: +56 9 1234 5678',
      message: 'Mensaje', messagePlaceholder: 'Cuéntanos brevemente qué necesitas…',
      whatsappToggle: 'Habilitar opción WhatsApp',
      bothToggle: 'Enviar por ambos canales al mismo tiempo',
      byEmail: 'Enviar por email',
      byEmailAndWhatsApp: 'Enviar por email y WhatsApp',
      byWhatsApp: 'Enviar por WhatsApp',
      sending: 'Enviando…',
      sent: '¡Mensaje enviado!',
      sentDesc: 'Te responderemos en menos de 24 horas.',
      b2bTitle: 'Distribución y B2B',
      b2bDesc: '¿Interesado en distribuir Hondar? Escríbenos directamente con el asunto "Distribución".',
      validation: { name: 'El nombre es obligatorio', email: 'El email es obligatorio', emailInvalid: 'Ingresa un email válido', message: 'El mensaje es obligatorio' },
    },
  },
  en: {
    eyebrow: 'Contact', title: "Let's talk",
    subtitle: 'Leave your details and we will get back to you shortly.',
    info: { company: 'HONDAR', location: 'Chile — nationwide shipping', businessHours: 'Mon–Sat 10:00–20:00 CLT' },
    form: {
      name: 'Name', namePlaceholder: 'Ex: John Smith',
      company: 'Company (optional)', companyPlaceholder: 'Ex: My company',
      email: 'Email', emailPlaceholder: 'Ex: john@email.com',
      phone: 'Phone', phonePlaceholder: 'Ex: +56 9 1234 5678',
      message: 'Message', messagePlaceholder: 'Briefly tell us what you need…',
      whatsappToggle: 'Enable WhatsApp option',
      bothToggle: 'Send through both channels at the same time',
      byEmail: 'Send by email',
      byEmailAndWhatsApp: 'Send by email and WhatsApp',
      byWhatsApp: 'Send by WhatsApp',
      sending: 'Sending…',
      sent: 'Message sent!',
      sentDesc: 'We will reply within 24 hours.',
      b2bTitle: 'Distribution & B2B',
      b2bDesc: 'Interested in distributing Hondar? Write to us directly with the subject "Distribution".',
      validation: { name: 'Name is required', email: 'Email is required', emailInvalid: 'Enter a valid email', message: 'Message is required' },
    },
  },
  pt: {
    eyebrow: 'Contato', title: 'Vamos conversar',
    subtitle: 'Deixe seus dados e respondemos em breve.',
    info: { company: 'HONDAR', location: 'Chile — entregas para todo o país', businessHours: 'Seg–Sáb 10:00–20:00 CLT' },
    form: {
      name: 'Nome', namePlaceholder: 'Ex: João Silva',
      company: 'Empresa (opcional)', companyPlaceholder: 'Ex: Minha empresa',
      email: 'E-mail', emailPlaceholder: 'Ex: joao@email.com',
      phone: 'Telefone', phonePlaceholder: 'Ex: +56 9 1234 5678',
      message: 'Mensagem', messagePlaceholder: 'Conte brevemente o que você precisa…',
      whatsappToggle: 'Habilitar opção WhatsApp',
      bothToggle: 'Enviar por ambos os canais ao mesmo tempo',
      byEmail: 'Enviar por e-mail',
      byEmailAndWhatsApp: 'Enviar por e-mail e WhatsApp',
      byWhatsApp: 'Enviar pelo WhatsApp',
      sending: 'Enviando…',
      sent: 'Mensagem enviada!',
      sentDesc: 'Responderemos em menos de 24 horas.',
      b2bTitle: 'Distribuição e B2B',
      b2bDesc: 'Interessado em distribuir a Hondar? Escreva diretamente com o assunto "Distribuição".',
      validation: { name: 'O nome é obrigatório', email: 'O e-mail é obrigatório', emailInvalid: 'Insira um e-mail válido', message: 'A mensagem é obrigatória' },
    },
  },
  zh: {
    eyebrow: '联系我们', title: '我们来聊聊',
    subtitle: '留下你的信息，我们会尽快回复。',
    info: { company: 'HONDAR', location: '智利 — 全国配送', businessHours: '周一至周六 10:00–20:00 CLT' },
    form: {
      name: '姓名', namePlaceholder: '如：张三',
      company: '公司（可选）', companyPlaceholder: '如：我的公司',
      email: '邮箱', emailPlaceholder: '如：zhang@email.com',
      phone: '电话', phonePlaceholder: '如：+56 9 1234 5678',
      message: '留言', messagePlaceholder: '简要描述你的需求…',
      whatsappToggle: '启用 WhatsApp 选项',
      bothToggle: '同时通过两个渠道发送',
      byEmail: '通过邮件发送',
      byEmailAndWhatsApp: '通过邮件和 WhatsApp 发送',
      byWhatsApp: '通过 WhatsApp 发送',
      sending: '发送中…',
      sent: '消息已发送！',
      sentDesc: '我们将在 24 小时内回复。',
      b2bTitle: '分销与 B2B',
      b2bDesc: '有意分销 Hondar？请直接发邮件，主题注明"分销"。',
      validation: { name: '姓名为必填项', email: '邮箱为必填项', emailInvalid: '请输入有效的邮箱', message: '留言为必填项' },
    },
  },
} as const

export function ContactPage() {
  const { language } = useLanguage()
  const c = copy[language]
  const f = c.form

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [whatsappEnabled, setWhatsappEnabled] = useState(true)
  const [sendBoth, setSendBoth] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [errors, setErrors] = useState<string[]>([])

  const validate = (): boolean => {
    const errs: string[] = []
    if (!name.trim()) errs.push(f.validation.name)
    if (!email.trim()) errs.push(f.validation.email)
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push(f.validation.emailInvalid)
    if (!message.trim()) errs.push(f.validation.message)
    setErrors(errs)
    return errs.length === 0
  }

  const handleEmailSubmit = async () => {
    if (!validate()) return
    setStatus('sending')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, phone, message }),
      })
    } catch {
      // Fallback: open mailto
      window.location.href = `${contactDetails.emailHref}&body=${encodeURIComponent(`${name}\n${company}\n\n${message}`)}`
    }
    setStatus('sent')
  }

  const handleWhatsAppSubmit = () => {
    if (!validate()) return
    const text = `Hola Hondar, soy ${name}${company ? ` de ${company}` : ''}.\n\n${message}\n\nEmail: ${email}\nTeléfono: ${phone}`
    window.open(`https://wa.me/56988188648?text=${encodeURIComponent(text)}`, '_blank')
    if (sendBoth) handleEmailSubmit()
  }

  if (status === 'sent') {
    return (
      <main className="page-main contact-page">
        <SectionContainer narrow>
          <AnimatedSection direction="up" distance={32} className="contact-page__success">
            <span className="contact-page__success-icon"><FiCheck size={32} /></span>
            <h2>{f.sent}</h2>
            <p>{f.sentDesc}</p>
          </AnimatedSection>
        </SectionContainer>
      </main>
    )
  }

  return (
    <main className="page-main contact-page">
      <PageHero
        videoSrc={contactVideoUrl}
        badge={c.eyebrow}
        titlePrefix={c.title + ' '}
        carouselItems={contactHeroPhrases[language]}
        description={c.subtitle}
        modifier="contact"
      />

      <SectionContainer>
        <div className="contact-page__layout">
          {/* Info sidebar */}
          <AnimatedSection className="contact-page__info" direction="left" distance={32} blur={8}>
            <div className="contact-page__info-card">
              <strong>{c.info.company}</strong>
              <div className="contact-page__info-items">
                <div className="contact-page__info-item">
                  <span className="contact-page__info-icon"><FiMapPin size={18} /></span>
                  <span>{c.info.location}</span>
                </div>
                <div className="contact-page__info-item">
                  <span className="contact-page__info-icon"><FiMail size={18} /></span>
                  <a href={contactDetails.emailHref}>{contactDetails.email}</a>
                </div>
                <div className="contact-page__info-item">
                  <span className="contact-page__info-icon"><FiMessageCircle size={18} /></span>
                  <a href={contactDetails.phoneHref} target="_blank" rel="noreferrer">{contactDetails.phoneDisplay}</a>
                </div>
                <div className="contact-page__info-item">
                  <span className="contact-page__info-icon"><FiClock size={18} /></span>
                  <span>{c.info.businessHours}</span>
                </div>
              </div>
            </div>

            {/* B2B block */}
            <div className="contact-page__b2b">
              <strong>{f.b2bTitle}</strong>
              <p>{f.b2bDesc}</p>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection className="contact-page__form-card" direction="right" distance={32} blur={8}>
            <div className="contact-page__form-grid">
              <div className="contact-page__field">
                <label>{f.name}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={f.namePlaceholder} />
              </div>
              <div className="contact-page__field">
                <label>{f.company}</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder={f.companyPlaceholder} />
              </div>
              <div className="contact-page__field">
                <label>{f.email}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={f.emailPlaceholder} />
              </div>
              <div className="contact-page__field">
                <label>{f.phone}</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={f.phonePlaceholder} />
              </div>
              <div className="contact-page__field contact-page__field--full">
                <label>{f.message}</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={f.messagePlaceholder} rows={5} />
              </div>
            </div>

            {/* Validation errors */}
            {errors.length > 0 && (
              <div className="contact-page__errors">
                {errors.map((err) => (
                  <p key={err}>{err}</p>
                ))}
              </div>
            )}

            {/* Toggles */}
            <div className="contact-page__toggles">
              <label className="contact-page__toggle">
                <span>{f.whatsappToggle}</span>
                <button
                  type="button"
                  className={`contact-toggle__switch ${whatsappEnabled ? 'is-on' : ''}`}
                  onClick={() => setWhatsappEnabled((v) => !v)}
                  aria-pressed={whatsappEnabled}
                >
                  <span />
                </button>
              </label>
              <label className="contact-page__toggle">
                <span>{f.bothToggle}</span>
                <button
                  type="button"
                  className={`contact-toggle__switch ${sendBoth ? 'is-on' : ''}`}
                  onClick={() => setSendBoth((v) => !v)}
                  aria-pressed={sendBoth}
                >
                  <span />
                </button>
              </label>
            </div>

            {/* Action buttons */}
            <div className="contact-page__actions">
              <CTAButton
                onClick={handleEmailSubmit}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? f.sending : (sendBoth ? f.byEmailAndWhatsApp : f.byEmail)}
              </CTAButton>
              {whatsappEnabled && (
                <CTAButton
                  variant="secondary"
                  onClick={handleWhatsAppSubmit}
                >
                  {f.byWhatsApp}
                </CTAButton>
              )}
            </div>
          </AnimatedSection>
        </div>
      </SectionContainer>
    </main>
  )
}
