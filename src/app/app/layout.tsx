import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'

// O layout é a onde ditamos como vai ser a casca da nossa pagina, como o header, footer, sidebar, etc.
// Aqui recebemos o filho do componente, que é o conteudo da pagina. Ou seja, tudo o que esta aqui dentro se propaga para os filhos. Por exemplo alem do header, poderiamos fazer cinco requisições e repassar o conteudo para os filhos sem precisar ficar fazendo requisições em todos os componentes. Ou seja, diminuimos a quantidade de codigo e de requisições entre as paginas
export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[16rem_1fr]">
      <MainSidebar />
      <main>{children}</main>
    </div>
  )
}
