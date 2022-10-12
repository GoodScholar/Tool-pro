<!--
  功能：消息提示框
  时间：2022年10月11日 13:24:39
  版本：v1.0
-->
<template>
  <transition name="fade">
    <div class="ui-message" v-if="show">
      {{ text }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MessageItem',
  props: {
    text: {
      type: String,
      default: 'message context'
    }
  },
  components: {},
  data() {
    return {
      show: false
    }
  },
  watch: {
    // 自动关闭
    show(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.show = false
        }, 3000)
      }
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.ui-message {
  position: fixed;
  left: 50%;
  top: 0;
  z-index: 999;
  transform: translate(-50%, 0);
  padding: 8px 15px;
  min-width: 200px;
  text-align: center;
  box-shadow: 0 5px 20px #ddd;
  background-color: white;
}
.fade-enter {
  opacity: 0;
  transform: translate(-50%, -30px);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
  transform: translate(-50%, 0);
}
.fade-leave {
  opacity: 1;
  transform: translate(-50%, 0);
}
.fade-leave-active {
  transition: all 0.5s;
}
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -30px);
}
</style>
