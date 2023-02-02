import theme from '@/theme'
import makeStyles from '@/utils/makeStyles'
import mergeProps from '@/utils/mergeProps'
import { css } from '@emotion/react'
import Link from 'next/link'
import { FC, HTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends HTMLAttributes<HTMLElement> {
  variant?: 'contained' | 'outlined'
  color?: 'primary' | 'primary-gradient'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  fullRounded?: boolean
  fullWidth?: boolean
  fontColor?: string
  type?: 'submit' | 'reset' | 'button'
  startIcon?: ReactNode
  href?: string
  disabled?: boolean
}

const Button: FC<ButtonProps> = (originalProps) => {
  const props = mergeProps(originalProps, {
    variant: 'contained',
    color: 'primary',
    size: 'sm',
    rounded: false,
    fullWidth: false,
    fullRounded: false,
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
    href,
    fullRounded,
    disabled,
    ...elemProps
  } = props

  const content = (
    <>
      {startIcon}
      <span style={{ marginLeft: startIcon ? 10 : 0 }}>{children}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} css={styles.root} {...elemProps}>
        {content}
      </Link>
    )
  }

  return (
    <button css={styles.root} {...elemProps} disabled={disabled}>
      {content}
    </button>
  )
}

const useButtonStyles = makeStyles(
  ({
    color,
    variant,
    size,
    rounded,
    fullRounded,
    fullWidth,
    fontColor,
  }: ButtonProps) => {
    const paddings = {
      sm: 9,
      md: 14,
      lg: 16,
    }

    const widths = {
      sm: 106,
      md: 126,
      lg: 146,
    }

    return {
      root: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: paddings[size!] - (variant === 'contained' ? 0 : 1) + 'px',
        minWidth: widths[size!],
        color: fontColor ? fontColor : '#000',
        fontFamily: theme.fonts.secondary,
        background:
          variant === 'contained' ? `var(--color-${color})` : 'transparent',
        border:
          variant === 'contained' ? 'none' : `1px solid var(--color-${color})`,
        borderRadius: fullRounded ? 99 : rounded ? 10 : 4,
        fontSize: 16,
        cursor: 'pointer',
        width: fullWidth ? '100%' : undefined,
        fontWeight: 400,
        textDecoration: 'none',
      },
    }
  }
)

export default Button
