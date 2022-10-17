<!--
  功能：测试scroll-table
  时间：2022年08月18日 08:10:03
  版本：v1.0
-->
<template>
  <div class="elTable">
    <div>
      <span v-showTips:[toolTipObj] style="width: 300px; display: block">
        xxxxxxx11111111xxxxx111111111111111
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
        :speed="3"
        :headerStyle="headerStyle"
        :cellStyle="cellStyle"
      ></ScrollElTable>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      :fullscreen="fullscreen"
      center
    >
      <!-- <office-preview
        :visible.sync="previewVisible"
        :client-height="clientHeight"
        :file="previewFile"
        :base-u-r-l="officeURL"
      ></office-preview> -->
    </el-dialog>

    <!-- <iframe :src="'https://docs.google.com/viewer?url="fileurl"></iframe> -->
  </div>
</template>

<script>
import ScrollElTable from '../components/ScrollElTable.vue'
import ProgressBar from '@/components/comGradientProgressBar'
import QrCode from '@/components/qrCode.vue'
// import officePreview from '@/components/officePreview'

// https://zwfw.taicang.gov.cn/allinone-power/api/attachment/download?fileId=61555905a905b7462ce2121e

export default {
  name: 'TestItem',
  props: {},
  components: {
    ScrollElTable,
    QrCode,
    ProgressBar
    // officePreview
  },
  data() {
    return {
      fullscreen: false,
      centerDialogVisible: false,
      toolTipObj: {
        width: 400,
        height: 400,
        bgc: 'rgba(0,0,0,1)',
        color: 'red',
        fontSize: 13
      },
      copyText: 'a copy directives',
      codeUrl:
        'https://zwfw.taicang.gov.cn/allinone-power/api/attachment/download?fileId=6336620009a2e72bee6c06b9', // 后端返回的二维码地址
      tableData: [],

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

      // 'https://zwfw.taicang.gov.cn/allinone-power/api/attachment/download?fileId=61555905a905b7462ce2121e' // 文件地址，看你对应怎末获取、赋值
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
    for (let i = 1; i <= 100; i++) {
      this.tableData.push({
        id: '12987122',
        name: `王小虎${i}`,
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      })
    }
    // (this.tableData = this.flatArray(this.tableData))

    this.dealData()

    this.$utils.transition({
      start: 0,
      end: 100,
      type: 'anticlockwise',
      time: '',
      change: () => {}
    })
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
