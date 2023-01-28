import { FC, SVGProps } from 'react'

const LocationIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="16"
      height="21"
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.99996 0.313599C3.58896 0.313599 -4.06257e-05 3.9026 -4.06257e-05 8.3086C-0.0290406 14.7536 7.69596 20.0976 7.99996 20.3136C7.99996 20.3136 16.029 14.7536 16 8.3136C16 3.9026 12.411 0.313599 7.99996 0.313599ZM7.99996 12.3136C5.78996 12.3136 3.99996 10.5236 3.99996 8.3136C3.99996 6.1036 5.78996 4.3136 7.99996 4.3136C10.21 4.3136 12 6.1036 12 8.3136C12 10.5236 10.21 12.3136 7.99996 12.3136Z"
        fill="#B1DA50"
      />
    </svg>
  )
}

export default LocationIcon
