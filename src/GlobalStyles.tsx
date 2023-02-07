import { css, Global } from '@emotion/react'
import theme from './theme'

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
  #__next,
  .app-root-wrapper,
  .app-root {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: ${theme.fonts.primary};
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
    --container-width-sm: 802px;
    --container-width-xs: 544px;
    --container-md-margin: max(calc((100vw - 1252px) / 2), 0px);
  }

  .MuiSvgIcon {
    fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 1.5rem;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    flex-shrink: 0;
    user-select: none;
  }
`

const GlobalStyles = () => {
  return <Global styles={globalStyles} />
}

export default GlobalStyles
