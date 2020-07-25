export const hasCycle_tag = head => {

  if (!head || !head.next) return false

  while (head && !head.tag) {
    head.tag = true
    head = head.next
  }

  return !!head
}

export const hasCycle_map = head => {
  if (!head || !head.next) return false

  const map = new Map()

  while (head && !map.has(head)) {
    map.set(head, true)
    head = head.next
  }

  return !!head
}

export const hasCycle = head => {
  if(!head || !head.next) return false
  
    let slow = head
    let fast = head.next
    
    while(slow != fast){
        if(!fast || !fast.next) return false
        fast = fast.next.next
        slow = slow.next
    }
    return true
}