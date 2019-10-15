<template>
  <div id="sudoku-demo"
       class="demo">
    <h1>Lazy Sudoku &nbsp; <a-button size="small"
                type="primary"
                ghost
                @click="shuffle">
        Shuffle
      </a-button>
    </h1>
    <transition-group name="cell"
                      tag="div"
                      class="container">
      <div v-for="cell in cells"
           :key="cell.id"
           class="cell">
        {{ cell.number }}
      </div>
    </transition-group>
  </div>
</template>
<script>
  import _ from 'lodash'
  import Button from 'ant-design-vue/lib/button';
  import 'ant-design-vue/dist/antd.css';
  export default {
    components: {
      aButton: Button,
    },
    data() {
      return {
        cells: Array.apply(null,{ length: 81 })
          .map(function(_,index) {
            return {
              id: index,
              number: index%9+1
            }
          })
      }
    },
    methods: {
      shuffle: function() {
        this.cells=_.shuffle(this.cells)
      }
    }
  }
</script>
<style scoped lang='scss'>
  .container {
    display: flex;
    flex-wrap: wrap;
    width: 238px;
    margin-top: 10px;
  }
  .cell {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 25px;
    height: 25px;
    border: 1px solid #aaa;
    margin-right: -1px;
    margin-bottom: -1px;
  }
  .cell:nth-child(3n) {
    margin-right: 0;
  }
  .cell:nth-child(27n) {
    margin-bottom: 0;
  }
  .cell-move {
    transition: transform 1s;
  }
</style>