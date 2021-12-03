import {
  videoPropertiesFacetResults,
  videoPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesVideos'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'
import { createPaddedTimeCodes } from '../../Mappers'

export const videosConfig = {
  endpoint: {
    // url: 'http://localhost:3030/ds/sparql',
    url: 'https://ldf.fi/warmemoirsampo/sparql',
    prefixes,
    useAuth: true
  },
  facetClass: ':Interview',
  includeInSitemap: true,
  paginatedResults: {
    properties: videoPropertiesFacetResults
  },
  instance: {
    properties: videoPropertiesInstancePage,
    relatedInstances: '',
    defaultTab: 'video',
    postprocess: {
      func: createPaddedTimeCodes,
      config: {
        getTarget: item => item.timeSlice,
        addTimeCode: (item, paddedTimeCode) => {
          item.beginTimeLabel = paddedTimeCode
        }
      }
    }
  },
  facets: {
    prefLabel: {
      labelPath: 'skos:prefLabel'
    },
    freeText: {
      id: 'freeText',
      labelPath: 'skos:prefLabel',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: 'wmsl:label :full_text :full_text_lemmatized',
      type: 'text'
    },
    name: {
      id: 'name',
      facetValueFilter: '',
      labelPath: ':interviewed_person/skos:prefLabel',
      predicate: ':interviewed_person',
      type: 'list'
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
      hideUnknownValue: true,
      labelPath: ':named_entity_location/skos:prefLabel',
      predicate: ':named_entity_location',
      type: 'list'
    },
    mentionedPerson: {
      id: 'mentionedPerson',
      facetValueFilter: '',
      hideUnknownValue: true,
      labelPath: ':named_entity_person/skos:prefLabel',
      predicate: ':named_entity_person',
      type: 'list'
    },
    mentionedUnit: {
      id: 'mentionedUnit',
      facetValueFilter: '',
      hideUnknownValue: true,
      labelPath: ':named_entity_unit/skos:prefLabel',
      predicate: ':named_entity_unit',
      type: 'list'
    },
    mentionedOrganization: {
      id: 'mentionedOrganization',
      facetValueFilter: '',
      hideUnknownValue: true,
      labelPath: ':named_entity_organization/skos:prefLabel',
      predicate: ':named_entity_organization',
      type: 'list'
    },
    mentionedEvent: {
      id: 'mentionedEvent',
      facetValueFilter: '',
      hideUnknownValue: true,
      labelPath: ':named_entity_event/skos:prefLabel',
      predicate: ':named_entity_event',
      type: 'list'
    },
    mentionedProduct: {
      id: 'mentionedProduct',
      facetValueFilter: '',
      hideUnknownValue: true,
      labelPath: ':named_entity_product/skos:prefLabel',
      predicate: ':named_entity_product',
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
    gender: {
      id: 'gender',
      facetValueFilter: '',
      labelPath: ':interviewed_person/:gender/skos:prefLabel',
      predicate: ':interviewed_person/:gender',
      type: 'list',
      facetLabelFilter: 'FILTER(LANG(?prefLabel_) = "fi")'
    }
  }
}
