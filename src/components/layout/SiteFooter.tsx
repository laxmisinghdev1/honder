import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { contactDetails } from '../../data/hondar'
import { useLanguage, type SupportedLanguage } from '../../i18n/LanguageContext'
import { SectionContainer } from '../ui/SectionContainer'
import { IconInstagram, IconMail, IconPhone, IconWhatsApp } from '../ui/ActionIcons'

type FooterCopy = {
  navigation: string
  navigationMore: string
  contact: string
  legal: string
  rights: string
  socialLabel: string
  contactHint: string
  legalLinks: {
    label: string
    href: string
  }[]
}

export type SiteFooterProps = {
  brand: {
    name: string
    tagline?: string
  }
  socials: {
    platform: 'instagram' | 'whatsapp'
    url: string
    label: string
  }[]
  navLinks: {
    label: string
    href: string
  }[]
  className?: string
  attribution?: {
    name: string
    url: string
  }
}

const footerCopyByLanguage: Record<SupportedLanguage, FooterCopy> = {
  es: {
    navigation: 'Explora',
    navigationMore: 'Más',
    contact: 'Contacto',
    legal: 'Compra y ayuda',
    rights: 'Todos los derechos reservados.',
    socialLabel: 'Síguenos',
    contactHint: 'Escríbenos para confirmar stock, tallas, pagos y recomendaciones.',
    legalLinks: [
      { label: 'Ayuda de compra', href: '#faq' },
      { label: 'Cambios y soporte', href: '#contacto' },
      { label: 'Hablar por WhatsApp', href: contactDetails.phoneHref },
    ],
  },
  en: {
    navigation: 'Explore',
    navigationMore: 'More',
    contact: 'Contact',
    legal: 'Shopping and help',
    rights: 'All rights reserved.',
    socialLabel: 'Follow us',
    contactHint: 'Message us for stock, sizing, payment, and product guidance.',
    legalLinks: [
      { label: 'Shopping help', href: '#faq' },
      { label: 'Exchanges and support', href: '#contacto' },
      { label: 'Chat on WhatsApp', href: contactDetails.phoneHref },
    ],
  },
  pt: {
    navigation: 'Explorar',
    navigationMore: 'Mais',
    contact: 'Contato',
    legal: 'Compra e ajuda',
    rights: 'Todos os direitos reservados.',
    socialLabel: 'Siga a marca',
    contactHint: 'Fale conosco para confirmar estoque, tamanho, pagamento e recomendações.',
    legalLinks: [
      { label: 'Ajuda de compra', href: '#faq' },
      { label: 'Trocas e suporte', href: '#contacto' },
      { label: 'Falar no WhatsApp', href: contactDetails.phoneHref },
    ],
  },
  zh: {
    navigation: '探索',
    navigationMore: '更多',
    contact: '联系',
    legal: '购买与帮助',
    rights: '版权所有。',
    socialLabel: '关注我们',
    contactHint: '欢迎联系我们确认库存、尺码、付款方式和产品建议。',
    legalLinks: [
      { label: '购买帮助', href: '#faq' },
      { label: '换货与支持', href: '#contacto' },
      { label: '通过 WhatsApp 联系', href: contactDetails.phoneHref },
    ],
  },
}

function SocialIcon({ platform }: { platform: 'instagram' | 'whatsapp' }) {
  if (platform === 'instagram') {
    return <IconInstagram width={18} height={18} aria-hidden="true" />
  }

  return <IconWhatsApp width={18} height={18} aria-hidden="true" />
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string
  children: ReactNode
  external?: boolean
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="site-footer__link">
        {children}
      </a>
    )
  }

  if (href.startsWith('/')) {
    return (
      <Link to={href} className="site-footer__link">
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className="site-footer__link">
      {children}
    </a>
  )
}

export function SiteFooter({ brand, socials, navLinks, className, attribution }: SiteFooterProps) {
  const { language } = useLanguage()
  const copy = footerCopyByLanguage[language]
  const year = new Date().getFullYear()

  return (
    <footer className={['site-footer', className].filter(Boolean).join(' ')}>
      <SectionContainer>
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <div className="brand-lockup">
              <span className="brand-lockup__mark brand-lockup__mark--image" aria-hidden="true">
                <img src="/logo.png" alt="" />
              </span>
              <div>
                <strong>{brand.name}</strong>
                {brand.tagline ? <em>{brand.tagline}</em> : null}
              </div>
            </div>

            <p className="site-footer__hint">{copy.contactHint}</p>

            <div className="site-footer__socials" aria-label={copy.socialLabel}>
              {socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`site-footer__social site-footer__social--${social.platform}`}
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </div>

          <div className="site-footer__column">
            <p className="site-footer__eyebrow">{copy.navigation}</p>
            <div className="site-footer__links">
              {navLinks.slice(0, 4).map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>

          {navLinks.length > 4 && (
            <div className="site-footer__column">
              <p className="site-footer__eyebrow">{copy.navigationMore}</p>
              <div className="site-footer__links">
                {navLinks.slice(4).map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </div>
            </div>
          )}

          <div className="site-footer__column">
            <p className="site-footer__eyebrow">{copy.contact}</p>
            <div className="site-footer__contact-list">
              <a href={contactDetails.emailHref} className="site-footer__contact-item">
                <IconMail width={16} height={16} aria-hidden="true" />
                <span>{contactDetails.email}</span>
              </a>
              <a href={contactDetails.phoneHref} target="_blank" rel="noreferrer" className="site-footer__contact-item">
                <IconPhone width={16} height={16} aria-hidden="true" />
                <span>{contactDetails.phoneDisplay}</span>
              </a>
              <a href={contactDetails.phoneHref} target="_blank" rel="noreferrer" className="site-footer__contact-item">
                <IconWhatsApp width={16} height={16} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="site-footer__column">
            <p className="site-footer__eyebrow">{copy.legal}</p>
            <div className="site-footer__links">
              {copy.legalLinks.map((link) => (
                <FooterLink key={link.label} href={link.href} external={link.href.startsWith('http')}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>
            © {year} {brand.name}. {copy.rights}
          </span>
          {attribution ? (
            <span>
              Developed by{' '}
              <a href={attribution.url} target="_blank" rel="noreferrer" className="site-footer__bottom-link">
                {attribution.name}
              </a>
            </span>
          ) : null}
        </div>
      </SectionContainer>
    </footer>
  )
}
