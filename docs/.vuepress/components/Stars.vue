<template>
  <div class="stars-container">
    <a-spin v-if="!categoryStars.length" :style="spinStyles"/>
    <g2-treemap
      :data="categoryStars"
      coordinate="polar"
      field="stargazers_count"
      child-key="children"
      categoryKey="language"
      label="name"
      :is-show-label="false"
      @on-item-click="onItemClick"
    />
  </div>
</template>
<script>
import { github } from "../api"
import G2Treemap from "../lib/G2Components/G2Treemap"

export default {
  components: {
    G2Treemap,
  },
  data() {
    return {
      stars: [],
      per_page: 300,
      page: 1,
      q: "",
      sort: "stars",
      language: "", // javascript
      categoryStars: [],
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
      const categoryStars = await new Promise((resolve, reject) => {
        fetch(`${this.$cloudUrl}stars.json`)
          .then(res => res.json())
          .then(resolve)
          .catch(reject)
      })
      this.categoryStars = categoryStars
    },
    async getAllStars() {
      try {
        const data = await this.getStars()
        if (data.length) {
          this.page++
          await this.getAllStars()
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    async getStars() {
      const { per_page, page, q, sort, language } = this

      const { data } = await github.getMyStars({
        per_page,
        page,
        q,
        sort,
        language,
      })
      this.stars.push(...data)

      return data
    },
    async getCategoryStars() {
      try {
        await this.getAllStars()
      } catch {
        await this.getJson()
      }

      const map = new Map()
      this.stars.forEach((star) => {
        const language = star.language ?? "Others"
        const category = map.get(language) || {
          language,
          stargazers_count: 0,
          children: [],
        }
        category.children.push(star)
        category.stargazers_count += star.stargazers_count
        map.set(language, category)
      })

      return [...map.values()]
    },
    onItemClick(e) {
      window.open(e.data.data.html_url)
    }
  },
  async mounted() {
    const cacheCategoryStars = sessionStorage.getItem("categoryStars")
    const categoryStars = cacheCategoryStars
      ? JSON.parse(cacheCategoryStars)
      : await this.getCategoryStars()

    this.categoryStars = categoryStars
    sessionStorage.setItem("categoryStars", JSON.stringify(categoryStars))
  },
}
</script>
<style scoped lang="stylus">
.stars-container 
  position relative
</style>
