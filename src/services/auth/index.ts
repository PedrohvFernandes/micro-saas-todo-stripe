import NextAuth from 'next-auth'

import EmailProvider from 'next-auth/providers/email'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../database'

export const {
  // Pegamos esses handlers e passamos para api>auth>[...nextauth]>route.ts
  handlers: { GET, POST },
  auth,
} = NextAuth({
  // Dessa forma passamos as informaçõs do usuário para o banco de dados, usando o adapter do prisma e a conexão(prisma) com o banco de dados
  adapter: PrismaAdapter(prisma),
  // Aqui estamos passando o provider de email, github, google, etc
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  // [auth][error] MissingSecret: Please define a `secret`.. Read more at https://errors.authjs.dev#missingsecret
  secret: process.env.SECRET,
})
