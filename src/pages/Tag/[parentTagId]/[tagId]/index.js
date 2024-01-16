import { useState } from 'react'

// ** Utils
import { getFullTagData } from '../../../../utils/api/tag'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import PageHeader from 'src/@core/components/page-header'

// ** Child components
import TagList from 'src/components/TagList'
import ItemList from 'src/components/ItemList'
import TagStackCard from 'src/components/TagStackCard'
import TagDetailCards from './TagDetailCards'
import EditArticle from 'src/components/modals/EditArticle'

// ** API Util
import { updateItem } from 'src/utils/api/item'

const TagsPage = ({ thisTag, childTags, childItems, cumulatives }) => {
  const [showEditArticle, setShowEditArticle] = useState(false)
  const [currentArticle, setCurrentArticle] = useState({})

  const saveModalChanges = newItem => {
    console.log('The new item is ...')
    console.log(newItem)
    updateItem(newItem).then(data => {
      console.log('Item updated')
    })
    // Replace the item in the array
    childItems.forEach((ci, cii) => {
      if (ci?.PK === newItem?.PK && ci?.SK === newItem?.SK) {
        console.log('replacing ' + newItem?.SK)
        childItems[cii].data = newItem.data
      }
    })
  }

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h4'>Tag - {thisTag?.data?.tagName}</Typography>}
        subtitle={<Typography sx={{ mt: 2 }}>{thisTag?.data?.description}</Typography>}
      />
      <TagStackCard tags={[...thisTag?.data?.tagTree, thisTag]} />

      <TagDetailCards
        Tag={{ ...thisTag, tags: childTags.length, items: childItems.length, cumulatives: cumulatives.length }}
      />

      <EditArticle
        show={showEditArticle}
        thisTag={thisTag}
        setShow={setShowEditArticle}
        currentArticle={currentArticle}
        saveChanges={saveModalChanges}
      />

      {childTags.length > 0 && (
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Child Tags' />
            <CardContent>
              <TagList Tags={childTags} />
            </CardContent>
          </Card>
        </Grid>
      )}
      {childItems.length > 0 && (
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Timeline' />
            <CardContent>
              <ItemList
                Items={childItems}
                Cumulatives={cumulatives}
                TagCumulatives={thisTag.data.cumulatives}
                TagColor={thisTag?.data?.tagColor}
                setCurrentArticle={setCurrentArticle}
                setShowEditArticle={setShowEditArticle}
              />
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export async function getServerSideProps(context) {
  const { parentTagId, tagId } = context.query
  const response = await getFullTagData(parentTagId, tagId)
  const thisTag = await response[0].json()
  const childTags = await response[1].json()
  const childItems = await response[2].json()
  const cumulatives = await response[3].json()

  return {
    props: {
      thisTag,
      childTags: childTags.Items || [],
      childItems: childItems.Items || [],
      cumulatives: cumulatives.Items || []
    }
  }
}

TagsPage.guestGuard = true
export default TagsPage
