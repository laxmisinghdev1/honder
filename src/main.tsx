import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './Router'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { LanguageProvider } from './i18n/LanguageContext'
import './style.css'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <LanguageProvider>
      <OrderProvider>
        <CartProvider>
          <Router />
        </CartProvider>
      </OrderProvider>
    </LanguageProvider>
  </StrictMode>,
)
