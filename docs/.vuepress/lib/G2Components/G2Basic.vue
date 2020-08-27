<template>
  <div>
    <div ref="graph"></div>
  </div>
</template>
<script>
import data from "./data"
import { Chart } from "@antv/g2"

export default {
  name: "G2Basic",
  data() {
    return {
      chart: null,
    }
  },
  methods: {
    initGraph() {
      const { offsetWidth: width, offsetHeight: height } = this.$refs.graph

      this.chart = new Chart({
        container: this.$refs.graph,
        width,
        height: height || 500,
      })

      this.renderGraph()
    },
    renderGraph() {
      const { chart } = this

      chart
        .data(data)

        .point()
        .position("feature*value")
        .color("phone")
        .shape("phone", ["circle", "square", "triangle"])
        .size(3)
        .adjust("stack")

      chart
        .line()
        .position("feature*value")
        .color("phone")
        .adjust("stack")

      chart
        .area()
        .position("feature*value")
        .color("phone")
        .adjust("stack")

      // chart.facet("rect", {
      //   fields: [null, "phone"],
      //   rowTitle: {
      //     style: {
      //       textAlign: "start",
      //       fontSize: 12,
      //     },
      //   },
      //   eachView(view) {
      //     view.area().position("feature*value")
      //     view.line().position("feature*value")
      //     view
      //       .point()
      //       .position("feature*value")
      //       .shape("circle")
      //   },
      // })

      chart.scale("value", {
        nice: true,
      })

      chart
        .coordinate("rect")
        .reflect('x')
        .scale(0.7, 1.2)
        .transpose()
        // .rotate(-Math.PI * 0.25)
      chart.render()
    },
  },
  mounted() {
    this.initGraph()
  },
}
</script>
<style scoped lang="scss"></style>
