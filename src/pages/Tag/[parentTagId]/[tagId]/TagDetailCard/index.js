// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)(({ theme }) => ({
  width: 40,
  height: 40,
  marginRight: theme.spacing(4)
}))

const TagDetailCard = ({ Tag }) => {
  const cardItems = [
    { name: 'Followers', value: Tag?.data?.followers || 0, icon: 'mdi:account-outline', color: 'primary' },
    { name: 'Embeds', value: Tag?.data?.embeds || 0, icon: 'mdi:poll', color: 'warning' },
    { name: 'Imports', value: Tag?.data?.imports || 0, icon: 'mdi:trending-up', color: 'success' },
    { name: 'Child Tags', value: Tag?.tags || 0, icon: 'mdi:tag-outline', color: 'info' },
    { name: 'Child Items', value: Tag?.items || 0, icon: 'heroicons:cog-solid', color: 'primary' },
    { name: 'Cumulatives', value: Tag?.cumulatives || 0, icon: 'mdi:sigma', color: 'error' }
  ]

  return (
    <>
      <Grid item xs={12} lg={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ display: 'flex', py: theme => `${theme.spacing(4.125)} !important` }}>
            <Grid container>
              {cardItems.map((cardItem, tii) => (
                <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar skin='light' color={cardItem.color} variant='rounded'>
                      <Icon icon={cardItem.icon} />
                    </Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Typography variant='h6'>{cardItem.value}</Typography>
                      </Box>
                      <Typography variant='caption'>{cardItem.name}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default TagDetailCard
