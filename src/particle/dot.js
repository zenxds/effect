
/**
 * http://www.cnblogs.com/hongru/archive/2011/09/12/2174187.html
 * http://www.cnblogs.com/axes/p/3500655.html
 * @class Dot
 */
class Dot {
  constructor(options={}) {
    const {
      x,
      y,
      scale,
      radius
    } = options

    this.options = options

    // 当前位置
    this.current = {
      x,
      y,
      scale
    }
    // 目标位置
    this.target = {
      x,
      y,
      scale
    }
    // 开始位置
    this.source = {
      x,
      y,
      scale
    }

    this.radius = radius
  }

  draw() {
    const {
      canvas,
      ctx,
      color
    } = this.options
    const { current, radius } = this
    const { x, y, scale } = current

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    ctx.save()
    ctx.beginPath()

    ctx.arc(centerX + (x - centerX) * scale , centerY + (y - centerY) * scale, radius * scale , 0 , 2 * Math.PI)
    ctx.fillStyle = `rgba(${hexToRgba(color).join(',')}, ${scale})`
    ctx.fill()
    ctx.restore()
  }
}

export default Dot

function hexToRgba(color) {
  color = color.replace('#', '')

  if (color.length === 3) {
    color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2)
  }

  const r = parseInt(color.slice(0, 2), 16)
  const g = parseInt(color.slice(2, 4), 16)
  const b = parseInt(color.slice(4, 6), 16)
  return [r, g, b]
}