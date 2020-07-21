export const integerBreak = n => {
  if (n <= 3) return n - 1

  let res = 1
  while (n > 4) {
    res *= 3
    n -= 3
  }
  res *= n
  return res
}

export const integerBreak_pow = (n) => {
  if (n <= 3) return n - 1

  const x = ~~(n / 3), y = n % 3

  //恰好整除，直接为3^x 
  if (y === 0) return Math.pow(3, x)
  //余数为1，退一步 3^(x-1)*2*2 
  if (y === 1) return Math.pow(3, x - 1) * 4
  //余数为2，直接乘以2
  return Math.pow(3, x) * 2
}

export const integerBreak_dp = function (n) {
  let memo = []
  memo[1] = 1

  for (let i = 2; i <= n; i++) {
    let max = 0
    for (let j = 1; j < i; j++) {
      max = Math.max(
        max,
        // 不继续拆分 i - j,直接对比一次
        // 比如 1 和 2，不光要对比 1 * (2 拆分后的结果)
        // 也要直接对比 1 * 2
        j * (i - j),
        j * memo[i - j]
      )
    }
    memo[i] = max
  }

  return memo[n]
}