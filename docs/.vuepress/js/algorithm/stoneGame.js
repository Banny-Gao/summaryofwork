export const stoneGame = piles => {
  if (len < 3) return true

  const len = piles.length
  // dp[i][j] 定义：区间 piles[i..j] 内先手可以获得的相对分数
  const dp = new Array(len)

  for (let i = 0; i < len; i++) {
    dp[i] = []
    dp[i][i] = piles[i]
  }

  for (let m = len - 2; m >= 0; m--) {
    for (let n = m + 1; n < len; n++) {
      dp[m][n] = Math.max(piles[m] - dp[m + 1][n], piles[n] - dp[m][n - 1])
    }
  }

  return dp[0][len - 1] > 0
}