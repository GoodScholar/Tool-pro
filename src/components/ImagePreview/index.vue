<template>
  <el-image-viewer
    v-if="showPreview"
    :urlList="previewImages"
    :initialIndex="current"
    :on-close="closeViewer"
  ></el-image-viewer>
</template>
<script>
// 可自行去对应目录查看该组件
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'ImagePreview',
  data() {
    return {
      showPreview: false,
      previewImages: [],
      current: 0,
      dom: Element
    }
  },
  components: {
    ElImageViewer
  },
  watch: {
    showPreview(val) {
      if (val) {
        this.$nextTick(() => {
          document.body.setAttribute('style', 'overflow: hidden') // 去除滚动跳，禁止滚动
          this.dom = document.getElementsByClassName('el-image-viewer__mask')
          this.dom[0].addEventListener('click', this.closeViewer, false) // 监听遮罩点击事件，点击遮罩关闭预览
        })
      } else {
        document.body.removeAttribute('style')
        if (this.dom) {
          this.dom[0].removeEventListener('click', this.closeViewer)
        }
      }
    }
  },
  methods: {
    closeViewer() {
      this.showPreview = false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-image-viewer__btn.el-image-viewer__close {
  color: #fff;
}
</style>
