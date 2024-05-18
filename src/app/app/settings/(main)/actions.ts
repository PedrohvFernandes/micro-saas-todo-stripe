// Toda vez que criar um arquivo de actions, lembre de colocar use server
'use server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { updateProfileSchema } from './scheema'

export async function updateProfile(input: updateProfileSchema) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'User not found',
      data: null,
    }
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: input.name,
    },
  })
}
