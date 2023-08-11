import { FC, SVGProps } from 'react'

export const ArrowLeft: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="22"
      height="17"
      viewBox="0 0 22 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.81716 1.52417L1.81716 8.39917M1.81716 8.39917L8.81716 15.2742M1.81716 8.39917L20.4838 8.39917"
        stroke="currentcolor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
