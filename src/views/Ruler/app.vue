<template>
  <div class="wrapper">
    <SketchRule
      :lang="lang"
      :thick="thick"
      :scale="scale"
      :width="582"
      :height="482"
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

    <div
      ref="screensRef"
      id="screens"
      @wheel="handleWheel"
      @scroll="handleScroll"
      @mousedown="getMouseDown"
      @mousemove="moveFlag && getMouseMove($event)"
      @mouseup="getMouseUp"
    >
      <div ref="containerRef" id="container" class="screen-container">
        <div ref="canvas" id="canvas" :style="canvasStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import SketchRule from './sketchRuler.vue'
const rectWidth = 600
const rectHeight = 320
export default Vue.extend({
  components: {
    SketchRule
  },
  data() {
    return {
      midDate: {
        h: [],
        v: []
      },
      palette: {
        bgColor: '#18181c', // ruler bg color 背景色
        longfgColor: '#fff', // ruler longer mark color 标尺刻度长标记颜色
        shortfgColor: '#fff', // ruler shorter mark color 标尺刻度短标记颜色
        fontColor: '#fff', // ruler font color 标尺字体颜色
        lineColor: '#EB5648', // 辅助线颜色
        borderColor: 'transparent' // 边框颜色
      },
      // 是否隐藏参考线
      cornerActive: false,
      scale: 2, // 1,
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
        width: '3000px',
        height: '1080px'
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
    setCalc() {
      const scaleX =
        $('#screens')[0].clientWidth / $('#canvas')[0].clientWidth - 0.04
      const scaleY =
        $('#screens')[0].clientHeight / $('#canvas')[0].clientHeight - 0.04

      // 需要取缩放倍数较小的，因为需要宽高都兼容
      if (scaleX > scaleY) {
        $('#canvas').css('transform', `scale(${scaleY})`)
      } else {
        $('#canvas').css('transform', `scale(${scaleX})`)
      }
    }
  },
  mounted() {
    $('#screens').scrollLeft(
      ($('#container')[0].clientWidth - $('#screens')[0].clientWidth) / 2
    )
    $('#screens').scrollTop(
      ($('#container')[0].clientHeight - $('#screens')[0].clientHeight) / 2
    )

    this.setCalc()
  }
})
</script>

<style lang="scss" scope>
.wrapper {
  background-color: #f5f5f5;
  position: absolute;
  top: 50px;
  left: 50px;
  width: 1000px;
  height: 600px;
  border: 1px solid #dadadc;
}

#screens {
  position: absolute;
  width: 100%;
  height: 100%;
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
  // width: 1920px;
  // height: 1080px;
  background-size: 100% 100%;
  background: lightblue;
}
</style>
