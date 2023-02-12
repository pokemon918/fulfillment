import { FC, HTMLAttributes } from 'react'
import { AccordionItems } from '../ui'
import { makeStyles } from '../utils'

interface FaqProps extends HTMLAttributes<HTMLDivElement> {
  faqs: {
    title: string
    content: string
  }[]
}

export const Faq: FC<FaqProps> = (props) => {
  const styles = useStyles(props)
  const { faqs } = props

  return (
    <div>
      <h3 css={styles.heading}>Frequently asked questions</h3>
      <AccordionItems items={faqs} />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 54,
    textAlign: 'center',
  },
}))
