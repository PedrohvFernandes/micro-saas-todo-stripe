import {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarMain,
  SidebarNav,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarNavMain,
  SidebarNavLink,
  SidebarFooter,
} from '@/components/dashboard/sidebar'
import { PropsWithChildren } from 'react'

// O layout é a onde ditamos como vai ser a casca da nossa pagina, como o header, footer, sidebar, etc.
// Aqui recebemos o filho do componente, que é o conteudo da pagina. Ou seja, tudo o que esta aqui dentro se propaga para os filhos. Por exemplo alem do header, poderiamos fazer cinco requisições e repassar o conteudo para os filhos sem precisar ficar fazendo requisições em todos os componentes. Ou seja, diminuimos a quantidade de codigo e de requisições entre as paginas
export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-4">
      {/* <Sidebar paths={[{ label: 'home', path: '/' }]} /> */}
      <Sidebar>
        <SidebarHeader>
          <SidebarHeaderTitle>Dashboard</SidebarHeaderTitle>
        </SidebarHeader>

        <SidebarMain>
          <SidebarNav>
            <SidebarNavMain>
              <SidebarNavLink href="/app">Tarefas</SidebarNavLink>
              <SidebarNavLink href="/app/settings">
                Configurações
              </SidebarNavLink>
            </SidebarNavMain>
          </SidebarNav>

          <SidebarNav>
            <SidebarNavHeader>
              <SidebarNavHeaderTitle>Links Extras</SidebarNavHeaderTitle>
            </SidebarNavHeader>
            <SidebarNavMain>
              <SidebarNavLink href="/">Precisa de ajuda ?</SidebarNavLink>
              <SidebarNavLink href="/">Site</SidebarNavLink>
            </SidebarNavMain>
          </SidebarNav>
        </SidebarMain>
        <SidebarFooter>
          <h1>User</h1>
        </SidebarFooter>
      </Sidebar>
      <main>{children}</main>
    </div>
  )
}
