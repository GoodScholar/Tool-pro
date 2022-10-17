/* eslint-disable no-throw-literal */
import Vue from 'vue'

/**
 * 测试传参
 */
Vue.directive('zoom', {
  bind: function (el, binding, vnode) {
    // console.log(binding)
  },
  update: function (el) {},
  unbind: function (el) {}
})

/**
 * 拖动 指令
 */
Vue.directive('drag', {
  inserted: function (el) {
    el.style.cursor = 'move'
    el.onmousedown = function (e) {
      const disx = e.pageX - el.offsetLeft
      const disy = e.pageY - el.offsetTop
      document.onmousemove = function (e) {
        let x = e.pageX - disx
        let y = e.pageY - disy
        const maxX =
          document.body.clientWidth -
          parseInt(window.getComputedStyle(el).width)
        const maxY =
          document.body.clientHeight -
          parseInt(window.getComputedStyle(el).height)
        if (x < 0) {
          x = 0
        } else if (x > maxX) {
          x = maxX
        }

        if (y < 0) {
          y = 0
        } else if (y > maxY) {
          y = maxY
        }

        el.style.left = x + 'px'
        el.style.top = y + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  }
})

/**
 * touch 指令
 */
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

/**
 * v-dialogDrag: 弹窗拖拽属性
 */
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
 */
Vue.directive('debounce', {
  inserted: function (el, binding) {
    const time = binding.arg ? binding.arg * 1000 : 1000
    let timer = null
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, time)
    })
  }
})

/***
 *  节流 每单位时间可触发一次
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

/**
 * 长按 指令
 */
Vue.directive('longpress', {
  bind: function (el, binding, vNode) {
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function'
    }
    // 定时器时间
    const time = binding.arg ? binding.arg * 1000 : 1000
    // 定义变量
    let pressTimer = null
    // 创建计时器（ 2秒后执行函数 ）
    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler()
        }, time)
      }
    }
    // 取消计时器
    const cancel = (e) => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    // 运行函数
    const handler = (e) => {
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
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
})

/**
 * 复制 指令
 */
Vue.directive('copy', {
  bind(el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        console.log('无复制内容')
        return
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        console.log('复制成功') // 可根据项目UI仔细设计
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
})

/**
 * 水印指令
 */
Vue.directive('waterMarker', {
  bind: function (el, binding) {
    addWaterMarker(
      binding.value.text,
      el,
      binding.value.font,
      binding.value.textColor
    )
  }
})

// 使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
function addWaterMarker(str, parentNode, font, textColor) {
  // 水印文字，父元素，字体，文字颜色
  const can = document.createElement('canvas')
  parentNode.appendChild(can)
  can.width = 200
  can.height = 150
  can.style.display = 'none'
  const cans = can.getContext('2d')
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = font || '16px Microsoft JhengHei'
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(str, can.width / 10, can.height / 2)
  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}

// 实现文字溢出显示，鼠标移入浮层展示全部 指令
Vue.directive('showTips', {
  inserted(el, binding) {
    // console.log(width, height, bgc,color,fontSize)
    let widths = 400
    let heights = 400
    let backgrounds = 'rgba(0, 0, 0, 0.5)'
    let colors = '#fff'
    let fontSizes = 12

    if (binding.arg) {
      const { width, height, bgc, color, fontSize } = binding.arg

      widths = width
      heights = height
      backgrounds = bgc
      colors = color
      fontSizes = fontSize
    }

    const curStyle = window.getComputedStyle(el, '') // 获取当前元素的style
    const textSpan = document.createElement('span') // 创建一个容器来记录文字的width
    // 设置新容器的字体样式，确保与当前需要隐藏的样式相同
    textSpan.style.fontSize = curStyle.fontSize
    textSpan.style.fontWeight = curStyle.fontWeight
    textSpan.style.fontFamily = curStyle.fontFamily
    // 将容器插入body，如果不插入，offsetWidth为0
    document.body.appendChild(textSpan)
    // 设置新容器的文字
    textSpan.innerHTML = el.innerText
    // 如果字体元素大于当前元素，则需要隐藏
    if (textSpan.offsetWidth > el.offsetWidth) {
      // 给当前元素设置超出隐藏
      el.style.overflow = 'hidden'
      el.style.textOverflow = 'ellipsis'
      el.style.whiteSpace = 'nowrap'
      // 鼠标移入
      el.onmouseenter = function (e) {
        // 创建浮层元素并设置样式
        const vcTooltipDom = document.createElement('div')
        // overflow: auto;
        vcTooltipDom.style.cssText = `
            display: inline-block;
            position: absolute;
            top: ${e.clientY + 9}px;
            left: ${e.clientX}px;
            max-width: ${widths}px;
            max-height:${heights}px;
            background: ${backgrounds};
            color: ${colors};
            font-size: ${fontSizes}px;
            padding: 10px;
            border-radius: 6px;
            word-wrap: break-word;
            z-index: 9999
          `
        // 设置id方便寻找
        vcTooltipDom.setAttribute('id', 'vc-tooltip')
        // 将浮层插入到body中
        document.body.appendChild(vcTooltipDom)
        // 浮层中的文字
        document.getElementById('vc-tooltip').innerHTML = el.innerText
      }
      // 鼠标移出
      el.onmouseleave = function () {
        // 找到浮层元素并移出
        const vcTooltipDom = document.getElementById('vc-tooltip')
        vcTooltipDom && document.body.removeChild(vcTooltipDom)
      }
    }
    // 记得移除刚刚创建的记录文字的容器
    document.body.removeChild(textSpan)
  },
  // 指令与元素解绑时
  unbind() {
    // 找到浮层元素并移除
    const vcTooltipDom = document.getElementById('vc-tooltip')
    vcTooltipDom && document.body.removeChild(vcTooltipDom)
  }
})

// 表格无限滚动
Vue.directive('tableInfiniteScroll', {
  inserted(el, binding) {
    let tbody = el.querySelector('.el-table__body-wrapper')
    el.tableInfiniteScrollFn = function () {
      if (
        this.scrollHeight - this.scrollTop - parseInt(this.style.height) ===
        0
      ) {
        binding.value()
      }
    }
    tbody.addEventListener('scroll', el.tableInfiniteScrollFn)
    tbody = undefined
  },
  unbind(el, binding) {
    const tbody = el.querySelector('.el-table__body-wrapper')
    tbody.removeEventListener('scroll', el.tableInfiniteScrollFn)
    el.tableInfiniteScrollFn = undefined
  }
})

// 定义全局指令
Vue.directive('loadMore', {
  // bind只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
  bind(el, binding) {
    // 获取element-ui定义好的scroll盒子  Select 选择器的下拉盒子
    const SELECTWRAP_DOM = el.querySelector(
      '.el-select-dropdown .el-select-dropdown__wrap'
    )
    SELECTWRAP_DOM.addEventListener('scroll', function () {
      // 判断滚动到底部
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (CONDITION) {
        // binding.value 是指令的绑定值，该值可能是字符串，数字、函数
        // binding.value() 表示执行 v-loadmore 绑定的函数
        binding.value()
      }
    })
  }
})

Vue.directive('init-scroll', {
  inserted(el, binding) {
    const tbody = el.querySelector('.el-table__body-wrapper')
    const timer = null
    tbody.onmouseenter = (e) => {
      // 清除定时器
      clearInterval(timer)
    }
    // 鼠标移出
    tbody.onmouseleave = () => {
      // 清除定时器
      clearInterval(timer)
    }

    // this.timer = setInterval(() => {
    //   if (wrapper.clientHeight + top > wrapper.scrollHeight) {
    //     top = wrapper.scrollTop = 0
    //   } else {
    //     this.scrollTop = top += scrollTop
    //     wrapper.scrollTo({
    //       top,
    //       behavior: 'smooth'
    //     })
    //   }
    // }, speed)
  },
  // 指令与元素解绑时
  unbind() {}
})
