<!--
  功能：功能描述
  时间：2022年12月16日 13:57:37
  版本：v1.0
-->
<template>
  <div class="bigScreen">
    <!-- <scale-box>
      <div class="main-wrapper">

        <div class="header-wrapper">1231231</div>

        <div class="body-wrapper">123123</div>
      </div>
    </scale-box> -->

    <scale-box :width="1920" :height="1080" class="scaleItem">
      <header>头部</header>
      <main>
        <div class="demo-left"></div>
        <div class="demo-center"></div>
        <div class="demo-right"></div>
      </main>
      <footer>底部</footer>
    </scale-box>
  </div>
</template>

<script>
import ScaleBox from './components/ScaleBox.vue'
// import scaleContainer from './components/scaleContainer.vue'
export default {
  name: 'bigScreen',
  props: {},
  components: {
    ScaleBox
  },
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  async created() {},
  async mounted() {}
}
</script>

<style lang="scss" scoped>
.bigScreen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: aqua;
  .main-wrapper {
    user-select: none;
    // width: 100%;
    // height: 100%;
    width: 1920px;
    height: 1080px;
    margin: 0 auto;
    background: pink;
    box-sizing: border-box;
  }

  .scaleItem {
    background: pink;
    header {
      width: 1920px;
      height: 200px;
      line-height: 200px;
      background: rgba(53, 150, 206, 0.3);
      font-size: 40px;
      text-align: center;
    }
    main {
      display: flex;
      height: 1000px;

      div {
        width: 640px;
        height: 100%;
      }
      .demo-left {
        background: rgba(236, 3, 158, 0.3);
      }
      .demo-center {
        background: rgba(13, 179, 55, 0.3);
      }
      .demo-right {
        background: rgba(163, 6, 22, 0.849);
      }
    }
    footer {
      width: 100%;
      height: 100px;
      font-size: 40px;
      text-align: center;
      line-height: 100px;
      background: rgba(19, 211, 115, 0.3);
    }
  }
}
</style>
