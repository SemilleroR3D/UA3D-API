import { User } from '@prisma/client'
import { findUserByEmail, createUser, updateUser } from '../models/userModel'

export const findOrCreateUser = async (email: string, name: string, photo: string): Promise<User> => {
  const existingUser = await findUserByEmail(email)
  if (existingUser != null) {
    return await updateUser(email, name, photo)
  } else {
    return await createUser(email, name, photo)
  }
}
