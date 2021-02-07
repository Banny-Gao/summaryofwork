<template>
  <div class="columns-layout">
    <div class="columns-item-container">
      <a-skeleton 
        :loading="!categoryStars.length" 
        v-if="chartType === 'Stars'"
        :paragraph="{ rows: 20, width: '100%'}"
        :title="false"
      >
        <a-collapse accordion>
          <a-collapse-panel v-for="item of categoryStars" :header="item.language" :key="item.language">
              <a-timeline>
                <a-timeline-item 
                  v-for="(child, index) in item.children" :key="index"
                >
                  <MContent :content='getStartStatsUrl(child)'
                  />
                </a-timeline-item>
              </a-timeline>
          </a-collapse-panel>
        </a-collapse>
      </a-skeleton>
      <a-skeleton 
        :loading="!collections.length" 
        v-else
        :title="false"
        :paragraph="{ rows: 20, width: '100%' }"
      >
        <a-collapse accordion>
          <a-collapse-panel v-for="item of collections" :header="item.name" :key="item.key">
            <a-tag 
              v-for="(child, index) in item.children" :key="index"
              :color="getColors()"
              class="collection-tag"
            >
              <a :href="child.url" target="_blank">{{child.name}}</a>
            </a-tag>
          </a-collapse-panel>
        </a-collapse>
      </a-skeleton>
    </div>
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
        <Stars v-if="chartType === 'Stars'" @getData="getData"/>
        <Collections v-else  @getData="getData"/>
      </div>
    </div>
  </div>
</template>
<script>
import Stars from "./Stars"
import Collections from "./Collections"
import MContent from "./MContent"
import MarkdownCard from "./MarkdownCard"

export default {
  components: {
    Stars,
    Collections,
    MContent,
    MarkdownCard,
  },
  data() {
    return {
      chartType: "Stars",
      categoryStars: [],
      collections: [],
      colors: [
        'pink',
        'red',
        'orange',
        'green',
        'cyan',
        'blue',
        'purple',
      ]
    }
  },
  methods: {
    getData(data) {
      const { chartType } = this
      const dataType = chartType === 'Stars' ?  'categoryStars' : 'collections'
      this[dataType] = data
    },
    getStartStatsUrl(child) {
      const username = child.full_name.split('/')[0]
      const {name} = child
      return `[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${name})](https://github.com/${username}/${name})`
    },
    getColors(index) {
      return this.colors[Math.ceil(this.colors.length * Math.random())]
    }
  },
}
</script>
<style scoped lang="stylus">
.collection-tag
  margin-right 1rem
  margin-bottom 1rem
</style>
