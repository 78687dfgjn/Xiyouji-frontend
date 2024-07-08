<script>
export default {
  name: "Direct",
  computed: {
    paths() {
      return this.$route.matched.map((route) => ({
        // name: route.meta.title || route.name,
        name: route.name,
        path: route.path,
      }));
    }
  }
}
</script>

<template>
  <div class="outer-box">
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item v-for="item in paths" :key="item.path" :to="item.path">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>
.outer-box {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  padding-left: 20px;

}

.el-breadcrumb {
  height: 100%;
  font-size: 18px;
}
</style>
