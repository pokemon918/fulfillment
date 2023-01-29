import { FC, SVGProps } from 'react'

const AddIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
    className="MuiSvgIcon"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="AddIcon"
      {...props}
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
    </svg>
  )
}

export default AddIcon
