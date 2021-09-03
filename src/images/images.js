import fish from './fish.jpeg'
import pasta from './pasta.jpeg'
import soup from './soup.jpeg'
import burgers from './burgers.jpeg'
import indian from './indian.jpeg'
import lasagna from './lasagna.jpeg'
import pancakes from './pancakes.jpeg'
import salmon from './salmon.jpeg'

const cardImages = [
    fish,
    pasta,
    soup,
    burgers,
    indian,
    lasagna,
    pancakes,
    salmon
]

const backgroundImages = [
    fish, burgers, indian
]

export const randomImageUrl = () => {
    return cardImages[Math.floor(Math.random()*cardImages.length)]
}

export const randomBackgroundUrl = () => {
    return backgroundImages[Math.floor(Math.random()*backgroundImages.length)]
}
