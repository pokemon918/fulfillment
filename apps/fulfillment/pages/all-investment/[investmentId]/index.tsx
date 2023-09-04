import React from 'react'
import { InvestmentDetailsPage, gql, graphqlReq } from 'common'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';


function InvestmentDetails(props: InvestmentDetailsProps) {
  const {contract} = props;
  console.log(contract);
  return (
   <InvestmentDetailsPage data={contract} />
  )
}

export default InvestmentDetails;

interface InvestmentDetailsProps {
  contract: any
}

function formatDate(dateString: any) {
  const options: any = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const GET_DATA = gql`
  query ($investmentId: String!) {
    contract(_id: $investmentId) {
      _id
      productId
      portOfArrival
      portOfLoading
      departureDate
      offerPrice
      quantity
      measure
      investedAmount
      status
      duration
      return
      risk
      product {
        name {
          en
        }
        availableSpecs {
          en
        }
        thumbnail
      }
      description {
        en
      }
    }
  }
`

export const getServerSideProps: GetServerSideProps<InvestmentDetailsProps> = async (ctx) => {
  const investmentId = ctx.params?.investmentId as string

  const { contract } = await graphqlReq(GET_DATA, { investmentId })

  if (!contract) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      contract : {...contract, departureDate: formatDate(contract.departureDate)}
    },
  }
}

const GET_CONTRACTS = gql`
  query {
    contracts {
      _id
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const { contracts } = await graphqlReq(GET_CONTRACTS)

  const paths = contracts.map((product: any) => ({
    params: { investmentId: product._id },
  }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}