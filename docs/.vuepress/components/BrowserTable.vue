<template>
  <div>
    <a-row type="flex" class="bs-wraper">
      <a-col :span="4" v-for="item of computList" :key="item[0]">
        <p><img :src="baseUrl + item[1].url" :title="item[0]" /></p>
        <p>{{ item[1].version }}</p>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl:
        "https://css-tricks.com/wp-content/themes/CSS-Tricks-17/images/browser-logos/",
      list: {
        chrome: {
          url: "chrome_64x64.png",
          version: "-"
        },
        ie: {
          url: "internet-explorer_9-11_64x64.png",
          version: "-"
        },
        edge: {
          url: "edge_64x64.png",
          version: "-"
        },
        firefox: {
          url: "firefox_64x64.png",
          version: "-"
        },
        safari: {
          url: "safari_64x64.png",
          version: "-"
        }
      }
    }
  },
  computed: {
    computList() {
      return Object.entries(this.list)
    }
  },
  mounted() {
    Object.entries(this.$attrs).forEach(([key, value]) => {
      const obj = this.list[key]
      if (obj) obj.version = value
    })
  }
}
</script>
<style scoped lang="scss">
.bs-wraper {
  margin-top: 20px;
  p {
    text-align: center;
    img {
      width: 36px;
      height: 36px;
    }
  }
}
</style>
