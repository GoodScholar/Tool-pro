import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jquery from 'jquery'

import * as echarts from 'echarts'
import utils from './utils/util' // 通用方法库
// import UIPlugin from './plugins/UI-Plugin'
import CodeEditor from 'bin-code-editor'

import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './style/normalize.scss' // 样式初始化
import './utils/directive' // 引入自定义指令

// import scroll from 'vue-seamless-scroll'

Vue.prototype.$echarts = echarts
Vue.prototype.$ = jquery

Vue.config.productionTip = false

Vue.use(utils)
// Vue.use(UIPlugin)
Vue.use(CodeEditor)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
