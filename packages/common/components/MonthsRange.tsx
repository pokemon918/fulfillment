import { FC, HTMLAttributes } from 'react'
import { makeStyles } from '../utils'

interface MonthsRangeProps extends HTMLAttributes<HTMLDivElement> {
  picked: number[]
}

export const MonthsRange: FC<MonthsRangeProps> = (props) => {
  const { picked, ...divProps } = props
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

  const styles = useStyles(props)

  return (
    <div css={styles.root} {...divProps}>
      <div css={styles.headings}>
        {months.map((month, monthIdx) => (
          <span key={monthIdx} css={styles.heading}>
            {month}
          </span>
        ))}
      </div>

      <div css={styles.range}>
        {months.map((_, monthIdx) => {
          const isCurPicked = picked.includes(monthIdx)
          const isPrevPicked = picked.includes(monthIdx - 1) || monthIdx === 0
          const isNextPicked =
            picked.includes(monthIdx + 1) || months.length - 1 === monthIdx

          return (
            <span
              key={monthIdx}
              css={styles.rangeCell}
              data-picked={isCurPicked}
              data-round-left={!isPrevPicked}
              data-round-right={!isNextPicked}
            >
              {isCurPicked && <span css={styles.pickedDot} />}
            </span>
          )
        })}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({}: MonthsRangeProps) => ({
  root: {
    width: '100%',
  },
  headings: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
    fontSize: 10,
  },
  heading: {
    display: 'flex',
    justifyContent: 'center',
  },
  range: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
    background: '#ffffff',
    border: '0.4px solid #D6D6D6',
    borderRadius: 50,
    height: 10,
    overflow: 'hidden',
  },
  rangeCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&[data-picked="true"]': {
      background: '#B1DA50',
    },
    '&[data-round-left="true"]': {
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
    },
    '&[data-round-right="true"]': {
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
    },
  },
  pickedDot: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: '#fff',
  },
}))
