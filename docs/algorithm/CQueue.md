# 用两个栈实现队列

- 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead  操作返回 -1 )

**示例**

```
输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
```

```javascript
class CQueue {
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
```

<CodeTest style="margin-top: 20px;" mode="CQueue" />

<vTalk />
