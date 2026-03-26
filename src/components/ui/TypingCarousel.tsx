import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { HighlightWord } from './HighlightWord'

export type CarouselItem = {
  text: string
  highlight?: {
    word: string
    variant: 'warm' | 'hot' | 'ink' | 'gold'
  }
}

type Phase = 'typing' | 'deleting'

function renderText(displayedText: string, item: CarouselItem): ReactNode {
  if (!item.highlight) {
    return displayedText
  }

  const index = displayedText.indexOf(item.highlight.word)
  const isVisible = index >= 0 && index + item.highlight.word.length <= displayedText.length

  if (!isVisible) {
    return displayedText
  }

  const before = displayedText.slice(0, index)
  const after = displayedText.slice(index + item.highlight.word.length)

  return (
    <>
      {before}
      <HighlightWord variant={item.highlight.variant}>{item.highlight.word}</HighlightWord>
      {after}
    </>
  )
}

function getLongestItem(items: CarouselItem[]) {
  return items.reduce((longestItem, currentItem) =>
    currentItem.text.length > longestItem.text.length ? currentItem : longestItem,
  items[0] ?? { text: '' })
}

export function TypingCarousel({
  items,
  typeSpeed = 34,
  deleteSpeed = 18,
  pauseTime = 1600,
  cursor = true,
  cursorChar = '|',
  className = '',
  tag = 'span',
}: {
  items: CarouselItem[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
  cursor?: boolean
  cursorChar?: string
  className?: string
  tag?: 'span' | 'h1' | 'h2' | 'p'
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')

  const safeItems = items.length > 0 ? items : [{ text: '' }]
  const currentItem = useMemo(() => safeItems[currentIndex] ?? safeItems[0], [currentIndex, safeItems])
  const longestItem = useMemo(() => getLongestItem(safeItems), [safeItems])

  useEffect(() => {
    setCurrentIndex(0)
    setDisplayedText('')
    setPhase('typing')
  }, [items])

  useEffect(() => {
    const fullText = currentItem.text

    if (phase === 'typing' && displayedText === fullText) {
      const pauseTimeout = window.setTimeout(() => {
        setPhase('deleting')
      }, pauseTime)

      return () => window.clearTimeout(pauseTimeout)
    }

    if (phase === 'deleting' && displayedText.length === 0) {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % safeItems.length)
      setPhase('typing')
      return
    }

    const stepTimeout = window.setTimeout(() => {
      if (phase === 'typing') {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
        return
      }

      if (phase === 'deleting') {
        setDisplayedText((currentText) => currentText.slice(0, currentText.length - 1))
      }
    }, phase === 'typing' ? typeSpeed : deleteSpeed)

    return () => window.clearTimeout(stepTimeout)
  }, [currentItem.text, deleteSpeed, displayedText, pauseTime, phase, safeItems.length, typeSpeed])

  const Tag = tag

  return (
    <Tag className={`typing-carousel ${className}`.trim()}>
      <span className="typing-carousel__sizer" aria-hidden="true">
        <span className="typing-carousel__text">{renderText(longestItem.text, longestItem)}</span>
        {cursor ? <span className="typing-carousel__cursor">{cursorChar}</span> : null}
      </span>
      <span className="typing-carousel__live">
        <span className="typing-carousel__text">{renderText(displayedText, currentItem)}</span>
        {cursor ? <span className="typing-carousel__cursor">{cursorChar}</span> : null}
      </span>
    </Tag>
  )
}
