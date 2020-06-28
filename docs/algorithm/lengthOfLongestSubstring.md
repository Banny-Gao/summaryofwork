# 无重复字符的最长子串

- 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

**示例1**  
```
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

## 维护下标
```javascript
export const lengthOfLongestSubstring = (S) => {
  let max = 0,
    i = 0,
    j = 0
  let cStr = ''

  for (j; j < S.length; j++) {
    const s = S[j]
    const prevIndex = cStr.indexOf(s)
    if (prevIndex !== -1) {
      cStr = cStr.substring(prevIndex + 1)
      i += prevIndex + 1
    }
    
    cStr += s
    max = Math.max(max, j - i + 1)
  }
  return max
}
```

## map双指针
```javascript
const lengthOfLongestSubstring = S => {
  const map = new Map()
  let max = 0
  for (let i = 0, j = 0; j < S.length; j++) {
    if (map.has(S[j])) {
      i = Math.max(map.get(S[j]) + 1, i)
    }
    map.set(S[j], j)
    max = Math.max(max, j - i + 1)
  }
  return max
}
```
<CodeTest style="margin-top: 20px;" mode="lengthOfLongestSubstring" />  

<vTalk />