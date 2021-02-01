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
