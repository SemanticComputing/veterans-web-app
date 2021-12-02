import { handleDataFetchingAction } from '../general/results'

export const INITIAL_STATE = {
  results: null,
  resultUpdateID: 0,
  resultsSparqlQuery: null,
  paginatedResults: [],
  paginatedResultsSparqlQuery: null,
  paginatedResultsAlwaysExpandRows: true,
  paginatedResultsRowContentMaxHeight: 130,
  resultCount: 0,
  page: -1,
  pagesize: 25,
  sortBy: 'mentionedUnit',
  sortDirection: 'asc',
  fetching: false,
  fetchingResultCount: false,
  fetchingInstanceAnalysisData: false,
  facetedSearchHeaderExpanded: false,
  instancePageHeaderExpanded: false,
  instanceTableData: null,
  instanceTableExternalData: null,
  instanceAnalysisData: null,
  instanceAnalysisDataUpdateID: 0,
  instanceSparqlQuery: null,
  maps: {
    clipsPlaces: {
      center: [22.43, 10.37],
      zoom: 2
    }
  },
  properties: [
    {
      id: 'youTubeThumbnail',
      valueType: 'image',
      previewImageHeight: 125,
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      hideHeader: true
    },
    {
      id: 'prefLabel',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 140
    },
    {
      id: 'textSlice',
      valueType: 'object',
      makeLink: false,
      externalLink: true,
      sortValues: false,
      numberedList: false,
      minWidth: 300
    },
    {
      id: 'mentionedPlace',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 140
    },
    {
      id: 'mentionedPerson',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 140
    },
    {
      id: 'mentionedUnit',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 210
    },
    {
      id: 'mentionedOrganization',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 170
    },
    {
      id: 'mentionedEvent',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 160
    },
    {
      id: 'mentionedProduct',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 140
    },
    {
      id: 'keyword',
      valueType: 'object',
      makeLink: true,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 140
    }
  ]
}

const resultClasses = new Set([
  'clips',
  'clipsPlaces'
])

const clips = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    return handleDataFetchingAction(state, action, INITIAL_STATE)
  } else return state
}

export default clips
