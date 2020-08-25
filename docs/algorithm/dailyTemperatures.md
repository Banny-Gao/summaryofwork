# 每日温度

- 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。

- 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。

## 暴力
```javascript
export const dailyTemperatures = T => {
  const nT = []

  T.forEach((Ti, m) => {
    let p = 0, isGt = false
    while (m < T.length) {
      if (T[m] > Ti) {
        isGt = true
        break
      }
      p++
      m++
    }
    p = isGt ? p : 0
    nT.push(p)
  })

  return nT
}
```

## 单调栈

<video :src="`${$cloudUrl}video/Tab-1593683489035.webm`" controller/>  

```javascript
export const dailyTemperatures_stack = T => {
  const res = Array.from(T).fill(0)
  const stack = [0]
  let i = 1
  let pre

  while (i < T.length) {
    if (stack.length === 0) {
      stack.push(i++)
      continue
    }
    pre = stack[stack.length - 1]
    if (T[i] <= T[pre]) {
      stack.push(i++)
    } else {
      stack.pop()
      res[pre] = i - pre
    }
  }
  
  return res
}
```

<CodeTest style="margin-top: 20px;" mode="dailyTemperatures" />

<vTalk />
