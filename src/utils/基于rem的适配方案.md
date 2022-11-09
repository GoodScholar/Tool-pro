### rem 是什么？

rem 是指相对于根元素的字体大小的单位，在日常开发过程中我们通常把根元素（html/body）的字体设置为 10px,方便于我们计算（此时子元素的 1rem 就相当于 10px）。

### 适用场景

不固定宽高比的 Web 应用，适用于绝大部分业务场景

### 项目实战

1. 安装依赖

```js
npm i postcss-pxtorem autoprefixer amfe-flexible --save-dev
复制代码
```

> postcss-pxtorem 是PostCSS的插件，用于将像素单元生成rem单位
>  autoprefixer 浏览器前缀处理插件
>  amfe-flexible 可伸缩布局方案 替代了原先的`lib-flexible` 选用了当前众多浏览器兼容的`viewport`

1. 项目根目录创建 `postcss.config.js` 文件 ![QQ图片20220927110819.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc6ec08fb25b44aeaa9254e725389169~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

```js
module.exports = {
	plugins: {
		autoprefixer: {
			overrideBrowserslist: [
				"Android 4.1",
				"iOS 7.1",
				"Chrome > 31",
				"ff > 31",
				"ie >= 8",
				"last 10 versions", // 所有主流浏览器最近10版本用
			],
			grid: true,
		},
		"postcss-pxtorem": {
			rootValue: 192, // 设计稿宽度的1/ 10 例如设计稿按照 1920设计 此处就为192
			propList: ["*", "!border"], // 除 border 外所有px 转 rem
			selectorBlackList: [".el-"], // 过滤掉.el-开头的class，不进行rem转换
		},
	},
};
复制代码
```

1. `main.ts/js` 文件中导入依赖

```js
import "amfe-flexible/index.js";
复制代码
```

1. 项目重启
