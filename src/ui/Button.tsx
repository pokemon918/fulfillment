import theme from '@/theme'
import makeStyles from '@/utils/makeStyles'
import mergeProps from '@/utils/mergeProps'
import { css } from '@emotion/react'
import { FC, HTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined'
  color?: 'primary' | 'primary-gradient'
  size?: 'sm' | 'lg'
  rounded?: boolean
  fullWidth?: boolean
  fontColor?: string
  type?: 'submit' | 'reset' | 'button'
  startIcon?: ReactNode
}

const Button: FC<ButtonProps> = (originalProps) => {
  const props = mergeProps(originalProps, {
    variant: 'contained',
    color: 'primary',
    size: 'sm',
    rounded: false,
    fullWidth: false,
  })

  const styles = useButtonStyles(props)

  const {
    children,
    variant,
    color,
    size,
    rounded,
    fullWidth,
    fontColor,
    startIcon,
    ...btnProps
  } = props

  return (
    <button css={styles.root} {...btnProps}>
      {startIcon}
      <span style={{ marginLeft: startIcon ? 10 : 0 }}>{children}</span>
    </button>
  )
}

const useButtonStyles = makeStyles(
  ({ color, variant, size, rounded, fullWidth, fontColor }: ButtonProps) => {
    return {
      root: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding:
          (size == 'sm' ? 9 : 16) - (variant === 'contained' ? 0 : 1) + 'px',
        minWidth: 146,
        color: fontColor ? fontColor : '#000',
        fontFamily: theme.fonts.secondary,
        background:
          variant === 'contained' ? `var(--color-${color})` : 'transparent',
        border:
          variant === 'contained' ? 'none' : `1px solid var(--color-${color})`,
        borderRadius: rounded ? 10 : 4,
        fontSize: 16,
        cursor: 'pointer',
        width: fullWidth ? '100%' : undefined,
        fontWeight: 400,
      },
    }
  }
)

export default Button
