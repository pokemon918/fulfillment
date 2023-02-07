import OrSeparator from '@/ui/OrSeparator'
import Input from '@/ui/Input'
import { gql } from 'graphql-request'
import graphqlReq, { isGqlErrStatus } from '@/utils/graphqlReq'
import { useForm, useWatch } from 'react-hook-form'
import Paper from '@/ui/Paper'
import Container from '@/ui/Container'
import GoogleAuthButton from '@/ui/GoogleAuthButton'
import Button from '@/ui/Button'
import makeStyles from '@/utils/makeStyles'
import StyledLink from '@/ui/StyledLink'
import Navbar from '@/components/Navbar'
import PageBgColor from '@/ui/PageBgColor'
import { setCookie } from '@/utils/cookies'
import CountrySelector from '@/components/CountrySelect'
import Radio from '@/ui/Radio'
import { useRouter } from 'next/router'
import { SignUpInfo } from '@/types/signup'
import Select from '@/ui/Select'
import CreatableSelect from '@/ui/CreatableSelect'
import { GetServerSideProps } from 'next'
import { FC, Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { buyerTypes, certifications, marketDestinations } from '@/data/signup'
import countries from '@/data/countries'
import Checkbox from '@/ui/Checkbox'
import Checkboxes from '@/ui/Checkboxes'
import Link from 'next/link'
import ArrowBackIcon from '@/icons/ArrowBackIcon'

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

const REGISTERED = gql`
  mutation Registered($email: String!) {
    registered(email: $email)
  }
`

const SignUp: FC<SignUpProps> = ({ products }) => {
  const styles = useStyles({})

  const { query } = useRouter()

  const pendingUserToken = query.pendingUserToken as string | undefined
  const defaultFullName = query.fullName as string | undefined
  const [finalStep, setFinalStep] = useState(false)
  const sending = useRef(false)

  const productsOptions = useMemo(
    () => products.map((product) => ({ label: product, value: product })),
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
    },
  })

  useLayoutEffect(() => {
    if (finalStep) window.scrollTo(0, 0)
  }, [finalStep])

  const onSubmit = handleSubmit(async (data) => {
    if (sending.current) return

    if (data.phone.length < 6) {
      return alert('Please enter a valid phone number')
    }

    const { email, password, ...info } = data

    if (!finalStep) {
      try {
        sending.current = true

        const { registered } = await graphqlReq(REGISTERED, { email })

        if (registered) {
          return alert('the account is already registered, please login')
        }

        return setFinalStep(true)
      } catch {
        return alert('Please check your internet connection then try again')
      } finally {
        sending.current = false
      }
    }

    if (data.role === 'buyer') {
      const cInfo = data.commercialInfo

      if (cInfo.buyerType.length === 0)
        return alert('Please input the buyer type')

      if (cInfo.fulfillmentProducts.length === 0)
        return alert('Please input the fulfillment products')

      if (cInfo.fulfillmentCountries.length === 0)
        return alert('Please input the fulfillment countries')

      if (cInfo.marketDestinations.length === 0)
        return alert('Please input the market destinations')
    } else if (data.role === 'seller') {
      const cInfo = data.commercialInfo

      if (cInfo.fulfillmentProducts.length === 0)
        return alert('Please input the fulfillment products')

      if (cInfo.certifications.length === 0)
        return alert('Please select one certification at least')
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

      const YEAR = 1000 * 60 * 60 * 24 * 365

      const expireAt = new Date(Date.now() + YEAR)

      setCookie('fulfillment_token', token, expireAt)

      window.location.href = '/'
    } catch (e) {
      if (isGqlErrStatus(e, 409)) {
        alert('the account is already registered, please login')
      } else {
        return alert('Please check your internet connection then try again')
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
                  {pendingUserToken ? 'Finalize Sign Up' : 'Sign Up'}
                </h2>

                {!pendingUserToken && (
                  <>
                    <GoogleAuthButton
                      style={{ marginBottom: 16 }}
                      href={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google`}
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
                <CountrySelector
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

                <p style={{ fontSize: 14, marginBottom: 8 }}>Access Type</p>
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

                  <Radio
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
                </div>

                <Button type="submit" fullWidth fullRounded>
                  Next
                </Button>
              </>
            )}

            {finalStep && (
              <>
                <h2 css={styles.heading}>Commercial Info</h2>

                <div style={{ marginBottom: 24 }}>{commercialInfo}</div>

                <Button type="submit" fullWidth fullRounded>
                  Sign Up
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

interface SignUpProps {
  products: string[]
}

const GET_DATA = gql`
  query {
    products {
      _id
      name {
        en
      }
    }
  }
`

export const getServerSideProps: GetServerSideProps<SignUpProps> = async () => {
  const data = await graphqlReq(GET_DATA, {}, {})

  const products: string[] = []

  data.products.forEach((product: any) => {
    if (!products.includes(product.name.en)) {
      products.push(product.name.en)
    }
  })

  return {
    props: {
      products,
    },
  }
}

export default SignUp
