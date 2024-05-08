import { auth } from '@/services/auth'
import { UserInfo } from './_components/user-info'

export default async function Page() {
  // Pegamos a sessão do usuário pelo next-auth. Conseguimos pegar o usuário logado e suas informações
  const session = await auth()

  // O pre é uma tag do html que serve para mostrar o conteúdo de uma forma mais bonita e organizada em JSON
  // return <pre>{JSON.stringify(session, null, 2)}</pre>
  return (
    // Juntando use server com use client(ex: UserInfo)
    <main className="flex items-center justify-center h-screen">
      <UserInfo user={session?.user} />
    </main>
  )
}
