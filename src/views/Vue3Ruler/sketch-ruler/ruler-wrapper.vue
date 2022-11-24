<!--
  功能：RulerWrapper组件
  时间：2022年11月23日 14:56:36
  版本：v1.0
-->
<template>
  <div :class="rwClassName" :style="rwStyle">
    <CanvasRuler
      :vertical="vertical"
      :scale="scale"
      :width="width"
      :height="height"
      :start="start"
      :ratio="ratio"
      :select-start="selectStart"
      :select-length="selectLength"
      :palette="palette"
      v-model:valueNum="valueNum"
      v-model:showIndicator="showIndicator"
      @onAddLine="handleNewLine"
    ></CanvasRuler>
    <div v-show="isShowReferLine" class="lines">
      <RulerLine
        v-for="(v, i) in lines"
        :key="v + i"
        :index="i"
        :value="v >> 0"
        :scale="scale"
        :start="start"
        :thick="thick"
        :palette="palette"
        :vertical="vertical"
        :is-show-refer-line="isShowReferLine"
        @onRemove="handleLineRemove"
        @onRelease="handleLineRelease"
      ></RulerLine>
    </div>
    <div v-show="showIndicator" class="indicator" :style="indicatorStyle">
      <div class="value">{{ valueNum }}</div>
    </div>
  </div>
</template>

<script>
import RulerLine from './ruler-line'
import CanvasRuler from '../canvas-ruler'
export default {
  name: 'RulerWrapper',
  props: {
    scale: Number,
    ratio: Number,
    thick: Number,
    palette: Object,
    vertical: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    start: {
      type: Number,
      default: 0
    },
    lines: {
      type: Array,
      default: () => []
    },
    selectStart: {
      type: Number
    },
    selectLength: {
      type: Number
    },
    isShowReferLine: {
      type: Boolean
    }
  },
  components: { RulerLine, CanvasRuler },
  data() {
    return {
      curLines: this.lines,
      showIndicator: false,
      valueNum: 0
    }
  },
  watch: {
    curLines: {
      handler(newVal) {
        console.log(newVal)
      },
      deep: true
    }
  },
  computed: {
    rwClassName() {
      const className = this.vertical ? 'v-container' : 'h-container'
      return className
    },
    rwStyle() {
      const hContainer = {
        width: `calc(100% - ${this.thick}px)`,
        height: `${this.thick + 1}px`,
        left: `${this.thick}px`
      }
      const vContainer = {
        width: `${this.thick && this.thick + 1}px`,
        height: `calc(100% - ${this.thick}px)`,
        top: `${this.thick}px`
      }
      return this.vertical ? vContainer : hContainer
    },
    indicatorStyle() {
      const indicatorOffset = (this.valueNum - this.start) * this.scale
      let positionKey = 'top'
      let borderKey = 'borderLeft'
      positionKey = this.vertical ? 'top' : 'left'
      borderKey = this.vertical ? 'borderBottom' : 'borderLeft'
      return {
        [positionKey]: indicatorOffset + 'px',
        [borderKey]: `1px solid ${this.palette.lineColor}`
      }
    }
  },
  methods: {
    handleNewLine(value) {
      this.curLines.push(value)
    },
    handleLineRelease(value, index) {
      // 左右或上下超出时, 删除该条对齐线
      const offset = value - this.start
      const maxOffset = (this.vertical ? this.height : this.width) / this.scale
      if (offset < 0 || offset > maxOffset) {
        this.handleLineRemove(index)
      } else {
        this.curLines[index] = value
      }
    },
    handleLineRemove(index) {
      this.curLines.splice(index, 1)
    }
  },
  async created() {},
  async mounted() {}
}
</script>

<style lang="scss" scoped>
.line {
  position: absolute;
}
.h-container,
.v-container {
  position: absolute;
  .lines {
    pointer-events: none;
  }
  &:hover .lines {
    pointer-events: auto;
  }
}
.h-container {
  top: 0;
  .line {
    top: 0;
    height: 100vh;
    padding-left: 5px;
    .action {
      transform: translateX(-24px);
      .value {
        margin-left: 4px;
      }
    }
  }
  .indicator {
    top: 0;
    height: 100vw;
    .value {
      width: auto;
      padding: 0 2px;
      margin-top: 4px;
      margin-left: 4px;
    }
  }
}
.v-container {
  left: 0;
  .line {
    left: 0;
    width: 100vw;
    padding-top: 5px;
    .action {
      transform: translateY(-24px);
      flex-direction: column;
      .value {
        margin-top: 4px;
      }
    }
  }
  .indicator {
    width: 100vw;
    .value {
      left: 0;
      width: auto;
      padding: 0 2px;
      margin-top: -5px;
      margin-left: 2px;
      transform: rotate(-90deg);
      transform-origin: 0 0;
    }
  }
}
</style>
