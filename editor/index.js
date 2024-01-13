import { encode, decode, generateSVG } from '../utils/index.js'

export default class Editor {
  constructor() {
    this.container = document.querySelector('.canvas')
    this.code = document.querySelector('.field input')
    this.miniature = document.querySelector('.miniature')
    this.svgCode = ''
    this.w = 5
    this.h = 5
    this.s = 60
    this.gridState = new Array(this.w * this.h).fill(false)
    this.controls()
  }
  controls() {
    const copyCode = document.querySelector('.copy')
    const copySvg = document.querySelector('.copySvg')
    const clear = document.querySelector('.clear')
    const download = document.querySelector('.download')
    const delay = ms => new Promise(res => setTimeout(res, ms))
    const copy = (event, v) => {
      const target = event.target
      const text = target.textContent
      if (v) {
        target.disabled = true
        navigator.clipboard.writeText(v).then(() => {
          target.textContent = 'Copied...'
        })
        delay(550).then(() => {
          target.textContent = text
          target.disabled = false
        })
      }
    }
    copyCode.onclick = (event) => copy(event, this.code.value)
    copySvg.onclick = (event) => copy(event, this.svgCode)
    
    clear.onclick = () => this.clear()
    download.onclick = () => {
      const blob = new Blob([this.svgCode], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = this.code.value
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
    this.code.onblur = (event) => this.display(event.target.value)
  }
  create() {
    const mesh = document.createElement('canvas')
    const pixel = document.createElement('canvas')
    this.container.append(mesh)
    this.container.append(pixel)
    mesh.width = pixel.width = this.w * this.s
    mesh.height = pixel.height = this.h * this.s
    
    this.ctx = mesh.getContext('2d')
    this.ctxPixel = pixel.getContext('2d')
    
    this.ctx.strokeStyle = '#ccc'
    for (let x = 0; x <= mesh.width; x += this.s) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, mesh.height)
      this.ctx.stroke()
    }
    for (let y = 0; y <= mesh.height; y += this.s) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(mesh.width, y)
      this.ctx.stroke()
    }
    this.container.addEventListener('click', (event) => {
      const x = Math.floor(event.offsetX / this.s)
      const y = Math.floor(event.offsetY / this.s)
      const index = y * this.w + x
      if (this.gridState[index]) {
        this.eraser(x * this.s, y * this.s)
        this.gridState[index] = false
      } else {
        this.paint(x * this.s, y * this.s)
        this.gridState[index] = true
      }
      const binaryString = encode(this.gridState)
      this.code.value = binaryString
      this.updateSVG(this.gridState)
      this.setCode(binaryString)
    })
    this.display(this.getCode())
  }
  getCode() {
    return localStorage.getItem('code')
  }
  setCode(binaryString) {
    localStorage.setItem('code', binaryString)
  }
  clearCode() {
    localStorage.removeItem('code')
  }
  paint(x, y) {
    this.ctxPixel.fillStyle = 'black'
    this.ctxPixel.fillRect(x, y, this.s, this.s)
  }
  eraser(x, y) {
    this.ctxPixel.clearRect(x, y, this.s, this.s)
  }
  display(binaryString) {
    if (!binaryString) this.clear()
    this.gridState = decode(binaryString)
    if (this.gridState.length === 25) {
      for (let x = 0; x < this.w; x++) {
        for (let y = 0; y < this.h; y++) {
          const index = y * this.w + x
          if (this.gridState[index]) {
            this.paint(x * this.s, y * this.s)
          } else {
            this.eraser(x * this.s, y * this.s)
          }
        }
      }
      this.code.value = binaryString
      this.updateSVG(this.gridState)
    }
  }
  clear() {
    this.ctxPixel.clearRect(0, 0, this.w * this.s, this.h * this.s)
    this.gridState = new Array(this.w * this.h).fill(false)
    this.code.value = ''
    this.miniature.innerHTML = ''
    this.clearCode()
  }
  updateSVG(array) {
    this.svgCode = generateSVG(array, this.s)
    this.miniature.innerHTML = this.svgCode
  }
}