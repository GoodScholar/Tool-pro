<!--
  功能：电子签名
  时间：2022年08月21日 17:35:16
  版本：v1.0
-->
<template>
  <div class="signatureBox">
    <Esignature @submitSign="submitSign"></Esignature>
    <img class="imgCanvas" :src="imgUrl" />
  </div>
</template>

<script>
import Esignature from '@/components/Esignature.vue'
export default {
  name: 'SignItem',
  props: {},
  components: { Esignature },
  data() {
    return {
      imgUrl: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    submitSign(item) {
      this.imgUrl = item
      console.log(item)
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
// .signatureBox {
//   // .imgCanvas {
//   //   width: 100vw;
//   // }
// }
</style>
