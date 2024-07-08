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
    }
  },
  mounted() {
    // this.getCaptchaCode()
    this.identifyCode = ""
    this.makeCode(this.identifyCodes, 4);
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
          this.$message.success("登录成功，欢迎您，" + res.data.nickname + "!")
          this.$router.push("/user/home")
        } else {
          this.$message.error(res.msg)
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
  }
}
</script>

<template>
  <div class="outer-box">
    <div class="left">

      <img :src="userAvatar" class="user-avtar">
    </div>
    <div class="right">
      <!--      <h2>点击切换登录方式</h2>-->
      <label class="switch">
        <input type="checkbox" v-model="loginMode">
        <span class="slider"></span>
      </label>
      <div class="login-form">

        <h1>栖游集-前台</h1>
        <h2>用户登录</h2>

        <div class="input-container" v-show="loginMode">
          <label for="username" class="input-label">手机号</label>
          <input type="text" id="phoneNumber" v-model="phoneNumber" placeholder="请输入手机号码" required
                 class="input-field" @change="searchAvatar">
        </div>

        <div class="input-container" v-show="loginMode" style="width: 35%">
          <label for="code" class="input-label">验证码</label>
          <input type="text" id="code" v-model="code" placeholder="请输入验证码" required
                 class="input-field">

        </div>
        <div class="input-container" v-show="!loginMode">
          <label for="username" class="input-label">账号</label>
          <input type="text" id="username" v-model="account" placeholder="请输入账号" required
                 class="input-field" @change="searchAvatar">
        </div>
        <div class="input-container" v-show="!loginMode">
          <label for="password" class="input-label">密码</label>
          <input type="password" id="password" v-model="password" placeholder="请输入密码" required
                 class="input-field">
        </div>
        <div class="input-container" v-show="!loginMode">
          <label for="captchaCode" class="input-label">验证码</label>
          <div style="display: flex;justify-content: space-between">
            <input type="text" id="captchaCode" v-model="inputCode" placeholder="请输入验证码" required
                   style="width: 60%"
                   class="input-field">
            <div @click="refreshCode">
              <SIdentify :identifyCode="identifyCode"></SIdentify>
            </div>
            <!--            <img :src="captchaCodeUrl">-->
          </div>

        </div>

        <button class="login-button" @click="userLogin">登录</button>
        <div class="footer">
          <router-link class="to-register" to="/userRegister">没有账号？点击注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 180px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #3C3C3C;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #0E6EB8;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(145px);
  //-webkit-transform: translateX(26px);
  //-ms-transform: translateX(26px);
  //transform: translateX(85px);
}

/*------ ADDED CSS ---------*/
.slider:after {
  content: '手机登录->';
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  font-size: 16px;
  font-family: 宋体, Verdana, sans-serif;
}

input:checked + .slider:after {
  content: '<-账号登录';
}


.outer-box {
  display: flex;

}


.right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.to-register {
  font-size: 18px;
  color: #28a745;
  text-decoration: none;
}

h2 {
  font-size: 26px;
  margin-left: 30%;
  color: #f8f9fa;
}

h1 {
  font-size: 38px;
  color: #f8f9fa;
}

.footer {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

/* 输入框容器样式 */
.input-container {
  margin-bottom: 15%;
  width: 300px;
  height: 30px;
  margin-left: 10%;
}

/* 输入框标签样式 */
.input-label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

/* 输入框样式 */
.input-field {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

/* 输入框获取焦点样式 */
.input-field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
}

.outer-box {
  width: 100%;
  height: 100%;
  display: flex;
  //justify-content: ;
}

.user-avtar {
  height: 300px;
  width: 300px;
  border-radius: 50%;

}

.left {
  flex: 1;
  //height: 100%;
  //width: 50%;
  //padding-top: 12%;
  //padding-left: 11%;
  display: flex;
  align-items: center;
  justify-content: center;
  //flex-direction: column;
  //background-image: url("@/assets/wuwu.jpeg");
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  background-size: cover;
  //display: inline-block;
}

button {
  margin-top: 15%;
  margin-left: 30%;
  width: 115px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 38px;
  border-radius: 16px;
  border: 1px solid transparent;
  color: #FFFFFF;
  background-color: #1DC9A0;
  font-size: 16px;
  letter-spacing: 1px;
  transition: all 0.15s linear;
}

button:hover {
  background-color: rgba(29, 201, 160, 0.08);
  border-color: #1DC9A0;
  color: #1DC9A0;
  transform: translateY(-5px) scale(1.05);
}

button:active {
  background-color: transparent;
  border-color: #1DC9A0;
  color: #1DC9A0;
  transform: translateY(5px) scale(0.95);
}

button:disabled {
  background-color: rgba(255, 255, 255, 0.16);
  color: #8E8E93;
  border-color: #8E8E93;
}
</style>
