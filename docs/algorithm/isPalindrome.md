# 回文数

- 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

**示例1** 
```
输入: 121
输出: true
```

## 数学方法

```js
export const isPalindrome = x => {
  const n = x
    if (x < 0) return false
    
    let result = 0
    while(x != 0) {
        result = result * 10 + x % 10
        x = ~~(x / 10)
    }
    
    return result === n
}
```

<CodeTest style="margin-top: 20px;" mode="isPalindrome" />  

<vTalk />