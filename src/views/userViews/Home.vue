<script>

import Season from "@/components/userComponents/home/Season.vue";
import PlayAll from "@/components/userComponents/home/PlayAll.vue";
import StarRecommend from "@/components/userComponents/home/StarRecommend.vue";
import Destination from "@/components/userComponents/home/Destination.vue";
import CommodityRecommend from "@/components/userComponents/home/CommodityRecommend.vue";


export default {
  name: "Home",
  components: {CommodityRecommend, Destination, StarRecommend, PlayAll, Season}
}
</script>

<template>
  <div class="outer-box">
    <Season></Season>
    <div class="direct">
      <h2>玩转湘西</h2>
    </div>
    <PlayAll></PlayAll>
    <div class="direct">
      <h2>达人推荐</h2>
    </div>
    <StarRecommend></StarRecommend>
    <button class="btn">点我获取更多</button>
    <div class="direct">
      <h2>旅游目的地</h2>
    </div>
    <Destination></Destination>
    <button class="btn">点我获取更多</button>
    <div class="direct">
      <h2>产品推荐</h2>
    </div>
    <CommodityRecommend></CommodityRecommend>
    <button class="btn">点我获取更多</button>

  </div>
</template>

<style scoped>
.outer-box {
  background-color: #fff;
}

.direct {
  margin-left: 45%;

}


h2 {
  font-family: 宋体, serif;
  //color: #4caf50;
  color: #458979;
  font-size: 40px;
  margin: 20px 0;
}


.btn {
  margin-top: 2%;
  margin-left: 40%;
  width: 300px;
  --color: #00A97F;
  --color2: #212121;
  padding: 0.8em 1.7em;
  background-color: transparent;
  border-radius: 10px;
  border: 1.5px solid var(--color);
  transition: .5s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
  font-weight: 300;
  font-size: 20px;
  font-family: 'Roboto', 'Segoe UI', sans-serif;
  text-transform: uppercase;
  color: var(--color);
}

.btn::before {
  content: '';
  display: block;
  height: 110%;
  width: 310%;
  transform: translate(0, -50%);
  position: absolute;
  top: 50%;
  left: -5%;
  z-index: -1;
  transition: .7s;
  background: -moz-linear-gradient(45deg, var(--color2) 33%, var(--color) 66%);
  background: -webkit-linear-gradient(45deg, var(--color2) 33%, var(--color) 66%);
  background: linear-gradient(45deg, var(--color2) 33%, var(--color) 66%);
}

.btn:hover::before {
  left: -200%;
}

.btn:hover {
  color: var(--color2);
}

.btn:active {
  transform: scale(.98);
  filter: brightness(.8);
}
</style>
