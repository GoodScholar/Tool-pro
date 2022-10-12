<!--
  功能：首页
  时间：2022年10月09日 13:37:04
  版本：v1.0
-->
<template>
  <el-container>
    <el-header>
      <span class="logo__cell">
        <img src="@/assets/imgs/logo.png" class="logo" alt="" />
        <span class="logo-title">Management</span>
      </span>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          router
          :collapse="isCollapse"
        >
          <el-menu-item
            :index="item.path"
            v-for="(item, index) in menu"
            :key="index"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import constant from './constant'
export default {
  name: 'layoutIndex',
  props: {},
  components: {},
  data() {
    return {
      menu: [],
      activeIndex: this.$route.path ?? '/panorama',
      isCollapse: false
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    this.menu = constant.menu
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #fff;
  color: #333;
  @extend %flex-center-between;

  .logo__cell {
    @extend %flex-center-center;

    .logo {
      width: 40px;
    }

    .logo-title {
      padding-left: 20px;
      color: #31adee;
      font-size: 24px;
      font-weight: bold;
    }
  }
}

.el-aside {
  height: 92vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100vh;
  overflow: auto;
}
</style>
