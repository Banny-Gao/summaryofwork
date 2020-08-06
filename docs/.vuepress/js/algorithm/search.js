export const search = (nums, target) => {
  const len = nums.length
  let mid,
    left = 0,
    right = len - 1

  while (left < right) {
    mid = (left + right) >> 1

    if (
      (nums[left] > nums[mid]) ^
      (target > nums[mid]) ^
      (target < nums[left])
    ) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return left == right && nums[left] == target ? left : -1
}