import { useEffect, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { ChatWidget } from './ChatWidget'
import { IconChat, IconClose, IconInstagram, IconWhatsApp } from '../ui/ActionIcons'

type FloatingAction = {
  platform: 'whatsapp' | 'instagram'
  url: string
  label: string
}

function getIcon(platform: FloatingAction['platform']) {
  if (platform === 'instagram') {
    return <IconInstagram width={22} height={22} />
  }

  return <IconWhatsApp width={22} height={22} />
}

export function FloatingActions({
  actions,
  chat = true,
}: {
  actions: FloatingAction[]
  chat?: boolean
}) {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1400)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  if (!visible) {
    return null
  }

  return (
    <>
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="floating-actions floating-actions--hover-cluster">
        <div className="floating-actions__stack">
          {actions.map((action) => (
            <a
              key={action.platform}
              className={`floating-action floating-action--${action.platform}`}
              href={action.url}
              target="_blank"
              rel="noreferrer"
              aria-label={action.label}
            >
              {getIcon(action.platform)}
            </a>
          ))}
        </div>

        {chat ? (
          <button
            className="floating-action floating-action--chat"
            type="button"
            onClick={() => setChatOpen((open) => !open)}
            aria-label={t('floating.chat')}
          >
            {chatOpen ? <IconClose width={20} height={20} /> : <IconChat width={20} height={20} />}
          </button>
        ) : null}
      </div>
    </>
  )
}
