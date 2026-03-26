import type { SVGProps } from 'react'

function createIcon(path: string, props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconCart(props: SVGProps<SVGSVGElement>) {
  return createIcon('M3 4h2l2.3 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.75L21 7H7.2M10 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z', props)
}

export function IconMenu(props: SVGProps<SVGSVGElement>) {
  return createIcon('M4 7h16M4 12h16M4 17h16', props)
}

export function IconClose(props: SVGProps<SVGSVGElement>) {
  return createIcon('M6 6l12 12M18 6 6 18', props)
}

export function IconChevronDown(props: SVGProps<SVGSVGElement>) {
  return createIcon('m6 9 6 6 6-6', props)
}

export function IconArrowUp(props: SVGProps<SVGSVGElement>) {
  return createIcon('M12 19V5M5 12l7-7 7 7', props)
}

export function IconChat(props: SVGProps<SVGSVGElement>) {
  return createIcon('M7 10h10M7 14h6M5 19l1.2-3.6A8 8 0 1 1 20 11a8 8 0 0 1-8 8c-1.1 0-2.1-.2-3-.6L5 19Z', props)
}

export function IconWhatsApp(props: SVGProps<SVGSVGElement>) {
  return createIcon('M16.7 14.6c-.2.6-1.2 1.1-1.8 1.2-.5.1-1.1.2-3.4-.8-2.9-1.3-4.7-4.3-4.8-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.2 1.1-2.5c.3-.3.7-.4.9-.4h.6c.2 0 .5-.1.7.5.3.7 1 2.4 1.1 2.6.1.2.1.5 0 .7-.1.2-.2.4-.4.6-.2.2-.3.4-.5.6-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.7 1.5 1.3 2.7 1.7 3.1 1.9.4.2.6.1.8-.1.3-.3 1.1-1.3 1.4-1.7.2-.4.5-.3.8-.2.3.1 2 .9 2.4 1 .3.1.5.2.6.4.1.2.1 1-.1 1.6Z', props)
}

export function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return createIcon('M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 3.5h.01M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z', props)
}

export function IconMail(props: SVGProps<SVGSVGElement>) {
  return createIcon('M4 6h16v12H4zM4 8l8 6 8-6', props)
}

export function IconPhone(props: SVGProps<SVGSVGElement>) {
  return createIcon('M6.5 4.5h3l1.2 4-1.8 1.8a15.5 15.5 0 0 0 4.8 4.8l1.8-1.8 4 1.2v3a1.5 1.5 0 0 1-1.5 1.5c-7.2 0-13-5.8-13-13A1.5 1.5 0 0 1 6.5 4.5Z', props)
}

export function IconSend(props: SVGProps<SVGSVGElement>) {
  return createIcon('M4 20 20 12 4 4l2.6 6L15 12l-8.4 2L4 20Z', props)
}

export function IconStar(props: SVGProps<SVGSVGElement>) {
  return createIcon('m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z', props)
}
