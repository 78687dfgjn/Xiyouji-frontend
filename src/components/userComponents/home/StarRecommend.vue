<script>
export default {
  name: "StarRecommend",
  data() {
    return {
      imgArr:
          [
            {
              imgUrl: require("@/components/userComponents/home/images/star_recommend/bg1.jpg"),
              h2Text: '凤凰古城',
              author: '有点小氣',
              pText: '虽然古城确实有点商业化，酒吧也很多…\n' +
                  '\n' +
                  '但也不妨碍古城气势磅礴古城墙以及带有古典韵味的吊桥楼~\n',
              labelText: '#凤凰古城 #宝宝辅食 #每日穿搭 #头巾 #背影 #连衣裙 #露背装'
            },
            {
              imgUrl: require("@/components/userComponents/home/images/star_recommend/bg2.jpg"),
              author: '有点小氣',
              h2Text: '逃离长沙',
              pText: '湘西真的和大家想的很不一样我和我朋友说我来湘西他们都以为那里全是穿着传统服饰的少数民族',
              labelText: '#大学生报复性出游 #五一去哪玩 #不出远门过五一 #泸溪拍照 #当代大学生 #大学生的日常 #宝宝辅食'
            },
            {
              imgUrl: require("@/components/userComponents/home/images/star_recommend/bg3.jpg"),
              h2Text: '凤凰一站之遥！',
              author: '有点小氣',
              pText: '吉首是离湘西凤凰一站之遥的一座小城，坐火车直接到凤凰下一站就到，这里有世界最长的峡谷大桥—矮寨大桥景观。',
              labelText: '#张家界周边游玩 ##攻略'
            },
            {
              imgUrl: require("@/components/userComponents/home/images/star_recommend/bg4.jpg"),
              author: '有点小氣',
              h2Text: '芙蓉镇必打卡景点',
              pText: '这个挂在悬崖上的古镇真的值得\n' +
                  '大瀑布名不虚传，非常出片！！\n' +
                  '想给要去的姐妹提个醒，避坑才能玩的愉快啊',
              labelText: '#芙蓉镇 #小众旅行地 #小众古镇 #千年古镇 #湖南旅游 #长沙周边游 #错峰出游 #冷门景点'
            },
          ]
      ,
    }
  }
}
</script>

<template>
  <div class="outer-box">
    <div class="recommend-card" v-for="(recommend, index) in imgArr">
      <img :src="recommend.imgUrl"
            class="recommend-bg" alt=""
            style="object-fit: cover"
      >

      <div style="padding: 10px;" class="card-middle">
        <img src="https://web-tlias-quickfast.oss-cn-beijing.aliyuncs.com/mmexport1656172193455.jpg"
              class="recommend-avatar">
        <h3>{{ recommend.author }}</h3>
        <div class="text">
          <h2>{{ recommend.h2Text }}</h2>
          <p>{{ recommend.pText }}</p>
        </div>
        <div class="bottom clearfix">
          <!--              <time class="time">{{ currentDate }}</time>-->
          <el-button type="text" class="button">查看详情</el-button>
        </div>
      </div>

      <div class="card-footer">
        <h3>{{ recommend.labelText }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer-box {
  /* //padding-left: 8%;
  //padding-right: 1.5%; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.recommend-card {
  /* height: 340px; */
  width: 320px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  margin: 20px 30px;
}

.recommend-bg {
  height: 250px;
  width: 320px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  cursor: pointer;
  /*可以搞一个点击图片放大,把图片高改了就行*/
  transition: all 2s;
}
.recommend-bg:hover{
  height: 400px;
}

.card-middle {
  width: 100%;
  /* text-align: left !important; */
}

.card-middle h2 {
  font-size: 18px;
}

.card-middle h3 {
  float: right;
  /* margin-right: 44px; */
  /* margin-top: -18px; */
  font-size: 14px;
  position: relative;
  top: -15px;
  left: 15px;
  /* //top: 40%;
  //z-index: 10;
  //margin-bottom: 300px; */
}

.recommend-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  float: right;
  right: 100px;
  top: -40px;
  /* left: 200px; */
}

.text h2 {
  /* position: absolute;
  bottom: 0;
  left: 0;
  margin: 0;
  top: 2px; */
}

.text p {
  margin-top: 10px;
  /* position: absolute;
  bottom: 0;
  left: 0;
  margin: 0;
  top: 36px; */
}

.card-footer {
  border-top: solid 1px #3C3C3C;
  width: 100%;
}

.text {
  position: relative;
}

/* 
.card-footer h3 {

} */

/* .bottom {
  line-height: 12px;
} */

.button {
  /* padding: 0;
  float: right; */

}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
