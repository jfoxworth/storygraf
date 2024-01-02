// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import { MenuItem } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'

const CumulativeDialog = ({ thisTag, currentItem, setCurrentItem }) => {
  console.log('The current item is ...')
  console.log(currentItem)
  // Set an array of cumulatives that the user can edit
  const [cumArray, setCumArray] = useState(currentItem?.data?.cumulatives || [])

  // Make sure that the user cannot set the same cumulative twice
  const [cumOptions, setCumOptions] = useState([])
  useEffect(() => {
    let tempCum = []
    thisTag.data?.cumulatives?.forEach(ci => {
      if (cumArray.filter(e => e.text === ci.text).length === 0) {
        tempCum.push(ci.text)
      }
    })
    setCumOptions(tempCum)
  }, [thisTag, cumArray.length, currentItem?.data?.cumulatives?.length])

  const handleChange = (event, i) => {
    let tempArray = [...cumArray]
    tempArray[i] = { ...tempArray[i], value: event.target.value }
    setCumArray(tempArray)
  }

  useEffect(() => {
    const setData = setTimeout(() => {
      console.log('Setting current item with')
      console.log(cumArray)
      setCurrentItem({ ...currentItem, data: { ...currentItem.data, cumulatives: cumArray } })
    }, 2000)

    return () => clearTimeout(setData)
  }, [cumArray])

  const deleteItem = i => {
    console.log('Deleting ' + i)
    setCumArray(cumArray.splice(i, 1))
  }

  return (
    <>
      <Grid container spacing={6} sx={{ mt: 6, ml: 1 }}>
        {cumArray.map((ci, index) => (
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <TextField fullWidth autoComplete='off' label='Cumulative Label' value={ci.text} />
            </Grid>
            <Grid item xs={5}>
              <TextField
                onChange={e => handleChange(e, index)}
                fullWidth
                autoComplete='off'
                label='Cumlative Value'
                defaultValue={ci.value}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton size='small' sx={{ position: 'relative', top: '0.5rem' }} onClick={() => deleteItem(index)}>
                <Icon icon={'mdi:delete'} />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        {cumOptions.length === 0 && (
          <Typography sx={{ mt: 5 }}>All cumulatives for this tag have been set on this item</Typography>
        )}
        {cumOptions.length > 0 && (
          <Grid container spacing={6} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <Select fullWidth autoComplete='off' options={cumOptions} label='Cumulative Label'>
                {thisTag.data?.cumulatives?.map(tci => (
                  <MenuItem value={tci.text}>{tci.text}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={5}>
              <TextField fullWidth autoComplete='off' label='Cumlative Value' defaultValue={0} />
            </Grid>
            <Grid item xs={1}>
              <IconButton size='small' sx={{ position: 'relative', top: '0.5rem' }}>
                <Icon icon={'mdi:plus-circle'} />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default CumulativeDialog
