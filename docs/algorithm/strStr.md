# 实现 strStr() 函数。

- 给定一个 `haystack` 字符串和一个 `needle` 字符串，在 `haystack` 字符串中找出 `needle` 字符串出现的第一个位置 (从`0`开始)。如果不存在，则返回  `-1`。

**示例 1:**

```
输入: haystack = "hello", needle = "ll"
输出: 2
```

**说明:**

- 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
- 对于本题而言，当 needle 是空字符串时我们应当返回 0 。

## 双指针

```js
export const strStr = (haystack, needle) => {
  const hLen = haystack.length
  const nLen = needle.length
  if (!needle) return 0
  if (nLen > hLen) return -1

  let i = 0

  while (i + nLen - 1 < hLen) {
    if (haystack[i] === needle[0]) {
      let j = 1
      while (j < nLen && haystack[i + j] === needle[j]) j++
      if (j === nLen) return i
    }
    i++
  }

  return -1
}
```

## [KMP](https://www.cnblogs.com/zhangtianq/p/5839909.html)

```js
export const strStr_KMP = (haystack, needle) => {
  const hLen = haystack.length
  const nLen = needle.length

  if (!needle) return 0
  if (nLen > hLen) return -1

  const getNext = (p) => {
    const next = [-1]

    let k = -1
    let j = 0

    while (j < p.length - 1) {
      if (k === -1 || p[j] === p[k]) {
        j++
        k++
        if (p[j] !== p[k]) next[j] = k
        else next[j] = next[k]
      } else k = next[k]
    }

    return next
  }

  const next = getNext(needle)
  let i = 0
  let j = 0

  while (i < hLen && j < nLen) {
    if (j === -1 || haystack[i] === needle[j]) {
      i++
      j++
    } else j = next[j]
  }
  if (j === nLen) return i - j

  return -1
}
```

<CodeTest style="margin-top: 20px;" mode="strStr" />  
