import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
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
})

class Player extends React.Component {
  componentDidMount = () => {
    // On mount, check to see if the API script is already loaded
    if (!window.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo

      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else { // If script is already there, load the video directly
      this.loadVideo()
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.routeProps.location.hash !== prevProps.routeProps.location.hash) {
      this.seekToBasedOnHash()
    }
  }

  seekToBasedOnHash = () => {
    const seconds = this.props.routeProps.location.hash.substring(1)
    // https://developers.google.com/youtube/iframe_api_reference#seekTo
    this.player.seekTo(seconds)
  }

  loadVideo = () => {
    const videoId = this.props.data.videoLink.replace('https://www.youtube.com/watch?v=', '')
    // the Player object is created uniquely based on the id in props
    this.player = new window.YT.Player(`youtube-player-${this.props.data.videoLink}`, {
      videoId,
      playerVars: {
        playsinline: 1,
        origin: window.location // https://stackoverflow.com/a/50518247
      },
      events: {
        onReady: this.onPlayerReady
        // onStateChange: this.onPlayerStateChange
      }
    })
  }

  onPlayerReady = event => {
    if (this.props.routeProps.location.hash === '') {
      this.player.seekTo(1)
    } else {
      this.seekToBasedOnHash()
    }
  }

  // onPlayerStateChange = event => {
  //    console.log(event)
  // }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <div id={`youtube-player-${this.props.data.videoLink}`} className={classes.responsiveIframe} />
      </div>
    )
  }
}

export default withStyles(styles)(Player)
