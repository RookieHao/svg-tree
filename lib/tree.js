import Draw from './draw'
const { createSvg, drawGroup, drawText, drawIcon, drawRect, drawLine } = new Draw()
const DEFAULT_PARAMETER = {
  node_margin: 5,
  node_field: 'title',
  icon_margin: 5,
  expand_icon: 'icon-plus-square-fill',
  collapse_icon: 'icon-minus-square-fill',
  directory_open_icon: 'icon-folder-open',
  directory_close_icon: 'icon-folder1',
  leaf_node_icon: 'icon-file'
}

const DRAW_TREE = Symbol('DRAW_TREE')
const DRAW_NODE = Symbol('DRAW_NODE')
const NODE_TOP = Symbol('NODE_TOP')
const VIEW_WIDTH = Symbol('VIEW_WIDTH')
const HANDLE_CLICK = Symbol('HANDLE_CLICK')
const EVENTS = Symbol('EVENTS')
const SVG = Symbol('SVG')

class customEvent {
  constructor() {
    this[EVENTS] = {}
  }
  addEventListener (type, callback) {
    if (callback) {
      if (!typeof callback === 'function') {
        throw new Error('事件回调必须是一个函数')
      }
      this[EVENTS][type] = this[EVENTS][type] ? [...this[EVENTS][type], callback] : [callback]
    }
  }
  dispatchEvent (type, ...argument) {
    if (this[EVENTS][type]) {
      this[EVENTS][type].forEach(callback => callback(...argument))
    }
  }
}

class Tree extends customEvent {
  constructor({ container = 'tree', parameter = {}, data = [] } = {}) {
    super()
    try {
      // container
      this.containerBox = typeof container === 'string' ? document.getElementById(container) : container
      // drawing parasmeter
      this.parameter = Object.assign(DEFAULT_PARAMETER, parameter)
      let script = document.createElement('script')
      script.setAttribute('src', (['http:', 'https:'].includes(location.protocol) ? location.protocol : 'https:') + '//at.alicdn.com/t/font_1208801_4xojlep04r.js')
      document.head.appendChild(script)
      // serialize the data
      this.Init(data)
    } catch (error) {
      if (!this.containerBox) {
        throw new Error('缺少必要的容器，默认为id=tree的容器')
      }
      throw new Error(error)
    }
  }

  /** Initialize the level of the data root node */
  Init (data) {
    this.tData = data
    const { node_margin } = this.parameter
    // clear containerBox
    this.containerBox.innerHTML = ''
    // init view_box_width
    this[VIEW_WIDTH] = 0
    // init view_box_height
    this[NODE_TOP] = node_margin
    // create_svg
    this[SVG] = createSvg()
    this.containerBox.appendChild(this[SVG])
    this[DRAW_TREE](data)
  }

  /** Drawing node Then,set the width and height and viewbox of svg */
  [DRAW_TREE] (data) {
    this[DRAW_NODE](data)
    this[SVG].setAttribute("style", `width:100%;height:${this[NODE_TOP]}px;`)
    this[SVG].setAttribute('viewbox', `0 0 ${this[VIEW_WIDTH]} ${this[NODE_TOP]}`)
  }

  /** Drawing node */
  [DRAW_NODE] (data, startX = 0, parent_middleY) {
    // Drawing the parameters of the graph
    const {
      icon_margin,
      node_field,
      node_margin,
      expand_icon,
      collapse_icon,
      directory_open_icon,
      directory_close_icon,
      leaf_node_icon
    } = this.parameter

    // draw
    data.forEach((item, index, data) => {
      const g = drawGroup()
      this[SVG].appendChild(g)
      // expandeNode
      const expandeNode = item.children && item.children.length
      // collapseNode
      const collapseNode = item._oldChildren && item._oldChildren.length
      // leafNode
      const leafNode = !expandeNode && !collapseNode
      // node_icon
      let node_icon = leafNode ? [leaf_node_icon] : expandeNode ? [collapse_icon, directory_open_icon] : [expand_icon, directory_close_icon]

      // draw node_title
      let node_title = drawText({ x: startX, y: this[NODE_TOP], content: item[node_field] })
      g.appendChild(node_title)

      // get Text width height
      const {
        width: text_width,
        height: text_height,
        y: text_Y
      } = node_title.getBBox()

      // icon_size
      const icon_size = text_height * 2 / 3

      // iconSpace
      const iconSpace = icon_size + icon_margin

      // translateX
      const translateX = iconSpace * (node_icon.length + leafNode)

      // transform text 
      node_title.setAttribute('dx', translateX)

      // draw node_rect
      let node_rect = drawRect({ x: startX + translateX - 5, y: this[NODE_TOP], width: text_width + 10, height: text_height })
      g.insertBefore(node_rect, node_title)

      // bind click
      node_title.addEventListener('click', () => {
        this.dispatchEvent('nodeclick', item, index)
      })
      node_rect.addEventListener('click', () => {
        this.dispatchEvent('nodeclick', item, index)
      })

      // drawicon
      node_icon.forEach((iconName, iconIndex) => {
        let icon = drawIcon({
          icon_size,
          x: startX + iconSpace * (iconIndex + leafNode),
          y: this[NODE_TOP] + (text_height - icon_size) / 2,
          iconName
        })
        if (!leafNode && !iconIndex) {
          icon.setAttribute('cursor', 'pointer')
          icon.addEventListener('click', () => this[HANDLE_CLICK](item, expandeNode))
        }
        g.appendChild(icon)
      })

      // draw line
      if (parent_middleY) {
        let x1 = startX - icon_margin - icon_size / 2
        let x2 = startX + iconSpace * leafNode
        let y = text_Y + text_height / 2
        g.appendChild(drawLine({ x1, x2, y1: y, y2: y }))
        if (index === data.length - 1) {
          g.appendChild(drawLine({ x1, y1: y, x2: x1, y2: parent_middleY }))
        }
      }
      // viewBox VIEW_WIDTH NODE_TOP
      let NODE_VIEW_WIDTH = startX + translateX + text_width + 10
      if (NODE_VIEW_WIDTH > this[VIEW_WIDTH]) {
        this[VIEW_WIDTH] = NODE_VIEW_WIDTH
      }
      this[NODE_TOP] += (node_margin + text_height)
      // recursion --递归子节点
      expandeNode && (this[DRAW_NODE](item.children, startX + iconSpace, text_Y + (text_height + icon_size) / 2))
    })
  }
  [HANDLE_CLICK] (item, isExpand) {
    item = Object.assign(item, {
      children: isExpand ? null : item._oldChildren,
      _oldChildren: isExpand ? item.children : null
    })
    this.Init(this.tData)
    this.dispatchEvent('expandChange', item, !isExpand)
  }
}

export default Tree