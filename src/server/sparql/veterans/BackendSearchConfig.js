import { videosConfig } from './perspective_configs/VideosConfig'
import { clipsConfig } from './perspective_configs/ClipsConfig'
import { entitiesConfig } from './perspective_configs/EntitiesConfig'
import { keywordsConfig } from './perspective_configs/KeywordsConfig'
// import {
//   videoPropertiesInstancePage
// } from './sparql_queries/SparqlQueriesVideos'
import { sitemapInstancePageQuery } from '../SparqlQueriesGeneral'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
// import { makeObjectList } from '../SparqlObjectMapper'
// import {
//   mapPlaces,
//   mapLineChart,
//   mapMultipleLineChart,
//   linearScale
// } from '../Mappers'

export const backendSearchConfig = {
  videos: videosConfig,
  clips: clipsConfig,
  entities: entitiesConfig,
  keywords: keywordsConfig,
  jenaText: {
    perspectiveID: 'perspective1',
    properties: fullTextSearchProperties
  },
  sitemapConfig: {
    baseUrl: 'https://sampo-ui.demo.seco.cs.aalto.fi',
    langPrimary: 'en',
    langSecondary: 'fi',
    outputDir: './src/server/sitemap_generator',
    sitemapUrl: 'https://sampo-ui.demo.seco.cs.aalto.fi/sitemap',
    sitemapInstancePageQuery
  }
}
