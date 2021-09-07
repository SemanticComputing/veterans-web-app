import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
// general reducers:
import error from './general/error'
import options from './general/options'
import animation from './general/animation'
import leafletMap from './general/leafletMap'
// portal spefic reducers:
import fullTextSearch from './sampo/fullTextSearch'
import clientSideFacetedSearch from './sampo/clientSideFacetedSearch'
import perspective1 from './sampo/perspective1' // copy of manuscripts
import perspective2 from './sampo/perspective2' // copy of works
import perspective3 from './sampo/perspective3' // copy of events
import manuscripts from './sampo/manuscripts'
import works from './sampo/works'
import events from './sampo/events'
import actors from './sampo/actors'
import places from './sampo/places'
import expressions from './sampo/expressions'
import collections from './sampo/collections'
import finds from './sampo/finds'
import findsFacets from './sampo/findsFacets'
import emloActors from './sampo/emloActors'
import emloActorsFacets from './sampo/emloActorsFacets'
import emloActorsFacetsConstrainSelf from './sampo/emloActorsFacetsConstrainSelf'
import findsFacetsConstrainSelf from './sampo/findsFacetsConstrainSelf'
import perspective1Facets from './sampo/perspective1Facets'
import videosFacets from './veterans/videosFacets'
import videos from './veterans/videos'
import videosFacetsConstrainSelf from './veterans/videosFacetsConstrainSelf'

import clipsFacets from './veterans/clipsFacets'
import clips from './veterans/clips'
import clipsFacetsConstrainSelf from './veterans/clipsFacetsConstrainSelf'


import perspective1FacetsConstrainSelf from './sampo/perspective1FacetsConstrainSelf'
import perspective2Facets from './sampo/perspective2Facets'
import perspective2FacetsConstrainSelf from './sampo/perspective2FacetsConstrainSelf'
import perspective3Facets from './sampo/perspective3Facets'
import perspective3FacetsConstrainSelf from './sampo/perspective3FacetsConstrainSelf'

const reducer = combineReducers({
  videos,
  videosFacets,
  videosFacetsConstrainSelf,
  clips,
  clipsFacets,
  clipsFacetsConstrainSelf,
  perspective1,
  perspective2,
  perspective3,
  perspective1Facets,
  perspective1FacetsConstrainSelf,
  perspective2Facets,
  perspective2FacetsConstrainSelf,
  perspective3Facets,
  perspective3FacetsConstrainSelf,
  manuscripts,
  works,
  events,
  actors,
  expressions,
  collections,
  places,
  finds,
  findsFacets,
  findsFacetsConstrainSelf,
  emloActors,
  emloActorsFacets,
  emloActorsFacetsConstrainSelf,
  leafletMap,
  animation,
  options,
  error,
  clientSideFacetedSearch,
  fullTextSearch,
  toastr: toastrReducer
})

export default reducer
