import { has } from 'lodash'
import history from '../../../History'
// import intl from 'react-intl-universal'

export const createPopUpContentVeterans = ({ data }) => {
  const container = document.createElement('div')

  if (has(data, 'image')) {
    let { image } = data
    if (Array.isArray(image)) {
      image = image[0]
    }
    const imageElement = document.createElement('img')
    imageElement.className = 'leaflet-popup-content-image'
    imageElement.setAttribute('src', image.url)
    container.appendChild(imageElement)
  }
  const heading = document.createElement('h3')
  const headingLink = document.createElement('a')
  headingLink.style.cssText = 'cursor: pointer; text-decoration: underline'
  headingLink.textContent = data.prefLabel.prefLabel
  headingLink.addEventListener('click', () => history.push(data.dataProviderUrl))
  heading.appendChild(headingLink)
  container.appendChild(heading)
  const subheading = document.createElement('p')
  subheading.textContent = 'Haastattelun kohta, jossa tämä paikka on mainittu:'
  container.appendChild(subheading)
  const instanceListing = createInstanceListing(data.timeSlice)
  container.appendChild(instanceListing)
  return container
}

// const createPopUpElement = ({ label, value }) => {
//   const p = document.createElement('p')
//   p.style.cssText = 'margin: 0px'
//   const b = document.createElement('b')
//   const span = document.createElement('span')
//   b.textContent = (`${label}: `)
//   span.textContent = value
//   p.appendChild(b)
//   p.appendChild(span)
//   return p
// }

const createInstanceListing = instances => {
  let root
  if (Array.isArray(instances)) {
    root = document.createElement('ul')
    // instances = orderBy(instances, 'prefLabel')
    instances.forEach(i => {
      const li = document.createElement('li')
      const link = document.createElement('a')
      link.addEventListener('click', () => history.push(i.dataProviderUrl))
      link.textContent = i.prefLabel
      link.style.cssText = 'cursor: pointer; text-decoration: underline'
      li.appendChild(link)
      root.appendChild(li)
    })
  } else {
    root = document.createElement('p')
    const link = document.createElement('a')
    link.addEventListener('click', () => history.push(instances.dataProviderUrl))
    link.textContent = instances.prefLabel
    link.style.cssText = 'cursor: pointer; text-decoration: underline'
    root.appendChild(link)
  }
  return root
}
