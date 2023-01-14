> 今天又重启了一个项目是VUE3的，就搭配了vite，在使用vue-cli创建项目时，会有ESLINT选择的，会自动给配置好，vite创建项目很简单，没有ESLINT的配置，要手动配置。跟着步骤来即可，很简单

##### 1、使用vite创建一个项目

```shell
npm create vite@latest
> Project name: 项目名称
> Select a framework: 选择框架 选择vuejs
> Select a variant：选择vue

Done. Now run:
  cd 项目名称
  npm install
  npm run dev
```

##### 2、安装EsLint

```shell
 npm i -D eslint
```

##### 3、初始化配置EsLint

```shell
npx eslint --init
```

1. 选择模式： To check syntax, find problems, and enforce code style 严格模式

```shell
You can also run this command directly using 'npm init @eslint/config'.
? How would you like to use ESLint? ... 
  To check syntax only
  To check syntax and find problems
> To check syntax, find problems, and enforce code style
```

1. 选择语言模块：选择javascript

```shell
? What type of modules does your project use? ...
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
```

1. 选择语言框架 选择vue.js

```shell
? Which framework does your project use? ...
  React
> Vue.js
  None of these
```

1. 是否使用ts，视自己情况而定，我这里不用 选择的No

```shell
 ? Does your project use TypeScript? » No / Yes
```

1. 代码在哪里运行 使用空格键全选 浏览器+node

```shell
? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser
√ Node
```

1. 选择一个风格：选择流行的即可

```shell
? How would you like to define a style for your project? ...
> Use a popular style guide
  Answer questions about your style
```

1. 你想遵循哪一种风格指南? 选择 Standard 我一直用的这个社区指南，感觉很好。认可度也高

```shell
? Which style guide do you want to follow? ...
  Airbnb: https://github.com/airbnb/javascript
> Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo
```

1. 您希望您的配置文件是什么格式? 选择js即可

```shell
? What format do you want your config file to be in? ...
> JavaScript
  YAML
  JSON
```

1. 可能会出现下面的提示，选择yes即可

```shell
? The style guide "standard" requires eslint@^7.12.1. You are currently using eslint@8.10.0.
  Do you want to downgrade? » No / Yes
```

1. 会问你是用npm安装还是yarn安装，视自己情况而定，我这里选择的npm(yes)

```shell
? Would you like to install them now with npm? » No / Yes
```

##### 4. 安装完成后，在项目根目录会出现.eslintrc.js文件

```javascript
// .eslintrc.js 文件
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
  }
}
```

##### 5. 继续安装vite-plugin-eslint

```shell
 npm i -D vite-plugin-eslint
```

##### 6. 在package.json文件中添加： "@babel/eslint-parser"

```json
npm i -D @babel/eslint-parser
// package.json 文件
"devDependencies": {
    ...
    "@babel/eslint-parser": "^7.17.0"
  }
```

##### 7. 配置vite.config.js文件

```javascript
// vite.config.js 文件
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    vue(),
    // 添加下面这块
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ]
}
```

##### 8. 配置.eslintrc.js文件

```javascript
// .eslintrc.js 文件
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
        postMessage: true,
  },
  extends: [
    'standard',
    // 新增这里vue3支持
    'plugin:vue/vue3-recommended'
  ],
  // 这是初始生成的 将其中的内容更改为下面的
  // parserOptions: {
  //   ecmaVersion: 'latest',
  //   sourceType: 'module'
  // },

  // 新的内容
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser'
  },
  plugins: [
    'vue'
  ],
  rules: {
     'space-before-function-paren': 'off',
     indent: 0,
     'comma-dangle': 'off',
    // 其它的规则可以去eslint查看，根据自己需要进行添加
  }
}
```

> 按着步骤操作就可以把eslint配置完成，vscode与webstorm的eslint支持很好设置，如果没设置过的可以去搜一下，文章很多，就不在这里多说了。

##### 9、eslint在package.json的配置

```json
"scripts": {
   "lint": "eslint --ext js src/"
},
```

##### 10.配置.eslintignore

```js
# eslint 忽略检查 (根据项目需要自行添加)
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
.eslintrc.js
prettier.config.js
```

##### 11.配置.prettierrc.cjs

**1、**首先在vscode中下载插件Prettier - Code formatter，并在vscode，首选项-->设置-->配置文件，

**2、**配置Prettier相关设置

```json
// 保存时格式化
"editor.formatOnSave": true,

// prettier 配置信息
"prettier.printWidth": 100, // 超过最大值换行
"prettier.tabWidth": 4, // 缩进字节数
"prettier.useTabs": false, // 缩进不使用tab，使用空格
"prettier.semi": false, // 句尾添加分号
"prettier.singleQuote": true, // 使用单引号代替双引号
"prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
"prettier.arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
"prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
// "prettier.disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
"prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
"prettier.eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
"prettier.htmlWhitespaceSensitivity": "ignore",
"prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
"prettier.bracketSameLine": false, // 在jsx中把'>' 是否单独放一行
"prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
"prettier.parser": "babylon", // 格式化的解析器，默认是babylon
"prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
"prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
"prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
"prettier.tslintIntegration": false,
```

##### 12、配置.prettierignore

```
# 忽略格式化文件 (根据项目需要自行添加)
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

##### 13、.husky配置和使用

在前端工程化时husky可以说是一个必不可少的工具。husky可以让我们向项目中方便添加git hooks。通常情况下我只需要如下两步就可在项目中引入并设置好husky：

1、将husky添加到项目的开发依赖中

```shell
npx i husky -D
```

2、在husky中设置我们需要的git hooks

在提交代码到仓库时，首先会执行npm run lint 检查代码是否符合规划，没有错误存在，才会将代码提交到仓库中。

```shell
npx husky add .husky/pre-commit "npm run lint"
```

