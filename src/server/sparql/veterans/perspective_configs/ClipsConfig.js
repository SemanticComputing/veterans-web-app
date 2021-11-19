import {
  // clipPropertiesInstancePage,
  clipPropertiesFacetResults
} from '../sparql_queries/SparqlQueriesClips'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'
import { createPaddedTimeCodes } from '../../Mappers'

export const clipsConfig = {
  endpoint: {
    // url: 'http://localhost:3030/ds/sparql',
    url: 'https://ldf.fi/warmemoirsampo/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: ':TimeSlice',
  includeInSitemap: true,
  paginatedResults: {
    properties: clipPropertiesFacetResults,
    postprocess: {
      func: createPaddedTimeCodes,
      config: {
        getTarget: item => item.prefLabel,
        addTimeCode: (item, paddedTimeCode) => {
          item.prefLabel = `${item.prefLabel} / ${paddedTimeCode}`
        }
      }
    }
  },
  // instance: {
  //   properties: clipPropertiesInstancePage,
  //   relatedInstances: '',
  //   defaultTab: 'table'
  // },
  facets: {
    prefLabel: {
      labelPath: 'skos:prefLabel'
    },
    freeText: {
      id: 'freeText',
      labelPath: 'skos:prefLabel',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: 'wmsl:label :text_content :text_content_lemmatized',
      type: 'text'
    },
    keyword: {
      id: 'keyword',
      facetValueFilter: '',
      labelPath: ':keyword/skos:prefLabel',
      predicate: ':keyword',
      type: 'list'
    },
    mentionedPlace: {
      id: 'mentionedPlace',
      facetValueFilter: '',
      labelPath: ':named_entity_location/skos:prefLabel',
      predicate: ':named_entity_location',
      type: 'list'
    },
    mentionedOrganization: {
      id: 'mentionedOrganization',
      facetValueFilter: '',
      labelPath: ':named_entity_organization/skos:prefLabel',
      predicate: ':named_entity_organization',
      type: 'list'
    },
    mentionedPerson: {
      id: 'mentionedPerson',
      facetValueFilter: '',
      labelPath: ':named_entity_person/skos:prefLabel',
      predicate: ':named_entity_person',
      type: 'list'
    },
    mentionedProduct: {
      id: 'mentionedProduct',
      facetValueFilter: '',
      labelPath: ':named_entity_product/skos:prefLabel',
      predicate: ':named_entity_product',
      type: 'list'
    },
    mentionedEvent: {
      id: 'mentionedEvent',
      facetValueFilter: '',
      labelPath: ':named_entity_event/skos:prefLabel',
      predicate: ':named_entity_event',
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
      labelPath: '^:structured_content/:interviewed_person/skos:prefLabel',
      predicate: '^:structured_content/:interviewed_person',
      type: 'list'
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
            ?id skos:prefLabel ?prefLabelFromWarsa . 
          } 
        }
        OPTIONAL {
          SERVICE <https://ldf.fi/pnr/sparql> { 
            ?id ldff:preferredLanguageLiteral (skos:prefLabel 'fi' 'sv' '' ?prefLabelFromPNR) 
          } 
        }
        BIND(COALESCE(?prefLabelFromWarsa, ?prefLabelFromPNR, STR(?id)) AS ?prefLabel)
      `,
      type: 'list'
    }
  }
}
