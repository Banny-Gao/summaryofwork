<template>
  <div ref="graph" style="height: 68vh;"></div>
</template>
<script>
import { debounce } from "lodash"
import DataSet from "@antv/data-set"
import G2Base from "./G2Base"

export default {
  extends: G2Base,
  name: "G2Treemap",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    field: {
      type: String,
      default: "value",
    },
    categoryKey: {
      type: String,
      default: "key",
    },
    childKey: {
      type: String,
      default: "children",
    },
    coordinate: {
      type: String,
      default: "rect",
    },
    label: {
      type: String,
      default: "name",
    },
    isShowLabel: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      dv: null,
      nodes: [],
    }
  },
  methods: {
    initDv() {
      const { field, data, childKey } = this.$props
      if (!data.length) return
      // 会通过子节点累加 value 值，所以设置为 0, 不设为0会出现占不满
      data.forEach((item) => (item[field] = 0))

      const dv = new DataSet.DataView()
      dv.source(
        {
          name: "root",
          [childKey]: data,
        },
        {
          type: "hierarchy",
          children: (d) => d[childKey],
        }
      )

      dv.transform({
        field,
        type: "hierarchy.treemap",
        tile: "treemapResquarify",
        as: ["x", "y"],
      })

      this.dv = dv
      this.setNodes()
      this.renderGraph()
    },
    setNodes() {
      const { dv } = this
      const { categoryKey, label } = this.$props

      const nodes = []
      for (const node of dv.getAllNodes()) {
        if (!node.children) {
          nodes.push({
            ...node,
            [categoryKey]: node.parent.data[categoryKey],
            [label]: node.data[label],
          })
        }
      }

      this.nodes = nodes
    },
    renderGraph() {
      const { chart, nodes } = this
      const { categoryKey, coordinate, label, isShowLabel } = this.$props

      chart.coordinate(coordinate)
      chart.data(nodes)
      chart.axis(false)
      chart.legend(false)
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })

      chart
        .polygon()
        .position("x*y")
        .tooltip(`${label}*value`, (name, value) => ({
          name,
          value
        }))
        .color(categoryKey)
        .style({
          lineWidth: 1,
          stroke: "#fff",
        })
        .animate({
          appear: {
            animation: "zoom-in",
          },
        })

        if (isShowLabel) chart.label(label, {
          offset: 0,
          style: {
            textBaseline: "middle",
            fill: "#000",
            shadowBlur: 10,
            shadowColor: "#fff",
          },
          layout: {
            type: "limit-in-shape",
          },
        })

      chart.interaction("element-active")
      chart.render()

      chart.on("click", (ev) => {
        this.$emit('on-item-click', ev.data)
      })
    },
  },
  mounted() {
    this.initDv()
  },
  watch: {
    data() {
      this.initDv()
    },
  },
}
</script>
<style scoped lang="scss"></style>
