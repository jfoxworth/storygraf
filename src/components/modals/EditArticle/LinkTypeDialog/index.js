// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'

const LinkTypeDialog = ({ currentItem, setCurrentItem }) => {
  return (
    <div>
      <Typography variant='h6' sx={{ mb: 4 }}>
        Select the type of link that this item represents
      </Typography>
      <Box sx={{ mb: 8 }}>
        <Box
          onClick={() => setCurrentItem({ ...currentItem, data: { ...currentItem.data, type: 'article' } })}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='warning' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='mdi:document' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>News Article</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                An article type page from any news source
              </Typography>
            </div>
          </Box>
          <Radio
            value='article'
            onChange={() => setCurrentItem({ ...currentItem, data: { ...currentItem.data, type: 'article' } })}
            checked={currentItem?.data?.type === 'article'}
          />
        </Box>
        <Box
          onClick={() => setCurrentItem({ ...currentItem, data: { ...currentItem.data, type: 'socialMedia' } })}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='mdi:twitter' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>Social Media</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                A publicly available post on Facebook, Twitter, Gab, Instagram, etc
              </Typography>
            </div>
          </Box>
          <Radio
            value='socialMedia'
            onChange={() => setCurrentItem({ ...currentItem, data: { ...currentItem.data, type: 'socialMedia' } })}
            checked={currentItem?.data?.type === 'socialMedia'}
          />
        </Box>

        <Box
          onClick={() => setCurrentItem({ ...currentItem, data: { ...currentItem.data, type: 'video' } })}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='error' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='mdi:youtube' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>Video Post</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                A video from any source - Youtube, Vimeo, etc
              </Typography>
            </div>
          </Box>
          <Radio
            value='video'
            onChange={() => setCurrentItem({ ...currentItem, data: { ...currentItem.data, type: 'video' } })}
            checked={currentItem?.data?.type === 'video'}
          />
        </Box>
      </Box>
    </div>
  )
}

export default LinkTypeDialog
