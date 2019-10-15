<template>
  <div class="curve-con">

  </div>
</template>

<script>
  import curvejs from '../lib/my_node_modules/curvejs/index.js'
  import util from '../util/util.js'
  import Word from '../lib/curve/word.js'
  const { Stage, motion } = curvejs
  const randomColor = util.randomColor
  let stage = null
  export default {
    data() {
      return {
        content: [
          {text: 'S', x: -8, y: 0, r: 5},
          {text: 'u', x: 78, y: 5, r: 4},
          {text: 'm', x: 184, y: 5, r: 5},
          {text: 'm', x: 276, y: 5, r: 5},
          {text: 'a', x: 332, y: 5, r: 4},
          {text: 'r', x: 415, y: 5, r: 4},
          {text: 'y', x: 468, y: 0, r: 4},
          {text: 'O', x: 332, y: 160, r: 5},
          {text: 'f', x: 410, y: 160, r: 4},
          {text: 'W', x: 382, y: 340, r: 4},
          {text: 'o', x: 532, y: 340, r: 4},
          {text: 'r', x: 624, y: 368, r: 4},
          {text: 'k', x: 684, y: 340, r: 4}
        ]
      }
    },
    methods: {
      tick () {
        stage.update()
        window.requestAnimationFrame(this.tick)
      },
      main () {
        let averageClolr = 0
        this.content.forEach(item => {
          const step = Math.PI / (~~Math.random()*90 + 38)
          const color = randomColor()
          averageClolr += parseInt(color.replace(/\#/,''), 16)
          stage.add(new Word(item.text, {
            color,
            x: item.x,
            y: item.y,
            motion: motion.dance,
            data: { angle: 0, r: item.r, step }
          }))
        })
        averageClolr = parseInt(averageClolr/this.content.length)
        this.$emit('averageClolr',averageClolr.toString(16))
        this.tick()
      }
    },
    mounted () {
      stage = new Stage(800, 520, '.curve-con')
      this.main()
    },
    destroyed() {
      status = null
    }
  };
</script>

<style lang="stylus">
  .curve-con {
    margin: 0 auto;
    width: 800px;
    height: 520px;
  }
</style>
