<style>
.el-container {
  height: 100%;
}

.el-aside {
  height: 80%;
  overflow: hidden;
}

.el-menu {
  color: #fff;
  height: 100%;
}

.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
}

.el-aside {
  height: 100vh;
  max-width: 220px;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}

.logo {
  height: 30px;
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  align-items: center;
}

.logo b {
  font-weight: normal;
  line-height: 20px;
  color: #333;
}

.logo img {
  /* margin-left: 14px; */
  width: 20px;
}

.page {
  padding: 10px 0;
}

.search ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  /* justify-content: center; */
  /* padding-left: 5px; */
  margin-bottom: 5px;
}

.search ul li .el-input:nth-child(1 + n) {
  margin-left: 5px !important;
}

.search .el-button {
  /* padding-left: 10px; */
  text-align: center;
  /* width: 75px; */
}

.search .el-input {
  width: 200px;
}

.router {
  margin-bottom: 30px;
}

.func {
  display: flex;
  justify-content: flex-end;
}
</style>
<template>
  <div class="home">
    <el-container style="border: 1px solid #eee; height: 100%">
      <el-aside
          style="height: 100vh"
          :width="this.$store.state.logoInfo.sideWidth + 'px'"
      >
        <!-- <Aside :isCollapse="isCollapse" :showLogo="showLogo" /> -->
        <Aside/>
      </el-aside>
      <el-container>
        <el-header>
          <!-- <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" /> -->
          <ManageHeader></ManageHeader>
        </el-header>

        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "../../components/manageComponents/Aside.vue";
import Header from "../../components/manageComponents/ManageHeader.vue";
import ManageHeader from "@/components/manageComponents/ManageHeader.vue";

export default {
  name: "HomeView",
  components: {ManageHeader, Aside, Header},
  data() {
    return {
      collapseBtnClass: "el-icon-s-unfold",
      isCollapse: false,
      sideWidth: 60,
      showLogo: true,
    };
  },
  //   watch: {
  //     deep: true,
  //     "ruleForm.districtValue"(newValue, oldValue) {
  //       this.ruleForm.districtId = newValue[2];
  //     },
  //   },
  methods: {
    // collapse() {
    //   this.isCollapse = !this.isCollapse;
    //   if (this.isCollapse) {
    //     this.sideWidth = 60;
    //     this.collapseBtnClass = "el-icon-s-unfold";
    //     this.showLogo = !this.showLogo;
    //   } else {
    //     this.showLogo = !this.showLogo;
    //     this.sideWidth = 200;
    //     this.collapseBtnClass = "el-icon-s-fold";
    //   }
    // },
  },
  created() {
  },

};
</script>
