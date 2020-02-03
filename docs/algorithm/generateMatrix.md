# 螺旋矩阵Ⅱ

- 给定一个正整数 n，生成一个包含 1 到 $n^2$ 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。  

**示例1：**
```
输入: 3
输出:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
```
## 内向环绕
```javascript
export const generateMatrix = (n) => {
  if(!n) return []
  let p = new Array(n), i = 0
  for(i; i < n; i++) {
    p[i] = new Array(n).fill(0)
  }
  i = 0
  let x = -1, y = 0
  while( i < n ** 2) {
    if (p[y] && p[y][x + 1] === 0 && !(p[y - 1] && p[y - 1][x] === 0)) {
      x++
    } else if (p[y + 1] && p[y + 1][x] === 0) {
      y++
    } else if (p[y] && p[y][x - 1] === 0) {
      x--
    } else if (p[y - 1] && p[y - 1][x] === 0) {
      y--
    }
    p[y][x] = i + 1
    i++
  }
  return p
}
``` 

<CodeTest style="margin-top: 20px;" mode="generateMatrix" />  

<vTalk />