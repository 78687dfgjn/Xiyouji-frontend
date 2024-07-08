<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 5" :key="item">
        <!--        <span>{{ item }}</span>-->
        <img
            :src='getImg(item)'
            alt=""
            srcset=""
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    getImg(item) {
      const url = "https://college-store-product-backstage-management-system.oss-cn-beijing.aliyuncs.com/%E5%8E%9F%E7%A5%9E/yuanshen" + item + ".jpg"
      return url;
    }
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
