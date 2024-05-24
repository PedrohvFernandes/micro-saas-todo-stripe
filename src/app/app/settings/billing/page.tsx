import { auth } from '@/services/auth'
import { getPlanByPrice } from '@/services/stripe'
import { Form } from './_components/form'

export default async function Page() {
  const session = await auth()

  const plan = getPlanByPrice(session?.user.stripePriceId as string)

  return <Form plan={plan} />
}
