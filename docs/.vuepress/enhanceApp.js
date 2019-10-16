import vTalk from './lib/vTalk'
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // console.log(Vue, options, router, siteData)
  import('iview/dist/styles/iview.css')
  import('ant-design-vue/dist/antd.css')
  Vue.use(vTalk)
}