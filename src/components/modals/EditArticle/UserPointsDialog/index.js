// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const UserPointsDialog = ({ currentItem, setCurrentItem }) => {
  console.log('the current item is ...')
  console.log(currentItem)
  const [userText, setUserText] = useState(currentItem?.data?.userDescription)

  const handleChange = event => {
    console.log('Setting to ')
    console.log(event.target.value)
    setUserText(event.target.value)
  }

  useEffect(() => {
    const setData = setTimeout(() => {
      console.log('Setting description to ...')
      console.log(userText)
      setCurrentItem({ ...currentItem, data: { ...currentItem.data, userDescription: userText } })
    }, 2000)

    return () => clearTimeout(setData)
  }, [userText])

  return (
    <div>
      <Typography sx={{ mb: 4, mt: 6 }}>
        These statements will appear beneath the article headline and should explan the article's relevance to the tag
      </Typography>
      <TextField
        rows={5}
        multiline
        fullWidth
        sx={{ mb: 4 }}
        label='User Input'
        placeholder='Enter comments about the article'
        defaultValue={currentItem?.data?.userDescription}
        onChange={e => handleChange(e)}
      />
    </div>
  )
}

export default UserPointsDialog
