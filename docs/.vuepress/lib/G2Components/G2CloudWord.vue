<template>
  <div ref="graph" style="height: 68vh;"></div>
</template>
<script>
import { debounce } from "lodash"
import DataSet from "@antv/data-set"
import { registerShape, Util } from "@antv/g2"
import G2Base from './G2Base'

export default {
  extends: G2Base,
  name: "G2CloudWord",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    privatePath: {
      type: String,
      default: "",
    },
    x: {
      type: String,
      default: "x",
    },
    y: {
      type: String,
      default: "y",
    },
  },
  data() {
    return {
      dv: null,
    }
  },
  methods: {
    initDv() {
      const { x, y, data, privatePath } = this.$props
      const { offsetWidth, offsetHeight } = this.$refs.graph

      const source = privatePath
        ? require(`../../constants/json/${privatePath}`).default
        : data

      const dv = new DataSet.View().source(source)
      const range = dv.range(y)
      const min = range[0]
      const max = range[1]

      dv.transform({
        type: "tag-cloud",
        fields: [x, y],
        size: [offsetWidth, offsetHeight],
        font: "Comic Sans MS",
        padding: 0,
        timeInterval: 5000, // max execute time
        rotate() {
          let random = ~~(Math.random() * 4) % 4
          if (random === 2) {
            random = 0
          }
          return random * 90 // 0, 90, 270
        },
        fontSize(d) {
          if (d[y]) {
            return ((d.value - min) / (max - min)) * 36 + 12
          }
          return 0
        },
      })

      this.dv = dv
    },
    getTextAttrs(cfg) {
      return {
        ...cfg.defaultStyle,
        ...cfg.style,
        fontSize: cfg.data.size,
        text: cfg.data.text,
        textAlign: "center",
        fontFamily: cfg.data.font,
        fill: cfg.color || cfg.defaultStyle.stroke,
        textBaseline: "Alphabetic",
      }
    },
    registerCloudShape() {
      const that = this
      registerShape("point", "cloud", {
        draw(cfg, container) {
          const attrs = that.getTextAttrs(cfg)
          const textShape = container.addShape("text", {
            attrs: {
              ...attrs,
              x: cfg.x,
              y: cfg.y,
            },
          })
          if (cfg.data.rotate) {
            Util.rotate(textShape, (cfg.data.rotate * Math.PI) / 180)
          }
          return textShape
        },
      })
    },
    renderGraph() {
      this.initDv()

      const { x, y } = this.$props
      const { chart, dv } = this
      chart.data(dv.rows)
      chart.scale({
        x: { nice: true },
        y: { nice: true },
      })
      chart.legend(false)
      chart.axis(false)
      chart.tooltip(false)
      chart.coordinate().reflect()
      chart
        .point()
        .position(`${x}*${y}`)
        .color("text")
        .shape("cloud")
        .animate({
          appear: {
            animation: 'zoom-in',
          },
        })
      chart.interaction("element-highlight")
      chart.render()

      chart.on("click", (ev) => {
        const {
          data: {
            data: { path },
          },
        } = ev

        this.$router.push({ path })
      })
    },
  },
  mounted() {
    this.registerCloudShape()
    this.renderGraph()
  },
}
</script>
<style scoped lang="scss"></style>
