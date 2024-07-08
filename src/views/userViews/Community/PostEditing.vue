<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: aliceblue;
    "
  >
    <div
      style="
        display: flex;
        /* align-items: center; */
        justify-content: center;
        flex-direction: column;
        width: 60vw;
        background-color: white;
        margin-top: 20px;
        padding-top: 15px;
        padding-left: 4vw;
        padding-right: 4vw;
      "
    >
      <!-- 头部 -->
      <div
        class="head"
        style="
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ccc;
        "
      >
        <span style="font-size: 20px; font-weight: bold">发布帖子</span>
        <span>test</span>
      </div>

      <!-- 主体 -->
      <div class="body">
        <!-- 标题 -->
        <div
          class="Title"
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;
          "
        >
          <label for="">标题: </label>
          <el-input
            type="text"
            placeholder="标题(必填)"
            v-model="Post.title"
            maxlength="30"
            show-word-limit
            style="width: 90%"
            size="medium"
          >
          </el-input>
        </div>

        <!-- 内容 -->
        <div
          class="message"
          style="
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
          "
        >
          <label for="">内容: </label>
          <div style="border: 1px solid #ccc; width: 90%">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 60vh; overflow-y: hidden"
              v-model="html"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
        </div>

        <!-- 地区选择 -->
        <div
          class="localSelect"
          style="
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
          "
        >
          <label for="">地区选择: </label>
          <div style="display: flex; flex-wrap: wrap; width: 90%">
            <el-radio v-model="Post.localId" label="1">湘西</el-radio>
            <el-radio v-model="Post.localId" label="2">张家界</el-radio>
            <el-radio v-model="Post.localId" label="3">永顺</el-radio>
            <el-radio v-model="Post.localId" label="4">吉首</el-radio>
            <el-radio v-model="Post.localId" label="5">花垣</el-radio>
            <el-radio v-model="Post.localId" label="6">古丈</el-radio>
            <el-radio v-model="Post.localId" label="7">龙山</el-radio>
            <el-radio v-model="Post.localId" label="8">花坛</el-radio>
            <el-radio v-model="Post.localId" label="9">江口</el-radio>
            <el-radio v-model="Post.localId" label="10">桃源</el-radio>
            <el-radio v-model="Post.localId" label="11">安化</el-radio>
            <el-radio v-model="Post.localId" label="12">凤凰</el-radio>
            <el-radio v-model="Post.localId" label="13">非遗</el-radio>
          </div>
        </div>
      </div>

      <div
        class="foot"
        style="margin-top: 40px; display: flex; justify-content: center"
      >
        <el-button
          type="primary"
          v-on:click="postAdd"
          style="font-size: 17px; font-weight: bold; width: 20%; height: 5vh"
          >发布帖子</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      html: "",
      toolbarConfig: {},
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            server: "http://8.138.10.52:6060//upload",
            fieldName: 'file',
            customInsert(res, insertFn){
              console.log(res);
              insertFn(res.data);
            }
          },

          uploadVideo: {
            server: "http://8.138.10.52:6060//upload",
            fieldName: 'file',
            maxFileSize: 200 * 1024 * 1024,
            customInsert(res, insertFn){
              console.log(res);
              insertFn(res.data);
            }

          }
        },
      },

      mode: "default", // or 'simple',
      editor: null,
      Post: {
        accountId: null,
        avatar: null,
        nickname: null,
        title: null,
        text: null,
        localId: null,
      },
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    postAdd() {
      const accountData = JSON.parse(localStorage.getItem("accountData"));
      this.Post.accountId = accountData.id;
      this.Post.avatar = accountData.avatar;
      this.Post.nickname = accountData.nickname;
      this.Post.text = this.editor.getHtml();
      console.log(this.Post);
      this.request.post("/post/publish", this.Post).then((res) => {
        if (res.code === "200") {
          this.$message.success("发布成功");
          this.$router.push("/user/community");
        } else {
          this.$message.error("发布失败");
        }
      });
    },
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style>
</style>
