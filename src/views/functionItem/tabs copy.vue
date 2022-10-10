<template>
  <div>
    <!-- <div class="lateral-sliding" id="nav">
      <div
        class="lateral-sliding-item"
        v-for="(item, index) in items"
        :key="index"
      >
        <div class="each-img"></div>
      </div>
    </div> -->

    <div class="scrollView" ref="idSwiperImg">
      <div
        class="chooseImgItem"
        @click="tabClick(index)"
        v-for="item in items"
        :key="item"
        ref="imgList"
      >
        <span class="each-img">{{ item }}</span>
        <!-- <van-image :src="item.pic[0].url" fit="cover" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabItem',
  data() {
    return {
      items: 10
    }
  },
  methods: {
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
    // js
    tabClick(index) {
      // 容器宽度和内部点击的 item 宽度
      const boxWidth = this.$refs.idSwiperImg.offsetWidth
      const elWidth = this.$refs.imgList[index].offsetWidth
      // 上一个选中的 item 下标 和 当前选中 item 下标
      this.lastItemIndex = this.itemIndex
      this.itemIndex = index

      if (elWidth <= boxWidth / 3) {
        // 获取当前容器的 scrollLeft 并计算接下去要移动的目标值
        const distance = this.$refs.idSwiperImg.scrollLeft
        const total = index * 70 - Math.floor(boxWidth / 3)
        // 上述两者的差值即为要移动的距离，将其细分为小块，确保为正值
        let step = (distance - total) / 50
        if (step < 0) step = -step
        this.moveSlow(distance, total, step)
      }
    },
    moveSlow(distance, total, step) {
      // 正向滚动 和 反向滚动
      if (this.lastItemIndex < this.itemIndex) {
        // 每隔1毫秒移动一小段距离，直到移动至目标至为止，反之亦然
        if (distance < total) {
          distance += step
          this.$refs.idSwiperImg.scrollLeft = distance
          setTimeout(() => {
            this.moveSlow(distance, total, step)
          }, 1)
        } else {
          this.$refs.idSwiperImg.scrollLeft = total
        }
      } else if (this.lastItemIndex > this.itemIndex) {
        if (distance > total) {
          distance -= step
          this.$refs.idSwiperImg.scrollLeft = distance
          setTimeout(() => {
            this.moveSlow(distance, total, step)
          }, 1)
        } else {
          this.$refs.idSwiperImg.scrollLeft = total
        }
      }
    }
  },
  mounted() {
    // 调用初始化方法，这里一定是在DOM加载之后调用
    this.scrollInit()
  }
}
</script>

<style lang="scss" scoped>
.lateral-sliding {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
}
.lateral-sliding-item {
  display: flex;
  margin-right: 8px;
  background-color: yellow;
}
.each-img {
  width: 150px;
  height: 88px;
  background-color: yellow;
}

.scrollView {
  width: 240px;
  height: 78px;
  overflow-x: scroll;
  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }

  .chooseImgItem {
    margin-left: 8px;
    height: 56px;
    width: 56px;
    border-radius: 4px;
    overflow: hidden;
    .van-image {
      width: 56px;
      height: 56px;

      & :first-child {
        margin-left: 15px;
      }
      & :last-child {
        margin-right: 15px;
      }
    }
  }
}
</style>
