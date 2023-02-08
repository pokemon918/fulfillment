import { FC, HTMLAttributes } from 'react'
import { AccordionItems } from '../ui'
import { makeStyles } from '../utils'

const faqs: {
  title: string
  content: string
}[] = [
  {
    title: 'How do payment and transaction work?',
    content:
      'Payment terms and transactions are all set by agreement between Tridge and you. Delivery & payment settlement will be directly managed by Tridge.',
  },
  {
    title: 'Does Tridge own the farms or packing houses?',
    content:
      'Payment terms and transactions are all set by agreement between Tridge and you. Delivery & payment settlement will be directly managed by Tridge.',
  },
  {
    title: 'Do you sell in DDP / do you do customs clearance?',
    content:
      'Payment terms and transactions are all set by agreement between Tridge and you. Delivery & payment settlement will be directly managed by Tridge.',
  },
  {
    title: 'How do you ensure quality and what are your compensation policies?',
    content:
      'Payment terms and transactions are all set by agreement between Tridge and you. Delivery & payment settlement will be directly managed by Tridge.',
  },
]

interface FaqProps extends HTMLAttributes<HTMLDivElement> {}

export const Faq: FC<FaqProps> = (props) => {
  const styles = useStyles(props)
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
