import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import utils from './utils/util' // 通用方法库
import './utils/directive' // 引入自定义指令

import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './style/normalize.scss'

// import scroll from 'vue-seamless-scroll'

import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(utils)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
