# 1. 起步

## 1.1 组件间通信基本原则

1. 不要在子组件中直接修改父组件的状态数据
2. 数据在哪, 更新数据的行为(函数)就应该定义在哪

## 1.2 vue 组件间通信方式

1. props
2. 自定义事件
3. 消息订阅与发布
4. 全局事件总线
5. slot
6. vuex【后面再说】

# 2. props  父 —> 子

比较常用，用于**父组件**向**子组件**中传递数据用

## 2.1 使用组件标签时

当标签属性传递进去

```html
<my-component name='yk' :age='3' :set-name='setName'></my-component>
复制代码
```

## 2.2 定义MyComponent 时

1. 在组件内声明所有的`props`
2. 方式一: 只指定名称

```javascript
props: ['name', 'age', 'setName']
复制代码
```

1. 方式二: 指定名称和类型

```javascript
props: {
    name: String,
    age: Number,
    setNmae: Function
}
复制代码
```

1. 方式三【完整版】: 指定名称/类型/必要性/默认值

```javascript
props: {
    name: {type: String, required: true, default:xxx},
}
复制代码
```

## 2.3 注意

- 此方式用于父组件向子组件传递数据
- 所有标签属性都会成为组件对象的属性, 模板页面可以直接引用
- 问题:
  1. 如果需要向非子后代传递数据必须多层逐层传递
  2. 兄弟组件间也不能直接props 通信, 必须借助父组件才可以

# 3. 自定义事件  `$emit`  子 —> 父

## 3.1 绑定事件监听

```javascript
// 方式一: 通过v-on 绑定
@delete_todo="deleteTodo"

// 方式二: 通过$on()
this.$refs.xxx.$on('delete_todo', function (todo) {
    this.deleteTodo(todo)
})
复制代码
```

## 3.2 触发事件

```javascript
// 触发事件(只能在父组件中接收)
this.$emit(eventName, data)
复制代码
```

## 3.3 示例

之前都是这样绑定事件监听 父组件传递给子组件

```html
 <TodoHeader :addTodo="addTodo" /> 
复制代码
```

变成

```html
  <TodoHeader @addTodo="addTodo" />
复制代码
```

或者这样

```html
<TodoHeader ref="header" />
复制代码
mounted(){// 异步执行代码
    // 绑定addTodo事件监听
    // this.$on('addTodo', this.addTodo) // 给App绑定监听，不对的
    this.$refs.header.$on('addTodo', this.addTodo)
}
复制代码
```

子组件触发事件

```javascript
this.addTodo(todo); // demo2中的代码
复制代码
```

变成

```javascript
this.$emit('addTodo', todo)
复制代码
```

## 3.4 注意

1. 此方式只用于子组件向父组件发送消息(数据)
2. 问题: 隔代组件或兄弟组件间通信此种方式不合适

## 3.5 总结

1. 适用于：**子组件 ===> 父组件**
2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）。
3. 绑定自定义事件：
   1. 第一种方式，在父组件中：`<Demo @yk="test"/>`或 `<Demo v-on:yk="test"/>`
   2. 第二种方式，在父组件中：

```js
<Demo ref="demo"/>
......
mounted(){
   this.$refs.xxx.$on('yk',this.test)
}
复制代码
```

1. 若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。
2. 触发自定义事件：`this.$emit('yk',数据)`
3. 解绑自定义事件`this.$off('yk')`
4. 组件上也可以绑定原生DOM事件，需要使用`native`修饰符。
5. 注意：通过`this.$refs.xxx.$on('yk',回调)`绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题！

# 4. EventBus事件总线 `.$emit` `.$on`

定义一个event-bus.js

```javascript
import Vue from 'vue'
const eventBus = new Vue()
export default eventBus
复制代码
```

在需要用到的组件中导入

```javascript
import eventBus from './event-bus'
复制代码
```

在事件中派发到eventBus中并携带数据

```javascript
eventBus.$emit('addItem', this.title)
复制代码
```

在需要用到数据的组件中接收数据

```javascript
mounted() {
  eventBus.$on('addItem', this.handleAddTitle)
}
复制代码
```

使用数据

```javascript
methods: {
    handleAddTitle(title){
        console.log(title)
    }
}
复制代码
```

解绑事件监听

```javascript
beforeDestroy(){
    eventBus.$off('addItem', this.handleAddTitle)
}
复制代码
```

# 5. 消息订阅与发布(PubSubJS 库)

## 5.1 订阅消息

```javascript
PubSub.subscribe('msg', function(msg, data){})
复制代码
```

## 5.2 发布消息

```javascript
PubSub.publish('msg', data)
复制代码
```

## 5.3 示例

订阅消息（绑定事件监听）

```javascript
import PubSub from 'pubsub-js'

export default {
    mounted () {
        // 订阅消息(deleteTodo)
        PubSub.subscribe('deleteTodo', (msg, index) => {
            this.deleteTodo(index)
        })
    }
}
复制代码
```

发布消息（触发事件）

```javascript
// this.deleteTodo(this.index)
// 发布消息(deleteTodo)
PubSub.publish('deleteTodo', this.index)
复制代码
```

## 5.4 注意

1. 优点: 此方式可实现任意关系组件间通信(数据)

## 5.5 事件的2 个重要操作

1. 绑定事件监听(订阅消息) 目标: 标签元素`<button>` 事件名(类型): `click/focus` 回调函数: `function(event){}`
2. 触发事件(发布消息) DOM 事件: 用户在浏览器上对应的界面上做对应的操作 自定义: 编码手动触发

## 5.6 总结

1. 一种组件间通信的方式，适用于任意组件间通信。
2. 使用步骤：
   1. 安装pubsub：`npm i pubsub-js`
   2. 引入: `import pubsub from 'pubsub-js'`
   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。

```js
methods(){
  demo(data){......}
}
......
mounted() {
  this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
}
复制代码
```

1. 提供数据：`pubsub.publish('xxx',数据)`
2. 最好在beforeDestroy钩子中，用`PubSub.unsubscribe(pid)`去取消订阅。

```html
<template>
    <div class="school">
        <h2>学校名称：{{name}}</h2>
        <h2>学校地址：{{address}}</h2>
    </div>
</template>

<script>
    import pubsub from 'pubsub-js'
    export default {
        name:'School',
        data() {
            return {
                name:'尚硅谷',
                address:'北京',
            }
        },
        mounted() {
            // console.log('School',this)
            /* this.$bus.$on('hello',(data)=>{
                console.log('我是School组件，收到了数据',data)
            }) */
            this.pubId = pubsub.subscribe('hello',(msgName,data)=>{
                console.log(this)
                // console.log('有人发布了hello消息，hello消息的回调执行了',msgName,data)
            })
        },
        beforeDestroy() {
            // this.$bus.$off('hello')
            pubsub.unsubscribe(this.pubId)
        },
    }
</script>

<style scoped>
    .school{
        background-color: skyblue;
        padding: 5px;
    }
</style>
复制代码
<template>
    <div class="student">
        <h2>学生姓名：{{name}}</h2>
        <h2>学生性别：{{sex}}</h2>
        <button @click="sendStudentName">把学生名给School组件</button>
    </div>
</template>

<script>
    import pubsub from 'pubsub-js'
    export default {
        name:'Student',
        data() {
            return {
                name:'张三',
                sex:'男',
            }
        },
        mounted() {
            // console.log('Student',this.x)
        },
        methods: {
            sendStudentName(){
                // this.$bus.$emit('hello',this.name)
                pubsub.publish('hello',666)
            }
        },
    }
</script>

<style lang="less" scoped>
    .student{
        background-color: pink;
        padding: 5px;
        margin-top: 30px;
    }
</style>

复制代码
```

# 6. 组件间通信4: slot

## 6.1 理解

此方式用于父组件向子组件传递`标签数据`

## 6.2 子组件: Child.vue

```html
<template>
    <div>
        <slot name="xxx">不确定的标签结构1</slot>
        <div>组件确定的标签结构</div>
        <slot name="yyy">不确定的标签结构2</slot>
    </div>
</template>
```

## 6.3 父组件: Parent.vue

```html
<child>
    <div slot="xxx">xxx 对应的标签结构</div>
    <div slot="yyy">yyyy 对应的标签结构</div>
</child>
```

回顾一下插槽的知识

### 匿名`slot`

子组件内部定义一个占位符，父组件使用时可以向组件标签中插入任何内容替换子组件slot中的内容

### 具名`slot`

给slot元素指定一个name后，可以分发多个内容

例子 子组件模板定义

```html
<template>
  <div class="container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

父组件使用

```html
<child-component>
  <h2 slot="header">标题</h2>
  <p>内容</p>
  <p>更多</p>
  <div slot="footer">底部</div>
</child-component>
```

最后相当于

```html
<div class="container">
  <div class="header">
    <h2>标题</h2>
  </div>
  <div class="main">
    <p>内容</p>
  	<p>更多</p>
  </div>
  <div class="footer">
    <div>底部</div>
  </div>
</div>
```

这里的`slot`已经废弃了，用`v-slot`替代 必须由`template`标签包裹，且`v-slot`可以简写成`#`

```html
<child-component>
  <template v-slot:header>
    <h2>标题</h2>
  </template>
  <p>内容</p>
  <p>更多</p>
  <template #footer>
    <div slot="footer">底部</div>
  </template>
</child-component>
```

### 作用域插槽

子组件的数据通过标签传给父组件

```javascript
<template>
  <h1>
    <slot :user="user">
      {{ user.name }}
    </slot>
  </h1>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'YK',
        age: 18
      }
    }
  }
}
</script>
```

父组件接收数据并使用

```javascript
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.age }}
  </template>
</current-user>
```

对象结构赋值更简洁

```javascript
<current-user>
  <template v-slot:default="{ user }">
    {{ user.age }}
  </template>
</current-user>
```
