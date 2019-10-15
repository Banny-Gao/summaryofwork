<template>
  <div class='main'>
    <a-button class="btn"
              ghost
              shape="circle"
              icon="redo"
              size="small"
              type="primary"
              @click="shuffle0"></a-button>
    <a-button class="btn"
              ghost
              shape="circle"
              icon="undo"
              size="small"
              type="primary"
              @click="shuffle1"></a-button>
    <a-button class="btn"
              ghost
              shape="circle"
              icon="plus"
              size="small"
              type="danger"
              @click="add"></a-button>
    <a-button class="btn"
              ghost
              shape="circle"
              icon="minus"
              size="small"
              type="danger"
              @click="remove"></a-button>
    <transition-group name="list-complete"
                      tag="p">
      <span v-for="item in items"
            v-bind:key="item"
            class="list-complete-item">
        {{ item }}
      </span>
    </transition-group>
  </div>
</template>
<script>
  import Button from 'ant-design-vue/lib/button'
  import 'ant-design-vue/dist/antd.css'
  import { shuffle0, shuffle1 } from '../js/shuffle'
  export default {
  	components: {
  		aButton: Button,
  	},
  	data() {
  		return {
  			items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  			nextNum: 10,
  		}
  	},
  	methods: {
  		randomIndex() {
  			return Math.floor(Math.random() * this.items.length)
  		},
  		add() {
  			this.items.splice(this.randomIndex(), 0, this.nextNum++)
  		},
  		remove() {
  			this.items.splice(this.randomIndex(), 1)
  		},
  		shuffle0() {
  			this.items = shuffle0(this.items)
  		},
  		shuffle1() {
  			this.items = shuffle1(this.items)
  		},
  	}
  }
</script>
<style scoped lang='scss'>
  .btn {
  	margin-right: 10px;
  }
  .list-complete-item {
  	transition: all 0.6s;
  	display: inline-block;
  	margin-right: 10px;
  	font-size: 16px;
  	font-weight: 600;
  }
  .list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active for below version 2.1.8 */ {
  	opacity: 0;
  	transform: translateY(30px);
  }
  .list-complete-leave-active {
  	position: absolute;
  }
</style>