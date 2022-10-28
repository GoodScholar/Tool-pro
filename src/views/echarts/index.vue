<template>
  <div class="hello">
    <div class="header">
      <div class="header__left" @click="$router.push('/')">
        <img src="@/assets/imgs/G-icon.png" alt="" />
        <span class="header__left-title">Shadow</span>
      </div>
    </div>

    <div class="content__box">
      <!-- 组件栏 -->
      <div class="left">
        <vd
          :group="{ name: 'menu', pull: 'clone', put: false }"
          :sort="false"
          :list="echartsArr"
          @end="addOne"
          :clone="cloneArr"
        >
          <div
            v-for="(item, index) in echartsArr"
            :key="index"
            class="left-item"
          >
            <el-button>{{ item.name }}</el-button>
          </div>
        </vd>
      </div>

      <!-- 画板 -->
      <div class="middle">
        <div class="btn__cell">
          <el-button @click="echartsShow = []">清空</el-button>
          <el-button @click="saveEcharts">保存Echart</el-button>
          <el-button @click="seeRealEcharts">预览</el-button>
          <el-button @click="exportJSON">导出JSON</el-button>
        </div>
        <vd group="menu" :animation="340" :list="echartsShow" class="vd-box">
          <el-col
            v-for="(item, index) in echartsShow"
            :key="index"
            :span="item.style.span"
            :style="{
              marginTop: item.style.marginTop + 'px',
              marginBottom: item.style.marginBottom,
              marginLeft: item.style.marginLeft + 'px',
              marginRight: item.style.marginRight + 'px'
            }"
          >
            <div @click="clickEchart(item)">
              <echarts-demo
                :options="item.option"
                :span="item.style.span"
                :height="item.height"
                :id="item.id"
              />
            </div>
          </el-col>
        </vd>
      </div>

      <!-- 配置栏 -->
      <div class="right">
        <el-tabs v-model="activeName">
          <el-tab-pane label="组件" name="zujian">
            <el-form v-if="jsonEchart" label-position="top">
              <el-form-item label="ID">
                <el-input
                  v-model="currentEchart.id"
                  style="width: 80%"
                  :disabled="false"
                />
              </el-form-item>
              <el-form-item label="图表名称">
                <el-input
                  v-model="currentEchart.option.title.text"
                  @blur="handleName"
                  style="width: 80%"
                />
              </el-form-item>
              <el-form-item label="高度">
                <el-input-number v-model="currentEchart.height" />
              </el-form-item>
              <el-form-item label="栅格宽度">
                <el-input-number v-model="currentEchart.style.span" />
              </el-form-item>
              <el-form-item label="外边距">
                <el-row>
                  上
                  <el-input-number v-model="currentEchart.style.marginTop" />
                </el-row>
                <el-row>
                  下
                  <el-input-number v-model="currentEchart.style.marginBottom" />
                </el-row>
                <el-row>
                  左
                  <el-input-number v-model="currentEchart.style.marginLeft" />
                </el-row>
                <el-row>
                  右
                  <el-input-number v-model="currentEchart.style.marginRight" />
                </el-row>
              </el-form-item>
            </el-form>
            <el-empty v-if="!jsonEchart" description="暂无数据"></el-empty>
          </el-tab-pane>
          <el-tab-pane label="Echart" name="echart">
            <el-button @click="drawer = true">更改数据</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-drawer :visible.sync="drawer" :size="400" ref="editDrawer" v-drawerDrag>
      <template #title>
        <div>
          <span style="padding-right: 30px">Echart图表数据</span>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
      </template>
      <!-- 主题   dracula -->
      <b-code-editor
        ref="editor"
        v-if="jsonEchart"
        v-model="jsonEchart"
        theme="rubyblue"
        height="600px"
        :auto-format="true"
        :smart-indent="true"
        :indent-unit="2"
        :line-wrap="true"
      />
    </el-drawer>

    <el-dialog title="预览" :visible.sync="seeEcharts" width="60%">
      <el-row>
        <el-col
          v-for="(item, index) in echartsShow"
          :key="index"
          :span="item.style.span"
          :style="{
            marginTop: item.style.marginTop + 'px',
            marginBottom: item.style.marginBottom,
            marginLeft: item.style.marginLeft + 'px',
            marginRight: item.style.marginRight + 'px'
          }"
        >
          <echarts-demo
            v-if="seeEcharts"
            :options="item.option"
            :span="item.style.span"
            :height="item.height"
            :id="item.id"
          />
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import vd from 'vuedraggable'
import FileSaver from 'file-saver'
import echartsDemo from './echarts'
export default {
  name: 'EchartsIndex',
  components: { vd, echartsDemo },
  data() {
    return {
      activeName: 'zujian',
      echartsArr: [
        // 柱状图
        {
          name: '柱状图',
          id: 'zzt',
          option: {
            title: {
              text: '柱状图',
              left: 'center'
            },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
                }
              }
            ]
          },
          style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
          },
          height: 300
        },
        // 折线图
        {
          name: '折线图',
          id: 'zxt',
          style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
          },
          option: {
            title: {
              text: '折线图',
              left: 'center'
            },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
              }
            ]
          },
          height: 300
        },
        // 饼图
        {
          name: '饼图',
          id: 'bt',
          style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
          },
          option: {
            title: {
              text: '饼图',
              subtext: 'Fake Data',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                  { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          },
          height: 300
        },
        // 折柱混合图
        {
          name: '折柱混合图',
          id: 'zzhh',
          style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
          },
          option: {
            title: {
              text: '折柱混合图',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            legend: {
              data: ['Evaporation', 'Precipitation', 'Temperature'],
              left: 'left'
            },
            xAxis: [
              {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: 'Precipitation',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                  formatter: '{value} ml'
                }
              },
              {
                type: 'value',
                name: 'Temperature',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                  formatter: '{value} °C'
                }
              }
            ],
            series: [
              {
                name: 'Evaporation',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' ml'
                  }
                },
                data: [
                  2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0,
                  6.4, 3.3
                ]
              },
              {
                name: 'Precipitation',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' ml'
                  }
                },
                data: [
                  2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8,
                  6.0, 2.3
                ]
              },
              {
                name: 'Temperature',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' °C'
                  }
                },
                data: [
                  2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0,
                  6.2
                ]
              }
            ]
          },
          height: 300
        },
        // 雷达图
        {
          name: '雷达图',
          id: 'ldt',
          style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
          },
          option: {
            title: {
              text: 'Basic Radar Chart'
            },
            legend: {
              data: ['Allocated Budget', 'Actual Spending']
            },
            radar: {
              // shape: 'circle',
              indicator: [
                { name: 'Sales', max: 6500 },
                { name: 'Administration', max: 16000 },
                { name: 'Information Technology', max: 30000 },
                { name: 'Customer Support', max: 38000 },
                { name: 'Development', max: 52000 },
                { name: 'Marketing', max: 25000 }
              ]
            },
            series: [
              {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                  {
                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                    name: 'Allocated Budget'
                  },
                  {
                    value: [5000, 14000, 28000, 26000, 42000, 21000],
                    name: 'Actual Spending'
                  }
                ]
              }
            ]
          },
          height: 300
        },
        // 环形图
        {
          name: '环形图',
          id: 'hxt',
          style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
          },
          option: {
            tooltip: {
              trigger: 'item'
            },
            title: {
              text: 'Basic Radius Chart'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                  { value: 300, name: 'Video Ads' }
                ]
              }
            ]
          },
          height: 300
        },
        // 南丁格尔玫瑰图
        {
          name: '南丁格尔玫瑰图',
          id: 'ndgrmgt',
          style: {
            marginTop: '0',
            marginBottom: '0',
            marginLeft: '0',
            marginRight: '0',
            span: 24
          },
          option: {
            title: {
              text: 'Basic Radius Chart'
            },
            legend: {
              top: 'bottom'
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            series: [
              {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 150],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8
                },
                data: [
                  { value: 40, name: 'rose 1' },
                  { value: 38, name: 'rose 2' },
                  { value: 32, name: 'rose 3' },
                  { value: 30, name: 'rose 4' },
                  { value: 28, name: 'rose 5' },
                  { value: 26, name: 'rose 6' },
                  { value: 22, name: 'rose 7' },
                  { value: 18, name: 'rose 8' }
                ]
              }
            ]
          },
          height: 300
        }
      ],
      echartsShow: [],
      currentEchart: '',
      jsonEchart: '',
      oneId: '',
      drawer: false,
      seeEcharts: false
    }
  },
  mounted() {
    // vuedraggle 拖拽在火狐浏览器的阻断
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  methods: {
    addOne() {
      console.log(134)
    },
    cloneArr(e) {
      console.log(e)
      const arr = JSON.parse(JSON.stringify(e))
      // 动态生成随机id
      arr.id = Math.random().toString(36).substr(2)
      this.oneId = JSON.parse(JSON.stringify(arr.id))

      this.jsonEchart = ''
      this.echartsShow.push(arr)
      this.currentEchart = arr
      this.$nextTick(() => {
        this.jsonEchart = JSON.stringify(arr.option)
      })
    },
    clickEchart(item) {
      console.log(item)
      this.jsonEchart = ''
      this.currentEchart = item
      this.oneId = JSON.parse(JSON.stringify(item.id))
      this.activeName = 'zujian'
      this.$nextTick(() => {
        this.jsonEchart = JSON.stringify(item.option)
      })
    },
    // 检测json格式
    isJSON(str) {
      if (typeof str === 'string') {
        try {
          const obj = JSON.parse(str)
          if (typeof obj === 'object' && obj) {
            return true
          } else {
            return false
          }
        } catch (e) {
          return false
        }
      } else if (typeof str === 'object' && str) {
        return true
      }
    },
    onSubmit() {
      if (!this.isJSON(this.jsonEchart)) {
        this.$message.error('json格式错误')
        return false
      }
      this.echartsShow.forEach((item) => {
        if (item.id === this.oneId) {
          item.option = JSON.parse(this.jsonEchart)
        }
      })
      this.$message.success('json格式正确')
    },
    // 更改名称
    handleName() {
      this.jsonEchart = ''
      this.$nextTick(() => {
        this.jsonEchart = JSON.stringify(this.currentEchart.option)
        console.log(this.jsonEchart)
      })
    },
    // 保存echarts图
    saveEcharts() {
      if (this.echartsShow.length > 0) {
        this.$message.success('暂无数据')
      }

      this.$message.warning('暂无数据')
    },
    // 导出JSON
    exportJSON() {
      if (this.echartsShow.length > 0) {
        const data = JSON.stringify(this.echartsShow, null, 2)
        const name = 'Echart' + new Date().getTime() + '.json'
        console.log(new Date('month dd,yyyy hh:mm:ss'), 1111)
        const blob = new Blob([data], { type: '' })
        FileSaver.saveAs(blob, name)
      }

      this.$message.warning('暂无数据')
    },
    seeRealEcharts() {
      if (this.echartsShow.length > 0) {
        return (this.seeEcharts = true)
      }

      this.$message.warning('暂无数据')
    }
  }
}
</script>

<style lang="scss" scoped>
.hello {
  width: 100%;
  height: 100vh;
}

.content__box {
  display: flex;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 30px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  .header__left {
    display: flex;
    align-items: center;

    img {
      width: 40px;
    }

    .header__left-title {
      font-size: 23px;
      font-weight: bold;
      padding-left: 20px;
    }
  }
}

.left {
  width: 140px;
  height: 100%;
  padding: 0 15px;
  overflow-y: auto;

  .left-item {
    text-align: center;
    margin-top: 20px;
  }
}

.right {
  width: 300px;
  height: 100%;
  padding: 0 15px;
  overflow-y: auto;
}

.middle {
  flex: 1;
  height: 100%;

  .btn__cell {
    padding: 10px 0;
  }
}
.middle > div {
  /*min-height: 200px;*/
  width: 100%;
}
.CodeMirror {
  font-family: monospace;
  height: 800px !important;
  color: black;
  direction: ltr;
}

.vd-box {
  width: 100%;
  height: 90%;
  overflow-y: auto;
  border: 1px solid #47b347;
}

::v-deep .el-drawer__body {
  padding: 0 20px;
}

::v-deep .CodeMirror {
  height: 100%;
}
</style>
