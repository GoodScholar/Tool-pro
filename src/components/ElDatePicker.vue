<!--
  功能：日期 时间选择框
  时间：2022年08月17日 11:13:50
  版本：v1.0
-->
<template>
  <div class="elDate">
    <el-date-picker
      v-model="selectDataOrTime"
      :type="dateType"
      :placeholder="placeholder"
      :style="{ width: changeWidthStyle }"
      :value-format="valueFormat"
      :format="showFormat"
      :picker-options="pickerDateOrTime"
      @change="changeDateOrTime"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    value: null, // null 表示任何类型
    placeholder: {
      type: String,
      default: ''
    },
    widthStyle: {
      type: Number,
      default: 265
    },
    dateType: {
      type: String,
      default: 'date'
    },
    pickerDateOrTime: {
      type: Object
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    showFormat: {
      type: String
    },
    isNeedInitial: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      selectDataOrTime: ''
    }
  },
  watch: {
    // selectDataOrTime(newVal) {
    //     console.log(newVal)
    // },
  },
  computed: {
    changeWidthStyle() {
      return this.widthStyle + 'px'
    }
  },
  methods: {
    changeDateOrTime(item) {
      this.$emit('input', item)
    }
  },
  created() {
    if (this.isNeedInitial) {
      this.selectDataOrTime = this.$util.formatTime(new Date(), 'yyyy-MM-dd')
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.elDate {
  height: 36px;
  ::v-deep .el-date-editor {
    height: 36px;
    background: rgba(16, 161, 221, 0);
    border: 1px solid rgba(16, 161, 221, 0.61);
    box-shadow: 0px 0px 29px 0px rgba(6, 70, 167, 0.72) inset;

    .el-input__suffix {
      background-color: transparent;
      height: 36px;
    }
    .el-input__inner {
      height: 36px;
      line-height: 36px;
      background: transparent;
      border: 1px solid transparent;
      color: #fff;
    }
    .el-input__prefix {
      top: -2px;
    }
  }

  .form__cell {
    @extend %flex-center-between;
    width: 312px;
  }
}
</style>

<style>
.el-select-dropdown {
  background: rgba(9, 39, 70, 0.83);
  border: 1px solid rgba(16, 161, 221, 0.6);
  box-shadow: 0px 0px 29px 0px rgba(6, 70, 167, 0.72);
  color: #fff;
}
.el-popper .el-select-dropdown__item {
  color: #fff;
}
.el-popper .el-select-dropdown__item.hover,
.el-popper .el-select-dropdown__item:hover {
  color: #fff;
  background-color: #305986;
}
.el-popper .popper__arrow {
  display: none;
  border-bottom-color: #0f63a0 !important;
}

.el-picker-panel {
  background: rgba(9, 39, 70, 0.83);
  border: 1px solid rgba(16, 161, 221, 0.6);
  box-shadow: 0px 0px 29px 0px rgba(6, 70, 167, 0.72);
  color: #fff;
}
.el-date-picker__header-label {
  color: #fff;
}

.el-picker-panel__icon-btn {
  color: #fff;
}
.el-year-table td .cell {
  color: #fff;
}
</style>
