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