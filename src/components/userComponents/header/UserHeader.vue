<style scoped>
/* .search-box {
  width: 240px;
  height: 100%;
  float: right;
  margin-top: 10px;
  margin-right: 20%;
} */


.title {
  height: 100%;
  font-size: 16px;

}

.logo {
  margin-top: 10px;
  height: 60%;
  width: 50px;

}

.drop-down {
  width: 116px;
}

.el-submenu__icon-arrow.el-icon-arrow-down {
  margin-left: 20px;
}
</style>

<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        style="display: flex; flex-direction: row;"
        @select="handleSelect"
        router
    >
      <div style="display: flex;width: 100%;justify-content: space-around;">
        <div
            class="HeadStart"
            style="
          width: auto;
          display: flex;
          flex-direction: row;
          justify-content: start;
          align-items: center;
        "
        >
          <el-menu-item
              class="logo-title"
              style="width: 120px; display: flex; justify-content: flex-start"
          >
            <img src="../../../assets/LOGO1.png" alt="LOGO" class="logo"/>
            <h3 class="title">栖游集</h3>
          </el-menu-item>
          <el-menu-item index="/user/home">首页</el-menu-item>

          <el-submenu index="2" class="drop-down">
            <template slot="title">创意工坊</template>
            <el-menu-item index="/user/chat">智能顾问</el-menu-item>
            <el-menu-item index="/user/recommend"
            >旅游计划定制与规划
            </el-menu-item
            >
            <el-menu-item index="/user/test">测试</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="/user/community">文旅社区</el-menu-item>
          <el-menu-item index="/user/heritage">非遗之旅</el-menu-item>
          <el-menu-item index="/user/shop">快购好物</el-menu-item>
        </div>

        <div
            class="HeadEnd"
            style="
          width: 55%;
          display: flex;
          justify-content: end;
          align-items: center;

        "
        >
          <div style="width: 50%;display: flex; flex-direction: row;justify-content: space-around;">
            <div class="search-box" style="display: flex;align-items: center;">
              <el-autocomplete
                  class="inline-input search-input"
                  v-model="searchContext"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  :trigger-on-focus="false"
                  @select="searchSuggestionSelect"
              ></el-autocomplete>
            </div>
            <el-dropdown placement="bottom" v-if="accountData">
              <div style="display: flex; align-items: center; cursor: pointer">
                <el-avatar
                    :size="50"
                    :src="accountData.avatar"
                    v-on:click.native="intoAccountCenter"
                    v-if="accountData"
                ></el-avatar>
                <span style="color: black">{{ accountData.nickname }}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-on:click.native="intoAccountCenter"
                >个人中心
                </el-dropdown-item
                >
                <el-dropdown-item v-on:click.native="intoAccountCenter"
                >修改密码
                </el-dropdown-item
                >
                <el-dropdown-item v-on:click.native="loginOut"
                >退出登录
                </el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

    </el-menu>
  </div>
</template>
<script>
import {mapState} from "vuex";
import PlayAll from "@/components/userComponents/home/PlayAll.vue";

export default {
  name: "UserHeader",
  components: {PlayAll},
  data() {
    return {
      searchContain: "",
      activeIndex: this.$route.path,
      accountData: null,
      searchContext: '',
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    loginOut() {
      localStorage.removeItem("accountData");
      this.$router.push("/");
      this.$message.error("退出登录");
    },
    intoAccountCenter() {
      if (this.$route.path !== "/user/accountCenter/accountPosts") {
        this.$router.push("/user/accountCenter/accountPosts");
      }
    },
    postInto(postId) {
      if (this.$route.name === "帖子详情") {
        this.$router.push("/user/home")
        setTimeout(() => {
          this.$router.push({name: "帖子详情", params: {postId}});
        }, 1)
      } else {
        this.$router.push({name: "帖子详情", params: {postId}});
      }
    },
    querySearch(queryString, cb) {
      this.request.get("/post/search?keyword=" + this.searchContext).then(res => {
        cb(res.data)
      })
    },
    searchSuggestionSelect(item) {
      this.postInto(item.postId)
      this.searchContext = ''
    }
  },
  mounted() {
    this.$store.dispatch("getUserInfo");

    const accountData = JSON.parse(localStorage.getItem("accountData"));
    this.accountData = JSON.parse(localStorage.getItem("accountData"));
    this.accountData.nickname = accountData
        ? accountData.nickname || accountData.account
        : null;

    // if (!this.accountData) {
    //   this.$router.push("/");
    //   this.$message.error("未检测到登录信息，请先登录");
    // }
  },
};
</script>

