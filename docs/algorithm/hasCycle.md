# 环形链表

- 给定一个链表，判断链表中是否有环。

- 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

**示例1** 
```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

## 节点标记

```js
export const hasCycle_tag = head => {

  if (!head || !head.next) return false

  while (head && !head.tag) {
    head.tag = true
    head = head.next
  }

  return !!head
}
```

## HashMap

```js
export const hasCycle_map = head => {
  if (!head || !head.next) return false

  const map = new Map()

  while (head && !map.has(head)) {
    map.set(head, true)
    head = head.next
  }

  return !!head
}
```

## 双指针

```js
export const hasCycle = head => {
  if(!head || !head.next) return false
  
    let slow = head
    let fast = head.next
    
    while(slow != fast){
        if(!fast || !fast.next) return false
        fast = fast.next.next
        slow = slow.next
    }
    return true
}
```

<CodeTest style="margin-top: 20px;" mode="hasCycle" />

<vTalk />