# 包含min函数的栈

- 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

**示例**

```
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.min();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.min();   --> 返回 -2.
```

```javascript
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
```

<CodeTest style="margin-top: 20px;" mode="MinStack" />

<vTalk />
