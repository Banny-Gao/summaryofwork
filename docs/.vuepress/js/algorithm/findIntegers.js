export const findIntegers_timeout = (num) => {
  const check = (num) => {
    let prev
    while (num > 0) {
      const next = num % 2
      num = (num - next) / 2
      if (prev * next === 1) return false
      prev = next
    }
    return true
  }
  let count = 0
  for (let i = 0; i <= num; i++) {
    if (check(i)) count++
  }
  return count
}

export const findIntegers_optimize = num => {
  const find = (i, sum, prev) => {
    if (sum > num) return 0
    if (1 << i > num) return 1
    if (prev) return find(i + 1, sum, false)
    return find(i + 1, sum, false) + find(i + 1, sum + (1 << i), true)
  }

  return find(0, 0, false)
}

export const findIntegers = num => {
  const dp = new Array(32).fill(0)
  dp[0] = 1
  dp[1] = 2

  for (let i = 2; i < dp.length; i++) dp[i] = dp[i - 1] + dp[i - 2]

  let m = 30, sum = 0, prev_bit = 0

  while (m >= 0) {
    if ((num & (1 << m)) !== 0) {
      sum += dp[m]
      if (prev_bit === 1) {
        sum--
        break
      }
      prev_bit = 1
    } else prev_bit = 0
    
    m--
  }

  return sum + 1
}