'use client'
import {
  DashboardSidebarNav,
  DashboardSidebarMain,
  DashboardSidebarNavLink,
} from '@/components/dashboard/sidebar'
import { usePathname } from 'next/navigation'

export function SettingsSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <aside>
      <DashboardSidebarNav>
        <DashboardSidebarMain>
          <DashboardSidebarNavLink
            href="/app/settings"
            active={isActive('/app/settings')}
          >
            My profile
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/app/settings/theme"
            active={isActive('/app/settings/theme')}
          >
            Theme
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/app/settings/billing"
            active={isActive('/app/settings/billing')}
          >
            Billing
          </DashboardSidebarNavLink>
        </DashboardSidebarMain>
      </DashboardSidebarNav>
    </aside>
  )
}
