// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'

// ** Next Imports
import Link from 'next/link'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { signIn } from 'next-auth/react'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserLogin = props => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const router = useRouter()
  //  const { logout } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar alt='John Doe' onClick={handleDropdownOpen} sx={{ width: 40, height: 40 }} />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton
              href='/'
              component={Link}
              sx={{ color: '#497ce2' }}
              onClick={() => signIn('facebook', { callback: 'http://localhost:3000/api/auth/callback/facebook' })}
            >
              <Icon icon='mdi:facebook' />
            </IconButton>
            <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => signIn('twitter')}>
              <Icon icon='mdi:twitter' />
            </IconButton>
            <IconButton
              href='/'
              component={Link}
              onClick={() => signIn('github')}
              sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
            >
              <Icon icon='mdi:github' />
            </IconButton>
            <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={() => signIn('google')}>
              <Icon icon='mdi:google' />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:cog-outline' />
            What is Storygraf
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:currency-usd' />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:help-circle-outline' />
            FAQ
          </Box>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserLogin
