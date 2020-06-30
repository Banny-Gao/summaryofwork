// 1 -> 2 -> 3-> 4 -> null curr

// 1 -> null prev
// 2 -> 3-> 4 -> null  curr

// 2 -> 1 -> null prev
// 3 -> 4 -> null curr

// 3 -> 2 -> 1 -> null
// 4 -> null curr

// 4 -> 3 -> 2 -> 1 -> null prev
// null curr

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

export const reverseList_recur = (head, prev = null) => {
  if (!head) return prev
  const temp = head.next
  head.next = prev
  prev = head
  head = temp
  return reverseList(head, prev)
}
