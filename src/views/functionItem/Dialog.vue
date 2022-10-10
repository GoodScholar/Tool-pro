<!--
  功能：功能描述
  时间：2022年08月08日 09:42:55
  版本：v1.0
-->
<template>
  <div class="">
    <el-button type="primary" @click="centerDialogVisible = true">
      点击打开 Dialog
    </el-button>

    <!-- <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      v-dialogDrag
    >
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog> -->

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      :before-close="handleClose"
      v-dialogDrag
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogItem',
  props: {},
  components: {},
  data() {
    return {
      centerDialogVisible: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleClose() {}
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
