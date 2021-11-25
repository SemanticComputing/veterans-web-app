export const entityPropertiesInstancePage = `
  {
    ?id skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
  }
  UNION
  {
    ?id a ?type__id .
    OPTIONAL {
      ?type__id skos:prefLabel ?type__prefLabel_ .
      FILTER(LANG(?type__prefLabel_) = '<LANG>')
    }
    BIND(COALESCE(?type__prefLabel_, STR(?type__id)) as ?type__prefLabel)
  }
  UNION
  {
    ?timeSlice__id :named_entity_location|
                   :named_entity_person|
                   :named_entity_unit|
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
  UNION
  {
    ?id owl:sameAs ?sameAs__id .
    BIND(?sameAs__id as ?sameAs__dataProviderUrl)
    BIND(?sameAs__id as ?sameAs__prefLabel)
  }
  UNION
  {
    ?id foaf:page ?wikipedia__id .
    BIND(?wikipedia__id as ?wikipedia__dataProviderUrl)
    BIND("Wikipedia" as ?wikipedia__prefLabel)
  }
  UNION
  {
    ?id :warsa_page ?warsaPage__id .
    BIND(?warsaPage__id as ?warsaPage__dataProviderUrl)
    BIND("Sotasampo" as ?warsaPage__prefLabel)
  }
  UNION
  {
    ?id dct:source ?source_ .
    BIND(STR(?source_) as ?source)
  }
`

export const entityPropertiesFacetResults = `
  { 
    ?id skos:prefLabel ?prefLabel__id .
    BIND (?prefLabel__id as ?prefLabel__prefLabel)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
    BIND(CONCAT("/entities/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id a ?type__id .
    OPTIONAL {
      ?type__id skos:prefLabel ?type__prefLabel_ .
      FILTER(LANG(?type__prefLabel_) = '<LANG>')
    }
    BIND(COALESCE(?type__prefLabel_, STR(?type__id)) as ?type__prefLabel)
  }
  UNION
  {
    ?timeSlice__id :named_entity_location|
                   :named_entity_person|
                   :named_entity_unit|
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
  UNION
  {
    ?id owl:sameAs ?sameAs__id .
    BIND(?sameAs__id as ?sameAs__dataProviderUrl)
    BIND(?sameAs__id as ?sameAs__prefLabel)
  }
  UNION
  {
    ?id foaf:page ?wikipedia__id .
    BIND(?wikipedia__id as ?wikipedia__dataProviderUrl)
    BIND(?wikipedia__id as ?wikipedia__prefLabel)
  }
  UNION
  {
    ?id :warsa_page ?warsaPage__id .
    BIND(?warsaPage__id as ?warsaPage__dataProviderUrl)
    BIND(?warsaPage__id as ?warsaPage__prefLabel)
  }
  UNION
  {
    ?id dct:source ?source_ .
    OPTIONAL { ?source_ skos:prefLabel ?sourceLabel }
    BIND(COALESCE(?sourceLabel, ?source_) as ?source)
  }
`
