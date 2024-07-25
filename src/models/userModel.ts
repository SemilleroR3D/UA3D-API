import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export const findOrCreateUser = async (user: any): Promise<User> => {
  return await prisma.user.upsert({
    where: { email: user.mail },
    update: {
      name: user.displayName,
      photo: user.photo
    },
    create: {
      email: user.mail,
      name: user.displayName,
      photo: user.photo
    }
  })
}
