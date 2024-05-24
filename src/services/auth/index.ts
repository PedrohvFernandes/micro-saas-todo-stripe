import NextAuth from 'next-auth'

import EmailProvider from 'next-auth/providers/nodemailer'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../database'
import { createStripeCustomer } from '../stripe'

export const {
  // Pegamos esses handlers e passamos para api>auth>[...nextauth]>route.ts
  handlers: { GET, POST },
  auth,
} = NextAuth({
  // Aqui passamos todas as paginas de autenticação, como login, logout...
  // Se não passarmos essas paginas o next-auth vai usar as paginas padrões dele, como por exemplo após dar o send magic link se der erro vai para http://localhost:3000/api/auth/error, se der certo vai para http://localhost:3000/api/auth/verify-request
  pages: {
    // Logar
    signIn: '/auth',
    // Deslogar
    signOut: '/auth',
    error: '/auth',
    // Aqui é pra tela de login quando enviamos para o magic link a onde ele vai ser redirecionado
    verifyRequest: '/auth',
    // Aqui pra onde o usuário vai ser redirecionado após fazer o cadastro
    newUser: '/app',
  },
  // Dessa forma passamos as informaçõs do usuário para o banco de dados, usando o adapter do prisma e a conexão(prisma) com o banco de dados. Quando o usuario clica no magic link enviamos o token para o banco de dados, depois que o usuario clica em login no email, ele vai para o /app e os dados do usuário são pegos do banco de dados junto com sua sessão
  adapter: PrismaAdapter(prisma),
  // Aqui estamos passando o provider de email, github, google, etc
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  events: {
    // Quando o usuário é criado na nossa aplicação pro bd e  criamos um customer no stripe
    createUser: async (message) => {
      await createStripeCustomer({
        email: message.user.email as string,
        name: message.user.name as string,
      })
    },
  },
  secret: process.env.SECRET,
})
