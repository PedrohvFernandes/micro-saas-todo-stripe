import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'
import { TodoDataTable } from './_components/todo-data-table'
import { Button } from '@/components/ui/button'
import { TodoUpsertSheet } from './_components/todo-upsert-sheet'
import { PlusIcon } from '@radix-ui/react-icons'
import { getUserTodos } from './actions'

// Quando o componente é async, ele ja esta do lado do servidor, ou seja, o usuario so vai receber o html disso, não é o cliente, o browser do usuario que vai estar conectando com o banco de dados, mas o que ele esta recebendo é somente um HTML ja formatado e quem processa os dados é o servidor
export default async function Page() {
  // O pre é uma tag do html que serve para mostrar o conteúdo de uma forma mais bonita e organizada em JSON
  // return <pre>{JSON.stringify(session, null, 2)}</pre>

  // Uma das magicas do next 14. Como o componente é async, ele vai esperar a promise ser resolvida para renderizar o componente. Com isso, eu so chamo a função aqui diretamente, porque ele ja esta do lado do servidor
  const todos = await getUserTodos()

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Tarefas</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <TodoUpsertSheet>
            <Button variant="outline" size="sm">
              <PlusIcon className="size-4 mr-3" />
              Add todo
            </Button>
          </TodoUpsertSheet>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <TodoDataTable data={todos} />
      </DashboardPageMain>
    </DashboardPage>
  )
}
