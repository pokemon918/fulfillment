import { Interpolation, Theme } from '@emotion/react'

const makeStyles = <P extends {}, T extends string>(
  theme: (props: P) => { [k in T]: Interpolation<Theme> }
) => theme

export default makeStyles
