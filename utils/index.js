function encode(boolArray) {
  return boolArray.map(b => b ? '1' : '0').join('')
}
function decode(binaryString) {
  return binaryString.split('').map(b => b === '1')
}
function generateSVG(array, size= 20) {
  const pixelSize = size / 5
  let rectangles = ''
  
  for (let i = 0; i < array.length; i++) {
    const x = (i % 5) * pixelSize
    const y = Math.floor(i / 5) * pixelSize
    if (array[i]) {
      rectangles += `<rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" />`
    }
  }
  return `<svg fill="#2e2e2e" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xml:space="preserve" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    ${rectangles}
  </svg>`
}

export { encode, decode, generateSVG }