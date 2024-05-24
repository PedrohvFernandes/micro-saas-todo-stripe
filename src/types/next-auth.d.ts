// Dessa maneira sobrescrevemos a tipagem do user da sessão do next-auth

import { User } from '@prisma/client'

// https://medium.com/@erick.ishimine/como-usar-os-tipos-utilitários-pick-omit-partial-erequired-do-typescript-1000ad232bf8
declare module 'next-auth' {
  // interface Session {
  //   user: Omit<User> & {
  //     id: string
  //     email: string | null
  //     name: string | null
  //     username: string | null
  //     image: string | null
  //     emailVerified: Date | null
  //     settings: ParseUserSettings
  //     tenants: UserTenant[]
  //   }
  // }
  interface Session {
    // Usamos o User do prisma client, porque ele ja contem por exemplo o ID do stripe
    user: User
  }
}
