// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CardToggler = props => {
  // ** Props
  const { settings, saveSettings } = props

  const handleModeChange = mode => {
    saveSettings({ ...settings, skin: mode })
  }

  const handleModeToggle = () => {
    if (settings.skin === 'bordered') {
      handleModeChange('default')
    } else {
      handleModeChange('bordered')
    }
  }

  return (
    <Tooltip title='Change light/dark mode' placement='bottom'>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
        <Icon icon={settings.skin === 'bordered' ? 'mdi:weather-sunny' : 'mdi:weather-night'} />
      </IconButton>
    </Tooltip>
  )
}

export default CardToggler
