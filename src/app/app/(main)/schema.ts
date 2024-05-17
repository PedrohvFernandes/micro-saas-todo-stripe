import { z } from 'zod'

// Aqui vamos exportar um schema do zod

// Validamos um objeto com as seguintes propriedades
export const upsertTodoSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  doneAt: z.date().optional().nullable(),
})

// O infer é como se fosse um utilo que conferte o objeto em um tipo
export type upsertTodoSchema = z.infer<typeof upsertTodoSchema>

export const deleteTodoSchema = z.object({
  id: z.string(),
})

export type deleteTodoSchema = z.infer<typeof deleteTodoSchema>
