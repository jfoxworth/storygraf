// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Next Import
import Link from 'next/link'

const LinkStyled = styled(Link)(({ color }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: color
}))

const TagsLink = props => {
  return (
    <Tooltip title='Main Tags' placement='bottom'>
      <LinkStyled href='/Tags' color='inherit'>
        <IconButton color='inherit' aria-haspopup='true'>
          <Icon icon={'mdi:format-list-bulleted'} />
        </IconButton>
      </LinkStyled>
    </Tooltip>
  )
}

export default TagsLink
