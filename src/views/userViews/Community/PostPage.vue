<template>
  <div
    style="
      background-color: rgb(247, 248, 252);
      min-height: 100vh;
      height: auto;
      display: flex;
      justify-content: center;
    "
  >
    <div
      class="body"
      style="width: 70vw; display: flex; justify-content: center"
    >
      <div
        class="PostPageLeft"
        style="width: 80%; margin-right: 15px"
        v-if="post"
      >
        <div
          class="PostMain"
          style="background-color: white; padding: 20px 30px 30px"
        >
          <div
            class="PostPageTitle"
            style="height: 60px; display: flex; align-items: center"
          >
            <h1 style="font-size: 28px">{{ post.title }}</h1>
          </div>
          <div
            class="PostLike_Collect"
            style="display: flex; justify-content: flex-end"
          >
            <div
              style="
                width: 15%;
                display: flex;
                justify-content: space-around;
                align-items: center;
              "
            >
              <div class="LikeCount">
                <img
                  src=""
                  class="iconfont icon-dianzan_kuai"
                  style="color: #cccccc; font-size: 18px"
                />
                <span style="color: #ccc">{{ post.likeCount }}</span>
              </div>

              <div class="CollectCount">
                <img
                  src=""
                  class="iconfont icon-shoucang2"
                  style="color: #cccccc; font-size: 19px"
                />
                <span style="color: #ccc">{{ post.collectCount }}</span>
              </div>
            </div>
          </div>
          <div
            class="PostPageTime"
            style="
              display: flex;
              justify-content: center;
              color: #cccccc;
              font-size: 14px;
              margin-top: 10px;
            "
          >
            文章发表: {{ post.time }}
          </div>
          <div
            class="PostPageText"
            v-html="post.text"
            style="overflow-wrap: break-word; margin-top: 20px"
          ></div>

          <div
            style="
              margin-top: 30px;
              display: flex;
              justify-content: flex-end;
              color: #cccccc;
              font-size: 14px;
            "
          >
            举报
          </div>

          <div
            style="
              display: flex;
              justify-content: center;
              margin-top: 30px;
              padding-top: 30px;
              border-top: 1px solid #ccc;
            "
          >
            <div
              style="width: 33%; display: flex; justify-content: space-around"
            >
              <div class="Like" @click="FunisLike">
                <img
                  src=""
                  :class="{
                    'iconfont icon-dianzan': !isLike,
                    'iconfont icon-dianzan_kuai': isLike,
                  }"
                  style="
                    font-size: 30px;
                    color: cornflowerblue;
                    font-weight: 300;
                  "
                />
              </div>

              <div class="Collect" @click="FunisCollect">
                <img
                  src=""
                  :class="{
                    'iconfont icon-shoucang1': !isCollect,
                    'iconfont icon-shoucang2': isCollect,
                  }"
                  style="
                    font-size: 30px;
                    color: cornflowerblue;
                    font-weight: 900;
                  "
                />
              </div>
            </div>
          </div>
        </div>

        <div class="CommentSection">
          <div class="Input">
            <el-input
              type="textarea"
              placeholder="请输入评论"
              v-model="newComment"
            ></el-input>
            <div
              class="CommentSection=-footer"
              style="display: flex; justify-content: end"
            >
              <el-button type="primary" v-on:click="AddComment('false')"
                >评论
              </el-button>
            </div>
          </div>

          <!-- 评论列表-一级评论 -->
          <div class="CommentList" style="background-color: white">
            <div v-for="comment in commentList" :key="comment.commentId">
              <div
                v-if="comment.pid === 0"
                style="
                  border-bottom: 1px solid #ccc;
                  padding: 10px 10px 10px 10px;
                  display: flex;
                  flex-direction: row;
                "
              >
                <div
                  class="commentBoxLeft"
                  style="width: 7%; display: flex; justify-content: center"
                >
                  <el-avatar size="medium" :src="comment.avatar"></el-avatar>
                </div>

                <div class="commentBoxRight" style="width: 93%">
                  <div
                    class="CommentHead"
                    style="
                      display: flex;
                      justify-content: space-between;
                      height: 35px;
                    "
                  >
                    <div
                      style="
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                      "
                    >
                      <div>{{ comment.name }}</div>
                    </div>

                    <div
                      style="
                        display: flex;
                        align-items: center;
                        color: #ccc;
                        font-size: 14px;
                      "
                    >
                      {{ comment.time }}
                    </div>
                  </div>

                  <div
                    class="CommentText"
                    style="overflow: hidden; word-wrap: break-word"
                  >
                    {{ comment.text }}
                  </div>
                  <div class="CommentFoot">
                    <div
                      class="Reply"
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: end;
                      "
                      v-on:click="toggleReplyBox(comment.commentId)"
                    >
                      <i class="el-icon-chat-dot-round"></i>
                      <span style="font-size: 13px">回复</span>
                    </div>
                  </div>

                  <!-- 回复框-一级评论 -->
                  <div
                    v-if="replyBoxControl === comment.commentId"
                    class="ReplyBox"
                  >
                    <el-input
                      v-model="replyBox"
                      placeholder="请输入回复内容"
                      clearable
                    ></el-input>
                    <div style="display: flex; justify-content: end">
                      <el-button
                        type="primary"
                        @click="
                          SubmitReply(
                            comment.commentId,
                            comment.name,
                            comment.commentId
                          )
                        "
                        >回复
                      </el-button>
                    </div>
                  </div>

                  <!-- 回复列表-二级评论 -->
                  <div v-if="comment.replyList">
                    <div
                      v-for="comment1 in comment.replyList"
                      :key="comment1.commentId"
                    >
                      <div
                        class="ReplyBox"
                        style="
                          background-color: rgb(247, 248, 252);
                          padding: 10px 10px 10px;
                          margin-left: 7%;
                        "
                      >
                        <div
                          class="ReplyBoxHead"
                          style="display: flex; justify-content: space-between"
                        >
                          <div
                            style="
                              display: flex;
                              justify-content: space-around;
                              align-items: center;
                            "
                          >
                            <el-avatar
                              size="small"
                              :src="comment1.avatar"
                            ></el-avatar>
                            <div>{{ comment1.name }}</div>

                            <span style="">&nbsp;回复&nbsp;</span>
                            <div style="color: deepskyblue">
                              @{{ comment1.pname }}
                            </div>
                          </div>

                          <div
                            style="
                              display: flex;
                              align-items: center;
                              color: #ccc;
                              font-size: 14px;
                            "
                          >
                            {{ comment1.time }}
                          </div>
                        </div>
                        <div style="margin-left: 6%; margin-right: 6%">
                          {{ comment1.text }}
                        </div>

                        <div class="CommentFoot">
                          <div
                            class="Reply"
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: end;
                            "
                            v-on:click="toggleReplyBox(comment1.commentId)"
                          >
                            <i class="el-icon-chat-dot-round"></i>
                            <span style="font-size: 13px">回复</span>
                          </div>
                        </div>

                        <!-- 回复框-二级评论回复 -->
                        <div
                          v-if="replyBoxControl === comment1.commentId"
                          class="ReplyBox"
                        >
                          <el-input
                            v-model="replyBox"
                            placeholder="请输入回复内容"
                            clearable
                          ></el-input>
                          <div style="display: flex; justify-content: end">
                            <el-button
                              type="primary"
                              @click="
                                SubmitReply(
                                  comment1.commentId,
                                  comment1.name,
                                  comment.commentId
                                )
                              "
                              >回复
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="PostPageRight"
        style="width: 30%; padding-top: 30px"
        v-if="post"
      >
        <div
          class="AuthorMessage"
          style="
            background-color: white;
            width: 100%;
            height: 30vh;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          "
        >
          <el-avatar :size="70" :src="post.avatar"></el-avatar>
          <div>{{ post.nickname }}</div>
          <div>
            <el-button
              type="primary"
              v-on:click="AuthorPageInto(post.accountId)"
              >进入主页
            </el-button>
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
      postId: null,
      post: null,
      newComment: null,
      comment: null,
      replyBoxControl: null,
      replyBox: null,
      commentList: null,
      isLike: false,
      isCollect: false,
    };
  },
  mounted() {
    // 使用 $route.params 获取路由参数
    this.postId = this.$route.params.postId;

    const accountData = JSON.parse(localStorage.getItem("accountData"));
    this.request
      .post("/post/selectPostByPostIdAccountId", {
        accountId: accountData.id,
        postId: this.postId,
      })
      .then((res) => {
        this.post = res.data;
        this.isLike = this.post.like;
        this.isCollect = this.post.collect;
      });

    this.GetComment(this.postId);
  },
  methods: {
    AuthorPageInto(accountId) {
      this.request.get("/account?id=" + accountId).then((res) => {});
    },

    // 回复需传参false，发表不传参
    AddComment(replyBox) {
      if (replyBox === "false") {
        const accountData = JSON.parse(localStorage.getItem("accountData"));
        const comment = {
          postId: this.postId,
          accountId: accountData.id,
          name: accountData.nickname,
          avatar: accountData.avatar,
          text: this.newComment,
        };
        if (comment.text != null) {
          this.request.post("/comment/addComment", comment).then((res) => {
            if (res.code === "200") {
              this.request
                .post("/comment/selectByPostId", this.postId)
                .then((res) => {
                  this.commentList = res.data;
                  this.$forceUpdate();
                  this.newComment = "";
                });

              this.$message.success("评论成功");
            } else {
              this.$message.error("评论失败");
            }
          });
        } else {
          this.$message.error("评论不能为空");
        }
      } else {
        this.request.post("/comment/addComment", replyBox).then((res) => {
          if (res.code === "200") {
            this.request
              .post("/comment/selectByPostId", this.postId)
              .then((res) => {
                this.commentList = res.data;
                this.$forceUpdate();
                this.replyBox = "";
              });
          }
        });
      }
    },

    toggleReplyBox(commentId) {
      // 点击评论中的回复按钮时触发，根据评论的ID切换回复框的显示与隐藏
      this.replyBoxControl =
        this.replyBoxControl === commentId ? null : commentId;
    },

    SubmitReply(foreignId, pname, pid) {
      const accountData = JSON.parse(localStorage.getItem("accountData"));
      const replyBox = {
        postId: this.postId,
        accountId: accountData.id,
        name: accountData.nickname,
        avatar: accountData.avatar,
        text: this.replyBox,
        foreignId: foreignId,
        pid: pid,
        pname: pname,
      };
      this.AddComment(replyBox);
      this.$message.success("回复成功");
      this.replyBoxControl = null;
    },

    GetComment() {
      this.request.post("/comment/selectByPostId", this.postId).then((res) => {
        this.commentList = res.data;
      });
    },

    FunisLike() {
      this.isLike = !this.isLike;
      const accountData = JSON.parse(localStorage.getItem("accountData"));
      if (this.isLike) {
        this.request
          .post("/post/likeAdd", {
            accountId: accountData.id,
            postId: this.postId,
          })
          .then((res) => {
            this.post = res.data;
            this.$message.success("点赞成功");
          });
      } else {
        this.request
          .post("/post/likeCancel", {
            accountId: accountData.id,
            postId: this.postId,
          })
          .then((res) => {
            this.post = res.data;
            this.$message.error("取消点赞");
          });
      }
    },
    FunisCollect() {
      this.isCollect = !this.isCollect;
      const accountData = JSON.parse(localStorage.getItem("accountData"));
      if (this.isCollect) {
        this.request
          .post("/post/collectAdd", {
            accountId: accountData.id,
            postId: this.postId,
          })
          .then((res) => {
            this.post = res.data;
            this.$message.success("收藏成功");
          });
      } else {
        this.request
          .post("/post/collectCancel", {
            accountId: accountData.id,
            postId: this.postId,
          })
          .then((res) => {
            this.post = res.data;
            this.$message.error("取消收藏");
          });
      }
    },
  },
};
</script>

<style scoped>
.PostPageText {
  line-height: 3;
}

.Reply:hover {
  cursor: pointer;
}

.Like:hover {
  cursor: pointer;
}

.Collect:hover {
  cursor: pointer;
}

.PostPageText >>> img {
  max-width: 100% !important;
  height: auto !important;
}
</style>
