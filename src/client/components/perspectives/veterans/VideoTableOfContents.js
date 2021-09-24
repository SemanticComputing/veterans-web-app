import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}))

const VideoTableOfContents = props => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      {props.toc.map(row => {
        const rowID = row.order
        return (
          <Accordion key={rowID} expanded={expanded === rowID} onChange={handleChange(rowID)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${rowID}-content`}
              id={`${rowID}-header`}
            >
              <Typography className={classes.heading}>{row.beginTimeLabel}</Typography>
              <Typography className={classes.secondaryHeading}>{row.prefLabel}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {row.textContent}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      }
      )}
    </div>
  )
}

export default VideoTableOfContents
