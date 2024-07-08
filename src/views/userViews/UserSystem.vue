<style scoped>
.outer-box {
  //background-color: #feb75b;

  //background-image: linear-gradient(to right, #FDC830, #F37335, #FF4E50, #FC913A);
  //background-image: linear-gradient(to right, #FFD700, #FFA500);

}
</style>
<template>
  <div class="outer-box">
    <el-container style="border: 1px solid #eee; height: 100%">
      <Carousel v-show="$route.path==='/user/home'"></Carousel>
      <el-header style="padding: 0 !important; margin-bottom: 30px">
        <UserHeader></UserHeader>
        <Direct></Direct>
      </el-header>
      <el-main style="min-height: 100vh">
        <Right></Right>
        <router-view></router-view>
      </el-main>
      <el-footer style="padding: 0 !important;">
        <Copyright></Copyright>
      </el-footer>
    </el-container>

  </div>
</template>
<script>
import UserHeader from "@/components/userComponents/header/UserHeader.vue";
import Carousel from "@/components/userComponents/Carousel.vue";
import Direct from "@/components/userComponents/header/Direct.vue";
import Copyright from "@/components/userComponents/Copyright.vue";
import Right from "@/components/userComponents/Right.vue";

export default {
  name: 'User',
  components: {
    Right,
    Copyright,
    Direct,
    Carousel,
    UserHeader
  },

};
</script>

