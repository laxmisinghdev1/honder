import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { CTAButton } from '../ui/CTAButton'
import { IconClose, IconSend } from '../ui/ActionIcons'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

function fallbackReply(message: string, t: (key: string) => string) {
  const lowerMessage = message.toLowerCase()
  const priceKeywords = ['precio', 'price', 'preco']
  const checkoutKeywords = ['carrito', 'checkout', 'pago', 'payment', 'pagamento', 'carrinho']
  const supportKeywords = ['chat', 'ia', 'ai', 'ayuda', 'help', 'ajuda']

  if (priceKeywords.some((keyword) => lowerMessage.includes(keyword))) {
    return t('chat.reply.price')
  }

  if (checkoutKeywords.some((keyword) => lowerMessage.includes(keyword))) {
    return t('chat.reply.checkout')
  }

  if (supportKeywords.some((keyword) => lowerMessage.includes(keyword))) {
    return t('chat.reply.ai')
  }

  return t('chat.reply.default')
}

export function ChatWidget({
  isOpen,
  onClose,
  endpoint = import.meta.env.VITE_CHAT_API_URL?.trim() || '/api/chat',
}: {
  isOpen: boolean
  onClose: () => void
  endpoint?: string
}) {
  const { language, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const storageKey = `hondar-chat-v2-${language}`

  useEffect(() => {
    const stored = window.sessionStorage.getItem(storageKey)
    if (stored) {
      try {
        setMessages(JSON.parse(stored) as Message[])
        return
      } catch {
        window.sessionStorage.removeItem(storageKey)
      }
    }

    setMessages([{ role: 'assistant', content: t('chat.welcome') }])
  }, [storageKey, t])

  useEffect(() => {
    window.sessionStorage.setItem(storageKey, JSON.stringify(messages))
  }, [messages, storageKey])

  useEffect(() => {
    if (!scrollRef.current) {
      return
    }

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading, isOpen])

  const remaining = useMemo(() => 500 - input.length, [input.length])

  async function handleSend() {
    if (!input.trim() || input.length > 500 || loading) {
      return
    }

    const messageText = input.trim()
    const nextMessages = [...messages, { role: 'user' as const, content: messageText }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: nextMessages.slice(-10),
        }),
      })

      if (!response.ok) {
        throw new Error('Chat endpoint unavailable')
      }

      const data = (await response.json()) as { reply?: string }
      setMessages([...nextMessages, { role: 'assistant', content: data.reply ?? fallbackReply(messageText, t) }])
    } catch {
      window.setTimeout(() => {
        setMessages([...nextMessages, { role: 'assistant', content: fallbackReply(messageText, t) }])
      }, 360)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <aside className="chat-widget">
      <div className="chat-widget__chrome" aria-hidden="true">
        <span />
        <span />
      </div>
      <header className="chat-widget__header">
        <div className="chat-widget__brand">
          <span className="chat-widget__brand-mark">
            <img src="/logo.png" alt="" aria-hidden="true" />
          </span>
          <div>
            <strong>{t('chat.title')}</strong>
            <span>{t('chat.supportLabel')}</span>
          </div>
        </div>

        <button type="button" onClick={onClose} aria-label={t('cart.close')}>
          <IconClose width={18} height={18} />
        </button>
      </header>

      <div className="chat-widget__messages" ref={scrollRef}>
        <div className="chat-widget__intro">
          <p>{t('chat.introLabel')}</p>
          <strong>{t('chat.introBody')}</strong>
        </div>
        {messages.map((message, index) => (
          <article key={`${message.role}-${index}`} className={`chat-bubble chat-bubble--${message.role}`}>
            {message.content}
          </article>
        ))}

        {loading ? (
          <div className="chat-typing" aria-label={t('chat.typing')}>
            <span />
            <span />
            <span />
          </div>
        ) : null}
      </div>

      <div className="chat-widget__composer">
        <div className="chat-widget__textarea-shell">
          <textarea
            rows={2}
            maxLength={500}
            placeholder={t('chat.placeholder')}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                void handleSend()
              }
            }}
          />
        </div>
        <div className="chat-widget__composer-footer">
          <span>{remaining}/500</span>
          <CTAButton onClick={() => void handleSend()} size="sm" icon={<IconSend width={16} height={16} />}>
            {t('chat.send')}
          </CTAButton>
        </div>
      </div>
    </aside>
  )
}
