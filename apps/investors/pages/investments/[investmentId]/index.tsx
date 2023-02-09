import {
  BaseInvestment,
  Container,
  DetailedInvestment,
  Faq,
  Footer,
  gql,
  graphqlReq,
  makeStyles,
  Navbar,
  NoSSR,
  PageBgColor,
  ProductInfo,
  ItemIntro,
  QuotePrompt,
  QuoteSticky,
  RelatedProducts,
  theme,
  RelatedInvestments,
} from 'common'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FC, useState } from 'react'

interface InvestmentPageProps {
  investment: DetailedInvestment
  relatedInvestments: BaseInvestment[]
  userProfile?: {
    fullName: string
    companyName: string
    email: string
    phone: string
  }
}

const InvestmentPage: FC<InvestmentPageProps> = (props) => {
  const { investment, relatedInvestments, userProfile } = props

  const styles = useStyles(props)
  const [openQuote, setOpenQuote] = useState(false)

  return (
    <div css={styles.root}>
      <PageBgColor bgColor="#f8f8f8" />
      <Navbar style={{ marginBottom: 72 }} />

      <Container style={{ marginBottom: 100 }} maxWidth="md">
        <ItemIntro
          style={{ marginBottom: 120 }}
          gallery={investment.gallery}
          item={{ type: 'investment', ...investment }}
          onClickGetQuote={() => setOpenQuote(true)}
        />

        <ProductInfo product={investment} />
      </Container>

      <RelatedInvestments
        investments={relatedInvestments}
        style={{ marginBottom: 122, marginTop: 120 }}
      />

      <Container style={{ marginBottom: 100 }} maxWidth="sm">
        <Faq />
      </Container>

      <Footer />
    </div>
  )
}

const useStyles = makeStyles((props: InvestmentPageProps) => ({
  root: {
    fontFamily: theme.fonts.secondary,
  },
}))

const GET_DATA = gql`
  query ($investmentId: String!) {
    investment(_id: $investmentId) {
      _id
      name {
        en
      }
      thumbnail
      country
      categoryId
      goalAmount
      paidAmount
      estimatedReturn
      supporters
      finalDate
      harvestingMonths
      offerPrices {
        name {
          en
        }

        value {
          en
        }
      }
      availableSpecs {
        en
      }
      hsCode {
        en
      }
      gallery
      traces {
        title {
          en
          es
        }
        gallery
        description {
          en
        }
      }
      updatedAt

      relatedInvestments {
        _id
        name {
          en
        }
        thumbnail
        country
        categoryId
        goalAmount
        paidAmount
        availableSpecs {
          en
        }
      }
    }
  }
`

export const getStaticProps: GetStaticProps<InvestmentPageProps> = async (
  ctx
) => {
  const investmentId = ctx.params?.investmentId as string

  const { investment } = await graphqlReq(GET_DATA, { investmentId })

  return {
    props: {
      investment: {
        ...investment,
        name: investment.name.en,
        availableSpecs: investment.availableSpecs.en,
        hsCode: investment.hsCode.en,
        traces: investment.traces.map((trace: any) => ({
          ...trace,
          title: trace.title.en,
          description: trace.description.en,
        })),
        offerPrices: investment.offerPrices.map((offerPrice: any) => ({
          ...offerPrice,
          name: offerPrice.name.en,
          value: offerPrice.value.en,
        })),
      },
      relatedInvestments: investment.relatedInvestments.map(
        (investment: any) => ({
          ...investment,
          name: investment.name.en,
          availableSpecs: investment.availableSpecs.en,
        })
      ),
    },
    revalidate: 10,
  }
}

const GET_INVESTMENTS = gql`
  query {
    investments {
      _id
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const { investments } = await graphqlReq(GET_INVESTMENTS)

  const paths = investments.map((investment: any) => ({
    params: { investmentId: investment._id },
  }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export default InvestmentPage
