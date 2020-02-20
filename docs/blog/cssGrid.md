# CSS之Grid布局

Grid(网格)，是一个二维的基于网格的布局

<CssGrid />

## Browser Support

<BrowserTable chrome='57' ie='11*' edge='16' firefox='52' safari='10'/>

## 网格容器(Grid Container)

- **display: grid|inline-grid** 指定元素为块级网格或内联网格
- **grid-template-columns|grid-template-rows** 使用空格分隔列表定义容器的网格的行和列

**Syntax**

```css
grid-template-columns: < track-size > ... | < line-name > < track-size > ...;  
grid-template-rows: < track-size > ... | < line-name > < track-size > ...;
```
example:
```css
.container{
    display: grid;
    grid-template-columns: 40px 50px auto 50px 40px;
    grid-template-rows: 25% 100px auto;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/template-columns-rows-01.svg)

**使用< line-name >**: 

```css
grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
grid-template-rows: [row1-start] 25% [row1-end row2-start] 100px [third-line] auto [last-line];
```

![](https://css-tricks.com/wp-content/uploads/2018/11/template-column-rows-02.svg)

**使用repeat()**:

```css
grid-template-columns: repeat(3, 20px [col-start]);
/* grid-template-columns: 20px [col-start] 20px [col-start] 20px [col-start]; */
```

**使用fr**:

```css
.container {
  grid-template-columns: 1fr 50px 1fr 1fr;
}
```

- **grid-template-areas** 定义grid-area网格区域名称

> . 表示空的网格单元
> none 不定义网格单元

```css
.container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/dddgrid-template-areas.svg)

- **grid-template**  (grid-auto-columns, grid-auto-rows, 和 grid-template-areas)的简写
- **grid-column-gap / grid-row-gap**  指定网格线大小

```css
.container {
  grid-column-gap: <line-size>;
  grid-row-gap: <line-size>;
}
```

- **grid-gap** 指定网格线大小简写

```css
.container {
  grid-gap: 15px 10px;
}
```

<font color='red'>grid-gap将重命名为gap，Chrome 68+, Safari 11.2 Release 50+ and Opera 54+已支持</font>

![](https://css-tricks.com/wp-content/uploads/2018/11/dddgrid-gap.svg)

- **justify-items** 设置网格内容横轴对齐方式，适用于容器内的所有网格项(start | end | center | stretch)。
- **align-items** 设置网格内容竖轴对齐方式，适用于容器内的所有网格项(start | end | center | stretch)。
- **place-items** align-items 和 justify-items 的简写形式。

<font color='red'>grid-gap将重命名为gap，Chrome 68+, Safari 11.2 Release 50+ and Opera 54+已支持</font>

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-items-center.svg)
<font color='red'>place-items: center center</font>

- **justify-content** 当网格总大小小于容器，设置网格的横轴对齐方式，[start | end | center | stretch | space-around(网格项之间space相等，两边一半) | space-between | space-evenly(网格之间space均分)]
- **align-content** 当网格总大小小于容器，设置网格的竖轴对齐方式, [start | end | center | stretch | space-around | space-between | space-evenly]
- **place-content** justify-content和align-content缩写

![](https://css-tricks.com/wp-content/uploads/2018/11/justify-content-space-around.svg)
<font color='red'>justify-content: space-around</font>

![](https://css-tricks.com/wp-content/uploads/2018/11/align-content-center.svg)
<font color='red'>align-content: center</font>

- **grid-auto-columns / grid-auto-rows** 定义隐式网格轨道的大小。当网格中的网格项多于单元格时，或者当网格项位于显式网格之外时，就会创建隐式轨道。

定义如下Grid布局

```css
.container {
  grid-template-columns: 60px 60px;
  grid-template-rows: 90px 90px
}
.item-a {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.item-b {
  grid-column: 5 / 6;
  grid-row: 2 / 3;
}
```

![](https://www.html.cn/newimg88/2018/12/grid-auto-columns-rows-02.svg)

因为我们引用的网格线不存在，所以创建宽度为 0 的隐式网格轨道以填补空缺。
可以使用grid-auto-columns来定义网格轨道大小

```css
grid-auto-columns: 60px;
```

![](https://www.html.cn/newimg88/2018/12/grid-auto-columns-rows-03.svg)

- **grid-auto-flow** 自动放置未明确位置的网格项, **grid-auto-flow: row | column | row dense | column dense**
  
> row：告诉自动布局算法依次填充每行，根据需要添加新行 （默认） 
> column：告诉自动布局算法依次填入每列，根据需要添加新列 
> dense：告诉自动布局算法在稍后出现较小的网格项时，尝试填充网格中较早的空缺

example: 

```html
<section class="container">
  <div class="item-a">item-a</div>
  <div class="item-b">item-b</div>
  <div class="item-c">item-c</div>
  <div class="item-d">item-d</div>
  <div class="item-e">item-e</div>
</section>
```

```css
.container {
  display: grid;
  grid-template-columns: 60px 60px 60px 60px 60px;
  grid-template-rows: 30px 30px;
  grid-auto-flow: row;
}

.item-a {
  grid-column: 1;
  grid-row: 1 / 3;
}
.item-e {
  grid-column: 5;
  grid-row: 1 / 3;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/grid-auto-flow-01.svg)

### 特殊方法和关键字

- keywords: min-content, max-content, auto
- functions: minmax, repeat

<iframe
   src="https://codesandbox.io/embed/upbeat-raman-4sip3?fontsize=14&hidenavigation=1&theme=dark"
   style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
   title="upbeat-raman-4sip3"
   allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
   sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
 ></iframe>

### Animation

**grid-row-gap, grid-column-gap, grid-template-columns, grid-template-rows**等5个属性可应用于动画

## 网格项(Grid Items)

- **grid-column-start/grid-column-end/grid-row-start/grid-row-end** 通过引用特定网格线确定网格项在网格中的位置

**Syntax**

```css
grid-column-start: <number> | <name> | span <number> | span <name> | auto;
grid-column-end: <number> | <name> | span <number> | span <name> | auto;
grid-row-start: <number> | <name> | span <number> | span <name> | auto;
grid-row-end: <number> | <name> | span <number> | span <name> | auto;
```

example:

```css
.item-a {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start;
  grid-row-end: 3;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/grid-column-row-start-end-01.svg)

```css
.item-b {
  grid-column-start: 1;
  /* 该网格项将跨越到它与提供的名称位置 */
  grid-column-end: span col4-start; 
  grid-row-start: 2;
  /* 该网格项将跨越所提供的网格轨道数量 */
  grid-row-end: span 2;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/grid-column-row-start-end-02.svg)

- **grid-column/grid-row**  grid-column-start + grid-column-end, grid-row-start + grid-row-end的简写

```css
grid-column: 3 / span 2;
grid-row: third-line / 4;
```

![](https://css-tricks.com/wp-content/uploads/2018/11/grid-column-row.svg)

- **grid-area** 通过grid-template-area属性指定网格项名称，或者grid-row-start + grid-column-start + grid-row-end + grid-column-end的简写

```css
.item-d {
  /* grid-area: header; */
  grid-area: 1 / col4-start / last-line / 6;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/grid-area.svg)

- **justify-self** 设置网格项内容横轴对齐方式，[start | end | center | stretch]
- **align-self** 设置网格项内容竖轴对齐方式，[start | end | center | stretch]
- **place-self** justify-self + align-self 简写

```css
.item-a {
  place-self: center;
}
```

![](https://css-tricks.com/wp-content/uploads/2018/11/place-self-center.svg)

原文链接：[https://css-tricks.com/snippets/css/complete-guide-grid/](https://css-tricks.com/snippets/css/complete-guide-grid/)

<vTalk />