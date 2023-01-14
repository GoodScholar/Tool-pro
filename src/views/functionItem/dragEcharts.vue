<!--
  功能：可实现拖动布局、电子签章
  时间：2022年08月28日 15:14:57
  版本：v1.0
-->
<template>
  <div class="seal-container">
    <div class="header">
      <div class="header__left" @click="$router.push('/')">
        <img src="@/assets/imgs/G-icon.png" alt="" />
        <span class="header__left-title">Shadow</span>
      </div>
    </div>

    <div style="display: flex">
      <!-- 组件栏 -->
      <ul class="left">
        <li
          class="listItem mb"
          v-for="(item, index) in echartsArr"
          :key="index"
          draggable
          @dragstart="dragStart($event, item)"
          @dragend="dragEnd"
          @mousedown="getMouseDownPosition"
        >
          {{ item.name }}
        </li>
      </ul>

      <!-- 内容框 -->
      <div ref="center" class="center" @mousemove="MouseMoves" @drop="dropDragDoM" @dragover.prevent>
        <vdr
          v-for="item in echartsShow"
          :key="item.id"
          :x="item.left"
          :y="item.top"
          :w="ecahrtsObj.width"
          :h="ecahrtsObj.height"
          :min-width="ecahrtsObj.minWidth"
          :min-height="ecahrtsObj.minHeight"
          :parent="true"
          :is-conflict-check="true"
          @resizing="onResize"
        >
          <div
            :span="item.style.span"
            :style="{
              marginTop: item.style.marginTop + 'px',
              marginBottom: item.style.marginBottom,
              marginLeft: item.style.marginLeft + 'px',
              marginRight: item.style.marginRight + 'px'
            }"
            @click="clickEchart(item)"
            class="ecahts__box"
          >
            <echarts-demo :options="item.option" :id="item.id" :xy="xy" />
          </div>
        </vdr>
      </div>

      <!-- 配置栏 -->
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import vdr from 'vue-draggable-resizable'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import echartsDemo from '../echarts/echarts copy'
import echartsJson from '../../constant/echarts'
export default {
  name: 'E-Seal',
  props: {},
  components: { vdr, echartsDemo },
  data() {
    return {
      // 拖拽组件基本配置
      ecahrtsObj: {
        ecahrtsX: 0,
        ecahrtsY: 0,
        width: 200,
        height: 200,
        minWidth: 200,
        minHeight: 200
      },
      mouseWidth: 0,
      mouseHeight: 0,
      // 传给组件，用于监听改变echarts自适应的中间值
      xy: 0,
      activeName: 'zujian',
      echartsArr: echartsJson,
      echartsShow: [],
      currentEchart: '',
      jsonEchart: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    MouseMoves(e) {
      console.log(e.target.offsetTop)
    },
    // 计算拖动元素内鼠标的位置
    getMouseDownPosition(e) {
      // 计算鼠标的坐标
      this.mouseWidth = e.clientX - e.target.offsetLeft
      this.mouseHeight = e.clientY - e.target.offsetTop
    },
    onResize(x, y, width, height) {
      this.xy = width + height
      this.ecahrtsObj.ecahrtsX = x
      this.ecahrtsObj.ecahrtsY = y
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
      const arr = JSON.parse(e.dataTransfer.getData('item'))

      // 鼠标落点位置相对于当前拖拽存放地的 x y
<<<<<<< HEAD
console.log(e.offsetParent)
      arr.left = e.layerX - this.mouseWidth
      arr.top = e.layerY - this.mouseHeight
=======
      // arr.left = e.offsetX
      // arr.top = e.offsetY
      arr.left = e.layerX - 100
      arr.top = e.layerY - 100
>>>>>>> ffe6d845feff441304a3dd9e1c4bd0d7d973d671

      // 动态生成随机id
      arr.id = Math.random().toString(36).substr(2)
      this.jsonEchart = ''
      this.echartsShow.push(arr)
      this.$nextTick(() => {
        this.jsonEchart = JSON.stringify(arr.option)
      })
    },
    clickEchart(item) {}
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
:root {
  --width: 160px;
}

.seal-container {
  height: 100vh;
  width: 100vw;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 30px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    .header__left {
      display: flex;
      align-items: center;

      img {
        width: 40px;
      }

      .header__left-title {
        font-size: 23px;
        font-weight: bold;
        padding-left: 20px;
      }
    }
  }

  .left {
    min-width: 200px;
    height: 90vh;
    border: 1px solid #000;
    padding: 20px;
    box-sizing: border-box;
  }
  .right {
    min-width: 300px;
    height: 90vh;
    background: skyblue;
    border: 1px solid #000;
  }
  .center {
    position: relative;
    height: 90vh;
    flex-grow: 1;
    overflow: auto;
    margin: 0 20px;
    border: 1px solid #000;
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

.ecahts__box {
  height: 100%;
}
</style>
