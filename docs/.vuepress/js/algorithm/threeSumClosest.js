export const threeSumClosest = (nums, target) => {
  if (nums.length < 3) return
  nums = nums.sort((a, b) => a - b)
  let sum, minDiff = nums[0] + nums[1] + nums[2] - target,
    p = 1
  while (p < nums.length - 1) {
    let i = p - 1,
      j = p + 1
    while (i >= 0 && j < nums.length) {
      sum = nums[i] + nums[p] + nums[j]
      const diff = sum - target
      if (diff === 0) return sum
      if (diff < 0 && Math.abs(diff) > Math.abs(minDiff)) {
        j++
        while (j < nums.length - 1 && nums[j] === nums[j + 1]) j++
        continue
      }
      if (diff > 0 && Math.abs(diff) > Math.abs(minDiff)) {
        i--
        while (i > 0 && nums[i] === nums[i - 1]) i--
        continue
      }
      minDiff = diff
      diff > 0 ? i-- : j++
    }
    p++
  }
  return target + minDiff
}