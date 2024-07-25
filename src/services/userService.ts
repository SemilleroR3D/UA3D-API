import { User } from '@prisma/client'
import { findOrCreateUser } from '../models/userModel'

export const createOrUpdateUser = async (user: any): Promise<User> => {
  return await findOrCreateUser(user)
}
