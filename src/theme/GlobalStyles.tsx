import { css, Global } from '@emotion/react'
import fonts from './fonts'

const globalStyles = css`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: ${fonts.primary.style.fontFamily};
    line-height: 1.3;
    font-size: 16px;
  }

  :root {
    --color-primary: #b0d950;
    --color-primary-gradient: linear-gradient(
      258.14deg,
      #69832c 15.54%,
      #b0d950 117.35%
    );
    --container-width-lg: 1472px;
    --container-width-md: 1252px;
    --container-md-margin: max(calc((100vw - 1252px) / 2), 0px);
  }
`

const GlobalStyles = () => {
  return <Global styles={globalStyles} />
}

export default GlobalStyles
