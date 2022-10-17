import PreviewItem from './index.vue'
const Preview = {}
// IE8不兼容
Preview.install = function (Vue) {
  const PreviewConstructor = Vue.extend(PreviewItem)
  const instance = new PreviewConstructor()

  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  // 挂载在原型上
  Vue.prototype.$previewImgs = ({ urlList = [], index = 0 }) => {
    instance.showPreview = true
    instance.previewImages = urlList
    instance.current = index
  }
}

export default Preview
