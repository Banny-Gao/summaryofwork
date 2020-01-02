<template>
  <div id="mountNode"></div>
</template>
<script>
export default {
  name: "G6Demo",
  data() {
    return {}
  },
  methods: {},
  async mounted() {
    const G6 = await import('@antv/g6')
    const data = {
      // The array of nodes
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
      // The array of edges
      edges: [
        // An edge links from node1 to node2
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
      container: "mountNode", // String | HTMLElement, required, the id of DOM element or an HTML node
      width: 400, // Number, required, the width of the graph
      height: 200, // Number, required, the height of the graph
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
    graph.data(data) // Load the data defined in Step 2
    graph.render() // Render the graph
  }
}
</script>
<style scoped lang="scss"></style>
