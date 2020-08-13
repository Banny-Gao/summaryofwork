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