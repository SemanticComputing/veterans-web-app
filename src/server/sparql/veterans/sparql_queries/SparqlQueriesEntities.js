const perspectiveID = 'entities'

export const entityPropertiesInstancePage =
`
    ?id skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
    #BIND(CONCAT("/entities/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?dataProviderUrl)
    {
      ?id :type ?entityType__id .
      BIND (?entityType__id AS ?entityType__prefLabel )
      #?entityType__id skos:prefLabel ?entityType__prefLabel .
    }
    UNION
    {
      #?interview a :Interview .
      #?interview :named_entity ?id .

      ?timeSlice__id :named_entity ?id .
      ?timeSlice__id skos:prefLabel ?timeSlice__prefLabel .
      ?timeSlice__id ^:structured_content ?interview .

      
      ?timeSlice__id  :begin_timestamp ?beginTimestamp .
      BIND(HOURS(?beginTimestamp) as ?beginHours)
      BIND(MINUTES(?beginTimestamp) as ?beginMinutes)
      BIND(SECONDS(?beginTimestamp) as ?beginSeconds)
      BIND(CONCAT(STR(?beginHours), ':', STR(?beginMinutes), ':', STR(xsd:integer(?beginSeconds))) as ?timeSlice__beginTimeLabel)
      BIND(?beginHours * 60 * 60 + ?beginMinutes * 60 + ?beginSeconds as ?beginTimeInSeconds_)
      BIND(xsd:integer(?beginTimeInSeconds_) as ?timeSlice__beginTimeInSeconds)

      BIND(CONCAT(CONCAT("/videos/page/", REPLACE(STR(?interview), "^.*\\\\/(.+)", "$1")), CONCAT('#', STR(?timeSlice__beginTimeInSeconds))) AS ?timeSlice__dataProviderUrl)
    }
`

export const entityPropertiesFacetResults = `
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  #BIND(?id AS ?prefLabel__dataProviderUrl)
  BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`
