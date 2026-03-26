import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  CheckoutValidationError,
  createCheckoutSession,
  getProviderConfigs,
  listOrders,
  updateOrderStatus,
} from '../lib/commerce'
import type {
  CheckoutRequest,
  CheckoutResult,
  OrderRecord,
  OrderStatus,
  ProviderRuntimeConfig,
} from '../types/commerce'

type OrderContextValue = {
  orders: OrderRecord[]
  providerConfigs: Record<string, ProviderRuntimeConfig>
  startCheckout: (request: CheckoutRequest) => Promise<CheckoutResult>
  markOrderStatus: (orderId: string, status: OrderStatus) => OrderRecord | null
  checkoutErrorClass: typeof CheckoutValidationError
}

const OrderContext = createContext<OrderContextValue | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderRecord[]>(() => listOrders())

  const value = useMemo<OrderContextValue>(() => {
    const startCheckout = (request: CheckoutRequest) => {
      return createCheckoutSession(request).then((result) => {
        setOrders(listOrders())
        return result
      })
    }

    const markOrderStatus = (orderId: string, status: OrderStatus) => {
      const updatedOrder = updateOrderStatus(orderId, status)
      setOrders(listOrders())
      return updatedOrder
    }

    return {
      orders,
      providerConfigs: getProviderConfigs(),
      startCheckout,
      markOrderStatus,
      checkoutErrorClass: CheckoutValidationError,
    }
  }, [orders])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider')
  }

  return context
}
