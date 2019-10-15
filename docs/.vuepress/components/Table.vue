<template>
  <i-table v-bind="tableProp"></i-table>
</template>
<script>
  import iTable from 'iview/src/components/table'
  import 'iview/dist/styles/iview.css'
  export default {
  	components: {
  		iTable,
  	},
    props: {
      tableProp: {}
    },
  	data() {
  		return {}
  	},
  	methods: {},
  }
</script>
<style lang='scss'>
body{
  font-size: 14px!important;
}
.ivu-table td.active {
  color: #ff5722!important;
}
</style>