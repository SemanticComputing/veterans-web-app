import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { CarouselProvider, Slider, Slide, DotGroup, Dot } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import aittoOja from '../../../img/main_page/veterans/compressed/carousel/01-aitto-oja.jpg'
import eskola from '../../../img/main_page/veterans/compressed/carousel/02-eskola.jpg'
import sainio from '../../../img/main_page/veterans/compressed/carousel/03-sainio.jpg'
import paarma from '../../../img/main_page/veterans/compressed/carousel/04-paarma.jpg'
import kokkila from '../../../img/main_page/veterans/compressed/carousel/05-kokkila.jpg'
import kotiranta from '../../../img/main_page/veterans/compressed/carousel/06-kotiranta.jpg'
import luntamo from '../../../img/main_page/veterans/compressed/carousel/07-luntamo.jpg'
import pasanen from '../../../img/main_page/veterans/compressed/carousel/08-pasanen.jpg'
import kuukkanen from '../../../img/main_page/veterans/compressed/carousel/09-kuukkanen.jpg'
import rantala from '../../../img/main_page/veterans/compressed/carousel/10-rantala.jpg'
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
      caption: '"1.7. ylitettiin valtakunnan raja."',
      localID: 'iVT0004',
      hours: 0,
      minutes: 32,
      seconds: 52
    },
    {
      src: sainio,
      alt: 'alt',
      caption: '"Olin jo 15-vuotiaana vartiotehtävissä kivääri selässä."',
      localID: 'iVT0150',
      hours: 0,
      minutes: 3,
      seconds: 40
    },
    {
      src: paarma,
      alt: 'alt',
      caption: '"Yhtäkkiä sanottiin, että juna Äänislinnasta Joensuuhun lähtee nyt."',
      localID: 'iVT0129',
      hours: 0,
      minutes: 34,
      seconds: 15

    },
    {
      src: kokkila,
      alt: 'alt',
      caption: '"Ensimmäiset kosketukset viholliseen tuli vasta siellä Ukrainan aroilla."',
      localID: 'iVT0070',
      hours: 0,
      minutes: 19,
      seconds: 16

    },
    {
      src: kotiranta,
      alt: 'alt',
      caption: '"Olimme Nuijamaalla kun Talvisota loppui."',
      localID: 'iVT0077',
      hours: 0,
      minutes: 32,
      seconds: 31

    },
    {
      src: luntamo,
      alt: 'alt',
      caption: '"Ihmepelastus."',
      localID: 'iVT0098',
      hours: 1,
      minutes: 18,
      seconds: 39

    },
    {
      src: pasanen,
      alt: 'alt',
      caption: '"Jouduin semmoseksi lähettimieheksi, viemään kutsuja, yöllä pitkin järven selkiä kun oli kova pakkanen. Taloihin mistä piti ottaa hevonen tai mies."',
      localID: 'iVT0131',
      hours: 0,
      minutes: 5,
      seconds: 22

    },
    {
      src: kuukkanen,
      alt: 'alt',
      caption: '"Jäämiinojen tekeminen Vihtavuoressa sodan aikana."',
      localID: 'iVT0081',
      hours: 0,
      minutes: 11,
      seconds: 19

    },
    {
      src: rantala,
      alt: 'alt',
      caption: '"Rauhan tulo seitsemän aikaan aamulla. Naapuri ampui pitkin päivää ja naapurin tulitus loppui vasta seuraavana aamuna."',
      localID: 'iVT0140',
      hours: 1,
      minutes: 26,
      seconds: 21

    },
    {
      src: eskola,
      alt: 'alt',
      caption: '"Vaakapommittamisen tarkkuus."',
      localID: 'iVT0198',
      hours: 0,
      minutes: 57,
      seconds: 20
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
