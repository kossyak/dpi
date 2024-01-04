import { decode, generateSVG } from '../utils'

export default function (binaryString, size) {
  const boolArray = decode(binaryString)
  return generateSVG(boolArray, size)
}