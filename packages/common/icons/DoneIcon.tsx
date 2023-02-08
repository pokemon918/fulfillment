import { FC, SVGProps } from 'react'

export const DoneIcon: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={'MuiSvgIcon ' + (className ?? '')}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
    </svg>
  )
}
