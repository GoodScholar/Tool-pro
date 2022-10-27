<!--
  功能：低代码
  时间：2022年10月27日 09:20:17
  版本：v1.0
-->
<template>
  <div class="low-container">
    <div class="header">
      <div class="header__left">
        <img src="@/assets/imgs/G-icon.png" alt="" />
        <span class="header__left-title">Shadow</span>
      </div>
    </div>
    <el-row class="app-main">
      <el-col :span="4">
        <!-- 左侧组件栏 -->
        <app-left
          @com-dragend="onDragend"
          @com-select="
            (name) => {
              $refs.middle.addComponent(name)
            }
          "
        ></app-left>
      </el-col>
      <el-col :span="15">
        <!-- 中间面板栏 -->
        <app-middle
          ref="middle"
          @show-props="
            (item, elementItem) => {
              $refs.right.setItem(item, elementItem)
            }
          "
        ></app-middle>
      </el-col>
      <el-col :span="5">
        <!-- 右侧组件配置栏 -->
        <app-right
          ref="right"
          @change="
            (key, value) => {
              $refs.middle.changeProps(key, value)
            }
          "
          @item-change="
            (key, value) => {
              $refs.middle.changeItem(key, value)
            }
          "
        ></app-right>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AppLeft from './left.vue'
import AppRight from './right.vue'
import AppMiddle from './middle.vue'
export default {
  name: 'LowCode',
  components: { AppLeft, AppRight, AppMiddle },
  data() {
    return {}
  },
  methods: {
    onDragend() {
      this.$refs.middle.setDragging(false)
    }
  }
}
</script>
<style lang="scss" scoped>
.low-container {
  height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 30px;
  border-bottom: 1px solid #ccc;
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

.app-main {
  height: calc(100% - 80px);
  & > * {
    height: 100%;
  }
}
</style>
