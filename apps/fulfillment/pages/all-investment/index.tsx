import React from 'react';
import { InvestmentPage, gql, graphqlReq } from 'common'
import { GetStaticProps } from 'next';


function InvestmentsAll(props: PageInvestmentProps) {
  const {contracts} = props;
  console.log(contracts)
  return (
    <InvestmentPage contracts={contracts} />
  )
}

export default InvestmentsAll

interface PageInvestmentProps {
  contracts: any
}

const getContracs = gql`
  query {
    contracts(descCreatedAt: true) {
      _id
      productId
      portOfLoading
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
        thumbnail
      }
    }
  }
  
  `;

export const getStaticProps: GetStaticProps<PageInvestmentProps> = async () => {
  const {contracts} = await graphqlReq(getContracs)

  return {
    props: {
       contracts : contracts?.filter((v:any) => v.status === 'Approved')
    },
    revalidate: 1
  }
}