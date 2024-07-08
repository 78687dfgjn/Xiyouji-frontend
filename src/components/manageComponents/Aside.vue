<template>
  <div>
    <el-menu
        router
        height="100%"
        :default-openeds="['1', '3']"
        active-text-color="#ffd04b"
        :collapse="this.$store.state.logoInfo.isCollapse"
        style="width: 100%"
    >
      <div class="logo">
        <!--        <img src="../../assets/manage_logo.png" alt=""/>-->
        <img src="@/assets/LOGO1.png" alt="" style="width: 35px"/>
        <b v-if="this.$store.state.logoInfo.showLogo">栖游集-后台</b>
      </div>
      <el-menu-item index="/manage/home"
      ><i class="el-icon-s-home"></i>系统首页
      </el-menu-item
      >

      <el-submenu index="2">
        <template slot="title"
        ><i class="el-icon-s-custom"></i>客户管理
        </template
        >
        <el-menu-item-group>
          <template slot="title">用户</template>
          <el-menu-item index="/manage/account">用户管理</el-menu-item>
          <el-menu-item index="/manage/userComment">用户评价管理</el-menu-item>
          <el-menu-item index="/manage/accountOperate"
          >系统操作日志管理
          </el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">商品</template>
          <el-menu-item index="/manage/commodity">商品管理</el-menu-item>
          <el-menu-item index="/manage/category">分类管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">销售</template>
          <el-menu-item index="/manage/transaction">交易记录管理</el-menu-item>
          <el-menu-item index="/manage/commoditySales"
          >商品销售量管理
          </el-menu-item
          >
          <el-menu-item index="/manage/storeSales">商店销售量管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"
        ><i class="el-icon-s-data"></i>数据可视化
        </template
        >
        <el-menu-item index="/manage/userDataShow"
        >湘西一带用户消费额
        </el-menu-item
        >
        <el-menu-item index="/manage/commodityDataShow">湘西一带商品销售情况</el-menu-item>
      </el-submenu>
      <div>
        <el-submenu index="4">
          <template slot="title"
          ><i class="el-icon-s-tools"></i>系统工具
          </template
          >
          <el-menu-item index="/manage/chat">智能顾问</el-menu-item>
          <el-menu-item index="4-2">湘西一带商品销售情况</el-menu-item>
        </el-submenu>
        <el-menu-item index="5"
        ><i class="el-icon-s-cooperation"></i>关于我们
        </el-menu-item
        >
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  // props: {
  //   showLogo: Boolean,
  //   isCollapse: Boolean,
  // },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.logo {
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo b {
  font-weight: normal;
  line-height: 20px;
  color: #333;
}

.logo img {
  width: 20px;
}

.el-menu-item i {
  margin-right: 16px !important;
}

.el-submenu i {
  margin-right: 16px !important;
}
</style>
