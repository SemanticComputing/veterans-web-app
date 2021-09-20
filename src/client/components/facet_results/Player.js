import React from 'react'
import PropTypes from 'prop-types'

const Player = (props) => {
  const originalYoutubeLink = props.data.videoLink
  let embeddedVideoLink = ''
  if (originalYoutubeLink) {
    embeddedVideoLink = originalYoutubeLink.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
  }

  return (
    <div className='video-responsive'>
      <iframe
        width='853'
        height='480'
        src={embeddedVideoLink}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Interview'
      />
    </div>)
}
Player.propTypes = {
  data: PropTypes.object.isRequired
}

// `https://www.youtube.com/embed/fF-QjbgoJ8k`

export default Player
