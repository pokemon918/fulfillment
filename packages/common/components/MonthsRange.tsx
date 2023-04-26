import { FC, HTMLAttributes } from 'react'
import { makeStyles } from '../utils'
import pickedImg from '../assets/images/picked.png'

interface MonthsRangeProps extends HTMLAttributes<HTMLDivElement> {
  picked: number[]
}

export const MonthsRange: FC<MonthsRangeProps> = (props) => {
  const { picked, ...divProps } = props
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

  const styles = useStyles(props)

  return (
    <div css={styles.root} {...divProps}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {months.map((month, monthIdx) => (
          <div>
            <div key={monthIdx} css={styles.monthHolder}>
              {month}
            </div>

            <div key={monthIdx} css={styles.pickedHolder} style={{background: picked.includes(monthIdx) ? '#B1DA50' : '#E9EBF0'}} >
              <img src={pickedImg.src} />
            </div>
          </div>
        ))}
      </div>

      {/* <div css={styles.range}>
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
      </div> */}
    </div>
  )
}

const useStyles = makeStyles(({ }: MonthsRangeProps) => ({
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
  monthHolder: {
    background: '#E9EBF0',
    textAlign: 'center',
    padding: '5px',
    width: 'auto',
    fontSize: '10px',
    marginRight: '3px',
    color: '#828282',
  },
  pickedHolder: {
    marginTop: '3px',
    textAlign: 'center',
    padding: '5px',
    width: 'auto',
    marginRight: '3px',
    color: '#828282',
  },
  range: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
    background: '#ffffff',
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
