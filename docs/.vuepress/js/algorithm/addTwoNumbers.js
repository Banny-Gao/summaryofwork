export function ListNode(val) {
  this.val = val
  this.next = null
}

export const addTwoNumbers = (l1, l2) => {
  const node = new ListNode()
  let temp = node
  let sum = 0
  let add = 0

  while (l1 || l2) {

    sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + add
    add = sum >= 10 ? 1 : 0
    temp.next = new ListNode(sum % 10)
    temp = temp.next

    l1 && (l1 = l1.next)
    l2 && (l2 = l2.next)
  }
  add && (temp.next = new ListNode(add))
  return node.next
}
