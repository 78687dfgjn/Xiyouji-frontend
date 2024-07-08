<script>

import index from "vuex";

export default {
  name: "Shop",
  mounted() {
    this.getCommodity()
    this.getCategory()
    this.getStore()
  },
  data() {
    return {
      commodityList: [],
      categoryList: [],
      storeList: [],
      num: 1,
      centerDialogVisible: false,
      innerVisible: false,
      commodityInfo: {},
      page: {
        pageNum: 1,
        pageSize: 40,
        total: 100,
        commodityTitle: '',
        categoryName: '',
        storeName: '',
      }
    }
  },
  methods: {
    showCommodityDetails(id, event) {
      this.centerDialogVisible = true
      index = id - this.commodityList[0].commodityId
      this.commodityInfo = this.commodityList[index]
      // alert({...this.commodityInfo})
      // alert(JSON.stringify(this.commodityInfo))
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getCommodity()
    },
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.getCommodity()
    },
    getCommodity(categoryName, storeName, event) {
      this.page.categoryName = categoryName
      this.page.storeName = storeName
      this.request.get("/commodity/page", {
        params: {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          commodityTitle: this.page.commodityTitle,
          categoryName: categoryName ? categoryName : '',
          storeName: storeName ? storeName : '',
        }
      }).then(res => {
        this.commodityList = res.data.records
        this.page.total = res.data.total
      })
    },
    getCategory() {
      this.request.get("/category").then(res => {
        if (res.code === "200") {
          this.categoryList = res.data
        }
      })
    },
    getStore() {
      this.request.get("/store").then(res => {
        if (res.code === "200") {
          this.storeList = res.data
        }
      })
    },

  },

}
</script>
<style scoped>
.introduce-wrap ul li {
  margin: 10px 0 25px;
}

.commodity-introduce {
  display: flex;
  width: 1200px;
  margin: 40px auto;
}

.introduce-img img {
  width: 400px;
  height: 400px;
}

li {
  list-style: none;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  //line-height: 300px;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.shop-show h3 {
  font-size: calc(1.3rem + .6vw);
  width: 200px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  margin: 0 auto 42px;
  font-weight: 600;
  padding: 0 10px;
}

.shop-show a {
  width: 250px;
  height: 320px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  margin: 0 auto;
  transition: all .2s ease-in-out;
}

.shop-show a:hover {
  box-shadow: 2px 2px 10px #989898;
  transform: scale(1.03) translateY(-5px);
}

.shop-show ul {
  display: flex;
  flex-wrap: wrap;
  background-color: #f3f3f3;
  padding: 15px 10px;
}

.shop-show {
  //margin: 20px 0 30px;
  padding: 20px 10px;
  width: 1400px;
  margin: 0 auto;
}

.shop-show .commodity-img img {
  width: 170px;
}

.commodity-info p {
  width: 200px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #464646;
}

.commodity-price {
  color: #e4393c;
  font-size: 20px;
  font-weight: 600;
}

.commodity-price span {
  //font-size: 20px;
  font-weight: 600;
}

.commodity {
  display: block;
  width: 20%;
  margin: 15px 0;
  padding: 0 10px;
}

.type {
  width: 1400px;
  margin: 0 auto;
  height: 350px;
  display: flex;

}

.type h2 {
  font-size: 24px;
}

.commodity-type {
  width: 24%;
  height: 100%;
  max-height: 100%;
  margin-right: 1%;
  background-color: #f3f3f3;
  font-size: 24px;
}

.commodity-type .el-row {
  max-height: 100%;
}

.store-type {
  width: 24%;
  height: 100%;
  max-height: 100%;
  margin-left: 1%;
  background-color: #f3f3f3;
  font-size: 22px;
}

.store-type .el-row {
  max-height: 100%;
  overflow: hidden;
}
</style>

<template>
  <div class="outer-box">
    <!--分类-->
    <div class="type">
      <div class="commodity-type">
        <h2>热门分类</h2>
        <el-row :gutter="30">
          <el-col :span="8" v-for="category in categoryList" :key="category.categoryId">
            <el-link @click="getCommodity(category.categoryName,false,$event)">{{
                category.categoryName
              }}
            </el-link>
          </el-col>
        </el-row>
      </div>
      <el-carousel :interval="5000" arrow="always" height="350px" style="width: 50%">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <div class="store-type">
        <h2>热门店铺</h2>
        <el-row :gutter="20">
          <el-col :span="12" v-for="store in storeList.slice(0,18)" :key="store.storeId">
            <el-link type="primary" @click="getCommodity(false,store.storeName,$event)">{{
                store.storeName
              }}
            </el-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="shop-show">
      <h3>{{ page.storeName || page.categoryName }}</h3>
      <ul>
        <li v-for="commodity in commodityList" :key="commodity.commodityId" class="commodity"
            @click="showCommodityDetails(commodity.commodityId,$event)">

          <a :title="commodity.commodityTitle">
            <div class="commodity-img">
              <img :src="commodity.commodityPicture">
            </div>
            <div class="commodity-info">
              <p>
                {{ commodity.commodityTitle }}
              </p>
            </div>
            <div class="commodity-price">
              ￥
              <span> {{ commodity.commodityPrice }}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[10, 20,30,40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
    >
    </el-pagination>
    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="1200px"
        center>
      <el-dialog
          width="30%"
          title="完成支付……"
          :visible.sync="innerVisible"
          append-to-body
          center
      >
        <strong>请你您支付{{ num * commodityInfo.commodityPrice }}</strong>
        <img src="../../assets/wx.png" style="width: 100%">
      </el-dialog>
      <div class="commodity-introduce">
        <div class="introduce-img">
          <img :src="commodityInfo.commodityPicture">
        </div>
        <div class="introduce-wrap">
          <ul style="    padding-left: 2rem;">
            <li style="">
              <h5 style=
                      "line-height: 35px;color: #656464;font-size: 1.25rem;margin-top: 0;
                      margin-bottom: 0.5rem;
                      font-weight: 500;
                      display: block;
                      padding-right: 70px;
"
              > {{ commodityInfo.commodityTitle }}</h5>
            </li>
            <li class="itemHint"
                style="    color: #ff595c;
    font-size: 14px;">店铺：{{ commodityInfo.storeName }}
            </li>
            <li class="itemPrice"
                style="color: #e4393c;
    font-size: 18px;
    height: 70px;
    line-height: 70px;
    background-color: #fce5e5;
    padding-left: 20px;
    width: 700px;
"
            > ￥ <span
                style="    font-size: 25px;
    font-weight: 600;"
            >{{ commodityInfo.commodityPrice }}</span></li>
            <li>
              <el-input-number v-model="num" :step="1" :min="1" step-strictly></el-input-number>
            </li>
            <li>
              <button type="button" class="getCar btn"
                      style="    width: 150px;
    height: 50px;
    text-decoration: none;
    border: none;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    background-color: #f64444;"
                      @click="innerVisible = true"
              > 预约到店取
              </button>
            </li>
          </ul>
        </div>
      </div>
      <!--      <span>需要注意的是内容是默认不居中的</span>-->
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="centerDialogVisible = false">取 消</el-button>-->
        <!--    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
  </span>
    </el-dialog>
  </div>
</template>

