<!--
  功能：二次封装组件
  时间：2022年10月12日 10:06:38
  版本：v1.0
-->
<template>
  <div class="">
    <el-button type="primary" @click="detailVisible = true">
      点击打开 Dialog
    </el-button>

    <DetailDialog
      v-model="detailVisible"
      title="你好"
      width="40%"
      :center="true"
      @close="handleClose"
    >
      <p>弹窗内容</p>
    </DetailDialog>

    <hr />

    <InputNumber v-model="value" style="width: 200px" />

    <hr />

    <el-select v-model="selectVal" placeholder="请选择">
      <OptionPlus
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :width="400"
      ></OptionPlus>
    </el-select>

    <hr />
    <FormPlus
      :list="formList"
      @submitForm="searchPage"
      @resetForm="resetForm"
    />

    <hr />
    <throttling-select
      v-model="duoVal"
      :list="DuoOpt"
      placeholder="请选择数据"
      selKey="key"
      selLabel="label"
    ></throttling-select>

    <hr />

    <!-- 圆形菜单 -->
    <div style="height: 200px">
      <circleMenus />
    </div>

    <!-- 流动边框 -->
    <div class="view" id="view" ref="view">
      <div class="inner">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </div>

    <div>
      <!-- 流动边框 -->
      <button>
        click me ❤️
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
          <path
            class="path1"
            fill="transparent"
            stroke="#fff"
            stroke-width="8"
            d="M 0.0 0 L 200 0 L 200 100 L 0.00 100 L 0.00 0"
          />
        </svg>
      </button>
    </div>

    <div>
      <!-- 动态背景 -->
      <div class="gradient"></div>
    </div>

    <!-- 动态伸缩搜索框 -->
    <div class="search">
      <div class="search-box">
        <a class="search-btn">
          <i class="el-icon-search" aria-hidden="true"></i>
        </a>
        <input type="text" class="search-txt" placeholder="搜索" />
        <!-- <div class="search-line"></div> -->
      </div>
    </div>

    <div>
      <el-button type="primary" @click="handlePictureCardPreview">
        大图预览
      </el-button>
    </div>
  </div>
</template>

<script>
import DetailDialog from '@/components/DetailDialog'
import InputNumber from '@/components/InputNumber'
import OptionPlus from '@/components/OptionPlus'
import FormPlus from '@/components/FormPlus'
import ThrottlingSelect from '@/components/ThrottlingSelect'
import circleMenus from '@/components/circleMenus'

export default {
  name: 'SecondaryEncapsulation',
  props: {},
  components: {
    DetailDialog,
    InputNumber,
    OptionPlus,
    FormPlus,
    ThrottlingSelect,
    circleMenus
  },
  data() {
    return {
      detailVisible: false,
      value: null,
      selectVal: null,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶特别好吃，以顺德的最出名，推荐尝试'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      formList: [
        { label: '编号', model: 'applyNumber', placeholder: '请输入编号' },
        { label: '名称', model: 'name', placeholder: '请输入名称' },
        // {
        //   type: 'date-picker',
        //   label: '开始时间',
        //   model: 'startTime',
        //   valueFormat: 'yyyy-MM-dd HH:mm:ss',
        //   placeholder: '请选择开始时间'
        // },
        {
          type: 'select',
          label: '状态',
          model: 'status',
          placeholder: '请选择状态',
          options: []
        }
      ],
      duoVal: null,
      DuoOpt: [],

      imageUrl:
        'https://s.cn.bing.net/th?id=OJ.ctIMyEUgdeHZwQ&w=120&h=160&c=8&rs=1&pid=academic',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  watch: {},
  computed: {
    optionHover() {
      return {
        step: 1, // 数值越大速度滚动越快
        // limitMoveNum: this.listData.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        singleHeight: 48, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  methods: {
    handleClose() {
      this.detailVisible = false
    },
    // 可以取到子组件传递过来的数据
    searchPage(ruleForm) {
      console.log(ruleForm, 'ruleForm')
    },
    resetForm() {},
    Load() {},
    handlePictureCardPreview() {
      this.$previewImgs({
        urlList: [
          'https://s.cn.bing.net/th?id=OJ.ctIMyEUgdeHZwQ&w=120&h=160&c=8&rs=1&pid=academic',
          'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8102ae19e90457eb0681ffb1b05f6b6~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
          'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d33bb979aa44d4186413df9fbd05c4a~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?'
        ]
      })
    }
  },
  created() {
    for (let i = 0; i < 10000; i++) {
      this.DuoOpt.push({
        value: i + 1,
        label: i + 1
      })
    }
  },
  mounted() {
    const view = this.$refs.view
    view.addEventListener('animationiteration', (e) => {
      const index = getComputedStyle(view).getPropertyValue('--index') || 0
      const len = view.querySelectorAll('.item').length
      if (parseInt(index) === len - 1) {
        view.style.setProperty('--index', 0)
      } else {
        view.style.setProperty('--index', Number(index) + 1)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
//CSS 来监听事件
.view {
  position: relative;
  width: 400px;
  height: 250px;
  counter-reset: num 0;
  animation: scroll 1s infinite;
  overflow: hidden;
}
.view:hover {
  animation-play-state: paused;
}
@keyframes scroll {
  to {
    transform: translateZ(0.1px);
  }
}
.inner {
  display: flex;
  height: 100%;
  transform: translateX(calc(-100% * var(--index, 0)));
  // todo 调整轮播图速度
  transition: 1s;
}
.item {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  display: grid;
  place-content: center;
  counter-increment: num;
  background-color: blueviolet;
  color: #fff;
  transition: 1s;
  transform: translate3d(0, 0, -100px);
}
.item::after {
  content: counter(num);
  font-size: 60px;
}
.item:nth-child(2n + 1) {
  background: tomato;
}
.item:nth-child(3n + 2) {
  background: royalblue;
}
.item:nth-child(5n + 3) {
  background: violet;
}
.item:nth-child(7n + 4) {
  background: tan;
  color: #333;
}
.item:nth-child(11n + 5) {
  background: yellowgreen;
}

//CSS 来监听事件

// 移动边框
.path1 {
  stroke-dasharray: 300 300;
  stroke-dashoffset: 600;
  animation: dash 4s linear infinite;
}

@keyframes dash {
  from {
    stroke-dashoffset: 600;
  }
  to {
    stroke-dashoffset: 0;
  }
}
/* @keyframes heartbeat
{
  0%
  {
    transform: scale( .75 );
  }
  20%
  {
    transform: scale( 1 );
  }
  40%
  {
    transform: scale( .75 );
  }
  60%
  {
    transform: scale( 1 );
  }
  80%
  {
    transform: scale( .75 );
  }
  100%
  {
    transform: scale( .75 );
  }
} */
svg {
  filter: drop-shadow(2px 2px 10px rgba(255, 255, 255, 1));
  position: absolute;
  left: -4px;
  top: -4px;
  width: 200px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
button {
  font-family: monospace;
  color: #fff;
  line-height: 1;
  box-sizing: border-box;
  position: relative;
  width: 200px;
  height: 100px;
  padding: 0;
  background: lightcoral;
  border: 4px solid transparent;
  border-radius: 5px;
  animation: heartbeat 1s infinite;
}

// 移动边框

// 渐变背景
.gradient {
  /* 设置容器尺寸 - 原理1 */
  width: 400px;
  height: 400px;
  /* 背景渐变色 - 原理2 */
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  /* 背景尺寸 - 原理3 */
  background-size: 600% 600%;
  /* 循环动画 - 原理4 */
  animation: gradientBG 5s ease infinite;
}

/* 动画，控制背景 background-position */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

// 动态伸缩搜索框
.search {
  position: relative;
  height: 60px;
  background-color: pink;
}
// .search-line {
//   position: absolute;
//   top: 10px;
//   left: 0px;
//   width: 0px;
//   height: 2px;
//   background-color: rgb(251, 121, 0);
//   transition: 0.3s;
// }
.search-box {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: white;
  box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.1);
  height: 40px;
  padding: 10px;
  border-radius: 40px;
  display: flex;
}
.search-txt {
  border: none;
  background: none;
  outline: none;
  padding: 0;
  color: #222;
  font-size: 16px;
  line-height: 40px;
  width: 0;
  transition: 0.4s;
}
.search-btn {
  color: #888888;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.4s;
}
.search-box:hover .search-txt {
  width: 200px;
  padding: 0 12px;
}
.search-box:hover .search-btn {
  background-color: #fff;
  animation: rotate 0.4s linear;
}
.search-txt:focus {
  width: 200px;
  padding: 0 12px;
}

.search-txt:focus + .search-line {
  width: 200px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
