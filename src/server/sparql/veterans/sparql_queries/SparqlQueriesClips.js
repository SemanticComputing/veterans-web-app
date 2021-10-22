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
    }
`

export const clipPropertiesFacetResults =
  `
    ?id ^:structured_content/:interviewed_person/foaf:name ?name ;
        :begin_timestamp ?beginTimestamp .
    ?fullVideo :structured_content ?id .
    BIND(HOURS(?beginTimestamp) as ?hours)
    BIND(MINUTES(?beginTimestamp) as ?minutes)
    BIND(SECONDS(?beginTimestamp) as ?seconds)
    BIND(CONCAT(STR(?hours), ':', STR(?minutes), ':', STR(xsd:integer(?seconds))) as ?beginTimeLabel)
    BIND(?hours * 60 * 60 + ?minutes * 60 + ?seconds as ?beginTimeInSeconds_)
    BIND(xsd:integer(?beginTimeInSeconds_) as ?beginTimeInSeconds)
    BIND(CONCAT("/videos/page/", REPLACE(STR(?fullVideo), "^.*\\\\/(.+)", "$1")) AS ?fullVideo__dataProviderUrl)
    BIND(CONCAT('/video#', STR(?beginTimeInSeconds)) AS ?clipHash)
    BIND(CONCAT(?fullVideo__dataProviderUrl, ?clipHash) AS ?prefLabel__dataProviderUrl)

    BIND (CONCAT(?name, ' / ', STR(?beginTimeLabel)) AS ?prefLabel__id)
    BIND (?prefLabel__id AS ?prefLabel__prefLabel)
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
      ?id :text_slice ?textSlice__id .
      ?textSlice__id :order ?textSlice__order ;
                     :text_content ?textSlice__prefLabel .
    }
`
