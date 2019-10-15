export const threeSum_overtime = (nums = []) => {
  if (nums.length < 3) return []
  const sums = [], numMap = {}
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      const s = nums[i] + nums[j]
      for (let k = j + 1; k < nums.length; k++) {
        const sum = [nums[i], nums[j], nums[k]].sort(),
          f = sum.join() in numMap
        if (nums[k] === -s && !f) {
          sums.push(sum)
          numMap[sum.join()] = 1
        }
      }
    }
  }
  return sums
}

export const threeSum = (nums = []) => {
  if (nums.length < 3) return []
  nums = nums.sort((a, b) => a - b)
  const sums = [], numMap = {}
  let p = 1
  while (p < nums.length - 1) {
    let i = 0, j = nums.length - 1
    if (nums[i] > 0) return sums
    while (i < p && j > p) {
      const s = nums[i] + nums[p] + nums[j]
      if (s === 0) {
        const sum = [nums[i], nums[p], nums[j]].sort(),
          f = sum.join() in numMap
        if (!f) {
          sums.push([nums[i], nums[p], nums[j]])
          numMap[sum.join()] = 1
        }
        i++
        j--
        while (i < p && nums[i] === nums[i - 1]) i++
        while (j > p && nums[j] === nums[j + 1]) j--;
      }
      else if (s < 0) i++
      else j--
    }
    p++
  }
  return sums
}