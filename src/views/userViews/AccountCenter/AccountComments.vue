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
      <h3 style="font-weight: 350">我的评论</h3>
    </div>
    <div
      v-for="comment in commentList"
      :key="comment.commentId"
      style="width: 100%"
    >
      <div class="Comment" style="">
        <div
          class="CommentTime"
          style="
            padding-left: 30px;
            padding-right: 30px;
            padding-top: 20px;
            color: #999999;
            font-size: 14px;
            border-top: 1px solid #cccccc;
          "
          v-on:click="postInto(comment.postId)"
        >
          <img src="" alt="" class="el-icon-time" />
          {{ comment.time }}
        </div>

        <div style="padding: 20px 30px 10px 30px">
          <h4>{{ comment.text }}</h4>
        </div>

        <div style="padding: 10px 30px 30px 30px">
          <div
            style="
              background-color: #f7f8fc;
              height: 40px;
              display: flex;
              align-items: center;
              border-radius: 5px;
              padding-left: 20px;
            "
          >
            <div v-if="comment.pname" style="color: #999999">
              回复评论: {{ comment.ptext }}
            </div>
            <div v-else style="color: #999999">
              回复帖子: {{ comment.postTitle }}
            </div>
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
      commentList: null,
      accountData: null,
    };
  },
  methods: {
    getCommentList(accountId) {
      this.request
        .post("/comment/selectCommentByAccountId", accountId)
        .then((res) => {
          this.commentList = res.data;
        });
    },
    postInto(postId) {
      if (this.$route.name === "帖子详情") {
        this.$router.push("/user/home");
        setTimeout(() => {
          this.$router.push({ name: "帖子详情", params: { postId } });
        }, 1);
      } else {
        this.$router.push({ name: "帖子详情", params: { postId } });
      }
    },
  },
  mounted() {
    this.accountData = JSON.parse(localStorage.getItem("accountData"));
    this.getCommentList(this.accountData.id);
  },
};
</script>

<style>
.Comment:hover {
  cursor: pointer;
}
</style>
