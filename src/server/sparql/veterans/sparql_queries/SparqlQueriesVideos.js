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
    # UNION
    # {
    #   SELECT ?id ?weightedKeyword__id ?weightedKeyword__prefLabel (MAX(?weight) as ?weightedKeyword__weight) {
    #     ?id :weighted_keyword ?wkw .
    #     ?wkw :keyword ?weightedKeyword__id ;
    #          :keyword/skos:prefLabel ?weightedKeyword__prefLabel ;
    #           :weight ?weight .
    #   }
    #   GROUP BY ?id ?weightedKeyword__id ?weightedKeyword__prefLabel
    # }
    UNION
    {
      ?id :video_link ?videoLink .
    }
    UNION
    {
      ?id :named_entity ?namedEntity__id .
      ?namedEntity__id skos:prefLabel ?namedEntity__prefLabel .
      BIND(CONCAT("/entities/page/", REPLACE(STR(?namedEntity__id ), "^.*\\\\/(.+)", "$1")) AS ?namedEntity__dataProviderUrl)
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

      OPTIONAL {
        ?timeSlice__id :named_entity ?timeSlice__namedEntity__id .
        ?timeSlice__namedEntity__id skos:prefLabel ?timeSlice__namedEntity__prefLabel .
        BIND(CONCAT("/entities/page/", REPLACE(STR(?timeSlice__namedEntity__id ), "^.*\\\\/(.+)", "$1")) AS ?timeSlice__namedEntity__dataProviderUrl)  
      }  

      OPTIONAL {
        ?timeSlice__id :warsa_person ?timeSlice__warsaPerson__id .
        BIND(REPLACE(STR(?timeSlice__warsaPerson__id), "^.*\\\\/(.+)", "$1") as ?timeSlice__warsaPerson__prefLabel)
        BIND(CONCAT("https://www.sotasampo.fi/fi/page?uri=", STR(?timeSlice__warsaPerson__id)) AS  ?timeSlice__warsaPerson__dataProviderUrl)  
      }   

      OPTIONAL {
        ?timeSlice__id :warsa_unit ?timeSlice__warsaUnit__id .
        BIND(REPLACE(STR(?timeSlice__warsaUnit__id), "^.*\\\\/(.+)", "$1") as ?timeSlice__warsaUnit__prefLabel)
        BIND(CONCAT("https://www.sotasampo.fi/fi/page?uri=", STR(?timeSlice__warsaUnit__id)) AS  ?timeSlice__warsaUnit__dataProviderUrl)  
      }     
      
      OPTIONAL {
        ?timeSlice__id :warsa_place ?timeSlice__warsaPlace__id .
        BIND(REPLACE(STR(?timeSlice__warsaPlace__id), "^.*\\\\/(.+)", "$1") as ?timeSlice__warsaPlace__prefLabel)
        BIND(CONCAT("https://www.sotasampo.fi/fi/places/page?uri=", STR(?timeSlice__warsaPlace__id)) AS  ?timeSlice__warsaPlace__dataProviderUrl)  
      }      
    }
`

export const videoPropertiesFacetResults = `
  ?id :interviewed_person/skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
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
  #UNION
  #{
  #  ?id :structured_content/:text_slice/:text_content ?content__id .
  #  BIND (?content__id AS ?content__prefLabel )
  #}
  UNION
  {
    ?id :named_entity ?namedEntity__id .
    ?namedEntity__id skos:prefLabel ?namedEntity__prefLabel .
    #BIND(?namedEntity__id AS ?namedEntity__dataProviderUrl)
    BIND(CONCAT("/entities/page/", REPLACE(STR(?namedEntity__id ), "^.*\\\\/(.+)", "$1")) AS ?namedEntity__dataProviderUrl)
  }
`
