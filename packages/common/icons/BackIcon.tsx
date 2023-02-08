import { FC, SVGProps } from 'react'

export const BackIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      className="MuiSvgIcon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ChevronLeftIcon"
      {...props}
    >
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
    </svg>
  )
}
