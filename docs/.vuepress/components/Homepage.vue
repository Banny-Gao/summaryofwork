<template>
  <div class="home" :style="{backgroundColor: bgColor}">
    <div class="wrapper">
      <curve-banner v-if='curveShow' @averageClolr='getAverageClolr'></curve-banner>
      <div class="description">
        <Content />
      </div>
      <div class="footer"
           v-if="data.footer">
        {{ data.footer }}
      </div>
    </div>
  </div>
</template>

<script>
  import curveBanner from './CurveBanner.vue'
  export default {
    components: {
      curveBanner
    },
    data() {
      return {
        curveShow: false,
        bgColor: '#f8f8f8'
      }
    },
    computed: {
      data () {
        return this.$page.frontmatter;
      }
    },
    methods: {
      getAverageClolr(color) {
        // this.bgColor = `#${color}`
      }
    },
    mounted () {
      // console.log(this.$page)
      this.curveShow = window.innerWidth > 1068 ? true: false
      window.onresize = (e) => {
        this.curveShow = window.innerWidth > 1068 ? true: false
      }
    }
  };
</script>

<style lang="stylus">
  @import './styles/config.styl';

  body {
    .home {
      max-width: 100%;
      background-color: $homeBgColor;
      min-height: calc(100vh - 6rem);
      display: flex;
      padding: 1.2rem 2rem 0;
    }

    @media (max-width: $MQMobileNarrow) {
      .home {
        padding-left: 0;
        padding-right: 0;
        padding: 1rem 0.5rem;
      }
    }
  }

  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: center
    align-items: center;
    .description {
      width: 56vw;
      line-height: 32px;
    }

    .footer {
      padding: 1rem;
      // border-top 1px solid lighten(#bdc3c7, 50%)
      font-weight: 200;
      font-size: 1rem;
      text-align: center;
      color: lighten($footColor, 25%);
      margin-top: auto;
    }
  }
</style>
