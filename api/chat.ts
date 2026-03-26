const defaultSystemPrompt =
  process.env.CHATBOT_SYSTEM_PROMPT ||
  'You are the HONDAR shopping assistant. Help users with products, sizes, payments, shipping, and purchase recommendations.'

function fallbackReply(message: string) {
  const lowerMessage = message.toLowerCase()

  if (['precio', 'price', 'preco'].some((keyword) => lowerMessage.includes(keyword))) {
    return 'Puedo orientarte con precios visibles, diferencias entre modelos y recomendaciones segun uso.'
  }

  if (['talla', 'size', 'tamanho'].some((keyword) => lowerMessage.includes(keyword))) {
    return 'Si me dices tu talla habitual o largo de pie, te ayudo a orientar la compra.'
  }

  if (['envio', 'despacho', 'shipping', 'entrega'].some((keyword) => lowerMessage.includes(keyword))) {
    return 'Podemos revisar cobertura, comuna y la mejor forma de coordinar despacho dentro de Chile.'
  }

  return 'Puedo ayudarte con productos, tallas, medios de pago, despacho y recomendaciones de compra para HONDAR.'
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const message = `${body?.message || ''}`.trim()
    const history = Array.isArray(body?.history) ? body.history.slice(-10) : []

    if (!message) {
      res.status(400).json({ error: 'Message is required' })
      return
    }

    if (!process.env.OPENAI_API_KEY) {
      res.status(200).json({ reply: fallbackReply(message), mode: 'fallback' })
      return
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        temperature: 0.5,
        messages: [
          { role: 'system', content: defaultSystemPrompt },
          ...history.map((item: any) => ({
            role: item?.role === 'assistant' ? 'assistant' : 'user',
            content: `${item?.content || ''}`,
          })),
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      res.status(200).json({ reply: fallbackReply(message), mode: 'fallback', error: errorText })
      return
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content?.trim() || fallbackReply(message)
    res.status(200).json({ reply, mode: 'openai' })
  } catch (error: any) {
    res.status(200).json({ reply: fallbackReply(req.body?.message || ''), mode: 'fallback', error: error?.message })
  }
}
