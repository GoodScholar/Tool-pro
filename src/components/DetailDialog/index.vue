<!--
  功能：拖拽对话框
  时间：2022年10月12日 09:06:35
  版本：v1.0
-->
<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="innerVisible"
    :width="width"
    :center="center"
    :before-close="handleClose"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
import vModelDialog from './vModelDialog'
export default {
  name: 'DetailDialog',
  mixins: [vModelDialog],
  props: {},
  components: {},
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
