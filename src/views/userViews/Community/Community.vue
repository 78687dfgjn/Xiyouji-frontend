<template>
  <div
      style="display: flex; justify-content: center; background-color: aliceblue"
  >
    <div style="width: 1000px; display: flex">
      <div class="PageLeft">
        <!-- 轮播图 -->
        <div style="">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in imgArr" :key="item">
              <img
                  :src="item"
                  :alt="item"
                  class="carousel-img"
                  style="object-fit: cover"
              />
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 文章 -->
        <div class="Posts" style="display: flex; flex-direction: column">
          <div
              v-for="post in postList"
              :key="post.postId"
              style="
              min-height: 260px;
              height: auto;
              padding-left: 2%;
              padding-right: 2%;
            "
          >
            <div
                class="PostHead"
                style="display: flex; justify-content: space-around; height: 15%"
            >
              <div class="Author" style="display: flex; align-items: center">
                <span>
                  <el-avatar :size="35" :src="post.avatar"> </el-avatar>
                </span>
                <div style="margin-top: 0px; min-width: 20%; width: auto">
                  <span style="font-size: 13px; width: 100%">{{
                      post.nickname
                    }}</span>
                </div>

                <div
                    style="
                    display: flex;
                    margin-top: 0px;
                    margin-left: 10px;
                    align-items: center;
                    font-size: 13px;
                    color: #ccc;
                  "
                >
                  {{ post.time }}
                </div>
                <span
                    v-if="
                    post.likeCount > 999 ||
                    post.commentCount > 999 ||
                    post.collectCount > 999
                  "
                ><img
                    src=""
                    class="iconfont icon-remen"
                    style="color: #cccccc; font-size: 20px"
                /></span>
              </div>

              <div
                  class="Follow"
                  style="
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                "
                  v-if="accountData.id != post.accountId"
              >
                <el-button
                    type="primary"
                    :class="{
                    FollowButton: post.follow,
                    noFollowButton: !post.follow,
                  }"
                    style="
                    width: 70px;
                    height: 26px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 0px;
                  "
                    v-on:click="isFollow(post)"
                    round
                >{{ post.follow ? "已关注" : "关注" }}
                </el-button
                >
              </div>
            </div>

            <div class="PostMessage" v-on:click="postInto(post.postId)">
              <div class="PostTitle" style="height: 15%">
                <h3 style="border-bottom: 1px solid #ccc">{{ post.title }}</h3>
              </div>
              <div class="PostText" v-html="getSummary(post.text)"></div>

              <div class="img-box" style="max-height: 100px">
                <img
                    style="width: 100px; height: 100px; margin: 8px"
                    v-for="img in extractImages(post.text).splice(0, 4)"
                    :key="img"
                    :src="img"
                />
              </div>
            </div>

            <div class="PostBottom" style="margin-top: 0px">
              <div
                  style="
                  width: 30%;
                  display: flex;
                  justify-content: space-around;
                  margin-top: 0px;
                "
              >
                <div class="LikeCount" style="margin-top: 0px">
                  <img
                      src=""
                      class="iconfont icon-dianzan"
                      style="font-size: 20px"
                  />
                  <span v-if="post.likeCount < 999" style="font-size: 14px">{{
                      post.likeCount
                    }}</span>
                  <span v-else style="font-size: 14px">999+</span>
                </div>

                <div class="CommentCount" style="margin-top: 0px">
                  <img
                      src=""
                      class="el-icon-chat-line-round"
                      style="font-size: 20px"
                  />
                  <span
                      v-if="post.commentCount <= 999"
                      style="font-size: 14px"
                  >{{ post.commentCount }}</span
                  >
                  <span v-else style="font-size: 14px">999+</span>
                </div>

                <div class="CollectCount" style="margin-top: 0px">
                  <img
                      src=""
                      class="el-icon-star-off"
                      style="font-size: 20px"
                  />
                  <span
                      v-if="post.collectCount <= 999"
                      style="font-size: 14px"
                  >{{ post.collectCount }}</span
                  >
                  <span v-else style="font-size: 14px">999+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
          class="PageRight"
          style="width: 20vw; display: flex; flex-direction: column"
      >
        <div
            style="
            align-items: center;
            justify-content: center;
            flex-direction: column;
            display: flex;
          "
        >
          <div
              style="
              display: flex;
              align-items: center;
              flex-direction: column;
              margin-top: 0px;
            "
          >
            <el-button
                type="primary"
                class="btn-carousel-R"
                v-on:click="postAdd"
            >
              <i class="el-icon-edit" style="margin-right: 20%"></i>
              发布帖子
              <i class="el-icon-arrow-right" style="margin-left: 20%"></i>
            </el-button>

            <!-- 这个不动，动了对齐不了 -->
            <span></span>

            <el-button type="primary" class="btn-carousel-R">
              <i class="el-icon-picture-outline" style="margin-right: 20%"></i>
              发布图片
              <i class="el-icon-arrow-right" style="margin-left: 20%"></i>
            </el-button>
          </div>
        </div>

        <div style="height: 270px; display: flex; flex-direction: column">
          <div class="Border-Head-Right">
            <h4>推荐话题</h4>
            <span
                class="ChangeBatch"
                style="color: darkgray; font-size: 14px"
                v-on:click="changeBatch"
            >换一批</span
            >
          </div>

          <div style="display: flex; flex-direction: column; margin-top: 0px">
            <div
                v-for="recommendPost in popularRecommendList"
                :key="recommendPost.postId"
                style="
                display: flex;
                justify-content: center;
                align-items: stretch;
              "
            >
              <div style="margin-top: 3px; width: 80%; display: flex">
                <div
                    class="PopularRecommend"
                    style="margin-top: 0px; flex-direction: row"
                    v-on:click="postInto(recommendPost.postId)"
                >
                  <el-tag
                      style="
                      height: 20px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  ><span style="font-size: 12px">话题</span></el-tag
                  >
                  <div style="margin-top: 0px; margin-left: 5px">
                    {{ recommendPost.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="height: 30vh">
          <div class="Border-Head-Right">
            <h4>官方资讯</h4>
            <span style="color: darkgray; font-size: 14px">更多</span>
          </div>
        </div>

        <div style="height: 300px">
          <div class="Border-Head-Right">
            <h4>推荐用户</h4>
            <span style="color: darkgray; font-size: 14px">换一批</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Community",
  data() {
    return {
      postList: null,
      popularRecommendList: null,
      accountData: null,
      article: {
        lastArticle: [],
        hotArticle: [],
      },
      imgArr: [
        require("./image/1.jpg"),
        require("./image/2.jpg"),
        require("./image/3.jpg"),
        require("./image/4.jpg"),
      ],
    };
  },
  methods: {
    pageInit() {
      this.request.post("/post/selectAllPosts").then((res) => {
        this.postList = res.data.reverse();
      });
      // this.request.get("/post/hot").then(res => {
      //   this.article.hotArticle = res.data;
      // });
      // this.request.get("/post/last").then(res => {
      //   this.article.lastArticle = res.data;
      // });
    },
    postAdd() {
      this.$router.push("/user/postEditing");
    },
    postInto(postId) {
      // window.open(`/post/${postId}`, '_blank');
      if (this.$route.name === "帖子详情") {
        this.$router.push("/user/home");
        setTimeout(() => {
          this.$router.push({name: "帖子详情", params: {postId}});
        }, 1);
      } else {
        this.$router.push({name: "帖子详情", params: {postId}});
      }
    },

    getSummary(text) {
      const maxLength = 100; // 设置摘要的最大长度
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.slice(0, maxLength) + "\n......"; //截断后的文本加省略号
      }
    },

    popularRecommend() {
      this.request
          .post("/mahout/postRecommend", this.accountData.id)
          .then((res) => {
            this.popularRecommendList = res.data;
          });
    },
    extractImages(htmlContent) {
      const regex = /<img[^>]*src=["']([^"']*)["'][^>]*>/gi;
      let match;
      let images = [];
      while ((match = regex.exec(htmlContent)) !== null) {
        // match[1] 包含src属性的值
        images.push(match[1]);
      }
      return images;
    },

    changeBatch() {
      this.popularRecommend();
    },

    isFollow(post) {
      post.follow = !post.follow;
      const followAccountData = {
        accountId: this.accountData.id,
        followAccountId: post.accountId,
      };
      if (post.follow) {
        this.request
            .post("/followAccount/followAccountAdd", followAccountData)
            .then((res) => {
            });
      } else {
        this.request
            .post("/followAccount/followAccountDelete", followAccountData)
            .then((res) => {
            });
      }
    },
  },
  mounted() {
    this.pageInit();

    this.accountData = JSON.parse(localStorage.getItem("accountData"));
    this.request.post("/post/selectAllPosts", this.accountData.id).then((res) => {
      this.postList = res.data.reverse();
      console.log(this.postList)
    });

    this.popularRecommend();
  },
};
</script>

<style>
/* 右侧 */
.btn-carousel-R {
  font-size: 15px !important;
  width: 200px;
  /* height: 20%; */
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}

.PageRight div {
  margin-top: 15px;
  width: 100%;
  background-color: white;
  display: flex;
}

.Border-Head-Right {
  height: 30px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #e7e5e5;
}

/* 左侧 */
.PageLeft {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-right: 10px;
  width: 68%;
}

.PageLeft .Posts div {
  width: 100%;
  margin-top: 10px;
  background-color: white;
}

.ChangeBatch:hover {
  cursor: pointer;
}

.PopularRecommend {
  cursor: pointer;
}

.FollowButton {
  font-size: 14px !important;
  background-color: #f5f5f5 !important;
  color: #999 !important;
}

.noFollowButton {
  font-size: 14px !important;
  background-color: #00c3ff !important;
  color: white !important;
}

/* 帖子 */
.Post {
  display: flex;
}

.PostMessage {
  min-height: 60%;
  height: auto;
}

.PostBottom {
  display: flex;
  justify-content: flex-end;
}

.Author :hover {
  color: blue;
  cursor: pointer;
}

.PostMessage:hover {
  cursor: pointer;
}

.router-link-active {
  text-decoration: none; /* 去掉下划线 */
  color: inherit; /* 继承父元素颜色 */
}

.router-link-active:visited {
  color: inherit; /* 设置点击后的颜色为继承父元素颜色，保持不变 */
}

a {
  text-decoration: none; /* 去掉下划线 */
  color: inherit; /* 继承父元素颜色 */
}

a:visited {
  color: inherit; /* 设置点击后的颜色为继承父元素颜色，保持不变 */
}

/* 其他 */
.icon-like {
  display: inline-block;
  width: 18px;
  height: 18px;
  /* background-image: url("@/assets/like1.png"); */
  background-size: cover;
  margin-right: 10px;
  cursor: pointer;
}

.icon-collect {
  display: inline-block;
  width: 18px;
  height: 18px;
  /* background-image: url("@/assets/collect1.png"); */
  background-size: cover;
  margin-right: 10px;
  cursor: pointer;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
