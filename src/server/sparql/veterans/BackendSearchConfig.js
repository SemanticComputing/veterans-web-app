import { videosConfig } from './perspective_configs/VideosConfig'
import { clipsConfig } from './perspective_configs/ClipsConfig'
import { entitiesConfig } from './perspective_configs/EntitiesConfig'
import { keywordsConfig } from './perspective_configs/KeywordsConfig'
import {
  videoInstancePageMapQuery
} from './sparql_queries/SparqlQueriesVideos'
import {
  clipsPlacesQuery,
  placeProperties,
  mentionedPlaces
} from './sparql_queries/SparqlQueriesClips'
import { sitemapInstancePageQuery } from '../SparqlQueriesGeneral'
// import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { makeObjectList } from '../SparqlObjectMapper'
import {
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
  sitemapConfig: {
    baseUrl: 'https://sotamuistot.arkisto.fi',
    langPrimary: 'fi',
    // langSecondary: 'en',
    outputDir: './src/server/sitemap_generator/sitemap_output',
    sitemapUrl: 'https://sotamuistot.arkisto.fi/sitemap',
    sitemapInstancePageQuery
  },
  videoInstancePageMap: {
    perspectiveID: 'videos',
    q: videoInstancePageMapQuery,
    resultMapper: makeObjectList
  },
  clipsPlaces: {
    perspectiveID: 'clips', // use endpoint config from finds
    q: clipsPlacesQuery,
    filterTarget: 'timeSlice__id',
    resultMapper: mapPlaces,
    instance: {
      properties: placeProperties,
      relatedInstances: mentionedPlaces
    }
  }
}
