const mergeProps = <T extends {}, U extends {}>(
  props: T,
  defaultProps: Partial<T> & U
): T & U => Object.assign(defaultProps, props)

export default mergeProps
