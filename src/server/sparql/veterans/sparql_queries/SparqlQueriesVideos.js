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
    ?id :keyword ?keyword__id .
    ?keyword__id skos:prefLabel ?keyword__prefLabel .
    ?keyword__id :uri ?keyword__dataProviderUrl .
  }
  UNION
  {
    ?id :keyword ?keyword__id .
    ?keyword__id skos:prefLabel ?keyword__prefLabel .
    ?keyword__id :uri ?keyword__dataProviderUrl .
  }
  UNION 
  {
    ?id :weighted_keyword ?wkw .
    ?wkw :keyword ?weightedKeyword__id ;
          :keyword/skos:prefLabel ?weightedKeyword__prefLabel ;
          :weight ?weightedKeyword__weight .
  }
  UNION
  {
    ?id :video_link ?videoLink .
  }
  # UNION
  # {
  #   ?id :named_entity ?namedEntity__id .
  #   ?namedEntity__id skos:prefLabel ?namedEntity__prefLabel .
  #   BIND(CONCAT("/entities/page/", REPLACE(STR(?namedEntity__id ), "^.*\\\\/(.+)", "$1")) AS ?namedEntity__dataProviderUrl)
  # }
  UNION 
  {
    ?id :named_entity ?mentionedPlace__id .
    ?mentionedPlace__id skos:prefLabel ?mentionedPlace__prefLabel ;
                        :type "Location" .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedPlace__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedPlace__dataProviderUrl)
  }
  UNION 
  {
    ?id :structured_content/:warsa_place ?mentionedWarsaPlace__id .
    BIND(CONCAT("https://www.sotasampo.fi/fi/places/page?uri=", STR(?mentionedWarsaPlace__id)) AS  ?mentionedWarsaPlace__dataProviderUrl)
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
          ?mentionedWarsaPlace__id skos:prefLabel ?mentionedWarsaPlaceLabel_ . 
      }
    }
    OPTIONAL {
      SERVICE <https://ldf.fi/pnr/sparql> { 
          ?mentionedWarsaPlace__id skos:prefLabel ?mentionedWarsaPlaceLabel_ . 
          FILTER(LANG(?mentionedWarsaPlaceLabel_) = 'fi')
      }
    }
    BIND(COALESCE(?mentionedWarsaPlaceLabel_, STR(?mentionedWarsaPlace__id)) as ?mentionedWarsaPlace__prefLabel)   
  }
  UNION
  {
    ?id :named_entity ?mentionedOrganization__id .
    ?mentionedOrganization__id skos:prefLabel ?mentionedOrganization__prefLabel ;
                        :type "Organization" .    
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
    ?id :named_entity ?mentionedPerson__id .
    ?mentionedPerson__id skos:prefLabel ?mentionedPerson__prefLabel ;
                        :type "Person" .    
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
    ?id :named_entity ?mentionedEvent__id .
    ?mentionedEvent__id skos:prefLabel ?mentionedEvent__prefLabel ;
                        :type "Event" .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedEvent__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedEvent__dataProviderUrl)
  }
  UNION 
  {
    ?id :named_entity ?mentionedProduct__id .
    ?mentionedProduct__id skos:prefLabel ?mentionedProduct__prefLabel ;
                        :type "Product" .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedProduct__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedProduct__dataProviderUrl)
  }
  UNION 
  {
    ?id :structured_content ?timeSlice__id .
    ?timeSlice__id  :begin_timestamp ?beginTimestamp ;
                    :end_timestamp ?endTimestamp ;
                    :order ?timeSlice__order ;
                    :text_content ?timeSlice__textContent .
                    

    ?timeSlice__id :text_slice ?timeSlice__textSlice__id .
    ?timeSlice__textSlice__id :order ?timeSlice__textSlice__order ;
                              :text_content ?timeSlice__textSlice__textContent . 

    BIND(CONCAT(SUBSTR(?timeSlice__textContent, 1, 50), '...') as ?timeSlice__prefLabel)                
    
    BIND(HOURS(?beginTimestamp) as ?beginHours)
    BIND(MINUTES(?beginTimestamp) as ?beginMinutes)
    BIND(SECONDS(?beginTimestamp) as ?beginSeconds)
    BIND(CONCAT(STR(?beginHours), ':', STR(?beginMinutes), ':', STR(xsd:integer(?beginSeconds))) as ?timeSlice__beginTimeLabel)
    BIND(?beginHours * 60 * 60 + ?beginMinutes * 60 + ?beginSeconds as ?beginTimeInSeconds_)
    BIND(xsd:integer(?beginTimeInSeconds_) as ?timeSlice__beginTimeInSeconds) 
    
    BIND(HOURS(?endTimestamp) as ?endHours)
    BIND(MINUTES(?endTimestamp) as ?endMinutes)
    BIND(SECONDS(?endTimestamp) as ?endSeconds)
    BIND(CONCAT(STR(?endHours), ':', STR(?endMinutes), ':', STR(xsd:integer(?endSeconds) - 1)) as ?timeSlice__endTimeLabel)
    BIND(?endHours * 60 * 60 + ?endMinutes * 60 + ?endSeconds as ?endTimeInSeconds_)
    BIND(xsd:integer(?endTimeInSeconds_) - 1 as ?timeSlice__endTimeInSeconds) 
  }
  UNION 
  {
    ?id :structured_content ?timeSlice__id .
    ?timeSlice__id :named_entity ?timeSlice__namedEntity__id .
    ?timeSlice__namedEntity__id skos:prefLabel ?timeSlice__namedEntity__prefLabel .
    BIND(CONCAT("/entities/page/", REPLACE(STR(?timeSlice__namedEntity__id ), "^.*\\\\/(.+)", "$1")) AS ?timeSlice__namedEntity__dataProviderUrl)  
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
        ?timeSlice__warsaPlace__id skos:prefLabel ?warsaPlaceLabel . 
      }
    }
     OPTIONAL {
      SERVICE <https://ldf.fi/pnr/sparql> { 
        ?timeSlice__warsaPlace__id skos:prefLabel ?warsaPlaceLabel . 
        FILTER(LANG(?warsaPlaceLabel) = 'fi')
      }
    }
    BIND(REPLACE(STR(?timeSlice__warsaPlace__id), "^.*\\\\/(.+)", "$1") as ?warsaPlaceLabelFromURI)
    BIND(COALESCE(?warsaPlaceLabel, ?warsaPlaceLabelFromURI) as ?timeSlice__warsaPlace__prefLabel)   
  }
`

export const videoPropertiesFacetResults = `
  ?id :interviewed_person/skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
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
    {
    ?id :place_of_interview ?placeOfInterview__id .
    BIND (?placeOfInterview__id AS ?placeOfInterview__prefLabel)
  }
  }
  UNION
  {
    ?id :date_of_interview ?dateOfInterview__id .
    BIND (?dateOfInterview__id AS ?dateOfInterview__prefLabel)
  }
 
  UNION
  {
    ?id :keyword ?keyword__id .
    ?keyword__id skos:prefLabel ?keyword__prefLabel .
    ?keyword__id :uri ?keyword__dataProviderUrl .
  }
  # UNION
  # {
  #   ?id :named_entity ?namedEntity__id .
  #   ?namedEntity__id skos:prefLabel ?namedEntity__prefLabel .
  #   BIND(CONCAT("/entities/page/", REPLACE(STR(?namedEntity__id ), "^.*\\\\/(.+)", "$1")) AS ?namedEntity__dataProviderUrl)
  # }
  UNION 
  {
    ?id :named_entity ?mentionedPlace__id .
    ?mentionedPlace__id skos:prefLabel ?mentionedPlace__prefLabel ;
                        :type "Location" .    
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
          ?mentionedWarsaPlace__id skos:prefLabel ?mentionedWarsaPlaceLabelFromPNR_ .
          FILTER(LANG(?mentionedWarsaPlaceLabelFromPNR_) = 'fi') 
      }
    }
    BIND(COALESCE(?mentionedWarsaPlaceLabelFromWarsa_, ?mentionedWarsaPlaceLabelFromPNR_, STR(?mentionedWarsaPlace__id)) as ?mentionedWarsaPlace__prefLabel)   
  }
  UNION
  {
    ?id :named_entity ?mentionedOrganization__id .
    ?mentionedOrganization__id skos:prefLabel ?mentionedOrganization__prefLabel ;
                        :type "Organization" .    
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
    ?id :named_entity ?mentionedPerson__id .
    ?mentionedPerson__id skos:prefLabel ?mentionedPerson__prefLabel ;
                        :type "Person" .    
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
    ?id :named_entity ?mentionedEvent__id .
    ?mentionedEvent__id skos:prefLabel ?mentionedEvent__prefLabel ;
                        :type "Event" .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedEvent__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedEvent__dataProviderUrl)
  }
  UNION 
  {
    ?id :named_entity ?mentionedProduct__id .
    ?mentionedProduct__id skos:prefLabel ?mentionedProduct__prefLabel ;
                        :type "Product" .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedProduct__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedProduct__dataProviderUrl)
  }
`
