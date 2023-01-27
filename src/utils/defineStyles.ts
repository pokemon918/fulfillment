import { FunctionInterpolation, Interpolation, Theme } from '@emotion/react'

const defineStyles = <T extends { [k: string]: Interpolation<Theme> }>(
  styles: T
): T => styles

const styles = defineStyles({
  root: {
    display: ''
  }
})


export default defineStyles
