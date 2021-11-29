import { createNamedEntitiesBlock } from './SparqlQueriesVideos'

export const clipPropertiesFacetResults = `
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

    ?video :video_link ?youTubeLink .
    BIND(REPLACE(STR(?youTubeLink), "https://youtu.be/", "") as ?youTubeID)
    BIND(CONCAT("https://i.ytimg.com/vi/", ?youTubeID, "/mqdefault.jpg") as ?youTubeThumbnail__id)
    BIND(?youTubeThumbnail__id as ?youTubeThumbnail__url)
    BIND(?prefLabel__dataProviderUrl AS ?youTubeThumbnail__dataProviderUrl)

    BIND(?id as ?uri__id)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
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
    BIND(CONCAT("/keywords/page/", REPLACE(STR(?keyword__id), "^.*\\\\/(.+)", "$1")) AS ?keyword__dataProviderUrl) 
  }
  UNION 
  ${createNamedEntitiesBlock({
    idPattern: '',
    id: 'id',
    idObject: ''
  })}
`
