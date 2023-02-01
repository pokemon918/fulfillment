import makeStyles from '@/utils/makeStyles'
import mergeProps from '@/utils/mergeProps'
import { FC, HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'lg' | 'md' | 'sm' | 'xs'
}

const Container: FC<ContainerProps> = (originalProps) => {
  const props = mergeProps(originalProps, {
    maxWidth: 'lg',
  })

  const styles = useStyles(props)

  const { maxWidth, children, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      {children}
    </div>
  )
}

const useStyles = makeStyles(({ maxWidth }: ContainerProps) => ({
  root: {
    display: 'block',
    maxWidth: `var(--container-width-${maxWidth})`,
    padding: '0 16px',
    width: '100%',
    margin: '0 auto',
  },
}))

export default Container
