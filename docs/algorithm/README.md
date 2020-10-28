# 😡

<G2CloudWord private-path="algorithmWord"/>
<!-- <KnowledgeTree direction="H" type="mindmap" :collapsedLevel='2'/> -->

<MarkdownCard>

**动态规划**  

- 一般形式： 求最值
- 核心： 穷举
  - 特点： 存在 **「重叠子问题」**
  - 具备  **「最优子结构」**
  - 列出正确的  **「状态转移方程」**
- **明确 base case -> 明确「状态」-> 明确「选择」 -> 定义 dp 数组/函数的含义**

```
# 初始化 base case
dp[0][0][...] = base
# 进行状态转移
for 状态1 in 状态1的所有取值：
    for 状态2 in 状态2的所有取值：
        for ...
            dp[状态1][状态2][...] = 求最值(选择1，选择2...)
```

**KMP**

- 寻找前缀后缀最长公共元素长度
- 求next数组
- 根据next数组进行匹配

[KMP详解]((https://www.cnblogs.com/zhangtianq/p/5839909.html))
[解学武KMP](http://data.biancheng.net/view/180.html)

</MarkdownCard>
