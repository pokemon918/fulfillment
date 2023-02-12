import { FC, SVGProps } from 'react'

export const PlayIcon: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={'MuiSvgIcon ' + (className ?? '')}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="PlayArrowIcon"
      {...props}
    >
      <path d="M8 5v14l11-7z"></path>
    </svg>
  )
}
