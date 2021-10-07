import {
  clipPropertiesInstancePage,
  clipPropertiesFacetResults
} from '../sparql_queries/SparqlQueriesClips'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const clipsConfig = {
  endpoint: {
    // url: 'http://localhost:3047/ds/sparql',
    url: 'https://ldf.fi/veterans/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: ':TimeSlice',
  includeInSitemap: true,
  // defaultConstraint: `
  //   <SUBJECT> dct:source mmm-schema:Bibale .
  // `,
  paginatedResults: {
    properties: clipPropertiesFacetResults
  },
  instance: {
    properties: clipPropertiesInstancePage,
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
      textQueryProperty: 'skos:prefLabel', // limit only to prefLabels
      type: 'text'
    },
    keyword: {
      id: 'keyword',
      facetValueFilter: '',
      label: 'keyword',
      labelPath: ':keyword/skos:prefLabel',
      predicate: ':keyword',
      type: 'list'
    },
    namedEntity: {
      id: 'namedEntity',
      facetValueFilter: '',
      label: 'named entity',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    length: {
      labelPath: ':length'
    },
    placeOfInterview: {
      labelPath: ':place_of_interview'
    },
    name: {
      id: 'name',
      facetValueFilter: '',
      labelPath: '^:structured_content/:interviewed_person/skos:prefLabel',
      predicate: '^:structured_content/:interviewed_person/skos:prefLabel',
      type: 'list',
      literal: true
    }
  }
}
