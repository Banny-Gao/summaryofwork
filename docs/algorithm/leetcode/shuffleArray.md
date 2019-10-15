# 数组乱序


## 两种随机法
```javascript
shuffle0 = (str) => {
  return Array.from(str).sort(() => Math.random() - 0.5).join('')
}

shuffle1 = (str) => {
  const arr = str.split('')
  for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
  return arr.join('')
}
```

## LeetCode解
```javascript
export class Solution {
  constructor(nums) {
    this.nums = nums
  }
  reset() {
    return this.nums
  }
  shuffle() {
    const str = this.nums
    const arr = Array.isArray(str) ? [...str] : Array.from(str)
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr
  }
}
```
### shuffle0  

<ShuffleNumber />  

### shuffle1  

<LazySudoku />
