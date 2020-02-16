import Antd from 'ant-design-vue';
import {creatLoadTag} from './util/util'
import vTalk from './lib/vTalk'
import magicModal from './lib/magicModal'

try {
  var Velocity = require('velocity-animate')
} catch (error) {
  
}

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {

  import('ant-design-vue/dist/antd.css')
  import('view-design/dist/styles/iview.css')
  
  Vue.use(Antd)
  
  Vue.use(vTalk)
  Vue.use(magicModal)
  Vue.prototype.$velocity = Velocity
  
  try {
    creatLoadTag('link', 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css')
    creatLoadTag('css', 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css')
    creatLoadTag('js', 'https://cdn.bootcss.com/velocity/2.0.5/velocity.min.js')
  } catch (error) {
    
  }
}