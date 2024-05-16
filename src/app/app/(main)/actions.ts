// Esse é o famoso multitenancy, onde cada usuário tem sua própria lista de tarefas. Aqui vamos pegar as tarefas do usuário logado no sistema

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

// Aqui vamos ver qual que é o usuário que esta logado no sistema e retornamos as tarefas dele
export async function getUserTodos() {
  const session = await auth()

  // Eu pego todas as teferas do usuário que esta logado, através do id dele
  const todos = await prisma.todo.findMany({
    where: {
      userId: session?.user?.id,
    },
  })
  return todos
}
