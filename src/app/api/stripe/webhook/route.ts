import { config } from '@/config'
import {
  handleProcessWebhookUpdatedSubscription,
  stripe,
} from '@/services/stripe'
import { headers } from 'next/headers'
import Stripe from 'stripe'

// Tudo que for post para a rota /api/stripe/webhook será tratado por essa função
export async function POST(req: Request) {
  // Tem que ser text porque essa é a maneira que o stripe envia os dados
  const body = await req.text()
  // Pegando a assinatura do cabeçalho
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripe.webhookSecret as string,
    )
  } catch (err) {
    const instanceofError = err instanceof Error
    const message = instanceofError ? err.message : err
    console.error(`Webhook Error: ${message}`)
    return new Response(`Webhook Error: ${message}`, { status: 400 })
  }

  // Tratando os eventos vindo do stripe
  switch (event.type) {
    // Quando a assinatura é criada ou atualizada, ele chama a função handleProcessWebhookUpdatedSubscription
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      console.log('Subscription created or updated')
      await handleProcessWebhookUpdatedSubscription(event.data)
      break
    // Eventos não tratados
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new Response(' { "received: true" } ', { status: 200 })
}
