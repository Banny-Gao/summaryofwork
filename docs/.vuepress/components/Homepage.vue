<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />
    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <slot name="sidebar-top" #top />
      <slot name="sidebar-bottom" #bottom />
    </Sidebar>

    <div class="home" :style="{ backgroundColor: bgColor }">
      <div class="wrapper">
        <curve-banner
          :style="bannerStyle"
          @averageClolr="getAverageClolr"
        ></curve-banner>
        <div class="description">
          <Content />
        </div>
        <div class="footer" v-if="data.footer">
          {{ data.footer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@theme/components/Navbar.vue"
import Page from "@theme/components/Page.vue"
import Sidebar from "@theme/components/Sidebar.vue"
import { resolveSidebarItems } from '@theme/util'

import curveBanner from "./CurveBanner.vue"

export default {
  components: {
    curveBanner,
    Navbar,
    Sidebar
  },
  data() {
    return {
      bgColor: "#f8f8f8",
      isSidebarOpen: false,
      bannerStyle: {}
    }
  },
  computed: {
    data() {
      return this.$page.frontmatter
    },
    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },
    shouldShowSidebar() {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },
  methods: {
    getAverageClolr(color) {
      // this.bgColor = `#${color}`
    },
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen
      this.$emit("toggle-sidebar", this.isSidebarOpen)
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  },
  mounted() {
    const bannerRender = () => {
      const scale = window.innerWidth / 1068 - 0.15
      if (scale >= 1) return
      this.bannerStyle = {
        transform: `scale(${scale})`
      }
    }
    bannerRender()
    window.onresize = e => {
      bannerRender()
    }
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl';

body {
  .home {
    max-width: 100%;
    background-color: $homeBgColor!important;
    min-height: 100vh;
    display: flex;
    padding-top: 3.6em;
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
