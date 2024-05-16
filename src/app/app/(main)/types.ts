import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'
import { getUserTodos } from './actions'

// Type manual
// export type Todo = {
//   id: string
//   title: string
//   createdAt: Date
//   updatedAt: Date
//   finishedAt?: Date
// }

// Type de forma automatica, dessa forma eu não preciso me preocupar em manter o tipo Todo atualizado toda vez que mudar no model do prisma
// Passando o [0] eu pego o tipo do retorno da função getUserTodos, que é um array de Todo, dessa forma eu so retorno o tipo Todo e não o array {}[] e sim {}
// se não me engano dá pra fazer a mesma coisa usando typescript nativo mesmo com export  type SeuType = Awaited<ReturnType<typeof suaPromisseAqui>>
export type Todo = ReturnTypeWithoutPromise<typeof getUserTodos>[0]
