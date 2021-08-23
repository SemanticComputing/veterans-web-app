import {
  manuscriptPropertiesFacetResults,
  manuscriptPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesPerspective1'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const videosConfig = {
  endpoint: {
    url: 'http://localhost:3047/ds/sparql',
    prefixes,
    useAuth: false
  },
  facetClass: ':Interview',
  includeInSitemap: true,
  // defaultConstraint: `
  //   <SUBJECT> dct:source mmm-schema:Bibale .
  // `,
  paginatedResults: {
    properties: manuscriptPropertiesFacetResults
  },
  instance: {
    properties: manuscriptPropertiesInstancePage,
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
      labelPath: ':keywords/skos:prefLabel',
      predicate: ':keywords',
      type: 'list'
    },
    length: {
      labelPath: ':length',
    },
    placeOfInterview: {
      labelPath: ':place_of_interview',
    },
    familyName: {
      id: 'familyName',
      facetValueFilter: '',
      labelPath: ':interviewed_person/foaf:familyName',
      predicate: ':interviewed_person/foaf:familyName',
      type: 'list',
      literal: true
    },
  }
}
