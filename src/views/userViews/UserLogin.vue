<script>
//用户登录页面
import NewLogin from "@/components/userComponents/NewLogin.vue";

export default {
  name: "UserLogin",
  components: {
    NewLogin
  },
}
</script>

<template>
  <div class="login-body title-font">
    <div class="login-box">
<!--            <UserLoginForm></UserLoginForm>-->
      <NewLogin></NewLogin>
    </div>
  </div>
</template>

<style scoped>
.login-body {
  height: 100vh;
  background-image: url("@/assets/风景绘画5K桌面壁纸.jpg");
  background-size: cover;
  padding-top: 15vh;
}

.login-box {
  //box-shadow: 2px 2px 9px 2px #f2f2f2;
  margin-left: 35vh;
  width: 60%;
  height: 70%;
  border-radius: 8%;
  //background-color: rgba(255, 255, 255, 0.4);
  //background-color: rgba(0, 0, 0, 0.1);
}
</style>
