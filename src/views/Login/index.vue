<template>
  <div class="login-container">
    <video
      class="video-background"
      preload="auto"
      loop
      playsinline
      autoplay
      src="@/assets/imgs/login/login_bg.mp4"
      tabindex="-1"
      muted="muted"
    ></video>

    <div class="login-box">
      <h2>登录</h2>
      <form class="login__form">
        <!--  :class="{ blink: curStatus === 2 }" -->
        <div class="user-box">
          <input
            class="blink-ipt"
            type="text"
            name=""
            required=""
            v-model="form.account"
          />
          <label class="blink-lab">账号/邮箱号</label>
        </div>
        <div class="user-box">
          <input
            class="blink-ipt"
            type="password"
            name=""
            required=""
            v-model="form.password"
          />
          <label class="blink-lab">密码</label>
        </div>
        <div class="btn__cell">
          <a @click="reset">重置</a>
          <a @click="handleSubmit">
            <!-- <span></span>
            <span></span>
            <span></span>
            <span></span> -->
            登录
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data() {
    return {
      form: {
        account: 'admin',
        password: '123456',
        curStatus: 0
      }
    }
  },
  methods: {
    handleSubmit() {
      if (this.form.account !== 'admin') {
        this.curStatus = 1
        this.$message({
          message: '账号错误，请重试！',
          type: 'error'
        })
      } else if (this.form.password !== '123456') {
        this.curStatus = 2
        this.$message({
          message: '密码错误，请重试！',
          type: 'error'
        })
      } else {
        this.curStatus = 0
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        this.$router.replace({
          path: '/home'
        })
      }
    },
    reset() {
      this.form = {
        account: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100vh;
  background-color: #c1cff7;
  /*进行视频裁剪*/
  overflow: hidden;

  .video-background {
    position: absolute;
    left: 50%;
    top: 50%;
    /*保证视频内容始终居中*/
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    /*保证视频充满屏幕*/
    object-fit: cover;
    min-height: 800px;
  }
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;

  h2 {
    color: #fff;
    text-align: center;
  }

  .user-box {
    position: relative;

    input {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      margin-bottom: 30px;
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      background: transparent;

      &:focus ~ label,
      &:valid ~ label {
        top: -20px;
        left: 0;
        color: #03e9f4;
        font-size: 12px;
      }
    }

    label {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      pointer-events: none;
      transition: 0.5s;
    }
  }

  .blink {
    .blink-ipt {
      border-bottom: 1px solid red;
    }
    .blink-lab {
      color: red;
    }
  }

  .login__form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: 0.5s;
    margin-top: 40px;
    // letter-spacing: 4px;
    cursor: pointer;
    &:hover {
      background: #03e9f4;
      color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
        0 0 100px #03e9f4;
    }
  }

  .btn__cell {
    @extend %flex-center-around;
  }
}

// @keyframes blink {
//   0% {
//     opacity: 1;
//   }

//   100% {
//     opacity: 0;
//   }
// }

// .login-box a span {
//   position: absolute;
//   display: block;
// }

// .login-box a span:nth-child(1) {
//   top: 0;
//   left: -100%;
//   width: 100%;
//   height: 2px;
//   background: linear-gradient(90deg, transparent, #03e9f4);
//   animation: btn-anim1 1s linear infinite;
// }

// @keyframes btn-anim1 {
//   0% {
//     left: -100%;
//   }
//   50%,
//   100% {
//     left: 100%;
//   }
// }

// .login-box a span:nth-child(2) {
//   top: -100%;
//   right: 0;
//   width: 2px;
//   height: 100%;
//   background: linear-gradient(180deg, transparent, #03e9f4);
//   animation: btn-anim2 1s linear infinite;
//   animation-delay: 0.25s;
// }

// @keyframes btn-anim2 {
//   0% {
//     top: -100%;
//   }
//   50%,
//   100% {
//     top: 100%;
//   }
// }

// .login-box a span:nth-child(3) {
//   bottom: 0;
//   right: -100%;
//   width: 100%;
//   height: 2px;
//   background: linear-gradient(270deg, transparent, #03e9f4);
//   animation: btn-anim3 1s linear infinite;
//   animation-delay: 0.5s;
// }

// @keyframes btn-anim3 {
//   0% {
//     right: -100%;
//   }
//   50%,
//   100% {
//     right: 100%;
//   }
// }

// .login-box a span:nth-child(4) {
//   bottom: -100%;
//   left: 0;
//   width: 2px;
//   height: 100%;
//   background: linear-gradient(360deg, transparent, #03e9f4);
//   animation: btn-anim4 1s linear infinite;
//   animation-delay: 0.75s;
// }

// @keyframes btn-anim4 {
//   0% {
//     bottom: -100%;
//   }
//   50%,
//   100% {
//     bottom: 100%;
//   }
// }
</style>
