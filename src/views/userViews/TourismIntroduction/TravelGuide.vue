<style scoped>
#container, .baiduMap, #map {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 800px;
}

.text {
  font-size: 18px;
}

.back {
  margin: 20px;
}

.navtrans-view a {
  display: none;
}

.navtrans-view.expand a {
  display: none;
}

.go-out-mode {
  width: 100%;
  height: 120px;
  margin: 20px;
  display: flex;
  justify-content: center;
}

.go-out-mode div:nth-child(1) {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.go-out-mode div:nth-child(2) {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 20px;
}

.custom-card {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.custom-card p {
  font-size: 16px;
  line-height: 1.6;
}

.custom-card p b {
  color: #007bff;
}

b {
  color: #007bff;
}
</style>

<template>
  <div class="outer-box">
    <!--    <div id="map" ref="map"></div>-->
    <el-card class="custom-card">
      <p v-html="$route.params.content" class="content">

      </p>
      <!--      <h4>关键词：</h4>-->
      <!--      <el-input v-model="keyword" placeholder="关键词："></el-input>-->
      <!--      <h4>地区：</h4>-->
      <!--      <el-input v-model="location" placeholder="地区："></el-input>-->
    </el-card>
    <div class="go-out-mode">
      <div>
        <h4>您可以选择您的出行方式</h4>
        <el-select v-model="goOutMode" filterable placeholder="请选择">
          <el-option-group
              v-for="group in goOutModeOptions"
              :key="group.label"
              :label="group.label">
            <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-option-group>
        </el-select>
      </div>
      <div>
        <h4>
          您还可以选择您的出行策略
        </h4>
        <el-button @click="dialogVisible = true">
          我要选择
        </el-button>
      </div>
    </div>
    <div class="baiduMap">
      <baidu-map
          :center="baiduMap.center"
          :zoom="baiduMap.zoom"
          :scroll-wheel-zoom="true"
          style="width: 100%; height: 100%"
          @ready="handler"
      >
        <!--          @click="getClickInfo"-->
        <!--          @moving="syncCenterAndZoom"-->
        <!--          @moveend="syncCenterAndZoom"-->
        <!--          @zoomend="syncCenterAndZoom"-->

        <!--        驾车行驶路线-->
        <!--            startCity="北京"-->
        <!--            endCity="南京"-->
        <!--            :waypoints="['呼和浩特', {lng: 112.53, lat: 37.87}, '陕西兵马俑']"-->
        <bm-driving v-if="this.goOutMode === 'car'"
                    :start="$route.params.position.positionList[0].location"
                    :end="$route.params.position.positionList[$route.params.position.positionList.length - 1].location"
                    :select-first-result="true"
                    location="湖南"
                    :waypoints="$route.params.position.positionList.slice(0,10).map(item => {
                      return item.location
                    })"
                    :policy="driving.drivingPolicy"
                    :auto-viewport="true"
        ></bm-driving>
        <Error404 v-else-if="goOutMode === ''"></Error404>
        <!--                步行路线推荐-->
        <bm-walking v-else-if="goOutMode === 'walk'" :start="$route.params.position.positionList[0].location"
                    :end="$route.params.position.positionList[$route.params.position.positionList.length-1].location"
                    :select-first-result="true"
                    :auto-viewport="true" location="湖南"></bm-walking>
        <!--                公交路线推荐-->
        <bm-transit v-else-if="goOutMode === 'bus'" :start="$route.params.position.positionList[0].address"
                    :end="$route.params.position.positionList[$route.params.position.positionList.length-1].address"
                    :auto-viewport="true" location="湖南"
                    :policy="transit.transitPolicy"
                    :select-first-result="true"
        ></bm-transit>
        <!--        <bm-transit v-else-if="goOutMode === 'bus'" start="百度大厦" end="北京邮电大学西门" :auto-viewport="true"-->
        <!--                    location="中国"></bm-transit>-->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
          <h2>请选择该出行方式下的出行策略: {{ goOutMode }}</h2>
          <!--                      :before-close="handleClose"-->
          <el-select v-if="goOutMode === 'bus'" v-model="transit.transitPolicy" placeholder="请选择">
            <el-option
                v-for="item in transit.transitPolicyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-select v-else-if="goOutMode === 'car'" v-model="driving.dialogDrivingPolicy" placeholder="请选择">
            <el-option
                v-for="item in driving.drivingPolicyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <Error404 v-else></Error404>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false;
              driving.drivingPolicy = driving.dialogDrivingPolicy
            ">确 定</el-button>
          </span>
        </el-dialog>
        <!--        <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>-->
        <bm-polyline :path="$route.params.position.positionList.map(poi => {
          return poi.location
        })" stroke-color="blue" :stroke-opacity="0.5"
                     :stroke-weight="2"></bm-polyline>
        <bm-marker v-for="(pathItem,index) in this.$route.params.position.positionList" :position="pathItem.location"
                   :key="index"
                   animation="BMAP_ANIMATION_BOUNCE"
        >
          <bm-label :content="pathItem.name" :labelStyle="{color: 'red', fontSize : '14px'}"
                    :offset="{width: -35, height: 30}"/>
        </bm-marker>
      </baidu-map>

    </div>
  </div>
</template>
<script>
import Error404 from "@/views/commonViews/errorViews/Error404.vue";

export default {
  name: "TravelGuide",
  components: {Error404},
  data() {
    return {
      dialogVisible: false,
      goOutMode: 'car',
      location: '中国',
      keyword: '',
      map: null,
      baiduMap: {
        // 地址信息
        BMap: null,
        map: null,
        address: null,
        center: null,
        //地图展示级别
        zoom: 15,
        polylinePath: []
      },
      goOutModeOptions: [{
        label: '热门',
        options: [{
          value: 'car',
          label: '自驾游'
        }, {
          value: 'bus',
          label: '公交车'
        },]
      }, {
        label: '其他出行方式',
        options: [{
          value: 'walk',
          label: '步行'
        }, {
          value: 'motorcycle',
          label: '摩托车'
        }, {
          value: 'bicycle',
          label: '骑行'
        }]
      }],
      driving: {
        drivingPolicy: 'BMAP_DRIVING_POLICY_DEFAULT',
        dialogDrivingPolicy: 'BMAP_DRIVING_POLICY_DEFAULT',
        drivingPolicyOptions: [
          {
            value: 'BMAP_DRIVING_POLICY_DEFAULT',
            label: '默认'
          },
          {
            value: 'BMAP_DRIVING_POLICY_FIRST_HIGHWAYS',
            label: '优先高速'
          },
          {
            value: 'BMAP_DRIVING_POLICY_AVOID_HIGHWAYS',
            label: '避开高速'
          },
          {
            value: 'BMAP_DRIVING_POLICY_AVOID_CONGESTION',
            label: '避开拥堵'
          }
        ],

      },
      transit: {
        transitPolicy: 'BMAP_TRANSIT_POLICY_RECOMMEND',
        transitPolicyOptions: [
          {
            value: 'BMAP_TRANSIT_POLICY_RECOMMEND',
            label: '推荐方案'
          },
          {
            value: 'BMAP_TRANSIT_POLICY_LEAST_TIME',
            label: '最少时间'
          },
          {
            value: 'BMAP_TRANSIT_POLICY_LEAST_TRANSFER',
            label: '最少换乘'
          },
          {
            value: 'BMAP_TRANSIT_POLICY_LEAST_WALKING',
            label: '最少步行'
          },
          {
            value: 'BMAP_TRANSIT_POLICY_AVOID_SUBWAYS',
            label: '不乘地铁'
          },
          {
            value: 'BMAP_TRANSIT_POLICY_FIRST_SUBWAYS',
            label: '优先地铁'
          }
        ]
      }
    }
  },
  created() {
    console.log("router==>", this.$route)
  },
  mounted() {

  },
  unmounted() {

  },
  methods: {
    /**
     * 百度地图
     * @param BMap
     * @param map
     */
    handler({BMap, map}) {
      // map.lng = this.$route.params.position.positionList[0].location[0]
      // map.lat = this.$route.params.position.positionList[0].location[1]
      // console.log("map_handler")
      // let _this = this
      this.baiduMap.BMap = BMap
      this.baiduMap.map = map
      this.baiduMap.center = this.$route.params.position.positionList[0].location;
      // this.baiduMap.center.lng = this.$route.params.position.positionList[0].location[0];
      // this.baiduMap.center.lat = this.$route.params.position.positionList[0].location[0];
      // this.zoom = this.zoom;
    },
  }
}
</script>
