<template>
  <el-input-number
    id="InputNumber"
    style="width: 100%"
    v-model="insideValue"
    v-bind="$attrs"
    :controls="controls"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'InputNumber',
  // 让父组件 v-model 传参
  model: {
    prop: 'numberValue',
    event: 'change'
  },
  props: {
    numberValue: {
      type: [Number, String],
      default: undefined
    },
    // 默认不显示控制按钮，这个可以根据实际情况做调整
    controls: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      insideValue: undefined
    }
  },
  watch: {
    numberValue(newVal) {
      // 若传入一个数字就显示。为空则不显示
      if (typeof newVal === 'number') {
        this.insideValue = newVal
      } else this.insideValue = undefined
    }
  }
}
</script>

<style lang="scss" scoped>
#InputNumber {
  ::v-deep .el-input__inner {
    text-align: left;
  }
}
</style>
