module.exports =  class Draw {
  /** 创建svg元素 */
  createSvg = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
    svg.setAttribute('class', "tree-svg")
    return svg
  }
  /** 创建组 */
  drawGroup () {
    let g= document.createElementNS('http://www.w3.org/2000/svg', 'g')
    g.setAttribute('class','tree-group')
    return g
  }
  /** 绘制TEXT */
  drawText ({ pointerX = 0, pointerY = 0, content = '' } = {}) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', pointerX)
    text.setAttribute('y', pointerY)
    text.setAttribute('cursor', 'pointer')
    text.setAttribute('alignment-baseline', 'middle')
    text.setAttribute('class', 'tree-text')
    if (typeof text.textContent !== 'undefined') {
      text.textContent = content
    } else {
      text.innerHTML = content
    }
    return text
  }
  /** 绘制图标 */
  drawIcon ({x=0,y=0,icon_size,iconName}={}) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute("x",x)
    svg.setAttribute("y",y)
    svg.setAttribute("width",icon_size+'px')
    svg.setAttribute("height",icon_size+'px')
    svg.setAttribute("class",'tree-icon-'+iconName)
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
    use.setAttributeNS('http://www.w3.org/1999/xlink','href', '#'+iconName)
    svg.appendChild(use)
    return svg
  }
  /** 绘制图片 */
  drawImage ({ icon_size = 14, pointerX = 0, pointerY = 0, href } = {}) {
    var image = document.createElementNS('http://www.w3.org/2000/svg', 'image')
    image.setAttribute('width', icon_size)
    image.setAttribute('height', icon_size)
    image.setAttribute('x', pointerX)
    image.setAttribute('y', pointerY)
    image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href)
    image.setAttributeNS('class', 'tree-image')
    return image
  }
  /** 绘制线条 */
  drawLine ({x1, y1, x2, y2}={}) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', x1)
    line.setAttribute('y1', y1)
    line.setAttribute('x2', x2)
    line.setAttribute('y2', y2)
    line.setAttribute('class', 'tree-line')
    return line
  }
  /** 绘制矩形 */
  drawRect ({pointerX=0, pointerY=0, width, height, rx, ry}={}) {
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('x', pointerX)
    rect.setAttribute('y', pointerY)
    rect.setAttribute('width', width)
    rect.setAttribute('height', height)
    rect.setAttribute('class', 'tree-rect')
    rx && rect.setAttribute('rx', rx)
    ry && rect.setAttribute('rx', ry)
    return rect
  }
}