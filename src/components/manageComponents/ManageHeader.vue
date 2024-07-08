<template>
  <div style="text-align: right; font-size: 12px; display: flex">
    <div style="flex: 1; font-size: 18px; text-align: left">
      <span
          :class="collapseBtnClass"
          style="cursor: pointer; font-size: 18px"
          @click="collapse"
      ></span>
      <el-breadcrumb
          separator="/"
          style="display: inline-block; margin-left: 20px"
      >
        <el-breadcrumb-item v-for="item in paths" :key="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown
        class="user"
        style="width: auto; display: flex; align-items: center"
    >
      <el-avatar
          style=""
          shape="circle"
          size="small"
          :src="$store.state.info.avatar"
      ></el-avatar>
      <span>{{ $store.state.info.nickname }}</span>
      <i class="el-icon-arrow-down" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link to="/manage/person" style="text-decoration: none">
            个人信息
          </router-link>
        </el-dropdown-item>
        <el-dropdown-item @click.native="$router.push('/manage/updatePassword')">修改密码</el-dropdown-item>
        <!-- <el-dropdown-item>
          <el-button @click="quit">退出</el-button>
        </el-dropdown-item> -->
        <el-dropdown-item @click.native="quit"> 退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "ManageHeader",
  // props: {
  //   collapseBtnClass: String,
  //   collapse: Function,
  // },
  data() {
    return {
      paths: [],
      collapseBtnClass: "el-icon-s-fold",
    };
  },
  mounted() {
    this.getInfo();
    this.updateBreadcrumb();
    this.$router.afterEach(() => {
      this.updateBreadcrumb();
    });
  },
  methods: {
    getInfo() {
      this.$store.commit("setInfo", JSON.parse(localStorage.getItem("accountData")));
    },
    collapse() {
      // this.isCollapse = !this.isCollapse;
      this.$store.state.logoInfo.isCollapse =
          !this.$store.state.logoInfo.isCollapse;
      if (this.$store.state.logoInfo.isCollapse) {
        this.$store.state.logoInfo.sideWidth = 60;
        this.collapseBtnClass = "el-icon-s-unfold";
        this.$store.state.logoInfo.showLogo =
            !this.$store.state.logoInfo.showLogo;
      } else {
        this.$store.state.logoInfo.showLogo =
            !this.$store.state.logoInfo.showLogo;
        this.$store.state.logoInfo.sideWidth = 200;
        this.collapseBtnClass = "el-icon-s-fold";
      }
    },
    quit() {
      localStorage.setItem("accountData", "{}");
      this.$router.push("/adminLogin");
    },
    updateBreadcrumb() {
      let matchedRoutes = this.$route.matched;
      //   matchedRoutes = matchedRoutes.splice(0, 1);
      this.paths = matchedRoutes.map((route) => ({
        // name: route.meta.title || route.name,
        name: route.name,
        path: route.path,
      }));
    },
  },
};
</script>

<style scoped>
.user {
  width: 100px;
  cursor: pointer;
}

.user span {
  margin-right: 8px;
}
</style>
