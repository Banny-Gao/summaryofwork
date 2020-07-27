export const detectCycle = head => {
  if (!head || !head.next) return null

  let slow = head
  let fast = head

  while (true) {
    if (!fast || !fast.next) return null
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) break
  }
  fast = head
  while (slow !== fast) {
    slow = slow.next
    fast = fast.next
  }

  return slow
}