/**
 * @param {number[]} nums
 * @return {number[]}
 */
export const productExceptSelf_overtime = (nums) => {
  const arr = []
  let i = 0
  while(i < nums.length) {
    let sum = 1
    for(let j = 0;j < nums.length; j++) {
      let temp = nums[j]
      if(i === j) temp = 1 
      sum *= temp
    }
    arr.push(sum)
    i++
  }
  return arr
} 


export const productExceptSelf = (nums) => {
  const len = nums.length
  const res = new Array(len).fill(1)
  let left = 1, right = 1
  for(let i = 0; i < len; i++) {
    res[i] *= left
    left *= nums[i]
    res[len - 1 - i] *= right
    right *= nums[len - 1 - i]
  }
  return res
} 