import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useLanguage, type SupportedLanguage } from '../../i18n/LanguageContext'
import { CTAButton } from '../ui/CTAButton'
import { IconCart, IconChevronDown, IconClose, IconMenu } from '../ui/ActionIcons'

type CommerceNavbarProps = {
  logo: { text: string; tagline?: string }
  navItems: { key: string; href: string }[]
  cta: { label: string; href: string }
}

const languageLabels: Record<SupportedLanguage, string> = {
  es: 'ES',
  en: 'EN',
  pt: 'PT',
  zh: 'ZH',
}

export function CommerceNavbar({ logo, navItems, cta }: CommerceNavbarProps) {
  const { language, languages, setLanguage, t } = useLanguage()
  const { itemCount, openCart } = useCart()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setLanguageOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const translatedNavItems = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        label: t(item.key),
      })),
    [navItems, t],
  )
  return (
    <>
      <header className={`commerce-navbar ${scrolled ? 'commerce-navbar--scrolled' : ''}`}>
        <div className="commerce-navbar__inner">
          <Link className="brand-lockup" to="/" aria-label={logo.text}>
            <span className="brand-lockup__mark brand-lockup__mark--image">
              <img src="/logo.png" alt="" aria-hidden="true" />
            </span>
            <span>
              <strong>{logo.text}</strong>
              {logo.tagline ? <em>{logo.tagline}</em> : null}
            </span>
          </Link>

          <nav className="commerce-navbar__links" aria-label={t('navbar.primaryNav')}>
            {translatedNavItems.map((item) =>
              item.href.startsWith('/') ? (
                <Link key={item.href} className={`nav-link ${location.pathname === item.href ? 'nav-link--active' : ''}`} to={item.href}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.href} className="nav-link" href={item.href}>
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="commerce-navbar__actions">
            <div className="language-switcher">
              <button className="language-switcher__trigger" type="button" onClick={() => setLanguageOpen((open) => !open)}>
                <span>{languageLabels[language]}</span>
                <IconChevronDown width={16} height={16} />
              </button>

              {languageOpen ? (
                <div className="language-switcher__menu">
                  {languages.map((languageCode) => (
                    <button
                      key={languageCode}
                      className={`language-switcher__option ${languageCode === language ? 'language-switcher__option--active' : ''}`}
                      type="button"
                      onClick={() => {
                        setLanguage(languageCode)
                        setLanguageOpen(false)
                      }}
                    >
                      {languageLabels[languageCode]}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <CTAButton className="commerce-navbar__cta" href={cta.href} size="sm">
              {cta.label}
            </CTAButton>

            <button className="cart-button" type="button" onClick={openCart} aria-label={t('navbar.cartAria')}>
              <IconCart width={20} height={20} />
              {itemCount > 0 ? <span className="cart-button__badge">{itemCount}</span> : null}
            </button>

            <button className="menu-button" type="button" onClick={() => setMobileOpen(true)} aria-label={t('navbar.menuOpen')}>
              <IconMenu width={20} height={20} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)} role="presentation">
          <aside className="mobile-nav-drawer" onClick={(event) => event.stopPropagation()}>
            <button className="mobile-nav-drawer__close" type="button" onClick={() => setMobileOpen(false)} aria-label={t('navbar.menuClose')}>
              <IconClose width={20} height={20} />
            </button>

            <div className="mobile-nav-drawer__links">
              {translatedNavItems.map((item) =>
                item.href.startsWith('/') ? (
                  <Link key={item.href} className={location.pathname === item.href ? 'is-active' : ''} to={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                ) : (
                  <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                )
              )}
            </div>

            <div className="mobile-nav-drawer__footer">
              <div className="mobile-nav-drawer__languages">
                {languages.map((languageCode) => (
                  <button
                    key={languageCode}
                    className={languageCode === language ? 'is-active' : ''}
                    type="button"
                    onClick={() => setLanguage(languageCode)}
                  >
                    {languageLabels[languageCode]}
                  </button>
                ))}
              </div>

              <CTAButton href={cta.href} fullWidth>
                {cta.label}
              </CTAButton>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  )
}
