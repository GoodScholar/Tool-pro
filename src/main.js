import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './style/normalize.scss'
import './utils/dialog'

// import scroll from 'vue-seamless-scroll'

import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// Vue.use(scroll)

Vue.directive('drag', {
  // 1.指令绑定到元素上回立刻执行bind函数，只执行一次
  // 2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
  // 3.通过el.focus()是无法获取焦点的，因为只有插入DOM后才生效
  bind(el) {},
  // inserted表示一个元素，插入到DOM中会执行inserted函数，只触发一次
  inserted(el) {
    const oDiv = el
    let firstTime = ''
    let lastTime = ''
    el.onmousedown = (e) => {
      const disX = e.pageX - el.offsetLeft
      const disY = e.pageY - el.offsetTop
      // 给当前元素添加属性，用于元素状态的判断
      oDiv.setAttribute('ele-flag', false)
      oDiv.setAttribute('draging-flag', true)

      firstTime = new Date().getTime()
      document.onmousemove = (e) => {
        el.style.left = e.pageX - disX + 'px'
        el.style.top = e.pageY - disY + 'px'
      }
      document.onmouseup = (event) => {
        document.onmousemove = document.onmouseup = null
        lastTime = new Date().getTime()
        if (lastTime - firstTime > 200) {
          oDiv.setAttribute('ele-flag', true)
          event.stopPropagation()
        }
        setTimeout(() => {
          oDiv.setAttribute('draging-flag', false)
        }, 100)
      }
    }
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
