import {
  Container,
  InvestmentForm,
  InvestmentFormValue,
  PageLayout,
  useGql,
  withAuth,
} from 'common'
import { gql } from 'graphql-request'
import { useRouter } from 'next/router'

const GET_INVESTMENT = gql`
  query ($_id: String!) {
    investment(_id: $_id) {
      _id
      name {
        en
        es
      }
      categoryId
      country

      hsCode {
        en
        es
      }
      goalAmount
      paidAmount
      estimatedReturn
      supporters
      finalDate
      bigTitle {
        en
        es
      }
      description {
        en
        es
      }
      offerPrices {
        name {
          en
          es
        }

        value {
          en
          es
        }
      }
      thumbnail
      gallery
      specs {
        name {
          en
          es
        }
        value {
          en
          es
        }
      }
      availableSpecs {
        en
        es
      }
      traces {
        title {
          en
          es
        }

        description {
          en
          es
        }
        gallery
      }
      certifications
      harvestingMonths
    }
  }
`

const PageInvestmentUpdate = () => {
  const router = useRouter()

  const investmentId = router.query.investmentId as string

  const { data: investment } = useGql(
    GET_INVESTMENT,
    {
      _id: investmentId,
    },
    !!investmentId,
    (data: any) =>
      data
        ? ({
            ...data.investment,
            gallery: data.investment.gallery.map((f: any) => ({ src: f })),
            traces: data.investment.traces.map((trace: any) => ({
              ...trace,
              gallery: trace.gallery.map((f: any) => ({ src: f })),
            })),
            certifications: data.investment.certifications.map((f: any) => ({
              src: f,
            })),
          } as InvestmentFormValue)
        : null
  )

  return (
    <PageLayout>
      <Container maxWidth="md">
        {investment ? (
          <InvestmentForm defaultValues={investment} actionType="update" />
        ) : (
          <p style={{ textAlign: 'center' }}>Loading</p>
        )}
      </Container>
    </PageLayout>
  )
}

export default withAuth(PageInvestmentUpdate, 'admin')
