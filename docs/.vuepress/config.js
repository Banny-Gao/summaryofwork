const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const path = require('path')
const {
  getTimeEmoj,
  getMdMap
} = require('./util/tools')
const navTitle = getTimeEmoj()
module.exports = {
  title: 'Summary Of work',
  description: 'The description of the site.',
  head: [
    ['link', { rel: 'icon', href: 'https://summaryofwork-1258044298.cos.ap-chengdu.myqcloud.com/public/logo.png' }],
    ['link', { rel: 'manifest', href: 'https://summaryofwork-1258044298.cos.ap-chengdu.myqcloud.com/public/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: '#3eaf7c' }],
    ['link', { rel: 'apple-touch-icon', href: 'https://summaryofwork-1258044298.cos.ap-chengdu.myqcloud.com/public/icons/apple-touch-icon-152.png' }],
    ['link', { rel: 'mask-icon', href: 'https://summaryofwork-1258044298.cos.ap-chengdu.myqcloud.com/public/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
  ],
  base: '/',
  dest: './dist',

  themeConfig: {
    nav: [{
      text: '🏠',
      link: '/'
    },
    {
      text: navTitle,
      link: '/timeLine/'
    },
    {
      text: 'Learning',
      link: '/learning/'
    },
    {
      text: 'Reading',
      items: [{
        text: '📚',
        link: '/bookReading/'
      },
      {
        text: '📂',
        link: '/resource/'
      },
      ]
    },
    {
      text: 'Algorithm',
      link: '/algorithm/'
    },
    {
      text: 'Gayhub',
      link: 'https://github.com/Mackkkk/'
    }
    ],
    sidebar: {
      '/learning/': getMdMap(path.join('learning')),
      '/bookReading/': getMdMap(path.join('bookReading')),
      '/resource/': getMdMap(path.join('resource')),
      '/algorithm/': getMdMap(path.join('algorithm'))
    }
  },
  markdown: {
    // options for markdown-it-anchor
    anchor: {
      permalink: false
    },
    extendMarkdown: (md) => {
      md.use(require('markdown-it-katex'))
    }
  },
  plugins: {
    '@vuepress/back-to-top': {},
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true
    }
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'development') {
      config.devServer.https(true)
      config.plugin('analyzer').use(BundleAnalyzerPlugin)
    }
  }
}