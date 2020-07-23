# 深度优先和广度优先

```javascript
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
```
从data中取出所有的name，返回一个数组

## 深度优先

```javascript
export class DFS {
  constructor(data) {
    this.data = data
  }
  // 非递归
  getValues(key) {
    const stack = [...this.data]
    const result = []
    while(stack.length) {
      const item = stack.pop()
      item[key] !== undefined && result.push(item[key])
      Object.values(item).forEach(value => {
        if (Array.isArray(value)) stack.push(...value)
      })
    }
    return result
  }
  // 递归
  getValuesRecursive(key) {
    const result = []
    const map = data => {
      data[key] !== undefined && result.push(data[key])
      Object.values(data).forEach(value => {
        if (Array.isArray(value)) value.forEach(child => map(child))
      })
    }
    this.data.forEach(data => map(data))
    return result
  }
}
```

## 广度优先

```javascript
class BFS {
  constructor(data) {
    this.data = data
  }
// 非递归
  getValues(key) {
    const stack = [...this.data]
    const result = []
    while(stack.length) {
      const item = stack.shift()
      item[key] !== undefined && result.push(item[key])
      Object.values(item).forEach(value => {
        if (Array.isArray(value)) stack.push(...value)
      })
    }
    return result
  }
// 递归
  getValuesRecursive(key) {
    const map = (data, result = []) => {
      const stack = []
      for (let item of data) {
        item[key] !== undefined && result.push(item[key])
        Object.values(item).forEach(value => {
          if (Array.isArray(value)) stack.push(...value)
        })
      }
      if (stack.length) result = map(stack, result)
    }
    return map(this.data)
  }
}
```
<font style='color: #ff0000;'>深度优先或广度优先的快慢，还是得看整颗递归树的结构以及操作数据的方式来判断。不能单一方面的说广度优先快或者深度优先更快。</font>

<CodeTest mode='DFS'/>

<vTalk />