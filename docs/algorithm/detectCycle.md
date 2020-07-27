# 环形链表 II

- 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null

**说明：不允许修改给定的链表。**


**示例1** 
```
输入：head = [3,2,0,-4], pos = 1
输出：tail connects to node index 1
解释：链表中有一个环，其尾部连接到第二个节点。
```

## Floyd 算法

算法图解 

<div v-viewer>
  <img style="width: 40%;position: relative;left: 20%;" :src="`${$router.options.base}img/has-cycle.png`"/> 
</div>

$$2(F + a) = F + a + b + a$$
$$2F + 2a = F + 2a + b$$   
$$F = b$$

- 找到第一次相遇点
- 将慢指针指向head
- 第二次相遇在入环点

```js
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
```

[LeetCode题解](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/huan-xing-lian-biao-ii-by-leetcode/)

<vTalk />