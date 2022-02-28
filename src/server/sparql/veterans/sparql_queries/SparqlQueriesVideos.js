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
` {  
    ?id :interviewed_person/skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
  }
  UNION
  {
    ?id :interviewed_person/:year_of_birth ?yearOfBirth .
  }
  UNION
  {
    ?id :interviewed_person/:place_of_birth_literal ?placeOfBirth .
  }
  UNION
  {
    ?id :interviewed_person/:warsa_page ?warsaPage__id .
    BIND(?warsaPage__id as ?warsaPage__dataProviderUrl)
    BIND("Sotasampo" as ?warsaPage__prefLabel)
  }
  UNION
  {
    ?id :place_of_interview ?placeOfInterview .
  }
  UNION
  {
    ?id :date_of_interview ?dateOfInterview_ .
    BIND(CONCAT(STR(DAY(?dateOfInterview_)), 
                     ".", 
                     STR(MONTH(?dateOfInterview_)), 
                     ".", 
                    STR(YEAR(?dateOfInterview_))) as ?dateOfInterview)
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
    
    # Rafaelin tuottama annotoitu teksti
    OPTIONAL { ?timeSlice__id :text_content_annotated ?timeSlice__annotatedTextContent }
                    

    ?timeSlice__id :text_slice ?timeSlice__textSlice__id .
    ?timeSlice__textSlice__id :order ?timeSlice__textSlice__order ;
                              :text_content ?timeSlice__textSlice__textContent .
    
    # Clairen tuottama annotoitu teksti
    # OPTIONAL { ?timeSlice__textSlice__id :annotated_text_content ?timeSlice__textSlice__annotatedTextContent }
                            
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
  UNION
  {
    ?id :video_link ?youTubeLink .
    BIND(REPLACE(STR(?youTubeLink), "https://youtu.be/", "") as ?youTubeID)
    BIND(CONCAT("https://i.ytimg.com/vi/", ?youTubeID, "/mqdefault.jpg") as ?youTubeThumbnail__id)
    BIND(?youTubeThumbnail__id as ?youTubeThumbnail__url)
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?youTubeThumbnail__dataProviderUrl) 
  }
  UNION 
  ${createNamedEntitiesBlock({
    idPattern: '',
    id: 'id',
    idObject: ''
  })}
`

export const videoInstancePageMapQuery = `
  SELECT 
  ?id ?video ?prefLabel__id ?prefLabel__prefLabel ?dataProviderUrl ?markerColor
  ?timeSlice__id ?timeSlice__prefLabel ?timeSlice__dataProviderUrl
  (SAMPLE(?lat_) as ?lat)
  (SAMPLE(?long_) as ?long)
  WHERE {
    VALUES ?video { <ID> }
    ?video :named_entity_location ?id .
    ?id skos:prefLabel ?prefLabel__id ;
           wgs84:lat ?lat_ ;
           wgs84:long ?long_ .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)      
    BIND(CONCAT("/entities/page/", REPLACE(STR(?id ), "^.*\\\\/(.+)", "$1")) AS ?dataProviderUrl)
    BIND("red" AS ?markerColor)

    # create time slice objects
    ?video :structured_content ?timeSlice__id .
    ?timeSlice__id :named_entity_location ?id ;
                    skos:prefLabel ?timeSlice__prefLabel ;
                  :begin_timestamp ?beginTimestamp .
    BIND(HOURS(?beginTimestamp) as ?hours)
    BIND(MINUTES(?beginTimestamp) as ?minutes)
    BIND(xsd:integer(SECONDS(?beginTimestamp)) as ?seconds)              
    BIND(CONCAT("/videos/page/", REPLACE(STR(?video), "^.*\\\\/(.+)", "$1")) AS ?videoPageLink)
    BIND(?hours * 60 * 60 + ?minutes * 60 + ?seconds as ?beginTimeInSeconds_)
    BIND(xsd:integer(?beginTimeInSeconds_) as ?beginTimeInSeconds)
    BIND(CONCAT('/video#', STR(?beginTimeInSeconds)) AS ?videoPageLinkHash)
    BIND(CONCAT(?videoPageLink, ?videoPageLinkHash) AS ?timeSlice__dataProviderUrl)
  }
  GROUP BY ?id ?video ?prefLabel__id ?prefLabel__prefLabel ?dataProviderUrl ?markerColor
  ?timeSlice__id ?timeSlice__prefLabel ?timeSlice__dataProviderUrl
`
