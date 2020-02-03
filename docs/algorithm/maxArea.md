# 盛最多水的容器

- 给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
- 说明：你不能倾斜容器，且 n 的值至少为 2。  
**示例**
```
输入: [1,8,6,2,5,4,8,3,7]
输出: 49
```

<img  style="width: 60%;position: relative;left: 20%;" :src="`${$router.options.base}img/question_11.jpg`"/>  

```javascript
export const maxArea = (nums) => {
  let max = 0,
    l = 0,
    r = nums.length - 1
  while (l < r) {
    max = Math.max(max, Math.min(nums[l], nums[r]) * (r - l))
    if (nums[l] < nums[r]) {
      l++
    } else {
      r--
    }
  }
  return max
}
```
<CodeTest style="margin-top: 20px;" mode="maxArea" />  

<vTalk />