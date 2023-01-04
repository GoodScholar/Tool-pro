<!--
  功能：可实现拖动布局、电子签章
  时间：2022年08月28日 15:14:57
  版本：v1.0
-->
<template>
  <div class="seal-container">
    <div class="header">
      <div class="header__left" @click="$router.push('/')">
        <img src="@/assets/imgs/G-icon.png" alt="" />
        <span class="header__left-title">Shadow</span>
      </div>
    </div>

    <div style="display: flex">
      <!-- 组件栏 -->
      <ul class="left">
        <li
          class="listItem mb"
          v-for="(item, index) in echartsArr"
          :key="index"
          draggable
          @dragstart="dragStart($event, item)"
          @dragend="dragEnd"
        >
          {{ item.name }}
        </li>
      </ul>

      <!-- 内容框 -->
      <div ref="center" class="center" @drop="dropDragDoM" @dragover.prevent>
        <vdr
          v-for="item in echartsShow"
          :key="item.id"
          :x="item.left"
          :y="item.top"
          :w="ecahrtsObj.width"
          :h="ecahrtsObj.height"
          :min-width="ecahrtsObj.minWidth"
          :min-height="ecahrtsObj.minHeight"
          :parent="true"
          :is-conflict-check="true"
          @resizing="onResize"
        >
          <div
            :span="item.style.span"
            :style="{
              marginTop: item.style.marginTop + 'px',
              marginBottom: item.style.marginBottom,
              marginLeft: item.style.marginLeft + 'px',
              marginRight: item.style.marginRight + 'px'
            }"
            @click="clickEchart(item)"
            class="ecahts__box"
          >
            <echarts-demo :options="item.option" :id="item.id" :xy="xy" />
          </div>
        </vdr>
      </div>

      <!-- 配置栏 -->
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import vdr from 'vue-draggable-resizable'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import echartsDemo from '../echarts/echarts copy'
export default {
  name: 'E-Seal',
  props: {},
  components: { vdr, echartsDemo },
  data() {
    return {
      // 拖拽组件基本配置
      ecahrtsObj: {
        ecahrtsX: 0,
        ecahrtsY: 0,
        width: 200,
        height: 200,
        minWidth: 200,
        minHeight: 200
      },
      // 传给组件，用于监听改变echarts自适应的中间值
      xy: 0,
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
      jsonEchart: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    onResize(x, y, width, height) {
      this.xy = width + height
      this.ecahrtsObj.ecahrtsX = x
      this.ecahrtsObj.ecahrtsY = y
    },
    // 开始拖动元素、将拖拽对象的参数传递给拖拽存放地
    dragStart(e, item) {
      e.dataTransfer.setData('item', JSON.stringify(item))
    },
    // 拖动结束
    dragEnd(e) {
      e.dataTransfer.clearData()
    },
    // 将拖拽的元素，释放在目标盒子中
    dropDragDoM(e) {
      // 获取拖拽对象的参数
      const arr = JSON.parse(e.dataTransfer.getData('item'))

      // 鼠标落点位置相对于当前拖拽存放地的 x y
      // arr.left = e.offsetX
      // arr.top = e.offsetY
      arr.left = e.layerX - 100
      arr.top = e.layerY - 100

      // 动态生成随机id
      arr.id = Math.random().toString(36).substr(2)
      this.jsonEchart = ''
      this.echartsShow.push(arr)
      this.$nextTick(() => {
        this.jsonEchart = JSON.stringify(arr.option)
      })
    },
    clickEchart(item) {}
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
:root {
  --width: 160px;
}

.seal-container {
  height: 100vh;
  width: 100vw;

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
    min-width: 200px;
    height: 90vh;
    border: 1px solid #000;
    padding: 20px;
    box-sizing: border-box;
  }
  .right {
    min-width: 300px;
    height: 90vh;
    background: skyblue;
    border: 1px solid #000;
  }
  .center {
    position: relative;
    height: 90vh;
    flex-grow: 1;
    overflow: auto;
    margin: 0 20px;
    border: 1px solid #000;
  }
}

.listItem {
  width: var(--width);
  height: 50px;
  line-height: 50px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #000;
  background: pink;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
}

.ecahts__box {
  height: 100%;
}
</style>
