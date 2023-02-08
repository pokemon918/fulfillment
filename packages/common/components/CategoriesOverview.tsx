import { FC, HTMLAttributes } from 'react'
import { useUser } from '../hooks'
import { theme } from '../theme'
import { BaseCategory } from '../types'
import { Button, Container, ScrollView } from '../ui'
import { makeStyles } from '../utils'
import { Category } from './Category'

interface CategoriesOverviewProps extends HTMLAttributes<HTMLDivElement> {
  categories: BaseCategory[]
}

export const CategoriesOverview: FC<CategoriesOverviewProps> = (props) => {
  const styles = useStyles(props)

  const { categories, ...divProps } = props

  const user = useUser()

  return (
    <ScrollView
      maxWidth="md"
      endBlur="linear-gradient(269.92deg, #e7f4ca 0.05%, rgba(231, 244, 202, 0) 99.9%)"
      children={
        <div css={styles.categories}>
          {categories.map((category) => (
            <Category
              css={styles.category}
              key={category._id}
              category={category}
            />
          ))}

          <div css={styles.emptyBox} />
        </div>
      }
      render={({ deskArrows, mobileArrows, scrollView }) => (
        <div css={styles.wrapper} {...divProps}>
          <div css={styles.root}>
            <Container maxWidth="md">
              <div css={styles.header}>
                <div css={styles.subheader}>
                  <h4 css={styles.heading}>Categories</h4>
                  {user?.role === 'admin' && (
                    <Button href="/categories">Manage</Button>
                  )}
                </div>

                {deskArrows}
              </div>
            </Container>

            {scrollView}

            {mobileArrows}
          </div>
        </div>
      )}
    />
  )
}

const useStyles = makeStyles((props: CategoriesOverviewProps) => {
  const box = {
    width: 265,
    flexShrink: 0,
    '@media (max-width: 360px)': {
      width: 'calc(100% - 64px)',
    },
  }

  return {
    wrapper: {
      position: 'relative',
      background: 'rgba(176, 217, 80, 0.3)',
    },
    root: {
      position: 'relative',
      paddingTop: 74,
      paddingBottom: 74,
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        paddingBottom: 74 - 32,
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: 34,
      padding: '0 16px',
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        justifyContent: 'center',
      },
    },
    subheader: {
      display: 'flex',
      gap: '12px 16px',
      justifyContent: 'center',
    },
    deskArrows: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 32,
    },
    heading: {
      fontWeight: 700,
      fontSize: 36,
      lineHeight: 1.25,
      textAlign: 'center',
      color: '#69832C',
    },
    categories: {
      height: 'auto',
      display: 'flex',
      padding: '0 16px',
    },
    category: {
      marginRight: 36,
      ...box,
    },
    emptyBox: {
      flexShrink: 0,
      width: 10,
    },
  }
})
