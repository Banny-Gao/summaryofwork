# Quick start

[Document](https://g6.antv.vision/en)

## Install

```
npm i @antv/g6
```

```
import G6 from '@antv/g6';
```

## Example

```javascript
const data = {
  nodes: [
    {
      id: "node1",
      x: 100,
      y: 100,
      label: "node1",
      labelCfg: {
        style: {
          fill: "#fff",
          fontSize: 12
        }
      }
    },
    {
      id: "node2",
      x: 300,
      y: 100,
      label: "node2"
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2"
    },
    {
      source: "node2",
      target: "node1"
    }
  ]
}
const graph = new G6.Graph({
  container: "mountNode",
  width: 400,
  height: 200,
  defaultNode: {
    shape: "node",
    labelCfg: {
      style: {
        fill: "#fff",
        fontSize: 14
      }
    }
  },
  defaultEdge: {
    shape: 'quadratic',
    style: {
      stroke: '#e2e2e2',
    },
    labelCfg: {
      refY: 10
    }
  }
})
graph.data(data)
graph.render()
```

<ClientOnly>
  <G6-Quickstart />
</ClientOnly>
