# 不含连续1的非负整数

- 给定一个正整数 n，找出小于或等于 n 的非负整数中，其二进制表示不包含 **连续的1** 的个数。

**示例**

## 暴力超时
```js
export const findIntegers_timeout = function (num) {
  const check = (num) => {
    let prev
    while (num > 0) {
      const next = num % 2
      num = (num - next) / 2
      if (prev * next === 1) return false
      prev = next
    }
    return true
  }
  let count = 0
  for (let i = 0; i <= num; i++) {
    if (check(i)) count++
  }
  return count
}
```

## 超时优化版

```javascript
export const findIntegers_optimize = num => {
  const find = (i, sum, prev) => {
    if (sum > num) return 0
    if (1 << i > num) return 1
    if (prev) return find(i + 1, sum, false)
    return find(i + 1, sum, false) + find(i + 1, sum + (1 << i), true)
  }

  return find(0, 0, false)
}
```

## 动态规划[位运算]

<div class="image-viewer-box" v-viewer>
  <img v-for="imgUrl of [`${$cloudUrl}img/4d551f5d1a5c37b1eeb6200bbde4705241b874e9a09f4211e9d6ba88861b0a7c-image.png`, `${$cloudUrl}img/6c2d8465fea65c7030cd9ba345eed8600502c1293f8c45adcd1edff50d2b86b2-image.png`, `${$cloudUrl}img/8d91e9e1528c3127c9e6db707d84b0b956f827254438a864ea27f397f33a5b10-image.png`, `${$cloudUrl}img/ba7c002a0320948c90f2f69f87b86e5558611610b60d4dd0d37126ff88d05779-image.png`, `${$cloudUrl}img/6fd5af4c533c928b3770e6ebe6120c238aea1aa0fc49e3d4af7c7cdba90ad177-image.png`, `${$cloudUrl}img/98e76e92064de01381538d2b9f4b64be46f14b825e12b33d6f277ed006f42cac-image.png`, `${$cloudUrl}img/6716ad7f9b676ec98e86cda81a8fa5859b3ba51858c219fc622b17782d842b90-image.png`, `${$cloudUrl}img/359dd86ff0513658aad53e059d7b7b1d65428bc00930e2201eb2a56c8786f0b2-image.png`]" :src="imgUrl" :key="imgUrl" />
</div>

> 从 numnum 的最高位开始考虑，对于第 ii 个位置遇到的 11 （从低位序号为 0 开始考虑），我们将答案加 f[i]f[i] ，对每个遇到的 00 ，我们不给答案加任何值。我们还要记录上一个位置的数值为多少，一旦我们发现连续的 1 ，我们将第二个 1 变成 0 的影响考虑后即停止遍历。如果我们没有遇到连续的 1 ，我们一直遍历到最低位并将最终答案加 1 ，表示 numnum 也是合法数字，因为上述过程并没有考虑 numnum 进去

F['0'] = 1  
F['10'] = 2  
F['100'] = 3  
F['1000'] = 5  
F['10000] = 8  
F[n] = F[n - 1] + F[n - 2]  


```js
export const findIntegers = num => {
  const dp = new Array(32).fill(0)
  dp[0] = 1
  dp[1] = 2

  for (let i = 2; i < dp.length; i++) dp[i] = dp[i - 1] + dp[i - 2]

  let m = 30, sum = 0, prev_bit = 0

  while (m >= 0) {
    if ((num & (1 << m)) !== 0) {
      sum += dp[m]
      if (prev_bit === 1) {
        sum--
        break
      }
      prev_bit = 1
    } else prev_bit = 0
    
    m--
  }

  return sum + 1
}
```

<CodeTest style="margin-top: 20px;" mode="findIntegers" />

[LeetCode题解](https://leetcode-cn.com/problems/non-negative-integers-without-consecutive-ones/solution/bu-han-lian-xu-1de-fei-fu-zheng-shu-by-leetcode/)

<vTalk />
