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
import Select from '@/components/Select'
import CreatableSelect from '@/components/CreatableSelect'
import { GetServerSideProps } from 'next'
import { FC, useMemo } from 'react'
import { buyerTypes, certifications } from '@/data/singup'
import countries from '@/data/countries'
import Checkbox from '@/ui/Checkbox'
import Checkboxes from '@/ui/Checkboxes'

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

const SignUp: FC<SignUpProps> = ({ products }) => {
  const styles = useStyles({})

  const { query } = useRouter()

  const pendingUserToken = query.pendingUserToken as string | undefined
  const defaultFullName = query.fullName as string | undefined

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

  const { control, handleSubmit, setValue, getValues, register } =
    useForm<SignUpInfo>({
      defaultValues: {
        fullName: defaultFullName ?? '',
        companyName: '',
        email: '',
        password: '',
        country: 'US',
        phone: '',
      },
    })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const mutation = pendingUserToken ? FINALIZE_SIGNUP : SIGNUP

      const { email, password, ...info } = data

      const input = pendingUserToken
        ? {
            pendingUserToken,
            ...info,
          }
        : { email, password, ...info }

      try {
        const {
          auth: { token, user },
        } = await graphqlReq(mutation, { input })

        const YEAR = 1000 * 60 * 60 * 24 * 365

        const expireAt = new Date(Date.now() + YEAR)

        setCookie('token', token, expireAt)

        setCookie(
          'token_user',
          encodeURIComponent(JSON.stringify(user)),
          expireAt
        )

        window.location.href = '/'
      } catch (e) {
        if (isGqlErrStatus(e, 409)) {
          alert('the account is already registered, please login')
        }
      }
    } catch (e) {
      if (isGqlErrStatus(e, 401)) {
        alert('password or email is incorrect')
      }
    }
  })

  const handleRoleChange = (role: SignUpInfo['role']) => {
    if (role === 'buyer') {
      setValue('commercialInfo', {
        buyerType: '',
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
        othersCertifications: '',
      })
    }
  }

  const role = useWatch({ control, name: 'role' })

  let commercialInfo

  if (role === 'buyer') {
    commercialInfo = (
      <>
        <Select
          style={{ marginBottom: 16 }}
          control={control}
          label="Buyer Type"
          placeholder=""
          name="commercialInfo.buyerType"
          options={buyerTypesOptions}
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

        <CreatableSelect
          style={{ marginBottom: 16 }}
          control={control}
          label="Fulfillment Countries"
          placeholder=""
          name="commercialInfo.fulfillmentCountries"
          options={countriesOptions}
          isMulti
          required
        />

        <Input
          style={{ marginBottom: 16 }}
          type="text"
          label="Market Destinations"
          name="commercialInfo.marketDestinations"
          control={control}
          required
        />

        <Input
          type="text"
          label="Annual Import Volume"
          name="commercialInfo.annualImportVolume"
          control={control}
          required
        />
      </>
    )
  } else if (role === 'seller') {
    commercialInfo = (
      <>
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
          required
        />

        <Input
          style={{ marginBottom: 16 }}
          type="text"
          label="FOB$ Exports / year"
          name="commercialInfo.fobExportPerYear"
          control={control}
          required
        />

        <Checkboxes
          label="Certifications"
          name="commercialInfo.certifications"
          othersName="commercialInfo.othersCertifications"
          control={control}
          options={certifications}
        />
      </>
    )
  }

  return (
    <>
      <PageBgColor bgColor="#f8f8f8" />

      <Navbar />

      <div style={{ height: 48 }} />

      <Container maxWidth="xs">
        <Paper style={{ marginBottom: 16 }}>
          <form onSubmit={onSubmit}>
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
            />

            <Input
              style={{ marginBottom: 16 }}
              type="text"
              label="Company Name"
              name="companyName"
              control={control}
              required
            />

            <CountrySelector
              style={{ marginBottom: 16 }}
              control={control}
              name="country"
              readOnly
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

            {commercialInfo && (
              <div style={{ marginTop: 24, marginBottom: 24 }}>
                {commercialInfo}
              </div>
            )}

            <Button type="submit" fullWidth fullRounded>
              Sign Up
            </Button>
          </form>
        </Paper>

        <p style={{ textAlign: 'center' }}>
          Forgot your password?{' '}
          <StyledLink href="/begin-reset-password">Reset it</StyledLink>
        </p>
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
