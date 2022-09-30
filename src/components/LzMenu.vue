<template>
  <div class="wrapper">
    <div style="display: flex">
      <i class="el-icon-arrow-left preview" @click="preview"></i>
      <div class="my-inbox" ref="box">
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

    <button v-longpress="incrementPlusTen" @click="incrementPlusOne">
      {{ value }}
    </button>
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
      value: 10
    }
  },
  beforeMount() {
    // 挂着前，修改默认选项
    this.currentIndex = this.DefaultIndex
  },
  methods: {
    getStyle(select) {
      return {
        color: select ? this.iActiveColor : this.iColor,
        background: select ? this.iActiveBgColor : this.iBgColor
      }
    },
    clickMenuItem(idx, event) {
      const inbox = this.$refs.box

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
      const inbox = this.$refs
      console.log(inbox)
    },
    next() {
      const inbox = this.$refs.box

      this.currentIndex++
      // if (this.currentIndex === 2) {
      //   this.currentIndex = 3
      // } else
      if (this.currentIndex >= this.menuItems.length) {
        this.currentIndex = this.menuItems.length - 1
      }

      console.log(this.currentIndex)

      const e = this.$refs.box.children[this.currentIndex]
      const left = e.offsetLeft - inbox.clientWidth / 2 + e.offsetWidth / 2
      inbox.scrollLeft = left
    },

    // 增加1
    incrementPlusOne() {
      this.value++
    },
    // 增加10
    incrementPlusTen() {
      this.value++
      console.log(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  .my-inbox {
    position: relative;
    overflow-y: hidden;
    overflow-x: scroll;
    width: 100%;
    white-space: nowrap;
    background-color: #f2f2f2;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      display: inline-block;
      height: 2rem;
      line-height: 2rem;
      margin: 0.5rem;
      padding: 0px 0.8rem;
      text-align: center;
      color: red;
    }
    .active {
      background-color: #036875;
      font-weight: bold;
      border-radius: 25px;
      color: #fff;
    }
  }
}

.preview,
.next {
  // position: absolute;
  // top: 14px;
  cursor: pointer;
}

.preview {
  // left: 0;
  font-size: 24px;
}
.next {
  // right: 0;
  font-size: 24px;
  background-color: pink;
}

.slide {
  width: 200px;
  height: 200px;
  background: #ccc;
  text-align: center;
  line-height: 200px;
  color: #fff;
  cursor: move;
  position: fixed;
  z-index: 99;
  right: 10px;
  bottom: 85px;
  width: 40px;
  height: 40px;
}
</style>
