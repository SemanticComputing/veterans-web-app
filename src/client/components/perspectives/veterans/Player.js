import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  // https://www.w3schools.com/howto/howto_css_responsive_iframes.asp
  container: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    paddingTop: '56.25%' /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  },
  responsiveIframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%'
  }
}))

const Player = props => {
  const classes = useStyles(props)
  const originalYoutubeLink = props.data.videoLink
  let embeddedVideoLink = ''
  if (originalYoutubeLink) {
    embeddedVideoLink = originalYoutubeLink.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
  }

  return (
    <div className={classes.container}>
      <iframe
        className={classes.responsiveIframe}
        src={embeddedVideoLink}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Interview'
      />
    </div>
  )
}

export default Player
