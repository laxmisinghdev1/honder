import { useMemo, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useOrders } from '../../context/OrderContext'
import { useLanguage } from '../../i18n/LanguageContext'
import type { CheckoutResult, CustomerDetails, PaymentProvider } from '../../types/commerce'
import { BadgePill } from '../ui/BadgePill'
import { CTAButton } from '../ui/CTAButton'
import { IconClose } from '../ui/ActionIcons'

function getLocale(language: string) {
  if (language === 'en') {
    return 'en-US'
  }

  if (language === 'pt') {
    return 'pt-BR'
  }

  if (language === 'zh') {
    return 'zh-CN'
  }

  return 'es-CL'
}

function formatPrice(value: number, language: string) {
  return new Intl.NumberFormat(getLocale(language)).format(value)
}

function formatOrderStatus(status: string, t: (key: string) => string) {
  return t(`order.status.${status}`)
}

function formatProviderStatus(option: { configured: boolean; testMode: boolean; environment: string }, t: (key: string) => string) {
  if (!option.configured) {
    return t('cart.providerDemo')
  }

  return option.testMode ? `${t('cart.providerConfigured')} · Sandbox` : `${t('cart.providerConfigured')} · Production`
}

export function CartDrawer() {
  const { clearCart, closeCart, decrementItem, incrementItem, isOpen, items, removeItem, total } = useCart()
  const { checkoutErrorClass, markOrderStatus, orders, providerConfigs, startCheckout } = useOrders()
  const { language, t } = useLanguage()
  const [provider, setProvider] = useState<PaymentProvider>('mercado-pago')
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    notes: '',
  })
  const [validationIssues, setValidationIssues] = useState<string[]>([])
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResult | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const latestOrder = orders[0] ?? null

  const orderSummary = useMemo(
    () => items.map((item) => `${item.name} x${item.quantity}`).join(', '),
    [items],
  )

  if (!isOpen) {
    return null
  }

  const providerOptions = [
    providerConfigs['mercado-pago'],
    providerConfigs.getnet,
  ]

  function updateCustomerField<Key extends keyof CustomerDetails>(key: Key, value: CustomerDetails[Key]) {
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [key]: value,
    }))
  }

  async function handleCheckout() {
    setSubmitting(true)
    setValidationIssues([])

    try {
      const result = await startCheckout({
        provider,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          priceLabel: item.priceLabel,
          quantity: item.quantity,
        })),
        customer,
      })

      setCheckoutResult(result)

      if (result.mode === 'external_link' && result.paymentUrl) {
        window.open(result.paymentUrl, '_blank', 'noopener,noreferrer')
      }
    } catch (error) {
      if (error instanceof checkoutErrorClass) {
        setValidationIssues(error.issues)
      } else {
        setValidationIssues(['checkout.error.unavailable'])
      }
    } finally {
      setSubmitting(false)
    }
  }

  function handleOrderStatus(status: 'payment_approved' | 'payment_failed') {
    if (!checkoutResult) {
      return
    }

    markOrderStatus(checkoutResult.order.id, status)

    if (status === 'payment_approved') {
      clearCart()
    }
  }

  return (
    <div className="cart-drawer-overlay" onClick={closeCart} role="presentation">
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="cart-drawer__header">
          <div>
            <p className="cart-drawer__eyebrow">{t('cart.eyebrow')}</p>
            <h3>{t('cart.title')}</h3>
          </div>

          <button className="cart-drawer__close" type="button" onClick={closeCart} aria-label={t('cart.close')}>
            <IconClose width={20} height={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>{t('cart.empty')}</p>
            {latestOrder ? (
              <div className="order-status-card">
                <strong>
                  {t('cart.latestOrder')}: {latestOrder.reference}
                </strong>
                <span>{latestOrder.providerLabel}</span>
                <BadgePill color="accent-soft">{formatOrderStatus(latestOrder.status, t)}</BadgePill>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="cart-drawer__items">
            {items.map((item) => (
              <article key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.category}</span>
                </div>

                <div className="cart-item__controls">
                  <button type="button" onClick={() => decrementItem(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => incrementItem(item.id)}>
                    +
                  </button>
                </div>

                <div className="cart-item__meta">
                  <strong>${formatPrice(item.price * item.quantity, language)}</strong>
                  <button type="button" onClick={() => removeItem(item.id)}>
                    {t('cart.remove')}
                  </button>
                </div>
              </article>
            ))}

            <section className="checkout-panel">
              <div className="checkout-panel__header">
                <strong>{t('cart.header')}</strong>
                <span>{orderSummary || t('cart.itemsSummaryNone')}</span>
              </div>

              <div className="provider-grid">
                {providerOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`provider-card ${provider === option.id ? 'provider-card--active' : ''}`}
                    type="button"
                    onClick={() => setProvider(option.id)}
                  >
                    <strong>{option.label}</strong>
                    <span>{formatProviderStatus(option, t)}</span>
                    {option.merchantId ? <span>ID: {option.merchantId}</span> : null}
                  </button>
                ))}
              </div>

              <div className="checkout-form-grid">
                <label>
                  <span>{t('cart.field.name')}</span>
                  <input value={customer.fullName} onChange={(event) => updateCustomerField('fullName', event.target.value)} />
                </label>
                <label>
                  <span>{t('cart.field.email')}</span>
                  <input value={customer.email} onChange={(event) => updateCustomerField('email', event.target.value)} />
                </label>
                <label>
                  <span>{t('cart.field.phone')}</span>
                  <input value={customer.phone} onChange={(event) => updateCustomerField('phone', event.target.value)} />
                </label>
                <label>
                  <span>{t('cart.field.city')}</span>
                  <input value={customer.city} onChange={(event) => updateCustomerField('city', event.target.value)} />
                </label>
                <label className="checkout-form-grid__full">
                  <span>{t('cart.field.notes')}</span>
                  <textarea
                    rows={3}
                    value={customer.notes}
                    onChange={(event) => updateCustomerField('notes', event.target.value)}
                  />
                </label>
              </div>

              {validationIssues.length > 0 ? (
                <div className="checkout-issues">
                  {validationIssues.map((issue) => (
                    <p key={issue}>{t(issue)}</p>
                  ))}
                </div>
              ) : null}

              {checkoutResult ? (
                <div className="checkout-result">
                  <strong>{checkoutResult.order.reference}</strong>
                  <span>{t(checkoutResult.message)}</span>
                  <BadgePill color="accent-soft">
                    {checkoutResult.order.providerLabel} - {formatOrderStatus(checkoutResult.order.status, t)}
                  </BadgePill>
                  <span>
                    {checkoutResult.order.providerSnapshot.environment === 'sandbox' ? 'Sandbox' : checkoutResult.order.providerSnapshot.environment === 'production' ? 'Production' : 'Demo'}
                  </span>

                  {checkoutResult.mode === 'mock' ? (
                    <div className="checkout-result__actions">
                      <CTAButton size="sm" onClick={() => handleOrderStatus('payment_approved')}>
                        {t('cart.mockApprove')}
                      </CTAButton>
                      <CTAButton size="sm" variant="secondary" onClick={() => handleOrderStatus('payment_failed')}>
                        {t('cart.mockFail')}
                      </CTAButton>
                    </div>
                  ) : (
                    <p>{t('cart.externalLinkOpened')}</p>
                  )}
                </div>
              ) : null}
            </section>
          </div>
        )}

        <div className="cart-drawer__footer">
          <div className="cart-drawer__total">
            <span>{t('cart.total')}</span>
            <strong>${formatPrice(total, language)}</strong>
          </div>

          <CTAButton fullWidth onClick={handleCheckout} disabled={items.length === 0 || submitting}>
            {submitting ? t('cart.submitting') : t('cart.checkout')}
          </CTAButton>
        </div>
      </aside>
    </div>
  )
}
