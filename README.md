# mk-svg-tree

# install

```
  npm install mk-svg-tree
```
# usage

```
  import Tree from 'mk-svg-tree'

  new Tree({
    container:'tree',
    parameter:{
      node_margin: 5,
      node_field: 'title',
      icon_margin: 5,
      expand_icon: 'icon-plus-square-fill',
      collapse_icon: 'icon-minus-square-fill',
      directory_open_icon: 'icon-folder-open',
      directory_close_icon: 'icon-folder1',
      leaf_node_icon: 'icon-file'
    },
    data:[]
  })
```
  container:一个可以嵌入svg的容器，可以传入容器id或者DOM元素  

  parameter:构造参数。  

      node_margin: 节点间的上下间距 默认: 5  

      node_field: 节点显示的字段名 默认: 'title'  

      icon_margin: 图标间隔 默认: 5  

      expand_icon: 展开图标  

      collapse_icon: 收起图标  

      directory_open_icon: 目录展开时的图标  

      directory_close_icon: 目录收起时的图标  

      leaf_node_icon: 叶子节点图标  


  data:要展示的数据。子节点取children属性  

# event
  ```
  nodeclick: 节点点击事件，参数是当前节点和其在父元素下的位置。 例如： 
    mkTree.addEventListener('nodeclick',(nodex,index)=>{
      /** dosomething */
    })
  expandChange:展开收起事件，参数是当前展开/收起的节点数据和状态。例如：
    mkTree.addEventListener('expandChange',(nodex,expanded)=>{
      /** dosomething */
    })
  ```
# notice：
    节点图标若想使用自定义图标 使用SVG symbol. 传入id给对应的参数
# effect
  ![1558723124949](./image/1558723124949.png)