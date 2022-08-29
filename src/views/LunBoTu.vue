<!--
  功能：3D轮播图
  时间：2022年08月16日 09:09:41
  版本：v1.0
-->
<template>
  <div class="weiduduan clearfix">
    <div id="phoneCarousel">
      <div class="previous arrow">&nbsp;</div>

      <div class="next arrow">&nbsp;</div>

      <div id="stage" ref="stage">
        <img
          width="270"
          height="400"
          src="../assets/logo.png"
          alt="iPhone"
          id="iphone"
          class="default"
        />

        <img
          width="270"
          height="400"
          src="../assets/logo.png"
          alt="Nexus One"
          id="nexus"
        />

        <img
          width="270"
          height="400"
          src="../assets/logo.png"
          alt="Nokia"
          id="nokia"
        />

        <img
          width="270"
          height="400"
          src="../assets/logo.png"
          alt="BlackBerry"
          id="blackberry"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LunBoTu',
  props: {},
  components: {},
  data() {
    return {
      deg: 0
    }
  },
  watch: {},
  computed: {},
  methods: {
    // rotate(step, total) {
    //   this.deg += step
    //   let eSin = 0
    //   let eCos = 0
    //   let newWidth = 0
    //   let newHeight = 0
    //   let q = 0
    //   for (let i = 0; i < cnt; i++) {
    //     q = (((360 / cnt) * i + this.deg) * Math.PI) / 180
    //     eSin = Math.sin(q)
    //     eCos = Math.cos(q)
    //     q = 0.6 + eSin * 0.4
    //     newWidth = q * dim.width
    //     newHeight = q * dim.height
    //     images
    //       .eq(i)
    //       .css({
    //         top: centerY + 15 * eSin,
    //         left: centerX + 200 * eCos,
    //         opacity: 0.8 + eSin * 0.2,
    //         marginLeft: -newWidth / 2,
    //         zIndex: Math.round(80 + eSin * 20)
    //       })
    //       .width(newWidth)
    //       .height(newHeight)
    //   }
    //   total -= Math.abs(step)
    //   if (total <= 0) return false
    //   setTimeout(function () {
    //     this.rotate(step, total)
    //   }, 40)
    // }
  },
  created() {},
  mounted() {
    // this.centerX = this.$refs.width() / 2
    // this.centerY = this.$refs.height() / 2 - dim.height / 2
    // this.rotate(10, 360 / cnt)
  }
}
</script>

<style lang="scss" scoped>
.weiduduan {
  width: 800px;
  margin: 50px auto 0 auto;
}
#phoneCarousel {
  height: 390px;
  margin: 0 auto;
  position: relative;
  width: 800px;
}
#phoneCarousel .arrow {
  width: 44px;
  height: 44px;
  // background: url(../images/arrows.png) no-repeat;
  position: absolute;
  top: 50%;
  margin-top: -22px;
  left: 0;
  cursor: pointer;
}

#phoneCarousel .next {
  background-position: right top;
  left: auto;
  right: 0;
}
#phoneCarousel .arrow:hover {
  background-position: left bottom;
}
#phoneCarousel .next:hover {
  background-position: right bottom;
}
#stage {
  left: 50%;
  margin-left: -350px;
  position: absolute;
  width: 700px;
  height: 100%;
}
#stage img {
  display: none;
}
#stage .default {
  position: absolute;
  display: block;
  left: 50%;
  margin-left: -135px;
}
#stage .animationReady {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
