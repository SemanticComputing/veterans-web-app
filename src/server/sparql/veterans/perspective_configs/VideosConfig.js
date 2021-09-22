import {
  manuscriptPropertiesFacetResults,
  manuscriptPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesPerspective1'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const videosConfig = {
  endpoint: {
    // url: 'http://localhost:3047/ds/sparql',
    url: 'https://ldf.fi/veterans/sparql',
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
    mentionedPlace: {
      id: 'mentionedPlace',
      facetValueFilter: '?id :type "Location"',
      label: 'mentioned place',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    mentionedOrganization: {
      id: 'mentionedOrganization',
      facetValueFilter: '?id :type "Organization"',
      label: 'mentioned organization',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    mentionedPerson: {
      id: 'mentionedPerson',
      facetValueFilter: '?id :type "Person"',
      label: 'mentioned organization',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    mentionedProduct: {
      id: 'mentionedProduct',
      facetValueFilter: '?id :type "Product"',
      label: 'mentioned organization',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    mentionedEvent: {
      id: 'mentionedEvent',
      facetValueFilter: '?id :type "Event"',
      label: 'mentioned organization',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    mentionedLaw: {
      id: 'mentionedLaw',
      facetValueFilter: '?id :type "Law"',
      label: 'mentioned organization',
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
      labelPath: ':interviewed_person/skos:prefLabel',
      predicate: ':interviewed_person/skos:prefLabel',
      type: 'list',
      literal: true
    }
  }
}
