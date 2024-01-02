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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Tab Content Imports
import LinkDialog from './LinkDialog'
import CumulativeDialog from './CumulativeDialog'
import UserPointsDialog from './UserPointsDialog'
import LinkTypeDialog from './LinkTypeDialog'
import ItemList from 'src/components/ItemList'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const TabLabel = props => {
  const { icon, title, subtitle, active } = props

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3.5,
            ...(active ? { color: 'common.white', backgroundColor: 'primary.main' } : { color: 'text.primary' })
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant='body2'>{title}</Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled', textTransform: 'none' }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}
const tabsArr = ['linkTypeTab', 'linkTab', 'UserPointsTab', 'paymentTab', 'submitTab']

const DialogCreateApp = ({ show, setShow, currentArticle, thisTag, saveChanges = () => {} }) => {
  // ** States
  const [currentItem, setCurrentItem] = useState(currentArticle.PK ? { ...currentArticle } : {})
  const [activeTab, setActiveTab] = useState('linkTypeTab')

  useEffect(() => {
    console.log('Resetting with current article')
    setCurrentItem(currentArticle)
  }, [currentArticle])

  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings

  const handleClose = newItem => {
    console.log('I am in the handle close function')
    console.log(newItem)
    setShow(false)
    setActiveTab('linkTypeTab')
    saveChanges(newItem)
  }

  const handleNoActionClose = () => {
    setShow(false)
    setActiveTab('linkTypeTab')
  }

  // This renders the two forward/previous buttons on the bottom
  const nextArrow = direction === 'ltr' ? 'mdi:arrow-right' : 'mdi:arrow-left'
  const previousArrow = direction === 'ltr' ? 'mdi:arrow-left' : 'mdi:arrow-right'
  const renderTabFooter = currentItem => {
    console.log('In the footer with ...')
    console.log(currentItem)
    const prevTab = tabsArr[tabsArr.indexOf(activeTab) - 1]
    const nextTab = tabsArr[tabsArr.indexOf(activeTab) + 1]

    return (
      <Box sx={{ mt: 8.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant='outlined'
          color='secondary'
          disabled={activeTab === 'linkTypeTab'}
          onClick={() => setActiveTab(prevTab)}
          startIcon={<Icon icon={previousArrow} />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={activeTab === 'submitTab' ? 'success' : 'primary'}
          endIcon={<Icon icon={activeTab === 'submitTab' ? 'mdi:check' : nextArrow} />}
          onClick={() => {
            if (activeTab !== 'submitTab') {
              setActiveTab(nextTab)
            } else {
              handleClose(currentItem)
            }
          }}
        >
          {activeTab === 'submitTab' ? 'Submit' : 'Next'}
        </Button>
      </Box>
    )
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
              Create / Edit an item
            </Typography>
            <Typography variant='body2'>This dialog walks the user through creating and editing an entry.</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <TabContext value={activeTab}>
              <TabList
                orientation='vertical'
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                  border: 0,
                  minWidth: 200,
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTabs-flexContainer': {
                    alignItems: 'flex-start',
                    '& .MuiTab-root': {
                      width: '100%',
                      alignItems: 'flex-start'
                    }
                  }
                }}
              >
                <Tab
                  disableRipple
                  value='linkTypeTab'
                  label={
                    <TabLabel
                      title='Type'
                      icon={<Icon icon='mdi:star-outline' />}
                      subtitle='Enter Link'
                      active={activeTab === 'linkTypeTab'}
                    />
                  }
                />
                <Tab
                  disableRipple
                  value='linkTab'
                  label={
                    <TabLabel
                      title='Link'
                      subtitle='Select item type'
                      icon={<Icon icon='mdi:link' />}
                      active={activeTab === 'linkTab'}
                    />
                  }
                />
                <Tab
                  disableRipple
                  value='UserPointsTab'
                  label={
                    <TabLabel
                      title='User Points'
                      active={activeTab === 'UserPointsTab'}
                      subtitle='Set User Points'
                      icon={<Icon icon='mdi:user' />}
                    />
                  }
                />
                <Tab
                  disableRipple
                  value='paymentTab'
                  label={
                    <TabLabel
                      title='Cumulatives'
                      active={activeTab === 'paymentTab'}
                      subtitle='Set cumulative items'
                      icon={<Icon icon='mdi:add' />}
                    />
                  }
                />
                <Tab
                  disableRipple
                  value='submitTab'
                  label={
                    <TabLabel
                      title='Preview'
                      subtitle='Submit'
                      icon={<Icon icon='mdi:check' />}
                      active={activeTab === 'submitTab'}
                    />
                  }
                />
              </TabList>
              <TabPanel value='linkTypeTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                <LinkTypeDialog currentItem={currentItem} setCurrentItem={setCurrentItem} />
                {renderTabFooter(currentItem)}
              </TabPanel>
              <TabPanel value='linkTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                <LinkDialog currentItem={currentItem} setCurrentItem={setCurrentItem} />
                {renderTabFooter(currentItem)}
              </TabPanel>
              <TabPanel value='UserPointsTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                <UserPointsDialog currentItem={currentItem} setCurrentItem={setCurrentItem} />
                {renderTabFooter(currentItem)}
              </TabPanel>
              <TabPanel value='paymentTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                <CumulativeDialog currentItem={currentItem} setCurrentItem={setCurrentItem} thisTag={thisTag} />
                {renderTabFooter(currentItem)}
              </TabPanel>
              <TabPanel value='submitTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                <ItemList
                  Items={[currentItem]}
                  TagCumulatives={thisTag.data.cumulatives}
                  Cumulatives={[]}
                  setCurrentArticle={''}
                  setShowEditArticle={''}
                />

                {renderTabFooter(currentItem)}
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogCreateApp
