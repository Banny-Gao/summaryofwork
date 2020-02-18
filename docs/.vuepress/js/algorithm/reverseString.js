export const reverseString = (nums) => {
  const len = nums.length
  if(!len) return nums
  let i = 0, j = len  - 1
  let temp = null
  for(i,j; i + (len - 1) % 2 <= j;i++,j--) {
    temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }
  return nums
}

Array.prototype.reverseString = function() {
  return reverseString(this)
}