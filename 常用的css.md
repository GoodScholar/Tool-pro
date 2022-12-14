# 颜色HEX透明度设置 免转换

```css
background-color: rgba($color: #000, $alpha: 0.05);
```

# flex布局 一行几列

```html
-- html
<ul class="card_wrap">
	 <li class="c_item"></li>
     <li class="c_item"></li>
     <li class="c_item"></li>
     <li class="c_item"></li>
     <li class="c_item"></li>
     <li class="c_item"></li>
     <li class="c_item"></li>
     <li class="c_item"></li>
</ul>
```

```css
---css
.card_wrap { // 大盒子
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.c_item { // 每个item
    height: 120px;
    margin: 0 5px 5px 0; 
    background-color: #999;
    min-width: calc((100% - 10px) / 3); 
    max-width: calc((100% - 10px) / 3); 
    &:nth-child(3n) {
      margin-right: 0;
    }
 }
```

# 三角形

```css
上
.kailong{
	width:0;
        height:0;
	border-right:50px solid transparent;
	border-left:50px solid transparent;
	border-bottom:50px solid red;
}
下
.kailong{
	width:0;
	height:0;
	border-right:50px solid transparent;
	border-left:50px solid transparent;
	border-top:50px solid red;
}
左
.kailong{
    width:0;
    height:0;
    border-top:50px solid transparent;
    border-bottom:50px solid transparent;
    border-right:50px solid red;
}
右
.kailong{
    width:0;
    height:0;
    border-top:50px solid transparent;
    border-bottom:50px solid transparent;
    border-left:50px solid red;
}
```

# 省略号

##### 1、单行文本省略：

```css
overflow: hidden;//溢出隐藏
white-space: nowrap;//禁止换行
text-overflow: ellipsis;//...
123
```

##### 2、多行文本省略：

```css
display: -webkit-box;//谷歌
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;//显示几行
overflow: hidden;
1234
```

**注：**

```
英文自动换行：
	word-wrap:break-word;
	word-break:break-all;
```

# 多行文本下的文字渐隐消失术

使用 `mask`，可以轻松实现这样的效果

```HTML
<p>Lorem ipsum dolor sit amet consectetur.</p>

p {
    mask: linear-gradient(90deg, #fff, transparent);
}
```

# 渐变(方向)
```css
background: linear-gradient(to right, rgba(255, 255, 255,0),#3FB6F7,rgba(255,255,255,0));

//渐变(角度)
background: linear-gradient(88deg, #4DF7BF 0%, rgba(77, 247, 191, 0.26) 12%, rgba(77,247, 191, 0) 100%);


```

# 文字渐变

```css
.title {
	position: relative;
	color: #ec428c;
	&::after {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		color: #32d1d3;
		-webkit-mask: linear-gradient(to bottom, transparent, #000);
		white-space: nowrap;
	}
}
```

### 边框渐变

```css
.border-grident{
  margin-top: 20px;
  width: 200px;
  height: 200px;
  border: 4px solid;
  border-image: linear-gradient(to right, #8f41e9, #578aef) 4;
}
```



# eCharts 雷达图

```js
// Schema:
// date,AQIindex,PM2.5,PM10,CO,NO2,SO2
const dataBJ = [[234, 185, 230, 4.09, 123, 69, 27]];

const lineStyle = {
  width: 1,
  opacity: 0.5
};
option = {
  backgroundColor: '#161627',
  title: {
    text: 'AQI - Radar',
    left: 'center',
    textStyle: {
      color: '#eee'
    }
  },
  // legend: {
  //   bottom: 5,
  //   data: ['Beijing', 'Shanghai', 'Guangzhou'],
  //   itemGap: 20,
  //   textStyle: {
  //     color: '#fff',
  //     fontSize: 14
  //   },
  //   selectedMode: 'single'
  // },
  radar: {
    indicator: [
      { name: 'AQI', max: 300 },
      { name: 'PM2.5', max: 250 },
      { name: 'PM10', max: 300 },
      { name: 'CO', max: 5 },
      { name: 'NO2', max: 200 }
    ],
    splitNumber: 3,
    axisName: {
      color: '#A2B4F3'
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    splitArea: {
      areaStyle: {
        color: [
          'rgba(88,122,255,0.36)',
          'rgba(88,122,255,0.27)',
          'rgba(88,122,255,0.18)'
        ]
      }
    }
  },
  series: [
    {
      name: 'Beijing',
      type: 'radar',
      lineStyle: lineStyle,
      data: dataBJ,
      symbol: 'none',
      itemStyle: {
        color: '#5f71f4'
      },
      areaStyle: {
        opacity: 0.6
      }
    }
  ]
};

```

# elementui样式修改的几种方式:**

笔者目前技术栈是`vue`，在修改`elementui`的样式真的是苦不堪言，`style`使用`css`的预处理器(`less`, `sass`, `scss`)的写法如下

```css
// 第一种/deep/
/deep/ .test {
 ***
}

// 第二种::v-deep
::v-deep .test{
 ***
}
复制代码
```

在一个有时候会遇到修改`elementui`中`table`的全部样式，下面就来`一一对应`的去修改下的：

① 修改**表格头部**背景:

```css
::v-deep .el-table th{
    background: orange;
  }
复制代码
```

② 修改**表格行**背景:

```css
::v-deep .el-table tr{
   background: #eee;
  }
复制代码
```

③ 修改**斑马线表格**的背景：

```css
::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #ccc;
  }
复制代码
```

④ 修改**行内线**的颜色：

```css
::v-deep .el-table td,.building-top .el-table th.is-leaf {
    border-bottom:  2px solid #eee;
  }
复制代码
```

⑤ 修改**表格最底部边框**颜色和高度：

```css
::v-deep .el-table::before{
   border-bottom:  1px solid #ccc;
    height: 3px
  }
复制代码
```

⑥ 修改**表头字体**颜色：

```css
::v-deep .el-table thead {
    color: #ccc;
    font-weight: 700;
  }
复制代码
```

⑦ 修改**表格内容**字体颜色和字体大小：

```css
::v-deep .el-table{
    color: #6B91CE;
    font-size: 14px;
  }
复制代码
```

⑧ 修改**表格无数据的时候**背景，字体颜色

```css
::v-deep .el-table__empty-block{
    background: #ccc;
  }
::v-deep .el-table__empty-text{
  color: #fff
}
复制代码
```

⑨ 修改**表格鼠标悬浮**`hover`背景色

```css
::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: pink;
}
```



