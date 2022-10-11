<!--
  功能：渐变色进度条组件
  时间：2022年10月11日 09:28:25
  版本：v1.0
-->
<template>
  <div class="progress">
    <el-progress type="line" :percentage="obj.value" :class="showProgressColor">
      {{ obj.value }}
    </el-progress>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default() {
        return {
          value: 0,
          status: '失败'
        }
      }
    }
  },
  data() {
    return {
      showProgressColor: 'el-bg-inner-running'
    }
  },
  mounted() {
    this.changeStatus(this.obj.status) // 设置进度条渐变颜色
  },
  methods: {
    changeStatus(val) {
      if (val === '进行中') {
        this.showProgressColor = 'el-bg-inner-running'
      } else if (val === '失败') {
        this.showProgressColor = 'el-bg-inner-error'
      } else if (val === '完成') {
        this.showProgressColor = 'el-bg-inner-done'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  width: 500px;
  height: 20px;
  /* 这里的背景颜色设置是为了显著的看到效果，实际开发中，作为组件会放在一个容器中，这个容器会自带背景的，如果项目中涉及到主题颜色的切换，那么可以设置符合主题的颜色 */
  /* background-color: rgba(3,22,37,.85); */
  padding-left: 10px;
}

.progress ::v-deep.el-progress__text {
  color: #fff;
  font-size: 14px;
}
.progress ::v-deep.el-progress-bar__outer {
  height: 12px !important;
  border: 1px solid #78335f;
  background-color: transparent;
}

/* 渐变进度条 */
/* 有时候涉及到自定义的样式比较多，而且相同的组件用的也多，那么可以在组件的样式前面加一个自定义的class类名。*/
/* 以进度条为例，我自定义组件下的进度条用到的element-ui的el-progress，我给它加了一个.progress的类名*/
/* 那么其他地方再用到element-ui的el-progress时，那么我给其他地方的el-progress设置样式的时候，就不会影响到我现在的自定义进度条组件中的el-progress了 */
.progress ::v-deep .el-bg-inner-running .el-progress-bar__inner {
  background-color: unset;
  background-image: linear-gradient(to right, #3587d8, #6855ff);
}
.progress ::v-deep .el-bg-inner-error .el-progress-bar__inner {
  background-image: linear-gradient(to right, #3587d8, #fb3a7e);
}
.progress ::v-deep .el-bg-inner-done .el-progress-bar__inner {
  background-image: linear-gradient(to right, #3587d8, #53ff54);
}
</style>
