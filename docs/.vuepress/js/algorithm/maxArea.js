export const maxArea = (nums) => {
  let max = 0,
    l = 0,
    r = nums.length - 1
  while (l < r) {
    max = Math.max(max, Math.min(nums[l], nums[r]) * (r - l))
    if (nums[l] < nums[r]) {
      l++
    } else {
      r--
    }
  }
  return max
}