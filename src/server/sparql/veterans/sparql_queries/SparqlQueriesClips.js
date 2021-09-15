const perspectiveID = 'clips'

export const clipPropertiesInstancePage =
`   {
      ?id ^:structured_content/:interviewed_person/foaf:name ?name .
      BIND (CONCAT(?name, ' ') AS ?namePlusSpace)
      ?id :begin_timestamp ?timeStamp .
      BIND (CONCAT(?namePlusSpace, STR(?timeStamp)) AS ?prefLabel__id)
      BIND (?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id :keyword ?keyword__id .
      ?keyword__id skos:prefLabel ?keyword__prefLabel .
      ?keyword__id :uri ?keyword__dataProviderUrl .
    }
    UNION
    {
      ?id :named_entity ?namedEntity__id .
      ?namedEntity__id skos:prefLabel ?namedEntity__prefLabel .
      ?namedEntity__id :uri ?namedEntity__dataProviderUrl .
    }
`

export const clipPropertiesFacetResults =
  `
    ?id ^:structured_content/:interviewed_person/foaf:name ?name .
    BIND (CONCAT(?name, ' ') AS ?namePlusSpace)
    ?id :begin_timestamp ?timeStamp .
    BIND (CONCAT(?namePlusSpace, STR(?timeStamp)) AS ?prefLabel__id)
    BIND (?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
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
        ?id :named_entity ?namedEntity__id .
        ?namedEntity__id skos:prefLabel ?namedEntity__prefLabel .
      }
      UNION
      {
        ?id :text_content ?content__id .
        BIND (?content__id AS ?content__prefLabel )
      }
`
