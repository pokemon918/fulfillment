import { AuthUser } from '../types'
import { createContext } from 'react'

export const userCtx = createContext<AuthUser | null | undefined>(null)

export const UserProvider = userCtx.Provider
