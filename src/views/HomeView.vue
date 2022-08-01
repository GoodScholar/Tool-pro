<!--
  功能：Home
  时间：2022年07月28日 11:09:35
  版本：v1.0
-->
<template>
  <div class="home">
    <!--  @blur="selectBlur"
      @clear="selectClear"
      @change="selectChange" -->
    <el-select v-model="value" placeholder="请选择" multiple filterable>
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'HomeItem',
  props: {},
  components: {},
  data() {
    return {
      value: [],
      options: [
        {
          value: '无保留意见',
          label: '无保留意见'
        },
        {
          value: '保留意见',
          label: '保留意见'
        },
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
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    // selectBlur(e) {
    //   // 意见类型
    //   if (e.target.value !== '') {
    //     this.value = e.target.value + '(其他)'
    //     this.$forceUpdate()
    //   }
    // },
    // selectClear() {
    //   this.value = ''
    //   this.$forceUpdate()
    // },
    // selectChange(val) {
    //   console.log(val)
    //   // this.value = val
    //   this.$forceUpdate()
    // }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
::v-deep .el-select {
  width: 240px;
}
::v-deep .el-select__tags {
  max-width: 200px;
  overflow-x: scroll;
  flex-wrap: nowrap;
}
</style>
