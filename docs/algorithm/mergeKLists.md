# 合并K个排序链表

- 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。


**示例**

```
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6
```

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
export const mergeKLists = lists => {
  const result = new ListNode()
  let curr = result
  let i = 0
  let minList = null, minIndex

  while (lists.length) {
    if (i === lists.length) {
      const temp = minList.next
      curr.next = new ListNode(minList.val)
      curr = curr.next
      minList = temp
      lists[minIndex] = minList

      if (!minList) lists.splice(minIndex, 1)
      i = 0
    }

    if (!lists[i]) {
      lists.splice(i, 1)
      i = 0
      continue
    }

    if (
      !minList ||
      (minList.val > lists[i].val)
    ) {
      minList = lists[i]
      minIndex = i
    }

    i++
  }

  return result.next
}
```

<CodeTest style="margin-top: 20px;" mode="mergeKLists" />

<vTalk />
