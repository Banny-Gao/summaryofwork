<template>
  <div class="columns-layout">
    <div class="columns-item-container"></div>
    <div class="columns-item-container">
      <div class="radio-container">
        <a-radio-group v-model="chartType" size="small">
          <a-radio-button value="Stars">
            Stars
          </a-radio-button>
          <a-radio-button value="Collections">
            Collections
          </a-radio-button>
        </a-radio-group>
      </div>
      <div class="charts-container">
        <Stars v-if="chartType === 'Stars'" />
      </div>
    </div>
  </div>
</template>
<script>
import Stars from "./Stars"
export default {
  components: {
    Stars,
  },
  data() {
    return {
      chartType: "Stars",
    }
  },
  methods: {},
}
</script>
<style scoped lang="stylus">
.radio-container
  display flex
  justify-content  center
.charts-container
  width 80%
  margin 1rem auto
</style>
