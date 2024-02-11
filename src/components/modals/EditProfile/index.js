// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogEditProfile = ({ show, setShow, userProfile, updateProfile = () => {} }) => {
  // ** States
  const [currentProfile, setCurrentProfile] = useState(userProfile)

  useEffect(() => {
    console.log('Resetting with current article')
    setCurrentProfile(userProfile)
  }, [userProfile])

  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings

  const handleClose = newItem => {
    updateProfile(newItem)
    setShow(false)
  }

  const handleNoActionClose = () => {
    setShow(false)
  }

  const handleChange = event => {
    let newVal = { ...userProfile }
    newVal[event.target.id] = event.target.value
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        scroll='body'
        maxWidth='lg'
        onClose={handleNoActionClose}
        onBackdropClick={handleNoActionClose}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            height: '650px',
            position: 'relative',
            pr: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pl: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(11)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={handleNoActionClose}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Edit your profile
            </Typography>
            <Typography variant='body2'>This dialog lets the user alter their profile</Typography>
          </Box>
          <TextField
            fullWidth
            sx={{ mb: 4, mt: 4 }}
            label='Full Name'
            id='name'
            defaultValue={currentProfile.name || ''}
            disabled={true}
          />
          <TextField
            fullWidth
            sx={{ mb: 4, mt: 4 }}
            label='Email'
            id='email'
            defaultValue={currentProfile.email || ''}
            disabled={true}
          />
          <TextField
            rows={5}
            multiline
            fullWidth
            sx={{ mb: 4, mt: 4 }}
            label='Bio'
            id='bio'
            placeholder='Enter your bio here'
            defaultValue={currentProfile.bio || ''}
            onChange={e => handleChange(e)}
          />
          <Box
            sx={{
              mt: 8.5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Button
              variant='contained'
              color={'primary'}
              onClick={() => {
                handleClose(currentProfile)
              }}
            >
              Save Changes
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogEditProfile
