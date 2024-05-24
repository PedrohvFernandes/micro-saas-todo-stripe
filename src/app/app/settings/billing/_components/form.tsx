'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTransition } from 'react'
import { createCheckoutSessionAction } from '../actions'
import { Button } from '@/components/ui/button'
import { UserCurrentPlanReturn } from '@/services/stripe'
import { Progress } from '@/components/ui/progress'

type FormData = {
  planUser: UserCurrentPlanReturn
}

export function Form({ planUser }: FormData) {
  // Como colocar loading em um botão que faz uma ação do lado do servidor https://github.com/vercel/next.js/discussions/51371
  const [isPending, startTransition] = useTransition()

  // const onSubmit = async (formData: FormData) => {
  const onSubmit = async () => {
    startTransition(() => {
      // Coloque a action aqui
      createCheckoutSessionAction()
    })
  }
  return (
    // Actions  https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
    // Isso ira chamar nossa action do lado do servidor
    <form action={onSubmit}>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Uso do plano</CardTitle>
          <CardDescription>
            Você está atualmente no{' '}
            <span className="font-bold uppercase">{planUser.name}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <header className=" flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                {planUser.quota.TASKS.current}/{planUser.quota.TASKS.available}
              </span>
              <span className="text-muted-foreground text-sm">
                {planUser.quota.TASKS.usage}%
              </span>
            </header>
            <main>
              <Progress
                value={planUser.quota.TASKS.current}
                // max={planUser.quota.TASKS.available}
              />
            </main>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-border pt-6">
          <span>Para um maior limite, assine o PRO</span>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Aguarde...' : ' Assine por R$9/ mês'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
