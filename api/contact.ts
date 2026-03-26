export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const inquiry = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const name = `${inquiry?.name || ''}`.trim()
    const email = `${inquiry?.email || ''}`.trim()
    const message = `${inquiry?.message || ''}`.trim()

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required' })
      return
    }

    const resendKey = process.env.RESEND_API_KEY
    const notificationTo = process.env.NOTIFICATION_TO_EMAIL
    const notificationFrom = process.env.NOTIFICATION_FROM_EMAIL

    if (resendKey && notificationTo && notificationFrom) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: notificationFrom,
          to: [notificationTo],
          subject: `HONDAR lead: ${name}`,
          html: `
            <h2>Nuevo contacto HONDAR</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefono:</strong> ${inquiry?.phone || '-'}</p>
            <p><strong>Ciudad:</strong> ${inquiry?.city || '-'}</p>
            <p><strong>Canal:</strong> ${inquiry?.channel || '-'}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        }),
      })
    }

    res.status(200).json({ ok: true })
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Unable to process contact inquiry' })
  }
}
