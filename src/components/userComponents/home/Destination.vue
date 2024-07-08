<script>

export default {
  name: "Destination",
  data() {
    return {
      passages: [
        {
          imgUrl: require('@/components/userComponents/home/images/destination/湖南湘西_森林氧吧.jpg'),
          h3Text: '湖南湘西/森林氧吧，出片圣地',
          pText: '游玩提示:\n' +
              '1.【导航】古丈坐龙峡。\n' +
              '2.【门票】多少不知道，朋友买的。需要买10元/人的保险。\n' +
              '3.喜欢拍照的请多预留【时间】，我们大约上午十点到，走走停停下午三点到山顶，下山直接去芙蓉镇吃晚饭。\n'
        },
        {
          imgUrl: require('@/components/userComponents/home/images/destination/湘西春游攻略冲冲冲.jpg'),
          h3Text: '湘西春游攻略冲冲冲‼️9个必去打卡景点推荐',
          pText: '走入春日画卷，遇见美丽湘西\n' +
              '🌈1.55万平方公里的大地上🌈\n' +
              '百花齐放，风情成歌，华灯璀璨\n' +
              '目之所及，皆是数不尽的美好\n' +
              '全世界都在羡慕的湘西之春\n' +
              '在这些秘境里，让你知道到底有多美\n',
        },
        {
          imgUrl: require('@/components/userComponents/home/images/destination/大学生凤凰古城爆改.jpg'),
          h3Text: '大学生凤凰古城爆改✨被姐妹们夸烂了🥺',
          pText: '在冬天来凤凰游玩，那么你游玩必须要要做的事情，我作为一个来凤凰古城待了很久的长沙妹陀，对于旅游攻略📖这种东西，简直是太小儿科啦\n' +
              '史上超详细凤凰旅游攻略📖',
        },
        {
          imgUrl: require('@/components/userComponents/home/images/destination/长沙往返张家界旅游第一次来的朋友注意了.jpg'),
          h3Text: '长沙往返张家界旅游第一次来的朋友注意了！',
          pText: '🔥张家界|凤凰古城|五天四晚|旅游攻略✅\n' +
              '👉应uu们要求，现整理出【张家界＋凤凰古城】高性价比旅游攻略，记得点赞+关注+收藏',
        },

      ]
    }
  }
}
</script>

<template>
  <div class="outer-box">
    <div class="over-box">
      <div class="introduction">
        <h3>凤凰古城</h3>
        <img
            src="@/components/userComponents/home/images/fenghuang2.jpg"
            alt="">
        <p>凤凰古城，位于湖南省湘西土家族苗族自治州的西南部，占地面积约10平方千米，由苗族、汉族、土家族等28个民族组成，为典型的少数民族聚居区。
          其地处武陵山脉南部、云贵高原东侧，因背依的青山酷似一只展翅欲飞的凤凰而得名。凤凰古城建于清康熙四十三年（1704年），东门和北门古城楼尚在。</p>
      </div>
      <div class="map">
      </div>
    </div>
    <div class="bottom-box">
      <div class="passage" v-for="(item,index) in passages">
        <div class="text"><img :src="item.imgUrl" alt="">
          <h3>{{ item.h3Text }}</h3>
          <p>{{ item.pText }}</p></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bottom-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
}

.passage {
  /* width: 100%; */
  margin: 20px 30px;
  height: 320px;
}

.passage .text img {
  width: 100%;
  height: 60%;
  object-fit: cover;
}

.passage .text h3 {
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
}

.passage .text p {
  font-size: 14px;
  font-weight: 100;
}

.passage .text {
  width: 350px;
  height: 100%;
  /* //background-color: pink; */
}

.over-box {
  display: flex;
  justify-content: space-around;
}


.introduction {
  width: 400px;
  height: 450px;
  /* //background-color: pink; */
  border: solid 6px #119470;
  margin: auto 0;
  padding: 12px;
  overflow: hidden;
  /* //display: flex;
  //justify-content: space-around; */
}

.introduction img {
  width: 100%;
  height: 50%;
  margin-top: 15px;
  object-fit: cover;
  margin-bottom: 5px;
}

.introduction p {
  text-indent: 2em;
  line-height: 25px;
  font-size: 14px;
}

.introduction h3 {
  width: 100%;
  height: 9%;
  background-color: #119470;
  color: #f2f2f2;
  font-size: 20px;
  text-align: center;
}

.map {
  /* //background-color: pink; */
  background-image: url("@/components/userComponents/home/images/map.jpg");
  background-size: cover;
  background-position: left center;
  height: 700px;
  width: 35%;
  margin-bottom: 60px;
}
</style>
