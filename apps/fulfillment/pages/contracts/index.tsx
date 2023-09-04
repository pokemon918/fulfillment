import React from 'react';
import { ContractsPage, gql, graphqlReq } from 'common'
import { GetStaticProps } from 'next';


function Contracts(props: PageContractsProps) {
  const {contracts} = props;
  console.log(contracts)
  return (
    <ContractsPage contracts={contracts} />
  )
}

export default Contracts

interface PageContractsProps {
  contracts: any
}

const getContracs = gql`
  query {
    contracts(descCreatedAt: true) {
      _id
      productId
      portOfArrival
      offerPrice
      quantity
      measure
      investedAmount
      status
      product {
        name {
          en
        }
        thumbnail
      }
    }
  }
  
  `;

export const getStaticProps: GetStaticProps<PageContractsProps> = async () => {
  const {contracts} = await graphqlReq(getContracs)

  return {
    props: {
       contracts
    },
    revalidate: 60
  }
}