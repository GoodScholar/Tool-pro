<!--
  功能：二次封装组件
  时间：2022年10月12日 10:06:38
  版本：v1.0
-->
<template>
  <div class="">
    <el-button type="primary" @click="detailVisible = true">
      点击打开 Dialog
    </el-button>

    <DetailDialog
      v-model="detailVisible"
      title="你好"
      width="40%"
      :center="true"
      @close="handleClose"
    >
      <p>弹窗内容</p>
    </DetailDialog>

    <hr />

    <InputNumber v-model="value" style="width: 200px" />

    <hr />

    <el-select v-model="selectVal" placeholder="请选择">
      <OptionPlus
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :width="400"
      ></OptionPlus>
    </el-select>

    <hr />
    <FormPlus
      :list="formList"
      @submitForm="searchPage"
      @resetForm="resetForm"
    />

    <hr />
    <throttling-select
      v-model="duoVal"
      :list="DuoOpt"
      placeholder="请选择数据"
      selKey="key"
      selLabel="label"
    ></throttling-select>

    <hr />
    <el-table
      :data="tableData"
      style="width: 100%"
      height="200px"
      v-init-scroll="Load"
    >
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import DetailDialog from '@/components/DetailDialog'
import InputNumber from '@/components/InputNumber'
import OptionPlus from '@/components/OptionPlus'
import FormPlus from '@/components/FormPlus'
import ThrottlingSelect from '../../components/ThrottlingSelect'
export default {
  name: 'SecondaryEncapsulation',
  props: {},
  components: {
    DetailDialog,
    InputNumber,
    OptionPlus,
    FormPlus,
    ThrottlingSelect
  },
  data() {
    return {
      detailVisible: false,
      value: null,
      selectVal: null,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶特别好吃，以顺德的最出名，推荐尝试'
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
      ],
      formList: [
        { label: '编号', model: 'applyNumber', placeholder: '请输入编号' },
        { label: '名称', model: 'name', placeholder: '请输入名称' },
        // {
        //   type: 'date-picker',
        //   label: '开始时间',
        //   model: 'startTime',
        //   valueFormat: 'yyyy-MM-dd HH:mm:ss',
        //   placeholder: '请选择开始时间'
        // },
        {
          type: 'select',
          label: '状态',
          model: 'status',
          placeholder: '请选择状态',
          options: []
        }
      ],
      duoVal: null,
      DuoOpt: [],
      tableData: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleClose() {
      this.detailVisible = false
    },
    // 可以取到子组件传递过来的数据
    searchPage(ruleForm) {
      console.log(ruleForm, 'ruleForm')
    },
    resetForm() {},
    Load() {}
  },
  created() {
    for (let i = 0; i < 10000; i++) {
      this.DuoOpt.push({
        value: i + 1,
        label: i + 1
      })
    }

    for (let i = 0; i < 100; i++) {
      this.tableData.push({
        date: '2016-05-02',
        name: `王小虎${i}`,
        address: '上海市普陀区金沙江路 1518 弄'
      })
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
