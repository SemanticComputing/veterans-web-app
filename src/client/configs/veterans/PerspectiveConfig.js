import React from 'react'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
// import TripOriginIcon from '@material-ui/icons/TripOrigin'
// import LocationOnIcon from '@material-ui/icons/LocationOn'
// import AddLocationIcon from '@material-ui/icons/AddLocation'
// import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness'
// import StarIcon from '@material-ui/icons/Star'
// import RedoIcon from '@material-ui/icons/Redo'
// import PieChartIcon from '@material-ui/icons/PieChart'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
// import BubbleChartIcon from '@material-ui/icons/BubbleChart'
// import LineChartIcon from '@material-ui/icons/ShowChart'
// import videosImage from '../../img/main_page/veterans/compressed/tiedotus-400x265-px.jpg'
// import excerptsImage from '../../img/main_page/veterans/compressed/spotter-400x269-px.jpg'

import videosImage from '../../img/main_page/veterans/filming.jpg'
import excerptsImage from '../../img/main_page/veterans/bofors.jpg'
import entitiesImage from '../../img/main_page/veterans/lotta.jpg'

export const perspectiveConfig = [
  {
    id: 'videos',
    frontPageImage: videosImage,
    defaultActiveFacets: new Set(['freeText']),
    defaultTab: 'table',
    defaultInstancePageTab: 'video',
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      }
    ],
    instancePageTabs: [
      {
        id: 'video',
        value: 0,
        icon: <CalendarViewDayIcon />
      },
      {
        id: 'word_cloud',
        value: 1,
        icon: <CloudDownloadIcon />
      }
    ]
  },
  {
    id: 'clips',
    frontPageImage: excerptsImage,
    defaultActiveFacets: new Set(['freeText']),
    defaultTab: 'table',
    defaultInstancePageTab: 'table',
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      }
    ],
    instancePageTabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      }
    ]
  },
  {
    id: 'entities',
    frontPageImage: entitiesImage,
    defaultActiveFacets: new Set(['freeText', 'type']),
    defaultTab: 'table',
    defaultInstancePageTab: 'table',
    tabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      }
    ],
    instancePageTabs: [
      {
        id: 'table',
        value: 0,
        icon: <CalendarViewDayIcon />
      }
    ]
  }
]
