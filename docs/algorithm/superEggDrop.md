# 高楼抛鸡蛋

- 你将获得 K 个鸡蛋，并可以使用一栋从 1 到 N  共有 N 层楼的建筑。
- 每个蛋的功能都是一样的，如果一个蛋碎了，你就不能再把它掉下去。
- 你知道存在楼层 F ，满足 0 <= F <= N 任何从高于 F 的楼层落下的鸡蛋都会碎，从 F 楼层或比它低的楼层落下的鸡蛋都不会破。
- 每次移动，你可以取一个鸡蛋（如果你有完整的鸡蛋）并把它从任一楼层 X 扔下（满足 1 <= X <= N）。
- 你的目标是确切地知道 F 的值是多少。

- 无论 F 的初始值如何，你确定 F 的值的最小移动次数是多少？


**示例 1:**

```
输入：K = 1, N = 2
输出：2
解释：
鸡蛋从 1 楼掉落。如果它碎了，我们肯定知道 F = 0 。
否则，鸡蛋从 2 楼掉落。如果它碎了，我们肯定知道 F = 1 。
如果它没碎，那么我们肯定知道 F = 2 。
因此，在最坏的情况下我们需要移动 2 次以确定 F 是多少。
```

**示例 2:**

```
输入：K = 2, N = 6
输出：3
```

**说明:**

- 1 <= K <= 100
- 1 <= N <= 10000

## 自顶向下（记忆化递归）

```js
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

    // let m = n             // 暴力超时
    // while (m >= 1) {
    //   res = Math.min(res, Math.max(getDP(k - 1, m - 1) + 1, getDP(k, n - m) + 1))
	  //   m--
    // }


    while (low <= high) {      // 二分优化
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
```

## 数学法(动态规划)

- 逆向思维： 不考虑鸡蛋是在哪层抛下，只考虑抛下后的状态与楼层，且最后都能找到确切楼层。在T层抛下，
  - 用f(T, K)表示K个鸡蛋在T次抛出后能求得的最高楼层
  - 若鸡蛋碎掉，则T层下可以有f(T - 1, K - 1)层
  - 若鸡蛋没碎，则T层上可以有f(T - 1, K)层

- 所以可以求得动态方程： <img src="https://latex.codecogs.com/gif.latex?f(T,&space;K)&space;=&space;1&space;&plus;&space;f(T&space;-&space;1,&space;K&space;-&space;1)&space;&plus;&space;f(T&space;-&space;1,&space;K)" title="f(T, K) = 1 + f(T - 1, K - 1) + f(T - 1, K)" />
  
- T <= N
- 当 T ≥ 1 的时候 f(T, 1) = T, 一个鸡蛋T次抛出后最多能在T层
- 当 K ≥ 1 时，f(1, K) = 1, 不论多少个鸡蛋只抛一次，最多能求得1层为满足条件的最高层

```js
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
```


<CodeTest style="margin-top: 20px;" mode="superEggDrop" />  
