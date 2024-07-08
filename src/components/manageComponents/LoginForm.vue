<script>
export default {
  name: "LoginForm",
  data() {
    return {
      isAgree: false,
      loading: false,
      form: {
        account: "",
        password: "",
      },
      loginRules: {
        account: [
          {required: true, message: "请输入账户", trigger: "blur"},
          {
            min: 4,
            max: 10,
            message: "长度在 4 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {
            min: 4,
            max: 10,
            message: "长度在 4 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  // login() {
  //   request.post("/account/login", this.account).then((res) => {
  //     console.log(res);
  //     console.log(this.account);
  //     console.log(res.data.code)
  //     if (res.data.code === "200") {
  //       // 登录成功，保存token到本地存储
  //       localStorage.setItem(
  //           "userData",
  //           JSON.stringify({
  //             id: res.data.data.id,
  //             account: res.data.data.account,
  //             nickname: res.data.data.nickname,
  //             avatar: res.data.data.avatar,
  //             identity: res.data.data.identity,
  //             token: res.data.data.token,
  //           })
  //       );
  //       console.log(localStorage.getItem("identity"));
  //       if (res.data.data.identity === "admin") {
  //         this.$router.push("/manage/home");
  //       } else {
  //         this.$router.push("/");
  //       }
  //       this.$message.success("登录成功");
  //     } else {
  //       this.$message.error("登录失败");
  //     }
  //   });
  // },
  methods: {
    handleLogin() {
      if (this.isAgree === false) {
        this.$notify({
          title: '警告',
          message: '请先阅读，并同意协议！',
          type: 'warning'
        });
        return
      }
      this.$refs.loginForm
          .validate()
          .then(() => {
            this.loading = true;
            this.request.post("/account/login", this.form).then((res) => {
              //模拟异步请求后台接口 登录操作
              setTimeout(() => {
                this.loading = false;
                if (res) {
                  // console.log("abc", res);
                  // this.$store.commit("setInfo", res);
                  //不暴露管理员密码
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
                  // delete res.data.password
                  // localStorage.setItem("accountData", JSON.stringify(res));
                  this.$router.push("/adminLogin/face");
                  // console.log(res);
                  // localStorage.setItem("token", res.data.token);

                } else {
                  this.$message.error("请再次检查账号或密码是否错误");
                }
              }, 2000);
            });
          })
          .catch((error) => {
            this.loading = false;
            this.$message({
              message: "输入错误！",
              type: "warning",
            });
          });
    },
  },
}
</script>

<template>

  <div class="login-form">
    <el-form :model="form" :rules="loginRules" ref="loginForm">
      <el-form-item prop="account">
        <el-input
            type="text"
            v-model="form.account"
            auto-complete="off"
            placeholder="请输入用户名"
        >
          <template slot="prepend"
          ><i style="font-size: 20px" class="el-icon-user"></i
          ></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            type="password"
            v-model="form.password"
            auto-complete="off"
            placeholder="请输入密码"
        >
          <template slot="prepend"
          ><i style="font-size: 20px" class="el-icon-key"></i
          ></template>
        </el-input>
      </el-form-item>

      <el-form-item style="display: flex; justify-content: center">
        <el-button type="primary" @click="handleLogin" :loading="loading"
        >登录
        </el-button
        >
        <!--            :disabled="disabled"-->
        <el-tooltip content="管理员账号由内部提供" placement="top" effect="light">

          <el-button type="warning" disabled>注册</el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <el-checkbox v-model="isAgree">同意<a href="#">《政策协议》</a></el-checkbox>
    <!--    <div class="card-footer">-->

    <!--    </div>-->
  </div>
</template>

<style scoped>

</style>
