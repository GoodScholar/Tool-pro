import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './style/normalize.scss'
import './utils/dialog'
// 引入自定义指令
import './utils/directive'

// import scroll from 'vue-seamless-scroll'

import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// Vue.use(scroll)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
