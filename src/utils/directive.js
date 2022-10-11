import Vue from 'vue'

// 拖动
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

// touch 事件
Vue.directive('touch', {
  // 滑动指令
  bind: function (el, binding, vnode) {
    // 传入参数滑动模式 press swipeRight swipeLeft swipeTop swipeDowm
    const touchType = binding.arg
    let timeOutEvent = 0
    let direction = ''
    // 滑动处理
    let startX = 0
    let startY = 0

    // 返回角度
    function GetSlideAngle(dx, dy) {
      return (Math.atan2(dy, dx) * 180) / Math.PI
    }

    // 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    function GetSlideDirection(startX, startY, endX, endY) {
      const dy = startY - endY
      const dx = endX - startX
      let result = 0

      // 判断滑动距离， 如果滑动距离太短
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result
      }
      // 判断滑动角度
      const angle = GetSlideAngle(dx, dy)
      if (angle >= -45 && angle < 45) {
        result = 'swipeRight'
      } else if (angle >= 45 && angle < 135) {
        result = 'swipeUp'
      } else if (angle >= -135 && angle < -45) {
        result = 'swipeDown'
      } else if (
        (angle >= 135 && angle <= 180) ||
        (angle >= -180 && angle < -135)
      ) {
        result = 'swipeLeft'
      }
      return result
    }
    // 监听开始
    el.addEventListener(
      'touchstart',
      function (ev) {
        startX = ev.touches[0].pageX
        startY = ev.touches[0].pageY

        // 判断长按操作
        timeOutEvent = setTimeout(() => {
          timeOutEvent = 0
          if (touchType === 'press') {
            binding.value()
          }
        }, 500)
      },
      false
    )

    // 监听移动
    el.addEventListener('touchmove', function (ev) {
      clearTimeout(timeOutEvent)
      timeOutEvent = 0
    })

    // 监听结束
    el.addEventListener(
      'touchend',
      function (ev) {
        const endX = ev.changedTouches[0].pageX
        const endY = ev.changedTouches[0].pageY
        direction = GetSlideDirection(startX, startY, endX, endY)

        clearTimeout(timeOutEvent)

        switch (direction) {
          case 0:
            break
          case 'swipeUp':
            if (touchType === 'swipeUp') {
              binding.value()
            }
            break
          case 'swipeDown':
            if (touchType === 'swipeDown') {
              binding.value()
            }
            break
          case 'swipeLeft':
            if (touchType === 'swipeLeft') {
              binding.value()
            }
            break
          case 'swipeRight':
            if (touchType === 'swipeRight') {
              binding.value()
            }
            break
          default:
        }
      },
      false
    )
  }
})

// 长按事件
Vue.directive('longpress', {
  bind: function (el, binding, vNode) {
    // 确保提供的表达式是函数
    if (typeof binding.value !== 'function') {
      // 获取组件名称
      const compName = vNode.context.name // 将警告传递给控制台
      let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `
      if (compName) {
        warn += `Found in component '${compName}' `
      }
      console.warn(warn)
    } // 定义变量

    let pressTimer = null // 定义函数处理程序

    // 创建计时器（ 1秒后执行函数 ）
    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }

      if (pressTimer === null) {
        pressTimer = setInterval(() => {
          // 执行函数
          handler()
        }, 1000)
      }
    }

    // 取消计时器
    const cancel = (e) => {
      // 检查计时器是否有值
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    // 运行函数
    const handler = (e) => {
      // 执行传递给指令的方法
      binding.value(e)
    }

    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  }
})

// v-dialogDrag: 弹窗拖拽属性
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    // dialogHeaderEl.style.cursor = 'move';
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      const screenWidth = document.body.clientWidth // body当前宽度
      const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)
      const dragDomWidth = dragDom.offsetWidth // 对话框宽度
      const dragDomHeight = dragDom.offsetHeight // 对话框高度
      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight
      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left')
      let styT = sty(dragDom, 'top')
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes('%')) {
        // eslint-disable-next-line no-useless-escape
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
        // eslint-disable-next-line no-useless-escape
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }
        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
      return false
    }
  }
})

/***
 * 防抖 单位时间只触发最后一次
 *  @param {?Number|300} time - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|"click"} event - 事件类型 例："click"
 *  @param {Array} binding.value - [fn,event,time]
 *  @date  2020-1-29
 *  @author aChuan
 *  例：<el-button v-debounce="[reset,`click`,300]">刷新</el-button>
 *  也可简写成：<el-button v-debounce="[reset]">刷新</el-button>
 */
Vue.directive('debounce', {
  inserted: function (el, binding) {
    const [fn, event = 'click', time = 300] = binding.value
    let timer = null
    el.addEventListener(event, () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => fn(), time)
    })
  }
})

/***
 *  节流 每单位时间可触发一次
 *  第一次瞬间触发，最后一次不管是否达到间隔时间依然触发
 * 【考虑到input的change事件】
 *  @param {?Number|300} time - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|"click"} event - 事件类型 例："click"
 *  @param {Array} binding.value - [fn,event,time]
 *  @date  2020-1-31
 *  @author aChuan
 *  例：<el-button v-throttle="[reset,`click`,300]">刷新</el-button>
 *  传递参数则：<el-button v-throttle="[()=>reset(param),`click`,300]">刷新</el-button>
 */
Vue.directive('throttle', {
  inserted: function (el, binding) {
    const [fn, event = 'click', time = 300] = binding.value
    let timer = null
    let timerEnd = null
    el.addEventListener(event, () => {
      if (timer) {
        clearTimeout(timerEnd)
        return (timerEnd = setTimeout(() => fn(), time))
      }
      fn()
      timer = setTimeout(() => (timer = null), time)
    })
  }
})
