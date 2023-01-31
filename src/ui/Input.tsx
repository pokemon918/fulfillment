import {
  CSSProperties,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from 'react'
import makeStyles from '@/utils/makeStyles'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import mergeProps from '@/utils/mergeProps'
import { Controller, Control } from 'react-hook-form'

type NativeInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

interface InputProps {
  className?: string
  style?: CSSProperties
  placeholder?: string
  type?: NativeInputProps['type']
  rows?: number
  label?: string
  startIcon?: ReactNode
  theme?: 'light' | 'dark'
  startSelect?: {
    name: string
    options: { name: string; value: string }[]
  }
  endSelect?: {
    name: string
    options: { name: string; value: string }[]
  }
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  multiline?: boolean
  required?: boolean
  name: string
  control?: Control<any>
  pattern?: string
  minLength?: number
  maxLength?: number
}

const Input: FC<InputProps> = (originalProps) => {
  const props = mergeProps(originalProps, {
    theme: 'light',
  })

  const styles = useStyles(props)
  const id = useId()

  const {
    label,
    className,
    style,
    type,
    startIcon,
    startSelect,
    endSelect,
    startAdornment,
    endAdornment,
    multiline,
    rows,
    theme,
    name,
    control,
    ...commonProps
  } = props

  let input: ReactNode

  if (multiline) {
    input = (
      <div css={styles.inputWrapper}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <textarea
              css={styles.input}
              {...commonProps}
              rows={rows}
              {...field}
            ></textarea>
          )}
        />
      </div>
    )
  } else if (type === 'tel') {
    input = (
      <div css={styles.telWrapper}>
        <Controller
          name={name}
          control={control}
          render={({ field: { ref, name, ...restProps } }) => (
            <PhoneInput
              inputProps={{ id, ...commonProps, name }}
              country="us"
              {...restProps}
            />
          )}
        />
      </div>
    )
  } else {
    const [startSelectNode, endSelectNode] = [
      startSelect ? { ...startSelect, css: styles.startAdornment } : undefined,
      endSelect ? { ...endSelect, css: styles.endAdornment } : undefined,
    ].map(
      (selectOptions) =>
        selectOptions && (
          <div css={selectOptions.css}>
            <Controller
              name={selectOptions.name}
              control={control}
              render={({ field }) => (
                <select css={styles.select} {...field}>
                  {selectOptions.options.map((option, idx) => (
                    <option
                      key={idx}
                      style={{ color: '#000' }}
                      value={option.value}
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        )
    )

    input = (
      <div css={styles.inputWrapper}>
        {startAdornment && (
          <div css={styles.startAdornment}>{startAdornment}</div>
        )}

        {startIcon && <div css={styles.iconWrapper}>{startIcon}</div>}

        {startSelectNode}

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={id}
              type={type}
              css={styles.input}
              {...commonProps}
              {...field}
            />
          )}
        />

        {endSelectNode}

        {endAdornment && <div css={styles.endAdornment}>{endAdornment}</div>}
      </div>
    )
  }

  return (
    <div css={styles.root} className={className} style={style}>
      {label && (
        <label htmlFor={id} css={styles.label}>
          {label}
        </label>
      )}

      {input}
    </div>
  )
}

const useStyles = makeStyles(({ theme, startSelect }: InputProps) => {
  const borderColor = theme === 'light' ? '#CACACA' : '#fff'
  const adornment = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#CACACA',
  }

  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      color: theme === 'light' ? '#000' : '#fff',
    },
    label: {
      fontSize: 14,
      marginBottom: 10,
    },
    inputWrapper: {
      border: `2px solid ${borderColor}`,
      borderRadius: 4,
      display: 'flex',
    },
    iconWrapper: {
      display: 'inline-flex',
      borderRight: `2px solid ${borderColor}`,
      padding: '0 9px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      border: 'none',
      width: '100%',
      fontFamily: 'inherit',
      padding: startSelect ? '11px 10px' : '11px 12px',
      color: 'inherit',
      background: 'transparent',
      resize: 'none',
      fontSize: 16,
      '::placeholder': {
        color: '#AEAEAE',
      },
    },
    telWrapper: {
      '> div > input': {
        fontSize: '16px !important',
        background: 'transparent !important',
        padding: '6px 12px 6px 48px !important',
        height: 'initial !important',
        width: '100% !important',
        border: `2px solid ${borderColor} !important`,
        borderRadius: '4px !important',
      },
      '> div > .flag-dropdown': {
        border: `2px solid ${borderColor} !important`,
        borderRadius: '3px 0 0 3px !important',
        borderRight: 'none !important',
        background: 'transparent !important',
        '> div': {
          background: 'transparent !important',
        },
      },
    },
    startAdornment: {
      ...adornment,
      paddingLeft: 10,
    },
    endAdornment: {
      ...adornment,
      paddingRight: 10,
    },
    select: {
      maxWidth: 82,
      background: 'transparent',
      color: 'inherit',
      border: 'none',
      '@media (max-width: 360px)': {
        maxWidth: 52,
      }
    },
    selectOption: {
      color: '#000',
    },
  }
})

export default Input
