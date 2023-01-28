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
    defaultValue?: string
    options: { name: string; value: string }[]
  }
  endSelect?: {
    defaultValue?: string
    options: { name: string; value: string }[]
  }
  endAdornment?: ReactNode
  multiline?: boolean
  required?: boolean
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
    endAdornment,
    multiline,
    rows,
    theme,
    ...commonProps
  } = props


  let input: ReactNode

  if (multiline) {
    input = (
      <div css={styles.inputWrapper}>
        <textarea css={styles.input} {...commonProps}  rows={rows}></textarea>
      </div>
    )
  } else if (type === 'tel') {
    input = (
      <div css={styles.telWrapper}>
        <PhoneInput inputProps={{ id, ...commonProps }} country="us" />
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
            <select
              css={styles.select}
              defaultValue={selectOptions.defaultValue}
            >
              {selectOptions.options.map((option, idx) => (
                <option
                  key={idx}
                  css={styles.selectOption}
                  value={option.value}
                >
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )
    )

    input = (
      <div css={styles.inputWrapper}>
        {startIcon && <div css={styles.iconWrapper}>{startIcon}</div>}

        {startSelectNode}

        <input id={id} type={type} css={styles.input} {...commonProps} />

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
    color: theme === 'light' ? '#000' : '#f3f3f3',
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
      padding: startSelect ? '12px 10px' : 12,
      color: 'inherit',
      background: 'transparent',
      resize: 'none',
      '::placeholder': {
        color: '#AEAEAE',
      },
    },
    telWrapper: {
      '> div > input': {
        background: 'transparent !important',
        padding: '8px 12px 8px 48px !important',
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
    },
    selectOption: {
      color: '#000',
    },
  }
})

export default Input
