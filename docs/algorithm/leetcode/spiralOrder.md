# 螺旋矩阵

- 给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。  


**示例1：**
```
输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
```
**示例2：**
```
输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]
```

## 内向环绕
```javascript
/**
 * @param {matrix[]} nums
 * @return {matrix[]}
 */
export const spiralOrder = (matrix) => {
  let m = matrix.length
  if (!m) return []
  let n = matrix[0].length
  if (!n) return []
  let i = 0
  const len = m * n
  const p = []
  for (i; i < m; i++) {
    p[i] = new Array(n).fill(0)
  }
  i = 0
  const result = []
  let x = -1,
    y = 0
  while (i < len) {
    if (p[y] && p[y][x + 1] === 0 && !(p[y - 1] && p[y - 1][x] === 0)) {
      x++
    } else if (p[y + 1] && p[y + 1][x] === 0) {
      y++
    } else if (p[y] && p[y][x - 1] === 0) {
      x--
    } else if (p[y - 1] && p[y - 1][x] === 0) {
      y--
    }
    p[y][x] = 1
    result[i] = matrix[y][x]
    i++
  }
  return result
}
``` 

<CodeTest style="margin-top: 20px;" mode="spiralOrder" />  

<vTalk />