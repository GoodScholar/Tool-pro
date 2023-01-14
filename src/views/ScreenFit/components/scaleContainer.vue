Skip to content Search or jump to… Pull requests Issues Codespaces Marketplace
Explore @GoodScholar mingchen3398 / large-screen-for-vue Public Code Issues Pull
requests Discussions Actions Projects Wiki Security Insights
large-screen-for-vue/package/src/scale.vue cmc package
添加repository;readme添加描述 Latest commit 3fa19be on Sep 22 History 0
contributors 75 lines (73 sloc) 1.56 KB

<template>
  <div
    class="Scale"
    ref="Scale"
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
  name: 'scale-container',
  props: {
    width: {
      type: Number,
      default: () => 1920
    },
    height: {
      type: Number,
      default: () => 1080
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.setScale()
    window.addEventListener('resize', this.debounce(this.setScale))
  },
  methods: {
    getScale() {
      const { width, height } = this
      const wh = window.innerHeight / height
      const ww = window.innerWidth / width
      return { scaleX: ww, scaleY: wh }
    },
    setScale() {
      const { scaleY, scaleX } = this.getScale()
      if (this.$refs.Scale) {
        this.$refs.Scale.style.setProperty('--scaleX', scaleX)
        this.$refs.Scale.style.setProperty('--scaleY', scaleY)
      }
    },
    debounce(fn, delay) {
      const delays = delay || 200
      let timer
      return function () {
        const th = this
        const args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(function () {
          timer = null
          fn.apply(th, args)
        }, delays)
      }
    }
  }
}
</script>

<style lang="less">
.Scale {
  position: absolute;

  transform: perspective(1px) scale(var(--scaleX), var(--scaleY))
    translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  z-index: 999;
}
</style>
