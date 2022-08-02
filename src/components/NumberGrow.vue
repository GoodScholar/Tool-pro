<!--
  功能：数字滚动增加效果
  时间：2022年08月02日 13:42:52
  版本：v1.0
-->
<template>
  <div class="number-grow-warp">
    <span
      ref="numberGrow"
      :data-time="time"
      class="number-grow"
      :data-value="value"
    >
      0
    </span>
  </div>
</template>

<script>
export default {
  name: 'NumberAdd',
  props: {
    time: {
      type: Number,
      default: 10
    },
    value: {
      type: Number,
      default: 720
    }
  },
  components: {},
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {
    numberGrow(e) {
      const step = (this.value * 10) / (this.time * 1000)
      let current = 0
      let start = 0
      let t = setInterval(function () {
        start += step
        if (start > this.value) {
          clearInterval(t)
          start = this.value
          t = null
        }
        if (current === start) {
          return
        }
        current = start
        e.innerHTML = current
          .toString()
          .replace(/(d)(?=(?:d{3}[+]?)+$)/g, '$1,')
      }, 10)
    }
  },
  created() {},
  mounted() {
    this.numberGrow(this.$refs.numberGrow)
  }
}
</script>

<style lang="scss" scoped>
.number-grow-warp {
  transform: translateZ(0);
}
.number-grow {
  font-family: Arial-BoldMT;
  font-size: 64px;
  color: #ffaf00;
  letter-spacing: 2.67px;
  margin: 110px 0 20px;
  display: block;
  line-height: 64px;
}
</style>
