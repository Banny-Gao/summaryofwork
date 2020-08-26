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
  const len = nums.length
  if (len <= 1) return len

  const dp = [nums[0]]
  let max = 1

  for (let i = 1; i < len; i++) {
    if (nums[i] > dp[max - 1]) {
      dp.push(nums[i])
      max++
    } else {
      let l = 0, r = max - 1
      let mid

      while (l < r) {
        mid = (l + r) >> 1
        if (dp[mid] < nums[i]) {
          l = mid + 1
        } else {
          r = mid
        }
      }

      dp[l] = nums[i]
    }
  }

  return max
}
