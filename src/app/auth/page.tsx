import { AuthForm } from './_components/auth-form'

// Pagina da autenticação
// As pages tem que ficar como default para o Next.js conseguir achar
// Essa page ele ja reconhece como /auth. https://kinsta.com/pt/base-de-conhecimento/next-js/#:~:text=Roteamento,em%20uma%20rota%20no%20Next.
export default function Page() {
  return <AuthForm />
}
