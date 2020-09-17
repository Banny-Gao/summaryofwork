<template>
  <div class="collections-container">
    <a-spin v-if="!collections.length" :style="spinStyles"/>
    <g2-treemap
      :data="collections"
      :is-show-label="false"
      @on-item-click="onItemClick"
      :setTooltip="handleSetTooltip"
    />
  </div>
</template>
<script>
import G2Treemap from "../lib/G2Components/G2Treemap"

const starSVG = '<svg viewBox="64 64 896 896" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>'
export default {
  components: {
    G2Treemap,
  },
  data() {
    return {
      collections: [],
      spinStyles: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }
    }
  },
  methods: {
    async getJson() {
      const resp = await fetch(`${this.$cloudUrl}collections.json`)
      const collections = await resp.json()
      return collections
    },
    onItemClick(e) {
      window.open(e.data.data.url)
    },
    handleSetTooltip(name, value) {
      let count = value / 100 * 10
      let stars = '<ul style="line-height: 0;font-size: 16px;" role="radiogroup" class="ant-rate" data-v-a1ccd506="">'

      while(count > 0) {
        if (count >= 1) {
          stars += `<li class="ant-rate-star ant-rate-star-full"><div role="radio" aria-checked="true" aria-posinset="3" aria-setsize="5" tabindex="0"><div class="ant-rate-star-first"><i aria-label="图标: star" class="anticon anticon-star">${starSVG}</i></div><div class="ant-rate-star-second"><i aria-label="图标: star" class="anticon anticon-star">${starSVG}</i></div></div></li>`
          count--
        } else if (count >= 0.5) {
          stars += `<li class="ant-rate-star ant-rate-star-half ant-rate-star-active"><div role="radio" aria-checked="true" aria-posinset="2" aria-setsize="5" tabindex="0"><div class="ant-rate-star-first"><i aria-label="图标: star" class="anticon anticon-star">${starSVG}</i></div><div class="ant-rate-star-second"><i aria-label="图标: star" class="anticon anticon-star">${starSVG}</i></div></div></li>`
          count -= 0.5
        } else break
      }
      stars += '</ul>'
      
      return {
        name,
        value: stars
      }
    }
  },
  async mounted() {
    const cacheCollections = sessionStorage.getItem("collections")
    const collections = cacheCollections
      ? JSON.parse(cacheCollections)
      : await this.getJson()

    this.collections = collections
    sessionStorage.setItem("collections", JSON.stringify(collections))
  },
}
</script>
<style scoped lang="stylus">
.collections-container 
  position relative
</style>
