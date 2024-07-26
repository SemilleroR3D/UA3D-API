import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email }
  })
}

export const createUser = async (email: string, name: string, photo: string): Promise<User> => {
  return await prisma.user.create({
    data: {
      email,
      name,
      photo
    }
  })
}

export const updateUser = async (email: string, name: string, photo: string): Promise<User> => {
  return await prisma.user.update({
    where: { email },
    data: {
      name,
      photo
    }
  })
}
