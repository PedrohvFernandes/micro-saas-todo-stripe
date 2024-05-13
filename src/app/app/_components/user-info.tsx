// Como estou usando o signOut que é uma função JS então usamos o use client, por estar do lado client
'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

type Props = {
  user: Session['user']
}

export async function UserInfo({ user }: Readonly<Props>) {
  if (!user) return
  // if (!user.email) return console.error('User email not found')

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Avatar>
        <AvatarFallback className="uppercase">
          {user.email ?? ''}
        </AvatarFallback>
      </Avatar>
      <span>{user.email}</span>
      {/* 
        Se eu usar o signout do next-auth direto aqui vai dar problema, porque isso é uma funcionalidade JS, então eu preciso estar do lado do cliente, por isso colocamos ele dentro de um use client

        Ao clicar em signout ele ja me envia para o auth, como definimos em service>auth
      */}
      <Button variant={'outline'} onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  )
}
