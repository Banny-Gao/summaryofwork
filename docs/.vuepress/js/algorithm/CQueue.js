export class CQueue {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }

  appendTail(value) {
    this.stack1.push(value)
  }

  deleteHead() {
    const { stack1, stack2 } = this

    if (!stack2.length) while (stack1.length) stack2.push(stack1.pop())

    return stack2.pop() || -1
  }
}
