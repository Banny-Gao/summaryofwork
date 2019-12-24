import * as Extends from './extendProto'
const ExtendObj = {}
Extends.install(ExtendObj)
/**
 * @param  {string} url
 */
export const linkCss = (url) => {
  const doc = window.document;
  const link = doc.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", url);

  const heads = doc.getElementsByTagName("head");
  if (heads.length)
    heads[0].appendChild(link);
  else
    doc.documentElement.appendChild(link);
}
/**
 * @param  { string } tagName=''
 * @param  { string } url=''
 * @param  { object } extraAttrs={}
 */
export const creatLoadTag = (tagName = '', url = '', extraAttrs = {}) => {
  const doc = window.document
  const tag = doc.createElement(tagName)
  // rel属性
  // alternate
  // author
  // help
  // icon
  // licence
  // next
  // pingback
  // prefetch
  // prev
  // search
  // sidebar
  // stylesheet
  // tag

  // media 属性
  // screen	计算机屏幕（默认）。
  // tty	电传打字机以及类似的使用等宽字符网格的媒介。
  // tv	电视机类型设备（低分辨率、有限的滚屏能力）。
  // projection	放映机。
  // handheld	手持设备（小屏幕、有限带宽）。
  // print	打印预览模式/打印页面。
  // braille	盲人点字法反馈设备。
  // aural	语音合成器。
  // all	适用于所有设备。

  // sizes  仅适用于 rel="icon"。
  // <link rel="icon" href="demo_icon.gif" type="image/gif" sizes="16x16" />

  const linkCssAttrs = {
    rel: 'stylesheet',
    type: 'text/css', // MIME_type
    media: 'screen',
    href: url
  }
  //  如果 async="async"：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
  // 如果不使用 async 且 defer="defer"：脚本将在页面完成解析时执行
  // 如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本
  const linkJsAttrs = {
    type: 'text/javascript',
    charset: 'UTF-8',
    defer: '', //只有 Internet Explorer 支持 defer 属性。
    src: url
  }

  if (tagName === 'link' || tagName === 'css') ExtendObj.cancat.call(extraAttrs, linkCssAttrs)
  if (tagName === 'script' || tagName === 'js') ExtendObj.cancat.call(extraAttrs, linkJsAttrs)
  Object.entries(extraAttrs).forEach(([key, value]) => {
    tag.setAttribute(key, value)
  })
  const heads = doc.getElementsByTagName("head");
  if (heads.length)
    heads[0].appendChild(tag);
  else
    doc.documentElement.appendChild(tag);
}

const util = {
  random: function (min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
  },
  randomColor: function () {
    // 生成非纯白随机色
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
  },
  randomSpeed: function () {
    return (Math.random() > 0.5 ? 1 : -1) * Math.random() * 2
  }
}

export default util