<!--
  功能：功能描述
  时间：2022年08月17日 20:43:45
  版本：v1.0
-->
<template>
  <div class="background">
    <div class="topTitle">
      <el-table>
        <el-table-column label="日期"></el-table-column>
        <el-table-column label="姓名"></el-table-column>
        <el-table-column label="地址"></el-table-column>
      </el-table>
    </div>

    <div class="scrollBox">
      <VueScroll :data="listData" :class-option="optionHover" class="warp">
        <el-table
          :data="listData"
          border
          :show-header="status"
          :header-cell-style="headerStyle"
          :cell-style="cellStyle"
        >
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="title" label="姓名"></el-table-column>
          <el-table-column prop="test" label="地址"></el-table-column>
        </el-table>
      </VueScroll>
    </div>
  </div>
</template>

<script>
import VueScroll from '@/components/VueScroll'
export default {
  components: { VueScroll },
  data() {
    return {
      status: false,
      headerStyle: {
        backgroundColor: 'transparent',
        color: '#00F6FF',
        fontSize: '12px',
        borderColor: 'transparent'
      },
      cellStyle: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
        fontSize: '14px',
        color: '#fff'
      },
      listData: [
        {
          title: '无缝滚动第一行无缝滚动第一行',
          date: '2017-12-16',
          test: '测试',
          test2: '测试2',
          test3: '测试3'
        },
        {
          title: '无缝滚动第二行无缝滚动第二行',
          date: '2017-12-16',
          test: '测试',
          test2: '测试2',
          test3: '测试3'
        },
        {
          title: '无缝滚动第三行无缝滚动第三行',
          date: '2017-12-16',
          test: '测试',
          test2: '测试2',
          test3: '测试3'
        },
        {
          title: '无缝滚动第四行无缝滚动第四行',
          date: '2017-12-16',
          test: '测试',
          test2: '测试2',
          test3: '测试3'
        },
        {
          title: '无缝滚动第五行无缝滚动第五行',
          date: '2017-12-16',
          test: '测试',
          test2: '测试2',
          test3: '测试3'
        },
        {
          title: '无缝滚动第六行无缝滚动第六行',
          date: '2017-12-16',
          test: '测试',
          test2: '测试2',
          test3: '测试3'
        },
        {
          title: '无缝滚动第七行无缝滚动第七行',
          date: '2017-12-16',
          test: '测试',
          test2: '测试2',
          test3: '测试3'
        },

        {
          title: '无缝滚动第七行无缝滚动第八行',
          date: '2017-12-16',
          test: '测试',
          test2: '测试2',
          test3: '测试3'
        },
        {
          title: '无缝滚动第七行无缝滚动第九行',
          date: '2017-12-16',
          test: '测试',
          test2: '测试2',
          test3: '测试3'
        },
        {
          title: '无缝滚动第七行无缝滚动第十行',
          date: '2017-12-16',
          test: '测试',
          test2: '测试2',
          test3: '测试3'
        }
      ]
    }
  },
  computed: {
    optionHover() {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: this.listData.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        singleHeight: 48, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.background {
  position: relative;
  width: 100%;

  .topTitle {
    ::v-deep .el-table__empty-block {
      display: none;
    }
  }

  .scrollBox {
    ::v-deep .warp {
      height: 480px;
      width: 100%;
      margin: 0 auto;
      overflow: hidden;

      .el-table,
      .el-table__expanded-cell,
      .el-table th,
      .el-table tr {
        background-color: rgba(7, 26, 36, 0.2);
      }
    }
  }
}

// 去除table白线
.el-table::before {
  height: 0px;
}

// 去除边框
.el-table--border,
.el-table--group {
  border: none;
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
