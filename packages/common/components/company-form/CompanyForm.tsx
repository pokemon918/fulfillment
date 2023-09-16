import { useForm } from 'react-hook-form'
import { Button, Select, Input, Checkbox, CreatableSelectCompany as CreatableSelect, Dialog } from '../../ui'
import { gql } from 'graphql-request'
import { FC, useRef, useState, useEffect } from 'react'
import { CountrySelect } from '../CountrySelect'
import { LangField, BuyerCompany, SupplierCompany } from '../../types'
import {
  graphqlReq,
  makeStyles,
  revalidateCompany,
  timeout
} from '../../utils'
import useHistoryRef from '../../hooks/useHistoryRef'
import { NoSSR } from "../NoSSR";
import { CloseIcon } from "../../icons";
import { ProductForm, ProductFormValue } from "../product-form/ProductForm";
import { theme } from "../../theme";
import { SharedProvider } from "../../contexts";
import { toast } from 'react-toastify'
import { useUser } from "../../hooks";

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

const CREATE_COMPANY = gql`
  mutation CreateCompany($input: CreateCompanyInput!) {
    company: createCompany(input: $input) {
      _id
    }
  }
`

const UPDATE_COMPANY = gql`
  mutation UpdateCompany($input: UpdateCompanyInput!) {
    company: updateCompany(input: $input) {
      _id
    }
  }
`

const CREATE_LOG = gql`
  mutation createLog($input: CreateLogInput!) {
    createLog(input: $input)  {
      _id
    }
  }
`

export interface BuyerCompanyFormValue extends Omit<BuyerCompany, 'name'> {
  name: LangField
}

export interface SupplierCompanyFormValue extends Omit<SupplierCompany, 'name'> {
  name: LangField
}

interface CompanyFormProps {
  defaultValues: BuyerCompanyFormValue | SupplierCompanyFormValue
  actionType: 'create' | 'update'
}

const HARVESTING_MONTHS = [
  { value: 0, label: 'January' },
  { value: 1, label: 'February' },
  { value: 2, label: 'March' },
  { value: 3, label: 'April' },
  { value: 4, label: 'May' },
  { value: 5, label: 'June' },
  { value: 6, label: 'July' },
  { value: 7, label: 'August' },
  { value: 8, label: 'September' },
  { value: 9, label: 'October' },
  { value: 10, label: 'November' },
  { value: 11, label: 'December' },
]

export const CompanyForm: FC<CompanyFormProps> = ({
  defaultValues,
  actionType,
}) => {

  const [myName, setMyName] = useState('');
  const user = useUser()

  const updateName = (newValue: string) => {
    setMyName(newValue);
  };

  const [id, setId] = useState('');

  const updateId = (newValue: string) => {
    setId(newValue);
  };
  
  let productDefaultValues: ProductFormValue = {
    name: { en: '', es: '' },
    country: 'PE',
    hsCode: { en: '', es: '' },
    price: '',
    bigTitle: { en: '', es: '' },
    description: { en: '', es: '' },
    offerPrices: [],
    thumbnail: '',
    gallery: [],
    specs: [],
    availableSpecs: { en: '', es: '' },
    harvestingMonths: [],
    traces: [
      {
        title: { en: 'Field', es: '' },
        description: { en: '', es: '' },
        gallery: [],
      },
      {
        title: { en: 'Packing', es: '' },
        description: { en: '', es: '' },
        gallery: [],
      },
      {
        title: { en: 'Final Product', es: '' },
        description: { en: '', es: '' },
        gallery: [],
      },
    ],
    certifications: [],
    isSustainable: false,
  }
  const typeOfCompany = "POC" in defaultValues ? "Buyer" : "PIC" in defaultValues ? "Supplier" : ""
  if (!typeOfCompany) return (<></>)
  let companyTypeProperty = typeOfCompany === "Buyer" ? [{value:'Importer', label:'Importer'}, {value:'Wholesaler', label:'Wholesaler'}] : [{value:'Exporter', label: 'Exporter'}, {value:'Grower', label: 'Grower'}]
  companyTypeProperty = [...companyTypeProperty, ...([{value:'Processor', label: 'Processor'}, {value:'Trader', label: 'Trader'}])]
  
  let certificatioinOptions = [{value:'GlobalGAP', label:'GlobalGAP'}, {value:'Organic', label:'Organic'}, {value:'Fair Trade', label: 'Fair Trade'}, {value:'GRASP / SMETA', label: 'GRASP / SMETA'}]
  if (actionType === "update") {
    // @ts-ignore
    const temp = defaultValues.certifications.filter(certification => !certificatioinOptions.includes(certification))
    for (let i = 0; i < temp.length; i++) {
      certificatioinOptions.push({value: temp[i], label: temp[i]})
    }
  }
  
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

      setLoading(false)
    })()
  }, [])

  const companyId = defaultValues._id
  // @ts-ignore
  const productIdsRef = useHistoryRef(typeOfCompany === "Buyer" ? defaultValues.interestProductIds : defaultValues.productIds)
  const [finalStep, setFinalStep] = useState(false)

  const styles = useStyles({})
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState<false | { _id: string }>(false)

  const [openCreateNewProduct, setOpenCreateNewProduct] = useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      _id: defaultValues._id,
      name: defaultValues.name,
      TaxID: defaultValues.TaxID,
      size: defaultValues.size,
      Country: defaultValues.Country,
      Phone: defaultValues.Phone,
      email: defaultValues.email,
      website: defaultValues.website,
      type: defaultValues.type,
      certifications: defaultValues.certifications,
      preferredPaymentTerm: defaultValues.preferredPaymentTerm,
      ...(typeOfCompany === "Buyer" ? {
        // @ts-ignore
        POC: defaultValues.POC,
        // @ts-ignore
        interestProductIds: defaultValues.interestProductIds,
        // @ts-ignore
        yearImportVolume: defaultValues.yearImportVolume,
        // @ts-ignore
        yearImportCFR: defaultValues.yearImportCFR,
        // @ts-ignore
        fulfillmentOrigin: defaultValues.fulfillmentOrigin,
        // @ts-ignore
        financialScore: defaultValues.financialScore
      } : {
        // @ts-ignore
        PIC: defaultValues.PIC,
        // @ts-ignore
        productIds: defaultValues.productIds,
        // @ts-ignore
        yearExportVolume: defaultValues.yearExportVolume,
        // @ts-ignore
        yearFOBExport: defaultValues.yearFOBExport,
        // @ts-ignore
        seasonality: defaultValues.seasonality,
        // @ts-ignore
        mainMarket: defaultValues.mainMarket,
        // @ts-ignore
        ownField: defaultValues.ownField,
        // @ts-ignore
        ownPackingHouse: defaultValues.ownPackingHouse,
        // @ts-ignore
        industryRef: defaultValues.industryRef
      })
    }
  })

  const [loading, setLoading] = useState(true)

  const onSubmit = handleSubmit((company) => {
    if (!finalStep) {
      setFinalStep(true)
      return
    }
    
    const input = {
      name: company.name,
      TaxID: company.TaxID,
      size: company.size,
      country: company.Country,
      phone: company.Phone,
      email: company.email,
      website: company.website,
      type: company.type,
      status: "pending",
      // @ts-ignore
      pic_poc: (typeOfCompany === "Buyer" ? company.POC : company.PIC),
      // @ts-ignore
      productIds: (typeOfCompany === "Buyer" ? company.interestProductIds : company.productIds),
      // @ts-ignore
      volume: (typeOfCompany === "Buyer" ? Number(company.yearImportVolume) : Number(company.yearExportVolume)),
      // @ts-ignore
      cfr_fob: (typeOfCompany === "Buyer" ? Number(company.yearImportCFR) : Number(company.yearFOBExport)),
      preferredPaymentTerm: company.preferredPaymentTerm,
      // @ts-ignore
      market: (typeOfCompany === "Buyer" ? company.fulfillmentOrigin : company.mainMarket),
      // @ts-ignore
      seasonality: (typeOfCompany === "Buyer" ? [] : company.seasonality.map((month: any) => Number(month))),
      certifications: company.certifications,
      // @ts-ignore
      ownField: (typeOfCompany === "Buyer" ? false : company.ownField),
      // @ts-ignore
      ownPackingHouse: (typeOfCompany === "Buyer" ? false : company.ownPackingHouse),
      // @ts-ignore
      financialScore: (typeOfCompany === "Buyer" ? Number(company.financialScore) : 0),
      // @ts-ignore
      industryRef: (typeOfCompany === "Buyer" ? "" : company.industryRef),
      companyType: typeOfCompany
    }

    if (actionType === "update") {
      // @ts-ignore
      input._id = defaultValues._id
    }
    
    setSaving(true)

    graphqlReq(actionType === 'update' ? UPDATE_COMPANY : CREATE_COMPANY, {
      input
    })
      .then(({ company: { _id, name }}) => {
        toast(`Successfully ` + actionType + `d`)
        setSaving(false)
        graphqlReq(CREATE_LOG, {
          input: {
            "userId": user?._id,
            "description": {
              "en": actionType === 'update' ? "Update company "+name.en : "Create company "+name.en,
              "es": ""
            }
          }
        })
        const callbacks = revalidateCompany(
          {
            _id: _id
          },
          actionType
        )
        const { paths, revalidate } = callbacks;
        (async () => {
          try {
            await revalidate()
            await timeout(1000)
          } catch {
            toast('An error occurred while update caching, please save it again')
          }
        })().then(() => {
        if (typeOfCompany === "Buyer") {
          window.location.href = '/company/buyers'
        } else {
          window.location.href = '/company/suppliers'
        }})
      })
      .catch(() => {
        toast('An error occurred, please try again.')
        setSaving(false)
      })
      .finally(() => setSaving(false))
  })

  const successId = useRef('')
  const options_ref = useRef([])

  const onCreateOption = ({newOption, optionsRef, onChange, value}: any) => {
    updateName(newOption)
    setOpenCreateNewProduct(true);
  }


  return (
    <SharedProvider value={{myName, updateName, id, updateId}}>
      <div>
        <h1 style={{ fontSize: 25, marginBottom: '2rem' }}>
          {actionType === 'create' ? 'Create' : 'Update'} Company
        </h1>

        <h2 style={{ marginBottom: '1rem' }}>
          {finalStep ? 'Commercial' : 'Basic'} Information
        </h2>

        <form onSubmit={onSubmit}>
          {!finalStep && <>
            <Input
              style={{ marginBottom: '1.5rem' }}
              label="Name"
              placeholder="Name"
              control={control}
              name="name.en"
              required
            />

            <Input
              style={{ marginBottom: '1.5rem' }}
              label="TaxID"
              placeholder="TaxID"
              control={control}
              name="TaxID"
            />

            <Select
              style={{ marginBottom: '1.5rem' }}
              label="Company Size"
              placeholder="Number of employees"
              name="size"
              control={control}
              options={[{value:'1-50', label:'1-50'}, {value:'50-100', label:'50-100'}, {value:'100-250', label: '100-250'}, {value:'more than 250', label: 'more than 250'}]}
            />

            <CountrySelect
              style={{ marginBottom: '1.5rem' }}
              control={control}
              name="Country"
            />

            {typeOfCompany === "Buyer" ? <Input
              style={{ marginBottom: '1.5rem' }}
              label="POC"
              placeholder="POC"
              control={control}
              name="POC"
              required
            /> : <Input
              style={{ marginBottom: '1.5rem' }}
              label="PIC"
              placeholder="PIC"
              control={control}
              name="PIC"
              required
            />}

            <Input
              style={{ marginBottom: '1.5em' }}
              label="Phone"
              type="tel"
              name="Phone"
              required
              control={control}
            />

            <Input
              style={{ marginBottom: '1.5rem' }}
              label="Email"
              type='email'
              placeholder="Email"
              control={control}
              name="email"
              required
            />

            <Input
              style={{ marginBottom: '1.5rem' }}
              label="Website"
              placeholder="Website"
              control={control}
              name="website"
            />

            <Select
              style={{ marginBottom: '1.5rem' }}
              label="Type"
              placeholder="Type"
              name="type"
              control={control}
              options={companyTypeProperty}
            />
          </>}

          {finalStep && <>
            {typeOfCompany === "Buyer" ? <CreatableSelect
              style={{ marginBottom: '1.5rem' }}
              label="Interest Products"
              placeholder="Interest Products"
              name="interestProductIds"
              control={control}
              options={products}
              isMulti
              onCreateOption={onCreateOption}
            /> : <CreatableSelect
              style={{ marginBottom: '1.5rem' }}
              label="Products"
              placeholder="Products"
              name="productIds"
              control={control}
              options={products}
              isMulti
              onCreateOption={onCreateOption}
            />}

            {typeOfCompany === "Buyer" ? <Input
              style={{ marginBottom: '1.5rem' }}
              label="Yearly Import Volume (tm/ctn) x product"
              placeholder="Yearly Import Volume (tm/ctn) x product"
              type='number'
              control={control}
              name="yearImportVolume"
              required
            /> : <Input
              style={{ marginBottom: '1.5rem' }}
              label="Yearly Volume (tm/ctn) x product"
              placeholder="Yearly Volume (tm/ctn) x product"
              type='number'
              control={control}
              name="yearExportVolume"
              required
            />}

            {typeOfCompany === "Buyer" ? <Input
              style={{ marginBottom: '1.5rem' }}
              label="Yearly CFR Import (USD) x product"
              placeholder="Yearly CFR Import (USD) x product"
              type='number'
              control={control}
              name="yearImportCFR"
              required
            /> : <Input
              style={{ marginBottom: '1.5rem' }}
              label="Yearly FOB Export (USD) x product"
              placeholder="Yearly FOB Export (USD) x product"
              type='number'
              control={control}
              name="yearFOBExport"
              required
            />}

            <Input
              style={{ marginBottom: '1.5rem' }}
              label="Preferred PaymentTerm"
              placeholder="Preferred PaymentTerm"
              control={control}
              name="preferredPaymentTerm"
            />
            
            {typeOfCompany === "Supplier" ? <Select
              style={{ marginBottom: '1.5rem' }}
              label="Seasonality"
              placeholder="Seasonality"
              name="seasonality"
              control={control}
              options={HARVESTING_MONTHS as any}
              isMulti
            /> : <></>}

            {typeOfCompany === "Buyer" ? <Select
              style={{ marginBottom: '1.5rem' }}
              label="Fulfillment origins (continents)"
              placeholder="Fulfillment origins (continents)"
              control={control}
              name="fulfillmentOrigin"
              options={[{value:'South and Central America', label:'South and Central America'}, {value:'Africa', label:'Africa'}, {value:'Europe', label: 'Europe'}, {value:'Asia', label: 'Asia'}]}
            /> : <Select
              style={{ marginBottom: '1.5rem' }}
              label="Main markets (continents)"
              placeholder="Main markets (continents)"
              control={control}
              name="mainMarket"
              options={[{value:'North America', label:'North America'}, {value:'Europe', label: 'Europe'}, {value:'Asia', label: 'Asia'}]}
            />}
            
            <CreatableSelect
              style={{ marginBottom: '1.5rem' }}
              label="Certifications"
              placeholder="Certifications"
              name="certifications"
              control={control}
              options={certificatioinOptions}
              isMulti
            />

            {typeOfCompany === "Buyer" ? <Input
              style={{ marginBottom: '1.5rem' }}
              label="Financial Score"
              placeholder="Financial Score"
              type='number'
              control={control}
              name="financialScore"
            /> : <></>}

            {typeOfCompany === "Supplier" ? <>
              <Checkbox
                style={{ display: 'flex', marginBottom: 16 }}
                label="Owns Fields?"
                name="ownField"
                control={control}
              />

              <Checkbox
                style={{ display: 'flex', marginBottom: 16 }}
                label="Owns Packing House?"
                name="ownPackingHouse"
                control={control}
              /> </> : <></>}

            {typeOfCompany === "Supplier" ? <Input
              style={{ marginBottom: '1.5rem' }}
              label="Industry references"
              placeholder="Industry references"
              control={control}
              name="industryRef"
            /> : <></>}
          </>}
          <div css={styles.footer}>
            <div>
              {finalStep && <Button onClick={() => setFinalStep(false)}>
                Back
              </Button>}
            </div>
            <div>
              <Button type="submit" disabled={saving}>
                {!finalStep ? 'Next' : actionType === 'create' ? 'Create' : 'Save'}
              </Button>
            </div>
          </div>
        </form>

        <div style={{ padding: 100 }} />
        <NoSSR>
          <div  css={{ display: openCreateNewProduct ? undefined : 'none' }}>
          <Dialog css={styles.dialog}>
            <button css={styles.dialogBtn} onClick={() => {
                setOpenCreateNewProduct(false);
                updateName("")
              }}>
              <CloseIcon />
            </button>
            {myName && <ProductForm defaultValues={{...productDefaultValues, name: { en: myName, es: ''}}} actionType="create" isDialog successId={successId} dialogAction={() => {
              setOpenCreateNewProduct(false);
              updateId(successId.current)
            }} />}
          </Dialog>
          </div>
        </NoSSR>

      </div>
    </SharedProvider>
  )
}

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 20,
    fontWeight: 700,
  },
  trace: {
    border: '1px solid #eee',
    borderRadius: 8,
  },
  footer: {
    justifyContent: 'space-between',
    display: 'flex',
    marginTop: '2rem',
  },
  deleteBtnSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  dialog: {
    position: 'relative',
    fontFamily: theme.fonts.secondary,
    backgroundColor: 'white',
    padding: '50px 30px 0px',
    marginTop: '150px'
  },
  dialogBtn: {
    position: 'absolute',
    left: 8,
    top: 6,
    display: 'inline-flex',
    border: 'none',
    padding: 6,
    background: 'transparent',
    cursor: 'pointer',
  },
}))
