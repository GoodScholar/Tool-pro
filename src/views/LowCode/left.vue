<template>
  <div class="app-left">
    <div class="title">基础组件</div>

    <!-- <ul class="button__group"> -->
    <div
      v-for="(item, index) in componentList"
      :key="index"
      :data-component="item.component"
      class="button-item"
      draggable
      @dragstart="handleDragStart"
      @dragend="onDragend"
    >
      <el-button size="medium" @click="itemClick(item)">
        {{ item.label }}
      </el-button>
    </div>
    <!-- </ul> -->
  </div>
</template>

<script>
import UI from '@/contant/UI'
export default {
  name: 'LeftIndex',
  data() {
    return {
      componentList: UI
    }
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData('component', e.target.dataset.component)
    },
    onDragend() {
      this.$emit('com-dragend')
    },
    itemClick(item) {
      console.log(item)
      this.$emit('com-select', item.component)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-left {
  height: 100%;
  padding: 10px;
  overflow: auto;
}

// .button__group {
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
// }
.button-item {
  text-align: center;
  padding-top: 20px;
  // margin: 20px 14px 5px 0;
  // // background-color: #999;
  // min-width: calc((100% - 28px) / 2);
  // max-width: calc((100% - 28px) / 2);
  // &:nth-child(2n) {
  //   margin-right: 0;
  // }
}
</style>
