# 颜色HEX透明度设置 免转换

```js
background-color: rgba($color: #000, $alpha: 0.05);
```



# flex布局 一行几列

```
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

```
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

```
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

```typescript
overflow: hidden;//溢出隐藏
white-space: nowrap;//禁止换行
text-overflow: ellipsis;//...
123
```

##### 2、多行文本省略：

```javascript
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

