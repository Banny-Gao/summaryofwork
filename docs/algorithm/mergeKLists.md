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

## 逐一比较

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
      (minList.val > lists[i].val )
    ) {
      minList = lists[i]
      minIndex = i
    }

    i++
  }

  return result.next
}
```

## 归并
```javascript
export const mergeKLists_merge = lists => {
  if (lists.length === 0) return null
  if (lists.length === 1) return lists[0]
  if (lists.length === 2) {
    return mergeTwoLists(lists[0], lists[1])
  }

  const mid = lists.length >> 1
  const l1 = []
  for (let i = 0; i < mid; i++) {
    l1[i] = lists[i]
  }

  const l2 = []
  for (let i = mid, j = 0; i < lists.length; i++, j++) {
    l2[j] = lists[i]
  }

  return mergeTwoLists(mergeKLists(l1), mergeKLists(l2))
}

```

## 排序数组

```javascript
const mergeKLists_sort = lists => {
  const result = new ListNode()
  let curr = result
  const arr = []

  lists.forEach(list => {
    while (list) {
      arr.push(list.val)
      list = list.next
    }
  })

  const shellSort = (arr) => {
    let temp,
      gap = 1
    const len = arr.length
    // 求出起始增量
    while (gap < len) {
      gap = gap * 3 + 1
    }
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
      for (let i = gap; i < len; i++) { // 据增量分组
        temp = arr[i]
        let j = i - gap
        //如果后一个比前一个小，前面的整体后移，跳出循环后插入
        for (j; j >= 0 && arr[j] > temp; j -= gap) {
          arr[j + gap] = arr[j]
        }
        arr[j + gap] = temp
      }
    }
    return arr
  }

  const sortArr = shellSort(arr)
  sortArr.forEach(item => {
    curr.next = new ListNode(item)
    curr = curr.next
  })

  return result.next
}

// 生成数组： 时间 O(N), 空间 O(N)
// 数据排序： 时间 O(NlogN), 空间 O(1)
// 生成新链表: 时间 O(N), 空间 O(N)
// 时间复杂度: O(NlogN), 空间 O(N)
```

<CodeTest style="margin-top: 20px;" mode="mergeKLists" />

<vTalk />
