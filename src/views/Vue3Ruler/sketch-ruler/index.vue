<!--
  功能：功能描述
  时间：2022年11月23日 15:44:36
  版本：v1.0
-->
<template>
  <div id="mb-ruler" class="style-ruler mb-ruler">
    <!-- 水平方向 -->
    <RulerWrapper
      :vertical="false"
      :width="width"
      :height="thick"
      :is-show-refer-line="showReferLine"
      :thick="thick"
      :ratio="ratio"
      :start="startX"
      :lines="lines.h"
      :select-start="shadow.x"
      :select-length="shadow.width"
      :scale="scale"
      :palette="palette"
    />
    <!-- 竖直方向 -->
    <RulerWrapper
      :vertical="true"
      :width="thick"
      :height="height"
      :is-show-refer-line="showReferLine"
      :thick="thick"
      :ratio="ratio"
      :start="startY"
      :lines="lines.v"
      :select-start="shadow.y"
      :select-length="shadow.height"
      :scale="scale"
      :palette="palette"
    />
    <!-- <i
      class="corner fa"
      :class="cornerActiveClass"
      :style="cornerStyle"
      @click="onCornerClick"
    ></i> -->
  </div>
</template>

<script>
import RulerWrapper from './ruler-wrapper.vue'

export default {
  name: 'SketchRules',
  props: {
    eyeIcon: {
      type: String
    },
    closeEyeIcon: {
      type: String
    },
    scale: {
      type: Number,
      default: 1
    },
    ratio: {
      type: Number
      // default: window.devicePixelRatio || 1
    },
    thick: {
      type: Number,
      default: 16
    },
    palette: {
      type: Object,
      default: () => {
        return {
          bgColor: 'rgba(225,225,225, 0)', // ruler bg color
          longfgColor: '#BABBBC', // ruler longer mark color
          shortfgColor: '#C8CDD0', // ruler shorter mark color
          fontColor: '#7D8694', // ruler font color
          shadowColor: '#E8E8E8', // ruler shadow color
          lineColor: '#EB5648',
          borderColor: '#DADADC',
          cornerActiveColor: 'rgb(235, 86, 72, 0.6)',
          menu: {
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
        }
      }
    },
    startX: {
      type: Number
    },
    startY: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    shadow: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }
      }
    },
    lines: {
      type: Object,
      default: () => {
        return {
          h: [],
          v: []
        }
      }
    },
    isShowReferLine: {
      type: Boolean,
      default: true
    }
  },
  components: {
    RulerWrapper
  },
  data() {
    return {
      showReferLine: true
    }
  },
  watch: {
    isShowReferLine() {
      this.showReferLine = this.isShowReferLine
    }
  },
  computed: {
    cornerActiveClass() {
      return this.isShowReferLine ? 'fa-eye' : 'fa-eye-slash'
    },
    cornerStyle() {
      return {
        width: this.thick + 'px',
        height: this.thick + 'px',
        borderRight: `1px solid ${this.palette.borderColor}`,
        borderBottom: `1px solid ${this.palette.borderColor}`
      }
    }
  },
  methods: {
    onCornerClick() {
      this.showReferLine = !this.showReferLine
      this.$emit('onCornerClick', this.showReferLine)
    }
  },
  async created() {},
  async mounted() {}
}
</script>

<style lang="scss" scoped>
.style-ruler {
  position: absolute;
  z-index: 3; /* 需要比resizer高 */
  width: 100%; /* scrollbar width */
  height: 100%;
  overflow: hidden;
  font-size: 12px;
  pointer-events: none;
  span {
    line-height: 1;
  }
}
.corner {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  cursor: pointer;
  box-sizing: content-box;
  transition: all 0.2s ease-in-out;
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
