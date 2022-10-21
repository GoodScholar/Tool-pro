<!--
  功能：功能描述
  时间：2022年10月21日 10:35:59
  版本：v1.0
-->
<template>
  <div class="">
    <!-- <button>点击上传</button>
        <input
          type="file"
          @change="openCamera($event)"
          accept="video/*"
          capture="user"
        /> -->

    <input
      ref="inputVideo"
      type="file"
      name="video"
      id="video-input"
      accept="video/*"
      capture="camcorder"
      @change="videoChange"
      @click="starVideotape"
    />

    <!-- video用于播放拍摄后的内容   -->
    <video id="video" width="300" height="300" controls autoplay></video>

    <!-- button用于点击开始录制视频  -->
    <button @click="onVideo">点击录制视频</button>
  </div>
</template>

<script>
export default {
  name: 'VideoItem',
  props: {},
  components: {},
  data() {
    return {
      yincang: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    openCamera(t) {
      // 判断浏览器
      const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
      const MicroMessenger = userAgent.indexOf('MicroMessenger') > -1 // 判断是否微信内置浏览器
      // const isIPhone = userAgent.indexOf('iPhone') > -1 // 判断是否是iPhone
      const i = t.target.files[0]
      const fileurl = URL.createObjectURL(i)
      let duration // 视频时长
      const that = this
      const n = new FileReader()
      const fileSize = i.size / 1024 / 1024 // 获取文件大小
      n.readAsDataURL(i)
      n.addEventListener('loadend', function () {
        const strContent = n.result
        if (MicroMessenger && fileSize) {
          if (fileSize > 1) {
            console.log('文件大小' + fileSize)
            that.$message.error('视频时间过长，请重新录制')
          } else {
            that.base64ToFile(strContent)
          }
        } else {
          const audioElement = new Audio(fileurl)
          // 经测试，发现audio也可获取视频的时长
          audioElement.addEventListener('loadedmetadata', function (_event) {
            duration = audioElement.duration
            console.log('视频时长:' + duration)
            if (duration > 8) {
              that.$message.error('视频时间过长，请重新录制')
            } else {
              that.base64ToFile(strContent)
            }
          })
        }
      })
    }, // 视频录制结束后将视频路径赋值给video标签进行播放
    videoChange() {
      const file = document.getElementById('video-input').files[0]
      const url = URL.createObjectURL(file)
      document.getElementById('video').src = url
    },

    // 点击button实现调起录制摄像头
    onVideo() {
      const that = this
      that.$refs.inputVideo.click()
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
