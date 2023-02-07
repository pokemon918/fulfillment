import CountrySelector from '@/components/CountrySelect'
import Navbar from '@/components/Navbar'
import UserProfile from '@/components/UserProfile'
import accountTypes from '@/data/accountTypes'
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
    deleteCookie('fulfillment-token')
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
              <UserProfile user={user} />

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
