import { FC, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { gql, graphqlReq, countries, Select, withAuth } from "common";
import { GetStaticProps, GetStaticPaths } from "next";

interface CompanyPageProps {
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

const GET_PRODUCTS = gql`
  {
    products {
      _id
      name {
        en
      }
    }
  }
`

const CompanyPage = (props: CompanyPageProps) => {
    const companyType = props.company.companyType
    const { control } = useForm({
        defaultValues: {
            _id: props.company._id,
            name: props.company.name,
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
    })
    const [products, setProducts] = useState([])

    useEffect(() => {
        ;(async () => {
        const res = await graphqlReq(GET_PRODUCTS)

        setProducts(
                res.products.map((c: any) => ({
                    label: c.name.en,
                    value: c._id,
                }))
            )
        })()
    }, [])
    return (
        <>
            <Breadcrumb pageName="Detailed Information" href={`/company/${props.company._id}/update`} update="Update"/>

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                {/* <!-- Basic Info --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Basic Info
                        </h3>
                        </div>
                        <div className="p-6.5">

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your company name"
                                    readOnly
                                    value={props.company.name}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Country
                                    </label>
                                    <input
                                    type="text"
                                    placeholder="Enter Country"
                                    value={countries.filter(country => country.code === props.company.country)[0].name}
                                    readOnly
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Company Size
                                    </label>
                                    <input
                                    type="text"
                                    placeholder="Enter Company Size"
                                    readOnly
                                    value={props.company.size}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    readOnly
                                    value={props.company.email}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your phone"
                                    readOnly
                                    value={props.company.phone}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    TaxID
                                    </label>
                                    <input
                                    type="text"
                                    placeholder="Enter TaxID"
                                    value={props.company.TaxID}
                                    readOnly
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    {companyType === "Buyer" ? "POC" : "PIC"}
                                    </label>
                                    <input
                                    type="text"
                                    readOnly
                                    value={props.company.pic_poc}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Type
                                    </label>
                                    <input
                                    type="text"
                                    placeholder="Enter Type"
                                    value={props.company.type}
                                    readOnly
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                    Website
                                    </label>
                                    <input
                                    type="text"
                                    readOnly
                                    placeholder='Enther your website'
                                    value={props.company.website}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-9">
                    {/* <!-- Commercial Info --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Commercial Info
                            </h3>
                        </div>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    {companyType === "Buyer" ? "Interest Products" : "Products"}
                                </label>
                                <Select 
                                    placeholder="Products"
                                    name={companyType === "Buyer" ? "interestProductIds" : "productIds"}
                                    readOnly
                                    options={products}
                                    control={control}
                                    isMulti
                                />
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Yearly Import Volume (tm/ctn) x product
                                    </label>
                                    <input
                                    type="text"
                                    placeholder="Enter Volume"
                                    value={props.company.volume}
                                    readOnly
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Yearly CFR Import (USD) x product
                                    </label>
                                    <input
                                    type="text"
                                    readOnly
                                    value={props.company.cfr_fob}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Preferred PaymentTerm
                                </label>
                                <input 
                                    type='text'
                                    placeholder="Preferred PaymentTerm"
                                    value={props.company.preferredPaymentTerm}
                                    readOnly
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    {companyType === "Buyer" ? "Fulfillment origins (continents)" : "Main markets (continents)"}
                                </label>
                                <input 
                                    type='text'
                                    placeholder="Market"
                                    value={props.company.market}
                                    readOnly
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Certifications
                                </label>
                                <Select 
                                    placeholder="Certifications"
                                    name="certifications"
                                    readOnly
                                    options={props.company.certifications.map(certification => ({value: certification, label: certification}))}
                                    control={control}
                                    isMulti
                                />
                            </div>
                        </div>
                    </div>

                    {/* <!-- Financial Info --> */}
                    {companyType === "Buyer" ? <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Financial Info
                            </h3>
                        </div>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Financial Score
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your financial score"
                                    value={props.company.financialScore}
                                    readOnly
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>
                    </div> : <></>}
                </div>
            </div>
        </>
    )
}

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

export default withAuth(CompanyPage, 'admin')

export const getStaticProps: GetStaticProps<CompanyPageProps> = async (ctx) => {
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
            company: {
                ...company,
                name: company.name.en,
            }
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