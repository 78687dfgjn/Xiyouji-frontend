<style scoped>
.login-page {
  /* background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%); */
  background-image: url("@/assets/风景绘画5K桌面壁纸.jpg");
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


.outer-card {
  width: 60%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-start {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //align-items: center;
}

.card-start span {
  font-size: 24px;
  padding-left: 20px;
}

.box-card {
  width: 375px;

  align-self: center;
  text-align: center;

}

.login-card {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.login-card div:nth-child(1) {
  width: 320px;
}
</style>

<template>
  <div class="login-page">
    <el-card class="outer-card">
      <div class="card-start">
        <span>🔐栖游集</span>
      </div>
      <div class="login-card">
        <div>
          <el-steps direction="vertical" :active="stepActive" finish-status="success">
            <el-step title="步骤 1" description="填写账号信息"></el-step>
            <el-step title="步骤 2" description="人脸识别验证"></el-step>
          </el-steps>
        </div>
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="">
            <span class="login-title">管理员账号登录</span>
          </div>
          <router-view></router-view>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>

//管理员登录的页面
export default {
  name: "Login",
  data() {
    return {
      routerList: [
        '',
        ''
      ],
      stepActive: this.$route.path === '/adminLogin/loginForm' ? 1 : 2,
    }
  },
  methods: {}
};
</script>



