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
        <h3 style="font-weight: 350">我的收藏</h3>
      </div>
  
      <div v-if="!postList">还没有收藏</div>
      <!-- 显示帖子列表 -->
      <!--    <div v-if="postList"></div>-->
      <div v-for="post in displayedPosts" :key="post.postId" style="width: 100%" @click="postInto(post.postId)">
        <div
            class="PostTime"
            style="
            padding-left: 30px;
            padding-right: 30px;
            padding-top: 20px;
            color: #999999;
            font-size: 14px;
            border-top: 1px solid #cccccc;
          "
        >
          <img src="" alt="" class="el-icon-time"/>
          {{ post.time }}
        </div>
        <div
            class="PostMessage"
            style="padding: 20px 30px 30px 30px"
        >
          <div class="PostTitle" style="">
            <h3 style="font-weight: 550">{{ post.title }}</h3>
          </div>
  
          <div
              class="PostText"
              v-html="getSummary(post.text)"
              style="color: #999999; font-size: 14px; margin-top: 10px"
          ></div>
          <div class="img-box">
            <img style="width: 100px;height: 100px;margin: 8px;" v-for="img in extractImages(post.text).splice(0,4)"
                :key="img" :src="img">
          </div>
        </div>
  
        <div
            class="PostFoot"
            style="width: 100%; display: flex; justify-content: space-between"
        >
          <div class="Left"></div>
          <div
              class="Right"
              style="width: 20%; display: flex; justify-content: space-around"
          >
            <div class="LikeCount">
              <img
                  src=""
                  alt=""
                  class="iconfont icon-dianzan"
                  style="font-size: 20px"
              />
              <span v-if="post.likeCount <= 999" style="font-size: 14px">{{
                  post.likeCount
                }}</span>
              <span v-else style="font-size: 14px">999+</span>
            </div>
  
            <div class="commentCount">
              <img
                  src=""
                  class="el-icon-chat-line-round"
                  style="font-size: 20px"
              />
              <span v-if="post.commentCount <= 999" style="font-size: 14px">{{
                  post.commentCount
                }}</span>
              <span v-else style="font-size: 14px">999+</span>
            </div>
  
            <div class="collectCount">
              <img
                  src=""
                  alt=""
                  class="el-icon-star-off"
                  style="font-size: 20px"
              />
              <span v-if="post.collectCount <= 999" style="font-size: 14px">{{
                  post.collectCount
                }}</span>
              <span v-else style="font-size: 14px">999+</span>
            </div>
          </div>
        </div>
      </div>
  
      <div
          class="block"
          style="
          border-top: 1px solid #cccccc;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <el-pagination
            background
            layout="prev, pager, next"
            :total="totalPosts"
            :current-page.sync="currentPage"
            @current-change="handlePageChange"
        >
        </el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        postList: [],
        currentPage: 1, // 当前页码
        pageSize: 5, // 每页显示的数据条数
        textColor: "black",
      };
    },
    methods: {
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
      getAccountPosts() {
        const accountData = JSON.parse(localStorage.getItem("accountData"));
        this.request
            .post("/post/selectCollectPostByAccountId", accountData.id)
            .then((res) => {
              this.postList = res.data.reverse();
            });
      },
      getSummary(text) {
        const maxLineLength = 50; // 每行最大长度
        const maxLines = 3; // 最大显示行数
        const lines = text.split("\n"); // 将文本按行分割
        let summary = "";
  
        // 遍历每一行
        for (let i = 0; i < maxLines && i < lines.length; i++) {
          const line = lines[i];
          // 如果当前行超过最大长度，则截断并添加省略号
          if (line.length > maxLineLength) {
            summary += line.slice(0, maxLineLength - 3) + "......"; // 截断并添加省略号
          } else {
            summary += line;
          }
          // 如果不是最后一行，则添加换行符
          if (i < maxLines - 1 && i < lines.length - 1) {
            summary += "\n";
          }
        }
  
        return summary;
      },
  
      changeColor() {
        // 更新字体颜色
        this.isShow = !this.isShow;
      },
  
      handlePageChange(newPage) {
        this.currentPage = newPage; // 更新当前页码
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
    },
    mounted() {
      this.getAccountPosts();
    },
    computed: {
      totalPosts() {
        if (this.postList.length) {
          return this.postList.length;
        } else {
          return null;
        }
      },
      displayedPosts() {
        if (this.postList) {
          const startIndex = (this.currentPage - 1) * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          return this.postList.slice(startIndex, endIndex);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .Like {
    color: black;
  }
  
  .NotLike {
    color: pink;
  }
  </style>
  
  
  