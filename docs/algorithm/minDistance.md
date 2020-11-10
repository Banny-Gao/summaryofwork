# 编辑距离

给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：
- 插入一个字符
- 删除一个字符
- 替换一个字符


**示例1**
```
输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
```

**示例2**
```
输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
```

## 动态规划

- 从`-1`位开始dp[0][0] = 0
- <img src="https://latex.codecogs.com/gif.latex?dp[i][j]&space;=&space;\left\{\begin{matrix}dp[i&space;-&space;1][j&space;-&space;1]&space;&&space;if(s[i&space;-&space;1]&space;===&space;p[j&space;-&space;1])&space;\\min\bigl(\begin{smallmatrix}dp[i&space;-&space;1][j&space;-&space;1]\\&space;dp[i&space;-&space;1][j]\\&space;dp[i][j&space;-&space;1]\end{smallmatrix}\bigr)&space;&plus;&space;1&&space;else\end{matrix}\right." title="dp[i][j] = \left\{\begin{matrix}dp[i - 1][j - 1] & if(s[i - 1] === p[j - 1]) \\min\bigl(\begin{smallmatrix}dp[i - 1][j - 1]\\ dp[i - 1][j]\\ dp[i][j - 1]\end{smallmatrix}\bigr) + 1& else\end{matrix}\right." />

<div v-viewer>
  <img style="width: 60%;position: relative;left: 20%;" :src="`${$cloudUrl}img/minDistance.png`"/> 
</div>


```javascript
export const minDistance = (word1, word2) => {
  const m = word1.length,
    n = word2.length
  const dp = []

  for (let i = 0; i <= m; i++) {
    dp[i] = [i]
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j
  }

  /* dp[0][0] = 0
  dp[1][0] = 1
  dp[0][1] = 1 */

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      // index 从1开始, 所以比较[i - 1]与[j - 1]
      else
        dp[i][j] =
          Math.min(
            dp[i - 1][j - 1], // 替换
            dp[i - 1][j], // 删除
            dp[i][j - 1] // 增加
          ) + 1
    }
  }

  return dp[m][n]
}
```
<CodeTest style="margin-top: 20px;" mode="minDistance" />  

<vTalk />