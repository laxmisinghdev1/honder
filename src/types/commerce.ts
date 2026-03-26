export type PaymentProvider = 'mercado-pago' | 'getnet'
export type PaymentEnvironment = 'sandbox' | 'production' | 'demo'

export type OrderStatus =
  | 'draft'
  | 'pending_payment'
  | 'payment_redirected'
  | 'payment_approved'
  | 'payment_failed'

export type CheckoutMode = 'mock' | 'external_link'

export type OrderEvent = {
  id: string
  type: 'order_created' | 'payment_redirected' | 'payment_approved' | 'payment_failed'
  status: OrderStatus
  message: string
  createdAt: string
}

export type ProviderSnapshot = {
  id: PaymentProvider
  label: string
  environment: PaymentEnvironment
  testMode: boolean
  configured: boolean
  merchantId?: string
  publicKey?: string
}

export type CustomerDetails = {
  fullName: string
  email: string
  phone: string
  city: string
  notes: string
}

export type CheckoutItem = {
  id: string
  name: string
  category: string
  price: number
  priceLabel: string
  quantity: number
}

export type OrderRecord = {
  id: string
  reference: string
  provider: PaymentProvider
  providerLabel: string
  status: OrderStatus
  amount: number
  currency: 'CLP'
  items: CheckoutItem[]
  customer: CustomerDetails
  createdAt: string
  updatedAt: string
  providerSnapshot: ProviderSnapshot
  events: OrderEvent[]
  paymentLink?: string
  paymentMode: CheckoutMode
}

export type CheckoutRequest = {
  provider: PaymentProvider
  items: CheckoutItem[]
  customer: CustomerDetails
}

export type CheckoutResult = {
  order: OrderRecord
  mode: CheckoutMode
  paymentUrl?: string
  message: string
}

export type ProviderRuntimeConfig = {
  id: PaymentProvider
  label: string
  environment: PaymentEnvironment
  testMode: boolean
  configured: boolean
  checkoutReady: boolean
  merchantId?: string
  publicKey?: string
  paymentLink?: string
}
