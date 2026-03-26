import { useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartDrawer } from './components/layout/CartDrawer'
import { CommerceNavbar } from './components/layout/CommerceNavbar'
import { FloatingActions } from './components/layout/FloatingActions'
import { SiteFooter } from './components/layout/SiteFooter'
import { floatingActions, contactDetails } from './data/hondar'
import { useLanguage } from './i18n/LanguageContext'

// Pages
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { CategoryPage } from './pages/CategoryPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { SizeGuidePage } from './pages/SizeGuidePage'
import { WhereToBuyPage } from './pages/WhereToBuyPage'
import { SupportPage } from './pages/SupportPage'
import { AboutPage } from './pages/AboutPage'
import { BlogPage, BlogPostPage } from './pages/BlogPage'
import { ContactPage } from './pages/ContactPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { NotFoundPage } from './pages/NotFoundPage'

const routeNavItems = [
  { key: 'nav.shop', href: '/shop' },
  { key: 'nav.sizeGuide', href: '/size-guide' },
  { key: 'nav.whereToBuy', href: '/where-to-buy' },
  { key: 'nav.support', href: '/support' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.blog', href: '/blog' },
  { key: 'nav.contact', href: '/contact' },
]

function AppShell() {
  const { t } = useLanguage()

  const footerNavLinks = useMemo(
    () => routeNavItems.map((item) => ({ href: item.href, label: t(item.key) })),
    [t],
  )

  // Show loading screen only on home page
  return (
    <div className="site-shell">
      <CommerceNavbar
        logo={{ text: 'HONDAR', tagline: t('brand.tagline') }}
        navItems={routeNavItems}
        cta={{ label: t('navbar.cta'), href: contactDetails.phoneHref }}
      />

      <CartDrawer />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/size-guide" element={<SizeGuidePage />} />
        <Route path="/where-to-buy" element={<WhereToBuyPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <SiteFooter
        brand={{ name: 'HONDAR', tagline: t('brand.tagline') }}
        socials={floatingActions}
        navLinks={footerNavLinks}
      />

      <FloatingActions actions={floatingActions} />
    </div>
  )
}

export function Router() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
