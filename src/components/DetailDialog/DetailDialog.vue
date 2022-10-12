<!--
  功能：对话框
  时间：2022年10月12日 09:06:35
  版本：v1.0
-->
<template>
  <el-dialog title="标题" :visible.sync="innerVisible" width="30%" v-dialogDrag>
    <p>弹窗内容</p>
  </el-dialog>
</template>

<script>
import vModelDialog from './vModelDialog'
export default {
  name: 'DetailDialog',
  mixins: [vModelDialog],
  model: {},
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
