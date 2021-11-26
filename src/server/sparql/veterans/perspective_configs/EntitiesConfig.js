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
  facetClass: ':NamedEvent :NamedLocation :NamedOrganization :NamedPerson :NamedProduct :NamedUnit :PersonRecord',
  langTag: 'fi',
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
    },
    freeText: {
      id: 'freeText',
      labelPath: 'skos:prefLabel',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: 'wmsl:label :full_text :full_text_lemmatized',
      type: 'text'
    },
    type: {
      id: 'type',
      facetValueFilter: '',
      labelPath: 'a/skos:prefLabel',
      predicate: 'a',
      type: 'list',
      facetLabelFilter: 'FILTER(LANG(?prefLabel_) = "<LANG>")'
    },
    source: {
      id: 'source',
      labelPath: 'dct:source',
      predicate: 'dct:source',
      type: 'list',
      facetLabelFilter: '',
      facetValueFilter: `
        FILTER(STRSTARTS(STR(?id), "http://ldf.fi/"))
      `
    }
  }
}
