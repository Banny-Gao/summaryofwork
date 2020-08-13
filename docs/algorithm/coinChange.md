# 零钱兑换

- 给定不同面额的硬币 coins 和一个总金额 amount。
- 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。


**示例**

```
输入: coins = [1, 2, 5], amount = 11
输出: 3 
解释: 11 = 5 + 5 + 1
```

**说明**  
你可以认为每种硬币的数量是无限的。

## 动态规划
```javascript
export const coinChange = (coins, amount) => {
  if (amount < 0) return -1
  if (amount === 0) return 0

  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i < coin) continue
      dp[i] = Math.min(dp[i], 1 + dp[i - coin])
    }
  }
  
  return (dp[amount] === Infinity) ? -1 : dp[amount]
}
```

<CodeTest style="margin-top: 20px;" mode="coinChange" />  

<vTalk />