import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom'
import { has } from 'lodash'

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
  },
  accordionDetailsRoot: {
    flexDirection: 'column'
  },
  tocSubHeading: {
    marginTop: theme.spacing(1)
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
    let toc_ = this.props.toc
    if (!Array.isArray(toc_)) {
      toc_ = [this.props.toc]
    }
    for (const part of toc_) {
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

  // createNamedEntityLink = entity => {

  // }

  render () {
    const { classes, toc } = this.props
    const { expandedSet } = this.state
    let toc_ = toc
    if (!Array.isArray(toc)) {
      toc_ = [toc]
    }
    return (
      <div className={classes.root}>
        {toc_.map(row => {
          const rowID = row.order
          let isCurrent = false
          if (this.state.currentPart && rowID === this.state.currentPart.order) {
            isCurrent = true
          }
          const expanded = expandedSet.has(rowID) || isCurrent
          const hasPlaceLinks = has(row, 'mentionedPlace')
          const hasPersonLinks = has(row, 'mentionedPerson')
          const hasUnitLinks = has(row, 'mentionedUnit')
          const hasOrganizationLinks = has(row, 'mentionedOrganization')
          const hasEventLinks = has(row, 'mentionedEvent')
          const hasProductLinks = has(row, 'mentionedProduc')
          const hasNamedEntityLinks = hasPlaceLinks ||
            hasPersonLinks ||
            hasUnitLinks ||
            hasOrganizationLinks ||
            hasEventLinks ||
            hasProductLinks
          const hasTextSlices = has(row, 'textSlice')
          if (hasPlaceLinks) {
            if (Array.isArray(row.mentionedPlace)) {
              row.mentionedPlace.forEach(place => {
                if (Array.isArray(place.prefLabel)) {
                  place.prefLabel = place.prefLabel[0]
                }
              })
              row.mentionedPlace.sort((a, b) => a.prefLabel.localeCompare(b.prefLabel))
            }
          }
          return (
            <Accordion className={isCurrent ? classes.activeAccordion : null} key={rowID} expanded={expanded} onChange={this.handleAccordionOnChange(rowID)}>
              <AccordionSummary
                style={{
                  root: {
                    '&$expanded': { minHeight: 15 }
                  },
                  content: {
                    '&$expanded': { marginBottom: 0 }
                  }
                }}
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
                  replace
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
                {!expanded &&
                  <div className={classes.secondaryHeadingContainer}>
                    <Typography className={classes.secondaryHeading}>{row.prefLabel}</Typography>
                  </div>}

              </AccordionSummary>
              <AccordionDetails
                classes={{
                  root: classes.accordionDetailsRoot
                }}
              >
                <Typography>Haastattelijan muistiinpanot</Typography>
                {hasTextSlices &&
                  <ul>
                    {Array.isArray(row.textSlice)
                      ? row.textSlice.map(slice => <li key={slice.order}>{slice.textContent}</li>)
                      : <li key={row.textSlice.order}>{row.textSlice.textContent}</li>}
                  </ul>}
                {hasNamedEntityLinks &&
                  <>
                    <Divider />
                    <Typography className={classes.tocSubHeading}>Kohtaan mahdollisesti liittyvät</Typography>
                    <ul>
                      {hasPlaceLinks &&
                        <li>paikat
                          <ul>
                            {Array.isArray(row.mentionedPlace)
                              ? row.mentionedPlace.map(place =>
                                <li key={place.id}><a target='_blank' rel='noopener noreferrer' href={place.dataProviderUrl}>{place.prefLabel}</a></li>)
                              : <li key={row.mentionedPlace.id}><a target='_blank' rel='noopener noreferrer' href={row.mentionedPlace.dataProviderUrl}>{row.mentionedPlace.prefLabel}</a></li>}
                          </ul>
                        </li>}
                      {hasPersonLinks &&
                        <li>henkilöt
                          <ul>
                            {Array.isArray(row.mentionedPerson)
                              ? row.mentionedPerson.map(person =>
                                <li key={person.id}><a target='_blank' rel='noopener noreferrer' href={person.dataProviderUrl}>{person.prefLabel}</a></li>)
                              : <li key={row.mentionedPerson.id}><a target='_blank' rel='noopener noreferrer' href={row.mentionedPerson.dataProviderUrl}>{row.mentionedPerson.prefLabel}</a></li>}
                          </ul>
                        </li>}
                      {hasUnitLinks &&
                        <li>joukko-osastot
                          <ul>
                            {Array.isArray(row.mentionedUnit)
                              ? row.mentionedUnit.map(unit =>
                                <li key={unit.id}><a target='_blank' rel='noopener noreferrer' href={unit.dataProviderUrl}>{unit.prefLabel}</a></li>)
                              : <li key={row.mentionedUnit.id}><a target='_blank' rel='noopener noreferrer' href={row.mentionedUnit.dataProviderUrl}>{row.mentionedUnit.prefLabel}</a></li>}
                          </ul>
                        </li>}
                      {hasOrganizationLinks &&
                        <li>organisaatiot
                          <ul>
                            {Array.isArray(row.mentionedOrganization)
                              ? row.mentionedOrganization.map(organization =>
                                <li key={organization.id}><a target='_blank' rel='noopener noreferrer' href={organization.dataProviderUrl}>{organization.prefLabel}</a></li>)
                              : <li key={row.mentionedOrganization.id}><a target='_blank' rel='noopener noreferrer' href={row.mentionedOrganization.dataProviderUrl}>{row.mentionedOrganization.prefLabel}</a></li>}
                          </ul>
                        </li>}
                      {hasEventLinks &&
                        <li>tapahtumat
                          <ul>
                            {Array.isArray(row.mentionedEvent)
                              ? row.mentionedEvent.map(event =>
                                <li key={event.id}><a target='_blank' rel='noopener noreferrer' href={event.dataProviderUrl}>{event.prefLabel}</a></li>)
                              : <li key={row.mentionedEvent.id}><a target='_blank' rel='noopener noreferrer' href={row.mentionedEvent.dataProviderUrl}>{row.mentionedEvent.prefLabel}</a></li>}
                          </ul>
                        </li>}
                    </ul>
                  </>}
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
