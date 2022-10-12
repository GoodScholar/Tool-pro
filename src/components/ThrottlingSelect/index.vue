<template>
  <div :class="classId">
    <el-select
      popper-class="VisualSelects"
      @visible-change="popChange"
      v-model="selectValue"
      placeholder="请选择"
      :filter-method="filterMethod"
      filterable
      clearable
      :disabled="disabled"
      style="width: calc(98% - 20px)"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'ThrottlingSelect',
  model: {
    prop: 'value', // 绑定的值，通过父组件传递
    event: 'update' // 自定义名
  },
  props: {
    defaultFirst: {
      type: Boolean
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: Boolean
  },
  data() {
    return {
      newList: [],
      classId: 'unlimited',
      selectValue: '',
      options: [],
      domList: null,
      startIndex: 0,
      endIndex: 0,
      maxLength: 8, // 弹出框最大支持8个条目
      itemHeight: 34, // select组件选项高度
      maxHeightDom: 0 // 滚动条高度
    }
  },
  watch: {
    selectValue(val) {
      this.$emit('update', val)
      if (!val) {
        this.resetList()
        this.maxHeightDom.style.height = this.newList.length * 34 + 'px'
        this.domList.style.paddingTop = 0 + 'px'
      }
    },
    list() {
      this.resetList()
      this.init()
    }
  },
  mounted() {
    this.resetList()
    this.init()
  },
  methods: {
    addScrollDiv(selectDom) {
      this.maxHeightDom = document.createElement('div')
      this.maxHeightDom.style.width = 0
      selectDom.insertBefore(this.maxHeightDom, this.domList)
    },
    reCacularHeight() {
      this.maxHeightDom.style.height = (this.newList.length + 1) * 34 + 'px'
    },
    resetList(arrys) {
      if (Array.isArray(arrys)) {
        this.newList = arrys.slice()
      } else {
        this.newList = this.list.slice() // 筛选的数据
      }
      this.options = this.newList.slice(0, 8) // 显示的数据
    },
    init() {
      if (this.defaultFirst && this.list.length > 0) {
        // 默认第一个
        this.selectValue = this.list[0].value
      }

      const selectDom = document.querySelector(
        `.${this.classId} .el-select-dropdown .el-select-dropdown__wrap`
      )
      const slectBoxDom = document.querySelector(
        `.${this.classId} .el-select-dropdown__wrap`
      )
      slectBoxDom.style.display = 'flex'
      slectBoxDom.style.flexDirection = 'row'
      this.domList = selectDom.querySelector(
        `.${this.classId} .el-select-dropdown__wrap .el-select-dropdown__list`
      )
      this.addScrollDiv(slectBoxDom) // 添加一个滚动的div
      slectBoxDom.addEventListener('scroll', () => {
        this.reCacularHeight()
        const scrollTop = selectDom.scrollTop
        const startIndex = parseInt(scrollTop / 34)
        const endIndex = startIndex + 7
        this.domList.style.paddingTop = scrollTop + 'px'
        this.options = this.newList.slice(startIndex, endIndex)
      })
    },
    filterMethod(val) {
      if (val) {
        const arrys = this.list.filter((elem) => {
          return new RegExp(val).test(elem.label)
        }) // 多这部是性能上优化 请勿合并
        this.resetList(arrys)
      } else {
        this.resetList()
      }
      this.reCacularHeight()
    },
    popChange() {
      this.domList.style.paddingTop = 0 + 'px'
      if (!this.selectValue) {
        this.resetList()
      }
      this.reCacularHeight()
    }
  }
}
</script>
<style lang="scss">
.VisualSelects {
  .el-select-dropdown__list {
    width: 100%;
  }
  .el-select-dropdown__wrap {
    height: 255px;
  }
}
</style>
