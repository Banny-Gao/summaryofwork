/* 
        1       2       3     4     5     6     7
  1     1       2       3     4     5     6     7
  2     1       2       2     3     3     3     dp[K][N] = max(dp[K][N - N / 2], dp[K - 1][N / 2 - 1]) + 1
  dp[1][N] = N
  dp[K][1] = 1
  dp[K][2] = 2
  dp[2][3] = max(dp[2][1], dp[1][1]) + 1 = 2
  dp[2][4] = max(dp[2][2], dp[1][1]) + 1 = 3
  dp[2][7] = max(dp[2][3], dp[1][3]) + 1 = 4
  dp[3][14] = max(dp[3][7], dp[2][6]) + 1 = max(max(dp[3][3], dp[2][3]) + 1, max(dp[2][3], dp[1][2]) + 1) + 1 = 4

  dp[2][9] = max(dp[2][4], dp[1][4]) + 1 = 5 // error   一次low(0) -> high(N) 的二分得出结果不一定是最优解，应该减小high或者增大low,求出所有结果的最小值

  所以： dp[K][N] = min(dp[K][N], dp[K][N - X] + 1, dp[K - 1][X - 1] + 1)
  X = (low + high) >> 1
  - 当鸡蛋在X碎了花费更多时，high = X - 1
  - 否则，low = X + 1
*/

export const superEggDrop = (K, N) => {
  const dp = []

  for (let i = 0; i <= K; i++) {
    dp[i] = []
  }

  const getDP = (k, n) => {
    if (dp[k][n]) return dp[k][n]
    if ([1, 2].includes(n) || k === 1) {
      dp[k][n] = n
      return n
    }

    let res = Infinity,
      low = 1,
      high = n

    while (low <= high) {
      const mid = (low + high) >> 1
      const t1 = getDP(k - 1, mid - 1) // 碎
      const t2 = getDP(k, n - mid) // 没碎
      // res = min(max(碎, 没碎) + 1)
      if (t1 > t2) {
        high = mid - 1
      } else {
        low = mid + 1
      }
      res = Math.min(res, Math.max(t1 + 1, t2 + 1))
    }
    dp[k][n] = res

    return res
  }

  return getDP(K, N)
}

export const superEggDrop_Math = (K, N) => {
  if (N === 1) return 1

  const dp = Array(N + 1)
    .fill(0)
    .map(() => Array(K + 1).fill(0))

  for (let i = 1; i <= K; i++) {
    dp[1][i] = 1 // 只有一层是只需要抛1次就可以确定
  }

  let res
  for (let t = 2; t <= N; t++) {
    // 从第二层开始抛,
    for (let k = 1; k <= K; k++) {
      dp[t][k] = 1 + dp[t - 1][k] + dp[t - 1][k - 1]
    }
    if (dp[t][K] >= N) {
      // t次抛出K枚鸡蛋已经到了N层
      res = t
      break
    }
  }

  return res
}
