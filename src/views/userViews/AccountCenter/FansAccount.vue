<template>
    <div>
      <div
        class="head"
        style="
          height: 50px;
  
          display: flex;
          align-items: center;
          padding-left: 30px;
          padding-right: 30px;
        "
      >
        <h3 style="font-weight: 350">我的粉丝</h3>
      </div>
  
      <div
        v-for="follow in followList"
        :key="follow.accountId"
        style="width: 100%"
      >
        <div
          class="followMain"
          style="
            height: 90px;
            padding: 15px 40px 15px 30px;
            border-top: 1px solid #ccc;
            display: flex;
            flex-direction: row;
          "
        >
          <div class="followAvatar" style="width: 60px; height: 60px">
            <el-avatar :size="53" :src="follow.avatar"></el-avatar>
          </div>
          <div class="followMessage" style="height: 60px; width: 80%">
            <div
              class="followNickname"
              style="
                font-size: 14px;
                display: inline-block;
                vertical-align: middle;
              "
            >
              {{ follow.nickname }}
            </div>
            <div
              class="followMotto"
              style="
                color: #999;
                font-size: 13px;
                line-height: 14px;
                margin-top: 5px;
              "
            >
              {{ follow.motto }}
            </div>
          </div>
          <div
            class="isFollow"
            style="
              height: 60px;
              width: 12%;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <div>
              <el-button
                type="primary"
                :class="{
                  isFollowButton: follow.follow,
                  noFollowButton: !follow.follow,
                }"
                style="
                  width: 80px;
                  height: 30px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border: 0px;
                "
                v-on:click.native="isFollow(follow)"
                round
                >{{ follow.follow ? "已关注" : "回关" }}</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        followList: [],
        accountData: null,
        size: 55,
      };
    },
    methods: {
      getFollowList(accountId) {
        this.request
          .post("/followAccount/selectFanList", accountId)
          .then((res) => {
            this.followList = res.data;
          });
      },
      isFollow(follow) {
        follow.follow = !follow.follow;
        const followAccountData = {
          accountId: this.accountData.id,
          followAccountId: follow.id,
        };
        console.log(followAccountData)
        if (follow.follow) {
        //   const followAccountData = {
        //   accountId: this.accountData.id,
        //   followAccountId: follow.id,
        // };
          this.request
            .post("/followAccount/followAccountAdd", followAccountData)
            .then((res) => {});
        } else {
        //   const followAccountData = {
        //   accountId: this.accountData.id,
        //   followAccountId: follow.id,
        // };
          this.request
            .post("/followAccount/followAccountDelete", followAccountData)
            .then((res) => {});
        }
      },
    },
    mounted() {
      this.accountData = JSON.parse(localStorage.getItem("accountData"));
      this.getFollowList(this.accountData.id);
    },
  };
  </script>
  
  <style>
  .isFollowButton {
    font-size: 14px !important;
    background-color: #f5f5f5 !important;
    color: #999 !important;
  }
  
  .noFollowButton {
    font-size: 14px !important;
    background-color: #00c3ff !important;
    color: white !important;
  }
  </style>