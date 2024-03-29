// ** MUI Imports
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'

// ** My imports
import CumulativeBadge from '../CumulativeBadge'

// ** Util Imports
import { dateToLongDateTime } from 'src/utils/time'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const ItemList = ({ Items, Cumulatives, TagCumulatives, setCurrentArticle, setShowEditArticle }) => {
  const handleEditArticleClick = thisArticle => {
    setCurrentArticle(thisArticle)
    setShowEditArticle(true)
  }

  return (
    <Timeline sx={{ my: 0, py: 0 }}>
      {Items.map((item, ii) => (
        <TimelineItem key={ii}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              ml: '1em',
              mr: '1em',
              mt: '0.5em'
            }}
          >
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>
              <Icon
                icon={'material-symbols-light:settings'}
                style={{ cursor: 'pointer' }}
                sx={{ marginTop: 0, marginTop: 0 }}
                onClick={() => handleEditArticleClick(item)}
              />
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              {dateToLongDateTime(item.data.articlePublishedTime || item.data.articleDate)}
            </Typography>
          </Box>
          <TimelineSeparator sx={{ pt: 0 }}>
            <TimelineDot color={'grey'} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ mt: '0em', mb: theme => `${theme.spacing(2)} !important` }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                mt: '0em'
              }}
            >
              <Typography
                component={Link}
                href={item.data.url}
                target='_blank'
                sx={{ fontWeight: 600, textDecoration: 'none' }}
              >
                {`${item.data.title}`}
              </Typography>
            </Box>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>{`${item.data.userPoints[0]}`}</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>
              {TagCumulatives.map((tc, ti) => (
                <CumulativeBadge
                  color={tc.color}
                  key={`cumBardge${ti}`}
                  number={item.data.cumulatives?.filter(ci => ci.text === tc.text)[0]?.value}
                  //number={Cumulatives?.filter(ci => ci.id === tc.cumId)[0]?.data?.numData[item.id]}
                />
              ))}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export default ItemList
