'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { updateProfile } from '../actions'
import { updateProfileSchema } from '../scheema'
import { toast } from '@/components/ui/use-toast'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { SheetFooter } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type ProfileFormProps = {
  defaultValues: Session['user']
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const router = useRouter()

  // Se passamos a tipagem updateProfileSchema pelo <> --> Generics, ele tipa todo o form, seja o data do react-hook-form quanto o componente Form, FormField... do shadcnUi, logo ele reconhece todos os campos do nosso schema, ou seja, o FormField é 100% type safe, Form do shadcnUi é type safe.
  const form = useForm<updateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    // O defaultValues ja faz com que os campos sejam preenchidos com os valores do usuário logado
    defaultValues: {
      name: defaultValues?.name ?? '',
      email: defaultValues?.email ?? '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await updateProfile(data)

    router.refresh()

    toast({
      title: `${data.name} atualizado com sucesso!`,
      description: 'Seu perfil foi atualizado com sucesso!',
      duration: 5000,
      variant: 'success',
    })
  })
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Nome</CardTitle>
            <CardDescription>
              Este será o nome exibido publicamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              Por favor contate o suporte por email contact@micro-saas.com para
              alterar seu email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite your email"
                      readOnly
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <SheetFooter className="mt-auto">
          <Button type="submit" disabled={form.formState.isLoading}>
            {/* {form.formState.isLoading ? 'Saving...' : 'Save changes'} */}
            {form.formState.isSubmitting && 'Salvando...'}
            {!form.formState.isSubmitting && 'Salvar alterações'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}
