import CountrySelector from '@/components/CountrySelect'
import accountTypes from '@/data/accountTypes'
import countries from '@/data/countries'
import { buyerTypes, certifications, marketDestinations } from '@/data/signup'
import { BaseProduct } from '@/types/product'
import { DetailedUser } from '@/types/user'
import Checkbox from '@/ui/Checkbox'
import Checkboxes from '@/ui/Checkboxes'
import CreatableSelect from '@/ui/CreatableSelect'
import Input from '@/ui/Input'
import Select from '@/ui/Select'
import { FC, Fragment, HTMLAttributes, useMemo } from 'react'
import { useForm } from 'react-hook-form'

interface UserProfileProps extends HTMLAttributes<HTMLDivElement> {
  user: DetailedUser
  products?: string[]
}

const UserProfile: FC<UserProfileProps> = (props) => {
  const { user, products = [], ...divProps } = props

  const { control } = useForm<DetailedUser>({
    defaultValues: user,
  })

  const productsOptions = useMemo(
    () => products.map((product) => ({ label: product, value: product })) ?? [],
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

  let commercialInfo

  if (user.role === 'buyer' && user.commercialInfo) {
    commercialInfo = (
      <Fragment key="buyer">
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
  } else if (user.role === 'seller'&& user.commercialInfo) {
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
    <div {...divProps}>
      <p style={{ marginBottom: 16 }}>
        Account Type: {accountTypes[user.role]}
      </p>

      <Input
        style={{ marginBottom: 16 }}
        label="Name"
        name="fullName"
        control={control}
        required
        readOnly
      />

      <Input
        style={{ marginBottom: 16 }}
        label="Company"
        name="companyName"
        control={control}
        required
        readOnly
      />

      <CountrySelector
        style={{ marginBottom: 16 }}
        control={control}
        name="country"
        readOnly
      />

      <Input
        style={{ marginBottom: 16 }}
        label="Email"
        name="email"
        required
        control={control}
        readOnly
      />

      <Input
        style={{ marginBottom: 24 }}
        label="Phone"
        name="phone"
        type="tel"
        required
        control={control}
        readOnly
      />
      {commercialInfo && (
        <div style={{ marginTop: 64 }}>
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>Commercial Info</h3>

          {commercialInfo}
        </div>
      )}
    </div>
  )
}

export default UserProfile
