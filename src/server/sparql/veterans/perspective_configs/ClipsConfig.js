import {
  // clipPropertiesInstancePage,
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
  // instance: {
  //   properties: clipPropertiesInstancePage,
  //   relatedInstances: '',
  //   defaultTab: 'table'
  // },
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
      textQueryProperty: 'vetluc:label :text_content :text_content_lemmatized',
      type: 'text'
    },
    keyword: {
      id: 'keyword',
      facetValueFilter: '',
      labelPath: ':keyword/skos:prefLabel',
      predicate: ':keyword',
      type: 'list'
    },
    namedEntity: {
      id: 'namedEntity',
      facetValueFilter: '',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    mentionedPlace: {
      id: 'mentionedPlace',
      facetValueFilter: '?id :type "Location"',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    mentionedOrganization: {
      id: 'mentionedOrganization',
      facetValueFilter: '?id :type "Organization"',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    mentionedPerson: {
      id: 'mentionedPerson',
      facetValueFilter: '?id :type "Person"',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    mentionedProduct: {
      id: 'mentionedProduct',
      facetValueFilter: '?id :type "Product"',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    mentionedEvent: {
      id: 'mentionedEvent',
      facetValueFilter: '?id :type "Event"',
      labelPath: ':named_entity/skos:prefLabel',
      predicate: ':named_entity',
      type: 'list'
    },
    mentionedLaw: {
      id: 'mentionedLaw',
      facetValueFilter: '?id :type "Law"',
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
    dateOfInterview: {
      labelPath: ':date_of_interview'
    },
    name: {
      id: 'name',
      facetValueFilter: '',
      labelPath: ':interviewed_person/skos:prefLabel',
      predicate: ':interviewed_person/skos:prefLabel',
      type: 'list',
      literal: true
    },
    mentionedWarsaPerson: {
      id: 'mentionedWarsaPerson',
      facetValueFilter: '',
      labelPath: ':warsa_person',
      predicate: ':warsa_person',
      labelPattern: `
        OPTIONAL {
          SERVICE <https://ldf.fi/warsa/sparql> { 
            ?id skos:prefLabel ?prefLabel_ . 
          } 
        }
        BIND(COALESCE(STR(?prefLabel_), STR(?id)) AS ?prefLabel)
      `,
      type: 'list'
    },
    mentionedWarsaUnit: {
      id: 'mentionedWarsaUnit',
      facetValueFilter: '',
      labelPath: ':warsa_unit',
      predicate: ':warsa_unit',
      labelPattern: `
        OPTIONAL {
          SERVICE <https://ldf.fi/warsa/sparql> { 
            ?id skos:prefLabel ?prefLabel_ . 
          } 
        }
        BIND(COALESCE(STR(?prefLabel_), STR(?id)) AS ?prefLabel)
      `,
      type: 'list'
    },
    mentionedWarsaPlace: {
      id: 'mentionedWarsaPlace',
      facetValueFilter: '',
      labelPath: ':warsa_place',
      predicate: ':warsa_place',
      labelPattern: `
        OPTIONAL {
          SERVICE <https://ldf.fi/warsa/sparql> { 
            ?id skos:prefLabel ?prefLabel_ . 
          } 
        }
        OPTIONAL {
          SERVICE <https://ldf.fi/pnr/sparql> { 
            ?id skos:prefLabel ?prefLabel_ . 
          } 
        }
        BIND(COALESCE(STR(?prefLabel_), STR(?id)) AS ?prefLabel)
      `,
      type: 'list'
    }
  }
}
