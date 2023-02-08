import { FC, SVGProps } from 'react'

export const ArrowBackIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      className="MuiSvgIcon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ArrowBackIcon"
      {...props}
    >
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
    </svg>
  )
}
