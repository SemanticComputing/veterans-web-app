export const keywordPropertiesInstancePage = `
  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
  }
  UNION
  {
    ?interview :keyword ?id ;
    :structured_content ?timeSlice__id .
    ?timeSlice__id skos:prefLabel ?timeSlice__prefLabel ;
          :begin_timestamp ?beginTimestamp .
    BIND(HOURS(?beginTimestamp) as ?beginHours)
    BIND(MINUTES(?beginTimestamp) as ?beginMinutes)
    BIND(SECONDS(?beginTimestamp) as ?beginSeconds)
    BIND(CONCAT(STR(?beginHours), ':', STR(?beginMinutes), ':', STR(xsd:integer(?beginSeconds))) as ?timeSlice__beginTimeLabel)
    BIND(?beginHours * 60 * 60 + ?beginMinutes * 60 + ?beginSeconds as ?beginTimeInSeconds_)
    BIND(xsd:integer(?beginTimeInSeconds_) as ?timeSlice__beginTimeInSeconds)
    BIND(CONCAT(CONCAT("/videos/page/", REPLACE(STR(?interview), "^.*\\\\/(.+)", "$1")), CONCAT('#', STR(?timeSlice__beginTimeInSeconds))) AS ?timeSlice__dataProviderUrl)
  }
  UNION
  {
    ?id :uri ?yso__id .
    BIND(?yso__id as ?yso__prefLabel)
    BIND(?yso__id as ?yso__dataProviderUrl)
  }
`
