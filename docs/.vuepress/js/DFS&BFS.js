export class DFS {
  constructor(data) {
    this.data = data
  }
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


export class BFS {
  constructor(data) {
    this.data = data
  }

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