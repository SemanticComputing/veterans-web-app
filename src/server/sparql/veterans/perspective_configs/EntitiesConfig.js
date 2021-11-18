import {
  entityPropertiesFacetResults,
  entityPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesEntities'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const entitiesConfig = {
  endpoint: {
    // url: 'http://localhost:3047/ds/sparql',
    url: 'https://ldf.fi/warmemoirsampo/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: ':NamedEntity',
  includeInSitemap: true,
  paginatedResults: {
    properties: entityPropertiesFacetResults
  },
  instance: {
    properties: entityPropertiesInstancePage,
    relatedInstances: '',
    defaultTab: 'table'
  },
  facets: {
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'skos:prefLabel',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: 'skos:prefLabel', // limit only to prefLabels
      type: 'text'
    }
  }
}
