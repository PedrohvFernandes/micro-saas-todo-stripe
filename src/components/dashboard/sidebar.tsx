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

// <T = unknown>  --> Estamos dizendo que o tipo padrão é unknown, ou seja, se não passarmos nada ele vai ser unknown, dessa forma conseguimos passar qualquer tipo de propriedade para o componente, extender a tipagaem do componente
// Se colocar um any no lugar do unknown, ele vai aceitar qualquer coisa, mas o unknown é mais seguro, porque ele não aceita qualquer coisa, ele aceita qualquer coisa, mas ele não sabe o que é, então ele não deixa você fazer nada com ele, a não ser que você faça um cast
export type SidebarGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

// Com isso iremos usar o pattern composition

// Um componente que tem varios componentes dentro dele, ou seja, um componente que é composto por outros componentes
export function Sidebar({ children, className }: SidebarGenericProps) {
  // O cn nada mais é que um util que shadcnui da para nós e dentro dele usa o twMerge para fazer a junção das classes do tailwind com as classes que passamos. Ou seja, podemos mesclar dois classnames, o nosso classname do proprio componente e o classname que passamos como propriedade. Passamos isso em volta do cn, porque o tailwind so vai processar as classes no momento da build e quando utilizamos esse cn em volta, estamos dizendo para ele que essas classes são dinamicas e que ele deve processar no momento da execução, na hora de processar o componente
  return (
    <aside
      className={cn(
        `border-r border-border flex flex-col space-y-6 ${className}`,
      )}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ children, className }: SidebarGenericProps) {
  return (
    <header className={cn(`px-6 py-3 border-b border-border ${className}`)}>
      {children}
    </header>
  )
}

export function SidebarHeaderTitle({
  children,
  className,
}: SidebarGenericProps) {
  return <h2 className={cn(`${className}`)}>{children}</h2>
}

export function SidebarMain({ children, className }: SidebarGenericProps) {
  return <main className={cn(`px-3 ${className}`)}>{children}</main>
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
  return (
    <h4
      className={cn(
        `text-sx uppercase text-muted-foreground ml-3 ${className}`,
      )}
    >
      {children}
    </h4>
  )
}

export function SidebarNavMain({ children, className }: SidebarGenericProps) {
  return <main className={cn(`flex flex-col  ${className}`)}>{children}</main>
}

type SidebarNavLinkProps = {
  href: string
  active?: boolean
} & SidebarGenericProps

// Pode juntar o type dessa maneira também: passando como um generic
// export function SidebarNavLink({
//   children,
//   className,
//   href,
// }: SidebarGenericProps<SidebarNavLinkProps>) {
export function SidebarNavLink({
  children,
  className,
  href,
  active,
}: SidebarNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        `flex items-center text-xs px-3 py-2 rounded-md ${active && 'bg-secondary'}  ${className}`,
      )}
    >
      {children}
    </Link>
  )
}

export function SidebarFooter({ children, className }: SidebarGenericProps) {
  return (
    <footer className={cn(`p-6 mt-auto border-t border-border ${className}`)}>
      {children}
    </footer>
  )
}