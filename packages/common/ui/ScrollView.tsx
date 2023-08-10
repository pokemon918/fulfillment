import { ArrowLeft, ArrowRight } from '../icons'
import { theme } from '../theme'
import { ContainerWide, ContainerWideProps } from './ContainerWide'
import { IconButton } from './IconButton'
import { makeStyles } from '../utils'
import { FC, HTMLAttributes, ReactNode, useRef } from 'react'

interface ScrollViewProps {
  children: ReactNode
  render: (nodes: {
    deskArrows: ReactNode
    mobileArrows: ReactNode
    scrollView: ReactNode
  }) => ReactNode
  endBlur: string
  maxWidth: ContainerWideProps['maxWidth']
}

export const ScrollView: FC<ScrollViewProps> = (props) => {
  const styles = useStyles(props)

  const { children, render, endBlur, maxWidth } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const calcElemSize = () => {
    const container = containerRef.current!

    const [firstElem, secondElem] = Array.from(
      container.firstElementChild!.children
    ) as HTMLDivElement[]

    return firstElem && secondElem
      ? secondElem.offsetLeft - firstElem.offsetLeft
      : 0
  }

  const next = () => {
    const container = containerRef.current!

    const elemSize = calcElemSize()

    container.scroll({
      top: 0,
      left: container.scrollLeft + elemSize,
      behavior: 'smooth',
    })
  }

  const prev = () => {
    const container = containerRef.current!

    const elemSize = calcElemSize()

    container.scroll({
      top: 0,
      left: container.scrollLeft - elemSize,
      behavior: 'smooth',
    })
  }

  const deskArrows = (
    <div css={styles.deskArrows}>
      <IconButton
        bordered
        style={{ marginRight: 25 }}
        children={<ArrowLeft />}
        onClick={prev}
      />
      <IconButton bordered children={<ArrowRight />} onClick={next} />
    </div>
  )

  const mobileArrows = (
    <div css={styles.tabletSmArrows}>
      <IconButton
        bordered
        style={{ marginRight: 16 }}
        children={<ArrowLeft />}
        onClick={prev}
      />
      <IconButton bordered children={<ArrowRight />} onClick={next} />
    </div>
  )

  const scrollView = (
    <ContainerWide
      ref={containerRef}
      scrollable
      endBlur={endBlur}
      contentEndWidth={46}
      maxWidth={maxWidth}
    >
      {children}
    </ContainerWide>
  )

  return <>{render({ deskArrows, mobileArrows, scrollView })}</>
}

const useStyles = makeStyles(({ }: ScrollViewProps) => ({
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 56,
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  title: {
    fontSize: 30,
  },
  deskArrows: {
    [`@media (max-width: ${theme.widths.tabletSm})`]: {
      display: 'none',
    },
  },
  tabletSmArrows: {
    display: 'none',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 48,
    },
  },
  products: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 258,
    padding: '0 16px',
    gap: 18,
    fontFamily: theme.fonts.primary,
    '@media (max-width: 320px)': {
      gridAutoColumns: 'calc(100% - 32px)',
    },
  },
}))
