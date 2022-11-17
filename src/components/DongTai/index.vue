<template>
  <div class="login">
    <h1>动态效果</h1>
    <div class="lightline"></div>
    <ol>
      <li v-for="(item, index) in indoorParams" :key="index">
        <div class="animate-border">
          <i></i>
          <i></i>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const indoorParams = ref([1])
    return { indoorParams }
  }
}
</script>
<style scoped lang="scss">
.login {
  background-color: #000;
  height: 100%;
}

ol li {
  border: 1px solid rgba(32, 254, 255, 0.3);
  /* 宽高和相对定位是一定要给的,因为这会影响.animate-border子元素的定位 */
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
  /* 利用伪元素和两个i元素产生4条线 */
  .animate-border {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
    }
    i {
      position: absolute;
      display: inline-block;
      height: 100%;
      width: 1px;
    }
    &::before {
      top: 0;
      left: -100%;
      background-image: linear-gradient(
        90deg,
        transparent,
        #03e9f4,
        transparent
      );

      animation: one 4s linear infinite;
    }
    i:nth-child(1) {
      top: -100%;
      right: 0;
      background-image: linear-gradient(
        180deg,
        transparent,
        #03e9f4,
        transparent
      );
      /* 动画名称  动画持续时间  动画渲染函数 动画延迟时间 动画执行次数 */
      animation: two 4s linear 1s infinite;
    }
    &::after {
      bottom: 0;
      right: -100%;
      background-image: linear-gradient(
        -90deg,
        transparent,
        #03e9f4,
        transparent
      );
      animation: three 4s linear 2s infinite;
    }
    i:nth-child(2) {
      bottom: -100%;
      left: 0;
      background-image: linear-gradient(
        360deg,
        transparent,
        #03e9f4,
        transparent
      );
      animation: four 4s linear 3s infinite;
    }
  }
}
@keyframes one {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

@keyframes two {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

@keyframes three {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

@keyframes four {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
.lightline {
  margin-left: 100px;
  width: 100px;
  height: 2px;
  background-image: linear-gradient(90deg, transparent, #03e9f4, transparent);
}
</style>
