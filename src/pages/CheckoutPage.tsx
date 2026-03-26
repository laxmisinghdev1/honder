import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SectionContainer } from '../components/ui/SectionContainer'
import { CTAButton } from '../components/ui/CTAButton'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../i18n/LanguageContext'
import { FiShoppingCart, FiCheck } from 'react-icons/fi'

const copy = {
  es: {
    title: 'Checkout', emptyCart: 'Tu carrito está vacío.',
    emptyCta: 'Ir al catálogo',
    steps: ['Resumen', 'Datos', 'Envío', 'Pago'],
    summary: { title: 'Resumen del pedido', subtotal: 'Subtotal', shipping: 'Envío', total: 'Total', coupon: 'Código de cupón', applyCoupon: 'Aplicar' },
    customer: { title: 'Tus datos', name: 'Nombre completo', email: 'Email', phone: 'Teléfono', rut: 'RUT (opcional)' },
    shipping: { title: 'Método de envío', options: ['Despacho a domicilio (coordinar)', 'Retiro en punto (coordinar con vendedor)'] },
    payment: { title: 'Método de pago', options: ['MercadoPago', 'Getnet', 'Transferencia bancaria'], submitCta: 'Confirmar pedido por WhatsApp', note: 'Tu pedido se confirmará por WhatsApp con el equipo Hondar.' },
    next: 'Continuar', back: 'Volver',
  },
  en: {
    title: 'Checkout', emptyCart: 'Your cart is empty.',
    emptyCta: 'Go to catalog',
    steps: ['Summary', 'Details', 'Shipping', 'Payment'],
    summary: { title: 'Order summary', subtotal: 'Subtotal', shipping: 'Shipping', total: 'Total', coupon: 'Coupon code', applyCoupon: 'Apply' },
    customer: { title: 'Your details', name: 'Full name', email: 'Email', phone: 'Phone', rut: 'RUT (optional)' },
    shipping: { title: 'Shipping method', options: ['Home delivery (to coordinate)', 'Pickup point (to coordinate with seller)'] },
    payment: { title: 'Payment method', options: ['MercadoPago', 'Getnet', 'Bank transfer'], submitCta: 'Confirm order via WhatsApp', note: 'Your order will be confirmed via WhatsApp with the Hondar team.' },
    next: 'Continue', back: 'Back',
  },
  pt: {
    title: 'Checkout', emptyCart: 'Seu carrinho está vazio.',
    emptyCta: 'Ir ao catálogo',
    steps: ['Resumo', 'Dados', 'Envio', 'Pagamento'],
    summary: { title: 'Resumo do pedido', subtotal: 'Subtotal', shipping: 'Frete', total: 'Total', coupon: 'Código de cupom', applyCoupon: 'Aplicar' },
    customer: { title: 'Seus dados', name: 'Nome completo', email: 'E-mail', phone: 'Telefone', rut: 'RUT (opcional)' },
    shipping: { title: 'Método de envio', options: ['Entrega em domicílio (a combinar)', 'Retirada em ponto (a combinar com vendedor)'] },
    payment: { title: 'Método de pagamento', options: ['MercadoPago', 'Getnet', 'Transferência bancária'], submitCta: 'Confirmar pedido pelo WhatsApp', note: 'Seu pedido será confirmado pelo WhatsApp com a equipe Hondar.' },
    next: 'Continuar', back: 'Voltar',
  },
  zh: {
    title: '结账', emptyCart: '你的购物车是空的。',
    emptyCta: '前往产品目录',
    steps: ['摘要', '信息', '配送', '支付'],
    summary: { title: '订单摘要', subtotal: '小计', shipping: '配送费', total: '总计', coupon: '优惠码', applyCoupon: '应用' },
    customer: { title: '你的信息', name: '全名', email: '邮箱', phone: '电话', rut: 'RUT（可选）' },
    shipping: { title: '配送方式', options: ['送货上门（待协调）', '到点自取（待与卖家协调）'] },
    payment: { title: '支付方式', options: ['MercadoPago', 'Getnet', '银行转账'], submitCta: '通过 WhatsApp 确认订单', note: '你的订单将通过 WhatsApp 与 Hondar 团队确认。' },
    next: '继续', back: '返回',
  },
} as const

export function CheckoutPage() {
  const { language } = useLanguage()
  const { items, total } = useCart()
  const c = copy[language]

  const [step, setStep] = useState(0)
  const [coupon, setCoupon] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [shippingMethod, setShippingMethod] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState(0)

  const formatCLP = (n: number) => '$' + n.toLocaleString('es-CL')

  if (items.length === 0) {
    return (
      <main className="page-main checkout-page">
        <SectionContainer narrow>
          <AnimatedSection direction="up" distance={32} className="cart-page__empty">
            <span className="cart-page__empty-icon"><FiShoppingCart size={48} /></span>
            <p>{c.emptyCart}</p>
            <CTAButton href="/shop">{c.emptyCta}</CTAButton>
          </AnimatedSection>
        </SectionContainer>
      </main>
    )
  }

  const handleWhatsAppConfirm = () => {
    const itemsText = items.map((i) => `• ${i.name} x${i.quantity} — ${i.priceLabel}`).join('\n')
    const text = `Hola Hondar, quiero confirmar un pedido:\n\n${itemsText}\n\nTotal: ${formatCLP(total)}\n\nNombre: ${customerName}\nEmail: ${customerEmail}\nTeléfono: ${customerPhone}\nEnvío: ${c.shipping.options[shippingMethod]}\nPago: ${c.payment.options[paymentMethod]}`
    window.open(`https://wa.me/56988188648?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <main className="page-main checkout-page">
      <SectionContainer>
        <AnimatedSection direction="up" distance={28}>
          <h1 className="checkout-page__title">{c.title}</h1>
          {/* Step indicator */}
          <div className="checkout-page__steps">
            {c.steps.map((s, i) => (
              <div key={i} className={`checkout-page__step ${i === step ? 'checkout-page__step--active' : ''} ${i < step ? 'checkout-page__step--done' : ''}`}>
                <span className="checkout-page__step-num">{i < step ? <FiCheck size={14} /> : i + 1}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="checkout-page__layout">
          {/* Main area */}
          <AnimatedSection className="checkout-page__main" direction="left" distance={32} blur={6}>
            {step === 0 && (
              <div className="checkout-page__panel">
                <h2>{c.summary.title}</h2>
                <div className="checkout-page__order-items">
                  {items.map((item) => (
                    <div key={item.id} className="checkout-page__order-item">
                      <span>{item.name} × {item.quantity}</span>
                      <strong>{formatCLP(item.price * item.quantity)}</strong>
                    </div>
                  ))}
                </div>
                <div className="checkout-page__coupon">
                  <input
                    type="text"
                    placeholder={c.summary.coupon}
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button type="button">{c.summary.applyCoupon}</button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="checkout-page__panel">
                <h2>{c.customer.title}</h2>
                <div className="checkout-page__fields">
                  <div className="contact-page__field">
                    <label>{c.customer.name}</label>
                    <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                  </div>
                  <div className="contact-page__field">
                    <label>{c.customer.email}</label>
                    <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                  </div>
                  <div className="contact-page__field">
                    <label>{c.customer.phone}</label>
                    <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-page__panel">
                <h2>{c.shipping.title}</h2>
                <div className="checkout-page__options">
                  {c.shipping.options.map((opt, i) => (
                    <label key={i} className={`checkout-page__option ${shippingMethod === i ? 'checkout-page__option--active' : ''}`}>
                      <input type="radio" name="shipping" checked={shippingMethod === i} onChange={() => setShippingMethod(i)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="checkout-page__panel">
                <h2>{c.payment.title}</h2>
                <div className="checkout-page__options">
                  {c.payment.options.map((opt, i) => (
                    <label key={i} className={`checkout-page__option ${paymentMethod === i ? 'checkout-page__option--active' : ''}`}>
                      <input type="radio" name="payment" checked={paymentMethod === i} onChange={() => setPaymentMethod(i)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                <p className="checkout-page__payment-note">{c.payment.note}</p>
                <button type="button" className="checkout-page__confirm-btn" onClick={handleWhatsAppConfirm}>
                  {c.payment.submitCta}
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="checkout-page__nav">
              {step > 0 && (
                <button type="button" className="checkout-page__back-btn" onClick={() => setStep((s) => s - 1)}>
                  {c.back}
                </button>
              )}
              {step < 3 && (
                <CTAButton onClick={() => setStep((s) => s + 1)}>{c.next}</CTAButton>
              )}
            </div>
          </AnimatedSection>

          {/* Summary sidebar */}
          <AnimatedSection className="checkout-page__sidebar" direction="right" distance={32} blur={6}>
            <h3>{c.summary.title}</h3>
            {items.map((item) => (
              <div key={item.id} className="checkout-page__sidebar-item">
                <span>{item.name} ×{item.quantity}</span>
                <strong>{formatCLP(item.price * item.quantity)}</strong>
              </div>
            ))}
            <div className="checkout-page__sidebar-divider" />
            <div className="checkout-page__sidebar-row">
              <span>{c.summary.subtotal}</span>
              <strong>{formatCLP(total)}</strong>
            </div>
            <div className="checkout-page__sidebar-row">
              <span>{c.summary.shipping}</span>
              <span>—</span>
            </div>
            <div className="checkout-page__sidebar-row checkout-page__sidebar-row--total">
              <span>{c.summary.total}</span>
              <strong>{formatCLP(total)}</strong>
            </div>
            <Link to="/cart" className="checkout-page__edit-cart">{language === 'es' ? 'Editar carrito' : language === 'en' ? 'Edit cart' : language === 'pt' ? 'Editar carrinho' : '编辑购物车'}</Link>
          </AnimatedSection>
        </div>
      </SectionContainer>
    </main>
  )
}
