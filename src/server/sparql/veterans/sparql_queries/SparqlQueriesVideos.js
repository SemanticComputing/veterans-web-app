const perspectiveID = 'videos'

export const videoPropertiesInstancePage =
`
    ?id skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
    {
      ?id :place_of_interview ?placeOfInterview .
    }
    # UNION
    # {
    #  ?id :full_text ?content .
    # }
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
      ?id :weighted_keyword ?weightedKeyword__id .
      ?weightedKeyword__id :weight ?weightedKeyword__weight .
      ?weightedKeyword__id :keyword ?kw .
      ?kw skos:prefLabel ?weightedKeyword__prefLabel .
      FILTER NOT EXISTS {
        ?kw ^:keyword/:weight ?weight2 .
        FILTER(?weight2 < ?weightedKeyword__weight)
      }
    }
    UNION
    {
      ?id :video_link ?videoLink .
    }
    UNION
    {
      ?id :named_entity ?namedEntity__id .
      ?namedEntity__id skos:prefLabel ?namedEntity__prefLabel .
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
`

export const videoPropertiesFacetResults = `
  ?id :interviewed_person/skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  {
    ?id :place_of_interview ?placeOfInterview .
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
  }
`
