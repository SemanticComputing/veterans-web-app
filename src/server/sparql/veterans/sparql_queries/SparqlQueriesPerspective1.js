const perspectiveID = 'videos'

export const manuscriptPropertiesInstancePage =
`
      ?id skos:prefLabel ?prefLabel__id .
      BIND (?prefLabel__id as ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
      {
        ?id :full_text ?content__id .
        BIND (?content__id AS ?content__prefLabel )
      }
      UNION
      {
        ?id :place_of_interview ?placeOfInterview .
      }
      UNION
      {
        ?id :length ?length .
      }
      UNION
      {
        ?id :keyword ?keyword__id .
        ?keyword__id skos:prefLabel ?keyword__prefLabel .
        ?keyword__id :uri ?keyword__dataProviderUrl .
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
`

export const manuscriptPropertiesFacetResults =
  `?id :interviewed_person/skos:prefLabel ?prefLabel__id .
   #?id :interviewed_person/foaf:givenName ?givenName .
   #BIND (CONCAT(?familyName, ', ') AS ?labelBeginning)
   #BIND (CONCAT(?labelBeginning, ?givenName) AS ?prefLabel__id)
   #?id skos:prefLabel ?prefLabel__id .
   BIND (?prefLabel__id as ?prefLabel__prefLabel)
   BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      {
        ?id :place_of_interview ?placeOfInterview .
      }
      UNION
      {
        ?id :length ?length .
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
