// import bannerImage from '../../img/main_page/veterans/compressed/veterans-banner-2385x500-px.jpg'
import bannerImage from '../../img/main_page/veterans/compressed/sa-kuva-165772.jpg'

export const rootUrl = ''

export const defaultLocale = 'fi'

export const readTranslationsFromGoogleSheets = false

export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZWtrb25lbiIsImEiOiJjazhlbW16MWExNnFzM2VtanpmdTFwbThmIn0.BCYqZObBlHvxkW2TBMGPLw' // https://docs.mapbox.com/accounts/overview/tokens/

export const MAPBOX_STYLE = 'light-v10' // https://docs.mapbox.com/api/maps/#styles

// export const documentFinderAPIUrl = 'https://data.finlex.fi/document-finder-backend'

export const yasguiBaseUrl = 'https://yasgui.triply.cc'

export const yasguiParams = {
  contentTypeConstruct: 'text/turtle',
  contentTypeSelect: 'application/sparql-results+json',
  endpoint: 'http://ldf.fi/mmm/sparql',
  requestMethod: 'POST',
  tabTitle: 'Exported query'
}

export const SLIDER_DURATION = {
  halfSpeed: 1200,
  normalSpeed: 600,
  doubleSpeed: 300
}

export const layoutConfig = {
  hundredPercentHeightBreakPoint: 'md',
  reducedHeightBreakpoint: 1921,
  tabHeight: 58,
  paginationToolbarHeight: 37,
  tableFontSize: '0.8rem',
  topBar: {
    showLanguageButton: false,
    feedbackLink: 'https://link.webropolsurveys.com/S/8A35A1E8FACF425D',
    // 48 px is minimun for tab targets: https://web.dev/tap-targets/?utm_source=lighthouse&utm_medium=devtools#how-to-fix-your-tap-targets
    reducedHeight: 48,
    defaultHeight: 64,
    mobileMenuBreakpoint: 990
  },
  mainPage: {
    bannerBackround: `linear-gradient( rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35) ), url(${bannerImage})`,
    bannerMobileHeight: 150,
    bannerReducedHeight: 270,
    bannerDefaultHeight: 350
  },
  infoHeader: {
    default: {
      height: 49,
      expandedContentHeight: 160,
      headingVariant: 'h4',
      infoIconFontSize: 40
    },
    reducedHeight: {
      height: 40,
      expandedContentHeight: 100,
      headingVariant: 'h6',
      infoIconFontSize: 32
    }
  },
  footer: {
    reducedHeight: 80,
    defaultHeight: 100
  }
}
