const BASE_WIDTH = 1440
const BASE_HEIGHT = 900

export const horizontalScale = (size) => {
  const screenWidth = window.innerWidth
  return (screenWidth / BASE_WIDTH) * size
}

export const verticalScale = (size) => {
  const screenHeight = window.innerHeight
  return (screenHeight / BASE_HEIGHT) * size
}

export const fontScale = (size) => {
  const screenWidth = window.innerWidth
  return (screenWidth / BASE_WIDTH) * size
}
