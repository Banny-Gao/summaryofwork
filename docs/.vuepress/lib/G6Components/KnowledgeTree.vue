<template>
  <div>
      <div ref="graph"></div>
      <p style="text-align: right;font-size: 1.2em;color: #ccc;">右键访问节点</p>
  </div>
</template>
<script>
var G6,contextmenuDiv

export default {
  name: 'KnowledgeTree',
  props: {
    type: {
      type: String,
      default: "mindmap"
    },
    direction: {
      type: String,
      default: "LR"
    },
    collapsedLevel: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      graph: null
    }
  },
  methods: {
    COLLAPSE_ICON(x, y, r) {
      return [
        ["M", x, y],
        ["a", r, r, 0, 1, 0, r * 2, 0],
        ["a", r, r, 0, 1, 0, -r * 2, 0],
        ["M", x + 2, y],
        ["L", x + 2 * r - 2, y]
      ]
    },
    EXPAND_ICON(x, y, r) {
      return [
        ["M", x, y],
        ["a", r, r, 0, 1, 0, r * 2, 0],
        ["a", r, r, 0, 1, 0, -r * 2, 0],
        ["M", x + 2, y],
        ["L", x + 2 * r - 2, y],
        ["M", x + r, y - r + 2],
        ["L", x + r, y + r - 2]
      ]
    },
    getNodeConfig(node) {
      let config = {
        basicColor: "#449470",
        fontColor: "#449470",
        borderColor: "#449470",
        bgColor: "#56e0a1",
        fontFamily: 'Jost'
      }
      switch (node.level) {
        case -1: {
          config = {
            basicColor: "#E3E6E8",
            fontColor: "rgba(0,0,0,0.85)",
            borderColor: "#E3E6E8",
            bgColor: "#F7F9FA",
          }
          break
        }
        case 1:
          config = {
            basicColor: "#2F54EB",
            fontColor: "#2F54EB",
            borderColor: "#2F54EB",
            bgColor: "#F3F6FD",
          }
          break
        case 2:
          config = {
            basicColor: "#FA8C16",
            fontColor: "#FA8C16",
            borderColor: "#FA8C16",
            bgColor: "#FCF4E3",
          }
          break
        case 3:
          config = {
            basicColor: "#722ED1",
            fontColor: "#722ED1",
            borderColor: "#722ED1",
            bgColor: "#F6EDFC",
          }
        default:
          break
      }
      return config
    },
    registerTreeNode() {
      const _this = this
      const getNodeConfig = this.getNodeConfig
      G6.registerNode(
        "tree-node",
        {
          drawShape(cfg, group) {
            const config = getNodeConfig(cfg)

            const rect = group.addShape("rect", {
              attrs: {
                fill: config.bgColor,
                stroke: config.borderColor
              }
            })
            const text = group.addShape("text", {
              attrs: {
                text: cfg.id,
                x: 0,
                y: 0,
                fontSize: 16,
                textAlign: "left",
                textBaseline: "middle",
                fill: config.fontColor
              }
            })
            const bbox = text.getBBox()
            const hasChildren = cfg.children && cfg.children.length > 0
            if (hasChildren) {
              const level = cfg.level
              let symbol = _this.COLLAPSE_ICON
              if (level >= _this.collapsedLevel) {
                symbol = _this.EXPAND_ICON
              }
              group.addShape("marker", {
                attrs: {
                  x: bbox.maxX + 6,
                  y: bbox.minX + bbox.height / 2 - 6,
                  r: 6,
                  symbol,
                  stroke: config.borderColor,
                  lineWidth: 2
                },
                className: "collapse-icon"
              })
            }
            rect.attr({
              x: bbox.minX - 4,
              y: bbox.minY - 6,
              width: bbox.width + (hasChildren ? 26 : 8),
              height: bbox.height + 12
            })
            return rect
          }
        },
        "single-shape"
      )
    },
    registerNodeBehavior() {
      const _this = this
      G6.registerBehavior("contextmenu-view", {
        getEvents() {
          return {
            "node:contextmenu": "onNodeContextmenu"
          }
        },
        remove() {
          contextmenuDiv.remove()
        },
        onNodeContextmenu(e) {
          e.preventDefault()
          const item = e.item
          contextmenuDiv.innerHTML = `view`
          _this.$refs.graph.append(contextmenuDiv)

          contextmenuDiv.style.left = `${e.clientX - 25 }px`
          contextmenuDiv.style.top = `${e.clientY - 15 }px`

          contextmenuDiv.onclick = evt => {
            evt.stopPropagation()
            const path = item.get("model").path
            path && _this.$router.push({ path })
            contextmenuDiv.remove()
          }
          document.body.onclick = () => {
            contextmenuDiv.remove()
          }
          return true
        }
      })
    },
    renderTreeGraph() {
      const _this = this
      const width = this.$refs.graph.scrollWidth
      const height = this.$refs.graph.scrollHeight || 640
      return new G6.TreeGraph({
        container: this.$refs.graph,
        width,
        height,
        fitView: true,
        autoPaint: true,
        pixelRatio: 2,
        modes: {
          default: [
            {
              type: "collapse-expand",
              onChange(item, collapsed) {
                const data = item.get("model")
                const icon = item.get("group").findByClassName("collapse-icon")
                if (collapsed) {
                  icon.attr("symbol", _this.EXPAND_ICON)
                } else {
                  icon.attr("symbol", _this.COLLAPSE_ICON)
                }
                data.collapsed = collapsed
                return true
              }
            },
            "zoom-canvas",
            "contextmenu-view"
          ]
        },
        defaultNode: {
          type: "tree-node",
          anchorPoints: [
            [0, 0.5],
            [1, 0.5]
          ],
          style: {
            fill: "#C6E5FF",
            stroke: "#5B8FF9",
          }
        },
        defaultEdge: {
          type: "cubic-horizontal",
          style: {
            stroke: "#A3B1BF"
          }
        },
        layout: {
          type: this.type,
          direction: this.direction,
          getId: function getId(d) {
            return d.id
          },
          getHeight: function getHeight() {
            return 10
          },
          getWidth: function getWidth() {
            return 16
          },
          getVGap: function getVGap() {
            return 16
          },
          getHGap: function getHGap() {
            return 100
          }
        }
      })
    },
    addEvents() {
    //   this.graph.on("itemcollapsed", () => {
    //     setTimeout(() => {
    //       this.graph.fitView()
    //     }, 0)
    //   })
    }
  },
  async mounted() {
    G6 = await import("@antv/g6")
    contextmenuDiv = document.createElement("div")
    contextmenuDiv.classList.add("g6-tooltip", "g6-node-tooltip")
    
    const pathname = location.pathname.match(/\/(\w+)\/$/)[1]
    const { default: data } = await import(`../../constants/json/${pathname}`)

    const collapsedLevel = this.collapsedLevel
    function convertData(data) {
      const map = item => {
        if (item.level >= collapsedLevel) item.collapsed = true
        item.children && item.children.forEach(child => map(child))
      }
      data.forEach(item => {
        map(item)
      })
      return data
    }

    const children = convertData(data.children)

    this.data = {
      ...data,
      children
    }
    this.registerTreeNode()
    this.registerNodeBehavior()

    this.graph = this.renderTreeGraph()
    this.graph.data(data)
    this.graph.render()

    this.addEvents()
  }
}
</script>
<style lang="scss">
.g6-tooltip {
  padding:0 10px;
  color: #444;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  position: absolute;
  cursor: pointer;
}
</style>
