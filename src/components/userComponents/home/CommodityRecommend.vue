<script>
export default {
  name: "CommodityRecommend"
}
</script>
<!--html-->
<template>
  <div class="outer-box">
    <div class="left">
      <div class="text">
        <h2>湘西凤凰古城</h2>
        <h3>
          地处武陵山脉南部、云贵高原东侧，因背依的青山酷似一只展翅欲飞的凤凰而得名</h3>
      </div>
    </div>
    <div class="right">
      <div class="commodity">
        <div class="hot1">
          hot
        </div>
        <img src="@/assets/carouselImg/不二门温泉.jpg" alt="">

        <h3>不二门温泉</h3>
      </div>
      <div class="commodity">
        <div class="hot2">
          hot
        </div>
        <img src="@/assets/carouselImg/凤凰凤仙境温德姆豪廷温泉.jpg" alt="">
        <h3>凤凰凤仙境温德姆豪廷温泉</h3>
      </div>
      <div class="commodity"><img src="@/assets/carouselImg/芙蓉镇.jpg" alt="">
        <h3>芙蓉镇</h3>
      </div>
      <div class="commodity"><img src="@/assets/carouselImg/花垣边城旅游景区.jpg" alt="">
        <h3>花垣边城旅游景区</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer-box {
  width: 100%;
  /* height: 540px; */
  display: flex;
  justify-content: space-around;
}


.left {
  width: 1200px;
  height: 540px;
  background-image: url("@/components/userComponents/home/images/fenghuang1.jpg");
  display: flex;
  align-items: center;
  justify-content: center;

}

.left .text {
  width: 55%;
  height: 20%;
  padding: 12px 8px 6px 8px;

  /* 背景图模糊 */
  /* //filter: blur(5px); */

  /* 背景颜色和透明度 */
  background-color: rgba(192, 118, 19, 0.8);
}

.left .text h2 {
  color: white;
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  height: 45%;
  border: solid 1px #efc46e;
}

.left .text h3 {
  border: solid 1px #efc46e;
  font-size: 14px;
  text-align: center;
  height: 45%;
  font-weight: 300;
  color: white;
}

.right {
  /* width: 620px; */
  /* height: 100%; */
  /* //padding-top: 10px; */
  display: flex;
  flex-wrap: wrap;
  /* align-content: space-between; */
  justify-content: space-around;
  align-items: center;
  margin: 0 50px;
}

.right .commodity {
  width: 300px;
  height: 230px;
  border: solid 3px #f3f3f3;
  border-top: solid 0 white;
  font-size: 20px;
  font-weight: 300;
  font-family: 宋体, serif;
  /* text-align: left; */
  cursor: pointer;
  margin: 10px 10px;
  /* //position: absolute; */
}

.hot1 {
  width: 38px;
  height: 60px;
  background-image: url("@/components/userComponents/home/images/status_active.png");
  line-height: 40px;
  color: #dd3625;
  font-weight: bold;
  font-size: 22px;
  float: left;
  position: absolute;
  margin-top: -8px;
}

.hot2 {
  width: 38px;
  height: 60px;
  background-image: url("@/components/userComponents/home/images/status_active.png");
  line-height: 40px;
  color: #dd3625;
  font-weight: 800;
  font-size: 22px;
  position: absolute;
  float: left;
  margin-top: -8px;
}

.right .commodity:nth-child(2n) {
  margin-left: 15px;
}

.right .commodity img {
  width: 100%;
  height: 80%;
}

/*.right .commodity h3 {
  font-size: 20px;
  font-weight: 100;
  line-height: 54px;
}*/
</style>
