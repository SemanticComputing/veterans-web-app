import {
  keywordPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesKeywords'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const keywordsConfig = {
  endpoint: {
    // url: 'http://localhost:3047/ds/sparql',
    url: 'https://ldf.fi/warmemoirsampo/sparql',
    prefixes,
    useAuth: true
  },
  includeInSitemap: true,
  instance: {
    properties: keywordPropertiesInstancePage,
    relatedInstances: '',
    defaultTab: 'table'
  }
}
