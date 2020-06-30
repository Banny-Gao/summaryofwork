# 合并两个有序链表

- 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

**示例**

```
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
export const mergeTwoLists = (l1, l2) => {
  const result = new ListNode()
  let temp = result

  while (l1 || l2) {
    const val1 = l1 ? l1.val : Infinity
    const val2 = l2 ? l2.val : Infinity

    let min = Math.min(val1, val2)

    temp.next = new ListNode(min)
    temp = temp.next

    if (val1 < val2) l1 = l1.next
    else l2 = l2.next

  }

  return result.next
}
```

<CodeTest style="margin-top: 20px;" mode="mergeTwoLists" />

<vTalk />
