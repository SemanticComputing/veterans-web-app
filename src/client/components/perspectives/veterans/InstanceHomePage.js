import React, { lazy } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import purple from '@material-ui/core/colors/purple'
import PerspectiveTabs from '../../main_layout/PerspectiveTabs'
import InstanceHomePageTable from '../../main_layout/InstanceHomePageTable'
// import Network from '../../facet_results/Network'
import LeafletMap from '../../facet_results/LeafletMap'
// import ApexChart from '../../facet_results/ApexChart'
// import Export from '../../facet_results/Export'
// import Recommendations from './Recommendations'
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE
} from '../../../configs/veterans/GeneralConfig'
// import { coseLayout, cytoscapeStyle, preprocess } from '../../../configs/sampo/Cytoscape.js/NetworkConfig'
// import { createMultipleLineChartData } from '../../../configs/sampo/ApexCharts/LineChartConfig'
import { Route, Redirect } from 'react-router-dom'
import { has } from 'lodash'
import VideoPage from './VideoPage'
import { createPopUpContentVeterans } from '../../../configs/veterans/Leaflet/LeafletConfig'
// const InstanceHomePageTable = lazy(() => import('../../main_layout/InstanceHomePageTable'))
// const ApexChart = lazy(() => import('../../facet_results/ApexChart'))
// const Network = lazy(() => import('../../facet_results/Network'))
const Export = lazy(() => import('../../facet_results/Export'))
const WordCloud = lazy(() => import('./WordCloud'))

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  content: props => ({
    padding: 0,
    width: '100%',
    [theme.breakpoints.up(props.layoutConfig.hundredPercentHeightBreakPoint)]: {
      height: `calc(100% - ${props.layoutConfig.tabHeight}px + 7px)`
    },
    overflow: 'auto'
  }),
  wordCloudOuterContainer: props => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  wordCloudInnerContainer: props => ({
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      minHeight: 400,
      overflow: 'auto'
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
      height: '50%'
    }
  }),
  spinnerContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

/**
 * A component for generating a landing page for a single entity.
 */
class InstanceHomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      localID: null
    }
  }

  componentDidMount = () => this.fetchTableData()

  componentDidUpdate = prevProps => {
    // handle the case when the TABLE tab was not originally active
    const prevPathname = prevProps.routeProps.location.pathname
    const currentPathname = this.props.routeProps.location.pathname
    if (!this.hasTableData() && prevPathname !== currentPathname && currentPathname.endsWith('table')) {
      this.fetchTableData()
    }
    // handle browser's back button
    const localID = this.getLocalIDFromURL()
    if (this.state.localID !== localID) {
      this.fetchTableData()
    }
  }

  hasTableData = () => {
    const { instanceTableData } = this.props.perspectiveState
    return instanceTableData !== null && Object.values(instanceTableData).length >= 1
  }

  fetchTableData = () => {
    const { perspectiveConfig } = this.props
    const localID = this.getLocalIDFromURL()
    this.setState({ localID })
    let uri = ''
    const base = 'http://ldf.fi/warmemoirsampo'
    const resultClass = perspectiveConfig.id
    switch (resultClass) {
      case 'videos':
        uri = `${base}/${localID}`
        break
      case 'entities':
        uri = `${base}/entities/${localID}`
        break
      case 'keywords':
        uri = `${base}/${localID}`
        break
    }
    this.props.fetchByURI({
      resultClass,
      facetClass: null,
      variant: null,
      uri: uri
    })
  }

  getLocalIDFromURL = () => {
    const locationArr = this.props.routeProps.location.pathname.split('/')
    let localID = locationArr.pop()
    this.props.perspectiveConfig.instancePageTabs.forEach(tab => {
      if (localID === tab.id) {
        localID = locationArr.pop() // pop again if tab id
      }
    })
    return localID
  }

  getVisibleRows = rows => {
    const { instanceTableData } = this.props.perspectiveState
    const visibleRows = []
    const instanceClass = instanceTableData.type ? instanceTableData.type.id : ''
    rows.forEach(row => {
      if ((has(row, 'onlyForClass') && row.onlyForClass === instanceClass) ||
       !has(row, 'onlyForClass')) {
        visibleRows.push(row)
      }
    })
    return visibleRows
  }

  render = () => {
    const { classes, perspectiveState, perspectiveConfig, rootUrl, screenSize, layoutConfig } = this.props
    const { instanceTableData, results, fetching } = perspectiveState
    const resultClass = perspectiveConfig.id
    const defaultInstancePageTab = perspectiveConfig.defaultInstancePageTab
      ? perspectiveConfig.defaultInstancePageTab
      : 'table'
    const hasTableData = this.hasTableData()
    return (
      <div className={classes.root}>
        <PerspectiveTabs
          routeProps={this.props.routeProps}
          tabs={perspectiveConfig.instancePageTabs}
          screenSize={screenSize}
          layoutConfig={layoutConfig}
        />
        <div className={classes.content}>
          {fetching && !hasTableData &&
            <div className={classes.spinnerContainer}>
              <CircularProgress style={{ color: purple[500] }} thickness={5} />
            </div>}
          {!hasTableData &&
            <div className={classes.spinnerContainer}>
              <Typography variant='h6'>
                No data found for id: <span style={{ fontStyle: 'italic' }}>{this.state.localID}</span>
              </Typography>
            </div>}
          {/* make sure that tableData exists before rendering any components */}
          {hasTableData &&
            <>
              <Route
                exact path={`${rootUrl}/${resultClass}/page/${this.state.localID}`}
                render={routeProps =>
                  <Redirect
                    to={{
                      pathname: `${rootUrl}/${resultClass}/page/${this.state.localID}/${defaultInstancePageTab}`,
                      hash: routeProps.location.hash
                    }}
                  />}
              />
              <Route
                path={[`${rootUrl}/${resultClass}/page/${this.state.localID}/table`, '/iframe.html']} // support also rendering in Storybook
                render={() =>
                  <Paper style={{ height: 'calc(100% - 8px)' }}>
                    <InstanceHomePageTable
                      resultClass={resultClass}
                      data={instanceTableData}
                      properties={this.getVisibleRows(perspectiveState.properties)}
                      screenSize={screenSize}
                      layoutConfig={layoutConfig}
                    />
                  </Paper>}
              />
              <Route
                path={[`${rootUrl}/${resultClass}/page/${this.state.localID}/video`, '/iframe.html']} // support also rendering in Storybook
                render={() =>
                  <VideoPage
                    resultClass={resultClass}
                    perspectiveState={perspectiveState}
                    properties={this.getVisibleRows(perspectiveState.properties)}
                    localID={this.state.localID}
                    screenSize={screenSize}
                    layoutConfig={layoutConfig}
                    routeProps={this.props.routeProps}
                    videoPlayerState={this.props.videoPlayerState}
                    updateVideoPlayerTime={this.props.updateVideoPlayerTime}
                  />}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/map`}
                render={() =>
                  <LeafletMap
                    mapBoxAccessToken={MAPBOX_ACCESS_TOKEN}
                    mapBoxStyle={MAPBOX_STYLE}
                    center={perspectiveState.maps.videoInstancePageMap.center}
                    zoom={perspectiveState.maps.videoInstancePageMap.zoom}
                    results={results}
                    leafletMapState={this.props.leafletMapState}
                    pageType='instancePage'
                    resultClass='videoInstancePageMap'
                    facetClass='videos'
                    mapMode='marker'
                    uri={instanceTableData.id}
                    createPopUpContent={createPopUpContentVeterans}
                    fetchResults={this.props.fetchResults}
                    fetching={fetching}
                    fetchData={this.props.fetchResults}
                    showInstanceCountInClusters={false}
                    showExternalLayers={false}
                    updateMapBounds={this.props.updateMapBounds}
                    layoutConfig={layoutConfig}
                  />}
              />
              <Route
                path={[`${rootUrl}/${resultClass}/page/${this.state.localID}/word_cloud`, '/iframe.html']} // support also rendering in Storybook
                render={() =>
                  <div className={classes.wordCloudOuterContainer}>
                    <Paper className={classes.wordCloudInnerContainer}>
                      <WordCloud maxWords={30} data={instanceTableData.keyword} />
                    </Paper>
                  </div>}
              />
              <Route
                path={`${rootUrl}/${resultClass}/page/${this.state.localID}/export`}
                render={() =>
                  <Export
                    sparqlQuery={this.props.sparqlQuery}
                    pageType='instancePage'
                    id={instanceTableData.id}
                    layoutConfig={layoutConfig}
                  />}
              />
            </>}
        </div>
      </div>
    )
  }
}

InstanceHomePage.propTypes = {
  /**
   * Faceted search configs and results of this perspective.
   */
  perspectiveState: PropTypes.object.isRequired,
  /**
    * Leaflet map config and external layers.
    */
  leafletMapState: PropTypes.object.isRequired,
  /**
    * Redux action for fetching paginated results.
    */
  fetchPaginatedResults: PropTypes.func.isRequired,
  /**
    * Redux action for fetching all results.
    */
  fetchResults: PropTypes.func.isRequired,
  /**
    * Redux action for fetching facet values for statistics.
    */
  fetchFacetConstrainSelf: PropTypes.func.isRequired,
  /**
    * Redux action for loading external GeoJSON layers.
    */
  fetchGeoJSONLayers: PropTypes.func.isRequired,
  /**
    * Redux action for loading external GeoJSON layers via backend.
    */
  fetchGeoJSONLayersBackend: PropTypes.func.isRequired,
  /**
    * Redux action for clearing external GeoJSON layers.
    */
  clearGeoJSONLayers: PropTypes.func.isRequired,
  /**
    * Redux action for fetching information about a single entity.
    */
  fetchByURI: PropTypes.func.isRequired,
  /**
    * Redux action for updating the page of paginated results.
    */
  updatePage: PropTypes.func.isRequired,
  /**
    * Redux action for updating the rows per page of paginated results.
    */
  updateRowsPerPage: PropTypes.func.isRequired,
  /**
    * Redux action for sorting the paginated results.
    */
  sortResults: PropTypes.func.isRequired,
  /**
    * Redux action for updating the active selection or config of a facet.
    */
  showError: PropTypes.func.isRequired,
  /**
    * Redux action for showing an error
    */
  updateFacetOption: PropTypes.func.isRequired,
  /**
    * Routing information from React Router.
    */
  routeProps: PropTypes.object.isRequired,
  /**
    * Perspective config.
    */
  perspective: PropTypes.object.isRequired,
  /**
    * State of the animation, used by TemporalMap.
    */
  animationValue: PropTypes.array.isRequired,
  /**
    * Redux action for animating TemporalMap.
    */
  animateMap: PropTypes.func.isRequired,
  /**
    * Current screen size.
    */
  screenSize: PropTypes.string.isRequired,
  /**
    * Root url of the application.
    */
  rootUrl: PropTypes.string.isRequired,
  layoutConfig: PropTypes.object.isRequired
}

export const InstanceHomePageComponent = InstanceHomePage

export default withStyles(styles)(InstanceHomePage)
