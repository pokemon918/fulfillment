import { css, Global } from '@emotion/react'
import { theme } from './theme'

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
    font-family: ${theme.fonts.secondary};
    line-height: 1.3;
    font-size: 16px;
    letter-spacing: 0.5px;
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

  [type="radio"]:checked,
[type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label
{
    position: relative;
    padding-left: 32px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    background: #3BA83B;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
[type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}





.switch label {
  display: inline-block;
  position: relative;
  width: 55px;
  height: 25px;
  border-radius: 20px;
  background: #efefef;
  transition: background 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  cursor: pointer;
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.24) inset;
-webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.24) inset;
-moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.24) inset;
}
.switch label::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 2px;
  width: 22px;
  height: 22px;
  background: #fafafa;
  border-radius: 50%;
  filter: drop-shadow(2px 1px 6px rgba(0, 0, 0, 0.25));
  transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.switch label:active::before {
  box-shadow: 0 2px 8px rgba(0,0,0,0.28), 0 0 0 20px rgba(128,128,128,0.1);
}
.switch input:checked + label {
  background: #3BA83B;
  box-shadow: inherit;
}
.switch input:checked + label::before {
  left: 30px;
  background: #fff;
}
.switch input:checked + label:active::before {
  box-shadow: 0 2px 8px rgba(0,0,0,0.28), 0 0 0 20px rgba(0,150,136,0.2);
}
`

export const GlobalStyles = () => {
  return <Global styles={globalStyles} />
}
