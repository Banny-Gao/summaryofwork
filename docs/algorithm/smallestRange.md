# 最小区间

- 你有 k 个升序排列的整数列表。找到一个**最小**区间，使得 k 个列表中的每个列表**至少**有一个数包含在其中。
- 我们定义如果 b-a < d-c 或者在 b-a == d-c 时 a < c，则区间 [a,b] 比 [c,d] 小。


**示例1** 
```
输入：[[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]
输出：[20,24]
解释： 
列表 1：[4, 10, 15, 24, 26]，24 在区间 [20,24] 中。
列表 2：[0, 9, 12, 20]，20 在区间 [20,24] 中。
列表 3：[5, 18, 22, 30]，22 在区间 [20,24] 中。
```

**提示：**
- 给定的列表可能包含重复元素，所以在这里升序表示 >= 。
- 1 <= k <= 3500
- $-10^{5}$ <= 元素的值 <= $10^{5}$

## Sort-Map-Set

```js
export const smallestRange = (nums) => {
  if (!nums.length) return []

  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i].length; j++) {
      const key = nums[i][j]
      const v = map.get(key) || []

      map.set(key, [...v, i])
    }
  }

  sortMap = Array.from(map).sort((a, b) => a[0] - b[0])

  const len = sortMap.length

  const minRange = [sortMap[0][0], sortMap[len - 1][0]]
  let min = minRange[1] - minRange[0]

  for (let i = 0; i < len; i++) {
    const set = new Set(sortMap[i][1])

    let j = i + 1
    while (set.size < nums.length && j < len) {
      sortMap[j][1].forEach(v => set.add(v))
      j++
    }

    if (set.size === nums.length && sortMap[j - 1][0] - sortMap[i][0] < min) {
      minRange[0] = sortMap[i][0]
      minRange[1] = sortMap[j - 1][0]
      min = sortMap[j - 1][0] - sortMap[i][0]
    }
  }

  return minRange
}
```

<CodeTest style="margin-top: 20px;" mode="smallestRange" />  

<vTalk />