<!--
  功能：季度组件
  时间：2022年10月12日 14:35:01
  版本：v1.0
-->
<template>
  <div>
    <el-popover placement="bottom" width="270" trigger="click">
      <div class="el-date-picker__header">
        <button
          type="button"
          aria-label="前一年"
          class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
          @click="prev"
        />
        <span role="button" class="el-date-picker__header-label">
          {{ year }}年
        </span>
        <button
          type="button"
          aria-label="后一年"
          class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
          @click="next"
        />
      </div>
      <div style="margin: 10px; height: 65px" class="flex-two-row">
        <template v-for="(item, index) in quarterList">
          <el-button
            class="m10 btn"
            style=""
            :class="[
              currentSeason === index + 1 && year === currentYear
                ? 'currentBtn'
                : '',
              `${year} 年 ${item.name}` === showValue ? 'selectBtn' : ''
            ]"
            :key="item.name + year"
            type="text"
            size="medium"
            :disabled="
              year > currentYear ||
              (year === currentYear && currentSeason < index + 1)
            "
            @click="selectSeason(index, item)"
          >
            {{ item.name }}
          </el-button>
        </template>
      </div>
      <!-- input框     -->
      <el-input slot="reference" v-model="showValue" placeholder="选择季度">
        <i slot="prefix" class="el-input__icon el-icon-date" />
      </el-input>
    </el-popover>
  </div>
</template>

<script>
import * as moment from 'moment'
export default {
  name: 'QuarterDate',
  props: {},
  data() {
    return {
      // 按钮数组定义
      quarterList: [
        { month: '01', name: '第一季度', monthRange: [1, 2, 3] },
        { month: '04', name: '第二季度', monthRange: [4, 5, 6] },
        { month: '07', name: '第三季度', monthRange: [7, 8, 9] },
        { month: '10', name: '第四季度', monthRange: [10, 11, 12] }
      ],
      year: new Date().getFullYear(), // input显示时间，会随着用户操作改变
      currentYear: new Date().getFullYear(), // 当前年份，不变
      month: new Date().getMonth() + 1, // 当前月份，不变
      season: '', // 获取当前季度
      currentSeason: '', // 获取当前季度
      selectName: '',
      showValue: '' // input框上绑定的数据
    }
  },
  watch: {},
  created() {},
  mounted() {
    // 获取当前季度
    this.currentSeason = moment().quarter()
    this.getDefaultTime()
  },
  methods: {
    /** 上一年 */
    prev() {
      this.year = this.year * 1 - 1
    },
    /** 下一年 */
    next() {
      this.year = this.year * 1 + 1
    },
    /** 触发当前的季度 */
    selectSeason(i, item) {
      const that = this
      that.season = i + 1
      this.showValue = `${this.year} 年 ${item.name}`
      const obj = {
        year: this.year,
        item: item,
        season: that.season
      }
      that.$emit('chooseSeason', obj) // 每次选择时间都将当前选择时间发送到父组件
    },
    // 当前默认时间,展示昨日所在季度
    getDefaultTime() {
      const yestoday = moment().subtract(1, 'days').format('YYYY-MM-DD') // 获取昨日日期
      const yeatodySeason = moment(yestoday).quarter() // 获取昨日所在季度
      this.season = yeatodySeason
      this.showValue = `${this.year} 年 ${
        this.quarterList[yeatodySeason - 1].name
      }`
      const obj = {
        year: this.year,
        item: this.quarterList[yeatodySeason - 1],
        season: this.season
      }
      this.$emit('chooseSeason', obj) // 每次选择时间都将当前选择时间发送到父组件
    }
  }
}
</script>

<style lang="scss" scoped>
.btn.el-button--text {
  display: inline-block;
  color: #606266;

  width: 45%;
  font-size: 14px;
  margin-top: 10px;
  &:hover {
    color: #409eff;
  }
  &.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
  &.selectBtn {
    color: #409eff;
  }
  &.selectBtn:hover {
    color: #409eff !important;
  }
  &.currentBtn {
    color: #409eff;
    font-weight: bold;
    &:hover {
      color: #409eff;
      font-weight: bold;
    }
  }
}
</style>

<style lang="scss" scoped></style>
