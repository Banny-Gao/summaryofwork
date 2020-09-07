<template>
  <div class="page"></div>
</template>
<script>
import { github } from '../api'
export default {
  data() {
    return {}
  },
  methods: {},
  mounted() {
    // github.getAccessToken()
    github.fetchMyStars()
  }
}
</script>
<style scoped lang="scss"></style>
