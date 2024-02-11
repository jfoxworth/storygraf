// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Imports
import ArticlePreview from 'src/components/ArticlePreview'

const LinkDialog = ({ currentItem, setCurrentItem }) => {
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
    </div>
  )
}

export default LinkDialog
