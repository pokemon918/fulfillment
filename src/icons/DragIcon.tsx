import { FC, SVGProps } from 'react'

const DeleteIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
  return (
    <svg
      className={'MuiSvgIcon ' + (className ?? '')}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path>
    </svg>
  )
}

export default DeleteIcon
