const svgWidth = 58.25
const svgHeight = 68.85
const svgPaths = [
  '0.01 50.44 9.73 56.05 9.72 36.57 9.73 36.57 9.72 22.94 29.12 11.73 48.52 22.93 48.52 45.32 48.52 45.33 48.52 56.04 58.25 50.43 58.24 16.8 29.11 0 0 16.82 0.01 50.44',
  '29.13 55.4 27.34 54.37 27.34 67.81 29.13 68.85 30.91 67.82 30.91 54.37 29.13 55.4',
  '32.64 53.37 32.64 66.82 36.21 64.76 36.21 51.31 32.64 53.37',
  '37.95 50.3 37.95 63.75 41.51 61.7 41.51 48.25 37.95 50.3',
  '43.25 47.24 43.25 60.69 46.81 58.63 46.81 45.19 43.25 47.24',
  '11.44 45.19 11.44 58.64 15 60.7 15 47.25 11.44 45.19',
  '16.74 48.25 16.74 61.7 20.3 63.75 20.3 50.3 16.74 48.25',
  '22.04 51.31 22.04 64.76 25.6 66.81 25.6 53.36 22.04 51.31'
]

class Logo {
  constructor(options={}) {
    this.options = options
    this.initProps()
  }

  initProps() {
    const {
      canvas,
      ctx,
      multiple
    } = this.options
    
    this.width = svgWidth * multiple
    this.height = svgHeight * multiple
    this.x = (canvas.width - this.width) / 2
    // this.y = (canvas.height - this.height) / 2
    this.y = 100
  }

  draw() {
    const {
      ctx,
      color,
      multiple
    } = this.options
    const { x, y } = this

    const paths = svgPaths.map(item => {
      return item.split(' ').map(v => parseFloat(v) * multiple)
    })
    
    ctx.fillStyle = color
    
    paths.forEach((p) => {
      for (let i = 0; i < p.length; i += 2) {
        if (i === 0) {
          ctx.beginPath()
          ctx.moveTo(p[i] + x, p[i + 1] + y)
        } else {
          ctx.lineTo(p[i] + x, p[i + 1] + y)
        }
    
        if (i === p.length - 2) {
          ctx.fill()
        }
      }
    })

    const fontSize = 60
    ctx.font = `${fontSize}px PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif`
    ctx.textAlign = 'center'
    ctx.fillText("安全有顶象", this.x + this.width / 2, this.y + this.height + fontSize)
    ctx.fillText("认知无边界", this.x + this.width / 2, this.y + this.height + fontSize * 2)
  }

  getImageData() {
    return this.options.ctx.getImageData(this.x, this.y, this.width, this.height)
  }
}

export default Logo