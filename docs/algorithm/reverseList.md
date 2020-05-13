# 反转链表

- 反转一个单链表。

**示例:**

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

链表定义：
```
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
```

## 循环
```javascript
var reverseList = function(head) {
  let left = null;
  let temp = null;
  while(head !== null) {
      temp = head.next;
      head.next = left;
      left = head;
      head = temp;
  }
  return left;
}
```

## 递归
```javascript
var reverseList = function(head, prev = null) {
    if (!head) return prev
    let cure = head.next
    head.next = prev
    prev = head
    return reverseList(cure, prev)
};
```