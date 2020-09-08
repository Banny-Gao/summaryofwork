
import { debounce } from "lodash"
import { Chart } from "@antv/g2"

export default {
  name: "G2Base",
  data() {
    return {
      chart: null,
    }
  },
  methods: {
    initGraph() {
      if (!this.$refs.graph) return

      const { offsetWidth: width, offsetHeight: height } = this.$refs.graph

      this.chart = new Chart({
        container: this.$refs.graph,
        width,
        height,
      })
    },
  },
  mounted() {
    this.initGraph()

    const resize = debounce(() => {
      if (!this.$refs.graph) return

      const { offsetWidth, offsetHeight } = this.$refs.graph
      this.chart.changeSize(offsetWidth, offsetHeight)
    }, 200)
    window.addEventListener("resize", resize)
  },
}

