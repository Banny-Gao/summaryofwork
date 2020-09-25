# 石子游戏

亚历克斯和李用几堆石子在做游戏。偶数堆石子排成一行，每堆都有正整数颗石子 `piles[i]` .  
游戏以谁手中的石子最多来决出胜负。石子的总数是奇数，所以没有平局。  
亚历克斯和李轮流进行，亚历克斯先开始。 每回合，玩家从行的开始或结束处取走整堆石头。 这种情况一直持续到没有更多的石子堆为止，此时手中石子最多的玩家获胜。  
- 亚历克斯先手，假设亚历克斯和李都发挥出**最佳水平**，求最后两个分别获得的石子个数

**示例1**
```
输入：[5,3,4,5]
输出：true
解释：
亚历克斯先开始，只能拿前 5 颗或后 5 颗石子 。
假设他取了前 5 颗，这一行就变成了 [3,4,5] 。
如果李拿走前 3 颗，那么剩下的是 [4,5]，亚历克斯拿走后 5 颗赢得 10 分。
如果李拿走后 5 颗，那么剩下的是 [3,4]，亚历克斯拿走后 4 颗赢得 9 分。
返回 [9, 8] 。
```  

[labuladong大佬详解](https://leetcode-cn.com/problems/stone-game/solution/jie-jue-bo-yi-wen-ti-de-dong-tai-gui-hua-tong-yong/)

**提示**  

- `2 <= piles.length <= 500`
- `piles.length` 是偶数。
- `1 <= piles[i] <= 500`
- `sum(piles)` 是奇数。

## 动态规划

<div v-viewer>
  <img style="width: 40%;" :src="`${$cloudUrl}img/stone0.png`"/> 
</div>

- base
  - `dp[i][j].fir = piles[i]`
  - `dp[i][j].sec = 0`
  - 其中 `0 <= i == j < n`
- 状态转移方程
  - `dp[i][j].fir = max(piles[i] + dp[i+1][j].sec, piles[j] + dp[i][j-1].sec)`
  - 先手选择左边: `dp[i][j].sec = dp[i+1][j].fir`
  - 先手选择右边: `dp[i][j].sec = dp[i][j-1].fir`

[状态转移方程推导过程](https://www.youtube.com/watch?v=WxpIHvsu1RI)

```js
export const stoneGame = piles => {
  const n = piles.length
  const dp = []

  // 初始化dp数组
  for (let i = 0; i < n; i++) {
    dp[i] = []
    for (let j = i; j < n; j++) {
      dp[i][j] = { fir: 0, sec: 0 }
    }
  }

  // 填入base
  for (let i = 0; i < n; i++)
    dp[i][i].fir = piles[i]

  // 倒着斜着遍历数组
  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      // 先手选择最左边或最右边的分数
      const left = piles[i] + dp[i + 1][j].sec
      const right = piles[j] + dp[i][j - 1].sec
      // 套用状态转移方程
      // 先手肯定会选择更大的结果，后手的选择随之改变
      if (left > right) {
        dp[i][j].fir = left
        dp[i][j].sec = dp[i + 1][j].fir
      } else {
        dp[i][j].fir = right
        dp[i][j].sec = dp[i][j - 1].fir
      }
    }
  }
  return Object.values(dp[0][n - 1])
}
```

<CodeTest style="margin-top: 20px;" mode="stoneGame" />  

<vTalk />