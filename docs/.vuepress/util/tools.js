const path = require('path')
const walkFile = require('./walk-file')
const timeEmoj = [
  '🕛',
  '🕧',
  '🕐',
  '🕜',
  '🕑',
  '🕝',
  '🕒',
  '🕞',
  '🕓',
  '🕟',
  '🕔',
  '🕠',
  '🕕',
  '🕡',
  '🕖',
  '🕢',
  '🕗',
  '🕣',
  '🕘',
  '🕤',
  '🕙',
  '🕥',
  '🕚',
  '🕦'
]
const getTimeEmoj = () => {
  const date = new Date()
  const hourIndex = (date.getHours() % 12) * 2
  const minIndex = ~~(date.getMinutes() / 30 + 0.16)
  return timeEmoj[hourIndex + minIndex]
}

/**
 * 获取目录md文件列表
 */
const getMdMap = (pathName) => {
  const dirname = path.dirname(__dirname.replace(/(\S)\.vuepress/,(str,$1) => $1))
  let basePath = dirname.replace(/\\/g, '\/')
  const pathArr = basePath.split('\/').splice(0)
  basePath = pathArr.join('/') + `/${pathName}/`
  const fileList = walkFile(basePath, '.md').reverse()
  return fileList
}

module.exports = {
  getTimeEmoj,
  getMdMap
}