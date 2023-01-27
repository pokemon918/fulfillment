import { css, Global } from '@emotion/react'
import { FC } from 'react'

const PageBgColor: FC<{ bgColor: string }> = ({ bgColor }) => (
  <Global
    styles={css`
      body {
        background-color: ${bgColor};
      }
    `}
  />
)

export default PageBgColor
