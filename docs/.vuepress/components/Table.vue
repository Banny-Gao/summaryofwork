<template>
  <a-table :columns="tableProp.columns" :dataSource="tableProp.data" :pagination="false" size="small" :scroll="{ x: 'calc(50% + 300px)'}" />
</template>
<script>
export default {
  props: {
    tableProp: {}
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss">
body {
  font-size: 14px !important;
}
</style>
