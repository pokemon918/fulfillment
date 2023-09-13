import React, { useState, useEffect } from "react";

import CompanyChart, { CompanyChartState } from "@/components/Charts/CompanyChart";
import UserChart, { UserChartState } from "@/components/Charts/UserChart";
import ContractChart, { ContractState } from "@/components/Charts/ContractChart";
import ProductChart, { ProductChartState } from "@/components/Charts/ProductChart";
import ToDo from "@/components/ToDo";
import { gql, graphqlReq } from "common";

const GET_COMPANY_STATISTICS = gql`
  query {
    companyStatistics
  }
`

const GET_USER_STATISTICS = gql`
  query {
    userStatistics
  }
`

const GET_CONTRACT_STATISTICS = gql`
  query {
    contractStatistics
  }
`

const GET_PRODUCTS = gql`
  query {
    categories {
      name {
        en
      }
      products {
        _id
      }
    }
  }
`

const GET_PENDING_INVESTORS = gql`
  query {
    users(statusSearch: "pending", descCreatedAt: true) {
      _id
    }
  }
`

const GET_VALIDATING_INVESTORS = gql`
  query {
    users(statusSearch: "validating", descCreatedAt: true) {
      _id
    }
  }
`

const ECommerce: React.FC = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [companies, setCompanies] = useState<CompanyChartState>({
    series: [0, 0]
  })

  const [users, setUsers] = useState<UserChartState>({
    series: [0, 0, 0]
  })

  const [contracts, setContracts] = useState<ContractState>({
    series: [0, 0, 0, 0]
  })

  const [categories, setCategories] = useState<number>(0)

  const [products, setProducts] = useState<ProductChartState[]>([])

  const [lst, setLst] = useState<any>([]) // getting investors data

  useEffect(() => {
    ;(async () => {
      // company data set
      const res1 = await graphqlReq(GET_COMPANY_STATISTICS)
      setCompanies({
        series: res1.companyStatistics
      })
      // user data set
      const res2 = await graphqlReq(GET_USER_STATISTICS)
      setUsers({
        series: res2.userStatistics
      })
      // contract data set
      const res3 = await graphqlReq(GET_CONTRACT_STATISTICS)
      setContracts({
        series: res3.contractStatistics
      })
      // product data set
      const res4 = await graphqlReq(GET_PRODUCTS)
      const processedData = res4.categories.map((category: any) => ({
        name: category.name.en,
        count: category.products.length
      }))
      setCategories(res4.categories?res4.categories.length:0)
      setProducts(processedData)
      const res5 = await graphqlReq(GET_PENDING_INVESTORS)
      const res6 = await graphqlReq(GET_VALIDATING_INVESTORS)
      setLst([res5.users.length, res6.users.length])
      console.log(res6)
      setIsLoading(false)
    })()
  }, [])

  return (
    <>
      {isLoading?<>Loading...</>: <>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <CompanyChart series={companies.series} />
          <UserChart series={users.series} />
          <ContractChart series={contracts.series} />
          <ProductChart products={products} />
          <div className="xl:col-span-8 col-span-12">
            <ToDo pending_contracts = {contracts.series[0]} pending_investors={lst[0]} validating_investors={lst[1]} />
          </div>
        </div></>
      }
    </>
  );
};

export default ECommerce;
