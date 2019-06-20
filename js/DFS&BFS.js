// 取所有name新数组
const data = [
  {
      name: 'a',
      children: [
          { name: 'b', children: [{ name: 'e' }] },
          { name: 'c', children: [{ name: 'f' }] },
          { name: 'd', children: [{ name: 'g' }] },
      ],
  },
  {
      name: 'a2',
      children: [
          { name: 'b2', children: [{ name: 'e2' }] },
          { name: 'c2', children: [{ name: 'f2' }] },
          { name: 'd2', children: [{ name: 'g2' }] },
      ]
  }
]

// DFS
// 递归
function getName(data) {
  const result = []
  const map = data => {
    result.push(data.name)
    data.children && data.children.forEach(child => map(child))
  }
  data.forEach(item => {
    map(item)
  })
  return result
}
// 非递归
function getName1(data) {
  const result = [], stack = [...data]
  while(stack.length !== 0) {
    const item = stack.pop()
    result.push(item.name)
    item.children && stack.push(...item.children)
  }
  return result
}

// BFS
// 非递归
function getName2(data) {
  const result = [], stack = [...data]
  while(stack.length !== 0) {
    const item = stack.shift()
    result.push(item.name)
    item.children && stack.push(...item.children)
  }
  return result
}
// 递归
function getName3(data, result = []) {
  const stack = []
  for(let i of data) {
    result.push(i.name)
    i.children && stack.push(...i.children)
  }
  if(stack.length !== 0) {
    result = getName3(stack, result)
  }
  return result
}
