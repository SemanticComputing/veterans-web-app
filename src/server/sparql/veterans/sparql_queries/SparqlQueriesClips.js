export const clipPropertiesFacetResults = `
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
  # UNION
  # {
  #   ?id :named_entity ?namedEntity__id .
  #   ?namedEntity__id skos:prefLabel ?namedEntity__prefLabel .
  # }
  UNION 
  {
    ?id :text_slice ?textSlice__id .
    ?textSlice__id :order ?textSlice__order ;
                    :text_content ?textSlice__prefLabel .
  }
  UNION 
  {
    ?id :named_entity ?mentionedPlace__id .
    ?mentionedPlace__id skos:prefLabel ?mentionedPlace__prefLabel ;
                        :type "Location" .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedPlace__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedPlace__dataProviderUrl)
  }
  UNION 
  {
    ?id :warsa_place ?mentionedWarsaPlace__id .
    BIND(CONCAT("https://www.sotasampo.fi/fi/places/page?uri=", STR(?mentionedWarsaPlace__id)) AS  ?mentionedWarsaPlace__dataProviderUrl)
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
          ?mentionedWarsaPlace__id skos:prefLabel ?mentionedWarsaPlaceLabelFromWarsa_ . 
      }
    }
    OPTIONAL {
      SERVICE <https://ldf.fi/pnr/sparql> { 
          ?mentionedWarsaPlace__id ldff:preferredLanguageLiteral (skos:prefLabel 'fi' 'sv' '' ?mentionedWarsaPlaceLabelFromPNR_)
      }
    }
    BIND(COALESCE(?mentionedWarsaPlaceLabelFromWarsa_, ?mentionedWarsaPlaceLabelFromPNR_, STR(?mentionedWarsaPlace__id)) as ?mentionedWarsaPlace__prefLabel)   
  }
  UNION
  {
    ?id :named_entity ?mentionedOrganization__id .
    ?mentionedOrganization__id skos:prefLabel ?mentionedOrganization__prefLabel ;
                        :type "Organization" .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedOrganization__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedOrganization__dataProviderUrl)
  }
  UNION 
  {
    ?id :warsa_unit ?mentionedWarsaUnit__id .
    BIND(CONCAT("https://www.sotasampo.fi/fi/page?uri=", STR(?mentionedWarsaUnit__id)) AS  ?mentionedWarsaUnit__dataProviderUrl)
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
          ?mentionedWarsaUnit__id skos:prefLabel ?mentionedWarsaUnitLabel_ . 
      }
    }
    BIND(COALESCE(?mentionedWarsaUnitLabel_, STR(?mentionedWarsaUnit__id)) as ?mentionedWarsaUnit__prefLabel)   
  }
  UNION 
  {
    ?id :named_entity ?mentionedPerson__id .
    ?mentionedPerson__id skos:prefLabel ?mentionedPerson__prefLabel ;
                        :type "Person" .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedPerson__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedPerson__dataProviderUrl)
  }
  UNION 
  {
    ?id :warsa_person ?mentionedWarsaPerson__id .
    OPTIONAL {
      SERVICE <https://ldf.fi/warsa/sparql> { 
          ?mentionedWarsaPerson__id skos:prefLabel ?mentionedWarsaPersonLabel_ . 
      }
    }
    BIND(REPLACE(STR(?mentionedWarsaPerson__id), "^.*\\\\/(.+)", "$1") as ?warsaPersonLocalID)
    BIND(CONCAT("https://www.sotasampo.fi/fi/persons/", STR(?warsaPersonLocalID)) AS  ?mentionedWarsaPerson__dataProviderUrl)  
    BIND(COALESCE(?mentionedWarsaPersonLabel_, STR(?mentionedWarsaPerson__id)) as ?mentionedWarsaPerson__prefLabel)   
  }
  UNION 
  {
    ?id :named_entity ?mentionedEvent__id .
    ?mentionedEvent__id skos:prefLabel ?mentionedEvent__prefLabel ;
                        :type "Event" .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedEvent__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedEvent__dataProviderUrl)
  }
  UNION 
  {
    ?id :named_entity ?mentionedProduct__id .
    ?mentionedProduct__id skos:prefLabel ?mentionedProduct__prefLabel ;
                        :type "Product" .    
    BIND(CONCAT("/entities/page/", REPLACE(STR(?mentionedProduct__id ), "^.*\\\\/(.+)", "$1")) AS ?mentionedProduct__dataProviderUrl)
  }
`
