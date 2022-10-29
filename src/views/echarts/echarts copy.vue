<template>
  <div ref="echartsDiv" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
  name: 'echartsDemo',
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    xy: {
      type: Number
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // chart不能是响应式的，不然tooltip中的trigger为axis时会没有效果
      // chart: null,
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
    xy: {
      handler() {
        this.chart.resize()
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      this.chart = null
      this.chart = this.$echarts.init(this.$refs.echartsDiv)
      this.chart.setOption(this.options, true)
      this.$nextTick(() => {
        this.chart.resize()
      })
    }
  },
  mounted() {
    this.initChart()
  },
  beforeUnmount() {
    this.chart = null
  }
}
</script>

<style lang="scss" scoped></style>
