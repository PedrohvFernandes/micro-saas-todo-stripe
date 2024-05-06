// Error: (0 , react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useForm) is not a function. Como estamos usando um estado,hooks  no caso o useForm do react-hook-form, precisamos dizer para o next que esse component em si é um componente de cliente, e não de servidor. https://github.com/vercel/next.js/discussions/59483
'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'

// Componente criado no V0
export function AuthForm() {
  const form = useForm()

  // Através dessa função pegamos os dados do formulário
  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <main
      key="1"
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950"
    >
      <div className="mx-auto w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email and well send you a magic link to sign in.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              required
              type="email"
              // Aqui estamos passando o register do react-hook-form para o input
              {...form.register('email', { required: true })}
            />
          </div>
          <Button className="w-full" type="submit">
            Send magic link
          </Button>
        </form>
      </div>
    </main>
  )
}