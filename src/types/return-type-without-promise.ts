/* eslint-disable @typescript-eslint/no-explicit-any */

// Um helper
// Essa função pega um tipo de função e retorna o tipo de retorno dela sem a Promise, pegando a tipagem do retorno da função
export type ReturnTypeWithoutPromise<T extends (...args: any) => any> =
  T extends (...args: any) => Promise<infer U> ? U : never
