import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { FC, Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { APP_TYPE } from '../constants'
import {
  buyerTypes,
  certifications,
  countries,
  interestTickets,
  marketDestinations,
} from '../data'
import { useGql } from '../hooks'
import { ArrowBackIcon } from '../icons'
import { SignUpInfo } from '../types'
import {
  Button,
  Checkbox,
  Checkboxes,
  Container,
  CreatableSelect,
  GoogleAuthButton,
  Input,
  OrSeparator,
  PageBgColor,
  Paper,
  Radio,
  Select,
} from '../ui'
import { graphqlReq, isGqlErrStatus, makeStyles, setCookie, revalidateUser, timeout } from '../utils'
import { CountrySelect } from './CountrySelect'
import { Navbar } from './Navbar'
import { toast } from 'react-toastify'

const FINALIZE_SIGNUP = gql`
  mutation FinalizeSignup($input: FinalizeSignupInput!) {
    auth: finalizeSignup(input: $input) {
      token

      user {
        _id
        fullName
        role
      }
    }
  }
`

const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    auth: signup(input: $input) {
      token

      user {
        _id
        fullName
        role
      }
    }
  }
`

const GET_PRODUCTS = gql`
  query {
    products {
      _id
      name {
        en
      }
    }
  }
`

const REGISTERED = gql`
  mutation Registered($email: String!) {
    registered(email: $email)
  }
`

export const Signup: FC<SignupProps> = ({
  pendingUserToken,
  defaultFullName,
}) => {
  const styles = useStyles({})

  const [finalStep, setFinalStep] = useState(false)
  const sending = useRef(false)

  const { data: products } = useGql(GET_PRODUCTS, {}, true, (data: any) => {
    const result: string[] = []

    data.products.forEach((product: any) => {
      if (!result.includes(product.name.en)) {
        result.push(product.name.en)
      }
    })

    return result
  })

  const productsOptions = useMemo(
    () =>
      products?.map((product) => ({ label: product, value: product })) ?? [],
    [products]
  )

  const buyerTypesOptions = useMemo(
    () =>
      buyerTypes.map((buyerType) => ({
        label: buyerType,
        value: buyerType,
      })),
    []
  )

  const interestTicketsOptions = useMemo(
    () =>
      interestTickets.map((interestTicket) => ({
        label: interestTicket,
        value: interestTicket,
      })),
    [interestTickets]
  )

  const countriesOptions = useMemo(
    () =>
      countries.map((country) => ({
        label: country.name,
        value: country.code,
      })),
    [countries]
  )

  const marketDestinationsOptions = useMemo(
    () =>
      marketDestinations.map((destination) => ({
        label: destination,
        value: destination,
      })),
    [marketDestinations]
  )

  const { control, handleSubmit, setValue } = useForm<SignUpInfo>({
    defaultValues: {
      fullName: defaultFullName ?? '',
      companyName: '',
      email: '',
      password: '',
      country: 'US',
      phone: '',
      website: '',
      ...(APP_TYPE === 'investment'
        ? {
            role: 'investor',
            commercialInfo: {
              investorSize: '',
              address: '',
              interestTicket: '',
              additionalNotes: '',
            },
          }
        : {}),
    },
  })

  useLayoutEffect(() => {
    if (finalStep) window.scrollTo(0, 0)
  }, [finalStep])

  const onSubmit = handleSubmit(async (data) => {
    if (sending.current) return

    if (data.phone.length < 6) {
       toast('Please enter a valid phone number');
       return
    }

    const { email, password, ...info } = data

    if (!finalStep) {
      try {
        sending.current = true

        const { registered } = await graphqlReq(REGISTERED, { email })

        if (registered) {
          if (APP_TYPE === 'admin') {
             toast('the account is already registered, please use another email');
             return
          } else {
             toast('the account is already registered, please login');
             return
          }
        }

        if (role !== 'admin') {
          sending.current = false
          return setFinalStep(true)
        }
      } catch {
         toast('Please check your internet connection then try again');
         sending.current = false
         return
      } finally {
        sending.current = false
      }
    }

    if (data.role === 'buyer') {
      // @ts-ignore
      const cInfo = data.commercialInfo

      if (cInfo.buyerType.length === 0)
         toast('Please input the buyer type');
         return

      if (cInfo.fulfillmentProducts.length === 0)
         toast('Please input the fulfillment products');
         return

      if (cInfo.fulfillmentCountries.length === 0)
         toast('Please input the fulfillment countries');
         return

      if (cInfo.marketDestinations.length === 0)
         toast('Please input the market destinations');
         return
    } else if (data.role === 'seller') {
      // @ts-ignore
      const cInfo = data.commercialInfo

      if (cInfo.fulfillmentProducts.length === 0)
         toast('Please input the fulfillment products');
         return

      if (cInfo.certifications.length === 0)
         toast('Please select one certification at least');
         return
    } else if (data.role === 'investor') {
      // @ts-ignore
      const cInfo = data.commercialInfo

      if (!cInfo.interestTicket)
         toast('Please input the ticket of interest');
         return
    }

    const mutation = pendingUserToken ? FINALIZE_SIGNUP : SIGNUP

    const input = pendingUserToken
      ? {
          pendingUserToken,
          ...info,
        }
      : { email, password, ...info }

    try {
      sending.current = true

      const {
        auth: { token, user },
      } = await graphqlReq(mutation, { input })

      const callbacks = revalidateUser(
        {
          _id: user._id
        },
        'create'
      )
      const { revalidate } = callbacks;
      (async () => {
        try {
          await revalidate()
          await timeout(1000)
        } catch {
          toast('An error occurred while update caching, please save it again')
        }
      })().then(() => {
        if (APP_TYPE !== 'admin') {
          const YEAR = 1000 * 60 * 60 * 24 * 365
  
          const expireAt = new Date(Date.now() + YEAR)
  
          setCookie(`${APP_TYPE}_token`, token, expireAt)
          localStorage.setItem(`${APP_TYPE}_user`, JSON.stringify(user))
          sending.current = false
          window.location.href = '/'
        } else {
           toast('successfully created');
           sending.current = false
           return
        }
      })      
    } catch (e) {
      if (isGqlErrStatus(e, 409)) {
        toast('the account is already registered, please login')
      } else {
         toast('Please check your internet connection then try again');
         sending.current = false
         return
      }
    } finally {
      sending.current = false
    }
  })

  const handleRoleChange = (role: SignUpInfo['role']) => {
    if (role === 'buyer') {
      setValue('commercialInfo', {
        buyerType: [],
        fulfillmentProducts: [],
        fulfillmentCountries: [],
        marketDestinations: [],
        annualImportVolume: '',
      })
    } else if (role === 'seller') {
      setValue('commercialInfo', {
        fulfillmentProducts: [],
        ownsFields: false,
        ownsPackingHouse: false,
        availableVolume: '',
        fobExportPerYear: '',
        certifications: [],
      })
    }
  }

  const role = useWatch({ control, name: 'role' })

  let commercialInfo

  if (role === 'buyer') {
    commercialInfo = (
      <Fragment key="buyer">
        <Select
          style={{ marginBottom: 16 }}
          control={control}
          label="Buyer Type"
          placeholder=""
          name="commercialInfo.buyerType"
          options={buyerTypesOptions}
          isMulti
          required
        />

        <CreatableSelect
          style={{ marginBottom: 16 }}
          control={control}
          label="Fulfillment Products"
          placeholder=""
          name="commercialInfo.fulfillmentProducts"
          options={productsOptions}
          isMulti
          required
        />

        <Select
          style={{ marginBottom: 16 }}
          control={control}
          label="Fulfillment Countries"
          placeholder=""
          name="commercialInfo.fulfillmentCountries"
          options={countriesOptions}
          isMulti
          required
        />

        <Select
          style={{ marginBottom: 16 }}
          control={control}
          label="Market Destinations"
          placeholder=""
          name="commercialInfo.marketDestinations"
          options={marketDestinationsOptions}
          isMulti
          required
        />

        <Input
          type="text"
          label="Annual Import Volume"
          name="commercialInfo.annualImportVolume"
          control={control}
          required
        />
      </Fragment>
    )
  } else if (role === 'seller') {
    commercialInfo = (
      <Fragment key="seller">
        <CreatableSelect
          style={{ marginBottom: 16 }}
          control={control}
          label="Fulfillment Products"
          placeholder=""
          name="commercialInfo.fulfillmentProducts"
          options={productsOptions}
          isMulti
          required
        />

        <Checkbox
          style={{ display: 'flex', marginBottom: 16 }}
          label="Owns Fields?"
          name="commercialInfo.ownsFields"
          control={control}
        />

        <Checkbox
          style={{ display: 'flex', marginBottom: 16 }}
          label="Owns Packing House?"
          name="commercialInfo.ownsPackingHouse"
          control={control}
        />

        <Input
          style={{ marginBottom: 16 }}
          type="text"
          label="Available Volume"
          name="commercialInfo.availableVolume"
          control={control}
        />

        <Input
          style={{ marginBottom: 16 }}
          type="text"
          label="FOB$ Exports / year"
          name="commercialInfo.fobExportPerYear"
          control={control}
        />

        <Checkboxes
          label="Certifications"
          name="commercialInfo.certifications"
          othersName="commercialInfo.othersCertifications"
          control={control}
          options={certifications}
        />
      </Fragment>
    )
  } else if (role === 'investor') {
    commercialInfo = (
      <Fragment key="investor">
        <Input
          style={{ marginBottom: 16 }}
          type="text"
          label="Investor size"
          name="commercialInfo.investorSize"
          control={control}
          required
        />

        <Input
          style={{ marginBottom: 16 }}
          type="text"
          label="Address"
          name="commercialInfo.address"
          control={control}
          required
        />

        <Select
          style={{ marginBottom: 16 }}
          control={control}
          label="Ticket of Interest"
          placeholder=""
          name="commercialInfo.interestTicket"
          options={interestTicketsOptions}
          required
        />

        <Input
          style={{ marginBottom: 16 }}
          type="text"
          label="Additional Notes"
          name="commercialInfo.additionalNotes"
          control={control}
          required
          multiline
          rows={3}
        />
      </Fragment>
    )
  }

  return (
    <>
      <PageBgColor bgColor="#f8f8f8" />

      <Navbar />

      <div style={{ height: 48 }} />

      <Container maxWidth="xs">
        {finalStep && (
          <button css={styles.back} onClick={() => setFinalStep(false)}>
            <ArrowBackIcon style={{ marginRight: 6, fontSize: 20 }} />
            <span>Back</span>
          </button>
        )}

        <Paper style={{ marginBottom: 16 }}>
          <form onSubmit={onSubmit}>
            {!finalStep && (
              <>
                <h2 css={styles.heading}>
                  {pendingUserToken ? 'Finalize Sign Up' : APP_TYPE === 'admin' ? 'Create New User' : 'Sign Up'}
                </h2>

                {!pendingUserToken && APP_TYPE !== 'admin' && (
                  <>
                    <GoogleAuthButton
                      style={{ marginBottom: 16 }}
                      href={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google/${APP_TYPE}`}
                    />

                    <OrSeparator style={{ marginBottom: 12 }} />
                  </>
                )}
                <Input
                  style={{ marginBottom: 16 }}
                  type="text"
                  label="Full Name"
                  name="fullName"
                  control={control}
                  required
                  minLength={2}
                />
                <Input
                  style={{ marginBottom: 16 }}
                  type="text"
                  label="Company Name"
                  name="companyName"
                  control={control}
                  required
                  minLength={2}
                />
                <CountrySelect
                  style={{ marginBottom: 16 }}
                  control={control}
                  name="country"
                />
                {!pendingUserToken && (
                  <>
                    <Input
                      style={{ marginBottom: 16 }}
                      type="email"
                      label="Email"
                      name="email"
                      control={control}
                      required
                    />

                    <Input
                      style={{ marginBottom: 16 }}
                      type="password"
                      label="Password"
                      name="password"
                      control={control}
                      required
                    />
                  </>
                )}
                <Input
                  style={{ marginBottom: 16 }}
                  label="Phone"
                  type="tel"
                  name="phone"
                  required
                  control={control}
                />

                <Input
                  style={{ marginBottom: 16 }}
                  type="text"
                  label="Website"
                  name="website"
                  control={control}
                />

                {APP_TYPE === 'fulfillment' && (
                  <>
                    <p style={{ fontSize: 14, marginBottom: 8 }}>Role</p>
                    <div style={{ marginBottom: 24 }}>
                      <Radio
                        style={{ marginRight: 16 }}
                        label="Buyer"
                        name="role"
                        control={control}
                        type="radio"
                        value="buyer"
                        required
                        onChange={(e) =>
                          handleRoleChange(e.target.value as SignUpInfo['role'])
                        }
                      />

                      {/* <Radio
                       style={{ marginRight: 16 }}
                        label="Supplier"
                        name="role"
                        control={control}
                        type="radio"
                        value="seller"
                        required
                        onChange={(e) =>
                          handleRoleChange(e.target.value as SignUpInfo['role'])
                        }
                      /> */}
                      <Radio
                        label="Investor"
                        name="role"
                        control={control}
                        type="radio"
                        value="investor"
                        required
                        onChange={(e) =>
                          handleRoleChange(e.target.value as SignUpInfo['role'])
                        }
                      />
                    </div>
                  </>
                )}

                {APP_TYPE === 'admin' && (
                  <>
                    <p style={{ fontSize: 14, marginBottom: 8 }}>Role</p>
                    <div style={{ marginBottom: 24 }}>
                      <Radio
                        style={{ marginRight: 16 }}
                        label="Admin"
                        name="role"
                        control={control}
                        type="radio"
                        value="admin"
                        required
                        onChange={(e) =>
                          handleRoleChange(e.target.value as SignUpInfo['role'])
                        }
                      />

                      <Radio
                        style={{ marginRight: 16 }}
                        label="Buyer"
                        name="role"
                        control={control}
                        type="radio"
                        value="buyer"
                        required
                        onChange={(e) =>
                          handleRoleChange(e.target.value as SignUpInfo['role'])
                        }
                      />

                      <Radio
                        style={{ marginRight: 16 }}
                        label="Supplier"
                        name="role"
                        control={control}
                        type="radio"
                        value="seller"
                        required
                        onChange={(e) =>
                          handleRoleChange(e.target.value as SignUpInfo['role'])
                        }
                      />

                      <Radio
                        label="Investor"
                        name="role"
                        control={control}
                        type="radio"
                        value="investor"
                        required
                        onChange={(e) =>
                          handleRoleChange(e.target.value as SignUpInfo['role'])
                        }
                      />
                    </div>
                  </>
                )}

                <Button type="submit" fullWidth fullRounded>
                  {role === 'admin' ? 'Create Admin' : 'Next'}
                </Button>
              </>
            )}

            {finalStep && (
              <>
                <h2 css={styles.heading}>Commercial Info</h2>

                <div style={{ marginBottom: 24 }}>{commercialInfo}</div>

                <Button type="submit" fullWidth fullRounded>
                  {APP_TYPE === 'admin' ? 'Create ' + role?.replace(/^\w/, (firstLetter) => firstLetter.toUpperCase()) : 'Sign Up'}
                </Button>
              </>
            )}
          </form>
        </Paper>
      </Container>

      <div style={{ height: 48 }} />
    </>
  )
}

interface SignupProps {
  pendingUserToken?: string
  defaultFullName?: string
}

const useStyles = makeStyles(() => ({
  heading: {
    fontWeight: '700',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    textAlign: 'center',
    marginBottom: 16,
  },
  back: {
    color: '#000',
    textDecoration: 'none',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    background: 'transparent',
    padding: 0,
    fontFamily: 'inherit',
    border: 'none',
    cursor: 'pointer',
  },
}))
