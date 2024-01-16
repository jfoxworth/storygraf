// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TagList from 'src/components/TagList'
import PageHeader from 'src/@core/components/page-header'

// My api functions
import { getTagChildren } from '../../utils/api/tag'

const TagsPage = ({ childData }) => {
  //
  return (
    <>
      <Box sx={{ mb: 8 }}>
        <PageHeader
          title={<Typography variant='h5'>Top Level Tags</Typography>}
          subtitle={
            <Typography variant='body2'>
              The tags below are the top level tags for storygraf. Within these tags, subjects are broken down into
              smaller and smaller tags and then into stories. You can follow a tag, embed it into your own grafs, or
              import its contents into one of your grafs.
            </Typography>
          }
        />
      </Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TagList Tags={childData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

// Pull the tags on the server
// This could/should be hard coded as I expect this to be the most loaded page
// as well as one that does not change
export async function getServerSideProps() {
  const response = await getTagChildren(0)
  const childData = await response.json()

  return {
    props: {
      childData: childData.Items
    }
  }
}
TagsPage.guestGuard = true
export default TagsPage
