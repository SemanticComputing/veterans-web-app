import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'

const styles = theme => ({
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
  activeAccordion: {
    border: '2px solid red'
  }
})

class VideoTableOfContents extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expandedSet: new Set([]),
      currentPart: null
    }
  }

  // componentDidMount = () => {
  // }

  componentDidUpdate = (prevProps, prevState) => {
    const currentPart = this.getCurrentPart()
    if (this.props.videoPlayerState.videoPlayerTime !== prevProps.videoPlayerState.videoPlayerTime) {
      this.setState({ currentPart })
    }
  }

  getCurrentPart = () => {
    const { videoPlayerTime } = this.props.videoPlayerState
    let currentPart = null
    for (const part of this.props.toc) {
      if (part.beginTimeInSeconds <= videoPlayerTime && part.endTimeInSeconds > videoPlayerTime) {
        currentPart = part
        break // there are errors in timecodes, choose only the first part that fits the condition
      }
    }
    return currentPart
  }

  handleAccordionOnChange = rowID => () => {
    const { expandedSet } = this.state
    if (expandedSet.has(rowID)) {
      expandedSet.delete(rowID)
    } else {
      expandedSet.add(rowID)
    }
    this.setState({ expandedSet })
  }

  render () {
    const { classes } = this.props
    const { expandedSet } = this.state
    return (
      <div className={classes.root}>
        {this.props.toc.map(row => {
          const rowID = row.order
          let isCurrent = false
          if (this.state.currentPart && rowID === this.state.currentPart.order) {
            isCurrent = true
          }
          const expanded = expandedSet.has(rowID) || isCurrent
          return (
            <Accordion className={isCurrent ? classes.activeAccordion : null} key={rowID} expanded={expanded} onChange={this.handleAccordionOnChange(rowID)}>
              <AccordionSummary
                // classes={{
                //   root: isCurrent ? classes.accordionSummaryRootCurrent : null
                // }}
                expandIcon={<ExpandMoreIcon />}
                IconButtonProps={{
                  disabled: isCurrent
                }}
                aria-label='Expand'
                aria-controls={`${rowID}-content`}
                id={`${rowID}-header`}
              >
                <Link
                  className={classes.timeLink}
                  to={{ hash: row.beginTimeInSeconds }}
                  onClick={event => {
                    if (expanded) {
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
}

export default withStyles(styles)(VideoTableOfContents)
