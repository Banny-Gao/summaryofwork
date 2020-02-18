export const removeDuplicates = (nums) => {
  const len = nums.length
  if(!len) return 0
  let i = 0, num = nums[0], count = 0
  i++
  while (nums[i] !== undefined) {
    if(nums[i] === num) {
      nums.splice(i, 1)
      count++
    } else {
      num = nums[i]
      i++
    }
    if(i + count === len) break
  }
  return nums.length
}