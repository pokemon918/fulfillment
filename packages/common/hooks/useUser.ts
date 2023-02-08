import { userCtx } from '../contexts'
import { useContext } from 'react'

export const useUser = () => useContext(userCtx)
