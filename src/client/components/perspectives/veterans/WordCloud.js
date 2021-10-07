import React from 'react'
import ReactWordcloud from 'react-wordcloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

const options = {
  rotations: 0,
  fontSizes: [14, 60],
  deterministic: true
}

const style = {
  // marginLeft: -70
}

const Wordcloud = props => {
  const { data, maxWords } = props

  if (data == null) {
    return (<></>)
  }

  data.forEach(el => {
    el.weight = +el.weight
  })

  console.log(data)
  // sort without mutating the original array
  let words = [...data].sort((a, b) => b.weight - a.weight)
  if (words.length > maxWords) {
    words.splice(maxWords)
  }
  words = words.map(item => ({ text: item.prefLabel, value: item.weight }))

  return (
    <ReactWordcloud
      style={style}
      options={options}
      words={words}
    />
  )
}

export default Wordcloud
