import { Link } from 'react-router-dom'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionContainer } from '../components/ui/SectionContainer'
import { CTAButton } from '../components/ui/CTAButton'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../i18n/LanguageContext'
import { FiShoppingCart, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'

const copy = {
  es: {
    title: 'Tu carrito', empty: 'Tu carrito está vacío.',
    emptyCta: 'Explorar catálogo', continueCta: 'Seguir comprando',
    checkoutCta: 'Ir a pagar', subtotal: 'Subtotal',
    shipping: 'Envío', shippingValue: 'Calculado en el checkout',
    total: 'Total estimado', remove: 'Eliminar',
  },
  en: {
    title: 'Your cart', empty: 'Your cart is empty.',
    emptyCta: 'Browse catalog', continueCta: 'Continue shopping',
    checkoutCta: 'Proceed to checkout', subtotal: 'Subtotal',
    shipping: 'Shipping', shippingValue: 'Calculated at checkout',
    total: 'Estimated total', remove: 'Remove',
  },
  pt: {
    title: 'Seu carrinho', empty: 'Seu carrinho está vazio.',
    emptyCta: 'Explorar catálogo', continueCta: 'Continuar comprando',
    checkoutCta: 'Ir para o pagamento', subtotal: 'Subtotal',
    shipping: 'Frete', shippingValue: 'Calculado no checkout',
    total: 'Total estimado', remove: 'Remover',
  },
  zh: {
    title: '购物车', empty: '你的购物车是空的。',
    emptyCta: '浏览产品目录', continueCta: '继续购物',
    checkoutCta: '去结账', subtotal: '小计',
    shipping: '配送费', shippingValue: '在结账时计算',
    total: '预估总计', remove: '移除',
  },
} as const

export function CartPage() {
  const { language } = useLanguage()
  const { items, total, incrementItem, decrementItem, removeItem } = useCart()
  const c = copy[language]

  const formatCLP = (n: number) =>
    '$' + n.toLocaleString('es-CL')

  return (
    <main className="page-main cart-page">
      <SectionContainer>
        <AnimatedSection direction="up" distance={28}>
          <h1 className="cart-page__title">{c.title}</h1>
        </AnimatedSection>

        {items.length === 0 ? (
          <AnimatedSection direction="up" distance={32} className="cart-page__empty">
            <span className="cart-page__empty-icon"><FiShoppingCart size={48} /></span>
            <p>{c.empty}</p>
            <CTAButton href="/shop">{c.emptyCta}</CTAButton>
          </AnimatedSection>
        ) : (
          <div className="cart-page__layout">
            <AnimatedSection className="cart-page__items" direction="left" distance={32} blur={6}>
              {items.map((item) => (
                <div key={item.id} className="cart-page__item">
                  <div className="cart-page__item-info">
                    <strong>{item.name}</strong>
                    <span>{item.category}</span>
                    <span>{item.priceLabel}</span>
                  </div>
                  <div className="cart-page__item-controls">
                    <button type="button" onClick={() => decrementItem(item.id)}><FiMinus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => incrementItem(item.id)}><FiPlus size={14} /></button>
                  </div>
                  <div className="cart-page__item-line">
                    <strong>{formatCLP(item.price * item.quantity)}</strong>
                    <button type="button" className="cart-page__remove" onClick={() => removeItem(item.id)}>
                      <FiTrash2 size={12} /> {c.remove}
                    </button>
                  </div>
                </div>
              ))}
            </AnimatedSection>

            <AnimatedSection className="cart-page__summary" direction="right" distance={32} blur={6}>
              <div className="cart-page__summary-row">
                <span>{c.subtotal}</span>
                <strong>{formatCLP(total)}</strong>
              </div>
              <div className="cart-page__summary-row">
                <span>{c.shipping}</span>
                <span>{c.shippingValue}</span>
              </div>
              <div className="cart-page__summary-row cart-page__summary-row--total">
                <span>{c.total}</span>
                <strong>{formatCLP(total)}</strong>
              </div>
              <Link to="/checkout" className="cart-page__checkout-btn">{c.checkoutCta}</Link>
              <Link to="/shop" className="cart-page__continue-link">{c.continueCta}</Link>
            </AnimatedSection>
          </div>
        )}
      </SectionContainer>
    </main>
  )
}
