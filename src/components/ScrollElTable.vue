<!--
  功能：基于el-table的二次封装  滚动Table
  时间：2022年08月18日 08:10:03
  版本：v1.0
-->
<template>
  <div class="elTable">
    <!--  :span-method="objectSpanMethod" -->
    <el-table
      :data="tableData"
      ref="table"
      style="width: 100%"
      :height="tableHeight"
      :header-cell-style="headerStyle"
      :cell-style="cellStyle"
      @row-click="handleClickChange"
      @mouseenter.native="mouseEnter"
      @mouseleave.native="mouseLeave"
    >
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）"></el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"></el-table-column>
      <template slot="empty">
        <span class="noData">暂无数据</span>
        <!-- <el-empty description="暂无数据"></el-empty> -->
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TestItem',
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 设置bodyWrapper高度
    setHeight: {
      type: Number,
      default: 288
    },
    // 表格头部样式
    headerStyle: {
      type: Object,
      default: () => {}
    },
    // 表格单元格的样式
    cellStyle: {
      type: Object,
      default: () => {}
    },

    // 是否开启滚动
    isScroll: {
      type: Boolean,
      default: false
    },
    // 是否开启斑马间隔纹
    isStripe: {
      type: Boolean,
      default: false
    },
    // 表格的滚动速度
    speed: {
      type: Number,
      default: 1
    },
    // 斑马纹的间隔
    interval: {
      type: Number,
      default: 6
    },
    // 默认滚动高度
    scrollHeight: {
      type: Number,
      default: 48
    }
  },
  components: {},
  data() {
    return {
      tableHeight: this.setHeight + 48 + 'px',
      // 向上滚动距离
      scrollTop: 0,
      // 定时器
      timer: null,
      // 滚动时间
      scrollSpeed: this.speed * 1000
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 自动循环播放
    autoScroll(speed, scrollTop = 48, currentTop = 0) {
      let top = currentTop
      const wrapper = this.$refs.table.bodyWrapper
      // console.log(wrapper.clientHeight + top, wrapper.scrollHeight)
      this.timer = setInterval(() => {
        if (wrapper.clientHeight + top > wrapper.scrollHeight) {
          top = wrapper.scrollTop = 0
        } else {
          this.scrollTop = top += scrollTop
          wrapper.scrollTo({
            top,
            behavior: 'smooth'
          })
        }
      }, speed)
    },
    // 鼠标移入
    mouseEnter() {
      clearInterval(this.timer)
    },
    // 鼠标移开
    mouseLeave() {
      // 清除定时器
      clearInterval(this.timer)

      if (this.isScroll && this.tableData.length > 6) {
        // 开始滚动table
        this.autoScroll(this.scrollSpeed, this.scrollHeight, this.scrollTop)
      }
    },
    // 行点击事件
    handleClickChange(row, event, column) {
      console.log('点击行', row.index, row, column, row.active)
    },
    // 修改斑马格样式
    tableRowClassName() {
      const rows = document.querySelectorAll('.el-table__row')

      for (let index = 0; index < rows.length; index++) {
        if (parseInt(index / this.interval) % 2 === 0) {
          rows[index].style.backgroundColor = 'pink'
        } else {
          rows[index].style.backgroundColor = 'skyblue'
        }
      }
    }
    // 合并列和行
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     if (rowIndex % this.interval === 0) {
    //       return {
    //         rowspan: this.interval,
    //         colspan: 1
    //       }
    //     } else {
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       }
    //     }
    //   }
    // }
  },
  created() {},
  mounted() {
    // 动态修改el-table__body的高度
    this.$refs.table.bodyWrapper.style.height = this.setHeight + 'px'

    if (this.isScroll && this.tableData.length > 6) {
      // 开始滚动table
      this.autoScroll(this.scrollSpeed)
    }

    this.tableRowClassName()
  }
}
</script>

<style lang="scss" scoped>
::v-deep.elTable {
  position: relative;

  // 设置表格行高度
  // ::v-deep .el-table__body tr,
  // ::v-deep .el-table__body td {
  //   padding: 0;
  //   height: 54px;
  // }

  // 修改hove行高亮颜色
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: transparent;
  }

  // 修改背景色、字体颜色
  // .el-table,
  // .el-table__expanded-cell,
  // .el-table th,
  // .el-table tr {
  //   background-color: rgba(7, 26, 36, 0.2);
  // }

  // .el-table__footer-wrapper tbody td {
  //   background-color: transparent;
  //   border: 1px solid transparent;
  //   color: #fff;
  // }

  // 去除table白线
  .el-table::before {
    height: 0px;
  }

  .el-table__empty-block {
    height: 50px !important;
  }
  .noData {
    text-align: center;
    color: #1988f7;
  }
}
</style>
