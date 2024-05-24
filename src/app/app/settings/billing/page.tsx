import { auth } from '@/services/auth'
import { getUserCurrentPlan } from '@/services/stripe'
import { Form } from './_components/form'

export default async function Page() {
  const session = await auth()

  const plan = await getUserCurrentPlan(session?.user.id as string)

  return <Form planUser={plan} />
}
