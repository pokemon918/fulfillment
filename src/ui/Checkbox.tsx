import makeStyles from '@/utils/makeStyles'
import { DetailedHTMLProps, FC, InputHTMLAttributes, useId } from 'react'
import { Control, Controller } from 'react-hook-form'

type NativeInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export interface CheckboxProps extends NativeInputProps {
  label: string
  name: string
  control: Control<any>
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const styles = useStyles(props)

  const { className, style, label, name, control, ...inputProps } = props

  const id = useId()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onChange, value, ...field } }) => {
        return (
          <div css={styles.root} className={className} style={style}>
            <input
              css={styles.input}
              id={id}
              type="checkbox"
              onChange={onChange}
              checked={!!value}
              {...field}
              {...inputProps}
            />

            <label css={styles.label} htmlFor={id}>
              {label}
            </label>
          </div>
        )
      }}
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

export default Checkbox
