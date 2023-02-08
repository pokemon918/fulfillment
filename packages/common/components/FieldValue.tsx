import { FC, ReactNode } from 'react'
import { Control, useWatch } from 'react-hook-form'

export const FieldValue: FC<{
  control: Control<any>
  name: string
  children: (value: any) => ReactNode
}> = ({ control, name, children }) => {
  const value = useWatch({ control, name })
  return <>{children(value)}</>
}
