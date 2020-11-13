# 打家劫舍 II

- 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

- 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，能够偷窃到的最高金额。


**示例1**
```
输入：nums = [2,3,2]
输出：3
解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
```

**示例2**
```
输入：nums = [1,2,3,1]
输出：4
解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

## 动态规划
```javascript
/* 
        1 2 3 1
        1 1 4 4
        0 2 2 3
        0 0 3 3
        0 0 0 1

        dp[i] = max(dp[i - 1], dp[i - 2] + f(i))
     */
export const rob = nums => {
  if (nums.length === 1) return nums[0]
  if (nums.length < 3) return Math.max(nums[0], nums[1])
  const getDP = arr => {
    const len = arr.length
    if (!len) return 0
    const dp = [0, arr[0]]

    for (let i = 2; i <= arr.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i - 1])
    }

    return dp[len]
  }

  const end = nums.pop()
  const [start, ...mids] = nums

  return Math.max(getDP([start, ...mids]), getDP([...mids, end]))
}
```
<CodeTest style="margin-top: 20px;" mode="rob" />  

<vTalk />