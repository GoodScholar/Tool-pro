<!--
  功能：测试scroll-table
  时间：2022年08月18日 08:10:03
  版本：v1.0
-->
<template>
  <div class="elTable">
    <div>
      <span
        v-showTips:[{width:400,height:400}]
        style="width: 300px; display: block"
      >
        xxxxxxx11111111xxxxx
      </span>
    </div>
    <hr />
    <button v-drag>拖</button>
    <hr />
    <div
      v-waterMarker="{
        text: '水印指令',
        textColor: 'red'
      }"
      style="width: 100%; height: 100px; background: pink"
    ></div>
    <hr />
    <div>
      <button v-debounce="debounceClick">防抖</button>
    </div>
    <hr />
    <div v-zoom:{a:1,b:2}="{ width: 800, height: 1000 }">测试指令传参</div>
    <hr />
    <div>
      <button v-copy="copyText">复制</button>
    </div>
    <hr />

    <div>
      <button v-longpress="longPress">长按</button>
    </div>

    <div style="background-color: rgba(3, 22, 37, 0.85)">
      <ProgressBar v-for="(item, index) in dealList" :key="index" :obj="item" />
    </div>
    <a class="button">
      <div>click me</div>
    </a>
    <div style="text-align: center">
      <QrCode :id="'QrCode'" :text="codeUrl" />
    </div>

    <div class="square_brackets"></div>

    <div class="tables">
      <ScrollElTable
        :tableData="tableData"
        :setHeight="240"
        :isScroll="true"
        :isStripe="false"
        :headerStyle="headerStyle"
        :cellStyle="cellStyle"
      ></ScrollElTable>
    </div>
  </div>
</template>

<script>
import ScrollElTable from '../components/ScrollElTable.vue'
import ProgressBar from '@/components/comGradientProgressBar'
import QrCode from '@/components/qrCode.vue'

export default {
  name: 'TestItem',
  props: {},
  components: {
    ScrollElTable,
    QrCode,
    ProgressBar
  },
  data() {
    return {
      copyText: 'a copy directives',
      codeUrl:
        'https://zwfw.taicang.gov.cn/allinone-power/api/attachment/download?fileId=6336620009a2e72bee6c06b9', // 后端返回的二维码地址
      tableData: [
        {
          id: '12987122',
          name: '王小虎1',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '12987122',
          name: '王小虎2',
          amount1: '2313',
          amount2: '3.2',
          amount3: 112
        },
        {
          id: '12987122',
          name: '王小虎3',
          amount1: '12334',
          amount2: '3.2',
          amount3: 11
        },
        {
          id: '12987123',
          name: '王小虎4',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '129871235',
          name: '王小虎5',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987123',
          name: '王小虎6',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987124',
          name: '王小虎7',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '12987124',
          name: '王小虎8',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '12987125',
          name: '王小虎9',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        {
          id: '12987126',
          name: '王小虎10',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
      ],
      // tableData: [
      //   {
      //     date: '2016-05-02',
      //     name: '王小虎1',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   },
      //   {
      //     date: '2016-05-04',
      //     name: '王小虎2',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   },
      //   {
      //     date: '2016-05-01',
      //     name: '王小虎3',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎4',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎5',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎6',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎7',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎8',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎9',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎10',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎11',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎12',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎13',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎14',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }
      // ],
      headerStyle: {
        // backgroundColor: 'rgba(7, 26, 36, 0.2)',
        // color: '#00F6FF',
        // fontSize: '12px',
        // borderColor: 'transparent'
      },
      cellStyle: {
        // backgroundColor: 'rgba(7, 26, 36, 0.2)',
        // borderColor: 'rgba(255, 255, 255, 0.15)',
        // fontSize: '14px',
        // color: '#fff'
      },
      // tableData: [
      //   {
      //     name: '城乡镇',
      //     children: [
      //       {
      //         year: '2020',
      //         children: [
      //           {
      //             desc1: '1'
      //           },
      //           {
      //             desc1: '11'
      //           }
      //         ]
      //       },
      //       {
      //         year: '2021',
      //         children: [
      //           {
      //             desc: '2'
      //           },
      //           {
      //             desc: '22'
      //           }
      //         ]
      //       },
      //       {
      //         year: '2022',
      //         children: [
      //           {
      //             desc: '3'
      //           },
      //           {
      //             desc: '33'
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     name: '浏河镇',
      //     children: [
      //       {
      //         year: '2020',
      //         children: [
      //           {
      //             desc: '1'
      //           },
      //           {
      //             desc: '11'
      //           }
      //         ]
      //       },
      //       {
      //         year: '2021',
      //         children: [
      //           {
      //             desc: '2'
      //           },
      //           {
      //             desc: '22'
      //           }
      //         ]
      //       },
      //       {
      //         year: '2022',
      //         children: [
      //           {
      //             desc: '3'
      //           },
      //           {
      //             desc: '33'
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     name: '沙溪镇',
      //     children: [
      //       {
      //         year: '2020',
      //         children: [
      //           {
      //             desc: '1'
      //           },
      //           {
      //             desc: '11'
      //           }
      //         ]
      //       },
      //       {
      //         year: '2021',
      //         children: [
      //           {
      //             desc: '2'
      //           },
      //           {
      //             desc: '22'
      //           }
      //         ]
      //       },
      //       {
      //         year: '2022',
      //         children: [
      //           {
      //             desc: '3'
      //           },
      //           {
      //             desc: '33'
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ],
      newObj: {},
      newArr: [],
      obj: {},
      list: [
        { id: '001', value: 49, status: '进行中' },
        { id: '001', value: 68, status: '失败' },
        { id: '001', value: 90, status: '完成' }
      ],
      dealList: []
    }
  },
  watch: {
    obj: {
      handler: function (newVal) {
        console.log(newVal)
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    debounceClick() {
      console.log('只触发一次')
    },
    // 树形数据转为一维数组
    flatArray(list) {
      return list.reduce((res, v) => {
        if (v.children) {
          res = res.concat(
            this.flatArray(v.children).map((o) => ({
              ...v,
              ...o,
              children: null
            }))
          )
        } else {
          res.push(v)
        }
        return res
      }, [])
    },
    dealData() {
      this.dealList = []
      // 这里要 处理list数据，将value都处理成100以内的数，防止进度条超过100，处理的步骤就不写了
      // 这里就直接把list里的数据当处理好了，放到dealList中
      this.dealList = this.list
    },
    longPress() {
      console.log('长按事件')
    }
  },
  created() {},
  mounted() {
    this.tableData = this.flatArray(this.tableData)

    this.dealData()
  }
}
</script>

<style lang="scss" scoped>
.square_brackets {
  border: none;
  position: relative;
  padding: 0;
  height: 130px;
  width: 400px;
}

.square_brackets:before,
.square_brackets:after {
  content: '';
  display: block;
  height: 100%;
  width: 15px;
  border: 3px solid #979797;
  position: absolute;
  top: -2px;
}

.square_brackets:before {
  left: 0;
  border-right: 0;
}

.square_brackets:after {
  right: 0;
  border-left: 0;
}

.tables {
  padding: 20px 0;
}

.button {
  margin: 50px;
  display: inline-block;
  background: #404ed3;
  transform: skewX(-40deg);
}
.button > div {
  padding: 15px;
  color: white;
  font-size: 24px;
  transform: skewX(40deg);
}
</style>
