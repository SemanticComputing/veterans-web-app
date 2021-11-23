const perspectiveID = 'videos'

export const createNamedEntitiesBlock = ({ idPattern, id, idObject }) => {
  let template = `
    {
      <ID_PATTERN>
      ?<ID> :named_entity_location ?<ID_OBJECT>mentionedPlace__id .
      ?<ID_OBJECT>mentionedPlace__id skos:prefLabel ?<ID_OBJECT>mentionedPlace__prefLabel . 
      BIND(CONCAT("/entities/page/", REPLACE(STR(?<ID_OBJECT>mentionedPlace__id ), "^.*\\\\/(.+)", "$1")) AS ?<ID_OBJECT>mentionedPlace__dataProviderUrl)
    }
    UNION 
    {
      <ID_PATTERN>
      ?<ID> :named_entity_person ?<ID_OBJECT>mentionedPerson__id .
      ?<ID_OBJECT>mentionedPerson__id skos:prefLabel ?<ID_OBJECT>mentionedPerson__prefLabel .  
      BIND(CONCAT("/entities/page/", REPLACE(STR(?<ID_OBJECT>mentionedPerson__id ), "^.*\\\\/(.+)", "$1")) AS ?<ID_OBJECT>mentionedPerson__dataProviderUrl)
    }
    UNION
    {
      <ID_PATTERN>
      ?<ID> :named_entity_unit ?<ID_OBJECT>mentionedUnit__id .
      ?<ID_OBJECT>mentionedUnit__id skos:prefLabel ?<ID_OBJECT>mentionedUnit__prefLabel .  
      BIND(CONCAT("/entities/page/", REPLACE(STR(?<ID_OBJECT>mentionedUnit__id ), "^.*\\\\/(.+)", "$1")) AS ?<ID_OBJECT>mentionedUnit__dataProviderUrl)
    }
    UNION
    {
      <ID_PATTERN>
      ?<ID> :named_entity_organization ?<ID_OBJECT>mentionedOrganization__id .
      ?<ID_OBJECT>mentionedOrganization__id skos:prefLabel ?<ID_OBJECT>mentionedOrganization__prefLabel .  
      BIND(CONCAT("/entities/page/", REPLACE(STR(?<ID_OBJECT>mentionedOrganization__id ), "^.*\\\\/(.+)", "$1")) AS ?<ID_OBJECT>mentionedOrganization__dataProviderUrl)
    }
    UNION 
    {
      <ID_PATTERN>
      ?<ID> :named_entity_event ?<ID_OBJECT>mentionedEvent__id .
      ?<ID_OBJECT>mentionedEvent__id skos:prefLabel ?<ID_OBJECT>mentionedEvent__prefLabel .   
      BIND(CONCAT("/entities/page/", REPLACE(STR(?<ID_OBJECT>mentionedEvent__id ), "^.*\\\\/(.+)", "$1")) AS ?<ID_OBJECT>mentionedEvent__dataProviderUrl)
    }
    UNION 
    {
      <ID_PATTERN>
      ?<ID> :named_entity_product ?<ID_OBJECT>mentionedProduct__id .
      ?<ID_OBJECT>mentionedProduct__id skos:prefLabel ?<ID_OBJECT>mentionedProduct__prefLabel .    
      BIND(CONCAT("/entities/page/", REPLACE(STR(?<ID_OBJECT>mentionedProduct__id ), "^.*\\\\/(.+)", "$1")) AS ?<ID_OBJECT>mentionedProduct__dataProviderUrl)
    }
  `
  template = template.replaceAll('<ID_PATTERN>', idPattern)
  template = template.replaceAll('<ID>', id)
  template = template.replaceAll('<ID_OBJECT>', idObject)
  return template
}

export const videoPropertiesInstancePage =
`
  ?id :interviewed_person/skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  {
    ?id :place_of_interview ?placeOfInterview__id .
    BIND (?placeOfInterview__id AS ?placeOfInterview__prefLabel)
  }
  UNION
  {
    ?id :date_of_interview ?dateOfInterview__id .
    BIND (?dateOfInterview__id AS ?dateOfInterview__prefLabel)
  }
  UNION 
  {
    ?id :length ?raw_length .
    BIND(HOURS(?raw_length) AS ?hours)
    BIND(MINUTES(?raw_length) AS ?minutes)
    BIND(SECONDS(?raw_length) AS ?seconds)
    BIND(
      CONCAT(
          CONCAT(STR(?hours), 'h '), CONCAT(STR(?minutes), 'm')
        ) AS ?length
      )
  }
  UNION 
  {
    ?id :weighted_keyword ?wkw .
    ?wkw :keyword ?keyword__id ;
          :keyword/skos:prefLabel ?keyword__prefLabel ;
          :weight ?keyword__weight .
     BIND(CONCAT("/keywords/page/", REPLACE(STR(?keyword__id), "^.*\\\\/(.+)", "$1")) AS ?keyword__dataProviderUrl)      
  }
  UNION
  {
    ?id :video_link ?youTubeLink .
    BIND(REPLACE(STR(?youTubeLink), "https://youtu.be/", "") as ?youTubeID)
  }
  UNION 
  {
    ?id :structured_content ?timeSlice__id .
    ?timeSlice__id  :begin_timestamp ?beginTimestamp ;
                    :end_timestamp ?endTimestamp ;
                    :text_content ?timeSlice__textContent ;
                    :order ?timeSlice__order .
                    

    ?timeSlice__id :text_slice ?timeSlice__textSlice__id .
    ?timeSlice__textSlice__id :order ?timeSlice__textSlice__order ;
                              :text_content ?timeSlice__textSlice__textContent .
    OPTIONAL { ?timeSlice__textSlice__id :annotated_text_content ?timeSlice__textSlice__annotatedTextContent }
                            
    BIND(CONCAT(SUBSTR(?timeSlice__textContent, 1, 50), '...') as ?timeSlice__prefLabel)                
    
    BIND(HOURS(?beginTimestamp) as ?timeSlice__hours)
    BIND(MINUTES(?beginTimestamp) as ?timeSlice__minutes)
    BIND(xsd:integer(SECONDS(?beginTimestamp)) as ?timeSlice__seconds)
    BIND(?timeSlice__hours * 60 * 60 + ?timeSlice__minutes * 60 + ?timeSlice__seconds as ?timeSlice__beginTimeInSeconds)
    
    BIND(HOURS(?endTimestamp) as ?timeSlice__endHours)
    BIND(MINUTES(?endTimestamp) as ?timeSlice__endMinutes)
    BIND(xsd:integer(SECONDS(?endTimestamp)) as ?timeSlice__endSeconds)
    BIND(?timeSlice__endHours * 60 * 60 + ?timeSlice__endMinutes * 60 + ?timeSlice__endSeconds as ?timeSlice__endTimeInSeconds)
  }
  UNION
  ${createNamedEntitiesBlock({
    idPattern: '',
    id: 'id',
    idObject: ''
  })}
  UNION
  ${createNamedEntitiesBlock({
    idPattern: '?id :structured_content ?timeSlice__id .',
    id: 'timeSlice__id',
    idObject: 'timeSlice__'
  })}
  UNION
  {
    ?id :structured_content/:text_slice/:ne_reference ?neReferenceInterview .
    ?neReferenceInterview skos:relatedMatch ?namedEntityWikidata__id ;
                          :category ?namedEntityWikidata__category .
    OPTIONAL { ?neReferenceInterview :wikipedia ?namedEntityWikidata__wikipediaLink }             
    ?namedEntityWikidata__id skos:prefLabel ?namedEntityWikidata__prefLabel .                               
    OPTIONAL { ?namedEntityWikidata__id dct:description ?namedEntityWikidata__description }
    OPTIONAL { ?namedEntityWikidata__id :ne_image ?namedEntityWikidata__imageLink }
    OPTIONAL {
      ?namedEntityWikidata__id wgs84:lat ?namedEntityWikidata__lat ;
                                          wgs84:long ?namedEntityWikidata__long .
    }
  }
  UNION 
  {
    ?id :structured_content ?timeSlice__id .
    ?timeSlice__id :text_slice/:ne_reference ?neReference .
    ?neReference skos:relatedMatch ?timeSlice__namedEntityWikidata__id ;
                 :category ?timeSlice__namedEntityWikidata__category .
    OPTIONAL { ?neReference :wikipedia ?timeSlice__namedEntityWikidata__wikipediaLink }             
    ?timeSlice__namedEntityWikidata__id skos:prefLabel ?timeSlice__namedEntityWikidata__prefLabel .                               
    OPTIONAL { ?timeSlice__namedEntityWikidata__id dct:description ?timeSlice__namedEntityWikidata__description }
    OPTIONAL { ?timeSlice__namedEntityWikidata__id :ne_image ?timeSlice__namedEntityWikidata__imageLink }
    OPTIONAL {
      ?timeSlice__namedEntityWikidata__id wgs84:lat ?timeSlice__namedEntityWikidata__lat ;
                                          wgs84:long ?timeSlice__namedEntityWikidata__long .
    }
  }
`

export const videoPropertiesFacetResults = `
  ?id :interviewed_person/skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  {
    ?id :keyword ?keyword__id .
    ?keyword__id skos:prefLabel ?keyword__prefLabel .
    BIND(CONCAT("/keywords/page/", REPLACE(STR(?keyword__id), "^.*\\\\/(.+)", "$1")) AS ?keyword__dataProviderUrl) 
  }
  # UNION 
  # {
  #   ?id :length ?raw_length .
  #   BIND(HOURS(?raw_length) AS ?hours)
  #   BIND(MINUTES(?raw_length) AS ?minutes)
  #   BIND(SECONDS(?raw_length) AS ?seconds)
  #   BIND(
  #     CONCAT(
  #       CONCAT(STR(?hours), 'h '), CONCAT(STR(?minutes), 'm')
  #     ) AS ?length
  #   )
  # }
  UNION 
  ${createNamedEntitiesBlock({
    idPattern: '',
    id: 'id',
    idObject: ''
  })}
`
