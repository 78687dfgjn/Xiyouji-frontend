<script>

export default {
  name: "Face",
  data() {
    return {
      inter: "",
      loading: false,
      mediaStream: null,
    }
  },
  mounted() {
    this.startCamera()
    this.inter = setInterval(
        () => {
          this.loading = false
          this.login()
          this.loading = true
        }, 3000
    )
  },
  methods: {
    startCamera() {
      const video = this.$refs.video;
      navigator.mediaDevices.getUserMedia({video: {width: 300, height: 300}, audio: false})
          .then(mediaStream => {
            this.mediaStream = mediaStream
            video.srcObject = mediaStream;
            video.play();
          })
          .catch(error => {
            console.error('启动摄像头失败：', error);
          });
    },
    stopCamera() {
      const video = this.$refs.video
      // console.log(this.mediaStream)

      // this.mediaStreamTrack.active = false
      if (this.mediaStream) {
        const tracks = this.mediaStream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        // video.value.srcObject = null;
        // console.log("关闭后" + this.mediaStream)
      }
    },
    takePhoto() {
      const canvas = this.$refs.canvas;
      const video = this.$refs.video;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, 300, 300);
    },
    login() {
      this.takePhoto()
      const canvas = this.$refs.canvas;
      // const imgData = canvas.toDataURL('image/jpeg');
      // 将 Canvas 数据转换为 Blob 对象
      canvas.toBlob(blob => {
        if (blob) {
          // 创建 FormData 对象
          const formData = new FormData();
          formData.append('file', blob, 'image.jpg');

          // 发送文件数据到后端
          this.request.post('/upload', formData)
              .then(response => {
                // 处理上传成功的响应
                console.log('上传成功：', response.data);

                this.request.post('/account/face', {
                  id: 1003,
                  url: response.data,
                })
                    .then(res => {
                      if (res.code === "200") {
                        this.$message.success(res.msg);
                        setTimeout(() => {
                          this.$message.success('登录成功');
                        }, 100)
                        this.stopCamera()
                        clearInterval(this.inter)
                        this.$router.push("/manage/home")
                        setTimeout(() => {
                          location.reload();
                        }, 100)
                      } else {
                        this.$message.error(res.msg);
                        setTimeout(() => {
                          this.$message.error('登录失败');
                        }, 100)

                      }
                    })
                    .catch(error => {
                      console.error('登录请求失败：', error);
                      this.$message.error('登录失败，请稍后重试！');
                    });
              })
              .catch(error => {
                // 处理上传失败的情况
                console.error('上传失败：', error);
              });
        } else {
          console.error('无法转换 Blob 对象');
        }
      }, 'image/jpeg');
    }
  }
}
</script>

<template>
  <div>
    <!--    <el-button class="btn" @click="startCamera">开始摄像</el-button>-->
    <!--    <el-button class="btn" @click="takePhoto">拍照</el-button>-->
    <div v-loading="loading"
         element-loading-text="校验人脸信息中，请耐心等待……"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.2)"
         style=" width:300px; height:300px">
      <video ref="video" id="video" width="300" height="300" style="border: 5px solid #000; border-radius: 10px;"
      ></video>
    </div>
    <canvas ref="canvas" id="canvas" width="300" height="300"
            style="border: 5px solid #000 ; display: none; border-radius: 10px;"></canvas>
  </div>
</template>

<style scoped>
/*.btn {
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background: #ff9900;
  line-height: 50px;
  text-align: center;
  color: #fff;
  box-shadow: 0 0 10px #999;
  margin-right: 10px;
}*/
</style>
