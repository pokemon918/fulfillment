import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes, useState } from 'react'
import Accordion from './Accordion'

interface AccordionItemsProps extends HTMLAttributes<HTMLDivElement> {
  items: {
    title: string
    content: string
  }[]
}

const AccordionItems: FC<AccordionItemsProps> = (props) => {
  const styles = useStyles(props)
  const [opened, setOpened] = useState<number | null>()

  const { items, ...divProps } = props

  const toggle = (itemIdx: number) =>
    setOpened((prevOpened) => (prevOpened === itemIdx ? null : itemIdx))


  return (
    <div {...divProps}>
      {items.map((item, itemIdx) => (
        <Accordion
          key={itemIdx}
          css={styles.item}
          item={item}
          onToggle={() => toggle(itemIdx)}
          open={opened === itemIdx}
        />
      ))}
    </div>
  )
}

const useStyles = makeStyles(({}: AccordionItemsProps) => ({
  item: {
    '&:not(:last-of-type)': {
      marginBottom: 15,
    },
  },
}))

export default AccordionItems
