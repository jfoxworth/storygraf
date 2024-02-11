// ** MUI Imports
import Tag from '../Tag'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'

const TagList = props => {
  // ** Props
  const { Tags } = props

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tag</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Tags?.map((tag, ti) => (
              <TableRow key={ti} sx={{ '&:last-of-type .MuiTableCell-root ': { border: 0 } }}>
                <TableCell sx={{ width: 1 / 4 }}>
                  <Tag tag={tag} />
                </TableCell>
                <TableCell>{tag?.data?.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TagList
