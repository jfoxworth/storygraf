// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// **
import Tag from '../Tag'

const TagStack = props => {
  // ** Props
  const { tags } = props

  return (
    <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
      <Card sx={{ width: '100%' }}>
        <CardHeader sx={{ pb: 3.25 }} title='Tag Stack' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <Box display='inline-flex'>
              {tags.map((tagItem, ti) => (
                <Box key={ti} sx={{ mr: '1em', display: 'inline-flex', justifyContent: 'space-between' }}>
                  <Box sx={{ mr: '1em' }}>
                    <Tag tag={tagItem} />
                  </Box>
                  <Box>{ti < tags.length - 1 && <Icon icon='mdi:greater-than' />}</Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default TagStack
