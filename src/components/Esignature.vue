<!--
  功能：电子签名组件
  时间：2022年08月21日 15:54:48
  版本：v1.0
-->
<template>
  <div
    ref="canvasHW"
    class="canvasBox"
    :style="{ width: signWidth, height: signHeight }"
  >
    <canvas
      ref="canvasF"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      @mousedown="mouseDown"
      @mousemove="mouseMove"
      @mouseup="mouseUp"
    ></canvas>
    <div class="btnBox">
      <el-button @click="overwrite">重写</el-button>
      <el-button type="primary" @click="commit">提交签名</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'E-signature',
  props: {
    signWidth: {
      type: String,
      default: '100vw'
    },
    signHeight: {
      type: String,
      default: '20%'
    },
    textColor: {
      type: String,
      default: '#000'
    },
    textWeight: {
      type: Number,
      default: 1
    }
  },
  components: {},
  data() {
    return {
      imgUrl: '',
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      // 签名标记
      isDown: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    // mobile
    touchStart(ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length === 1) {
        const obj = {
          x: ev.targetTouches[0].clientX,
          y: ev.targetTouches[0].clientY
        }

        this.startX = obj.x
        this.startY = obj.y
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
      }
    },
    touchMove(ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length === 1) {
        let moveX = 0
        let moveY = 0
        if (ev.targetTouches[0].clientX < 0) {
          moveX = 0
        } else if (ev.targetTouches[0].clientX > this.$refs.canvasF.width) {
          moveX = this.$refs.canvasF.width
        } else {
          moveX = ev.targetTouches[0].clientX
        }

        if (ev.targetTouches[0].clientY < 0) {
          moveY = 0
        } else if (ev.targetTouches[0].clientY > this.$refs.canvasF.height) {
          moveY = this.$refs.canvasF.height
        } else {
          moveY = ev.targetTouches[0].clientY
        }

        const obj = {
          x: moveX,
          y: moveY
        }

        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.startY = obj.y
        this.startX = obj.x
        this.points.push(obj)
      }
    },
    touchEnd(ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length === 1) {
        const obj = {
          x: ev.targetTouches[0].clientX,
          y: ev.targetTouches[0].clientY
        }

        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
      }
    },
    // pc
    mouseDown(ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev) {
        const obj = {
          x: ev.offsetX,
          y: ev.offsetY
        }
        this.startX = obj.x
        this.startY = obj.y
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
        this.isDown = true
      }
    },
    mouseMove(ev) {
      ev = ev || event
      ev.preventDefault()
      if (this.isDown) {
        const obj = {
          x: ev.offsetX,
          y: ev.offsetY
        }
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.startY = obj.y
        this.startX = obj.x
        this.points.push(obj)
      }
    },
    mouseUp(ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev) {
        const obj = {
          x: ev.offsetX,
          y: ev.offsetY
        }
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
        this.points.push({ x: -1, y: -1 })
        this.isDown = false
      }
    },
    // 重写
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      )
      this.points = []
      this.imgUrl = ''
    },
    // 提交签名
    commit() {
      this.imgUrl = this.$refs.canvasF.toDataURL()
      this.$emit('submitSign', this.imgUrl)
    }
  },
  created() {},
  mounted() {
    const canvas = this.$refs.canvasF
    canvas.height = this.$refs.canvasHW.offsetHeight
    canvas.width = this.$refs.canvasHW.offsetWidth
    this.canvasTxt = canvas.getContext('2d')
    // 铅笔的线条颜色
    this.canvasTxt.strokeStyle = this.textColor
    // 铅笔的线条粗细
    this.canvasTxt.lineWidth = this.textWeight
  }
}
</script>

<style lang="scss" scoped>
.canvasBox {
  box-sizing: border-box;
  canvas {
    background-color: #d9afd9;
    background-image: linear-gradient(90deg, #d9afd9 0%, #97d9e1 100%);
  }

  .btnBox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
