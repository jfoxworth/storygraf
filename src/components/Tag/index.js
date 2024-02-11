// ** MUI Imports
import Box from '@mui/material/Box'
import Link from 'next/link'
import { Typography } from '@mui/material'

const Tag = ({ tag }) => {
  return (
    <Link href={'/Tag/' + tag?.parent_tag_id + '/' + tag?.id} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          color: 'rgba(234, 234, 255, 0.87)',
          paddingLeft: '1em',
          borderLeft: `10px solid ${tag?.data?.tagColor}`
        }}
      >
        <Typography>{tag?.data?.tagName}</Typography>
      </Box>
    </Link>
  )
}

export default Tag
