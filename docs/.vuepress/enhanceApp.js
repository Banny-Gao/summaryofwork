import Antd from 'ant-design-vue';
import { creatLoadTag } from './util/util'
import vTalk from './lib/vTalk'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import 'katex/dist/katex.min.css'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {

  import('ant-design-vue/dist/antd.css')
  
  Vue.use(Antd)
  
  Vue.use(vTalk)

  Vue.use(Viewer, {
    defaultOptions: {
      zIndex: 9999
    }
  })
  
  try {
    creatLoadTag('css', 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css')
  } catch (error) {}
}