<!--
  功能：功能描述
  时间：2022年10月31日 10:14:37
  版本：v1.0
-->
<template>
  <div class="anchor-point">
    <!-- 按钮 -->
    <div class="operation-btn">
      <div
        class="btn__item"
        :class="{ active: activeStep === index }"
        v-for="(item, index) in testArr"
        :key="index"
        @click="jump(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 滚动区域 -->
    <div class="scroll-content" @scroll="onScroll">
      <div
        class="scroll-item"
        v-for="(item, index) in testArr"
        :key="index"
        :style="{ background: item.color }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'demoItem',
  props: {},
  components: {},
  data() {
    return {
      testArr: [],
      activeStep: 0
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 滚动触发按钮高亮
    onScroll(e) {
      const scrollItems = document.querySelectorAll('.scroll-item')
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        const judge =
          e.target.scrollTop >=
          scrollItems[i].offsetTop - scrollItems[0].offsetTop
        if (judge) {
          this.activeStep = i
          break
        }
      }
    },
    // 点击切换锚点
    jump(index) {
      document.querySelectorAll('.scroll-item').forEach((item, idx) => {
        if (index === idx) {
          item.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
          })
        }
      })

      // const target = document.querySelector('.scroll-content')
      // const scrollItems = document.querySelectorAll('.scroll-item')
      // // 判断滚动条是否滚动到底部
      // if (target.scrollHeight <= target.scrollTop + target.clientHeight) {
      //   this.activeStep = index
      // }

      // // 锚点元素距离其offsetParent(这里是body)顶部的距离(待滚动的距离)
      // const total = scrollItems[index].offsetTop - scrollItems[0].offsetTop
      // // 滚动条距离滚动区域顶部的距离
      // let distance = document.querySelector('.scroll-content').scrollTop

      // let step = total / 50
      // if (total > distance) {
      //   console.log('down')
      //   smoothDown(document.querySelector('.scroll-content'))
      // } else {
      //   const newTotal = distance - total
      //   step = newTotal / 50

      //   console.log('up')
      //   smoothUp(document.querySelector('.scroll-content'))
      // }

      // // 参数element为滚动区域
      // function smoothDown(element) {
      //   if (distance < total) {
      //     distance += step
      //     element.scrollTop = distance
      //     setTimeout(smoothDown.bind(this, element), 10)
      //   } else {
      //     element.scrollTop = total
      //   }
      // }

      // // 参数element为滚动区域
      // function smoothUp(element) {
      //   if (distance > total) {
      //     distance -= step
      //     element.scrollTop = distance
      //     setTimeout(smoothUp.bind(this, element), 10)
      //   } else {
      //     element.scrollTop = total
      //   }
      // }
    }
  },
  created() {
    for (let i = 0; i < 20; i++) {
      this.testArr.push({
        name: `${i + 1}层`,
        color: `#${parseInt((Math.random() * 9 + 1) * 100000)}`
      })

      console.log(this.testArr)
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.onScroll, true)
    })
  }
}
</script>

<style lang="scss" scoped>
.anchor-point {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  flex-basis: 100%;
  overflow: hidden;
  .scroll-content {
    height: 100%;
    width: 88%;
    overflow: scroll;
  }
  .operation-btn {
    width: 12%;
    height: 100%;
    border-right: 2px solid #e4e7ed;
    margin-right: 20px;
  }

  .btn__item {
    position: relative;
    padding: 10px 0;
    text-align: center;
    // border: 1px solid #000;
    margin: 0 20px 20px 0;
    &:active {
      color: aqua;
    }
  }

  .active {
    &::after {
      content: '';
      position: absolute;
      right: -23px;
      top: 0;
      width: 2px;
      height: 100%;
      background-color: #409eff;
    }
  }

  .scroll-item {
    height: 200px;
  }
}
</style>
