import {
    Container,
    CompanyForm,
    gql,
    graphqlReq
  } from 'common'
  import { GetStaticProps, GetStaticPaths } from "next";

  interface CompanyUpdateProps {
    company: {
        _id: string
        name: string
        TaxID: string
        size: '1-50' | '50-100' | '100-250' | 'more than 250'
        country: string
        phone: string
        email: string
        website: string
        type: 'Importer' | 'Wholesaler' | 'Exporter' | 'Grower' | 'Processor' | 'Trader'
        pic_poc: string
        status: 'approved' | 'pending' | 'verified'
        productIds: string[]
        volume: number
        cfr_fob: number
        preferredPaymentTerm: string
        seasonality: number[]
        market: 'South and Central America' | 'Africa' | 'North America' | 'Europe' | 'Asia'
        certifications: string[]
        ownField: boolean
        ownPackingHouse: boolean
        financialScore: number
        industryRef: string
        companyType: "Buyer" | "Supplier"
    }
}
  
  const CompanyUpdate = (props: CompanyUpdateProps) => {
    const companyType = props.company.companyType
    const defaultValues = {
        _id: props.company._id,
        // @ts-ignore
        name: { en: props.company.name.en, es: '' },
        TaxID: props.company.TaxID,
        size: props.company.size,
        Country: props.company.country,
        Phone: props.company.phone,
        email: props.company.email,
        website: props.company.website,
        type: props.company.type,
        certifications: props.company.certifications,
        preferredPaymentTerm: props.company.preferredPaymentTerm,
        ...(companyType === "Buyer" ? {
          POC: props.company.pic_poc,
          interestProductIds: props.company.productIds,
          yearImportVolume: props.company.volume,
          yearImportCFR: props.company.cfr_fob,
          fulfillmentOrigin: props.company.market,
          financialScore: props.company.financialScore
        } : {
          PIC: props.company.pic_poc,
          productIds: props.company.productIds,
          yearExportVolume: props.company.volume,
          yearFOBExport: props.company.cfr_fob,
          seasonality: props.company.seasonality,
          mainMarket: props.company.market,
          ownField: props.company.ownField,
          ownPackingHouse: props.company.ownPackingHouse,
          industryRef: props.company.industryRef
        })
      }
    return (
      <Container maxWidth="md">
        {/* @ts-ignore */}
        <CompanyForm defaultValues={defaultValues} actionType="update" />
      </Container>
    )
  }
  
  export default CompanyUpdate
  
  
const GET_DATA = gql`
query ($companyId: String!) {
  company(_id: $companyId) {
    _id
    name {
      en
    }
    TaxID
    size
    country
    phone
    email
    website
    type
    pic_poc
    status
    productIds	
    volume
    cfr_fob
    preferredPaymentTerm
    seasonality
    market
    certifications
    ownField
    ownPackingHouse
    financialScore
    industryRef
    companyType
  }
}
`

export const getStaticProps: GetStaticProps<CompanyUpdateProps> = async (ctx) => {
  const companyId = ctx.params?.companyId as string

  const { company } = await graphqlReq(GET_DATA, { companyId })

  if (!company) {
      return {
      notFound: true,
      revalidate: 60
      }
  }

  return {
      props: {
          company: company
      },
      revalidate: 60
  }
}

const GET_COMPANIES = gql`
query {
  companies {
    _id
  }
}
`

export const getStaticPaths: GetStaticPaths = async () => {
    const { companies } = await graphqlReq(GET_COMPANIES)

    const paths = companies.map((company: any) => ({
        params: { companyId: company._id },
    }))

    return {
        paths: paths,
        fallback: 'blocking',
    }
}