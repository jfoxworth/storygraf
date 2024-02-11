// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { CardContent } from '@mui/material'
import { dateToLongDateTime } from 'src/utils/time'

const ArticlePreview = ({ item }) => {
  if (!item?.data?.url || !item?.data?.title || !item?.data?.description) {
    return <Box sx={{ display: 'inline' }}>No valid url, title, or description is available</Box>
  }
  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'inline' }}>
            <b>Title : </b>
          </Box>
          <Box sx={{ display: 'inline' }}>{item?.data?.title || ''}</Box>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'inline' }}>
            <b>Description : </b>
          </Box>
          <Box sx={{ display: 'inline' }}>{item?.data?.description || ''}</Box>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'inline' }}>
            <b>Publish Date : </b>
          </Box>
          <Box sx={{ display: 'inline' }}>{dateToLongDateTime(item?.data?.published_time) || ''}</Box>
        </Box>
        <Box>
          <img width='250px' src={item?.data?.image} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ArticlePreview
