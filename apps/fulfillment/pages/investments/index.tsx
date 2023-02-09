import {
  AddIcon,
  BaseInvestment,
  Button,
  Container,
  Investments,
  makeStyles,
  PageLayout,
  useGql,
} from 'common'
import { gql } from 'graphql-request'

export default function PageInvestments() {
  const styles = useStyles({})

  const { data: investments } = useGql(
    GET_INVESTMENTS,
    {},
    true,
    (data: any) =>
      data.investments.map((investment: any) => ({
        ...investment,
        name: investment.name.en,
      })) as BaseInvestment[]
  )

  return (
    <PageLayout>
      <Container maxWidth="md">
        <div css={styles.header}>
          <h3 css={styles.heading}>Investments</h3>

          <Button
            style={{ padding: '8px 12px' }}
            href="/investments/create"
            startIcon={<AddIcon />}
          >
            Create Investment
          </Button>
        </div>

        {investments ? (
          <Investments investments={investments} action="update" />
        ) : (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        )}
      </Container>
    </PageLayout>
  )
}

const GET_INVESTMENTS = gql`
  {
    investments(descCreatedAt: true) {
      _id

      name {
        en
      }

      thumbnail

      country

      goalAmount
      paidAmount
    }
  }
`

const useStyles = makeStyles((props) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  heading: {
    fontSize: 25,
    fontWeight: 700,
  },
}))
