import { FC, SVGProps } from 'react'

export const EmailIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
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
        d="M17.4792 5.0448H4.14583C3.6856 5.0448 3.3125 5.4179 3.3125 5.87813V15.8781C3.3125 16.3384 3.6856 16.7115 4.14583 16.7115H17.4792C17.9394 16.7115 18.3125 16.3384 18.3125 15.8781V5.87813C18.3125 5.4179 17.9394 5.0448 17.4792 5.0448Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.3125 5.87817L11.0268 11.7115L18.3125 5.87817"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
