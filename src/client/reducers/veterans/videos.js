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
  sortBy: 'prefLabel',
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
  properties: [
    {
      id: 'youTubeThumbnail',
      valueType: 'image',
      onlyForClass: 'x', // for hiding this row on instance page
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
      id: 'yearOfBirth',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 140,
      onlyOnInstancePage: true
    },
    {
      id: 'placeOfBirth',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 140,
      onlyOnInstancePage: true
    },
    {
      id: 'warsaPage',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      onlyOnInstancePage: true
    },
    {
      id: 'length',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 140,
      onlyOnInstancePage: true
    },
    {
      id: 'placeOfInterview',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 140,
      onlyOnInstancePage: true
    },
    {
      id: 'dateOfInterview',
      valueType: 'string',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 140,
      onlyOnInstancePage: true
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
    // {
    //   id: 'uri',
    //   valueType: 'object',
    //   makeLink: true,
    //   externalLink: true,
    //   sortValues: true,
    //   numberedList: false,
    //   onlyOnInstancePage: true
    // }
  ]
}

const resultClasses = new Set([
  'videos'
])

const videos = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    return handleDataFetchingAction(state, action, INITIAL_STATE)
  } else return state
}

export default videos
