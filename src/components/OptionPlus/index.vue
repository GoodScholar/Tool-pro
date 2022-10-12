<template>
  <el-option :style="`width: ${width}px`" v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-option>
</template>

<script>
export default {
  name: 'OptionPlus',
  props: {
    width: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select-dropdown__item {
  min-height: 35px;
  height: auto;
  white-space: initial;
  overflow: hidden;
  text-overflow: initial;
  line-height: 25px;
  padding: 5px 20px;
}
</style>
