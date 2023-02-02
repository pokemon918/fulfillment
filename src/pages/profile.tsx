import CountrySelector from '@/components/CountrySelect'
import Navbar from '@/components/Navbar'
import { DetailedUser } from '@/types/user'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Input from '@/ui/Input'
import PageBgColor from '@/ui/PageBgColor'
import Paper from '@/ui/Paper'
import { deleteCookie } from '@/utils/cookies'
import graphqlReq from '@/utils/graphqlReq'
import { gql } from 'graphql-request'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

const GET_PROFILE = gql`
  {
    user: userProfile {
      _id
      fullName
      companyName
      country
      email
      phone
      role
    }
  }
`

const accountTypes = {
  admin: 'Admin',
  seller: 'Supplier',
  buyer: 'Buyer',
  investor: 'Investor',
}

const Profile = () => {
  const { setValue, control } = useForm<{
    user?: DetailedUser
  }>()

  const user = useWatch({ control, name: 'user' })

  useEffect(() => {
    ;(async () => {
      const data = await graphqlReq(GET_PROFILE)

      setValue('user', data.user)
    })()
  }, [])

  const logout = () => {
    deleteCookie('token')
    deleteCookie('token_user')
    window.location.href = '/'
  }

  return (
    <>
      <Navbar />

      <PageBgColor bgColor="#f8f8f8" />

      <Container maxWidth="xs">
        <div style={{ marginTop: 48 }}>
          {!user ? (
            <p style={{ textAlign: 'center' }}>Loading...</p>
          ) : (
            <Paper>
              <p style={{ marginBottom: 16 }}>
                Account Type: {accountTypes[user.role]}
              </p>

              <Input
                style={{ marginBottom: 16 }}
                label="Name"
                name="user.fullName"
                control={control}
                required
                readOnly
              />

              <Input
                style={{ marginBottom: 16 }}
                label="Company"
                name="user.companyName"
                control={control}
                required
                readOnly
              />

              <CountrySelector
                style={{ marginBottom: 16 }}
                control={control}
                name="user.country"
                readOnly
              />

              <Input
                style={{ marginBottom: 16 }}
                label="Email"
                name="user.email"
                required
                control={control}
                readOnly
              />

              <Input
                style={{ marginBottom: 24 }}
                label="Phone"
                name="user.phone"
                type="tel"
                required
                control={control}
                readOnly
              />

              <Button
                onClick={logout}
                style={{ background: '#dc2626', color: '#fff' }}
                type="submit"
                fullWidth
                fullRounded
              >
                LOGOUT
              </Button>
            </Paper>
          )}
        </div>
      </Container>
    </>
  )
}

export default Profile
