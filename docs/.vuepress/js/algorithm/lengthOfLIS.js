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

export const lengthOfLIS_binarySearch = nums => {
  
}
