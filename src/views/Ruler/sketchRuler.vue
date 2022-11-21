<template>
  <div class="style-ruler mb-ruler" id="mb-ruler">
    <!-- 水平方向 -->
    <RulerWrapper
      :vertical="false"
      :width="width"
      :height="thick"
      :isShowReferLine="isShowReferLine"
      :thick="thick"
      :start="startX"
      :lines="horLineArr"
      :selectStart="shadow.x"
      :selectLength="shadow.width"
      :scale="scale"
      :palette="palette"
      :canvasConfigs="canvasConfigs"
      @onLineChange="handleLineChange"
    />
    <!-- 竖直方向 -->
    <RulerWrapper
      :vertical="true"
      :width="thick"
      :height="height"
      :isShowReferLine="isShowReferLine"
      :thick="thick"
      :start="startY"
      :lines="verLineArr"
      :selectStart="shadow.y"
      :selectLength="shadow.height"
      :scale="scale"
      :palette="palette"
      :canvasConfigs="canvasConfigs"
      @onLineChange="handleLineChange"
    />

    <i
      class="corner fa"
      :class="cornerActiveClass"
      :style="cornerStyle"
      @click="onCornerClick"
    ></i>
  </div>
</template>

<script>
import RulerWrapper from './rulerWrapper.vue'
const DEFAULTMENU = {
  bgColor: '#fff',
  dividerColor: '#DBDBDB',
  listItem: {
    textColor: '#415058',
    hoverTextColor: '#298DF8',
    disabledTextColor: 'rgba(65, 80, 88, 0.4)',
    bgColor: '#fff',
    hoverBgColor: '#F2F2F2'
  }
}
export default {
  name: 'SketchRuler',
  components: {
    RulerWrapper
  },
  props: {
    scale: {
      type: Number,
      default: 1
    },
    ratio: {
      type: Number,
      default: window.devicePixelRatio || 1
    },
    thick: {
      type: Number,
      default: 16
    },
    width: Number,
    height: Number,
    startX: {
      type: Number,
      default: 0
    },
    startY: {
      type: Number,
      default: 0
    },
    shadow: {
      type: Object,
      default: () => {
        return {
          x: 200,
          y: 100,
          width: 200,
          height: 400
        }
      }
    },
    horLineArr: {
      type: Array,
      default: () => {
        // return [100, 200]
        return []
      }
    },
    verLineArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    cornerActive: {
      type: Boolean,
      default: false
    },
    lang: String,
    isOpenMenuFeature: {
      type: Boolean,
      default: false
    },
    handleShowRuler: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    isShowReferLine: {
      type: Boolean,
      default: true
    },
    handleShowReferLine: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    palette: {
      type: Object,
      default: () => {
        return {
          bgColor: 'rgba(225,225,225, 0)', // ruler bg color 背景色
          longfgColor: '#BABBBC', // ruler longer mark color 标尺长标记颜色
          shortfgColor: '#C8CDD0', // ruler shorter mark color 标尺短标记颜色
          fontColor: '#7D8694', // ruler font color 标尺字体颜色
          shadowColor: '#E8E8E8', // ruler shadow color 标尺阴影色
          lineColor: '#EB5648', // 辅助线颜色
          borderColor: '#DADADC', // 边框颜色
          cornerActiveColor: 'rgb(235, 86, 72, 0.6)',
          menu: DEFAULTMENU
        }
      }
    }
  },
  data() {
    return {
      vertical: true,
      middleDate: false
    }
  },
  computed: {
    cornerActiveClass() {
      return this.cornerActive ? 'fa-eye' : 'fa-eye-slash'
    },
    cornerStyle() {
      return {
        backgroundColor: this.palette.bgColor,
        width: this.thick + 'px',
        height: this.thick + 'px'
        // borderRight: `1px solid ${this.palette.borderColor}`,
        // borderBottom: `1px solid ${this.palette.borderColor}`
      }
    },
    canvasConfigs() {
      const {
        bgColor,
        longfgColor,
        shortfgColor,
        fontColor,
        shadowColor,
        lineColor,
        borderColor,
        cornerActiveColor
      } = this.palette
      return {
        ratio: this.ratio,
        bgColor,
        longfgColor,
        shortfgColor,
        fontColor,
        shadowColor,
        lineColor,
        borderColor,
        cornerActiveColor
      }
    }
  },
  methods: {
    onCornerClick() {
      this.middleDate = !this.middleDate
      this.$emit('onCornerClick', this.middleDate)
    },
    handleLineChange(arr, vertical) {
      const newLines = vertical
        ? { h: this.horLineArr, v: [...arr] }
        : { h: [...arr], v: this.verLineArr }
      this.$emit('handleLine', newLines)
    }
  }
}
</script>

<style lang="scss" scope>
.style-ruler {
  position: absolute;
  width: 100%; /* scrollbar width */
  height: 100%;
  z-index: 3; /* 需要比resizer高 */
  pointer-events: none;
  font-size: 12px;
  overflow: hidden;
  span {
    line-height: 1;
  }
}
.corner {
  // position: absolute;
  // left: 0;
  // top: 0;

  pointer-events: auto;
  cursor: pointer;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  &::before {
    width: 100%;
    height: 100%;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.indicator {
  position: absolute;
  pointer-events: none;
  .value {
    position: absolute;
    background: white;
  }
}

.ruler {
  width: 100%;
  height: 100%;
  pointer-events: auto;
}
</style>
