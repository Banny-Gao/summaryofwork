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