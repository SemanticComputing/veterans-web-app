export const entityPropertiesInstancePage = `
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  {
    ?id :type ?entityType__id .
    BIND (?entityType__id AS ?entityType__prefLabel )
    #?entityType__id skos:prefLabel ?entityType__prefLabel .
  }
  UNION
  {
    ?timeSlice__id :named_entity_location|
                   :named_entity_person|
                   :named_entity_organization|
                   :named_entity_product|
                   :named_entity_event ?id ;
                    skos:prefLabel ?timeSlice__prefLabel ;
                    :begin_timestamp ?beginTimestamp ;
                    ^:structured_content ?interview .
    BIND(HOURS(?beginTimestamp) as ?beginHours)
    BIND(MINUTES(?beginTimestamp) as ?beginMinutes)
    BIND(SECONDS(?beginTimestamp) as ?beginSeconds)
    BIND(CONCAT(STR(?beginHours), ':', STR(?beginMinutes), ':', STR(xsd:integer(?beginSeconds))) as ?timeSlice__beginTimeLabel)
    BIND(?beginHours * 60 * 60 + ?beginMinutes * 60 + ?beginSeconds as ?beginTimeInSeconds_)
    BIND(xsd:integer(?beginTimeInSeconds_) as ?timeSlice__beginTimeInSeconds)
    BIND(CONCAT(CONCAT("/videos/page/", REPLACE(STR(?interview), "^.*\\\\/(.+)", "$1")), CONCAT('#', STR(?timeSlice__beginTimeInSeconds))) AS ?timeSlice__dataProviderUrl)
  }
`
