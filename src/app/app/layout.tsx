import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'
import { auth } from '@/services/auth'

// O layout é a onde ditamos como vai ser a casca da nossa pagina, como o header, footer, sidebar, etc.
// Aqui recebemos o filho do componente, que é o conteudo da pagina. Ou seja, tudo o que esta aqui dentro se propaga para os filhos. Por exemplo alem do header, poderiamos fazer cinco requisições e repassar o conteudo para os filhos sem precisar ficar fazendo requisições em todos os componentes. Ou seja, diminuimos a quantidade de codigo e de requisições entre as paginas
export default async function Layout({ children }: PropsWithChildren) {
  // Pegamos a sessão do usuário pelo next-auth. Conseguimos pegar o usuário logado e suas informações
  const session = await auth()
  return (
    <div className="grid grid-cols-[16rem_1fr]">
      {/* Juntando use server com use client(ex: UserInfo) */}
      <MainSidebar user={session?.user} />
      <main>{children}</main>
    </div>
  )
}
