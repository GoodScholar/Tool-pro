<!--
  功能：测试scroll-table
  时间：2022年08月18日 08:10:03
  版本：v1.0
-->
<template>
  <div class="elTable">
    <h3>默认图片指令</h3>
    <div>
      <img
        v-real-img="require('@/assets/imgs/yann-icon.png')"
        src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da7e0112ff334e48ad493ca2cb496d88~tplv-k3u1fbpfcp-no-mark:240:240:240:240.awebp"
        alt=""
      />
    </div>

    <h3>边框进度条</h3>
    <div>
      <circleProcess
        :start-time="10"
        :step="-1"
        :thresholds="[
          { color: '#FF9370', threshold: 0.5 },
          { color: '#FF1100', threshold: 0.25 }
        ]"
      />
    </div>

    <h3>边框进度条</h3>

    <div class="svg__cell">
      <svg>
        <circle
          class="circle"
          cx="80"
          cy="80"
          r="50"
          transform="rotate(-90 80 80)"
        ></circle>

        <text x="80" y="85" fill="#6b778c" text-anchor="middle">
          <tspan class="text">0</tspan>
          <tspan class="percent">%</tspan>
        </text>
      </svg>
    </div>

    <h3>数字累加动画</h3>
    <div>
      <!-- <span>{{ num }}</span> -->
      <span v-count="{ interval: 10, end: 200 }"></span>
    </div>

    <hr />
    <h3>提示框指令</h3>
    <div>
      <div v-showTips:[toolTipObj] style="width: 300px">
        xxxxxxx11111111xxxxx111111111111111
      </div>
      <br />
      <div v-ellipsis:200>啊肯定会卡号撒旦拉萨啊十大建设的爱神的箭啦设计的</div>
    </div>

    <!-- <hr />
    <h3>缩放指令</h3>
    <div v-resize="400">13123</div> -->

    <hr />
    <h3>拖拽指令</h3>
    <button v-drag>拖</button>

    <hr />
    <h3>字符串整形指令</h3>
    <div v-format:[2].toFixed.price="123333">123</div>

    <hr />
    <h3>水印指令</h3>
    <div
      v-waterMarker="{
        text: '水印指令',
        textColor: 'red'
      }"
      style="width: 100%; height: 100px; background: pink"
    ></div>
    <hr />

    <div>
      <h3>防抖指令</h3>
      <button v-debounce="debounceClick">防抖</button>
      <h3>节流指令</h3>
      <button v-throttle="[throttleClick, 'click', 1000]">节流</button>
    </div>
    <hr />

    <div v-zoom:{a:1,b:2}="{ width: 800, height: 1000 }">
      <h3>测试传参指令</h3>
      测试指令传参
    </div>
    <hr />

    <div>
      <h3>复制指令</h3>
      <button v-copy="copyText">复制</button>

      <button v-copy>单击复制</button>
      <button v-copy.dblclick>双击复制</button>
      <button v-copy.icon>icon复制</button>
    </div>
    <hr />

    <div>
      <h3>长按指令</h3>
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
    ></el-dialog>
  </div>
</template>

<script>
import ScrollElTable from '../components/ScrollElTable.vue'
import ProgressBar from '@/components/comGradientProgressBar'
import QrCode from '@/components/qrCode.vue'
import circleProcess from './functionItem/circleProcess'

import Count from '@/utils/count'
// import officePreview from '@/components/officePreview'

// https://zwfw.taicang.gov.cn/allinone-power/api/attachment/download?fileId=61555905a905b7462ce2121e

export default {
  name: 'TestItem',
  props: {},
  components: {
    ScrollElTable,
    QrCode,
    ProgressBar,
    circleProcess
    // officePreview,
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
      newObj: {},
      newArr: [],
      obj: {},
      list: [
        { id: '001', value: 49, status: '进行中' },
        { id: '001', value: 68, status: '失败' },
        { id: '001', value: 90, status: '完成' }
      ],
      dealList: [],
      num: 0

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
    throttleClick() {
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
    // todo 在指定时间内完成动效
    // Count({
    //   end: 100, // 结束时间
    //   limitTime: 20000, // 指定时间
    //   callback: (num) => {
    //     this.num = num
    //   }
    // })

    // todo 按指定速度完成动效
    Count({
      end: 100, // 结束数字
      interval: 10, // 指定速度
      callback: (num) => {
        this.num = num
      }
    })

    // 赋值
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

.svg__cell {
  .circle {
    fill: none;
    stroke: #7c83fd;
    stroke-width: 8;
    stroke-dasharray: 314;
    stroke-dashoffset: 314;
    stroke-linecap: round;
    animation: circle 3s infinite;
    transition: all 1s;
  }

  .text {
    font-size: 20px;
  }
  .percent {
    font-size: 10px;
  }
}

img {
  width: 40px;
}

@keyframes circle {
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
