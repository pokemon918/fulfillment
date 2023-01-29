import { FC, SVGProps } from 'react'

const PhoneIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.18411 3.37817H4.89145C4.01942 3.37817 3.3125 4.08509 3.3125 4.95712C3.3125 12.3694 9.32131 18.3782 16.7336 18.3782C17.6056 18.3782 18.3125 17.6713 18.3125 16.7992V14.5066C18.3125 13.8251 17.8976 13.2122 17.2648 12.9591L15.0684 12.0805C14.5 11.8532 13.8528 11.9557 13.3825 12.3476L12.8151 12.8205C12.1529 13.3723 11.1791 13.3281 10.5696 12.7186L8.97207 11.1211C8.36254 10.5115 8.31837 9.5378 8.87021 8.87559L9.34303 8.3082C9.73494 7.83791 9.83748 7.19063 9.61013 6.62224L8.73157 4.42586C8.47847 3.79309 7.86562 3.37817 7.18411 3.37817Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PhoneIcon
