<script>
export default {
  name: "UserRegister",
  data() {
    return {
      registerInfo: {
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        sex: '',
        birthdate: '',
        email: '',
      }
    }
  },
  methods: {
    register() {
      console.log(this.confirmPassword === this.password)
      if ((this.registerInfo.confirmPassword !== this.registerInfo.password)
          || (this.registerInfo.password === '') || (this.registerInfo.phoneNumber === '')) {
        this.$message.error("两次密码输入不一致")
        return
      }
      this.request.post("/account/register", this.registerInfo).then(res => {

      })
    },
    reset() {
      for (let key in this.registerInfo) {
        this.registerInfo[key] = ''
      }
    }
  }
}
</script>

<template>
  <div class="register-box">
    <!--    <form id="registrationForm" action="login.html" method="post">-->
    <!--  阻止默认表单提交-->
    <form id="registrationForm" method="post" @submit.prevent="submitForm">
      <h1>湘西一体化服务平台-前台</h1>
      <h1>用户注册</h1>
      <label for="username">手机号码:</label>
      <input type="text" placeholder="请输入手机号码" v-model.number.lazy.trim="registerInfo.phoneNumber"
             name="phoneNumber" required>

      <label for="password">密码:</label>
      <input type="password" placeholder="请输入密码" v-model.lazy.trim="registerInfo.password" name="password"
             required>

      <label for="confirmPassword">确认密码:</label>
      <input type="password" placeholder="请输入确认密码" v-model.lazy.trim="registerInfo.confirmPassword"
             name="confirmPassword" required>

      <div class="select">
        <label>性别:</label>
        <label for="male">
          <input type="radio" id="male" name="gender" v-model.lazy.trim="registerInfo.sex" value="1">
          <span>男</span>
        </label>
        <label for="female">
          <input type="radio" id="female" name="gender" v-model.lazy.trim="registerInfo.sex" value="0">
          女
        </label>
      </div>

      <label for="birthdate">出生日期:</label>
      <input type="date" placeholder="请选择生日" v-model.lazy.trim="registerInfo.birthdate" name="birthdate">

      <!--      <div class="select">-->
      <!--        <label>个人兴趣:</label>-->
      <!--        <label for="interest1">-->
      <!--          <input type="checkbox" id="interest1" name="interest1" value="interest1">-->
      <!--          唱-->
      <!--        </label>-->
      <!--        <label for="interest2">-->
      <!--          <input type="checkbox" id="interest2" name="interest2" value="interest2">-->
      <!--          跳-->
      <!--        </label>-->
      <!--        <label for="interest3">-->
      <!--          <input type="checkbox" id="interest3" name="interest3" value="interest3">-->
      <!--          rap-->
      <!--        </label>-->
      <!--        <label for="interest4">-->
      <!--          <input type="checkbox" id="interest4" name="interest4" value="interest4">-->
      <!--          篮球-->
      <!--        </label>-->
      <!--      </div>-->

      <label for="email">个人邮箱:</label>
      <input type="email" placeholder="请输入邮箱" v-model.lazy.trim="registerInfo.email" name="email">

      <!--      <label for="bio">个人简介:</label>-->
      <!--      <textarea id="bio" name="bio" rows="4"></textarea>-->
      <label>
        <input type="checkbox" name="agreeTerms" required>
        我同意<a href="#" style="text-decoration: none; color: #4caf50">《服务条款》</a></label>
      <input type="button" value="注册" @click="register">
      <input type="button" value="重置" @click="reset">

    </form>
  </div>
</template>

<style scoped>
label {
  font-size: 20px;

}

.register-box {
  font-family: 宋体, serif;
  height: 100vh;
  width: 100vw;
  background-image: url("@/assets/register_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  text-align: left;
  background-color: rgba(255, 255, 255, 0.8);
  /* 透明度设置为0.9 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.9);
  /* 盒子阴影 */
  width: 40%;
  transition: background-color 0.3s, box-shadow 0.3s;
  /* 添加过渡效果 */
}

form:hover {
  background-color: rgba(255, 255, 255, 1);
  /* 鼠标悬停时完全不透明 */
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
  /* 鼠标悬停时阴影加深 */
}

label {
  display: inline-block;
  margin-bottom: 8px;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="radio"] {
  margin-right: 5px;
}

input[type="button"],
input[type="button"] {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 40px;
  cursor: pointer;
}


input[type="button"]:hover,
input[type="button"]:hover {
  background-color: #45a049;
}


.select input,
input[name="agreeTerms"] {
  width: 20px;
}

h1 {
  font-size: 28px;
  text-align: center;

}
</style>
