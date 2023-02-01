import { BasicUser } from '@/types/user'
import { createContext } from 'react'

export const userCtx = createContext<BasicUser | null>(null)

export const UserProvider = userCtx.Provider
