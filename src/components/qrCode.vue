<!--
  功能：二维码组件
  时间：2022年09月30日 14:32:45
  版本：v1.0
-->

<template>
  <div class="qrCode_scan" :id="id" :ref="id"></div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      qrCode: ''
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: 'http://jindo.dev.naver.com/collie'
    },
    width: {
      type: String,
      default: '128'
    },
    height: {
      type: String,
      default: '128'
    },
    colorDark: {
      type: String,
      default: '#000000'
    },
    colorLight: {
      type: String,
      default: '#ffffff'
    }
  },
  watch: {
    text() {
      this.createQrCode()
    }
  },
  mounted() {
    this.createQrCode()
  },
  methods: {
    createQrCode() {
      if (this.qrCode) {
        // 有新的二维码地址了，先把之前的清除掉
        this.$refs[this.id].innerHTML = ''
      }
      this.qrCode = new QRCode(this.$refs[this.id], {
        text: this.text, // 页面地址 ,如果页面需要参数传递请注意哈希模式#
        width: this.width, // 二维码宽度 （不支持100%）
        height: this.height, // 二维码高度 （不支持100%）
        colorDark: this.colorDark,
        colorLight: this.colorLight,
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    // 制作另一个二维码
    updateCode() {
      this.qrCode.makeCode('http://naver.com')
    }
  }
}
</script>

<style scoped>
.qrCode_scan {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
