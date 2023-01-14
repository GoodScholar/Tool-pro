<template>
  <div
    class="ScaleBox"
    ref="ScaleBox"
    :style="{
      width: width + 'px',
      height: height + 'px'
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ScaleBox',
  props: {},
  data() {
    return {
      scale: 0,
      width: 1920,
      height: 1080
    }
  },
  mounted() {
    this.calculateCssZoom()
    window.addEventListener('resize', this.calculateCssZoom())
  },
  methods: {
    calculateCssZoom() {
      const domHeight =
        document.documentElement.clientHeight || document.body.clientHeight // 实际浏览器视口的高度
      const domWidth =
        document.documentElement.clientWidth || document.body.clientWidth // 实际浏览器视口的宽度

      const designWidth = 1920 // 设计稿的宽度
      const designHeight = 1080 // 设计稿的高度

      const zoomValue = domHeight / designHeight // 高度计算出来的zoom值
      const zoomValueWidth = domWidth / designWidth // 宽度计算出来的zoom值
      return zoomValueWidth > zoomValue ? zoomValue : zoomValueWidth // 比较大小选择最终实际需要的zoom值
      // 拿到最终的zoom值之后，可以选择直接应用到body标签身上，或者将zoom值储存在store里面，分发到需要被适配的组件里面使用，笔者这里采用的是储存store向下分发的方案。（根据实际情况选择）
    },
    setScale() {
      // 获取到缩放比例，设置它
      console.log(this.calculateCssZoom())
      this.scale = this.calculateCssZoom()
      if (this.$refs.ScaleBox) {
        this.$refs.ScaleBox.style.setProperty('--scale', this.scale)
      }
    }
  }
}
</script>

<style lang="scss">
#ScaleBox {
  --scale: 1;
}
.ScaleBox {
  position: absolute;
  // transform: scale(var(--scale)) translate(-50%, -50%);
  zoom: var(--scale);
  display: flex;
  flex-direction: column;
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  z-index: 999;
  // background: rgba(255, 0, 0, 0.3);
}
</style>
