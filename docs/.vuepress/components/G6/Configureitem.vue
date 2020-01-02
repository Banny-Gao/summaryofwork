<template>
  <div id="mountNode"></div>
</template>
<script>
export default {
  data() {
    return {
      graph: null,
      data: {}
    }
  },
  methods: {
    async initGraph() {
      const G6 = await import("@antv/g6")
      this.graph = new G6.Graph({
        container: "mountNode",
        width: 800,
        height: 600,
        fitView: true,
        fitViewPadding: [20, 40, 50, 20],
        defaultNode: {
          size: 30,
          labelCfg: {
            style: {
              fill: "#fff"
            }
          }
        },
        defaultEdge: {
          labelCfg: {
            autoRotate: true
          }
        }
      })
    },
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
  },
  async mounted() {
    await this.initGraph()
    await this.getData()
    this.graph.data(this.data)
    this.graph.render()
  }
}
</script>
<style scoped lang="scss"></style>
