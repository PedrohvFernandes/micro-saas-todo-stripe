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

// Função que atualiza o status do plano do usuario no nosso bd. Ele recebe o objeto do webhook do stripe
export const handleProcessWebhookUpdatedSubscription = async (event: {
  object: Stripe.Subscription
}) => {
  const stripeCustomerId = event.object.customer as string
  const stripeSubscriptionId = event.object.id
  const stripeSubscriptionStatus = event.object.status
  // Pegamos o id que mandamos na hora do checkout quando o usuario quis mudar de plano
  const stripePriceId = event.object.items.data[0].price.id

  // Verifica se o usuario existe no nosso bd, mas agora pelo stripeCustomerId ou stripeSubscriptionId, porque agora o usuario ja tem um stripeCustomerId, ou seja, um plano, logo o usuario no nosso bd ja tem um id do stripe. FindFirst primeiro usuario que encontrar
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          stripeCustomerId,
        },
        {
          stripeSubscriptionId,
        },
      ],
    },
    select: {
      id: true,
    },
  })

  if (!userExists) {
    throw new Error('user of stripeCustomerId not found')
  }

  // Atualiza o stripeSubscriptionStatus e stripePriceId do usuario no nosso bd, o status do plano do usuario
  await prisma.user.update({
    where: {
      id: userExists.id,
    },
    data: {
      stripeCustomerId,
      stripeSubscriptionId,
      stripeSubscriptionStatus,
      stripePriceId,
    },
  })
}

type Plan = {
  priceId: string
  quota: {
    TASKS: number
  }
}

type Plans = {
  [key: string]: Plan
}

type PlanReturn = {
  name: string | number | undefined
  quota: {
    TASKS: number
  }
}

export const getPlanByPrice = (priceId: string): PlanReturn => {
  const plans: Plans = config.stripe.plans as Plans

  // O plankKey é o nome do plano, free ou pro. Ex: free: { priceId: process.env.STRIPE_FREE_PLAN_ID, quota: { TASKS: 5 } }. a key(chave) free vai servir como nome. So pegamos se o priceId for igual ao priceId que passamos
  const planKey = Object.keys(plans).find(
    (key) => plans[key].priceId === priceId,
  ) as keyof Plans | undefined

  // Dentro do objeto plans, pegamos o plano que tem a chave igual ao planKey
  const plan = planKey ? plans[planKey] : null

  if (!plan) {
    throw new Error(`Plan not found for priceId: ${priceId}`)
  }

  return {
    name: planKey,
    quota: plan.quota,
  }
}

export type UserCurrentPlanReturn = {
  name: string | number | undefined
  quota: {
    TASKS: {
      available: number
      current: number
      usage: number
    }
  }
}

export const getUserCurrentPlan = async (
  userId: string,
): Promise<UserCurrentPlanReturn> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripePriceId: true,
    },
  })

  // Vemos se o usuario e o stripePriceId existem
  if (!user || !user.stripePriceId) {
    throw new Error('User not found or user has no stripePriceId')
  }

  const plan = getPlanByPrice(user.stripePriceId)

  const tasksCount = await prisma.todo.count({
    where: {
      userId,
    },
  })

  // Ele ve quantas tasks tem de acordo com aquele plano do arquivo de config
  const availableTasks = plan.quota.TASKS
  // Quantas taks o usuario tem
  const currentTasks = tasksCount
  // A porcentagem de uso de tasks
  const usageTasks = (currentTasks / availableTasks) * 100

  return {
    name: plan.name,
    quota: {
      TASKS: {
        available: availableTasks,
        current: currentTasks,
        usage: usageTasks, // percentage
      },
    },
  }
}
