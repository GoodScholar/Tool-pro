<template>
  <div class="wrapper">
    <div class="wrapper__cell">
      <i class="el-icon-arrow-left preview" @click="preview"></i>
      <div
        class="my-inbox"
        id="nav"
        ref="nav"
        @mouseenter="stop"
        @mouseleave="move"
      >
        <div
          class="item"
          v-for="(item, index) in menuItems"
          :key="index"
          :id="index"
          :style="getStyle(index == currentIndex)"
          @click.prevent="clickMenuItem(index, $event)"
        >
          {{ item.name }}
        </div>
      </div>
      <i class="el-icon-arrow-right next" @click="next"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lz-menu',
  props: {
    // menuItems: Array,
    DefaultIndex: {
      type: Number,
      default: 0
    },
    iColor: {
      type: String, // 未选中文本颜色
      default: '#333'
    },
    iBgColor: {
      // 未选中背景色
      type: String,
      default: '#fff'
    },
    iActiveColor: {
      // 选中时文本颜色
      type: String,
      default: '#ff0'
    },
    iActiveBgColor: {
      // 选中时背景色
      type: String,
      default: '#036875'
    }
  },
  data() {
    return {
      currentIndex: 0,
      menuItems: [
        {
          id: 1,
          name: '通知公告'
        },
        {
          id: 2,
          name: '讲座预告'
        },
        {
          id: 3,
          name: '综合新闻'
        },
        {
          id: 4,
          name: '校园动态'
        },
        {
          id: 5,
          name: '教育教学'
        },
        {
          id: 6,
          name: '创新创业'
        },
        {
          id: 7,
          name: '开放办学'
        },
        {
          id: 8,
          name: '我爱我家1'
        },
        {
          id: 9,
          name: '我爱我家2'
        },
        {
          id: 10,
          name: '我爱我家3'
        },
        {
          id: 11,
          name: '我爱我家4'
        },
        {
          id: 12,
          name: '我爱我家5'
        },
        {
          id: 13,
          name: '我爱我家6'
        },
        {
          id: 14,
          name: '我爱我家7'
        },
        {
          id: 15,
          name: '我爱我家8'
        },
        {
          id: 16,
          name: '我爱我家9'
        }
      ],
      timer: null,
      value: 10,
      moveDistance: 0,
      overOffsetWidth: 0
    }
  },
  methods: {
    getStyle(select) {
      return {
        color: select ? this.iActiveColor : this.iColor,
        background: select ? this.iActiveBgColor : this.iBgColor
      }
    },
    clickMenuItem(idx, event) {
      const inbox = this.$refs.nav

      // 点击事件传递给调用者
      if (this.currentIndex !== idx) {
        this.currentIndex = idx
        this.$emit('clickLzMenuItem', this.menuItems[idx])
      }

      // 滚动 到中间
      const e = event.currentTarget
      const left = e.offsetLeft - inbox.clientWidth / 2 + e.offsetWidth / 2
      inbox.scrollLeft = left
    },
    preview() {
      this.moveDistance -= 100

      if (this.moveDistance < 0) {
        this.moveDistance = 0
      }

      this.$refs.nav.scrollLeft = this.moveDistance
    },
    next() {
      // const inbox = this.$refs.nav
      // this.currentIndex++
      // if (this.currentIndex >= this.menuItems.length) {
      //   this.currentIndex = this.menuItems.length - 1
      // }
      // const e = this.$refs.box.children[this.currentIndex]
      // const left = e.offsetLeft - inbox.clientWidth / 2 + e.offsetWidth / 2
      // inbox.scrollLeft = left

      this.moveDistance += 100
      if (this.moveDistance > this.overOffsetWidth) {
        this.moveDistance = this.overOffsetWidth
      }
      this.$refs.nav.scrollLeft = this.moveDistance
    },
    // 鼠标滚轮控制滚动
    scrollInit() {
      // 获取要绑定事件的元素
      const scrollDiv = document.getElementById('nav')
      // document.addEventListener('DOMMouseScroll', handler, false)
      // 添加滚轮滚动监听事件，一般是用下面的方法，上面的是火狐的写法
      scrollDiv.addEventListener('mousewheel', handler, false)
      // 滚动事件的出来函数
      function handler(event) {
        // 获取滚动方向
        const detail = event.wheelDelta || event.detail
        // 定义滚动方向，其实也可以在赋值的时候写
        const moveForwardStep = 1
        const moveBackStep = -1
        // 定义滚动距离
        let step = 0
        // 判断滚动方向,这里的100可以改，代表滚动幅度，也就是说滚动幅度是自定义的
        if (detail < 0) {
          step = moveForwardStep * 100
        } else {
          step = moveBackStep * 100
        }
        // 对需要滚动的元素进行滚动操作
        scrollDiv.scrollLeft += step
      }
    },
    stop() {
      // 禁止页面滑动
      const mo = (e) => {
        e.preventDefault()
      }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', mo, false) // 禁止页面滑动
    },
    move() {
      const mo = (e) => {
        e.preventDefault()
      }
      document.body.style.overflow = ''
      document.addEventListener('touchmove', mo, false) // 禁止页面滑动
    }
  },
  beforeMount() {
    // 挂着前，修改默认选项
    this.currentIndex = this.DefaultIndex
  },
  mounted() {
    // 调用初始化方法，这里一定是在DOM加载之后调用
    this.scrollInit()
    let allOffsetWidth = 0
    for (let i = 0; i < this.$refs.nav.children.length; i++) {
      allOffsetWidth += this.$refs.nav.children[i].offsetWidth
    }
    this.overOffsetWidth = allOffsetWidth - this.$refs.nav.offsetWidth
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;

  .wrapper__cell {
    @extend %flex-center-between;
  }
  .my-inbox {
    position: relative;
    overflow: scroll;
    width: 100%;
    white-space: nowrap;
    background-color: #f2f2f2;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      display: inline-block;
      height: 32px;
      line-height: 2rem;
      margin: 8px;
      padding: 0 20px;
      text-align: center;
      color: red;
      cursor: pointer;
    }
    .active {
      background-color: #036875;
      font-weight: bold;
      border-radius: 25px;
      color: #fff;
      cursor: pointer;
    }
  }
}

.preview,
.next {
  font-size: 24px;
  cursor: pointer;
}
</style>
