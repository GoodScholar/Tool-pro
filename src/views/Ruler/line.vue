<template>
  <div
    class="line"
    v-show="showLine"
    :style="[offset, borderCursor]"
    @mousedown="handleDown"
  >
    <div class="action" :style="actionStyle">
      <span class="value">{{ startValue }}</span>
      <span class="del" :style="delStyle" @click="this.handleRemove">
        &times;
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineRuler',
  data() {
    return {
      startValue: 0,
      showLine: true
    }
  },
  props: {
    index: Number,
    start: Number,
    vertical: Boolean,
    scale: Number,
    value: Number,
    palette: Object,
    isShowReferLine: Boolean,
    thick: Number
  },
  computed: {
    offset() {
      const offset = (this.startValue - this.start) * this.scale
      if (offset < 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.showLine = false
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.showLine = true
      }
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
        ? { left: this.thick + 'px', color: this.palette.fontColor }
        : { top: this.thick + 'px', color: this.palette.fontColor }
      return actionStyle
    },
    delStyle() {
      const delStyle = {
        color: this.palette.lineColor
      }
      return delStyle
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
    }
  },
  mounted() {
    this.initStartValue()
  }
}
</script>

<style lang="scss" scope>
.line {
  position: absolute;
  .action {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
  }

  .del {
    font-size: 34px;
    // color: #3c7eff;
    visibility: hidden;
    cursor: pointer;
  }

  .value {
    pointer-events: none;
  }

  &:hover .del {
    visibility: visible;
  }
}
.h-container {
  .line {
    height: 100vh;
    top: 0;
    padding-left: 5px;
    .action {
      transform: translateX(-24px);
      .value {
        margin-left: 4px;
      }
    }
  }
}

.v-container {
  .line {
    width: 100vw;
    left: 0;
    padding-top: 5px;
    .action {
      transform: translateY(-24px);
      flex-direction: column;
      .value {
        margin-top: 4px;
      }
    }
  }
}
</style>
