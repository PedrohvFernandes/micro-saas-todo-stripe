import { config } from '@/config'
import Stripe from 'stripe'
import { prisma } from '../database'

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

  // Se não tiver o customer no stripe criamos um novo ja com a assinatura free
  const createCustomer = await stripe.customers.create({
    email: input.email,
    name: input.name,
  })

  const createdCustomerSubscription = await stripe.subscriptions.create({
    customer: createCustomer.id,
    items: [{ price: config.stripe.plans.free.priceId }],
  })

  await prisma.user.update({
    where: { email: input.email },
    data: {
      stripeCustomerId: createCustomer.id,
      stripeSubscriptionId: createdCustomerSubscription.id,
      stripeSubscriptionStatus: createdCustomerSubscription.status,
      stripePriceId: config.stripe.plans.free.priceId,
    },
  })

  return createCustomer
}

export const createCheckoutSession = async (
  userId: string,
  userEmail: string,
  userStripeSubscriptionId: string,
) => {
  try {
    // Criamos ou pegamos o cliente no stripe
    const customer = await createStripeCustomer({
      email: userEmail,
    })

    // Aqui criava uma nova sessão de checkout do plano free, mas como agora o usuario ja vem com o plano free apos criar a conta, não precisamos mais disso, e sim de uma sessão de billing portal
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],

    //   mode: 'subscription',

    //   client_reference_id: userId,
    //   customer: customer.id,

    //   success_url: 'http://localhost:3000/app/settings/billing?success=true',
    //   cancel_url: 'http://localhost:3000/app/settings/billing?success=false',

    //   line_items: [{ price: config.stripe.plans.pro.priceId, quantity: 1 }],
    // })

    // Essa função lista todos os itens da  assinatura do client
    const subscription = await stripe.subscriptionItems.list({
      subscription: userStripeSubscriptionId,
      // Eu so quero um item dessa lista, que é o plano atual do usuario
      limit: 1,
    })

    // Agora invés de criar uma nova sessão de checkout, vamos criar uma sessão de portal de billing para o cliente atualizar o plano
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      // O retorno do portal de billing
      return_url: 'http://localhost:3000/app/settings/billing',
      flow_data: {
        // O tipo de sessão é de atualização de assinatura
        type: 'subscription_update_confirm',
        // quando completar a atualização, redireciona para a pagina de billing
        after_completion: {
          type: 'redirect',
          redirect: {
            return_url: `http://localhost:3000/app/settings/billing?success=true`,
          },
        },
        // Quando for confirmado
        subscription_update_confirm: {
          // Passamos a assinatura atual do usuario
          subscription: userStripeSubscriptionId,
          // Depois eu passo para qual plano eu quero atualizar
          items: [
            {
              // O id do item da assinatura atual
              id: subscription.data[0].id,
              price: config.stripe.plans.pro.priceId,
              quantity: 1,
            },
          ],
        },
      },
    })

    return {
      url: session.url,
    }
  } catch (err) {
    console.error(err)
    throw new Error('Error creating checkout session')
  }
}
