<style scoped>

.chat-container {
  //overflow: hidden;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 820px;
  //height: 100vh;
  //overflow: auto;
}

.el-card {
  //border-radius: 6%;
}

.chat-left-box {
  flex: 1;
  display: flex;
  flex-direction: column
}

.chat-left-box .el-card:nth-child(1) {
  height: 66px;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
}


.chat-left-box .el-card:nth-child(2) {
  flex: 1;
}

.chat-right-box {
  flex: 5;
  display: flex;
  flex-direction: column;
}

.chat-input {
  width: 80%;
  display: flex;
  //align-items: center;
  padding: 20px;
  align-self: flex-end;
  //justify-content: center;
}

.send-button {
  margin-left: 10px;
}

.chat-header {
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  background-color: #409eff;
  color: #fff;
  text-align: center;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  display: flex;
  margin-bottom: 20px;
}

.right {
  justify-content: flex-end;
}

.avatar {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  margin-bottom: 5px;
}

.text {
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
}

.history span {
  font-size: 14px;
}

</style>
<template>
  <div class="outer-box">
    <div class="chat-container">
      <div class="chat-left-box">
        <el-card shadow="always">
          <el-row>
            <el-col :span="12"><span>历史聊天</span>
            </el-col>
            <el-col :span="12">
              <el-button type="success" icon="el-icon-s-comment">新建聊天</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="history">
          <el-card v-for="item in 6" :key="item" style="margin-bottom: 5px;cursor: pointer" shadow="hover">
            <div style="display: flex;justify-content: space-between;padding: 0 !important;">
              <span>湘西有哪些值得…………</span>
              <i class="el-icon-d-arrow-right"></i>
            </div>
          </el-card>
        </el-card>
      </div>
      <div class="chat-right-box">
        <div class="chat-header">智能顾问</div>
        <div class="chat-messages" ref="chatMessages">
          <!--      初始gpt热心询问-->
          <div
              class="message"
          >
            <!--              :class="{ right: false }"-->
            <div class="avatar">
              <el-avatar
                  style=""
                  shape="circle"
                  size="medium"
                  :src="gptAvatar"
              ></el-avatar>
            </div>
            <!--            <div class="content">-->
            <!--              <div class="username">旅游小助理</div>-->
            <!--              <div class="text">你好，请问有什么可以为你解答</div>-->
            <!--            </div>-->
            <el-card shadow="hover" style="display: flex;justify-content: space-between">
              <div class="username">旅游小助理</div>
              <el-divider><i class="el-icon-s-custom"></i></el-divider>
              <div>你好，请问有什么可以为你解答</div>
              <div>
                <h4>猜你想问：</h4>
                <div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-link type="success">介绍一下湘西巫傩文化</el-link>
                    </el-col>
                    <el-col :span="12">
                      <el-link type="success">介绍一下湘西巫傩文化</el-link>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-link type="success">介绍一下湘西巫傩文化</el-link>
                    </el-col>
                    <el-col :span="12">
                      <el-link type="success">介绍一下湘西巫傩文化</el-link>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-card>
          </div>


          <div
              v-for="(message, index) in messages"
              :key="index"
              class="message"
              :class="{ right: message.from === userInfo.nickname }"
          >
            <div class="avatar">
              <el-avatar
                  v-if="message.from === userInfo.nickname"
                  style=""
                  shape="circle"
                  size="medium"
                  :src="userInfo.avatar"
              ></el-avatar>
              <el-avatar
                  v-else
                  style=""
                  shape="circle"
                  size="medium"
                  :src="gptAvatar"
              ></el-avatar>
            </div>
            <div class="content">
              <div class="username">{{ message.from }}</div>
              <div class="text" v-html="message.text"></div>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <el-input
              v-model="message"
              placeholder="请输入消息"
              @keyup.enter.native="sendMessage"
          />
          <el-button type="primary" class="send-button" @click="sendMessage"
          >发送
          </el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Chat",
  data() {
    return {
      accountantName: "旅游小助理",
      gptAvatar:
          "https://t11.baidu.com/it/u=2073473576,203413005&fm=30&app=106&f=JPEG?w=640&h=640&s=AB25C306E2A198FF5A47BF9B0200908D",
      // username: '', // 当前用户
      message: "", // 消息内容
      messages: [], // 消息列表
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    // 加载历史消息
    // this.messages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    const chatMessages = this.$refs.chatMessages;
    // 滚动到底部
    this.$nextTick(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  },
  methods: {
    sendMessage() {
      if (!this.message) {
        return;
      }
      const message = {
        from: this.userInfo.nickname,
        text: this.message,
      };
      this.messages.push(message);
      const chatMessages = this.$refs.chatMessages;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      this.message = "";
      // 滚动到底部
      this.$nextTick(() => {
        this.request
            //发消息给星火讯飞大模型
            // .post("/chat/send",
            //     {
            //       question: this.messages[this.messages.length - 1].text,
            //     }
            // )
            //发消息给chat-gpt
            .post("/chat",
                {
                  question: this.messages[this.messages.length - 1].text,
                }
            )
            .then((res) => {
              console.log(res);
              this.messages.push({
                from: this.accountantName,
                text: res.data,
              });
              this.$nextTick(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
              });
            });
        this.$nextTick(() => {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        });
        // chatMessages.scrollTo()
        // chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    },
  },
};
</script>


