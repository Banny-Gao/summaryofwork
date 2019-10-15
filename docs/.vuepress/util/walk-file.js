const fs = require('fs'),
   _ = require('lodash'),
  path = require('path')

const walkFile = (d, type, except = [], nDir = '', pDir = '') => {
  d = path.join(d, nDir)
  const dpath = pDir? (`${pDir}/${nDir}`): nDir
  const list = []
  // 获得当前文件夹下的所有的文件夹和文件
  const [dirs, files] = _(fs.readdirSync(d)).partition(p => fs.statSync(path.join(d, p)).isDirectory())
  dirs.forEach(dir => {
    list.push(...walkFile(d, type, except, dir, dpath)) 
  })
  for (let i of except) {
    const index = files.indexOf(i)
    files.splice(index, 1)
  }
  if(files.length === 0) return list
  const o = {
    title: dpath.replace(/\//g,'·'),
    collapsable: nDir&&files.length>15 ? true: false,
    children: []
  }
  // 映射文件
  files.forEach(file => {
    if (path.extname(file) === type) {
      let filename = path.basename(file, type)
      filename === 'README' && (filename = '')
      let pathUrl = dpath ? `${dpath}/${filename}`: filename
      if(filename) o.children.push(pathUrl)
      else o.children.unshift(pathUrl)
    }
  })
  list.push(o)
  return list
}

module.exports = walkFile