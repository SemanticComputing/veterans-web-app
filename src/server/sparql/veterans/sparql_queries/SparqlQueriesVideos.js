const perspectiveID = 'videos'

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
    BIND(?keyword__id as ?keyword__dataProviderUrl)      
  }
  UNION
  {
    ?id :video_link ?youTubeLink .
    BIND(REPLACE(STR(?youTubeLink), "https://youtu.be/", "") as ?youTubeID)
  }
  UNION 
  {
    ?id :named_entity_location ?mentionedPlace__id .
    ?mentionedPlace__id skos:prefLabel ?mentionedPlace__prefLabel .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedPlace__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedPlace__dataProviderUrl)
  }
  UNION 
  {
    ?id :structured_content/:warsa_place ?mentionedWarsaPlace__id .
    BIND(CONCAT("https://www.sotasampo.fi/fi/places/page?uri=", STR(?mentionedWarsaPlace__id)) AS  ?mentionedWarsaPlace__dataProviderUrl)
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
          ?mentionedWarsaPlace__id skos:prefLabel ?mentionedWarsaPlaceLabelFromWarsa_ . 
      }
    }
    OPTIONAL {
      SERVICE <https://ldf.fi/pnr/sparql> { 
          ?mentionedWarsaPlace__id ldff:preferredLanguageLiteral (skos:prefLabel 'fi' 'sv' '' ?mentionedWarsaPlaceLabelFromPNR_) .
      }
    }
    BIND(COALESCE(?mentionedWarsaPlaceLabelFromWarsa_, ?mentionedWarsaPlaceLabelFromPNR_, STR(?mentionedWarsaPlace__id)) as ?mentionedWarsaPlace__prefLabel)   
  }
  UNION
  {
    ?id :named_entity_organization ?mentionedOrganization__id .
    ?mentionedOrganization__id skos:prefLabel ?mentionedOrganization__prefLabel .
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedOrganization__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedOrganization__dataProviderUrl)
  }
  UNION 
  {
    ?id :structured_content/:warsa_unit ?mentionedWarsaUnit__id .
    BIND(CONCAT("https://www.sotasampo.fi/fi/page?uri=", STR(?mentionedWarsaUnit__id)) AS  ?mentionedWarsaUnit__dataProviderUrl)
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
          ?mentionedWarsaUnit__id skos:prefLabel ?mentionedWarsaUnitLabel_ . 
      }
    }
    BIND(COALESCE(?mentionedWarsaUnitLabel_, STR(?mentionedWarsaUnit__id)) as ?mentionedWarsaUnit__prefLabel)   
  }
  UNION 
  {
    ?id :named_entity_person ?mentionedPerson__id .
    ?mentionedPerson__id skos:prefLabel ?mentionedPerson__prefLabel .   
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedPerson__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedPerson__dataProviderUrl)
  }
  UNION 
  {
    ?id :structured_content/:warsa_person ?mentionedWarsaPerson__id .
    BIND(CONCAT("https://www.sotasampo.fi/fi/places/page?uri=", STR(?mentionedWarsaPerson__id)) AS  ?mentionedWarsaPerson__dataProviderUrl)
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
          ?mentionedWarsaPerson__id skos:prefLabel ?mentionedWarsaPersonLabel_ . 
      }
    }
    BIND(COALESCE(?mentionedWarsaPersonLabel_, STR(?mentionedWarsaPerson__id)) as ?mentionedWarsaPerson__prefLabel)   
  }
  UNION 
  {
    ?id :named_entity_event ?mentionedEvent__id .
    ?mentionedEvent__id skos:prefLabel ?mentionedEvent__prefLabel . 
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedEvent__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedEvent__dataProviderUrl)
  }
  UNION 
  {
    ?id :named_entity_product ?mentionedProduct__id .
    ?mentionedProduct__id skos:prefLabel ?mentionedProduct__prefLabel .   
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedProduct__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedProduct__dataProviderUrl)
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
                              :text_content ?timeSlice__textSlice__textContent ;
                              :annotated_text_content ?timeSlice__textSlice__annotatedTextContent .
    
    # BIND(CONCAT("<p>", ?timeSlice__textSlice__annotatedtextContent_, "</p>") as ?timeSlice__textSlice__annotatedtextContent)
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
  UNION 
  {
    ?id :structured_content ?timeSlice__id .
    ?timeSlice__id :warsa_person ?timeSlice__warsaPerson__id .
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
        ?timeSlice__warsaPerson__id skos:prefLabel ?warsaPersonLabel . 
      }
    }
    BIND(REPLACE(STR(?timeSlice__warsaPerson__id), "^.*\\\\/(.+)", "$1") as ?warsaPersonLocalID)
    BIND(CONCAT("https://www.sotasampo.fi/fi/persons/", STR(?warsaPersonLocalID)) AS  ?timeSlice__warsaPerson__dataProviderUrl)  
    BIND(COALESCE(?warsaPersonLabel, ?warsaPersonLocalID) as ?timeSlice__warsaPerson__prefLabel)
  }
  UNION 
  {
    ?id :structured_content ?timeSlice__id .
    ?timeSlice__id :warsa_unit ?timeSlice__warsaUnit__id .
    BIND(CONCAT("https://www.sotasampo.fi/fi/page?uri=", STR(?timeSlice__warsaUnit__id)) AS  ?timeSlice__warsaUnit__dataProviderUrl)  
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
        ?timeSlice__warsaUnit__id skos:prefLabel ?warsaUnitLabel . 
      }
    }
    BIND(REPLACE(STR(?timeSlice__warsaUnit__id), "^.*\\\\/(.+)", "$1") as ?warsaUnitLabelFromURI)
    BIND(COALESCE(?warsaUnitLabel, ?warsaPlaceLabelFromURI) as ?timeSlice__warsaUnit__prefLabel) 
  }
  UNION
  {
    ?id :structured_content ?timeSlice__id .
    ?timeSlice__id :warsa_place ?timeSlice__warsaPlace__id .
    BIND(CONCAT("https://www.sotasampo.fi/fi/places/page?uri=", STR(?timeSlice__warsaPlace__id)) AS  ?timeSlice__warsaPlace__dataProviderUrl)
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
        ?timeSlice__warsaPlace__id skos:prefLabel ?warsaPlaceLabelFromWarsa_ . 
      }
    }
     OPTIONAL {
      SERVICE <https://ldf.fi/pnr/sparql> { 
        ?timeSlice__warsaPlace__id ldff:preferredLanguageLiteral (skos:prefLabel 'fi' 'sv' '' ?warsaPlaceLabelFromPNR_) .
      }
    }
    BIND(REPLACE(STR(?timeSlice__warsaPlace__id), "^.*\\\\/(.+)", "$1") as ?warsaPlaceLabelFromURI)
    BIND(COALESCE(?warsaPlaceLabelFromWarsa_, ?warsaPlaceLabelFromPNR_, STR(?warsaPlaceLabelFromURI)) as ?timeSlice__warsaPlace__prefLabel)   
  }
`

export const videoPropertiesFacetResults = `
  ?id :interviewed_person/skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  {
    ?id :keyword ?keyword__id .
    ?keyword__id skos:prefLabel ?keyword__prefLabel .
    ?keyword__id :uri ?keyword__dataProviderUrl .
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
  {
    ?id :named_entity_location ?mentionedPlace__id .
    ?mentionedPlace__id skos:prefLabel ?mentionedPlace__prefLabel . 
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedPlace__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedPlace__dataProviderUrl)
  }
  UNION 
  {
    ?id :structured_content/:warsa_place ?mentionedWarsaPlace__id .
    BIND(CONCAT("https://www.sotasampo.fi/fi/places/page?uri=", STR(?mentionedWarsaPlace__id)) AS  ?mentionedWarsaPlace__dataProviderUrl)
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
          ?mentionedWarsaPlace__id skos:prefLabel ?mentionedWarsaPlaceLabelFromWarsa_ . 
      }
    }
    OPTIONAL {
      SERVICE <https://ldf.fi/pnr/sparql> { 
          ?mentionedWarsaPlace__id ldff:preferredLanguageLiteral (skos:prefLabel 'fi' 'sv' '' ?mentionedWarsaPlaceLabelFromPNR_) .
      }
    }
    BIND(COALESCE(?mentionedWarsaPlaceLabelFromWarsa_, ?mentionedWarsaPlaceLabelFromPNR_, STR(?mentionedWarsaPlace__id)) as ?mentionedWarsaPlace__prefLabel)   
  }
  UNION
  {
    ?id :named_entity_organization ?mentionedOrganization__id .
    ?mentionedOrganization__id skos:prefLabel ?mentionedOrganization__prefLabel .  
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedOrganization__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedOrganization__dataProviderUrl)
  }
  UNION 
  {
    ?id :structured_content/:warsa_unit ?mentionedWarsaUnit__id .
    BIND(CONCAT("https://www.sotasampo.fi/fi/page?uri=", STR(?mentionedWarsaUnit__id)) AS  ?mentionedWarsaUnit__dataProviderUrl)
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
          ?mentionedWarsaUnit__id skos:prefLabel ?mentionedWarsaUnitLabel_ . 
      }
    }
    BIND(COALESCE(?mentionedWarsaUnitLabel_, STR(?mentionedWarsaUnit__id)) as ?mentionedWarsaUnit__prefLabel)   
  }
  UNION 
  {
    ?id :named_entity_person ?mentionedPerson__id .
    ?mentionedPerson__id skos:prefLabel ?mentionedPerson__prefLabel .  
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedPerson__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedPerson__dataProviderUrl)
  }
  UNION 
  {
    ?id :structured_content/:warsa_person ?mentionedWarsaPerson__id .
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
          ?mentionedWarsaPerson__id skos:prefLabel ?mentionedWarsaPersonLabel_ . 
      }
    }
    BIND(REPLACE(STR(?mentionedWarsaPerson__id), "^.*\\\\/(.+)", "$1") as ?warsaPersonLocalID)
    BIND(CONCAT("https://www.sotasampo.fi/fi/persons/", STR(?warsaPersonLocalID)) AS  ?mentionedWarsaPerson__dataProviderUrl)  
    BIND(COALESCE(?mentionedWarsaPersonLabel_, STR(?mentionedWarsaPerson__id)) as ?mentionedWarsaPerson__prefLabel)   
  }
  UNION 
  {
    ?id :named_entity_event ?mentionedEvent__id .
    ?mentionedEvent__id skos:prefLabel ?mentionedEvent__prefLabel .   
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedEvent__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedEvent__dataProviderUrl)
  }
  UNION 
  {
    ?id :named_entity_product ?mentionedProduct__id .
    ?mentionedProduct__id skos:prefLabel ?mentionedProduct__prefLabel .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedProduct__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedProduct__dataProviderUrl)
  }
`
