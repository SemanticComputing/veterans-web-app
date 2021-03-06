import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { SRLWrapper, useLightbox } from 'simple-react-lightbox'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  previewImage: {
    border: '1px solid lightgray'
  }
})

const options = {
  settings: {
    hideControlsAfter: false
  },
  caption: {
    captionFontFamily: 'roboto'
  }
}

const optionsSingleImage = {
  ...options,
  thumbnails: {
    showThumbnails: false
  },
  buttons: {
    showPrevButton: false,
    showNextButton: false,
    showAutoplayButton: false
  }
}

const ImageGallerySRL = props => {
  const classes = useStyles()
  const { openLightbox } = useLightbox()
  let { data } = props
  let srlOptions = options
  if (!Array.isArray(data)) {
    data = [data]
    srlOptions = optionsSingleImage
  }
  const images = data.map(item => {
    return {
      src: item.url,
      thumbnail: item.url,
      caption: item.description,
      internalLink: item.dataProviderUrl
    }
  })

  if (images[0].internalLink) {
    const image = images[0]
    return (
      <>
        <Link to={image.internalLink}>
          <img
            className={classes.previewImage}
            height={props.previewImageHeight}
            src={image.src}
            alt='preview image'
          />
        </Link>
        <SRLWrapper options={srlOptions} elements={images} />
      </>
    )
  } else {
    return (
      <>
        <Button aria-label='open larger image' onClick={() => openLightbox()}>
          <img
            className={classes.previewImage}
            height={props.previewImageHeight}
            src={images[0].src}
            alt='preview image'
          />
        </Button>
        <SRLWrapper options={srlOptions} elements={images} />
      </>
    )
  }
}

export default ImageGallerySRL
