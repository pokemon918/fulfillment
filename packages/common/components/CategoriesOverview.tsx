import React, { ChangeEvent, FC, HTMLAttributes } from 'react'
import { useUser } from '../hooks'
import { theme } from '../theme'
import { BaseCategory } from '../types'
import { Button, Container, ScrollView } from '../ui'
import { makeStyles } from '../utils'
import { Category } from './Category'
import { SearchBox } from '../ui/SearchBox'

interface CategoriesOverviewProps extends HTMLAttributes<HTMLDivElement> {
  categories: BaseCategory[]
  itemType?: 'product' | 'investment'
}

export const CategoriesOverview: FC<CategoriesOverviewProps> = (props) => {

  const styles = useStyles(props)

  const { categories, itemType = 'product', ...divProps } = props
  const [inputValue, setInputValue] = React.useState('');
  const [searchedCategories, setSearchedCategories] = React.useState<BaseCategory[]>(categories)
  const user = useUser()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const searchText = e.target.value.toLowerCase().trim();
    const searchResult1 = categories?.filter((category) => category?.name.toLowerCase().trim()?.startsWith(searchText));
    const searchResult2 = categories?.filter((category) => category?.name.toLowerCase().trim()?.includes(searchText));
    setSearchedCategories(searchResult1?.length > 0 ? searchResult1 : searchResult2);
  }

  return (
    <ScrollView
      maxWidth="none"
      endBlur="linear-gradient(269.92deg, #e7f4ca 0.05%, rgba(231, 244, 202, 0) 99.9%)"
      children={
        <div css={styles.categories}>
          {searchedCategories?.map((category) => (
            <Category
              css={styles.category}
              key={category._id}
              category={category}
              itemType={itemType}
            />
          ))}
          <div css={styles.emptyBox} />
        </div>
      }
      render={({ deskArrows, mobileArrows, scrollView }) => (
        <div css={styles.wrapper} {...divProps}>
          <div css={styles.root}>
            <div css={styles.searchBarWrapper}>
              <SearchBox type="text" placeholder="Search Categories..." value={inputValue} onChange={handleChange} />
            </div>
            <Container maxWidth="md">
              <div css={styles.mobileHeader}>
                <div css={styles.subheader}>
                  <h4 css={styles.heading2}><span css={styles.heading1}>Search</span> by available categories</h4>
                  {user?.role === 'admin' && (
                    <Button href="/categories">Manage</Button>
                  )}
                </div>
              </div>
            </Container>
            <div css={styles.scrollView}>
              {scrollView}
            </div>
            <div css={styles.header}>
              <div css={styles.subheader}>
                <h4 css={styles.heading2}><span css={styles.heading1}>Search</span> by available categories</h4>
                {user?.role === 'admin' && (
                  <Button href="/categories">Manage</Button>
                )}
              </div>
              {deskArrows}
            </div>
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
      background: '#EAF2D1',
    },
    root: {
      position: 'relative',
      paddingTop: 30,
      paddingBottom: 74,
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        paddingBottom: 42,
      },
    },
    searchBarWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '40px 0 30px 96px',
      background: "#EAF2D1",
      [`@media (max-width: ${theme.widths.tablet})`]: {
        justifyContent: 'center',
        padding: '60px 16 20px 16px',
      },
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        padding: '40px 16px 20px 16px',
      },
    },
    scrollView: {
      margin: 0,
      padding: '0 0 0 96px',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        padding: '0 16px',
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '50px 16px 0 96px',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        justifyContent: 'center',
        display: 'none',
      },
    },
    mobileHeader: {
      display: 'none',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '0px 16px 30px 16px',
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
    },
    heading1: {
      fontWeight: 600,
      fontSize: 48,
      textAlign: 'center',
      color: '#3BA83B',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        fontSize: 38,
      },
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        fontSize: 32,
      },
    },
    heading2: {
      fontWeight: 300,
      fontSize: 48,
      textAlign: 'center',
      color: '#3BA83B',
      [`@media (max-width: ${theme.widths.tablet})`]: {
        fontSize: 38,
      },
      [`@media (max-width: ${theme.widths.tabletSm})`]: {
        fontSize: 32,
      },
    },
    categories: {
      height: 'auto',
      display: 'flex',
      padding: 0,
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
