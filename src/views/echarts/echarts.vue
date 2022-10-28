<template>
  <div class="chart-zone" :style="{ height: height + 'px' }">
    <div
      ref="echartsDiv"
      :style="{ height: height + 'px', width: width }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'echartsDemo',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    span: {
      type: Number
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: Number
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // chart: null, // chart不能是响应式的，不然tooltip中的trigger为axis时会没有效果
    }
  },
  watch: {
    options: {
      handler(options) {
        // 设置true清空echarts缓存
        this.chart.setOption(options, true)
      },
      deep: true
    },
    height() {
      this.chart.dispose()
      this.$nextTick(() => {
        this.initChart()
      })
    },
    span() {
      this.chart.dispose()
      this.$nextTick(() => {
        this.initChart()
      })
    }
  },
  mounted() {
    this.initChart()
  },
  beforeUnmount() {
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = null

      this.chart = this.$echarts.init(this.$refs.echartsDiv)
      this.chart.setOption(this.options, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-zone {
  position: relative;
  width: 100%;
}
</style>
