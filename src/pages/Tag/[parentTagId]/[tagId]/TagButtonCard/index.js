// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const saveModalChanges = newItem => {
  console.log('The new item is ...')
  console.log(newItem)
  updateItem(newItem).then(data => {
    console.log('Item updated')
  })
}

const TagButtonCard = ({ setShowAddEditItem, setCurrentItem }) => {
  return (
    <Grid item xs={12} lg={6} sx={{ display: 'flex', alignItems: 'center' }}>
      <Card sx={{ width: '100%' }}>
        <CardContent sx={{ display: 'flex', py: theme => `${theme.spacing(4.125)} !important` }}>
          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Typography variant='h5' sx={{ my: 5, 'text-align': 'center', width: '100%' }}>
                Add children to this tag
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ display: 'flex', my: 3, alignItems: 'center', width: '100%' }}>
              <Button
                variant='contained'
                sx={{ alignItems: 'center', width: '100%', mx: 3 }}
                startIcon={<Icon icon='mdi:plus' />}
              >
                Add Child Tag
              </Button>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant='contained'
                color='secondary'
                sx={{ alignItems: 'center', width: '100%', mx: 3 }}
                startIcon={<Icon icon='mdi:plus-circle' />}
                onClick={() => {
                  setCurrentItem({})
                  setShowAddEditItem(true)
                }}
              >
                Add Child Item
              </Button>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant='contained'
                color='info'
                sx={{ alignItems: 'center', width: '100%', mx: 3 }}
                startIcon={<Icon icon='mdi:cog-outline' />}
              >
                Edit this Tag
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default TagButtonCard
