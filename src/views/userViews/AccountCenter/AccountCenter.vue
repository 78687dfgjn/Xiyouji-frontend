<template>
  <div
    style="background-color: aliceblue; display: flex; justify-content: center"
  >
    <!-- width:60vw -->
    <div
      class="AccountCenterBody"
      style="
        width: 1000px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      "
    >
      <div
        class="AccountCenterHead"
        style="
          width: 100%;
          height: 250px;
          background-color: white;
          display: flex;
          justify-content: center;
          padding-top: 20px;
          padding-bottom: 20px;
        "
      >
        <div
          class="AccountMessage"
          style="width: 90%; display: flex; justify-content: space-between"
        >
          <div class="AccountMessageLeft" style="width: 20%" v-if="accountData">
            <el-avatar :size="130" :src="accountData.avatar"></el-avatar>
          </div>
          <div class="AccountMessageRight" style="width: 80%">
            <div
              class="userName"
              style="display: flex; justify-content: space-between"
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
                v-if="accountData"
              >
                <h3>{{ accountData.nickname }}</h3>
              </div>
              <el-button
                type="primary"
                plain
                @click="$router.push('/user/updateAccount')"
                >修改信息</el-button
              >
            </div>
            <div
              class="userId"
              v-if="accountData"
              style="font-size: 11px; color: #ccc"
            >
              用户ID: {{ accountData.id }}
            </div>
            <div
              class="userSign"
              style="
                margin-top: 10px;
                display: flex;
                justify-content: flex-start;
              "
            >
              <img
                src=""
                class="el-icon-s-order"
                style="color: pink; font-size: 20px; margin-right: 5px"
              />
              <div style="font-size: 14px" v-if="accountData">
                {{ motto }}
              </div>
            </div>

            <div
              class="userIP"
              style="
                display: flex;
                justify-content: flex-start;
                margin-top: 10px;
              "
            >
              <img
                src=""
                class="iconfont icon-ip"
                style="
                  color: cornflowerblue;
                  font-size: 20px;
                  margin-right: 5px;
                "
              />
              <div style="font-size: 14px" v-if="accountData">
                {{ accountData.province }}
              </div>
            </div>

            <div
              class="userMessage"
              style="
                width: 100%;
                margin-top: 17px;
                padding-top: 17px;
                border-top: 1px solid #ccc;
                display: flex;
                flex-direction: row;
              "
            >
              <div
                style="display: flex; flex-direction: row; margin-right: 20px;align-items: center;"
              >
                <div style="font-size: 20px;color: #333333;">{{this.fansCount}}</div>
                <div style="font-size: 14px;color: #cccccc;margin-left: 10px;">粉丝</div>
              </div>
              <div
                style="display: flex; flex-direction: row; margin-right: 20px;align-items: center;"
              >
                <div style="font-size: 20px;color: #333333;">{{this.followCount}}</div>
                <div style="font-size: 14px;color: #cccccc;margin-left: 10px;">关注</div>
              </div>
              <div
                style="display: flex; flex-direction: row; margin-right: 20px;align-items: center;"
              >
                <div style="font-size: 20px;color: #333333;">{{ this.likeCount }}</div>
                <div style="font-size: 14px;color: #cccccc;margin-left: 10px;">获赞</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="AccountCenterFoot"
        style="
          display: flex;
          justify-content: space-between;
          min-height: 100vh;
          height: auto;
          width: 100%;
          margin-top: 20px;
        "
      >
        <div
          class="FootLeft"
          style="
            width: 22%;
            background-color: white;
            display: flex;
            flex-direction: column;
          "
        >
          <div
            class="FootLefthead"
            style="
              width: 75%;
              height: 50px;
              display: flex;
              align-items: center;
              padding-left: 40px;
              padding-right: 40px;
            "
          >
            <h3 style="font-weight: 350">个人中心</h3>
          </div>
          <div
            class="FootLeftBottem"
            style="
              width: 100%;
              background-color: white;
              border-top: 1px solid #ccc;
            "
          >
            <!-- <el-col style=""> -->
            <el-menu
              router
              default-active="/user/accountCenter/accountPosts"
              class="el-menu-vertical-demo"
              style="border: 0"
            >
              <el-menu-item index="/user/accountCenter/accountPosts">
                <i class="el-icon-tickets"></i>
                <span slot="title">我的发帖</span>
              </el-menu-item>

              <el-menu-item index="/user/accountCenter/accountComments">
                <i class="el-icon-chat-line-square"></i>
                <span slot="title">我的评论</span>
              </el-menu-item>

              <el-menu-item index="/user/accountCenter/accountCollect">
                <i class="el-icon-star-off"></i>
                <span slot="title">我的收藏</span>
              </el-menu-item>

              <el-menu-item index="/user/accountCenter/accountFootprint">
                <i
                  class="iconfont icon-zuji"
                  style="font-size: 20px; margin-right: 6px"
                ></i>
                <span slot="title">我的足迹</span>
              </el-menu-item>

              <el-menu-item index="/user/accountCenter/followAccount">
                <i
                  class="iconfont icon-guanzhu"
                  style="font-size: 20px; margin-right: 6px"
                ></i>
                <span slot="title">我的关注</span>
              </el-menu-item>

              <el-menu-item index="/user/accountCenter/fansAccount">
                <i
                  class="iconfont icon-wodefensi"
                  style="font-size: 20px; margin-right: 6px"
                ></i>
                <span slot="title">我的粉丝</span>
              </el-menu-item>
            </el-menu>
            <!-- </el-col> -->
          </div>
        </div>
        <div class="FootRight" style="width: 76%; background-color: white">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountData: {},
      motto: "",
      likeCount: null,
      followCount: null,
      followList: [],
      fansCount: null,
      fansList: [],
    };
  },
  methods: {
    getAccountData() {
      const accountData = JSON.parse(localStorage.getItem("accountData"));
      this.accountData = accountData;
      this.accountData.nickname = accountData
        ? accountData.nickname || accountData.account
        : null;
      this.request.get("/account?id=" + accountData.id).then((res) => {
        this.motto = this.accountData.motto = res.data.motto;
        this.accountData.province = res.data.province;
      });

      // if (!this.accountData) {
      //   this.$router.push("/");
      //   this.$message.error("未检测到登录信息，请先登录");
      // }
    },
    getLikeCount(accountId) {
      this.request
        .post("/post/selectLikeCountByAccountId", accountId)
        .then((res) => {
          this.likeCount = res.data;
        });
    },
    getFollowCount(accountId) {
      this.request
        .post("/followAccount/selectFollowAccountList", accountId)
        .then((res) => {
          this.followCount = res.data.length;
        });
    },
    getFansCount(accountId) {
      this.request
        .post("/followAccount/selectFanList", accountId)
        .then((res) => {
          this.fansCount = res.data.length;
        });
    },
  },
  mounted() {
    this.getAccountData();
    this.getLikeCount(this.accountData.id);
    this.getFollowCount(this.accountData.id);
    this.getFansCount(this.accountData.id);
  },
};
</script>

<style>
.el-menu-item {
  padding-left: 40px !important;
  padding-right: 40px !important;
}
</style>
