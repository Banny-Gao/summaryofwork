<template>
  <Table v-bind="tableProp"></Table>
</template>
<script>
import { Table } from "view-design"
export default {
  components: {
    Table
  },
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
.ivu-table td.active {
  color: #ff5722 !important;
}
</style>
