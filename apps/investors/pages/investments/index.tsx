import {
  BaseInvestment,
  Container,
  graphqlReq,
  Investments,
  makeStyles,
  PageLayout,
} from 'common'
import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'

export default function PageInvestments({ investments }: PageInvestmentsProps) {
  const styles = useStyles({})

  return (
    <PageLayout>
      <Container maxWidth="md">
        <h3 css={styles.heading}>Investments</h3>

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

interface PageInvestmentsProps {
  investments: BaseInvestment[]
}

const useStyles = makeStyles((props) => ({
  heading: {
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 24,
  },
}))

export const getStaticProps: GetStaticProps<
  PageInvestmentsProps
> = async () => {
  const data = await graphqlReq(GET_INVESTMENTS)

  return {
    props: {
      investments: data.investments.map((investment: any) => ({
        ...investment,
        name: investment.name.en,
      })),
    },
    revalidate: 60
  }
}
