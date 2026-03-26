import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type CartProduct = {
  id: string
  name: string
  category: string
  price: number
  priceLabel: string
  quantity?: number
}

type CartItem = CartProduct & {
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  itemCount: number
  total: number
  addItem: (item: CartProduct) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  removeItem: (id: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CART_STORAGE_KEY = 'hondar_cart_v1'

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) {
      return
    }

    try {
      const parsed = JSON.parse(stored) as CartItem[]
      setItems(parsed)
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo<CartContextValue>(() => {
    const addItem = (item: CartProduct) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((currentItem) => currentItem.id === item.id)

        if (existingItem) {
          return currentItems.map((currentItem) =>
            currentItem.id === item.id
              ? { ...currentItem, quantity: currentItem.quantity + (item.quantity ?? 1) }
              : currentItem,
          )
        }

        return [...currentItems, { ...item, quantity: item.quantity ?? 1 }]
      })

      setIsOpen(true)
    }

    const incrementItem = (id: string) => {
      setItems((currentItems) =>
        currentItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    }

    const decrementItem = (id: string) => {
      setItems((currentItems) =>
        currentItems
          .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0),
      )
    }

    const removeItem = (id: string) => {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id))
    }

    const clearCart = () => setItems([])
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

    return {
      items,
      isOpen,
      itemCount,
      total,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    }
  }, [isOpen, items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}
