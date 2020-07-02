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
    ['link', {
      rel: 'icon',
      href: `/logo.png`
    }]
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
      link: '/blog/'
    },
    {
      text: 'Learning',
      items: [{
        text: '📚读书',
        link: '/bookReading/'
      },
      {
        text: '📂资源',
        link: '/resource/'
      },
      {
        text: '📃文章',
        link: '/article/'
      }
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
      '/nav/': getMdMap(path.join('nav')),
      '/blog/': getMdMap(path.join('blog')),
      '/bookReading/': getMdMap(path.join('bookReading')),
      '/resource/': getMdMap(path.join('resource')),
      '/article/': getMdMap(path.join('article')),
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
  plugins: ['@vuepress/back-to-top'],
  chainWebpack (config) {
    // config 是一个 ChainableConfig 的实例
    config.plugin('analyzer').use(BundleAnalyzerPlugin)
  }
}