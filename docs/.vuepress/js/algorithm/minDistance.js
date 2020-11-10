export const minDistance = (word1, word2) => {
  const m = word1.length,
    n = word2.length
  const dp = []

  for (let i = 0; i <= m; i++) {
    dp[i] = [i]
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j
  }

  /* dp[0][0] = 0
  dp[1][0] = 1
  dp[0][1] = 1 */

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      // index 从1开始, 所以比较[i - 1]与[j - 1]
      else
        dp[i][j] =
          Math.min(
            dp[i - 1][j - 1], // 替换
            dp[i - 1][j], // 删除
            dp[i][j - 1] // 增加
          ) + 1
    }
  }

  return dp[m][n]
}
