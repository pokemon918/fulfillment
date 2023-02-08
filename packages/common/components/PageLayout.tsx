import { FC, ReactNode } from 'react'
import { PageBgColor } from '../ui'
import { makeStyles } from '../utils'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

interface PageLayoutProps {
  children?: ReactNode
  bgColor?: string
}

export const PageLayout: FC<PageLayoutProps> = ({ children, bgColor }) => {
  const styles = useStyles({})

  return (
    <div css={styles.root}>
      {bgColor && <PageBgColor bgColor={bgColor} />}

      <Navbar css={styles.navbar} />

      <div css={styles.body}>
        <div style={{ height: 48 }} />

        {children}

        <div style={{ height: 96 }} />
      </div>

      <Footer css={styles.footer} />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    flexShrink: 0,
  },
  footer: {
    flexShrink: 0,
  },
  body: {
    flexGrow: 1,
  },
}))
