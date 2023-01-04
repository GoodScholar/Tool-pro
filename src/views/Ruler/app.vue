<template>
  <div class="wrapper">
    <SketchRule
      :lang="lang"
      :thick="thick"
      :scale="scale"
      :width="rulerWH.width"
      :height="rulerWH.height"
      :startX="startX"
      :startY="startY"
      :shadow="shadow"
      :cornerActive="cornerActive"
      :horLineArr="lines.h"
      :verLineArr="lines.v"
      :palette="palette"
      @handleLine="handleLine"
      @onCornerClick="handleCornerClick"
    ></SketchRule>

    <!--  @mousedown="getMouseDown"
      @mousemove="moveFlag && getMouseMove($event)"
      @mouseup="getMouseUp" -->
    <div
      ref="screensRef"
      id="screens"
      @wheel="handleWheel"
      @scroll="handleScroll"
    >
      <div ref="containerRef" id="container" class="screen-container">
        <div ref="canvas" id="canvas" :style="canvasStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SketchRule from './sketchRuler.vue'
const rectWidth = 1920
const rectHeight = 1080
export default Vue.extend({
  components: {
    SketchRule
  },
  data() {
    return {
      rulerWH: {
        width: '',
        height: ''
      },
      midDate: {
        h: [],
        v: []
      },
      palette: {
        bgColor: '#18181c', // ruler bg color 背景色
        longfgColor: '#fff', // ruler longer mark color 标尺刻度长标记颜色
        shortfgColor: '#fff', // ruler shorter mark color 标尺刻度短标记颜色
        fontColor: '#fff', // ruler font color 标尺字体颜色
        lineColor: '#3c7eff', // 辅助线颜色
        borderColor: 'transparent' // 边框颜色
      },
      // 是否隐藏参考线
      cornerActive: false,
      scale: 0.75, // 1,
      startX: 0,
      startY: 0,
      lines: {
        h: [],
        v: []
      },
      thick: 20,
      lang: 'zh-CN', // 中英文
      isShowRuler: true, // 显示标尺
      isShowReferLine: false, // 显示参考线

      // todo 鼠标
      moveFlag: false,
      downX: 0,
      scrollLeft: 0,
      downY: 0,
      scrollTop: 0
    }
  },
  watch: {
    lines: {
      handler() {},
      deep: true
    }
  },
  computed: {
    shadow() {
      return {
        x: 0,
        y: 0,
        width: rectWidth,
        height: rectHeight
      }
    },
    // 生成画布的样式（宽、高）
    canvasStyle() {
      return {
        width: '1920px',
        height: '1080px',
        transform: `scale(${this.scale})`
      }
    }
  },
  methods: {
    // 添加参考辅助线
    handleLine(lines) {
      this.midDate = this.lines = lines
    },
    // 处理是否隐藏参考线
    handleCornerClick(item) {
      this.cornerActive = item
      if (item) {
        this.lines = {}
      } else {
        this.lines = this.midDate
      }
    },
    handleScroll() {
      const screensRect = document
        .querySelector('#screens')
        .getBoundingClientRect()

      const canvasRect = document
        .querySelector('#canvas')
        .getBoundingClientRect()

      // 标尺开始的刻度
      const startX =
        (screensRect.left + this.thick - canvasRect.left) / this.scale
      const startY =
        (screensRect.top + this.thick - canvasRect.top) / this.scale

      this.startX = startX
      this.startY = startY
    },
    // 控制缩放值
    handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()

        const nextScale = parseFloat(
          Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2)
        )

        // const nextScale = parseFloat(
        //   Math.max(0.1, parseFloat(this.scale) - 0.1).toFixed(2)
        // )

        this.scale = nextScale
      }
      this.$nextTick(() => {
        this.handleScroll()
      })
    },
    // todo
    // 鼠标按下
    getMouseDown(e) {
      this.moveFlag = true

      // 鼠标左右滑动
      this.downX = e.clientX
      this.scrollLeft = this.$refs.screensRef.scrollLeft

      // 鼠标上下滑动
      this.downY = e.clientY
      this.scrollTop = this.$refs.screensRef.scrollTop
    },
    // 鼠标移动
    getMouseMove(e) {
      // 鼠标左右滑动
      const scrollX = e.clientX - this.downX
      if (scrollX < 0 && this.scrollLeft > 0) {
        this.$refs.screensRef.scrollLeft = this.scrollLeft - scrollX
      } else {
        this.$refs.screensRef.scrollLeft = this.scrollLeft - scrollX
      }

      // 鼠标上下滑动
      const scrollY = e.clientY - this.downY
      if (scrollY < 0 && this.scrollTop > 0) {
        this.$refs.screensRef.scrollTop = this.scrollTop - scrollY
      } else {
        this.$refs.screensRef.scrollTop = this.scrollTop - scrollY
      }
    },
    // 鼠标抬起 计算提示弹窗的位置
    getMouseUp() {
      this.moveFlag = false
    },

    getScale() {
      // 固定好16：9的宽高比，计算出最合适的缩放比
      const screens = this.$refs.screensRef
      const canvas = this.$refs.canvas
      const container = this.$refs.containerRef

      screens.scrollLeft =
        (container.clientWidth - screens.clientWidth - 20) / 2
      screens.scrollTop =
        (container.clientHeight - screens.clientHeight - 20) / 2

      this.rulerWH = {
        width: screens.clientWidth,
        height: screens.clientHeight
      }

      const wh = (screens.clientHeight - 80) / canvas.clientHeight
      const ww = (screens.clientWidth - 80) / canvas.clientWidth
      return ww < wh ? ww : wh
    },
    setScale() {
      // 获取到缩放比例，设置它
      this.scale = this.getScale()
      if (this.$refs.canvas) {
        this.$refs.canvas.style.setProperty('--scale', this.scale)
      }
    }
  },
  mounted() {
    // 设置缩放比例
    this.setScale()
    window.addEventListener('resize', this.setScale)
  }
})
</script>

<style lang="scss" scope>
.wrapper {
  position: relative;
  // position: absolute;
  // top: 50px;
  // left: 50px;
  width: 100vw;
  height: 100vh;
  border: 1px solid #dadadc;
}

#screens {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: auto;
}

.screen-container {
  @extend %flex-center-center;
  position: relative;
  width: 5000px;
  height: 3000px;
  background: url('~@/assets/imgs/screen.png') repeat;

  &:active {
    cursor: pointer;
  }
}

#canvas {
  position: relative;
  width: 1920px;
  height: 1080px;
  background-size: 100% 100%;
  transform: scale(var(--scale)) translate(-50%, -50%);
  background: #232324;
}
</style>
