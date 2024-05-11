// Use client poque usamos o hook usePathname
'use client'

import {
  Sidebar,
  SidebarHeader,
  // SidebarHeaderTitle,
  SidebarMain,
  SidebarNav,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarNavMain,
  SidebarNavLink,
  SidebarFooter,
} from '@/components/dashboard/sidebar'
import { HomeIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
// Tem que ser o next/navigation do next, se for o do next/router vai ser o hook do antigo padrão pages do next e o navigation é do novo padrão App router
import {
  usePathname,
  // useRouter
} from 'next/navigation'
import { UserDropdown } from './user-dropdown'
import { Logo } from '@/components/logo'

export function MainSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    /* <Sidebar paths={[{ label: 'home', path: '/' }]} /> */
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      {/* 
        No lugar do flex-grow, poderia usar o flex-1
      */}
      <SidebarMain className="flex flex-col flex-grow">
        <SidebarNav>
          <SidebarNavMain>
            <SidebarNavLink href="/app" active={isActive('/app')}>
              <HomeIcon className="mr-3" />
              Tarefas
            </SidebarNavLink>
            <SidebarNavLink
              href="/app/settings"
              active={isActive('/app/settings')}
            >
              <MixerHorizontalIcon className="mr-3" />
              Configurações
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>

        <SidebarNav className="mt-auto">
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
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  )
}
