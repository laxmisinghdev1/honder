import type {
  CheckoutRequest,
  CheckoutResult,
  CustomerDetails,
  OrderEvent,
  OrderRecord,
  OrderStatus,
  PaymentEnvironment,
  PaymentProvider,
  ProviderRuntimeConfig,
} from '../types/commerce'

const ORDER_STORAGE_KEY = 'hondar_orders_v1'
const DEFAULT_CHECKOUT_API_URL = '/api/checkout'

class CheckoutValidationError extends Error {
  issues: string[]

  constructor(issues: string[]) {
    super('Checkout validation failed')
    this.name = 'CheckoutValidationError'
    this.issues = issues
  }
}

function buildProviderConfig(): Record<PaymentProvider, ProviderRuntimeConfig> {
  const checkoutApiUrl = import.meta.env.VITE_CHECKOUT_API_URL || DEFAULT_CHECKOUT_API_URL
  const mercadoPagoPublicKey = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY
  const mercadoPagoEnvironment = normalizeEnvironment(import.meta.env.VITE_MERCADO_PAGO_ENV)
  const getnetEnvironment = normalizeEnvironment(import.meta.env.VITE_GETNET_ENV, checkoutApiUrl)

  return {
    'mercado-pago': {
      id: 'mercado-pago',
      label: 'Mercado Pago',
      environment: mercadoPagoEnvironment,
      testMode: mercadoPagoEnvironment === 'sandbox',
      configured: Boolean(mercadoPagoPublicKey),
      checkoutReady: Boolean(checkoutApiUrl && mercadoPagoPublicKey),
      merchantId: import.meta.env.VITE_MERCADO_PAGO_COLLECTOR_ID,
      publicKey: mercadoPagoPublicKey,
    },
    getnet: {
      id: 'getnet',
      label: 'Getnet',
      environment: getnetEnvironment,
      testMode: getnetEnvironment === 'sandbox',
      configured: Boolean(checkoutApiUrl),
      checkoutReady: Boolean(checkoutApiUrl),
      merchantId: import.meta.env.VITE_GETNET_MERCHANT_ID,
      publicKey: import.meta.env.VITE_GETNET_PUBLIC_KEY,
    },
  }
}

function normalizeEnvironment(value: string | undefined, paymentLink?: string): PaymentEnvironment {
  if (value === 'sandbox' || value === 'production') {
    return value
  }

  if (!paymentLink) {
    return 'demo'
  }

  return 'sandbox'
}

function validateCustomer(customer: CustomerDetails) {
  const issues: string[] = []

  if (customer.fullName.trim().length < 3) {
    issues.push('checkout.validation.name')
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
    issues.push('checkout.validation.email')
  }

  if (customer.phone.replace(/\D/g, '').length < 8) {
    issues.push('checkout.validation.phone')
  }

  if (customer.city.trim().length < 2) {
    issues.push('checkout.validation.city')
  }

  return issues
}

function validateCheckout(request: CheckoutRequest) {
  const issues = validateCustomer(request.customer)

  if (request.items.length === 0) {
    issues.push('checkout.validation.empty')
  }

  if (request.items.some((item) => item.quantity <= 0 || item.price <= 0)) {
    issues.push('checkout.validation.invalidItem')
  }

  if (issues.length > 0) {
    throw new CheckoutValidationError(issues)
  }
}

function readOrders(): OrderRecord[] {
  if (typeof window === 'undefined') {
    return []
  }

  const stored = window.localStorage.getItem(ORDER_STORAGE_KEY)
  if (!stored) {
    return []
  }

  try {
    return JSON.parse(stored) as OrderRecord[]
  } catch {
    window.localStorage.removeItem(ORDER_STORAGE_KEY)
    return []
  }
}

function writeOrders(orders: OrderRecord[]) {
  window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders))
}

function createReference() {
  const stamp = Date.now().toString(36).toUpperCase()
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase()
  return `HND-${stamp}-${suffix}`
}

function createOrderEvent(
  type: OrderEvent['type'],
  status: OrderStatus,
  message: string,
): OrderEvent {
  return {
    id: crypto.randomUUID(),
    type,
    status,
    message,
    createdAt: new Date().toISOString(),
  }
}

function buildDraftOrder(request: CheckoutRequest, providerConfig: ProviderRuntimeConfig) {
  const now = new Date().toISOString()
  const amount = request.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const order: OrderRecord = {
    id: crypto.randomUUID(),
    reference: createReference(),
    provider: request.provider,
    providerLabel: providerConfig.label,
    status: 'pending_payment',
    amount,
    currency: 'CLP',
    items: request.items,
    customer: request.customer,
    createdAt: now,
    updatedAt: now,
    providerSnapshot: {
      id: providerConfig.id,
      label: providerConfig.label,
      environment: providerConfig.environment,
      testMode: providerConfig.testMode,
      configured: providerConfig.configured,
      merchantId: providerConfig.merchantId,
      publicKey: providerConfig.publicKey,
    },
    events: [createOrderEvent('order_created', 'pending_payment', 'order.created')],
    paymentLink: providerConfig.paymentLink,
    paymentMode: 'mock',
  }

  return order
}

async function requestCheckoutLink(order: OrderRecord, providerConfig: ProviderRuntimeConfig) {
  if (!providerConfig.checkoutReady) {
    return null
  }

  const endpoint = import.meta.env.VITE_CHECKOUT_API_URL || DEFAULT_CHECKOUT_API_URL
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider: order.provider,
      reference: order.reference,
      amount: order.amount,
      items: order.items,
      customer: order.customer,
    }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.error || 'Checkout provider unavailable')
  }

  const data = await response.json()
  return {
    paymentUrl: data?.paymentUrl as string | undefined,
    environment: (data?.environment as PaymentEnvironment | undefined) || providerConfig.environment,
  }
}

export function getProviderConfigs() {
  return buildProviderConfig()
}

export function listOrders() {
  return readOrders()
}

export async function createCheckoutSession(request: CheckoutRequest): Promise<CheckoutResult> {
  validateCheckout(request)

  const providerConfig = buildProviderConfig()[request.provider]
  const order = buildDraftOrder(request, providerConfig)

  try {
    const checkoutLink = await requestCheckoutLink(order, providerConfig)

    if (checkoutLink?.paymentUrl) {
      order.status = 'payment_redirected'
      order.updatedAt = new Date().toISOString()
      order.providerSnapshot.environment = checkoutLink.environment
      order.paymentLink = checkoutLink.paymentUrl
      order.paymentMode = 'external_link'
      order.events.push(createOrderEvent('payment_redirected', 'payment_redirected', 'payment.redirected'))
    }
  } catch {
    order.events.push(createOrderEvent('order_created', 'pending_payment', 'payment.pending'))
  }

  const orders = [order, ...readOrders()]
  writeOrders(orders)

  return {
    order,
    mode: order.paymentMode,
    paymentUrl: order.paymentLink,
    message: order.paymentMode === 'external_link' ? 'checkout.result.external' : 'checkout.result.mock',
  }
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const orders = readOrders()
  const updatedOrders = orders.map((order) =>
    order.id === orderId
      ? {
          ...order,
          status,
          updatedAt: new Date().toISOString(),
          events: [
            ...order.events,
            createOrderEvent(
              status === 'payment_approved' ? 'payment_approved' : 'payment_failed',
              status,
              status === 'payment_approved' ? 'payment.approved' : 'payment.failed',
            ),
          ],
        }
      : order,
  )

  writeOrders(updatedOrders)
  return updatedOrders.find((order) => order.id === orderId) ?? null
}

export { CheckoutValidationError }
