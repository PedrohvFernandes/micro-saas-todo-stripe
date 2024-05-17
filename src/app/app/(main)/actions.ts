'use server'

// Esse é o famoso multitenancy, onde cada usuário tem sua própria lista de tarefas. Aqui vamos pegar as tarefas do usuário logado no sistema. Se criar de outro usuario não aparece para outro usuario

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { upsertTodoSchema } from './schema'

// Aqui vamos ver qual que é o usuário que esta logado no sistema e retornamos as tarefas dele
export async function getUserTodos() {
  const session = await auth()

  // Eu pego todas as teferas do usuário que esta logado, através do id dele
  const todos = await prisma.todo.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return todos
}

export async function upsertTodo(input: upsertTodoSchema) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'User not found',
      data: null,
    }
  }

  // Se o input tiver um id e o usuario for dono desse todo, eu vou atualizar a tarefa, se não, eu vou criar uma nova
  if (input.id) {
    const todo = await prisma.todo.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      // Pra otimizar a query, eu trago so o ID
      select: {
        id: true,
      },
    })

    if (!todo) {
      return {
        error: 'Todo not found',
        data: null,
      }
    }

    const updateTodo = await prisma.todo.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        title: input.title,
        doneAt: input.doneAt,
      },
    })

    return {
      error: null,
      data: updateTodo,
    }
  }

  if (!input.title) {
    return {
      error: 'Title is required',
      data: null,
    }
  }

  const todo = await prisma.todo.create({
    data: {
      title: input.title,
      userId: session?.user?.id,
    },
  })
  return todo
}
