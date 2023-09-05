import { FC, useState, useEffect, SyntheticEvent, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { gql, graphqlReq, countries, Select, withAuth, revalidateContract, timeout } from "common";
import { GetStaticProps, GetStaticPaths } from "next";

interface ContractPageProps {
    contract: {
        _id: string
        productId: string
        product: string
        portOfLoading: string
        portOfArrival: string
        departureDate: Date
        offerPrice: number
        quantity: number
        downPayment: number
        cashAgainstDocuments: number
        arrival: number
        description: string
        attachment: string
        brandType: boolean
        pluType: boolean
        certifications: [string]
        measure: boolean
        duration: number // weeks 
        risk: 'A' | 'B' | 'C' | 'D'
        return: string // (percentage) or (annual return)
        supplierId: string
        requiredAmount: number
        nftLink: string // website link
        capitalFunded: number // money 
        approvedDate: Date
        investedAmount: number // (user input)
        paymentMethod: string
        fundedDate: Date
        investors: number
        status: 'Pending' | 'Expired' | 'Rejected' | 'Funded' | 'Not Funded' | 'Approved'
        createdAt: Date
        expirationDate: Date
    }
}

const CREATEADMINCONTRACT = gql`
  mutation UpdateContract($input: UpdateContractInput!) {
    contract: updateContract(input: $input) {
      _id
    }
  }
`

const ContractPage = (props: ContractPageProps) => {

    const [isSave, setIsSave] = useState(true);
    const sending = useRef(false)

    useEffect(() => {
        if (props.contract.duration) setIsSave(false)
    },[])

    const [approvedDate, setApprovedDate] = useState(props.contract.approvedDate? new Date(props.contract.approvedDate).toLocaleDateString(): '')

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isSave) {
            setIsSave(true);
        } else {
            if (sending.current) return

            // @ts-ignore
            const duration = parseInt(event.target.duration.value);
            // @ts-ignore
            const risk = event.target.risk.value;
            // @ts-ignore
            const myReturn = event.target.return.value;
            // @ts-ignore
            const requiredAmount = parseInt(event.target.requiredAmount.value);
            // @ts-ignore
            const capitalFunded = parseInt(event.target.capitalFunded.value);
            // @ts-ignore
            const nftLink = event.target.nftLink.value;
            // @ts-ignore
            const expirationDate = event.target.expirationDate.value;
            // @ts-ignore
            const status = event.target.status.value;
    
            const input = {
                _id: props.contract._id,
                duration,
                risk,
                return: myReturn,
                requiredAmount,
                capitalFunded,
                nftLink,
                expirationDate,
                status,
            }

            try {
                sending.current = true
                await graphqlReq(CREATEADMINCONTRACT, { input })
                alert('Successfully saved')
                const callbacks = revalidateContract({_id: props.contract._id})
                const { revalidate } = callbacks;
                (async () => {
                    try {
                        await revalidate()
                        await timeout(1000)
                    } catch {
                        alert('An error occurred while update caching, please save it again')
                    }
                })().then(() => {
                    window.location.href = '/contracts'
                })
            } catch (error) {
                return alert('Please check your internet connection then try again')
            } finally {
                sending.current = false
            }
            setIsSave(false);
        }
    }

    return (
        <>
            {/* @ts-ignore */}
            <Breadcrumb pageName="Detailed Information" update='none' />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                {/* <!-- Contract Info --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Contract Info
                            </h3>
                        </div>
                        <div className="p-6.5">

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter contract product name"
                                    readOnly
                                    value={props.contract.product}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Port of Loading
                                    </label>
                                    <input
                                    type="text"
                                    placeholder="Enter port of Loading"
                                    // @ts-ignore
                                    value={props.contract.portOfLoading}
                                    readOnly
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Port of Arrival
                                    </label>
                                    <input
                                    type="text"
                                    placeholder="Enter port of Arrival"
                                    readOnly
                                    // @ts-ignore
                                    value={props.contract.portOfArrival}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-3 block text-black dark:text-white">
                                    Departure date
                                </label>
                                <div className="relative">
                                <input
                                    type="text"
                                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    readOnly
                                    value={new Date(props.contract.departureDate).toLocaleDateString()}
                                />
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Offer Price
                                    </label>
                                    <input
                                    type="number"
                                    placeholder="Enter offer price"
                                    value={props.contract.offerPrice}
                                    readOnly
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Quantity
                                    </label>
                                    <input
                                    type="text"
                                    readOnly
                                    value={props.contract.quantity + " kg"}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Total Value
                                    </label>
                                    <input
                                    type="number"
                                    readOnly
                                    value={props.contract.offerPrice * props.contract.quantity}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Down Payment (%)
                                    </label>
                                    <input
                                    type="number"
                                    placeholder="Enter down payment"
                                    value={props.contract.downPayment}
                                    readOnly
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Arrival (%)
                                    </label>
                                    <input
                                    type="number"
                                    readOnly
                                    value={props.contract.arrival}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Cash against Documents (%)
                                    </label>
                                    <input
                                    type="number"
                                    readOnly
                                    value={props.contract.cashAgainstDocuments}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <textarea
                                    rows={6}
                                    placeholder="Contract Description"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    readOnly
                                    value={props.contract.description}
                                ></textarea>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-3 block text-black dark:text-white">
                                    Created date
                                </label>
                                <div className="relative">
                                <input
                                    type="text"
                                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    readOnly
                                    value={new Date(props.contract.createdAt).toLocaleDateString()}
                                />
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                {props.contract.attachment? '' :'No '} Attached File Exists.
                                {props.contract.attachment? 
                                    <button className="hover:text-primary" onClick={() => window.open(props.contract.attachment, '_blank')}>
                                       <svg
                                        className="fill-current"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                       >
                                        <path
                                        d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                                        fill=""
                                        />
                                        <path
                                        d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                                        fill=""
                                        />
                                       </svg>
                                    </button>
                                    : <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-9">

                        {/* <!-- Current Status --> */}
                        <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark justify-between flex items-center">
                                <h3 className="inline-flex font-medium text-black dark:text-white">
                                    Current Status
                                </h3>
                            </div>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-2/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Capital Funded
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            readOnly
                                            name='capitalFunded'
                                            defaultValue={props.contract.capitalFunded}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            # of investors
                                        </label>
                                        <input
                                        type="number"
                                        value={props.contract.investors? 0: props.contract.investors}
                                        readOnly
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Approved Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            readOnly
                                            value={approvedDate}
                                            name='approvedDate'
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Current Status End --> */}

                        {/* <!-- Admin Management --> */}
                        <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark justify-between flex items-center">
                                <h3 className="inline-flex font-medium text-black dark:text-white">
                                    Admin Management
                                </h3>
                                <button
                                    className="inline-flex items-center justify-center rounded-md bg-meta-3 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                >
                                    {isSave? 'Save': 'Edit'}
                                </button>
                            </div>
                            <div className="p-6.5">

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-2/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Expiration Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            readOnly={!isSave}
                                            defaultValue={new Date(props.contract.expirationDate).toISOString().split('T')[0]}
                                            name='expirationDate'
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Duration (weeks)
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            name='duration'
                                            readOnly={!isSave}
                                            defaultValue={props.contract.duration}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Risk
                                        </label>
                                        <select
                                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                          name='risk'
                                          disabled={!isSave}
                                          defaultValue={props.contract.risk}>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </select>
                                    </div>

                                    <div className="w-full xl:w-2/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Return (%)
                                        </label>
                                        <input
                                        type="number"
                                        required
                                        name='return'
                                        readOnly={!isSave}
                                        defaultValue={props.contract.return}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Status
                                        </label>
                                        <select
                                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                          name='status'
                                          disabled={!isSave}
                                          defaultValue={props.contract.status}>
                                            {/* 'Pending' | 'Expired' | 'Rejected' | 'Funded' | 'Not Funded' | 'Approved' */}
                                            <option value="Pending">Pending</option>
                                            <option value="Expired">Expired</option>
                                            <option value="Rejected">Rejected</option>
                                            <option value="Funded">Funded</option>
                                            <option value="Not Funded">Not Funded</option>
                                            <option value="Approved">Approved</option>
                                        </select>
                                    </div>

                                    <div className="w-full xl:w-2/3">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Required Amount
                                        </label>
                                        <input
                                        type="number"
                                        required
                                        name='requiredAmount'
                                        readOnly={!isSave}
                                        defaultValue={props.contract.requiredAmount}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        NFT Link
                                    </label>
                                    <input
                                        type="text"
                                        name='nftLink'
                                        readOnly={!isSave}
                                        defaultValue={props.contract.nftLink}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <!-- Admin Management End --> */}

                    </div>
                </form>
            </div>
        </>
    )
}

const GET_DATA = gql`
  query ($contractId: String!) {
    contract(_id: $contractId) {
      _id
      approvedDate
      arrival
      attachment
      brandType
      capitalFunded
      cashAgainstDocuments
      certifications
      departureDate
      description {
        en
      }
      downPayment
      duration
      fundedDate
      investedAmount
      measure
      nftLink
      offerPrice
      paymentMethod
      pluType
      portOfArrival
      portOfLoading
      productId
      quantity
      requiredAmount
      return
      risk
      status
      supplierId
      createdAt
      expirationDate

      product {
        name {
            en
        }
      }
    }
  } 
`

export default withAuth(ContractPage, 'admin')

export const getStaticProps: GetStaticProps<ContractPageProps> = async (ctx) => {
    const contractId = ctx.params?.contractId as string

    const { contract } = await graphqlReq(GET_DATA, { contractId })

    if (!contract) {
        return {
        notFound: true,
        revalidate: 60
        }
    }

    return {
        props: {
            contract: {
                ...contract,
                description: contract.description.en,
                product: contract.product.name.en,
                investors: 0,
            }
        },
        revalidate: 60
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

  const paths = contracts.map((contract: any) => ({
    params: { contractId: contract._id },
  }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}