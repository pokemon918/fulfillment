import { Container } from '../ui'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { ArrowRight } from '../icons'
import { makeStyles } from '../utils'
import { theme } from '../theme'
import logoDark from '../assets/images/logo-dark-large.png'
import footerCover from '../assets/images/footer-cover.png'
import { homeData } from '../data'

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

const links = {
  'Useful Links': [
    { title: 'Privacy Policy', href: 'https://trumarket.tech/privacy-policy' },
    { title: 'Terms & Conditions', href: 'https://trumarket.tech/terms-and-conditions' },
  ],
  'Our Services': [
    { title: 'Technology', href: 'https://trumarket.tech/technology' },
    { title: 'Who we are', href: 'https://trumarket.tech/whoweare' },
  ],
}

export const Footer: FC<FooterProps> = (props) => {
  const styles = useStyles(props)

  const { ...divProps } = props

  return (
    <div css={styles.root} {...divProps}>
      <Container maxWidth="md">
        <img css={styles.logo} src={logoDark.src} />

        <div css={styles.content}>
          <div css={styles.desc}>{homeData.footerText}</div>

          <div css={styles.linkGroups}>
            {Object.entries(links).map(([group, groupLinks], groupIdx) => (
              <div key={groupIdx}>
                <h6 css={styles.subheading}>{group}</h6>

                <ul css={styles.links}>
                  {groupLinks.map((link, linkIdx) => (
                    <li key={linkIdx} css={styles.linkLi}>
                      <Link href={link.href} css={styles.link}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div css={styles.inputWrapper}>
            <h6 css={styles.subheading}>Apply Now</h6>

            <div css={styles.inputBox}>
              <input
                css={styles.input}
                placeholder="Email"
                type="email"
                name="email"
              />
              <span css={styles.inputIconWrapper}>
                <ArrowRight css={styles.inputIcon} />
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

const useStyles = makeStyles((props: FooterProps) => {
  return {
    root: {
      backgroundImage: `url(${footerCover.src})`,
      backgroundSize: 'cover',
      backgroundPosition: '50%',
      backgroundRepeat: 'no-repeat',
      borderTop: '1px solid #666',
      padding: '3rem 0',
      color: '#c5c5c5',
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr 300px',
      gap: 24,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        gridTemplateColumns: '1fr',
        gap: 0,
      },
    },
    subheading: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 400,
      marginBottom: 8,
      fontFamily: theme.fonts.secondary,
    },
    desc: {
      fontSize: 13,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        width: '100%',
        maxWidth: 300,
        margin: '0 auto',
        textAlign: 'center',
        marginBottom: 24,
      },
    },

    logo: {
      [`@media (max-width: ${theme.widths.tablet})`]: {
        display: 'block',
        margin: '0 auto 12px',
      },
    },

    // linkGroups
    linkGroups: {
      display: 'flex',
      justifyContent: 'center',
      gap: 46,
      [`@media (max-width: ${theme.widths.tablet})`]: {
        textAlign: 'center',
        marginBottom: 32,
      },
      [`@media (max-width: 380px)`]: {
        flexDirection: 'column',
        gap: 20,
      },
    },
    links: {
      listStyle: 'none',
    },
    linkLi: {
      ':not(:last-of-type)': {
        marginBottom: 5,
      },
    },
    link: {
      color: '#c5c5c5',
      textDecoration: 'none',
      fontSize: 13,
      ':hover': {
        textDecoration: 'underline',
      },
    },

    // input
    inputWrapper: {
      [`@media (max-width: ${theme.widths.tablet})`]: {
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
      },
    },
    inputBox: {
      display: 'flex',
      height: 56,
      border: '2px solid #fff',
      borderRadius: 10,
    },
    input: {
      width: '100%',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#7c7c7c',
      paddingLeft: 20,
      fontFamily: 'inherit',
    },
    inputIconWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 16,
    },
    inputIcon: {
      color: '#b1da50',
      verticalAlign: 'middle',
    },
  }
})
