'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { createCheckoutSessionAction } from './actions'
import { useTransition } from 'react'

export default function Page() {
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
            Você está atualmente no [current_plan]. Ciclo de faturamente atual:
            [next_due_date]
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <header className=" flex items-center justify-between">
              <span className="text-muted-foreground text-sm">1/5</span>
              <span className="text-muted-foreground text-sm">20%</span>
            </header>
            <main>
              <Progress value={20} max={100}></Progress>
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
