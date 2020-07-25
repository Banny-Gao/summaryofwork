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

