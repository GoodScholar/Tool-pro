<!--
  功能：功能描述
  时间：2022年07月21日 08:19:19
  版本：v1.0
-->
<template>
  <div class="container">
    <!--   @mousemove="move" @mouseup="openTooltip" -->
    <div
      class="drag"
      ref="drag"
      v-drag
      @click="handleDragClick"
      @mouseover="start"
      @mouseout="pause"
    >
      <div class="cell">
        <el-select
          ref="statusSelect"
          v-model="value"
          placeholder="请选择"
          v-if="visiblePop"
          @change="handleChange"
          @blur.capture.native="disableVisible"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <div id="canvas" class="svga" slot="reference"></div>
      </div>
    </div>

    <div
      class="cover"
      v-show="isShow"
      @click="visiblePop = isShow = false"
    ></div>

    <vdr
      :parent="true"
      :w="100"
      :h="100"
      :min-width="100"
      :min-height="100"
      @dragging="onDrag"
      @resizing="onResize"
    >
      <div id="main" style="width: 100%; height: 100%"></div>
    </vdr>

    <!-- <vdr
        :w="200"
        :h="200"
        :parent="true"
        :debug="false"
        :min-width="200"
        :min-height="200"
        :isConflictCheck="true"
        :snap="true"
        :snapTolerance="20"
      ></vdr> -->
  </div>
</template>

<script>
import vdr from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import SVGA from 'svgaplayerweb'

export default {
  name: 'DragItem',
  props: {},
  components: { vdr },
  data() {
    return {
      visiblePop: false,
      isOption: false,
      isShow: false,
      player: null,
      options: [
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
      ],
      value: '',
      myChart: null
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleDragClick() {
      // 判断拖拽组件的状态

      const isDrag = this.$refs.drag.getAttribute('ele-flag') === 'true'

      if (isDrag) {
        return false
      }

      this.visiblePop = !this.visiblePop
      this.isShow = !this.isShow
    },

    async initSvga() {
      this.player = new SVGA.Player('#canvas')
      const parser = new SVGA.Parser('#canvas')

      parser.load(
        'https://cdn.jsdelivr.net/gh/svga/SVGA-Samples@master/angel.svga',
        (videoItem) => {
          this.player.setVideoItem(videoItem)
          // player.pauseAnimation()
        }
      )
    },
    start() {
      this.player.startAnimation()
    },
    pause() {
      this.player.pauseAnimation()
    },
    handleChange(val) {
      console.log(val)
    },
    disableVisible() {
      console.log(this.$refs.statusSelect.visible)
      // this.visiblePop = false
      this.$refs.statusSelect.visible = false
      // console.log(this.$refs.statusSelect.visible)
    },

    onResize(x, y, width, height) {
      console.log(x, y, width, height)

      this.myChart.resize()
    },
    onDrag(x, y) {
      console.log(x, y)
    }
  },
  created() {},
  mounted() {
    this.initSvga()

    // 基于准备好的dom，初始化echarts实例
    this.myChart = this.$echarts.init(document.getElementById('main'))

    // 指定图表的配置项和数据
    const option = {
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option)
    this.myChart.resize()

    // window.onresize =
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;

  .drag {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
  }

  .svga {
    background-color: skyblue;
    width: 200px;
    height: 200px;
  }

  .cover {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }

  .cell {
    position: relative;
    display: flex;
  }
}

#main {
  width: 100%;
  height: 100%;
}

.parent {
  width: 500px;
  height: 500px;
  border: 1px solid black;
}
</style>
