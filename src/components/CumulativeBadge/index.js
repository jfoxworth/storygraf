// ** MUI Imports
import Chip from 'src/@core/components/mui/chip'

const CumulativeBadge = ({ color, number }) => {
  if (!number) {
    return ''
  }

  return <Chip label={number} style={{ backgroundColor: color }} color='primary' size='small' />
}

export default CumulativeBadge
