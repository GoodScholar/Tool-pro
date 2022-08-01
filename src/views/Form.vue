<!--
  功能：动态表单
  时间：2022年08月01日 09:51:39
  版本：v1.0
-->
<template>
  <div class="">
    <el-form
      :label-position="labelPosition"
      :ref="form"
      :model="form"
      label-width="120px"
      :inline="true"
    >
      <el-col :span="20">
        <el-form-item
          label="采购类型："
          prop="goods_type"
          :rules="rules.goods_type"
        >
          <el-select
            v-model="form.goods_type"
            placeholder="请选择"
            @change="queryApprove"
          >
            <el-option
              v-for="option in typeOptions"
              :key="option.Value"
              :label="option.Text"
              :value="option.Value"
            ></el-option>
          </el-select>
        </el-form-item>

        <div v-for="(item, index) in form.purchase_list" :key="index">
          <el-form-item
            label="物品名称："
            prop="goods_type"
            :rules="rules.goods_type"
          >
            <el-select
              v-model="item.goods_name"
              placeholder="请选择"
              @change="queryApprove"
            >
              <el-option
                v-for="option in typeOptions"
                :key="option.Value"
                :label="option.Text"
                :value="option.Value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="物品单价："
            :prop="'purchase_list.' + index + '.goods_price'"
            :rules="rules.goods_price"
          >
            <el-input :min="0.1" v-model="item.goods_price"></el-input>
          </el-form-item>
          <el-form-item
            label="数量："
            :prop="'purchase_list.' + index + '.goods_qty'"
            :rules="rules.goods_qty"
          >
            <el-input :min="1" v-model="item.goods_qty"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="text"
              @click="deleteItems(item, index)"
              icon="el-icon-delete"
              v-show="index > 0"
            >
              删除
            </el-button>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button
            type="text"
            @click="addItem"
            style="position: relative; left: 120px"
          >
            <i class="el-icon-circle-plus"></i>
            新增采购物品
          </el-button>
        </el-form-item>
        <el-form-item
          label="采购事由："
          prop="purchase_reason"
          :rules="rules.purchase_reason"
          style="display: block"
        >
          <el-input
            type="textarea"
            :rows="4"
            v-model="form.purchase_reason"
            placeholder="请输入申请理由"
            style="width: 493px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="审批人："
          prop="approve_person"
          :rules="rules.approve_person"
        >
          <el-select v-model="form.approve_person" placeholder="请选择">
            <el-option
              v-for="item in approveOptions"
              :key="item.PersonId"
              :label="item.Name"
              :value="item.PersonId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display: block; position: relative; left: 120px">
          <el-button class="submit-button" @click="submitForm(form)">
            提交
          </el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  props: {},
  components: {},
  data() {
    return {
      form: {
        goods_type: '',
        purchase_list: [
          {
            goods_name: '',
            goods_price: '',
            goods_qty: ''
          }
        ],
        purchase_reason: '',
        approve_person: ''
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入采购物品名称', trigger: 'blur' }
        ],
        goods_type: [
          { required: true, message: '请选择采购物品类型', trigger: 'change' }
        ],
        purchase_reason: [
          { required: true, message: '请输入采购事由', trigger: 'blur' },
          {
            min: 10,
            max: 200,
            message: '长度在 10 到 200 个字符',
            trigger: 'blur'
          }
        ],
        goods_price: [{ required: true, message: '请输入采购物品单价' }],
        goods_qty: [{ required: true, message: '请输入采购物品数量' }],
        approve_person: [
          { required: true, message: '请选择审批人', trigger: 'change' }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    /* 动态新增表单项 */
    addItem() {
      this.form.purchase_list.push({
        goods_name: '',
        goods_price: '',
        goods_qty: ''
      })
    },
    /* 删除新增的表单项 */
    deleteItems(item, index) {
      this.index = this.form.purchase_list.indexOf(item)
      if (index !== -1) {
        this.form.purchase_list.splice(index, 1)
      }
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
