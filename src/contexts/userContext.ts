import { AuthUser } from '@/types/user'
import { createContext } from 'react'

export const userCtx = createContext<AuthUser | null>(null)

export const UserProvider = userCtx.Provider
