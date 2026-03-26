import { useMemo, useState } from 'react'
import { contactDetails, contactVideoUrl, finalPhrasesByLanguage } from '../../data/hondar'
import { useLanguage, type SupportedLanguage } from '../../i18n/LanguageContext'
import { buildEmailInquiryUrl, buildWhatsappInquiryUrl, saveContactInquiry, type ContactChannel } from '../../lib/contact'
import { AnimatedSection } from '../ui/AnimatedSection'
import { CTAButton } from '../ui/CTAButton'
import { SectionHeading } from '../ui/SectionHeading'
import { TypingCarousel } from '../ui/TypingCarousel'

const contactVideoPoster = 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1600&q=80'

type ContactCopy = {
  eyebrow: string
  description: string
  methodsLabel: string
  whatsappTitle: string
  whatsappDescription: string
  emailTitle: string
  emailDescription: string
  switchLabel: string
  switchHelp: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  cityLabel: string
  cityPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  privacy: string
  submitWhatsapp: string
  submitEmail: string
  successTitle: string
  successWhatsapp: string
  successEmail: string
  error: string
  validationName: string
  validationEmail: string
  validationMessage: string
}

const contentByLanguage: Record<SupportedLanguage, ContactCopy> = {
  es: {
    eyebrow: 'Contacto',
    description: 'Cuéntanos qué estás buscando y te ayudamos a elegir la mejor opción para tu próxima salida, compra o regalo.',
    methodsLabel: 'Elige cómo prefieres continuar',
    whatsappTitle: 'Hablar por WhatsApp',
    whatsappDescription: 'Abrimos tu consulta con el mensaje listo para enviarlo desde el teléfono o el computador.',
    emailTitle: 'Recibir respuesta por correo',
    emailDescription: 'Guardamos tu consulta para responderla por correo con más detalle y seguimiento.',
    switchLabel: 'Enviar también por correo ahora',
    switchHelp: 'Si activas esta opción, además de guardar tu consulta se abrirá tu app de correo con el mensaje preparado.',
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre',
    emailLabel: 'Correo',
    emailPlaceholder: 'tu@correo.com',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+56 9 1234 5678',
    cityLabel: 'Ciudad o comuna',
    cityPlaceholder: 'Santiago, Providencia, Viña del Mar...',
    messageLabel: '¿Qué estás buscando?',
    messagePlaceholder: 'Cuéntanos si buscas patines, patineta, talla, protección o una recomendación.',
    privacy: 'Usaremos tus datos solo para responder esta consulta y ayudarte con tu compra.',
    submitWhatsapp: 'Continuar por WhatsApp',
    submitEmail: 'Enviar consulta',
    successTitle: 'Tu consulta ya está lista.',
    successWhatsapp: 'Abrimos WhatsApp con tu mensaje para que puedas enviarlo cuando quieras.',
    successEmail: 'Guardamos tu consulta y podremos responderte por correo. Si activaste el envío por correo, también abrimos tu cliente de email.',
    error: 'No pudimos registrar tu consulta. Intenta de nuevo o contáctanos por WhatsApp.',
    validationName: 'Ingresa un nombre de al menos 2 caracteres.',
    validationEmail: 'Ingresa un correo válido.',
    validationMessage: 'Cuéntanos tu consulta en al menos 10 caracteres.',
  },
  en: {
    eyebrow: 'Contact',
    description: 'Tell us what you are looking for and we will help you choose the best option for your next ride, purchase, or gift.',
    methodsLabel: 'Choose how you want to continue',
    whatsappTitle: 'Chat on WhatsApp',
    whatsappDescription: 'We open your inquiry with a ready-to-send message from phone or desktop.',
    emailTitle: 'Get a reply by email',
    emailDescription: 'We save your inquiry so we can answer by email with more detail and follow-up.',
    switchLabel: 'Also send it by email now',
    switchHelp: 'When this is on, we also open your email app with the inquiry already prepared.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@email.com',
    phoneLabel: 'Phone',
    phonePlaceholder: '+56 9 1234 5678',
    cityLabel: 'City or district',
    cityPlaceholder: 'Santiago, Providencia, Viña del Mar...',
    messageLabel: 'What are you looking for?',
    messagePlaceholder: 'Tell us if you need skates, a board, sizing help, protection, or a recommendation.',
    privacy: 'We will use your details only to answer this inquiry and help with your purchase.',
    submitWhatsapp: 'Continue on WhatsApp',
    submitEmail: 'Send inquiry',
    successTitle: 'Your inquiry is ready.',
    successWhatsapp: 'We opened WhatsApp with your message so you can send it whenever you want.',
    successEmail: 'Your inquiry was saved and we can reply by email. If email sending was enabled, we also opened your mail app.',
    error: 'We could not save your inquiry. Try again or contact us through WhatsApp.',
    validationName: 'Enter a name with at least 2 characters.',
    validationEmail: 'Enter a valid email address.',
    validationMessage: 'Write your inquiry in at least 10 characters.',
  },
  pt: {
    eyebrow: 'Contato',
    description: 'Conte o que você está procurando e ajudamos a escolher a melhor opção para sua próxima saída, compra ou presente.',
    methodsLabel: 'Escolha como prefere continuar',
    whatsappTitle: 'Falar pelo WhatsApp',
    whatsappDescription: 'Abrimos sua consulta com a mensagem pronta para envio no celular ou no desktop.',
    emailTitle: 'Receber resposta por e-mail',
    emailDescription: 'Guardamos sua consulta para responder por e-mail com mais detalhes e acompanhamento.',
    switchLabel: 'Enviar também por e-mail agora',
    switchHelp: 'Se ativar esta opção, além de salvar a consulta abrimos seu app de e-mail com a mensagem pronta.',
    nameLabel: 'Nome',
    namePlaceholder: 'Seu nome',
    emailLabel: 'E-mail',
    emailPlaceholder: 'voce@email.com',
    phoneLabel: 'Telefone',
    phonePlaceholder: '+56 9 1234 5678',
    cityLabel: 'Cidade ou comuna',
    cityPlaceholder: 'Santiago, Providencia, Viña del Mar...',
    messageLabel: 'O que você procura?',
    messagePlaceholder: 'Conte se você procura patins, shape, tamanho, proteção ou uma recomendação.',
    privacy: 'Usaremos seus dados somente para responder esta consulta e ajudar com sua compra.',
    submitWhatsapp: 'Continuar no WhatsApp',
    submitEmail: 'Enviar consulta',
    successTitle: 'Sua consulta já está pronta.',
    successWhatsapp: 'Abrimos o WhatsApp com sua mensagem para você enviar quando quiser.',
    successEmail: 'Sua consulta foi salva e poderemos responder por e-mail. Se o envio por e-mail foi ativado, também abrimos seu cliente de e-mail.',
    error: 'Não foi possível registrar sua consulta. Tente de novo ou fale conosco pelo WhatsApp.',
    validationName: 'Digite um nome com pelo menos 2 caracteres.',
    validationEmail: 'Digite um e-mail válido.',
    validationMessage: 'Escreva sua consulta com pelo menos 10 caracteres.',
  },
  zh: {
    eyebrow: '联系',
    description: '告诉我们你在找什么，我们会帮助你为下一次滑行、购买或送礼找到更合适的选择。',
    methodsLabel: '选择你希望继续的方式',
    whatsappTitle: '通过 WhatsApp 咨询',
    whatsappDescription: '我们会打开一条已经写好的消息，你可以直接从手机或电脑发送。',
    emailTitle: '通过邮件获得回复',
    emailDescription: '我们会保存你的咨询，并通过邮件提供更详细的回复与跟进。',
    switchLabel: '现在也通过邮件发送',
    switchHelp: '开启后，除了保存咨询外，还会打开你的邮件应用并自动填好内容。',
    nameLabel: '姓名',
    namePlaceholder: '你的姓名',
    emailLabel: '邮箱',
    emailPlaceholder: 'you@email.com',
    phoneLabel: '电话',
    phonePlaceholder: '+56 9 1234 5678',
    cityLabel: '城市或区域',
    cityPlaceholder: 'Santiago, Providencia, Viña del Mar...',
    messageLabel: '你在找什么？',
    messagePlaceholder: '告诉我们你需要轮滑、滑板、尺码建议、护具，还是购买推荐。',
    privacy: '我们只会使用你的信息来回复这次咨询并帮助你完成购买。',
    submitWhatsapp: '继续使用 WhatsApp',
    submitEmail: '发送咨询',
    successTitle: '你的咨询已经准备好了。',
    successWhatsapp: '我们已经打开了带有预填内容的 WhatsApp 消息，你可以随时发送。',
    successEmail: '你的咨询已保存，我们可以通过邮件回复你。如果启用了邮件发送，也会同时打开你的邮件应用。',
    error: '我们暂时无法保存你的咨询。请重试，或直接通过 WhatsApp 联系我们。',
    validationName: '请输入至少 2 个字符的姓名。',
    validationEmail: '请输入有效的邮箱地址。',
    validationMessage: '请至少填写 10 个字符的咨询内容。',
  },
}

type FormState = {
  name: string
  email: string
  phone: string
  city: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  city: '',
  message: '',
}

export function ContactSection() {
  const { language } = useLanguage()
  const copy = contentByLanguage[language]
  const [channel, setChannel] = useState<ContactChannel>('whatsapp')
  const [sendEmailCopy, setSendEmailCopy] = useState(false)
  const [form, setForm] = useState<FormState>(initialFormState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const successMessage = useMemo(
    () => (channel === 'whatsapp' ? copy.successWhatsapp : copy.successEmail),
    [channel, copy.successEmail, copy.successWhatsapp],
  )

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((currentForm) => ({ ...currentForm, [key]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [key]: undefined }))
    setStatus('idle')
  }

  function validateForm() {
    const nextErrors: FormErrors = {}

    if (form.name.trim().length < 2) {
      nextErrors.name = copy.validationName
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = copy.validationEmail
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = copy.validationMessage
    }

    return nextErrors
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateForm()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setSubmitting(true)
    setStatus('idle')

    const inquiry = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      message: form.message.trim(),
      channel,
      sendEmailCopy,
      createdAt: new Date().toISOString(),
    }

    try {
      if (channel === 'email') {
        await saveContactInquiry(inquiry)

        if (sendEmailCopy) {
          window.open(buildEmailInquiryUrl(contactDetails.email, inquiry), '_self')
        }
      } else {
        window.open(buildWhatsappInquiryUrl(contactDetails.phoneHref, inquiry), '_blank', 'noopener,noreferrer')
      }

      setStatus('success')
      setForm(initialFormState)
      setSendEmailCopy(false)
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="contact-section" style={{ paddingBottom: "1rem" }}>
      <div className="contact-section__media" aria-hidden="true">
        <video className="contact-section__video" autoPlay loop muted playsInline preload="auto" poster={contactVideoPoster}>
          <source src={contactVideoUrl} type="video/mp4" />
        </video>
        <div className="contact-section__overlay" />
      </div>

      <div className="contact-section__copy">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={<TypingCarousel items={finalPhrasesByLanguage[language]} tag="h2" className="final-carousel" />}
          description={copy.description}
        />
      </div>

      <AnimatedSection className="contact-form-shell" direction="left">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form__header">
            <p>{copy.methodsLabel}</p>
          </div>

          <div className="contact-method-grid">
            <button
              className={`contact-method-card ${channel === 'whatsapp' ? 'contact-method-card--active' : ''}`}
              type="button"
              onClick={() => {
                setChannel('whatsapp')
                setSendEmailCopy(false)
              }}
            >
              <strong>{copy.whatsappTitle}</strong>
              <span>{copy.whatsappDescription}</span>
            </button>

            <button
              className={`contact-method-card ${channel === 'email' ? 'contact-method-card--active' : ''}`}
              type="button"
              onClick={() => setChannel('email')}
            >
              <strong>{copy.emailTitle}</strong>
              <span>{copy.emailDescription}</span>
            </button>
          </div>

          {channel === 'email' ? (
            <label className="contact-toggle" htmlFor="contact-email-copy">
              <span className={`contact-toggle__switch ${sendEmailCopy ? 'is-on' : ''}`} aria-hidden="true">
                <span />
              </span>
              <span className="contact-toggle__copy">
                <strong>{copy.switchLabel}</strong>
                <small>{copy.switchHelp}</small>
              </span>
              <input
                id="contact-email-copy"
                checked={sendEmailCopy}
                className="contact-toggle__input"
                type="checkbox"
                onChange={(event) => setSendEmailCopy(event.target.checked)}
              />
            </label>
          ) : null}

          <div className="contact-form__grid">
            <label>
              <span>{copy.nameLabel}</span>
              <input
                value={form.name}
                placeholder={copy.namePlaceholder}
                onChange={(event) => updateField('name', event.target.value)}
              />
              {errors.name ? <small className="contact-form__error">{errors.name}</small> : null}
            </label>

            <label>
              <span>{copy.emailLabel}</span>
              <input
                value={form.email}
                placeholder={copy.emailPlaceholder}
                onChange={(event) => updateField('email', event.target.value)}
              />
              {errors.email ? <small className="contact-form__error">{errors.email}</small> : null}
            </label>

            <label>
              <span>{copy.phoneLabel}</span>
              <input
                value={form.phone}
                placeholder={copy.phonePlaceholder}
                onChange={(event) => updateField('phone', event.target.value)}
              />
            </label>

            <label>
              <span>{copy.cityLabel}</span>
              <input
                value={form.city}
                placeholder={copy.cityPlaceholder}
                onChange={(event) => updateField('city', event.target.value)}
              />
            </label>

            <label className="contact-form__message">
              <span>{copy.messageLabel}</span>
              <textarea
                rows={5}
                value={form.message}
                placeholder={copy.messagePlaceholder}
                onChange={(event) => updateField('message', event.target.value)}
              />
              {errors.message ? <small className="contact-form__error">{errors.message}</small> : null}
            </label>
          </div>

          {status !== 'idle' ? (
            <div className={`contact-form__status ${status === 'success' ? 'contact-form__status--success' : 'contact-form__status--error'}`}>
              <strong>{status === 'success' ? copy.successTitle : copy.error}</strong>
              {status === 'success' ? <span>{successMessage}</span> : null}
            </div>
          ) : null}

          <div className="contact-form__footer">
            <CTAButton type="submit" fullWidth disabled={submitting}>
              {submitting ? '...' : channel === 'whatsapp' ? copy.submitWhatsapp : copy.submitEmail}
            </CTAButton>
            <p>{copy.privacy}</p>
          </div>
        </form>
      </AnimatedSection>
    </div>
  )
}
