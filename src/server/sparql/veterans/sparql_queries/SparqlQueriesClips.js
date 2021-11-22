export const clipPropertiesFacetResults = `
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
  {
    ?id ^:structured_content/:interviewed_person/skos:prefLabel ?prefLabel__id ;
      :begin_timestamp ?beginTimestamp .
    BIND (?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(HOURS(?beginTimestamp) as ?prefLabel__hours)
    BIND(MINUTES(?beginTimestamp) as ?prefLabel__minutes)
    BIND(xsd:integer(SECONDS(?beginTimestamp)) as ?prefLabel__seconds)
    
    # create link to video instance page with a hash
    ?video :structured_content ?id .
    BIND(CONCAT("/videos/page/", REPLACE(STR(?video), "^.*\\\\/(.+)", "$1")) AS ?videoPageLink)
    BIND(?prefLabel__hours * 60 * 60 + ?prefLabel__minutes * 60 + ?prefLabel__seconds as ?beginTimeInSeconds_)
    BIND(xsd:integer(?beginTimeInSeconds_) as ?beginTimeInSeconds)
    BIND(CONCAT('/video#', STR(?beginTimeInSeconds)) AS ?videoPageLinkHash)
    BIND(CONCAT(?videoPageLink, ?videoPageLinkHash) AS ?prefLabel__dataProviderUrl)
  }
  UNION 
  {
    ?id :text_slice ?textSlice__id .
    ?textSlice__id :order ?textSlice__order ;
                    :text_content ?textSlice__prefLabel .
  }
  UNION
  {
    ?id :keyword ?keyword__id .
    ?keyword__id skos:prefLabel ?keyword__prefLabel .
    ?keyword__id :uri ?keyword__dataProviderUrl .
  }

  UNION 
  {
    ?id :named_entity_location ?mentionedPlace__id .
    ?mentionedPlace__id skos:prefLabel ?mentionedPlace__prefLabel .  
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedPlace__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedPlace__dataProviderUrl)
  }
  UNION 
  {
    ?id :named_entity_person ?mentionedPerson__id .
    ?mentionedPerson__id skos:prefLabel ?mentionedPerson__prefLabel .  
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedPerson__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedPerson__dataProviderUrl)
  }
  UNION
  {
    ?id :named_entity_unit ?mentionedUnit__id .
    ?mentionedUnit__id skos:prefLabel ?mentionedUnit__prefLabel .  
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedUnit__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedUnit__dataProviderUrl)
  }
  UNION
  {
    ?id :named_entity_organization ?mentionedOrganization__id .
    ?mentionedOrganization__id skos:prefLabel ?mentionedOrganization__prefLabel .  
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedOrganization__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedOrganization__dataProviderUrl)
  }
  UNION 
  {
    ?id :named_entity_event ?mentionedEvent__id .
    ?mentionedEvent__id skos:prefLabel ?mentionedEvent__prefLabel .   
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedEvent__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedEvent__dataProviderUrl)
  }
  UNION 
  {
    ?id :named_entity_product ?mentionedProduct__id .
    ?mentionedProduct__id skos:prefLabel ?mentionedProduct__prefLabel .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedProduct__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedProduct__dataProviderUrl)
  }
`
