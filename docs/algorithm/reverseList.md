# 反转链表

- 反转一个单链表。

**示例:**

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

链表定义：
```

```

## 循环
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/*  1 -> 2 -> 3-> 4 -> null cur
 1 -> null prev
 2 -> 3-> 4 -> null  cur
 2 -> 1 -> null prev
 3 -> 4 -> null cur
 3 -> 2 -> 1 -> null
 4 -> null cur
 4 -> 3 -> 2 -> 1 -> null prev
 null curr */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
export const reverseList = (head) => {
  let prev = null
  let curr = head
  while (curr !== null) {
    const temp = curr.next
    curr.next = prev
    prev = curr
    curr = temp
  }
  return prev
}
```

## 递归
```javascript
export const reverseList_recur = (head, prev = null) => {
  if (!head) return prev
  const temp = head.next
  head.next = prev
  prev = head
  head = temp
  return reverseList(head, prev)
}
```

<CodeTest style="margin-top: 20px;" mode="reverseList" />

<vTalk />