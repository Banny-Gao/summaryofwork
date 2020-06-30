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