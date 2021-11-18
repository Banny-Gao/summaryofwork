export class MinStack {
  constructor() {
    this.stack = []
    this.minStack = [Infinity]
  }

  push(x) {
    this.stack.push(x)
    // 只存最小值，不关心每个 x 是否存入
    this.minStack.unshift(Math.min(this.minStack[0], x))
  }

  pop() {
    this.stack.pop()
    this.minStack.shift()
  }

  top() {
    return this.stack[this.stack.length - 1]
  }

  min() {
    return this.minStack[0]
  }
}
