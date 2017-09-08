import Logo from './logo'
import Dot from './dot'
import raf from 'raf'

const ease = require('d3-ease')
const Promise = require('./Promise')

class Particle {
  constructor(options={}) {
    this.options = options    
    this.canvas = options.canvas
    this.ctx = this.canvas.getContext('2d')
    this.logo = this.drawLogo()
    this.dots = this.getDots()
    
    this.animate()
  }

  clear() {
    const {
      canvas,
      ctx
    } = this

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  initDots() {
    const { canvas } = this

    this.dots.forEach(dot => {
      dot.source = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        scale: Math.random() * 4
      }
      mix(dot.current, dot.source)
      dot.draw()
    })
  }

  animate() {
    this.clear()    
    this.initDots()

    this.animateLogo().then(() => {
      setTimeout(() => {
        this.animate()
      }, 3000)
    })
  }

  animateLogo() {
    const defer = Promise.defer()
    const { canvas, options } = this
    const duration = options.duration || 2000
    const start = Date.now()

    const tick = () => {
      const now = Date.now()
      let percent = (now - start) / duration
      if (percent > 1) {
        percent = 1
      }

      this.clear()
      this.dots.forEach(dot => {
        dot.current = {
          x: dot.source.x + (dot.target.x - dot.source.x) * percent,
          y: dot.source.y + (dot.target.y - dot.source.y) * percent,
          scale: dot.source.scale + (dot.target.scale - dot.source.scale) * percent
        }
        dot.draw()
      })

      if (percent < 1) {
        raf(tick)        
      } else {
        defer.resolve()
      }
    }

    tick()
    return defer.promise
  }

  drawLogo() {
    const {
      canvas,
      ctx,
      options
    } = this

    const logo = new Logo({
      canvas,
      ctx,
      multiple: options.multiple || 10,
      color: options.color
    })
    
    logo.draw()
    return logo
  }

  getDots() {
    const {
      canvas,
      ctx,
      options
    } = this

    // 粒子大小
    const particleRadius = options.particleRadius || 2

    const dots = []
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    
    for (let x = 0; x < canvas.width; x += particleRadius * 2) {
      for (let y = 0; y < canvas.height; y += particleRadius * 2) {
        const point = (y * canvas.width + x) * 4
        if (imgData.data[point + 3] >= 128) {
          dots.push(new Dot({
            canvas,
            ctx,
            color: options.color,
            x: x,
            y: y,
            scale: 1,
            radius: particleRadius
          }))
        }
      }
    }

    return dots
  }
}

const canvas = document.getElementById('particle-canvas-1')
canvas.width = document.body.scrollWidth
canvas.height = document.body.scrollHeight

new Particle({
  canvas: canvas,
  color: '#4b5cc4',
  multiple: canvas.width / 58.25 * 0.4
})

function mix(to, from) {
  for (var i in from) {
    to[i] = from[i]
  }
  return to
}