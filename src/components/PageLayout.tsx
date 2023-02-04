import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PageBgColor from '@/ui/PageBgColor'
import makeStyles from '@/utils/makeStyles'
import { FC, ReactNode } from 'react'

interface PageLayoutProps {
  children?: ReactNode
  bgColor?: string
}

const PageLayout: FC<PageLayoutProps> = ({ children, bgColor }) => {
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

export default PageLayout
