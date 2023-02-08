import { FC, HTMLAttributes } from 'react'
import { LocationIcon } from '../icons'
import { theme } from '../theme'
import { Container } from '../ui'
import { makeStyles } from '../utils'
import growerImg from '../assets/images/grower.svg'

interface ProfileHeaderProps extends HTMLAttributes<HTMLDivElement> {
  profile: {
    title: string
    location: string
    imgUrl: string
    detail: string
  }
}

export const ProfileHeader: FC<ProfileHeaderProps> = (props) => {
  const styles = useStyles(props)

  const { profile, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      <Container css={styles.profile} maxWidth="md">
        <img css={styles.logo} src={profile.imgUrl} alt="" />
        {/* <div css={styles.logoWrapper}>
        </div> */}

        <div css={styles.contentWrapper}>
          <div css={styles.info}>
            <h2 css={styles.title}>{profile.title}</h2>
            <div css={styles.subtitle}>
              <LocationIcon style={{ marginRight: 16 }} />
              <span>{profile.location}</span>
            </div>
          </div>

          <div css={styles.detail}>
            <span style={{ marginRight: 25 }}>{profile.detail}</span>
            <img src={growerImg.src} alt="" />
          </div>
        </div>
      </Container>
    </div>
  )
}

const useStyles = makeStyles(({}: ProfileHeaderProps) => ({
  root: {
    position: 'relative',
    background: '#fff',
    borderRadius: 30,
    height: 128,
    boxShadow: '0px 2px 12px 1px rgba(155, 155, 155, 0.15)',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      height: 'auto',
    },
  },
  profile: {
    display: 'flex',
    alignItems: 'stretch',
    height: '100%',
  },
  logoWrapper: {
    position: 'relative',
    width: 185,
  },
  logo: {
    position: 'absolute',
    width: 185,
    height: 185,
    flexShrink: 0,
    top: -92.5,
    objectFit: 'cover',
    borderRadius: '50%',
    border: '2px solid #fff',
    [`@media (max-width: ${theme.widths.tablet})`]: {
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: '25px 0 25px 215px',
    flexGrow: 1,
    [`@media (max-width: ${theme.widths.tablet})`]: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: '100px 0 32px 0',
    },
  },
  info: {
    [`@media (max-width: ${theme.widths.tablet})`]: {
      marginBottom: 24,
      textAlign: 'center',
    },
  },
  title: {
    fontWeight: 700,
    fontSize: 30,
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    // flexWrap: 'wrap',
    fontSize: 18,
  },
  detail: {
    display: 'flex',
    alignItems: 'center',
  },
}))
