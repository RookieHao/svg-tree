const Draw = reqiure('./draw')
const { createSvg, drawGroup, drawText, drawIcon, drawRect, drawLine } = new Draw()
const loop = () => { }
const DEFAULT_PARAMETER = {
  node_margin: 5,
  node_height: 20,
  node_field: 'title',
  icon_size: 15,
  icon_margin: 5,
  expand_icon: 'icon-plus-square-fill',
  collapse_icon: 'icon-minus-square-fill',
  directory_open_icon: 'icon-folder-open',
  directory_close_icon: 'icon-folder1',
  leaf_node_icon: 'icon-file',
  node_click: loop
}

const DRAW_TREE = Symbol('DRAW_TREE')
const INIT_DATA = Symbol('INIT_DATA')
const FORMATTER_DATA = Symbol('FORMATTER_DATA')
const START_LEVEL = Symbol('START_LEVEL')
const DRAW_NODE = Symbol('DRAW_NODE')
const NODE_TOP = Symbol('NODE_TOP')
const VIEW_WIDTH = Symbol('VIEW_WIDTH')
const HANDLE_CLICK = Symbol('HANDLE_CLICK')
const SVG = Symbol('SVG')

class Tree {
  constructor({ container = 'tree', parameter = {}, data = [] } = {}) {
    try {
      // container
      this.containerBox = typeof container === 'string' ? document.getElementById(container) : container
      // drawing parasmeter
      this.parameter = Object.assign(DEFAULT_PARAMETER, parameter)
      // tree data
      this.tData = data
      let script = document.createElement('script')
      script.setAttribute('src','//at.alicdn.com/t/font_1208801_4xojlep04r.js')
      document.head.appendChild(script)
      // serialize the data
      this[INIT_DATA](this.tData)
    } catch (error) {
      if (!this.containerBox) {
        throw new Error('缺少必要的容器，默认为id=tree的容器')
      }
      throw new Error(error)
    }
  }

  /** Initialize the level of the data root node */
  [INIT_DATA] = data => {
    const { node_margin, node_height } = this.parameter
    // clear containerBox
    this.containerBox.innerHTML = ''
    // start_level
    this[START_LEVEL] = 1
    // init view_box_width
    this[VIEW_WIDTH] = 0
    // init view_box_height
    this[NODE_TOP] = node_margin + node_height

    data.forEach((item, index, data) => {
      item.level = 1
    })

    this[FORMATTER_DATA](data)
    // create_svg
    this[SVG] = createSvg()
    this.containerBox.appendChild(this[SVG])
    this[DRAW_TREE]()
  }

  /** Set the coordinates and level of each node */
  [FORMATTER_DATA] = data => {
    const { node_height, node_margin } = this.parameter
    data.forEach((item, index, data) => {
      item.level = item.level && item.level === 1 ? 1 : this[START_LEVEL]
      item.pointerX = 0
      item.pointerY = this[NODE_TOP]
      this[NODE_TOP] += (node_margin + node_height)
      if (Array.isArray(item.children) && item.children.length) {
        this[START_LEVEL]++
        this[FORMATTER_DATA](item.children)
      } else if (index === data.length - 1) {
        this[START_LEVEL]--
      }
    })
  }

  /** Drawing node Then,set the width and height and viewbox of svg */
  [DRAW_TREE] = () => {
    this[DRAW_NODE](this[SVG], this.tData)
    this[SVG].setAttribute("style", `width:100%;height:${this[NODE_TOP]}px;`)
    this[SVG].setAttribute('viewbox', `0 0 ${this[VIEW_WIDTH]} ${this[NODE_TOP]}`)
  }

  /** Drawing node */
  [DRAW_NODE] = (group, data, startX = 0, parentY) => {
    // Drawing the parameters of the graph
    const {
      icon_margin,
      icon_size,
      node_height,
      node_click,
      node_field,
      expand_icon,
      collapse_icon,
      directory_open_icon,
      directory_close_icon,
      leaf_node_icon,
    } = this.parameter

    // draw
    data.forEach((item, index, data) => {
      const g = drawGroup()
      group.appendChild(g)
      // node_icon
      let next_startX = startX + icon_size + icon_margin // child_start_X
      if (item.children || item._oldChildren) {
        if (item.children) {
          /** DIRECTORY_OPEN */
          let collapse = drawIcon({
            icon_size,
            x: startX,
            y: item.pointerY - icon_size / 2,
            iconName: collapse_icon
          })
          collapse.setAttribute('cursor', 'pointer')
          collapse.addEventListener('click', () => this[HANDLE_CLICK](item, true))
          let directory_open = drawIcon({
            icon_size,
            x: next_startX,
            y: item.pointerY - icon_size / 2,
            iconName: directory_open_icon
          })
          g.appendChild(collapse)
          g.appendChild(directory_open)
        } else if (item._oldChildren) {
          /** DIRECTORY_CLOSE */
          let expand = drawIcon({
            icon_size,
            x: startX,
            y: item.pointerY - icon_size / 2,
            iconName: expand_icon
          })
          expand.setAttribute('cursor', 'pointer')
          expand.addEventListener('click', () => this[HANDLE_CLICK](item, false))
          let directory_close = drawIcon({
            icon_size,
            x: next_startX,
            y: item.pointerY - icon_size / 2,
            iconName: directory_close_icon
          })
          g.appendChild(expand)
          g.appendChild(directory_close)
        }
      } else {
        /** leaf_node */
        let leaf_node = drawIcon({
          icon_size,
          x: next_startX,
          y: item.pointerY - icon_size / 2,
          iconName: leaf_node_icon
        })
        g.appendChild(leaf_node)
      }
      // node_title
      let node_title_pointerX = next_startX + icon_size + icon_margin + 5
      let node_title = drawText({ pointerX: node_title_pointerX, pointerY: item.pointerY, content: item[node_field] })
      g.appendChild(node_title)
      
      // draw_rect -- Add a background color to text
      let rect = drawRect({ pointerX: node_title_pointerX-5, pointerY: item.pointerY - node_height / 2, width: node_title.getBBox().width + 10, height: node_height })
      
      /** bind event -- click,hover*/
      node_title.addEventListener('click', () => {
        node_click(item, index)
      })
      rect.addEventListener('click', () => {
        node_click(item, index)
      })
      g.insertBefore(rect, node_title)

      /** viewbox width */
      let node_width = next_startX + node_title.getBBox().width
      if (node_width > this[VIEW_WIDTH]) {
        this[VIEW_WIDTH] = node_width
      }

      /** draw line */
      if (item.level !== 1) {
        let horizontal_line = drawLine({
          x1: (item.children || item._oldChildren) ? startX : next_startX,
          y1: item.pointerY,
          x2: startX - icon_margin - icon_size/2,
          y2: item.pointerY
        })
        g.appendChild(horizontal_line)
        if (index === data.length - 1 && parentY) {
          let vertical_line = drawLine({
            x1: startX - icon_margin - icon_size/2,
            y1: item.pointerY,
            x2: startX - icon_margin - icon_size/2,
            y2: parentY + icon_size / 2
          })
          g.appendChild(vertical_line)
        }
      }
      // recursion --递归子节点
      item.children && item.children.length && (this[DRAW_NODE](group, item.children, next_startX, item.pointerY))
    })
  }
  [HANDLE_CLICK] = (item, isExpand) => {
    item = Object.assign(item, {
      children: isExpand ? null : item._oldChildren,
      _oldChildren: isExpand ? item.children : null
    })
    this[INIT_DATA](this.tData)
  }
}

module.exports = Tree