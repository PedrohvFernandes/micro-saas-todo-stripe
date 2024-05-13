import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'

export default async function Page() {
  // O pre é uma tag do html que serve para mostrar o conteúdo de uma forma mais bonita e organizada em JSON
  // return <pre>{JSON.stringify(session, null, 2)}</pre>
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Tarefas</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <h1>Tarefas</h1>
      </DashboardPageMain>
    </DashboardPage>
  )
}
