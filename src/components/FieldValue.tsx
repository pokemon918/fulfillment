import { FC, ReactNode } from 'react'
import { Control, useWatch } from 'react-hook-form'

const FieldValue: FC<{
  control: Control<any>
  name: string
  children: (value: any) => ReactNode
}> = ({ control, name, children }) => {
  const value = useWatch({ control, name })
  return <>{children(value)}</>
}

export default FieldValue
