export type ContactChannel = 'whatsapp' | 'email'

export type ContactInquiry = {
  name: string
  email: string
  phone: string
  city: string
  message: string
  channel: ContactChannel
  sendEmailCopy: boolean
  createdAt: string
}

const CONTACT_STORAGE_KEY = 'hondar_contact_inquiries_v1'
const DEFAULT_CONTACT_API_URL = '/api/contact'

function readStoredInquiries() {
  if (typeof window === 'undefined') {
    return []
  }

  const stored = window.localStorage.getItem(CONTACT_STORAGE_KEY)
  if (!stored) {
    return []
  }

  try {
    return JSON.parse(stored) as ContactInquiry[]
  } catch {
    window.localStorage.removeItem(CONTACT_STORAGE_KEY)
    return []
  }
}

function writeStoredInquiries(inquiries: ContactInquiry[]) {
  window.localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(inquiries))
}

export async function saveContactInquiry(inquiry: ContactInquiry) {
  const configuredApiUrl = import.meta.env.VITE_CONTACT_API_URL?.trim()
  const apiUrl = configuredApiUrl === '' ? '' : configuredApiUrl || DEFAULT_CONTACT_API_URL

  if (apiUrl) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      })

      if (response.ok) {
        return
      }
    } catch {
      // Frontend collaborators can keep working without a local API server.
    }
  }

  const stored = readStoredInquiries()
  writeStoredInquiries([inquiry, ...stored])
}

export function buildWhatsappInquiryUrl(phoneHref: string, inquiry: ContactInquiry) {
  const phone = phoneHref.replace(/\D/g, '')
  const message = [
    `Hola HONDAR, soy ${inquiry.name}.`,
    inquiry.phone ? `Telefono: ${inquiry.phone}.` : '',
    inquiry.city ? `Ciudad: ${inquiry.city}.` : '',
    inquiry.email ? `Correo: ${inquiry.email}.` : '',
    `Consulta: ${inquiry.message}`,
  ]
    .filter(Boolean)
    .join(' ')

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function buildEmailInquiryUrl(email: string, inquiry: ContactInquiry) {
  const subject = `HONDAR - Consulta de ${inquiry.name}`
  const body = [
    `Nombre: ${inquiry.name}`,
    `Correo: ${inquiry.email}`,
    inquiry.phone ? `Telefono: ${inquiry.phone}` : '',
    inquiry.city ? `Ciudad: ${inquiry.city}` : '',
    '',
    inquiry.message,
  ]
    .filter(Boolean)
    .join('\n')

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
