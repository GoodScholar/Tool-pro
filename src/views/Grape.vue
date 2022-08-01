<!--
  功能：grape
  时间：2022年07月19日 08:30:33
  版本：v1.0
-->
<template>
  <div class="container">
    <div class="myChart" ref="myChart"></div>
  </div>
</template>

<script>
export default {
  name: 'GrapeItem',
  props: {},
  components: {},
  data() {
    return {
      chartInstance: null,
      dataArr: [
        {
          image_name: 'CentOS-7.7.1908-x64-desktop',
          name: '123456'
        },
        {
          image_name: '123456',
          name: '222222'
        },
        {
          image_name: 'hgjghjghjghj',
          name: '67676767'
        },
        {
          image_name: '是特殊',
          name: '9违法及无服务范围'
        },
        {
          image_name: 'jhhj',
          name: 'hgjghjghjghj'
        },
        {
          image_name: '222222',
          name: 'jhhj'
        },
        {
          image_name: 'hgjghjghjghj',
          name: '大青蛙多'
        },
        {
          image_name: 'jhhj',
          name: '是特殊'
        },
        {
          image_name: 'hgjghjghjghj',
          name: '页股份英文歌'
        }
      ],
      listData: [],
      arrData: [
        {
          name: '初始镜像',
          x: 100,
          y: 0
        },
        {
          name: 'Kuai1',
          x: 100,
          y: 100
        },
        {
          name: '艾佛i那时的佛i就爱上对方',
          x: 200,
          y: 100
        },
        {
          name: '快照7642',
          x: 200,
          y: 200
        },
        {
          name: '1',
          x: 200,
          y: 300
        },
        {
          name: 'bannnnn',
          x: 300,
          y: 300
        },
        {
          name: '7587',
          x: 300,
          y: 400
        }
      ],
      line: [
        // {
        //   source: '初始镜像',
        //   target: 'Kuai1'
        // },
        // {
        //   source: '初始镜像',
        //   target: '艾佛i那时的佛i就爱上对方'
        // },
        // {
        //   source: '艾佛i那时的佛i就爱上对方',
        //   target: '快照7642'
        // },
        // {
        //   source: '快照7642',
        //   target: '1'
        // },
        // {
        //   source: '快照7642',
        //   target: 'bannnnn'
        // },
        // {
        //   source: 'bannnnn',
        //   target: '7587'
        // }
        // {
        //   source: '初始镜像',
        //   target: '123456'
        // },
        // {
        //   source: 'CentOS-7.7.1908-x64-desktop',
        //   target: '123456'
        // },
        // {
        //   source: '123456',
        //   target: '222222'
        // },
        // {
        //   source: 'hgjghjghjghj',
        //   target: '67676767'
        // },
        // {
        //   source: '是特殊',
        //   target: '9违法及无服务范围'
        // },
        // {
        //   source: 'jhhj',
        //   target: 'hgjghjghjghj'
        // },
        // {
        //   source: '222222',
        //   target: 'jhhj'
        // },
        // {
        //   source: 'hgjghjghjghj',
        //   target: '大青蛙多'
        // },
        // {
        //   source: 'jhhj',
        //   target: '是特殊'
        // },
        // {
        //   source: 'hgjghjghjghj',
        //   target: '页股份英文歌'
        // }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    initChart() {
      this.$echarts.init(this.$refs.myChart, null).dispose()
      this.chartInstance = this.$echarts.init(this.$refs.myChart, null)

      const initOption = {
        title: {
          text: 'Basic Graph'
        },
        // tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            name: '123123',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: this.listData,
            links: this.line,
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        ]
      }

      if (initOption && typeof initOption === 'object') {
        this.chartInstance.setOption(initOption)
      }

      this.chartInstance.on('click', (param) => {
        console.log('param---->', param)
        this.updateChart(param.dataIndex)
      })
    },
    getData() {
      // this.updateChart()

      this.toTree(this.dataArr)
    },
    updateChart(index) {
      // 处理图表需要的数据
      // const legendData = {}
      // const seriesData = {}

      // const list = this.arrData.find((item) => {
      //   return item.name === index
      // })
      // console.log(list)

      if (index !== 0) {
        this.arrData.splice(index, 1)
      } else {
        return false
      }
      // const dataOption = {
      //   // legend: {
      //   //   data: legendData
      //   // },
      //   series: [
      //     {
      //       data: this.infoData.splice(index, 1)
      //     }
      //   ]
      // }

      // console.log(dataOption)
      this.initChart()
      // this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      this.chartInstance.resize()
    },
    toTree(data) {
      const obj = {} // 使用对象重新存储数据
      const result = [] // 存储最后结果
      const len = data.length
      // 遍历原始数据data，构造obj数据，键名为id，值为数据
      for (let i = 0; i < len; i++) {
        obj[data[i].name] = data[i]
      }

      // 遍历原始数据
      for (let j = 0; j < len; j++) {
        const list = data[j]
        // 通过每条数据的 image_name 去obj中查询
        const parentList = obj[list.image_name]
        if (parentList) {
          // 根据 image_name 找到的是父节点，list是子节点，
          if (!parentList.children) {
            parentList.children = []
          }
          // 将子节点插入 父节点的 children 字段中
          parentList.children.push(list)
        } else {
          // image_name 找不到对应值，说明是根结点，直接插到根数组中
          result.push(list)
        }
      }

      console.log(result)

      this.renderTree(result, 1, 0, 100)

      const copyArr = JSON.parse(JSON.stringify(result))

      this.treeToList(copyArr, this.listData)

      console.log(this.listData)

      this.listData.forEach((item) => {
        if (item.children) {
          delete item.children
        }
      })
      // 来源不是镜像管理往右移动200
      this.listData.forEach((item) => {
        if (item.scene_name) {
          item.x += 200
        }
      })
      // 镜像管理来源快照固定x坐标
      this.listData.forEach((item) => {
        if (!item.scene_name) {
          item.x = 200
        }
      })
    },
    renderTree(data, level, x, y) {
      return data.forEach((item) => {
        const xs = x
        item.level = level
        item.x = x += 200
        item.y = y
        if (item.children) {
          this.renderTree(item.children, level + 1, xs, y + 100)
        }
      })
    },

    // 将树形结构转为线性结构
    treeToList(arr, list) {
      // 判断数组是否存在
      if (!arr) {
        return
      }
      // 循环查找是否包含子节点
      arr.forEach((item) => {
        list.push(item)
        if (item.children) {
          this.treeToList(item.children, list)
        }
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.initChart()

    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  .myChart {
    width: 500px;
    height: 500px;
    // background-color: pink;
  }
}
</style>
