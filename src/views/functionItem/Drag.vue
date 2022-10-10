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
      <!--  @change="$forceUpdate()" -->
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
  </div>
</template>

<script>
import SVGA from 'svgaplayerweb'

export default {
  name: 'DragItem',
  props: {},
  components: {},
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
      value: ''
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
    }
  },
  created() {},
  mounted() {
    this.initSvga()
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
    left: 0;
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
</style>
