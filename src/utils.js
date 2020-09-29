export function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export function randomLightColor () {
  const hue = Math.floor(Math.random() * 360) + 1
  return 'hsl(' + hue + ', 100%, 80%)'
}
