/*
  This component houses the input for the url to the item in question as well
  as the resulting scrape. That result is different based on whether the item
  is an article, a social media post, video, etc.
*/

// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Custom Imports
import ArticlePreview from 'src/components/ArticlePreview'

const LinkDialog = ({ currentItem, setCurrentItem }) => {
  console.log('the current item in the link dialog is ...')
  console.log(currentItem)
  const handleChangeLink = event => {
    console.log('I am in the change link')
    try {
      fetch('http://localhost:3001/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: event.target.value
        }),
        params: {
          url: event.target.value
        }
      })
        .then(response => response.text())
        .then(rawdata => {
          const data = JSON.parse(rawdata)
          console.log(data)
          setCurrentItem({ ...currentItem, data: { ...currentItem?.data, ...data } })
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {currentItem.data.type === 'article' && (
        <>
          <TextField
            fullWidth
            sx={{ mb: 4, mt: 4 }}
            label='Article Link'
            placeholder={'Enter link here'}
            defaultValue={currentItem?.data?.url}
            onChange={event => handleChangeLink(event)}
          />
          <Box sx={{ mb: 8 }}>
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <ArticlePreview item={currentItem} />
            </Box>
          </Box>
        </>
      )}
      {currentItem.data.type === 'socialMedia' && (
        <Box sx={{ mb: 8 }}>
          <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>Social Media</div>
          </Box>
        </Box>
      )}
      {currentItem.data.type === 'video' && (
        <Box sx={{ mb: 8 }}>
          <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>Video</div>
          </Box>
        </Box>
      )}
    </div>
  )
}

export default LinkDialog
