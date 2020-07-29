export const singleNumber_sort = nums => {
  nums = nums.sort()
  let i = 0

  while (i < nums.length - 1) {
    if (nums[i] === null) {
      i++
      continue
    }

    let j = i + 1
    while (j < nums.length && nums[i] !== nums[j]) j++

    if (j === nums.length) return nums[i]
    else nums[j] = null

    i++
  }
  return nums[i]
}

export const singleNumber = nums => {
  let result = null

  for (let i = 0; i < nums.length; i++) result ^= nums[i]

  return result
}