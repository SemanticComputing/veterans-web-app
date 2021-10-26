import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
// general reducers:
import error from './general/error'
import options from './general/options'
import animation from './general/animation'
import leafletMap from './general/leafletMap'
// portal spefic reducers:
import fullTextSearch from './sampo/fullTextSearch'
import videosFacets from './veterans/videosFacets'
import videos from './veterans/videos'
import videosFacetsConstrainSelf from './veterans/videosFacetsConstrainSelf'
import clipsFacets from './veterans/clipsFacets'
import clips from './veterans/clips'
import clipsFacetsConstrainSelf from './veterans/clipsFacetsConstrainSelf'
import videoPlayer from './veterans/videoPlayer'
import entities from './veterans/entities'
import entitiesFacets from './veterans/entitiesFacets'

const reducer = combineReducers({
  entities,
  entitiesFacets,
  videos,
  videosFacets,
  videosFacetsConstrainSelf,
  clips,
  clipsFacets,
  clipsFacetsConstrainSelf,
  videoPlayer,
  options,
  error,
  animation,
  leafletMap,
  fullTextSearch,
  toastr: toastrReducer
})

export default reducer
