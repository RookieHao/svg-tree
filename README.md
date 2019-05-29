# mk-svg-tree

# install

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
# usage

```

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

# event
```
  nodeclick: 节点点击事件，参数是当前节点和其在父元素下的位置。 例如：
```
  ![20190527102332.png](https://i.loli.net/2019/05/27/5ceb4a2683f7497731.png)
```
  expandChange:展开收起事件，参数是当前展开/收起的节点数据和状态。例如：
```
  ![20190527102245.png](https://i.loli.net/2019/05/27/5ceb49f7333f025272.png)
  
# notice：
    节点图标若想使用自定义图标 使用SVG symbol. 传入id给对应的参数
# effect
  ![20190527095843.png](https://i.loli.net/2019/05/27/5ceb445575a2128220.png)