# 字符串相乘

- 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。  

**示例1**
```
输入: num1 = "2", num2 = "3"
输出: "6"
```
**示例2**
```
输入: num1 = "123", num2 = "456"
输出: "56088"
```

- num1 和 num2 的长度小于110。
- num1 和 num2 只包含数字 0-9。
- num1 和 num2 均不以零开头，除非是数字 0 本身。
- **不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。**

## 小学乘法
<img :src="`${$router.options.base}img/multiply.png`"/> 

```javascript
export const multiply = (num1, num2) => {
  if (+num1 === 0 || +num2 === 0) return '0'
  const len1 = num1.length,
    len2 = num2.length
  if (len1 > 110 || len2 > 110) return
  const arr1 = Array.from(num1).reverse(),
    arr2 = Array.from(num2).reverse(),
    arrSum = new Array(len1 + len2 - -1).fill(0)
  let m = 0;
  while (m < len2) {
    for (let n = 0; n < len1; n++) {
      let product = arr2[m] * arr1[n],
        index = m + n
      arrSum[index] += product % 10
      arrSum[index + 1] += ~~(product / 10)
      while (arrSum[index] >= 10) {
        const temp = arrSum[index]
        arrSum[index] = temp % 10
        arrSum[index + 1] += ~~(temp / 10)
        index++
      }
    }
    m++
  }
  return arrSum.reverse().join('').replace(/^0*(\d*)/, '$1')
}
```
<CodeTest style="margin-top: 20px;" mode="multiply" />  

<vTalk />