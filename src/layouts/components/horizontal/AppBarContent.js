// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from '../UserDropdown'
import UserLogin from '../UserLogin'
import TagsLink from 'src/@core/layouts/components/shared-components/TagsLink'
import CardToggler from 'src/@core/layouts/components/shared-components/CardToggler'

// ** Next Import
import { useSession } from 'next-auth/react'

const AppBarContent = props => {
  // ** Props
  const { settings, saveSettings } = props

  const session = useSession()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TagsLink settings={settings} />
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      <CardToggler settings={settings} saveSettings={saveSettings} />
      {session?.data?.user && <UserDropdown settings={settings} />}
      {!session?.data?.user && <UserLogin settings={settings} />}
    </Box>
  )
}

export default AppBarContent
