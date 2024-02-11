// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import UserProfileHeader from 'src/pages/user-profile/UserProfileHeader'
import DialogEditProfile from 'src/components/modals/EditProfile'

// ** Session
import { useSession } from 'next-auth/react'
import { getProfileFromEmail } from 'src/utils/api/user'

// ** Profile APIs
import { updateProfile } from 'src/utils/api/user'

// Will return the list of items
const renderList = (arr, profile) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ display: 'flex', mr: 2 }}>
            <Icon icon={item.icon} />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{`${item?.label}:`}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>{profile[item?.prop]}</Typography>
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}

const UserProfile = () => {
  // ** State
  const [profile, setProfile] = useState({})
  const [showEditUser, setShowEditUser] = useState(false)

  // ** Hooks
  const session = useSession()

  useEffect(() => {
    getProfileFromEmail(session?.data?.user?.email).then(profile => {
      console.log('The profile is ...')
      console.log(JSON.parse(profile).Items[0])
      setProfile(JSON.parse(profile).Items[0].data)
    })
  }, [])

  const aboutList = [
    { prop: 'name', label: 'Full Name', icon: 'mdi:person' },
    { prop: 'email', label: 'E-mail', icon: 'mdi:email-outline' },
    { prop: 'bio', label: 'Bio', icon: 'mdi:account-circle-outline' }
  ]

  return (
    <>
      <DialogEditProfile
        show={showEditUser}
        userProfile={profile}
        setShow={setShowEditUser}
        updateProfile={updateProfile}
      />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <UserProfileHeader userData={session?.data?.user} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ mb: 7 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: ['space-between']
                      }}
                    >
                      <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                        About
                      </Typography>
                      <Button
                        sx={{ display: 'flex', ml: 2, color: 'text.disabled' }}
                        onClick={() => setShowEditUser(true)}
                      >
                        <Icon icon={'mdi:cog-outline'} />
                      </Button>
                    </Box>
                    {renderList(aboutList, profile)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default UserProfile
