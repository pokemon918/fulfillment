import { makeStyles } from '../utils'
import { DetailedHTMLProps, FC, InputHTMLAttributes, useId } from 'react'
import { Control, Controller } from 'react-hook-form'

type NativeInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export interface RadioProps extends NativeInputProps {
  label: string
  name: string
  control: Control<any>
}

export const Radio: FC<RadioProps> = (props) => {
  const styles = useStyles(props)

  const {
    className,
    style,
    label,
    name,
    control,
    onChange: onChangeProp,
    value,
    ...inputProps
  } = props

  const id = useId()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onChange, value: curValue, ...field } }) => (
        <div css={styles.root} className={className} style={style}>
          <input
            css={styles.input}
            id={id}
            type="radio"
            onChange={(e) => {
              onChange(e)
              if (onChangeProp) onChangeProp(e)
            }}
            value={value}
            checked={curValue === value}
            {...field}
            {...inputProps}
          />

          <label css={styles.label} htmlFor={id}>
            {label}
          </label>
        </div>
      )}
    />
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'inline-flex',
  },
  input: {
    cursor: 'pointer',
    marginRight: 8,
  },
  label: {
    cursor: 'pointer',
  },
}))
