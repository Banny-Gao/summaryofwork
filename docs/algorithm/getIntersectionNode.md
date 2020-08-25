# 相交链表

- 找到两个单链表相交的起始节点。 

<div v-viewer>
  <img style="width: 40%;position: relative;left: 20%;" :src="`${$cloudUrl}img/160_statement.png`"/> 
</div>

在节点 c1 开始相交。

## map缓存
```javascript
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
};
``` 

## 双指针

- 对向而走，相交终会相逢

```js
export const getIntersectionNode = (headA, headB) => {
  let pA = headA
  let pB = headB

  while(pA !== pB) {
    pA = pA ? pA.next : headB
    pB = pB ? pB.next : headA
  }

  return pA
}
```

<vTalk />