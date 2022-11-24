<!--
  功能：功能描述
  时间：2022年11月23日 15:11:10
  版本：v1.0
-->
<template>
  <canvas
    ref="canvas"
    class="ruler"
    @click="handle($event, 'click')"
    @mouseenter="handle($event, 'enter')"
    @mousemove="handle($event, 'move')"
    @mouseleave="$emit('update:showIndicator', false)"
  />
</template>

<script>
import { drawCanvasRuler } from './utils'
export default {
  name: 'CanvasRuler',
  props: {
    showIndicator: Boolean,
    valueNum: Number,
    scale: Number,
    ratio: Number,
    palette: Object,
    vertical: Boolean,
    start: Number,
    width: Number,
    height: Number,
    selectStart: Number,
    selectLength: Number
  },
  components: {},
  data() {
    return {
      canvas: {},
      canvasContext: {}
    }
  },
  watch: {
    start() {
      this.drawRuler(this.ratio)
    },
    width() {
      this.updateCanvasContext(this.ratio)
      this.drawRuler(this.ratio)
    },
    height() {
      this.updateCanvasContext(this.ratio)
      this.drawRuler(this.ratio)
    }
  },
  computed: {},
  methods: {
    initCanvasRef() {
      this.canvas = this.$refs.canvas

      this.canvasContext = this.canvas && this.canvas.getContext('2d')
    },
    updateCanvasContext(ratio) {
      if (this.canvas) {
        // 比例宽高
        this.canvas.width = this.width * ratio
        this.canvas.height = this.height * ratio
        const ctx = this.canvasContext
        if (ctx) {
          ctx.font = `${12 * ratio}px -apple-system,
                "Helvetica Neue", ".SFNSText-Regular",
                "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB",
                "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`
          ctx.lineWidth = 1
          ctx.textBaseline = 'middle'
        }
      }
    },
    drawRuler(ratio) {
      const options = {
        scale: this.scale,
        width: this.width,
        height: this.height,
        palette: this.palette,
        ratio: ratio
      }
      if (this.canvasContext) {
        drawCanvasRuler(
          this.canvasContext,
          this.start,
          this.selectStart,
          this.selectLength,
          options,
          this.vertical
        )
      }
    },
    handle(e, key) {
      const getValueByOffset = (offset, start, scale) =>
        Math.round(start + offset / scale)
      const offset = this.vertical ? e.offsetY : e.offsetX
      const value = getValueByOffset(offset, this.start, this.scale)
      switch (key) {
        case 'click':
          this.$emit('onAddLine', value)
          break
        case 'enter':
          this.$emit('update:valueNum', value)
          this.$emit('update:showIndicator', true)
          break
        default:
          this.$emit('update:valueNum', value)
          break
      }
    }
  },
  async created() {},
  async mounted() {
    this.initCanvasRef()
    this.updateCanvasContext(this.ratio)
    this.drawRuler(this.ratio)
  }
}
</script>

<style lang="scss" scoped></style>
