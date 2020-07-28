export const getIntersectionNode_map = (headA, headB) => {
  const map = new Map()
  
  while(headA) {
      map.set(headA, true)
      headA = headA.next
  }
  
  while(headB) {
      if (map.has(headB)) return headB
      headB = headB.next
  } 
  return null
}

export const getIntersectionNode = (headA, headB) => {
  let pA = headA
  let pB = headB

  while(pA !== pB) {
    pA = pA ? pA.next : headB
    pB = pB ? pB.next : headA
  }

  return pA
}