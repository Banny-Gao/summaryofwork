# 最长上升子序列

- 给定一个无序的整数数组，找到其中最长上升子序列的长度。

**示例1**  
```
输入: [10,9,2,3,7,5,101,6]
输出: 4 
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
```
- `[10,9,2,3,7,5,101,6]`的最长子序列是`[2,3,7,101]`
- `[10,9,2,3,7,5,101,6,1]`的最长子序列也是`[2,3,7,101]`
- 无序数组的最长上升子序列是以`nums[i]`结尾的最长递增子序列的长度

## 动态规划

- 定义: dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度。
- 对于数组`[10,9,2,3,7,5,101,6]`
  - dp[0] = 1
  - dp[1] = 1
  - dp[2] = 1
  - dp[3] = 2 = dp[2] + 1
  - dp[4] = 3 = dp[3] + 1
  - dp[5] = 3 = dp[3] + 1
  - dp[6] = 4 = dp[4] + 1 
- $dp[i]=max(dp[j])+1,其中0≤j<i且num[j]<num[i]$

```
dp[0] = 1(base)
# 进行状态转移
for 状态1 in 状态1的所有取值：
    dp[i] = base
    for 状态2 in 状态2的所有取值：
        dp[i] = max(dp[i], dp[j] + 1)
```

```javascript
export const lengthOfLIS = nums => {
  const len = nums.length
  if (!len) return 0
  const dp = new Array(len).fill(1)

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max.apply(null, dp)
}
```

## 二分查找

- 维护一个最小上升dp
  - 遇到比dp末尾元素大的push
  - 否则，用它覆盖掉dp里比它大的元素中, 最小的那个。

- 纸牌的堆数就是最长递增子序列的长度
  
<div class="viewer-wraper">
  <div class="image-viewer-box" v-viewer="{inline: true, navbar: false, title: false, loop: false}">
    <img v-for="imgUrl of [
      `${$cloudUrl}img/821fe904ca7fcbbf309407ad7e41952b29d6b1d6989c471f4358e7e1dc52e416-Picture1.png`,
      `${$cloudUrl}img/bedbea1f343fde9e4b1f6b4ac982772c0a095e4ddc17c6c024974845fd976f7e-Picture2.png`,
      `${$cloudUrl}img/57777040c66f1ca8748ac2d6eaec93256f1a458ad2a219e9d166ee9aef608f66-Picture3.png`,
      `${$cloudUrl}img/fcc402f5a7c21681405486afa65403b237e80639740e244a909adaaa6873867d-Picture4.png`,
      `${$cloudUrl}img/c99b3eeca827a2f1c5e55f15131e81f463150e9db62906722457264f1328032b-Picture5.png`,
      `${$cloudUrl}img/095b564bc8dd16475cc149e166fca5a3d059ddaee19fe555f4b4085ee8e439c4-Picture6.png`,
      `${$cloudUrl}img/4eb096bf01e1c1879c2b17a1c298341a4de4f48d9292127020781448c4f4dc78-Picture7.png`,
      `${$cloudUrl}img/6808e0f2ef1ba669aaf93252c3262b5442e0ab5689bec16ada3af29866e11e64-Picture8.png`,
      `${$cloudUrl}img/c8f6a8543a627e2a2d07e1b6d8b3f142e0b8844fd639acb553a9654d564f4a8b-Picture9.png`,
      `${$cloudUrl}img/392dcb5a0af00923cbe014e529044491f327d8889ff4cc13e80fdf080b50eb94-Picture10.png`,
    ]" :src="imgUrl" :key="imgUrl" />
  </div>
</div> 

```js
export const lengthOfLIS_binarySearch = nums => {
  const len = nums.length
  if (len <= 1) return len

  const dp = [nums[0]]
  let max = 1

  for (let i = 1; i < len; i++) {
    if (nums[i] > dp[max - 1]) {
      dp.push(nums[i])
      max++
    } else {
      let l = 0, r = max - 1
      let mid

      while (l < r) {
        mid = (l + r) >> 1
        if (dp[mid] < nums[i]) {
          l = mid + 1
        } else {
          r = mid
        }
      }

      dp[l] = nums[i]
    }
  }

  return max
}
```

<CodeTest style="margin-top: 20px;" mode="lengthOfLIS" />  

<vTalk />