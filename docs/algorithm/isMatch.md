# 正则匹配

- 请实现一个函数用来匹配包含`.`和`*`的正则表达式。模式中的字符`.`表示任意一个字符，而`*`表示它前面的字符可以出现任意次（含0次）。在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串`aaa`与模式`a.a`和`ab*ac*a`匹配，但与`aa.a`和`ab*a`均不匹配。



**示例1** 
```
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
```

**示例2** 
```
输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
```

## 反向递归
```js
export const isMatch = (s, p) => {
  const map = new Map()

  const getMatch = (i, j) => {
    const ns = s.substr(0, i + 1)
    const np = p.substr(0, j - 1)
    let match = map.get(`${ns}, ${np}`)
    if (match === undefined) {
      match = matchs(i, j - 2)
      map.set(`${ns}, ${np}`, match)
    }
    return match
  }

  const matchs = (i, j) => {
    if (!(i + 1) && !(j + 1)) return true
  
    while (j >= 0) {
      if (p[j] === '*') {
        if (p[j - 1] === '.') {
          if (j - 2 < 0) return true
          while (i + 1 > 0) {
            const match = getMatch(i, j)
            if (match) return true
            i--
          }
          return getMatch(i, j)
        } else {
          if (i < 0 && j - 2 < 0) return true
          if (s[i] !== p[j - 1]) return getMatch(i, j)
          while (i + 1 >= 0 && s[i] === p[j - 1]) {
            const match = getMatch(i, j)
            if (match) return true
            i--
          }
          return getMatch(i, j)
        }
      }
      else if (p[j] === '.') {
        if (i < 0) return false
        j--
        i--
      } 
      else {
        if (p[j] === s[i]) {
          i--
          j--
        } else return false
      }
    }
    return i === j
  }

  return matchs(s.length - 1, p.length - 1)
}
```

<CodeTest style="margin-top: 20px;" mode="isMatch" />

<vTalk />