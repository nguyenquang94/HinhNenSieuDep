import { PixelRatio, Dimensions } from 'react-native'

function getPixelDimensions () {
  const { width, height } = Dimensions.get('window')
  const pxRatio = PixelRatio.get()

  return {
    width: width * pxRatio,
    height: height * pxRatio
  }
}

export default getPixelDimensions
