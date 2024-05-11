/* // Dessa maneira teriamos que trabalhar muito com a parte de props, deixando o codigo mais verboso, mais dificil de entender e menos reutilizavel, logo iria deixar um compononente que não atenderia a necessidade de reutilização para todos os requisitos
type SidebarProps = {
  paths: Array<{
    label: string
    path: string
  }>
}

export function Sidebar({ paths }: SidebarProps) {
  return (
    <aside className="border-r border-border">
      <nav>
        {paths.map((path) => (
          <a
            key={path.path}
            href={path.path}
            className="block p-4 hover:bg-gray-100"
          >
            {path.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}
*/

import { cn } from '@/lib/utils'
import Link from 'next/link'

// <T = any>  --> Estamos dizendo que o tipo padrão é any, ou seja, se não passarmos nada ele vai ser any, dessa forma conseguimos passar qualquer tipo de propriedade para o componente, extender a tipagaem do componente
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SidebarGenericProps<T = any> = {
  children: React.ReactNode
  className?: string
} & T

// Com isso iremos usar o pattern composition

// Um componente que tem varios componentes dentro dele, ou seja, um componente que é composto por outros componentes
export function Sidebar({ children, className }: SidebarGenericProps) {
  // O cn nada mais é que um util que shadcnui da para nós e dentro dele usa o twMerge para fazer a junção das classes do tailwind com as classes que passamos. Ou seja, podemos mesclar dois classnames, o nosso classname do proprio componente e o classname que passamos como propriedade. Passamos isso em volta do cn, porque o tailwind so vai processar as classes no momento da build e quando utilizamos esse cn em volta, estamos dizendo para ele que essas classes são dinamicas e que ele deve processar no momento da execução, na hora de processar o componente
  return <aside className={cn(`${className}`)}>{children}</aside>
}

export function SidebarHeader({ children, className }: SidebarGenericProps) {
  return <header className={cn(`${className}`)}>{children}</header>
}

export function SidebarHeaderTitle({
  children,
  className,
}: SidebarGenericProps) {
  return <h2 className={cn(`${className}`)}>{children}</h2>
}

export function SidebarMain({ children, className }: SidebarGenericProps) {
  return <main className={cn(`${className}`)}>{children}</main>
}

export function SidebarNav({ children, className }: SidebarGenericProps) {
  return <nav className={cn(`${className}`)}>{children}</nav>
}

export function SidebarNavHeader({ children, className }: SidebarGenericProps) {
  return <header className={cn(`${className}`)}>{children}</header>
}

export function SidebarNavHeaderTitle({
  children,
  className,
}: SidebarGenericProps) {
  return <h4 className={cn(`${className}`)}>{children}</h4>
}

export function SidebarNavMain({ children, className }: SidebarGenericProps) {
  return <main className={cn(`${className}`)}>{children}</main>
}

type SidebarNavLinkProps = {
  href: string
}

// Pode juntar o type dessa maneira também: passando como um generic
export function SidebarNavLink({
  children,
  className,
  href,
}: SidebarGenericProps<SidebarNavLinkProps>) {
  return (
    <Link href={href} className={cn(`${className}`)}>
      {children}
    </Link>
  )
}

export function SidebarFooter({ children, className }: SidebarGenericProps) {
  return <footer className={cn(`${className}`)}>{children}</footer>
}
