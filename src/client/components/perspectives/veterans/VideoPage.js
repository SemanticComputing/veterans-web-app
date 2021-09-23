import React /*, { useRef, useEffect } */ from 'react'
// import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
// import SectionOfALawListCollapsible from '../facet_results/SectionOfALawListCollapsible'
// import HTMLParser from '../../helpers/HTMLParser'
// import Wordcloud from '../facet_results/WordCloud'
import { Typography } from '@material-ui/core'
// import { useLocation } from 'react-router-dom'
// import { has } from 'lodash'
import InstanceHomePageTable from '../../main_layout/InstanceHomePageTable'
import Player from './Player'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#bdbdbd'
  },
  mainContainer: props => ({
    margin: 0,
    maxWidth: 1600,
    marginTop: theme.spacing(0.5),
    flexWrap: 'wrap-reverse',
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: `calc(100% - ${theme.spacing(0.5)}`
    }
  }),
  gridItem: props => ({
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: '100%'
    },
    paddingTop: '0px !important',
    paddingBottom: '0px !important'
  }),
  textOuterContainer: props => ({
    height: 400,
    overflow: 'auto',
    marginTop: -8,
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: '100%',
      marginTop: 'initial'
    }
  }),
  textInnerContainer: {
    padding: theme.spacing(2)
  },
  tableOfContents: props => ({
    padding: theme.spacing(2),
    overflow: 'auto',
    height: 180,
    top: theme.spacing(0.5),
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: 'calc(60% - 72px)'
    }
  }),
  videoPlayerContainer: {
    height: '60%'
  },
  tableContainer: {
    // marginTop: theme.spacing(1),
    height: '40%',
    overflow: 'auto'
  },
  wordCloud: props => ({
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    overflow: 'auto',
    height: 200,
    display: 'none',
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: '40%',
      display: 'block'
    }
  }),
  wordCloudContainer: {
    width: '100%'
  },
  tooltip: {
    maxWidth: 500
  },
  tooltipContent: {
    padding: theme.spacing(1)
  },
  tooltipList: {
    listStylePosition: 'inside',
    paddingLeft: 0
  }
}))

const ContextualContent = props => {
  const classes = useStyles(props)
  const { instanceTableData } = props.perspectiveState
  const { localID, resultClass, screenSize, layoutConfig, properties } = props
  // console.log(props.perspectiveState)
  //   const location = useLocation()
  //   const sectionRefs = useRef({})

  //   useEffect(() => {
  //     if (tableOfContents && location.hash) {
  //       setTimeout(() => {
  //         const ref = sectionRefs.current
  //         if (has(ref, location.hash)) {
  //           ref[location.hash].scrollIntoView({ behavior: 'smooth' })
  //         }
  //       }, 500)
  //     }
  //   }, [location.hash])

  const readyToRenderVideoPlayer = () => {
    return `http://ldf.fi/veterans/${localID}` === instanceTableData.id &&
        instanceTableData.videoLink
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.mainContainer} container spacing={1}>
        <Grid className={classes.gridItem} item xs={12} sm={12} md={8}>
          <div className={classes.videoPlayerContainer}>
            {readyToRenderVideoPlayer() &&
              <Player
                resultClass={props.resultClass}
                data={instanceTableData}
              />}
          </div>
          <Paper className={classes.tableContainer}>
            <InstanceHomePageTable
              resultClass={resultClass}
              data={instanceTableData}
              properties={properties}
              screenSize={screenSize}
              layoutConfig={layoutConfig}
            />
          </Paper>
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={12} md={4}>
          <Paper className={classes.tableOfContents} />
          <Paper className={classes.wordCloud}>
            <Typography variant='h6' component='h2'>Käsitepilvi</Typography>
            <div className={classes.wordCloudContainer}>
              {/* <Wordcloud data={wordcloudData} maxWords={wordcloudMaxWords} /> */}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default ContextualContent
