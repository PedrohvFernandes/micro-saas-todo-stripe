// Como estou usando por exemplo o signOut que é uma função JS então usamos o use client, por estar do lado client
'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ExitIcon,
  MixerHorizontalIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

type UserDropdownProps = {
  user: Session['user']
}

export function UserDropdown({ user }: UserDropdownProps) {
  if (!user) return
  // if (!user.email) return console.error('User email not found')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="relative h-8 flex items-center justify-between w-full space-x-2 !px-0 ring-0 focus-visible:ring-0"
        >
          <Avatar className="size-8">
            <AvatarImage src={user.image as string} alt={user.name as string} />
            {user.email && (
              <AvatarFallback className="uppercase">
                {user.email[0]}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col flex-1 space-y-1 text-left">
            {user.name && (
              <p className="text-sm font-medium leading-none">{user.name}</p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <MixerHorizontalIcon className="size-3 mr-3" />
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RocketIcon className="size-3 mr-3" />
            Upgrade
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* 
          Se eu usar o signout do next-auth direto aqui vai dar problema, porque isso é uma funcionalidade JS, então eu preciso estar do lado do cliente, por isso colocamos ele dentro de um use client

          Ao clicar em signout ele ja me envia para o auth, como definimos em service>auth
       */}
        <DropdownMenuItem onClick={() => signOut()}>
          <ExitIcon className="size-3 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
