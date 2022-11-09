<!--
  功能：表格列表
  时间：2022年11月07日 13:31:22
  版本：v1.0
-->

<template>
  <div class="elTable">
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      ref="table"
      :header-cell-style="headerStyle"
      :cell-style="cellStyle"
      :data="tableData"
      :style="{ width: '100%' }"
      stripe
      :row-style="{ background: 'transparent' }"
    >
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="index"
        :header-align="item.align"
        :align="item.align"
        :prop="item.prop"
        :label="item.name"
        :width="item.width"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TestItem',
  props: {
    tableHeader: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {
      headerStyle: {
        backgroundColor: 'rgba(33, 63, 230, 0.3)',
        color: '#A2B4F3',
        fontSize: '16px',
        borderColor: 'transparent'
      },
      cellStyle: {
        color: '#fff',
        fontSize: '14px',
        borderColor: 'transparent'
      }
    }
  },
  watch: {
    tableData: {
      handler() {},
      deep: true
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
::v-deep.elTable {
  position: relative;
  background: linear-gradient(
    to bottom,
    rgba($color: #262e51, $alpha: 0.38) 0%,
    rgba($color: #21469f, $alpha: 0.38) 100%
  );
  border: 1px solid #6b7ed3;
  border-radius: 5px;

  .el-table,
  .el-table__expanded-cell,
  .el-table th,
  .el-table tr {
    background-color: transparent;
  }

  .el-table__row {
    cursor: pointer;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: transparent;
  }

  .el-table--striped
    .el-table__body
    tr.el-table__row--striped.el-table__row--striped.el-table__row--striped
    td {
    background: rgba(86, 145, 208, 0.3);
  }

  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
  }

  .el-table__empty-text {
    color: #ffea45;
  }

  .el-table::before {
    //去除底部白线
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
  }

  &:empty::before {
    content: '--';
    color: #fff;
  }
}
</style>
