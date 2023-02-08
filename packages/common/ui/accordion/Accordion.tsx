import { useSameState } from '../../hooks'
import { makeStyles } from '../../utils'
import { FC, HTMLAttributes, useEffect, useRef } from 'react'

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  item: {
    title: string
    content: string
  }
  open: boolean
  onToggle: () => void
}

export const Accordion: FC<AccordionProps> = (props) => {
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const styles = useStyles(props)
  const [contentHeight, setContentHeight] = useSameState(0)

  const { item, open, onToggle, ...divProps } = props

  useEffect(() => {
    const setHeight = () =>
      setContentHeight(contentWrapperRef.current!.scrollHeight)

    setHeight()

    window.addEventListener('resize', setHeight, { passive: true })
    return () => window.removeEventListener('resize', setHeight)
  }, [])

  return (
    <div css={styles.root} {...divProps}>
      <div css={styles.header} onClick={onToggle}>
        <h4 css={styles.itemTitle}>{item.title}</h4>
      </div>

      <div
        css={styles.content}
        style={{
          height: open ? contentHeight : 0,
        }}
      >
        <p ref={contentWrapperRef} css={styles.contentText}>
          {item.content}
        </p>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: AccordionProps) => ({
  root: {
    cursor: 'pointer',
  },
  header: {
    background: '#B1DA50',
    padding: '20px 20px 18px',
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
  },
  itemTitle: {
    fontWeight: 500,
    fontSize: 16,
  },
  content: {
    overflow: 'hidden',
    height: 0,
    transition: 'height 0.2s',
  },
  contentText: {
    padding: '18px 0 15px',
    color: '#434343',
  },
}))
