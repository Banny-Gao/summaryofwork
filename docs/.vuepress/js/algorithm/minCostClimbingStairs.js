export const minCostClimbingStairs = (cost) => {
  cost.push(0)
  const len = cost.length
  const dp = []
  dp[0] = cost[0]
  dp[1] = cost[1]

  for (let i = 2; i < len; i++) dp[i] = Math.min(dp[i - 2], dp[i - 1]) + cost[i]
  
  return dp[len - 1]
}