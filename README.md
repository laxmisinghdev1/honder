# HONDAR

Preparado para compartirse por GitHub sin credenciales reales.

## Desarrollo local

1. Copia `.env.example` a `.env.local`.
2. Si solo necesitas trabajar frontend, deja vacias las variables de Supabase, pagos y correo.
3. Instala dependencias con `npm install`.
4. Ejecuta `npm run dev`.

## Comportamiento sin credenciales

- Contacto: si no hay API local disponible, las consultas se guardan en `localStorage`.
- Chat: `/api/chat` responde en modo fallback si falta `OPENAI_API_KEY`.
- Checkout: entra en modo demo/mock si faltan credenciales de Mercado Pago o Getnet.

## Publicacion

- `.env.local` y otros `.env.*` quedan ignorados por git.
- Usa solo `.env.example` como plantilla compartible.
