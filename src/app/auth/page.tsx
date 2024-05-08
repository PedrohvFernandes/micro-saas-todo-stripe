import { AuthForm } from './_components/auth-form'

// Pagina da autenticação
// As pages tem que ficar como default para o Next.js conseguir achar
// Essa page ele ja faz parte da rota /auth, o proprio caminho de pastas ja fine a rota, por conta do App router que o next tem, isso tanto para front(Como se fosse o react-router-dom), quanto para back(Api). https://kinsta.com/pt/base-de-conhecimento/next-js/#:~:text=Roteamento,em%20uma%20rota%20no%20Next.
export default async function Page() {
  // Poderiamos até fazer a verificação se o usuário esta logado, mas teriamos que fazer isso de tela em tela. Com isso, iremos fazer um middleware para verificar se o usuário esta logado ou não
  // const session = await auth()
  // if (session?.user) return redirect('/app')

  return <AuthForm />
}
