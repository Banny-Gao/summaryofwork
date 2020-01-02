<template>
  <div class="reTabel">
    <a-row>
      <a-col :span='4' class="tabel-cell" v-for="(item, index) of reSymbol" :key="index">
        <a-tooltip>
          <template slot="title">
            <span>{{ item.value }}</span>
          </template>
          <div :class="item.active ? 'active' : ''">{{ item.key }}</div>
        </a-tooltip>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { reSymbol } from "../constants/regexpMap"
export default {
  data() {
    return {
      reSymbol
    }
  },
  methods: {}
}
</script>
<style scoped lang="scss">
.reTabel {
  margin: 20px 0;
  border: 1px solid #eee;
  border-radius: 6px;
  text-align: center;
  .tabel-cell{
    line-height: 42px;
    cursor: context-menu;
    font-size: 14px;
    font-weight: 700;
    .active{
      color: #ff5722;
    }
  }
}
</style>
