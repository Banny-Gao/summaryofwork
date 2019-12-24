<template>
  <div>
    <a-select
      showSearch
      :defaultValue="randomIn"
      optionFilterProp="children"
      @change="inSelect"
      style="width: 160px;margin-top: 0.5em;"
      :filterOption="filterOption"
    >
      <a-select-option :value="item" v-for="(item, key) in InArr" :key="key">
        {{ item }}
      </a-select-option>
    </a-select>
    <a-select
      showSearch
      :defaultValue="randomOut"
      optionFilterProp="children"
      @change="outSelect"
      style="width: 160px;margin-top: 0.5em;"
      :filterOption="filterOption"
    >
      <a-select-option :value="item" v-for="(item, key) in outArr" :key="key">
        {{ item }}
      </a-select-option>
    </a-select>
    <a-button type="primary" style="margin-top: 0.5em;" @click="showModal">
      打开弹窗示例
    </a-button>
    <magic-modal
      v-model="modal"
      :animateIn="animateIn"
      :animateOut="animateOut"
    >
    </magic-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal: false,
      InArr: [
        "bounceIn",
        "bounceInDown",
        "bounceInLeft",
        "bounceInRight",
        "bounceInUp",
        "fadeIn",
        "fadeInDown",
        "fadeInDownBig",
        "fadeInLeft",
        "fadeInLeftBig",
        "fadeInRight",
        "fadeInRightBig",
        "fadeInUp",
        "fadeInUpBig",
        "flipInX",
        "flipInY",
        "lightSpeedIn",
        "rotateIn",
        "rotateInDownLeft",
        "rotateInDownRight",
        "rotateInUpLeft",
        "rotateInUpRight",
        "slideInDown",
        "slideInLeft",
        "slideInRight",
        "rollIn",
        "twisterInDown",
        "twisterInUp",
        "swap",
        "puffIn",
        "vanishIn",
        "swashIn",
        "foolishIn",
        "tinRightIn",
        "tinLeftIn",
        "tinUpIn",
        "tinDownIn",
        "boingInUp",
        "spaceInUp",
        "spaceInRight",
        "spaceInDown",
        "spaceInLeft"
      ],
      outArr: [
        "bounceOut",
        "bounceOutDown",
        "bounceOutLeft",
        "bounceOutRight",
        "bounceOutUp",
        "fadeOut",
        "fadeOutDown",
        "fadeOutDownBig",
        "fadeOutLeft",
        "fadeOutLeftBig",
        "fadeOutRight",
        "fadeOutRightBig",
        "fadeOutUp",
        "fadeOutUpBig",
        "flipOutX",
        "flipOutY",
        "lightSpeedOut",
        "rotateOut",
        "rotateOutDownLeft",
        "rotateOutDownRight",
        "rotateOutUpLeft",
        "rotateOutUpRight",
        "slideOutDown",
        "slideOutLeft",
        "slideOutRight",
        "rollOut",
        "magic",
        "puffOut",
        "vanishOut",
        "openDownLeftOut",
        "openDownRightOut",
        "openUpLeftOut",
        "openUpRightOut",
        "rotateDown",
        "rotateUp",
        "rotateLeft",
        "rotateRight",
        "swashOut",
        "foolishOut",
        "tinRightOut",
        "tinLeftOut",
        "tinUpOut",
        "tinDownOut",
        "bombRightOut",
        "bombLeftOut",
        "boingOutDown",
        "spaceOutUp",
        "spaceOutRight",
        "spaceOutDown",
        "spaceOutLeft"
      ],
      animateIn: "",
      animateOut: ""
    }
  },
  computed: {
    randomIn() {
      const idx = ~~(Math.random() * this.InArr.length)
      return this.InArr[idx]
    },
    randomOut() {
      const idx = ~~(Math.random() * this.outArr.length)
      return this.outArr[idx]
    }
  },
  methods: {
    inSelect(e) {
      this.animateIn = e
    },
    outSelect(e) {
      this.animateOut = e
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    showModal() {
      this.modal = true
    }
  },
  created() {
    this.animateIn = this.randomIn
    this.animateOut = this.randomOut
  }
}
</script>
<style scoped lang="scss"></style>
