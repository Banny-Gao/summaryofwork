# Common Configuration

<Table  style="margin-bottom: 20px;" :tableProp="{
  columns: [
    { title: 'Name', key: 'name' },
    { title: 'Type', key: 'type' },
    { title: 'Options/Example', key: 'optionsExample' },
    { title: 'Default', key: 'default' },
    { title: 'Description', key: 'description', width: 250 }
  ],
  data: [
    {
      name: 'renderer',
      type: 'String',
      optionsExample: 'canvas/svg',
      default: 'canvas',
      description: 'Render engine of the graph.'
    },
    {
      name: 'fitView',
      type: 'Boolean',
      optionsExample: 'true/false',
      default: false,
      description: 'Whether to fit the graph to the canvas.'
    },
    {
      name: 'fitViewPadding',
      type: 'Number/Array',
      optionsExample: '20/[20, 20, 40, 40]',
      default: 0,
      description: 'The padding between the content of the graph and the borders of the canvas.'
    },
    {
      name: 'animate',
      type: 'Boolean',
      optionsExample: true/false,
      default: false,
      description: 'Whether to activate the global animation.'
    },
    {
      name: 'modes',
      type: 'Object',
      optionsExample: `{
        default: [ 'drag-node', 'drag-canvas' ]
      }`,
      default: 'null',
      description: 'The set of graph interaction modes. This is a complicated concept, refer to Mode for more detial.'
    },
    {
      name: 'defaultNode',
      type: 'Object',
      optionsExample: `{
        shape: 'circle',
        color: '#000',
        style: {
          ......
        }
      }`,
      default: 'null',
      description: 'The default global properties for nodes, includes styles properties and other properties.'
    },
    {
      name: 'defaultEdge',
      type: 'Object',
      optionsExample: `{
        shape: 'polyline',
        color: '#000',
        style: {
          ......
        }
      }`,
      default: 'null',
      description: 'The default global properties for edges, includes styles properties and other properties.'
    },
    {
      name: 'nodeStateStyles',
      type: 'Object',
      optionsExample: `{
        hover: {
          ......
        },
        select: {
          ......
        }
      }`,
      default: 'null',
      description: 'The style properties of nodes in different states except for default state. Such as hover, select.',
      cellClassName: {
        name: 'active'
      }
    },
    {
      name: 'edgeStateStyles',
      type: 'Object',
      optionsExample: `{
        hover: {
          ......
        },
        select: {
          ......
        }
      }`,
      default: 'null',
      description: 'The style properties of edges in different states except for default state. Such as hover, select.',
      cellClassName: {
        name: 'active'
      }
    },
  ],
  border: false
}" />

## configure item

```javascript
async getData() {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
  )
  const remoteData = await response.json()
  const nodes = remoteData.nodes
  const edges = remoteData.edges
  nodes.forEach(node => {
    if (!node.style) node.style = {}
    Object.assign(node.style, {
      lineWidth: 1,
      stroke: "#666",
      fill: "steelblue"
    })
    const classStyles = {
      c0: {
        shape: 'circle'
      },
      c1: {
        shape: 'rect',
        size: [35, 20]
      },
      c2: {
        shape: 'ellipse',
        size: [35, 20]
      }
    }
    node = {
      ...node,
      ...classStyles[node.class]
    }
  })
  edges.forEach(edge => {
    if (!edge.style) edge.style = {}
    Object.assign(edge.style, {
      lineWidth: edge.weight,
      opacity: 0.6,
      stroke: "grey"
    })
  })
  this.data = {
    nodes: [...nodes],
    edges: [...edges]
  }
}
```
<ClientOnly>
  <G6-Configureitem />
</ClientOnly>
