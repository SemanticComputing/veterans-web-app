import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { CarouselProvider, Slider, Slide, DotGroup, Dot } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import aittoOja from '../../../img/main_page/veterans/compressed/carousel/01-aitto-oja.jpg'
import eskola from '../../../img/main_page/veterans/compressed/carousel/02-eskola.jpg'
import sainio from '../../../img/main_page/veterans/compressed/carousel/03-sainio.jpg'
import paarma from '../../../img/main_page/veterans/compressed/carousel/04-paarma.jpg'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  carouselContainer: props => ({
    maxWidth: props.maxWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(5)
    }
  }),
  dotGroupContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  slideContent: {
    width: 'calc(100% - 16px)',
    marginLeft: 8,
    marginRight: 8
  },
  slideImage: {
    borderRadius: 10
  }
}))

const MainCarousel = props => {
  const classes = useStyles(props)
  const data = [
    {
      src: aittoOja,
      alt: 'alt',
      caption: '"1.7. ylitettiin valtakunnan raja"',
      localID: 'iVT0004',
      hours: 0,
      minutes: 32,
      seconds: 52
    },
    {
      src: eskola,
      alt: 'alt',
      caption: '"Vaakapommittamisen tarkkuus"',
      localID: 'iVT0198',
      hours: 0,
      minutes: 57,
      seconds: 20
    },
    {
      src: sainio,
      alt: 'alt',
      caption: '"Olin jo 15-vuotiaana vartiotehtävissä kivääri selässä"',
      localID: 'iVT0150',
      hours: 0,
      minutes: 3,
      seconds: 40
    },
    {
      src: paarma,
      alt: 'alt',
      caption: '"Yhtäkkiä sanottiin, että juna Äänislinnasta Joensuuhun lähtee nyt"',
      localID: 'iVT0129',
      hours: 0,
      minutes: 34,
      seconds: 15

    }
  ]

  const createSlides = () => {
    return data.map((element, index) => {
      const { hours, minutes, seconds } = element
      let hash = ''
      if (hours !== null) {
        const totalSeconds = hours * 60 * 60 + minutes * 60 + seconds
        hash = `#${totalSeconds}`
      }
      return (
        <Link key={index} to={`/videos/page/${element.localID}/video${hash}`}>
          <Slide
            innerClassName={classes.carouselInnerSlide}
            index={index}
          >
            <img
              className={classNames(classes.slideContent, classes.slideImage)}
              src={element.src}
              alt='alt'
            />
            <Typography className={classes.slideContent}>{element.caption}</Typography>
          </Slide>
        </Link>
      )
    })
  }

  const renderDots = () => {
    return data.map((element, index) =>
      <Dot
        key={index}
        disabled={false}
        slide={index}
      />
    )
  }

  return (
    <div className={classes.carouselContainer}>
      <CarouselProvider
        naturalSlideWidth={props.slideWidth}
        naturalSlideHeight={props.slideHeight}
        totalSlides={props.totalSlides}
        visibleSlides={props.visibleSlides}
        isPlaying
      >
        <Slider className={classes.carouselSlider}>
          {createSlides()}
        </Slider>
        <DotGroup
          className={classes.dotGroupContainer}
          renderDots={renderDots}
        />
      </CarouselProvider>
    </div>
  )
}

export default MainCarousel
