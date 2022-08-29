<!--
  功能：Home
  时间：2022年07月28日 11:09:35
  版本：v1.0
-->
<template>
  <div class="home">
    <!-- collapse-tags -->
    <el-select v-model="value" placeholder="请选择" multiple filterable>
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <div>
      <CountTo :startVal="0" :endVal="100" :duration="10000"></CountTo>
    </div>

    <div class="box-line"></div>
  </div>
</template>

<script>
import CountTo from '@/components/CountTo.vue'
export default {
  name: 'HomeItem',
  props: {},
  components: {
    CountTo
  },
  data() {
    return {
      value: [],
      options: [
        {
          value: '无保留意见',
          label: '无保留意见'
        },
        {
          value: '保留意见',
          label: '保留意见'
        },
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    // selectBlur(e) {
    //   // 意见类型
    //   if (e.target.value !== '') {
    //     this.value = e.target.value + '(其他)'
    //     this.$forceUpdate()
    //   }
    // },
    // selectClear() {
    //   this.value = ''
    //   this.$forceUpdate()
    // },
    // selectChange(val) {
    //   console.log(val)
    //   // this.value = val
    //   this.$forceUpdate()
    // },
    handleScroll(e) {
      const scrollDiv = document.getElementsByClassName('el-select__tags')[0]
      const detail = e.wheelDelta || e.detail // 判断鼠标是向上滚动还是向下滚动 detail=120 向下 detail=-120 向上
      const moveStep = 2
      scrollDiv.scrollLeft += detail > 0 ? moveStep * 10 : moveStep * -10
    }
  },
  created() {},
  mounted() {
    window.addEventListener('mousewheel', this.handleScroll, false)
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-select) {
  min-width: 400px;
}

:deep(.el-select__tags) {
  max-width: 200px;
  overflow-x: scroll;
  flex-wrap: nowrap;
}

img {
  width: 100px;
  height: 100px;
}

.box-line,
.box-line::before,
.box-line::after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.box-line {
  width: 200px;
  height: 200px;
  margin: auto;
  color: #69ca62;
  box-shadow: inset 0 0 0 1px rgba(105, 202, 98, 0.5);
}
.box-line::before,
.box-line::after {
  content: '';
  z-index: -1;
  margin: -5%;
  box-shadow: inset 0 0 0 2px;
  animation: clipMe 8s linear infinite;
}
.box-line::before {
  animation-delay: -4s;
}

@keyframes clipMe {
  0%,
  100% {
    clip: rect(0px, 220px, 2px, 0px);
  }
  25% {
    clip: rect(0px, 2px, 220px, 0px);
  }
  50% {
    clip: rect(218px, 220px, 220px, 0px);
  }
  75% {
    clip: rect(0px, 220px, 220px, 218px);
  }
}
</style>
