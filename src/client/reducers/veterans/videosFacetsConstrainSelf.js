import { handleFacetConstrainSelfAction } from '../general/facetsConstrainSelf'

export const INITIAL_STATE = {
  updatedFacet: null,
  facetUpdateID: 0,
  updatedFilter: null,
  facets: {
    familyName: {
      id: 'familyName',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      pieChartButton: false,
      isFetching: false,
      searchField: true,
      containerClass: 'ten',
      filterType: 'uriFilter',
      uriFilter: null,
      priority: 4
    },
    keyword: {
      id: 'keyword',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: 'instanceCount',
      sortDirection: 'desc',
      sortButton: true,
      spatialFilterButton: false,
      pieChartButton: false,
      isFetching: false,
      searchField: true,
      containerClass: 'ten',
      filterType: 'uriFilter',
      uriFilter: null,
      priority: 4
    },
  }
}

const videosFacetsConstrainself = (state = INITIAL_STATE, action) => {
  if (action.facetClass === 'videos') {
    return handleFacetConstrainSelfAction(state, action, INITIAL_STATE)
  } else return state
}

export default videosFacetsConstrainself
