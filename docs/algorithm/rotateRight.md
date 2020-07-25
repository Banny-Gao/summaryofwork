# 旋转链表

- 给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。


**示例 1**
```
输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
```

**示例 2**
```
输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL
解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL
```

## 暴力破解

```js
// 1 -> 2-> 3-> 4 -> 5-> NULL,
// null -> 5 -> null
// 1 -> 2 -> 3 -> 4 -> null
// null -> 5 -> 1 -> 2 -> 3 -> 4 -> null
// 5 -> 1 -> 2 -> 3 -> 4 -> null

export const rotateRight_timeout = (head, k) => {
  let curr = head

  if (!curr || !curr.next) return head
  
  for (let i = 0; i < k; i++)  {
    let temp = curr
    
    while (temp.next.next) temp = temp.next

    const prev = temp.next
    let node  = new ListNode()
    node.next = prev
    temp.next = null
    node.next.next = curr
    curr = node.next
    
  } 
  return curr
}
```

## 连成环

```js
export const rotateRight = (head, k) => {
  let curr = head
  
  if (!curr || !curr.next) return head
  let count = 1

  while (curr.next) {
    count++
    curr = curr.next
  }
  curr.next = head

  curr = head
  for (let i = 0; i <  -(k % count) + count -  1; i++) {
    curr = curr.next
  }

  head = curr.next
  curr.next = null

  return head
}
```

<CodeTest style="margin-top: 20px;" mode="rotateRight" />  

<vTalk />