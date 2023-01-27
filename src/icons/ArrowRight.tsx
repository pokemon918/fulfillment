import { FC, SVGProps } from "react"

const ArrowRight: FC<SVGProps<SVGSVGElement>> = (props) => {
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
        d="M13.3172 15.2742L20.3172 8.39917M20.3172 8.39917L13.3172 1.52417M20.3172 8.39917L1.65054 8.39917"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowRight
