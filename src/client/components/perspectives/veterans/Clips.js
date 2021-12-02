import React, { lazy } from 'react'
import PropTypes from 'prop-types'
// import intl from 'react-intl-universal'
import { Route, Redirect } from 'react-router-dom'
import PerspectiveTabs from '../../main_layout/PerspectiveTabs'
// import ResultTable from '../../facet_results/ResultTable'
// import LeafletMap from '../../facet_results/LeafletMap'
// import Deck from '../../facet_results/Deck'
// import ApexChart from '../../facet_results/ApexChart'
// import Network from '../../facet_results/Network'
// import Export from '../../facet_results/Export'
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE
} from '../../../configs/veterans/GeneralConfig'
// import {
//   createSingleLineChartData,
//   createMultipleLineChartData
// } from '../../../configs/sampo/ApexCharts/LineChartConfig'
// import { coseLayout, cytoscapeStyle, preprocess } from '../../../configs/sampo/Cytoscape.js/NetworkConfig'
import { createPopUpContentVeterans } from '../../../configs/veterans/Leaflet/LeafletConfig'
const ResultTable = lazy(() => import('../../facet_results/ResultTable'))
const LeafletMap = lazy(() => import('../../facet_results/LeafletMap'))
// const Deck = lazy(() => import('../../facet_results/Deck'))
// const ApexChart = lazy(() => import('../../facet_results/ApexChart'))
// const Network = lazy(() => import('../../facet_results/Network'))
// const Export = lazy(() => import('../../facet_results/Export'))

const Clips = props => {
  const { rootUrl, perspective, screenSize } = props
  const layerControlExpanded = screenSize === 'md' ||
    screenSize === 'lg' ||
    screenSize === 'xl'
  let popupMaxHeight = 320
  // let popupMinWidth = 280
  let popupMaxWidth = 280
  if (screenSize === 'xs' || screenSize === 'sm') {
    popupMaxHeight = 200
    // popupMinWidth = 150
    popupMaxWidth = 150
  }
  return (
    <>
      <PerspectiveTabs
        routeProps={props.routeProps}
        tabs={props.perspective.tabs}
        screenSize={props.screenSize}
        layoutConfig={props.layoutConfig}
      />
      <Route
        exact path={`${rootUrl}/${perspective.id}/faceted-search`}
        render={() => <Redirect to={`${rootUrl}/${perspective.id}/faceted-search/table`} />}
      />
      <Route
        path={[`${props.rootUrl}/${perspective.id}/faceted-search/table`, '/iframe.html']}
        render={routeProps =>
          <ResultTable
            data={props.perspectiveState}
            facetUpdateID={props.facetState.facetUpdateID}
            resultClass='clips'
            facetClass='clips'
            fetchPaginatedResults={props.fetchPaginatedResults}
            updatePage={props.updatePage}
            updateRowsPerPage={props.updateRowsPerPage}
            sortResults={props.sortResults}
            routeProps={routeProps}
            rootUrl={rootUrl}
            layoutConfig={props.layoutConfig}
          />}
      />
      <Route
        path={`${rootUrl}/${perspective.id}/faceted-search/map`}
        render={() =>
          <LeafletMap
            mapBoxAccessToken={MAPBOX_ACCESS_TOKEN}
            mapBoxStyle={MAPBOX_STYLE}
            center={props.perspectiveState.maps.clipsPlaces.center}
            zoom={props.perspectiveState.maps.clipsPlaces.zoom}
            results={props.perspectiveState.results}
            leafletMapState={props.leafletMapState}
            pageType='facetResults'
            facetUpdateID={props.facetState.facetUpdateID}
            resultClass='clipsPlaces'
            facetClass='clips'
            mapMode='cluster'
            showMapModeControl={false}
            instance={props.perspectiveState.instanceTableData}
            createPopUpContent={createPopUpContentVeterans}
            popupMaxWidth={popupMaxWidth}
            popupMaxHeight={popupMaxHeight}
            fetchResults={props.fetchResults}
            fetchGeoJSONLayers={props.fetchGeoJSONLayers}
            clearGeoJSONLayers={props.clearGeoJSONLayers}
            fetchByURI={props.fetchByURI}
            fetching={props.perspectiveState.fetching}
            showInstanceCountInClusters
            updateFacetOption={props.updateFacetOption}
            updateMapBounds={props.updateMapBounds}
            showError={props.showError}
            showExternalLayers={false}
            // customMapControl
            layerControlExpanded={layerControlExpanded}
            // layerConfigs={layerConfigs}
            infoHeaderExpanded={props.perspectiveState.facetedSearchHeaderExpanded}
            layoutConfig={props.layoutConfig}
          />}
      />
    </>
  )
}

Clips.propTypes = {
  /**
   * Faceted search configs and results of this perspective.
   */
  perspectiveState: PropTypes.object.isRequired,
  /**
    * Facet configs and values.
    */
  facetState: PropTypes.object.isRequired,
  /**
    * Facet values where facets constrain themselves, used for statistics.
    */
  facetConstrainSelfState: PropTypes.object.isRequired,
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

export default Clips
