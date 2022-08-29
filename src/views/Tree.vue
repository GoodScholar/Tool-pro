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
        },
        {
          image_name: 'hgjghjghjghj',
          name: '啊撒旦拉萨记录'
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
      treeArr: [
        {
          name: 'root',
          children: [
            {
              name: 'Child A',
              children: [
                {
                  name: 'Leaf C'
                },
                {
                  name: 'Leaf D'
                },
                {
                  name: 'Leaf E'
                },
                {
                  name: 'Leaf F'
                }
              ]
            },
            {
              name: 'Child B',
              children: [
                {
                  name: 'Leaf G'
                },
                {
                  name: 'Leaf H'
                }
              ]
            },
            {
              name: 'Child D'
            },
            {
              name: 'Child F',
              children: [
                {
                  name: 'Leaf J'
                },
                {
                  name: 'Leaf K'
                }
              ]
            }
          ]
        }
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
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            // 竖式显示
            orient: 'vertical',
            data: this.treeArr,
            left: '2%',
            right: '2%',
            top: '8%',
            bottom: '20%',
            symbol: 'emptyRect',
            symbolSize: 60,
            // 是否收缩
            expandAndCollapse: false,
            // 是否开启鼠标缩放和平移漫游
            roam: true,
            label: {
              position: 'top',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9,
              normal: {
                formatter(data) {
                  const { name } = data
                  console.log(name)
                  // return name.length > 7 ? name.substring(0, 7) + '...' : name
                }
              }
            },
            leaves: {
              label: {
                position: ['50%', '50%'],
                verticalAlign: 'top',
                align: 'center'
              }
            },
            animationDurationUpdate: 750,
            edgeShape: 'polyline'
          }
        ]
      }

      if (initOption && typeof initOption === 'object') {
        this.chartInstance.setOption(initOption)
      }

      this.chartInstance.on('click', (param) => {
        console.log('param---->', param)
        // this.updateChart(param.dataIndex)
      })
    },
    getData() {
      // this.updateChart()
      console.log()
      this.treeArr = this.toTree(this.dataArr)
        ? this.toTree(this.dataArr)
        : this.treeArr

      this.initChart()
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

      this.renderTree(result)

      return result
    },
    renderTree(data) {
      return data.forEach((item) => {
        delete item.image_name

        if (item.children) {
          this.renderTree(item.children)
        }
      })
    }
  },
  created() {},
  mounted() {
    this.getData()
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
    width: 100vw;
    height: 100vh;
    // background-color: pink;
  }
}
</style>
