import useSameState from '@/hooks/useSameState'
import makeStyles from '@/utils/makeStyles'
import mergeProps from '@/utils/mergeProps'
import {
  FC,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

interface ContainerWideProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'md'
  scrollable?: boolean
  endBlur?: boolean
  contentEndWidth?: number
}

const ContainerWide = forwardRef<HTMLDivElement, ContainerWideProps>(
  (originalProps, ref) => {
    const props = mergeProps(originalProps, {
      maxWidth: 'md',
      scrollable: false,
      endBlur: false,
      contentEndWidth: 0,
    })

    const {
      children,
      maxWidth,
      scrollable,
      endBlur,
      contentEndWidth,
      ...divProps
    } = props

    const styles = useStyles(props)

    const containerRef = useRef<HTMLDivElement>(null)

    const [showBlur, setShowBlur] = useSameState(true)

    useImperativeHandle(ref, () => containerRef.current!)

    useEffect(() => {
      const container = containerRef.current!

      const handleScroll = () => {
        const remainScroll =
          container.scrollWidth - container.offsetWidth - container.scrollLeft
        setShowBlur(remainScroll > contentEndWidth)
      }

      container.addEventListener('scroll', handleScroll, { passive: true })

      return () => container.removeEventListener('scroll', handleScroll)
    }, [])

    return (
      <div css={styles.wrapper}>
        <div css={styles.root} {...divProps} ref={containerRef}>
          {children}
        </div>

        <div css={styles.endBlur} data-hide={!showBlur} />
      </div>
    )
  }
)

const useStyles = makeStyles(
  ({ maxWidth, scrollable, endBlur }: ContainerWideProps) => ({
    wrapper: {
      position: 'relative',
      width: '100%',
    },
    root: {
      display: 'block',
      width: '100%',
      paddingLeft: `calc(50vw - (var(--container-width-${maxWidth}) / 2))`,
      ...(scrollable
        ? {
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': {
              display: 'none',
            },
            transform: 'translateZ(0)',
          }
        : {}),
    },
    endBlur: {
      content: "''",
      position: 'absolute',
      height: '100%',
      width: 224,
      top: 0,
      right: 0,
      background:
        'linear-gradient(269.92deg, #FFFFFF 0.05%, rgba(255, 255, 255, 0) 99.9%)',
      pointerEvents: 'none',
      transition: 'opacity 0.25s',
      '&[data-hide="true"]': {
        opacity: 0,
      },
    },
  })
)

export default ContainerWide
