<!--
  功能：线的显示
  时间：2022年11月23日 14:38:06
  版本：v1.0
-->
<template>
  <!-- 线的显示 -->
  <div
    v-show="showLine"
    class="line"
    :style="[offset, borderCursor]"
    @mousedown="handleDown"
  >
    <div class="action" :style="actionStyle">
      <span class="del" @click="handleRemove">&times;</span>
      <span class="value">{{ startValue }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineRuler',
  props: {
    scale: Number,
    thick: Number,
    palette: Object,
    index: Number,
    start: Number,
    vertical: Boolean,
    value: Number,
    isShowReferLine: Boolean
  },
  components: {},
  data() {
    return {
      startValue: 0,
      showLine: true
    }
  },
  watch: {},
  computed: {
    offset() {
      const offset = (this.startValue - this.start) * this.scale
      this.setShowLine(offset)
      const positionValue = offset + 'px'
      const position = this.vertical
        ? { top: positionValue }
        : { left: positionValue }
      return position
    },
    borderCursor() {
      const borderValue = `1px solid ${this.palette.lineColor}`
      const border = this.vertical
        ? { borderTop: borderValue }
        : { borderLeft: borderValue }

      const cursorValue = this.isShowReferLine
        ? this.vertical
          ? 'ns-resize'
          : 'ew-resize'
        : 'none'
      return {
        cursor: cursorValue,
        ...border
      }
    },
    actionStyle() {
      const actionStyle = this.vertical
        ? { left: this.thick + 'px' }
        : { top: this.thick + 'px' }
      return actionStyle
    }
  },
  methods: {
    handleDown(e) {
      const startD = this.vertical ? e.clientY : e.clientX
      const initValue = this.startValue
      this.$emit('onMouseDown')
      const onMove = (e) => {
        const currentD = this.vertical ? e.clientY : e.clientX
        const newValue = Math.round(
          initValue + (currentD - startD) / this.scale
        )
        this.startValue = newValue
      }
      const onEnd = () => {
        this.$emit('onRelease', this.startValue, this.index)
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onEnd)
      }
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onEnd)
    },
    handleRemove() {
      this.$emit('onRemove', this.index)
    },
    initStartValue() {
      this.startValue = this.value
    },
    setShowLine(offset) {
      this.showLine = offset >= 0
    }
  },
  async created() {},
  async mounted() {
    this.initStartValue()
  }
}
</script>

<style lang="scss" scoped>
.line {
  pointer-events: auto;
  position: absolute;
  .action {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .value {
    pointer-events: none;
    transform: scale(0.83);
  }
  .del {
    padding: 3px 5px;
    cursor: pointer;
    visibility: hidden;
  }
  &:hover .del {
    visibility: visible;
  }
}
</style>
