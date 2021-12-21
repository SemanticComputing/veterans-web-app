import { videosConfig } from './perspective_configs/VideosConfig'
import { clipsConfig } from './perspective_configs/ClipsConfig'
import { entitiesConfig } from './perspective_configs/EntitiesConfig'
import { keywordsConfig } from './perspective_configs/KeywordsConfig'
// import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import {
  makeObjectList,
  mapPlaces
  // mapLineChart,
  // mapMultipleLineChart,
  // linearScale
} from '../Mappers'

export const backendSearchConfig = {
  videos: videosConfig,
  clips: clipsConfig,
  entities: entitiesConfig,
  keywords: keywordsConfig,
  videoInstancePageMap: {
    perspectiveID: 'videos',
    q: 'videoInstancePageMapQuery',
    resultMapper: makeObjectList
  },
  clipsPlaces: {
    perspectiveID: 'clips',
    q: 'clipsPlacesQuery',
    filterTarget: 'timeSlice__id',
    resultMapper: mapPlaces,
    instance: {
      properties: 'placeProperties',
      relatedInstances: 'mentionedPlaces'
    }
  }
}
