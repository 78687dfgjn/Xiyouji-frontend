<script>
export default {
  name: "PlayAll"
}
</script>

<template>
  <div class="outer-box">
    <ul class="play-box">
      <!--      <li style="background-image:url('./images/play_all/');">品湖韵</li>-->
      <li><span>品湖韵</span></li>
      <li><span>登名峰</span></li>
      <li><span>忆乡愁</span></li>
      <li><span>游海岛</span></li>
      <li><span>享美食</span></li>
      <li><span>赏风情</span></li>
      <li><span>寻新意</span></li>
      <li><span>找童真</span></li>
      <li><span>养身心</span></li>
      <li><span>宿静乡</span></li>
    </ul>
  </div>
</template>

<style scoped>
.outer-box {
  width: 100%;
}

.play-box {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.play-box li {
  margin: 20px 30px;
  width: 250px;
  height: 175px;
  display: inline-block;
  font-size: 32px;
  color: #f2f2f2;
  font-family: 宋体, serif;
  line-height: 175px;
  text-align: center;
  opacity: 0.6;
  /* //filter: blur(2px); 必须要加单位px */
  transition: 0.6s;
  cursor: pointer;
}

.play-box li span {
  height: 100%;
  width: 100%;
  display: inline-block;
  text-shadow: 0 0 10px black,
  0 0 20px #fff,
  0 0 30px #fff,
  0 0 50px #fff,
  0 0 80px #fff;
  /* //background-color: rgba(0, 0, 0, 0.6);
  //transition: 1s; */
}

/*.play-box li span:hover {
  //filter: blur(0px); !*必须要加单位px*!
  //opacity: 1;
  background-color: rgba(0, 0, 0, 0);
  font-size: 0;
}*/

.play-box li:hover {
  /* //filter: blur(0px); 必须要加单位px */
  opacity: 1;
  /* //background-color: rgba(0, 0, 0, 0); */
  font-size: 0;
}

.play-box li:nth-child(-n+5) {
  margin-bottom: 2%;
}

.play-box li:nth-child(1) {
  background-image: url("@/components/userComponents/home/images/play_all/湖.jpg");
  background-size: cover;
}

.play-box li:nth-child(2) {
  background-image: url("@/components/userComponents/home/images/play_all/山.jpeg");
  background-size: cover;
}

.play-box li:nth-child(3) {
  background-image: url("@/components/userComponents/home/images/play_all/愁.jpeg");
  background-size: cover;
}

.play-box li:nth-child(4) {
  background-image: url("@/components/userComponents/home/images/play_all/海岛.jpg");
  background-size: cover;
}

.play-box li:nth-child(5) {
  background-image: url("@/components/userComponents/home/images/play_all/美食.png");
  background-size: cover;
}

.play-box li:nth-child(6) {
  background-image: url("@/components/userComponents/home/images/play_all/风情.jpg");
  background-size: cover;
}

.play-box li:nth-child(7) {
  background-image: url("@/components/userComponents/home/images/play_all/心意.jpeg");
  background-size: cover;
}

.play-box li:nth-child(8) {
  background-image: url("@/components/userComponents/home/images/play_all/童真.jpg");
  background-size: cover;
}

.play-box li:nth-child(9) {
  background-image: url("@/components/userComponents/home/images/play_all/身心.png");
  background-size: cover;
}

.play-box li:nth-child(10) {
  background-image: url("@/components/userComponents/home/images/play_all/宿新乡.jpeg");
  background-size: cover;
}


</style>
