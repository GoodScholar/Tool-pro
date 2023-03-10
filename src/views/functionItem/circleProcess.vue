<!--
  功能：环形进度条
  时间：2022年10月24日 15:31:46
  版本：v1.0
-->
<template>
  <div class="circle-timer__wrapper" :style="{ width: setWidth + 'px' }">
    <svg
      class="circle-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="circle-timer__circle">
        <circle
          class="circle-timer__path-elapsed"
          cx="50"
          cy="50"
          r="45"
        ></circle>
        <path
          :stroke-dasharray="strokeDashArray"
          class="circle-timer__path-remaining"
          :style="{ color: pathColor }"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span class="circle-timer__label">
      {{ time }}
    </span>
  </div>
</template>

<script>
const FULL_DASH_ARRAY = 283
const DEFAULT_COLOR = '#FFE2AA'
export default {
  name: 'CircleProcess',
  props: {
    // 环形图宽度
    setWidth: {
      type: Number,
      default: 50
    },
    // 结束时间，单位s
    endTime: {
      type: Number,
      default: 0
    },
    // 开始时间，单位s
    startTime: Number,
    // 间隔时间，单位s，倒计时为负数，正计时为正数
    step: {
      type: Number,
      default: -1
    },
    // 计时结束事件
    onFinished: Function,
    // 阶段阈值，以及颜色变化。
    thresholds: Array
  },
  data() {
    return {
      time: this.startTime,
      timer: null,
      timeLimit: Math.abs(this.startTime - this.endTime)
    }
  },
  computed: {
    // 路径颜色
    pathColor() {
      let result = DEFAULT_COLOR

      const thresholds = this.thresholds
      if (Array.isArray(thresholds)) {
        thresholds
          .sort((a, b) => a.threshold - b.threshold)
          .some((item) => {
            if (this.time <= this.timeLimit * item.threshold) {
              // 根据当前时间获取距离最近的阈值的颜色
              result = item.color
              return true
            }
            return false
          })
      }
      return result
    },
    // stroke虚线数组
    strokeDashArray() {
      // 圆滑过渡
      const rawTimeFraction = this.time / this.timeLimit
      const timeFraction =
        rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)
      return `${(timeFraction * FULL_DASH_ARRAY).toFixed(0)} ${FULL_DASH_ARRAY}`
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      // step>0正计时 和 step<0倒计时
      if (
        (this.step < 0 && this.time <= this.endTime) ||
        (this.step > 0 && this.time >= this.endTime)
      ) {
        this.onFinished?.()
        clearInterval(this.timer)
      } else {
        const cur = this.time + this.step
        this.time = cur <= 0 ? 0 : cur
      }
    }, Math.abs(this.step) * 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less">
.circle-timer {
  &__wrapper {
    position: relative;
  }

  &__svg {
    // -1逆时针 1顺时针
    transform: scaleX(1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__circle {
    fill: none;
    stroke: none;
  }

  &__path-elapsed {
    stroke-width: 8px;
    stroke: rgba(255, 255, 255, 0.2);
  }

  &__path-remaining {
    stroke-width: 8px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;
  }

  &__label {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
}
</style>
