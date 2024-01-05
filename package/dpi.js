import { decode, generateSVG } from '../utils/index.js'

export default function (binaryString, size) {
  const boolArray = decode(binaryString)
  return generateSVG(boolArray, size)
}