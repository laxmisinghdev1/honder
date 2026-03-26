import fs from 'node:fs'
import path from 'node:path'

let localEnvCache: Record<string, string> | null = null

function readLocalEnvFile() {
  if (localEnvCache) {
    return localEnvCache
  }

  const envFiles = ['.env.local', '.env']
  const nextEnv: Record<string, string> = {}

  for (const fileName of envFiles) {
    const filePath = path.join(process.cwd(), fileName)

    if (!fs.existsSync(filePath)) {
      continue
    }

    const source = fs.readFileSync(filePath, 'utf8')

    for (const rawLine of source.split(/\r?\n/)) {
      const line = rawLine.trim()

      if (!line || line.startsWith('#')) {
        continue
      }

      const separatorIndex = line.indexOf('=')
      if (separatorIndex <= 0) {
        continue
      }

      const key = line.slice(0, separatorIndex).trim()
      let value = line.slice(separatorIndex + 1).trim()

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }

      nextEnv[key] = value
    }
  }

  localEnvCache = nextEnv
  return nextEnv
}

function getEnvValue(name: string) {
  return process.env[name] || readLocalEnvFile()[name]
}

function resolveGetnetEnvironment(baseUrl?: string) {
  const configured =
    getEnvValue('GETNET_ENV') ||
    getEnvValue('VITE_GETNET_ENV') ||
    ''

  if (configured === 'sandbox' || configured === 'production') {
    return configured
  }

  if (baseUrl?.includes('test.')) {
    return 'sandbox'
  }

  return 'production'
}

function resolveSiteUrl() {
  return (
    getEnvValue('VITE_PUBLIC_SITE_URL') ||
    getEnvValue('PUBLIC_SITE_URL') ||
    'https://hondar.vercel.app'
  ).replace(/\/$/, '')
}

function respondWithDemoCheckout(res: any, provider: 'mercado-pago' | 'getnet', reason: string) {
  res.status(200).json({
    ok: true,
    provider,
    environment: 'demo',
    mode: 'mock',
    reason,
  })
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const provider = `${body?.provider || ''}`.trim()
    const reference = `${body?.reference || ''}`.trim()
    const customer = body?.customer || {}
    const items = Array.isArray(body?.items) ? body.items : []

    if (!provider || !reference || items.length === 0) {
      res.status(400).json({ error: 'Provider, reference, and items are required' })
      return
    }

    if (provider === 'mercado-pago') {
      const accessToken = getEnvValue('MP_ACCESS_TOKEN')

      if (!accessToken) {
        respondWithDemoCheckout(res, 'mercado-pago', 'Missing Mercado Pago access token')
        return
      }

      const siteUrl = resolveSiteUrl()
      const preferenceResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Idempotency-Key': reference,
        },
        body: JSON.stringify({
          external_reference: reference,
          statement_descriptor: 'HONDAR',
          items: items.map((item: any) => ({
            id: item.id,
            title: item.name,
            description: item.category,
            quantity: item.quantity,
            unit_price: Number(item.price),
            currency_id: 'CLP',
          })),
          payer: {
            name: customer.fullName,
            email: customer.email,
          },
          back_urls: {
            success: `${siteUrl}/?payment=success&provider=mercado-pago&order=${encodeURIComponent(reference)}`,
            failure: `${siteUrl}/?payment=failure&provider=mercado-pago&order=${encodeURIComponent(reference)}`,
            pending: `${siteUrl}/?payment=pending&provider=mercado-pago&order=${encodeURIComponent(reference)}`,
          },
          auto_return: 'approved',
        }),
      })

      if (!preferenceResponse.ok) {
        const errorText = await preferenceResponse.text()
        res.status(502).json({ error: errorText || 'Unable to create Mercado Pago preference' })
        return
      }

      const preference = await preferenceResponse.json()
      res.status(200).json({
        ok: true,
        environment: preference?.sandbox_init_point ? 'sandbox' : 'production',
        paymentUrl: preference?.sandbox_init_point || preference?.init_point,
      })
      return
    }

    if (provider === 'getnet') {
      const baseUrl = getEnvValue('GETNET_BASE_URL')
      const login = getEnvValue('GETNET_LOGIN')
      const secretKey = getEnvValue('GETNET_SECRET_KEY')
      const directCheckoutUrl = getEnvValue('GETNET_PAYMENT_LINK')

      if (directCheckoutUrl) {
        res.status(200).json({
          ok: true,
          environment: resolveGetnetEnvironment(directCheckoutUrl),
          paymentUrl: directCheckoutUrl,
        })
        return
      }

      if (baseUrl && login && secretKey) {
        res.status(200).json({
          ok: true,
          environment: resolveGetnetEnvironment(baseUrl),
          paymentUrl: baseUrl,
        })
        return
      }

      respondWithDemoCheckout(res, 'getnet', 'Missing Getnet configuration')
      return
    }

    res.status(400).json({ error: 'Unsupported payment provider' })
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Unable to initialize checkout' })
  }
}
