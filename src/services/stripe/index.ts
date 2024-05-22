import { config } from '@/config'
import Stripe from 'stripe'

export const stripe = new Stripe((config.stripe.secretKey as string) || '', {
  apiVersion: '2024-04-10',
  httpClient: Stripe.createFetchHttpClient(),
})

export const getStripeCustomerByEmail = async (email: string) => {
  const customer = await stripe.customers.list({ email })
  return customer.data[0]
}

export const createStripeCustomer = async (input: {
  email: string
  name?: string
}) => {
  const customer = await getStripeCustomerByEmail(input.email)

  if (customer) return customer

  return stripe.customers.create({
    email: input.email,
    name: input.name,
  })
}

export const createCheckoutSession = async (
  userId: string,
  userEmail: string,
) => {
  try {
    // Criamos ou pegamos o cliente no stripe
    const customer = await createStripeCustomer({
      email: userEmail,
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],

      mode: 'subscription',

      client_reference_id: userId,
      customer: customer.id,

      success_url: 'http://localhost:3000/settings/billing?success=true',
      cancel_url: 'http://localhost:3000/settings/billing?success=false',

      line_items: [{ price: config.stripe.plans.pro.priceId, quantity: 1 }],
    })

    return {
      url: session.url,
    }
  } catch (err) {
    throw new Error('Error creating checkout session')
  }
}
