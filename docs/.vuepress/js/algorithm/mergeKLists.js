import { shellSort } from '../sort'
import { mergeTwoLists } from './mergeTwoLists'

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

export const mergeKLists_sort = lists => {
  const result = new ListNode()
  let curr = result
  const arr = []
  lists.forEach(list => {
    while (list) {
      arr.push(list.val)
      list = list.next
    }
  })
  const sortArr = shellSort(arr)
  sortArr.forEach(item => {
    curr.next = new ListNode(item)
    curr = curr.next
  })
  return result.next
}

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