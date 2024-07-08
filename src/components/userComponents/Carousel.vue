<script>
export default {
  name: "Carousel",
  data() {
    return {
      imgArr:
          [
            require("../../assets/carouselImg/不二门温泉.jpg"),
            require("../../assets/carouselImg/凤凰凤仙境温德姆豪廷温泉.jpg"),
            require("../../assets/carouselImg/凤凰古城.jpg"),
            require("../../assets/carouselImg/凤凰磁浮观光快线.jpg"),
            require("../../assets/carouselImg/墨戎苗寨.jpg"),
            require("../../assets/carouselImg/芙蓉镇.jpg"),
            require("../../assets/carouselImg/花垣边城旅游景区.jpg"),
          ]
      ,
    };
  },
  created() {

  },
  mounted() {

  },
  computed: {},
  methods: {}
};
</script>
<template>
  <div class="carousel-container">
    <el-carousel :interval="4000" type="card" height="350px">
      <el-carousel-item v-for="(item,index) in imgArr" :key="index">
        <img :src="item" :alt="item" class="carousel-img">
        <!--        <el-image-->
        <!--            style="width: 100px; height: 100px"-->
        <!--            :src="item"-->
        <!--            :fit="scale-down"></el-image>-->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped>
.carousel-container {
  width: 100%;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-carousel__item h3 {
  color: #FF6347; /* 橙红色 */
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #FFA07A; /* 亮橙红色 */
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #FFDAB9; /* 淡橙红色 */
}


</style>
