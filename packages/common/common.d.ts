interface StaticImageData {
  src: string
  height: number
  width: number
}

let image: StaticImageData

declare module '*.jpg' {
  export = image
}

declare module '*.png' {
  export = image
}

declare module '*.svg' {
  export = image
}

declare module '*.gif' {
  export = image
}
