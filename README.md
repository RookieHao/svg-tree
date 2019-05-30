# mk-svg-tree

[安装](#INSTALL)  
[使用方法](#USAGE)   
[事件](#EVENT)  
[内置样式](#BUILT-IN-STYLE)  
[效果图](#EFFECT)
# INSTALL
  Using npm:
```
  npm install mk-svg-tree

  import mkTree from 'mk-svg-tree'
  import 'mk-svg-tree/dist/tree.css'
```

  Using cdn:
```
  <script src="https://unpkg.com/mk-svg-tree/dist/tree.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/mk-svg-tree/dist/tree.css">
```
# USAGE

```js

  <div id="tree"></div>
  
  new mkTree({
    container:'tree',
    parameter:{
      node_margin: 5,
      node_field: 'title',
      icon_margin: 5,
      child_field: 'children',
      expand_icon: 'icon-plus-square-fill',
      collapse_icon: 'icon-minus-square-fill',
      directory_open_icon: 'icon-folder-open',
      directory_close_icon: 'icon-folder1',
      leaf_node_icon: 'icon-file'
    },
    data:[]
  })
```
  container:一个可以嵌入svg的容器，可以传入容器id或者DOM元素.省略时默认是id为tree的容器 

  parameter:构造参数。 不传时取默认值

      node_margin: 节点间的上下间距 默认: 5  

      icon_margin: 图标间隔 默认: 5  

      node_field: 节点显示的字段名 默认: 'title'

      child_field: 子节点字段名 默认: 'children'

      expand_icon: 展开图标  

      collapse_icon: 收起图标  

      directory_open_icon: 目录展开时的图标  

      directory_close_icon: 目录收起时的图标  

      leaf_node_icon: 叶子节点图标  


  data:必填。要展示的数据。

[回到顶部](#)
# Event
  nodeclick: 节点点击事件，参数是当前节点和其在父元素下的位置。 例如：

  ![20190527102332.png](https://i.loli.net/2019/05/27/5ceb4a2683f7497731.png)

  expandChange:展开收起事件，参数是当前展开/收起的节点数据和状态。例如：

  ![20190527102245.png](https://i.loli.net/2019/05/27/5ceb49f7333f025272.png)
  
# BUILT-IN STYLE
```css
/* 节点 */
.inner-group {
  user-select: none;
}

/* 节点字体 */
.tree-text {
  fill: #333;
  font-size: 14px;
}

/* 节点背景 */
.tree-rect {
  fill: transparent;
}

/* 选中节点背景 */
.inner-group.active-node .tree-rect {
  fill: #BAE7FF;
}

/* 选中节点字体 */
.inner-group.active-node .tree-text {
  fill: #fff;
}

/* 节点:hover背景 */
.inner-group:not(.active-node):hover .tree-rect {
  fill: #E6F7FF;
}

/* 节点:hover字体 */
.inner-group:not(.active-node):hover .tree-text {
  fill: #333;
}

/* 线条样式 */
.tree-line {
  stroke: #52AFF8;
  stroke-width: 1;
  stroke-dasharray: 1, 1;
}

/* 图标样式 */
.tree-icon-icon-plus-square-fill,
.tree-icon-icon-minus-square-fill,
.tree-icon-icon-folder-open,
.tree-icon-icon-folder1,
.tree-icon-icon-file {
  fill: #4A90E2;
}

/* 子节点 */
.tree-group.active-group .child-group {
  animation: group_animation 0.2s linear;
}

@keyframes group_animation {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
```

[回到顶部](#)
# NOTICE
    节点图标若想使用自定义图标 使用SVG symbol. 传入id给对应的参数
# EFFECT
  ![20190527095843.png](https://i.loli.net/2019/05/27/5ceb445575a2128220.png)