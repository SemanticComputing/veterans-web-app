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
    textSlice: {
      labelPath: ':text_slice/:text_content'
    },
    freeText: {
      id: 'freeText',
      labelPath: 'skos:prefLabel',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: 'wmsl:label :text_content :text_content_lemmatized',
      type: 'text'
    },
    name: {
      id: 'name',
      facetValueFilter: '',
      labelPath: '^:structured_content/:interviewed_person/skos:prefLabel',
      predicate: '^:structured_content/:interviewed_person',
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
      labelPath: ':named_entity_location/skos:prefLabel',
      predicate: ':named_entity_location',
      type: 'list'
    },
    mentionedPerson: {
      id: 'mentionedPerson',
      facetValueFilter: '',
      labelPath: ':named_entity_person/skos:prefLabel',
      predicate: ':named_entity_person',
      type: 'list'
    },
    mentionedUnit: {
      id: 'mentionedUnit',
      facetValueFilter: '',
      labelPath: ':named_entity_unit/skos:prefLabel',
      predicate: ':named_entity_unit',
      type: 'list'
    },
    mentionedOrganization: {
      id: 'mentionedOrganization',
      facetValueFilter: '',
      labelPath: ':named_entity_organization/skos:prefLabel',
      predicate: ':named_entity_organization',
      type: 'list'
    },
    mentionedEvent: {
      id: 'mentionedEvent',
      facetValueFilter: '',
      labelPath: ':named_entity_event/skos:prefLabel',
      predicate: ':named_entity_event',
      type: 'list'
    },
    mentionedProduct: {
      id: 'mentionedProduct',
      facetValueFilter: '',
      labelPath: ':named_entity_product/skos:prefLabel',
      predicate: ':named_entity_product',
      type: 'list'
    }
  }
}
