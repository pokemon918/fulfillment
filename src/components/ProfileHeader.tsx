import LocationIcon from '@/icons/LocationIcon'
import Container from '@/ui/Container'
import makeStyles from '@/utils/makeStyles'
import { FC, HTMLAttributes } from 'react'

interface ProfileHeaderProps extends HTMLAttributes<HTMLDivElement> {
  profile: {
    title: string
    location: string
    imgUrl: string
    detail: string
  }
}

const ProfileHeader: FC<ProfileHeaderProps> = (props) => {
  const styles = useStyles(props)

  const { profile, ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      <Container css={styles.profile} maxWidth="md">
        <div css={styles.logoWrapper}>
          <img css={styles.logo} src={profile.imgUrl} alt="" />
        </div>

        <div css={styles.contentWrapper}>
          <div>
            <h2 css={styles.title}>{profile.title}</h2>
            <div css={styles.subtitle}>
              <LocationIcon style={{ marginRight: 16 }} />
              <span>{profile.location}</span>
            </div>
          </div>

          <div css={styles.detail}>
            <span style={{ marginRight: 25 }}>{profile.detail}</span>
            <img src="/images/grower.svg" alt="" />
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
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: '25px 0 25px 30px',
    flexGrow: 1,
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
    flexWrap: 'wrap',
    fontSize: 18,
  },
  detail: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export default ProfileHeader
