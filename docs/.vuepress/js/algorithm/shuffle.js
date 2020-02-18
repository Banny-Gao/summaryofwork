//字符串乱序
const shuffle0 = (str) => {
  const arr = Array.isArray(str) ? [...str] : Array.from(str)
  return Array.from(str).sort(() => Math.random() - 0.5)
}

const shuffle1 = (str) => {
  const arr = Array.isArray(str) ? [...str] : Array.from(str)
  for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
  return arr
}

export {
  shuffle0,
  shuffle1
}

export class Solution {
  constructor(nums) {
    this.nums = nums
  }
  reset() {
    return this.nums
  }
  shuffle() {
    const str = this.nums
    const arr = Array.isArray(str) ? [...str] : Array.from(str)
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr
  }
}
