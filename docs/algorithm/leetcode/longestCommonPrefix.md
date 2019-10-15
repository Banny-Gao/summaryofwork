# 最长公共前缀

- 编写一个函数来查找字符串数组中的最长公共前缀。
- 如果不存在公共前缀，返回空字符串 ""。  
**示例1**  
```
输入: ["flower","flow","flight"]
输出: "fl" 
```  
**示例2**
```
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```  
* 说明: 所有输入只包含小写字母 a-z 
```javascript
export const longestCommonPrefix = (strs) => {
  let com = '', i = 0
  const str0 = strs[0]
  while (str0 && i < str0.length) {
    let same = true
    for(let j = 1; j < strs.length; j++) {
      if(strs[j][i] !== str0[i]) {
        same = false
        break;
      }
    }
    if(same) {
      com += str0[i]
      i++
    }else{
      break
    }
  }
  return com
}
```
<CodeTest style="margin-top: 20px;" mode="longestCommonPrefix" />