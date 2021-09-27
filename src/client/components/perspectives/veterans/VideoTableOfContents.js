import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeadingContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary
  },
  timeLink: {
    marginRight: theme.spacing(1)
  },
  accordionSummaryRoot: {
    // cursor: 'default !important'
  }
}))

const VideoTableOfContents = props => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleAccordionOnChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      {props.toc.map(row => {
        const rowID = row.order
        return (
          <Accordion key={rowID} expanded={expanded === rowID} onChange={handleAccordionOnChange(rowID)}>
            <AccordionSummary
              classes={{
                root: classes.accordionSummaryRoot
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-label='Expand'
              aria-controls={`${rowID}-content`}
              id={`${rowID}-header`}
            >
              <Link
                className={classes.timeLink}
                to={{ hash: row.beginTimeInSeconds }}
                onClick={event => {
                  if (expanded === rowID) {
                    event.stopPropagation()
                  }
                }}
                onFocus={event => event.stopPropagation()}
              >
                <Typography className={classes.heading}>
                  {row.beginTimeLabel}
                </Typography>
              </Link>
              <div className={classes.secondaryHeadingContainer}>
                <Typography className={classes.secondaryHeading}>{row.prefLabel}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {Array.isArray(row.textSlice)
                  ? row.textSlice.map(slice => <li key={slice.order}>{slice.textContent}</li>)
                  : <li key={row.textSlice.order}>{row.textSlice.textContent}</li>}
              </ul>
            </AccordionDetails>
          </Accordion>
        )
      }
      )}
    </div>
  )
}

export default VideoTableOfContents
