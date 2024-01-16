// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
//import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import TagsLink from 'src/@core/layouts/components/shared-components/TagsLink'
import CardToggler from 'src/@core/layouts/components/shared-components/CardToggler'

const AppBarContent = props => {
  // ** Props
  const { settings, saveSettings } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TagsLink settings={settings} />
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      <CardToggler settings={settings} saveSettings={saveSettings} />
      {/*<UserDropdown settings={settings} />*/}
    </Box>
  )
}

export default AppBarContent
