<!--
  功能：可实现拖动布局、电子签章
  时间：2022年08月28日 15:14:57
  版本：v1.0
-->
<template>
  <div class="seal-container">
    <!--  -->
    <ul class="left">
      <li
        class="listItem mb"
        v-for="(item, index) in dragList"
        :key="index"
        draggable
        @dragstart="dragStart($event, item)"
        @dragend="dragEnd"
        @mousedown="getMouseDownPosition"
      >
        {{ item.name }}
      </li>
    </ul>
    <!-- @mousemove="" "dropDragOver"-->
    <div ref="center" class="center" @drop="dropDragDoM" @dragover.prevent>
      <div
        ref="dragItem"
        v-for="(item, index) in dropData"
        :key="index"
        :style="changePosition(item)"
        :class="['dragItem', item.selectName]"
        @mousedown="dragMove($event, item)"
      >
        <i class="delIcon el-icon-close" @click="getModel(item)"></i>
        {{ item.name }}
      </div>

      <pdfView></pdfView>
    </div>
    <div class="right">right</div>
  </div>
</template>

<script>
import pdfView from '@/components/pdfView'
export default {
  name: 'E-Seal',
  props: {},
  components: { pdfView },
  data() {
    return {
      mainHeight: 0,
      mainWidth: 0,
      childWidth: 0,
      childHeight: 0,
      mouseWidth: 0,
      mouseHeight: 0,
      dragList: [
        {
          name: 'DIV',
          type: 1
        },
        {
          name: '数字',
          type: 2
        },
        {
          name: '日期',
          type: 3
        },
        {
          name: '签署区',
          type: 4
        }
      ],
      dropData: []
    }
  },
  computed: {
    changePosition() {
      return (item) => {
        return {
          left: item.left + 'px',
          top: item.top + 'px'
        }
      }
    }
  },
  watch: {
    dropData: {
      handler: function (newVal) {
        // console.log(newVal)
      },
      deep: true
    }
  },
  methods: {
    // 计算拖动元素内鼠标的位置
    getMouseDownPosition(e) {
      // 计算鼠标的坐标
      this.mouseWidth = e.clientX - e.target.offsetLeft
      this.mouseHeight = e.clientY - e.target.offsetTop
    },
    // 开始拖动元素、将拖拽对象的参数传递给拖拽存放地
    dragStart(e, item) {
      e.dataTransfer.setData('item', JSON.stringify(item))
    },
    // 拖动结束
    dragEnd(e) {
      e.dataTransfer.clearData()
    },
    // 将拖拽的元素，释放在目标盒子中
    dropDragDoM(e) {
      // 获取拖拽对象的参数
      let data = e.dataTransfer.getData('item')
      data = JSON.parse(data)

      // 鼠标落点位置相对于当前拖拽存放地的 x y
      data.left = e.layerX - this.mouseWidth
      data.top = e.layerY - this.mouseHeight

      this.dropData.push(data)
    },
    // 拖动元素
    dragMove(e, item) {
      const EWidth = e.target.offsetWidth + 2
      const EHeight = e.target.offsetHeight + 2

      const disX = e.clientX - e.target.offsetLeft
      const disY = e.clientY - e.target.offsetTop

      document.onmousemove = (e) => {
        let left = e.clientX - disX
        let top = e.clientY - disY
        // 设置边距
        if (top <= 0) {
          top = 0
        }
        if (top >= this.mainHeight - EHeight) {
          top = this.mainHeight - EHeight
        }

        if (left <= 0) {
          left = 0
        }
        if (left >= this.mainWidth - EWidth) {
          left = this.mainWidth - EWidth
        }

        item.left = left
        item.top = top
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },

    getModel(val) {
      const index = this.dropData.findIndex((item) => {
        return val.name === item.name
      })

      this.dropData.splice(index, 1)
    }
  },
  created() {},
  mounted() {
    this.mainHeight = this.$refs.center.offsetHeight
    this.mainWidth = this.$refs.center.offsetWidth
  }
}
</script>

<style lang="scss" scoped>
:root {
  --width: 160px;
}

.seal-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  .left {
    min-width: 200px;
    border: 1px solid #000;
    padding: 20px;
    box-sizing: border-box;
  }
  .right {
    min-width: 300px;
    background: skyblue;
    border: 1px solid #000;
  }
  .center {
    position: relative;
    flex-grow: 1;
    overflow: auto;
    margin: 0 20px;
    border: 1px solid #000;
    .dragItem {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 160px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      box-sizing: border-box;
      border: 1px solid #000;
      user-select: none;
      cursor: pointer;
      z-index: 9999;
      .delIcon {
        display: none;
        position: absolute;
        right: 0;
        top: 0;
      }

      &:hover .delIcon {
        display: inline-block;
      }
    }
  }
}

.listItem {
  width: var(--width);
  height: 50px;
  line-height: 50px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #000;
  background: pink;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
