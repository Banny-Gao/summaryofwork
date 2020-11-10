# 四键键盘

假设你有一个键盘包含下面按键： 
- key 1: (A) 在屏幕上打印一个`A`
- key 2: (Ctrl-A) 选中整个屏幕
- key 3: (Ctrl-C) 复制选中
- key 4: (Ctrl-V) 粘贴选中

现在，最多N次按键，请问屏幕上最多可以显示几个`A` ?

**示例1：**
```
输入: N = 3
输出: 3
```

**示例1：**
```
输入: N = 7
输出: 9
```


```js
const fourKey = N => {
  const dp = [0]

  for (let i = 1; i <= N; i++) {
    dp[i] = dp[i - 1] + 1
    for (let j = 2; j < i; j++) {
      dp[i] = Math.max(dp[i], dp[j - 2] * (i - j + 1))
    }
  }

  return dp[N]
}
```

<CodeTest style="margin-top: 20px;" mode="fourKey" />  

<vTalk />