import Message from './message/index.vue'

export default {
  install(Vue, options) {
    // 消息提示框
    Vue.prototype.$message = function (opts) {
      // 继承Message组件
      const MessageConstructor = Vue.extend(Message)
      // 创建一个新元素
      const messageWrap = document.createElement('div')
      messageWrap.className = 'message-wrap'
      // 实例化Message组件，并将组件挂在到新创建的messageWrap元素上
      const messageInstance = new MessageConstructor({
        el: messageWrap
      })
      // 或者使用 messageInstance.$mount(messageWrap)挂载
      document.body.appendChild(messageInstance.$el)
      // 显示组件内容
      if (opts && opts.text) {
        messageInstance.text = opts.text
      }
      messageInstance.show = true
    }
  }
}
