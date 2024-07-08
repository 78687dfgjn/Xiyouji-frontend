<script>
import SIdentify from "@/components/userComponents/SIdentify.vue";

export default {
  name: "UserLoginForm",
  components: {SIdentify},
  data() {
    return {
      loginMode: true,
      loading: false,
      account: '',
      password: '',
      inputCode: '',
      //前端验证码
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz", //随机串内容,从这里随机抽几个显示验证码
      identifyCode: "", //验证码图片内容
      //后端验证码
      captchaCode: '',
      captchaCodeUrl: '',
      userAvatar: require("@/assets/waoku.jpg"),

      email: '',
      emailError: '',
      passwordError: '',
      accountError: ''

    }
  },
  mounted() {
    // this.getCaptchaCode()
    this.identifyCode = ""
    this.makeCode(this.identifyCodes, 4);


    /*//下面是新页面里面加入的js
    let switchCtn = document.querySelector("#switch-cnt");
    let switchC1 = document.querySelector("#switch-c1");
    let switchC2 = document.querySelector("#switch-c2");
    let switchCircle = document.querySelectorAll(".switch_circle");
    let switchBtn = document.querySelectorAll(".switch-btn");
    let aContainer = document.querySelector("#a-container");
    let bContainer = document.querySelector("#b-container");
    let allButtons = document.querySelectorAll(".submit");

    let getButtons = (e) => e.preventDefault()
    let changeForm = (e) => {
      // 修改类名
      switchCtn.classList.add("is-gx");
      setTimeout(function () {
        switchCtn.classList.remove("is-gx");
      }, 1500)
      switchCtn.classList.toggle("is-txr");
      switchCircle[0].classList.toggle("is-txr");
      switchCircle[1].classList.toggle("is-txr");

      switchC1.classList.toggle("is-hidden");
      switchC2.classList.toggle("is-hidden");
      aContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-z");
    }
    // 点击切换
    let shell = (e) => {
      for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons);
      for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
    }
    window.addEventListener("load", shell);*/
  },
  methods: {
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //获取验证码的值
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        //通过循环获取字符串内随机几位
        this.identifyCode +=
            this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    //随机数字：用于当角标拿字符串的值
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    getCaptchaCode() {
      this.request.get("/account/captcha").then(res => {
        // console.log(res)
        if (res.code === "200") {
          this.captchaCodeUrl = URL.createObjectURL(new Blob([res.data], {type: 'image/png'}))
          console.log(this.captchaCodeUrl)
        }
      }).then(err => {
        // console.log(err)
      })
    },
    userLogin() {

      // this.identifyCode !== this.inputCode
      if (this.identifyCode !== this.inputCode) {
        this.$message.error("验证码错误")
        return
      }
      this.request.post("/account/login", {
        account: this.account,
        password: this.password,
      }).then(res => {
        if (res.code === "200") {
          localStorage.setItem(
              "accountData",
              JSON.stringify({
                id: res.data.id,
                account: res.data.account,
                nickname: res.data.nickname,
                avatar: res.data.avatar,
                identity: res.data.identity,
                token: res.data.token,
              })
          );
          // window.location.href = 'http://localhost:8080/user/home'
          this.$router.push('/user/home')
          // alert('你妈的')
          this.$message.success("登录成功，欢迎您，" + res.data.nickname + "!")
          // setTimeout(() => {
          //   location.reload();
          // }, 100)
        } else {
          this.$message.error('登录失败！请检查信息')
        }
      }).then(err => {
        console.log(err)
      })
    },
    searchAvatar() {
      this.request.get('/account/avatar/' + this.account).then(res => {
        // alert(res.data)
        if (res.code === "200") {
          this.userAvatar = res.data

        } else {
          this.userAvatar = require("@/assets/waoku.jpg")
        }
      }).then(err => {


      })
    },


    validateEmail() {
      if (!this.email) {
        this.emailError = '邮箱不能为空'
      } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(this.email)) {
        this.emailError = '邮箱格式不正确'
      } else {
        this.emailError = ''
      }
    },
    validateAccount() {
      if (!this.account) {
        this.accountError = '账号不能为空'
      } else if (this.account.length < 4) {
        this.accountError = '账号长度不能小于 4 位'
      } else {
        this.accountError = ''
      }
    },
    validatePassword() {
      if (!this.password) {
        this.passwordError = '密码不能为空'
      } else if (this.password.length < 6) {
        this.passwordError = '密码长度不能小于 6 位'
      } else {
        this.passwordError = ''
      }
    },
    submit() {
      this.validateEmail()
      this.validatePassword()

      if (!this.emailError && !this.passwordError) {
        // 提交表单
        console.log('提交表单')
      } else {
        console.log('表单验证失败')
      }
    },
    goToRegister() {
      this.$router.push('/userRegister')
    }
  }
}
</script>

<template>
  <div class="shell">
<!--    <div class="container b-container" id="b-container">
      <form action="" method="" class="form" id="a-form">
        <h2 class="form_title title">创建账号</h2>
        <div class="form_icons">
          <i class="iconfont icon-QQ"></i>
          <i class="iconfont icon-weixin"></i>
          <i class="iconfont icon-bilibili-line"></i>
        </div>
        <span class="form_span">选择注册方式或电子邮箱注册</span>
        <input type="text" class="form_input" v-model="account" placeholder="账号" @blur="validateAccount">
        <span v-if="accountError">{{ accountError }}</span>
        <input type="text" class="form_input" v-model="password" placeholder="密码" @blur="validatePassword">
        <span v-if="passwordError">{{ passwordError }}</span>
        <input type="text" class="form_input" placeholder="手机号">
        <button class="form_button button submit">创建</button>
      </form>
    </div>-->

    <div class="container a-container" id="a-container">
      <form action="" method="" class="form" id="b-form" >
        <h2 class="form_title title">登入账号</h2>
        <div class="form_icons">
          <div class="iconfont icon-QQ">
            <a class="wall-icon wall-qq"
               href="https://graph.qq.com/oauth2.0/authorize?response_type=code&amp;client_id=101137284&amp;redirect_uri=http%3A%2F%2Fuser.zhihuishu.com%2Fopen%2FQQCallbackDispatcher.do%3Fclient_name%3DQQClient&amp;state=aRfKm82ucY">
              <img
                  src="https://ts2.cn.mm.bing.net/th?id=OSK.9ac00b68716f3346e0e2e3f7b78348b8&w=46&h=46&c=11&rs=1&qlt=80&o=6&dpr=2&pid=SANGAM"
                  alt="" srcset="">
            </a>
          </div>
          <div class="iconfont icon-weixin">
            <a class="wall-icon wall-weixin"
               href="https://open.weixin.qq.com/connect/qrconnect?appid=wx3f96cd4b1dc1f574&amp;redirect_uri=https://user.zhihuishu.com/zhsuser/oauth/weixin/wxLogin?service=https://onlineservice-api.zhihuishu.com/login/gologin&amp;response_type=code&amp;scope=snsapi_login&amp;state=STATE#wechat_redirect">
              <img
                  src="https://ts2.cn.mm.bing.net/th?id=OSK.5a68ae111a2e9c0be9971d838e51ceac&w=46&h=46&c=11&rs=1&qlt=80&o=6&dpr=2&pid=SANGAM"
                  alt="" srcset="">
            </a>
          </div>
          <i class="iconfont icon-bilibili-line"></i>
        </div>
        <!-- <span class="form_span">选择登录方式或电子邮箱登录</span> -->
        <!-- <input type="text" class="form_input" placeholder="Email"> -->
        <!--1.账号-->
        <!-- <label for="username" class="input-label">账号</label> -->
        <input type="text" id="username" v-model="account" placeholder="请输入账号" required class="form_input"
               @change="searchAvatar" @blur="validateAccount">
        <span v-if="accountError" class="error">{{ accountError }}</span>

        <!-- <input type="text" class="form_input" placeholder="Password"> -->
        <!--2.密码-->
        <input type="password" id="password" v-model="password" placeholder="请输入密码" required class="form_input"
               @blur="validatePassword">
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
        <!--3.验证码-->
        <div style="display: flex;justify-content: space-between;align-items: center;"
             class="verification_code">
          <input type="text" id="captchaCode" v-model="inputCode" placeholder="请输入验证码" required
                 style="width: 70%" class="form_input"
                  @keyup.enter="userLogin"
          >
<!--                    @keyup.enter.native="userLogin"-->
          <div @click="refreshCode">
            <SIdentify  :identifyCode="identifyCode"></SIdentify>
          </div>
          <!--            <img :src="captchaCodeUrl">-->
        </div>

        <a class="form_link">忘记密码？</a>
        <button type="button" class="form_button button submit" @click="userLogin">登录</button>
      </form>
    </div>

    <div class="switch" id="switch-cnt">
      <div class="switch_circle"></div>
      <div class="switch_circle switch_circle-t"></div>
      <div class="switch_container" id="switch-c1">
        <h2 class="switch_title title" style="letter-spacing: 0;">欢迎回来！</h2>
        <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
        <!-- <button class="switch_button button switch-btn">创建</button> -->
        <button class="switch_button button" @click="goToRegister">创建</button>
      </div>

      <div class="switch_container is-hidden" id="switch-c2">
        <h2 class="switch_title title" style="letter-spacing: 0;">你好，朋友！</h2>
        <p class="switch_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p>
        <button class="switch_button button switch-btn">登录</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 字体无法选中 */
  user-select: none;
}

body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
}

.shell {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  /* box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9; */
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  border-radius: 12px;
  overflow: hidden;
}

.error {
  color: red;
  font-size: small;
}

/* 设置响应式 */
@media (max-width: 1200px) {
  .shell {
    transform: scale(0.7);
  }
}

@media (max-width: 1000px) {
  .shell {
    transform: scale(0.6);
  }
}

@media (max-width: 800px) {
  .shell {
    transform: scale(0.5);
  }
}

@media (max-width: 600px) {
  .shell {
    transform: scale(0.4);
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.iconfont {
  margin: 0 5px;
  /* border: rgba(0, 0, 0, 0.5) 2px solid; */
  border-radius: 50%;
  height: 54px;
  width: 54px;
  /* font-size: 25px; */
  padding: 3px;
  opacity: 0.8;
  transition: 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form_icons {
  /* background-color: skyblue; */
  display: flex;
  justify-content: space-between;
}

.iconfont img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.iconfont:hover {
  opacity: 1;
  transition: 0.15s;
  cursor: pointer;
}

.form_input {
  width: 350px;
  height: 40px;
  margin: 4px 0;
  padding-left: 25px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.verification_code {
  width: 350px;
  height: 40px;
}

.form_input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.form_span {
  margin-top: 30px;
  margin-bottom: 12px;
}

.form_link {
  color: #181818;
  font-size: 15px;
  margin-top: 25px;
  border-bottom: 1px solid #a0a5a8;
  line-height: 2;
}

.form_link:hover {
  color: blue;
  cursor: pointer;
}

.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
  letter-spacing: 10px;
}

.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4B70E2;
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
}

.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}

.switch_circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
  bottom: -60%;
  left: -60%;
  transition: 1.25s;
}

.switch_circle-t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.switch_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transition: 1.25s;
}

.switch_button {
  cursor: pointer;
}

.switch_button:hover,
.submit:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
  transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  transform: scale(0.97);
  transition: 0.25s;
}

.is-txr {
  left: calc(100% - 400px);
  transition: 1.25s;
  transform-origin: left;
}

.is-txl {
  left: 0;
  transition: 1.25s;
  transform-origin: right;
}

.is-z {
  z-index: 200;
  transition: 1.25s;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}

.is-gx {
  animation: is-gx 1.25s;
}

@keyframes is-gx {

  0%,
  10%,
  100% {
    width: 400px;
  }

  30%,
  50% {
    width: 500px;
  }
}
</style>
