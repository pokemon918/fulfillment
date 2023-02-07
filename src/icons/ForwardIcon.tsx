import { FC, SVGProps } from 'react'

const ForwardIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      className="MuiSvgIcon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ArrowForwardIcon"
      {...props}
    >
      <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
    </svg>
  )
}

export default ForwardIcon
