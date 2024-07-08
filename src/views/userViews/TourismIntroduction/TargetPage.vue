<script>
import AMapLoader from "@amap/amap-jsapi-loader";
// 设置安全密钥
window._AMapSecurityConfig = {
  securityJsCode: '8b63cb4781309fbb9fde12c52f32a893',
}
export default {
  name: "TargetPage",
  // computed: {
  //     number() {
  //         return this.$route.query.flag;
  //     },
  // },
  // components: {
  //     'v-chart': ECharts,
  // },
  data() {
    return {
      number: this.$route.query.flag,
      twostep: 1,
      step: 1,
      mapflag: 1,
      markers: [
        {
          position: [109.699221, 28.25442],
          title: '乾州古城'
        },
        {
          position: [109.605000, 27.948249],
          title: '凤凰古城'
        },
      ],

      //地图
      map: null,
      mouseTool: null,
      overlays: [],
      auto: null,
      placeSearch: null,
      overView: null,
      scale: null,
      autocomplete: null,
      district: null,
      adminLevel: "",
      inputLevel: "",
      polylines: [],//用于存储所有线段
      polyline: null,
    }
  },
  methods: {
    initMap() {
      AMapLoader.load({
        "key": "68a8e8122e23490ac2905575c1e3abf7",
        "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": ['AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MouseTool', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.DistrictSearch'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        // 初始化地图
        this.map = new AMap.Map('a-map', {
          viewMode: "2D",  //  是否为3D地图模式
          zoom: 13,   // 初始化地图级别
          center: [109.739428, 28.20923], //中心点坐标  湘西
          resizeEnable: true
        });

        //添加鹰眼控件
        this.overView = new AMap.HawkEye({
          visible: true,
        });
        this.map.addControl(this.overView);
        //添加比例尺控件
        this.scale = new AMap.Scale({
          visible: true,
        });
        this.map.addControl(this.scale);


        //AMap.AutoComplete输入提示插件，可以实现在输入框里输入文本片段即显示相关的匹配信息。
        //JS API 2.0 输入提示插件名称由AMap.Autocomplete变更为AMap.AutoComplete。
        // // 初始化 Autocomplete 插件
        this.autocomplete = new AMap.AutoComplete({
          input: 'city-name',//输入框实际id
        });

        // 初始化 PlaceSearch 插件
        this.placeSearch = new AMap.PlaceSearch({
          pageSize: 1,
          // city: "010",
        });

        this.mapflag = 0;
        //


      }).catch(e => {
        console.log(e);
      });
    },
    startPolyline() {
      this.mouseTool = new AMap.MouseTool(this.map);
      this.mouseTool.on("draw", function (event) {
        //event.obj 为绘制出来的覆盖物对象
        this.polyline = event.obj;
        // this.polylines.push(event.obj);
        // console.log(this.polylines);
        console.log("覆盖物对象绘制完成");
      });
      this.map.on('rightclick', () => {
        if (this.polyline) {
          this.polylines.push(this.polyline);
          console.log(this.polylines);
          this.polyline = null;
        }
      });
      this.mouseTool.polyline({
        strokeColor: "#3366FF", //轮廓线颜色
        strokeOpacity: 1, //轮廓线透明度
        strokeWeight: 3, //轮廓线宽度
        strokeStyle: "solid", //线样式还支持 'dashed'
        //strokeDasharray: [10, 5], //strokeDasharray 属性在 strokeStyle 是 dashed 时有效
      });
    },
    removePolyline() {
      if (this.polylines.length > 0) {
        const lastPolyline = this.polylines.pop();
        lastPolyline.setMap(null);
        console.log(this.polylines);
        // this.map.remove([this.polyline]);
        // this.polyline = null;
      }
    },
    stopPolyline() {
      if (this.mouseTool) {
        this.mouseTool.close();
      }
    },
    select(e) {
      //关键字查询查询
      const location = document.getElementById('city-name').value;
      this.placeSearch.search(location, (status, result) => {
        if (status === 'complete' && result.poiList.pois.length > 0) {
          const poi = result.poiList.pois[0];
          this.map.setCenter(poi.location);
        } else {
          console.log('未找到相关位置');
        }
      });

      var autoOptions = {
        city: "全国",
      };
      var autoComplete = new AMap.AutoComplete(autoOptions);
      autoComplete.search(location, (status, result) => {
        if (status === "complete" && result.tips.length > 0) {
          var firstResult = result.tips[0];
          var adminLevel = firstResult.district; // 获取行政区级别
          this.adminLevel = adminLevel;
          console.log(this.adminLevel);
        }
      });

      if (this.adminLevel.endsWith("省")) {
        this.inputLevel = 'province';
      } else if (this.adminLevel.endsWith("市")) {
        this.inputLevel = 'city';
      } else if (this.adminLevel.endsWith("区") || this.adminLevel.endsWith("县")) {
        this.inputLevel = 'district';
      } else {
        this.inputLevel = '';
      }

      if (this.inputLevel != "") {
        this.district = new AMap.DistrictSearch({
          extensions: "all",//返回行政区边界坐标等具体信息，'all'返回完整行政区边界坐标点
          level: this.inputLevel,//设置查询行政区级别为区，'country'国家，'province'省/直辖市，'city'市 ，'district'区/县，'biz_area'商圈
        });

        this.district.search(location, (status, result) => {
          var bounds = result.districtList[0].boundaries; //获取朝阳区的边界信息
          if (bounds) {
            for (var i = 0; i < bounds.length; i++) {
              //生成行政区划 polygon
              var polygon = new AMap.Polygon({
                map: this.map, //显示该覆盖物的地图对象
                strokeWeight: 1, //轮廓线宽度
                path: bounds[i], //多边形轮廓线的节点坐标数组
                fillOpacity: 0.7, //多边形填充透明度
                fillColor: "#CCF3FF", //多边形填充颜色
                strokeColor: "#CC66CC", //线条颜色
              });
            }
            this.map.setFitView(); //将覆盖物调整到合适视野
          }
        });
      }

    },

    goToP() {
      this.$router.push({path: '/user/heritage'});
      //跳转页面并且把x的值传入该页面中
    },


    // async getCityCode() {
    //     const search_city = document.getElementById('search-city').value;
    //     if (search_city.length > 0) {
    //         try {
    //             const response = await axios.get(
    //                 `https://free-api.heweather.net/s6/weather/city?location=${search_city}&key=3fe2becd36d84a798bda0a45b7a53a9b`
    //             );
    //             if (response.data.HeWeather6[0].status === 'ok') {
    //                 this.city = response.data.HeWeather6[0].basic.cid;
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             // this.cityCode = '请求失败';
    //         }
    //     } else {
    //         this.city = 'CN101251202';
    //     }
    // },


  },
  mounted() {

    // 定义变量
    let chosenSlideNumber = 1; // 当前选择的幻灯片编号
    let offset = 0; // 幻灯片偏移量
    let barOffset = 0; // 导航条偏移量
    // 获取所有抽屉按钮，并为每个按钮添加点击事件监听器
    const drawerBtns = Array.from(document.querySelectorAll(".drawer-btn"));
    // 获取幻灯片区域
    const slideSection = document.querySelector("#slide-section");
    window.slideTo = function (slideNumber) {
      drawerboxToggle(slideNumber); // 切换抽屉面板状态
      drawerbtnToggle(slideNumber); // 切换抽屉按钮状态
      // 更新偏移量
      let previousSlideNumber = chosenSlideNumber;
      chosenSlideNumber = slideNumber;
      offset += (chosenSlideNumber - previousSlideNumber) * (-100); // 计算幻灯片偏移量
      barOffset += (chosenSlideNumber - previousSlideNumber) * (100); // 计算导航条偏移量
      barSlide(barOffset); // 移动导航条
      // 获取所有幻灯片，为每个幻灯片设置偏移量
      const slides = document.querySelectorAll(".card");
      Array.from(slides).forEach(slide => {
        slide.style.transform = `translateY(${offset}%)`;
      })
    }

    // 切换抽屉面板状态
    function drawerboxToggle(drawerboxNumber) {
      let prevDrawerboxNumber = chosenSlideNumber;
      const drawerboxes = document.querySelectorAll(".drawerbox");
      drawerboxes[prevDrawerboxNumber - 1].classList.toggle("active"); // 切换前一个抽屉面板的状态
      drawerboxes[drawerboxNumber - 1].classList.toggle("active"); // 切换当前抽屉面板的状态
    }

    // 切换抽屉按钮状态
    function drawerbtnToggle(drawerBtnNumber) {
      let prevDrawerBtnNumber = chosenSlideNumber;
      const drawerBtns = document.querySelectorAll(".drawer-btn");
      drawerBtns[prevDrawerBtnNumber - 1].classList.toggle("active"); // 切换前一个抽屉按钮的状态
      drawerBtns[drawerBtnNumber - 1].classList.toggle("active"); // 切换当前抽屉按钮的状态
    }

    // 移动导航条
    function barSlide(barOffset) {
      const bar = document.querySelector("#bar");
      bar.style.transform = `translateY(${barOffset}%)`;
    }

  },
  created() {
    window.WIDGET = {
      CONFIG: {
        "layout": "1",
        "width": "850",
        "height": "400",
        "background": "1",
        "dataColor": "FFFFFF",
        "borderRadius": "8",
        // "city": this.city,
        "key": "285582199077435fa144c1bc8447078c"
      },
    };
    let script = document.createElement("script");
    script.src =
        "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
    document.getElementsByTagName("head")[0].appendChild(script);
  },
}
</script>

<style scoped>
#a-map {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "微软雅黑";
}


#out {
  /* display: flex;
  justify-content: center; */
}

#inout {
  width: 100%;
  display: flex;
  justify-content: center;
  background-image: url(./img/aj.jpg);
}

.outdiv {
  height: 700px;
  width: 1300px;
  /* background-color: pink; */
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  opacity: 0.8;
}

.left {
  height: 100%;
  width: 20%;
  /* background-color: skyblue; */
}

.left .top {
  height: 25%;
  width: 100%;
  /* background-color: greenyellow; */
  border-bottom: 1px dashed gray;
}

.left .top img {
  /* height: 100%; */
  width: 100%;
}

.left .top .top-bottom {
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: center;
  color: #8c8c8c;
  margin-top: -30px;
}

.left .top .head-img {
  width: 50px;
  border-radius: 25px;
  position: relative;
  bottom: 32px;
  left: 40%;
}

.left .bottom .indiv {
  color: #10d87b;
  width: 100%;
  height: 50px;
  /* background-color: red; */
  border-bottom: 1px dashed gray;
  border-top: 1px dashed gray;
  margin-top: 10px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  background-color: rgb(10, 79, 143);
  transition: all 1s;
}

.left .bottom .indiv:hover {
  background-color: transparent;
}

/* .left .bottom .indiv:nth-child(1){
    border-top: 1px dashed gray;
} */
.right {
  height: 100%;
  width: 80%;
  background-color: #efefef;
  background-color: transparent;
}

.model {
  height: 100%;
  width: 100%;
}

.right_bottom {
  height: 500px;
  width: 100%;
}

.right_top {
  height: 165px;
  width: 100%;
  text-align: center;
}

.right_top h1 {
  margin: 30px 0;
}

.right .button {
  float: right;
}

.day {
  width: 100%;
  text-align: center;
}

.day h1 {
  margin: 30px 0;
}

.day h3 {
  margin: 15px 0;
}


#zixuan {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(./img2/bg.jpg);
  background-size: cover;
  overflow: hidden;
}

#main {

  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

#click-section {
  width: 25%;
  height: 100%;
  padding: 20px 0;
  position: relative;
}

#drawerboxes {
  margin-left: 5%;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

#drawerboxes::before {
  content: "";
  width: 8px;
  height: 94%;
  position: absolute;
  left: -10px;
  top: 3%;
  z-index: 120;
}

.drawerbox {
  height: calc(100% / 5.5);
  width: 70%;
  position: relative;
  z-index: 100;
  transform: translateX(-70%);
  transition: transform .5s ease-in-out;
}

.drawerbox.active {
  transform: translateX(0);
}

.drawer-btn {
  width: 100%;
  height: 100%;
  font: 800 30px '';
  background-color: rgb(175, 190, 255);
  border: none;
  transition: background-color .5s ease-in-out;
  color: #ffffff00;
}

.drawer-btn.active {
  background-image: url(./img2/bg.jpg);
  background-size: cover;
  color: rgb(70, 100, 180);
}

.drawer-btn:hover {
  cursor: pointer;
}

.drawer-head {
  position: absolute;
  color: rgb(255, 255, 255);
  font-size: 200px;
  font-weight: 700;
  right: -38px;
  top: calc(50% - 135px);
  text-shadow: 2px -1px 8px rgba(250, 80, 193, 0.323);
}

#slide-section {
  position: relative;
  height: 100%;
  width: 75%;
  display: flex;
  justify-content: center;
  padding: 0;
  background: linear-gradient(to right bottom,
  rgba(255, 255, 255, .6),
  rgba(255, 255, 255, .3),
  rgba(255, 255, 255, .2));
  backdrop-filter: blur(11px);
}

#slide-bar {
  position: absolute;
  top: 10%;
  left: 40px;
  height: 80%;
  width: 1px;
  background-color: rgb(223, 223, 223);
}

#bar {
  position: absolute;
  height: calc(100% / 4);
  width: 5px;
  top: 0;
  left: -1.2px;
  background-color: rgb(175, 190, 255);
  transition: transform .5s ease-in-out;
}

#card-section {
  height: 100%;
  width: 80%;
  overflow: hidden;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 10px 0;
  color: white;
  font-size: 30px;
  transition: transform .5s ease-in-out;
}

.card-title {
  font-size: 80px;
  font-weight: 700;
  padding-bottom: min(20%, 40px);
  color: rgb(70, 180, 125);
}


#map_start {
  position: absolute;
  width: 200px;
  top: 40%;
  left: 40%;
}

#to_feiyi {
  position: absolute;
  width: 200px;
  top: 40%;
  left: 40%;
}

#city-name {
  width: 250px;
  height: 40px;
  border-radius: 10px;
  font-size: 18px;
  color: #10d87b;
  outline: none;
  font-weight: 400;
  line-height: 1.6;
  padding: 3px 3px 3px 10px;
  border: 1px solid #8c8c8c;
  background-color: transparent;
}

.btn {
  height: 40px;
  background-color: transparent;
  border-radius: 8px;
  transition: all 1s;
  cursor: pointer;
  border: 1px solid #8c8c8c;
}

.btn:hover {
  background-color: #10d87b;
}

.travel-guide {
  font-family: Arial, sans-serif;
}

.recommend {
  width: 100%;
}

.recommend .shell {
  width: 100%;
  height: 100%;
  background-color: #000;
  overflow: hidden;
}

.recommend .page {
  transform: translateX(-110%);
  position: absolute;
  width: 50%;
  height: 100%;
  transition: .5s;
  background-size: cover;
}

.recommend .button {
  display: block;
  width: 12%;
  color: #fff;
  font-size: 23px;
  border-bottom: #fff solid 4px;
  text-align: center;
  position: absolute;
  bottom: 0px;
  margin: 30px;
  left: calc(50% + (var(--i) * 17%));
  z-index: 999;
  transition: .3s;
}

.recommend .page_content {
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  color: #FFF;
  position: absolute;
  left: 100%;
  display: none;
  animation-name: fade;
  animation-duration: .7s;
  animation-iteration-count: 1;
  opacity: 1;
}

@keyframes fade {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0;
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.recommend input {
  display: none;
}

.recommend input:checked + .page {
  transform: translateX(0px);
  transition: .4s;
}

.recommend input:checked + .page .page_content {
  width: 100%;
  display: block;
}

.recommend .page:nth-child(3) {
  background-image: url('./img/1.jpg');
}

.recommend .page:nth-child(3) .page_content {
  background-color: rgb(185, 130, 130);
}

.recommend .page:nth-child(6) {
  background-image: url('./img/2.jpg');
}

.recommend .page:nth-child(6) .page_content {
  background-color: rgb(173, 170, 226);
}

.recommend .page:nth-child(9) {
  background-image: url('./img/3.jpg');
}

.recommend .page:nth-child(9) .page_content {
  background-color: rgb(236, 180, 110);
}

.recommend .page h1 {
  font-size: 60px;
}

.recommend .page p {
  font-size: 28px;
  padding: 20px;
  background-color: rgba(0, 0, 0, .3);
  border-radius: 10px;
  margin: 20px 0;
}

.recommend .page span {
  font-size: 20px;
  letter-spacing: 2px;
  color: rgb(56, 56, 56);
}

.recommend label:hover {
  cursor: pointer;
  border-bottom: solid 4px rgb(35, 35, 35);
}


#three-d {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.three {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: rgb(5, 122, 64);

}

.three .title1 {
  width: 15%;
  font-size: 100px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  color: #fff;
}

.three .title2 {
  width: 15%;
  font-size: 25px;
  line-height: 50px;
  display: flex;
  align-items: center;
}

.lv-main {
  width: 80%;
  background-color: rgb(193, 233, 190);
}

.lv-main .lv-day {
  margin-left: 30px;
  color: #10d87b;
  font-weight: 600;
  font-size: 35px;
  margin-top: 20px;
}

.lv-main .lv-message {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lv-main .lv-message .lv-message-img {
  width: 40%;
}

.lv-main .lv-message .lv-message-img img {
  width: 100%;
}

.lv-main .lv-message .lv-message-text {
  width: 50%;
  font-size: 20px;
  font-weight: 600;
  line-height: 50px;
}

.lv-main .lv-over {
  width: 100%;
  text-align: center;
}

.lv-main .lv-over span {
  font-size: 18px;
  line-height: 40px;
}
</style>

<template>
  <div id="out">
    <div v-if="number === 1" id="inout">
      <div v-if="number === 1" class="outdiv">
        <div class="left">
          <div class="top">
            <img src="./img/01.jpg" alt="">
            <img src="./img/ll.jpg" alt="" class="head-img">
            <div class="top-bottom">
              <span>今天也是元气满满的一天~</span>
            </div>
          </div>
          <div class="bottom">
            <div class="indiv" @click="step = 1"
                 v-bind:style="{ backgroundColor: step === 1 ? 'transparent' : '' }">
              <span>简介</span>
            </div>
            <div class="indiv" @click="step = 2"
                 v-bind:style="{ backgroundColor: step === 2 ? 'transparent' : '' }">
              <span>第一天</span>
            </div>
            <div class="indiv" @click="step = 3"
                 v-bind:style="{ backgroundColor: step === 3 ? 'transparent' : '' }">
              <span>第二天</span>
            </div>
            <div class="indiv" @click="step = 4"
                 v-bind:style="{ backgroundColor: step === 4 ? 'transparent' : '' }">
              <span>第三天</span>
            </div>
            <div class="indiv" @click="step = 5"
                 v-bind:style="{ backgroundColor: step === 5 ? 'transparent' : '' }">
              <span>第四天</span>
            </div>
            <div class="indiv" @click="step = 6"
                 v-bind:style="{ backgroundColor: step === 6 ? 'transparent' : '' }">
              <span>总结</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="model" v-if="step === 1">
            <div class="right_top">
              <h1>来一次说走就走的旅行：</h1>
              <h3>在这个美丽的省份，即使预算有限，你也能享受到一场精彩的旅行。</h3>
              <el-button class="button" @click="step = 2">start</el-button>
            </div>
            <div class="right_bottom">
              <el-amap :center="[109.739428, 28.20923]" :zoom="10" style="width: 100%; height: 500px;">
                <el-amap-marker v-for="(marker, index) in markers" :key="index"
                                :position="marker.position" :title="marker.title"></el-amap-marker>
              </el-amap>
            </div>
          </div>
          <div class="model" v-else-if="step === 2">
            <div class="day">
              <h1>第一天：抵达吉首</h1>
              <h3>- **交通**：假设你是坐火车或长途汽车到达吉首，预计费用在100元左右。</h3>
              <h3>- **住宿**：选择一家经济型旅馆或招待所，预算约100元/晚。</h3>
              <h3>- **餐饮**：尝试当地特色小吃，比如湘西米粉、酸萝卜等，预计晚餐费用在30元左右。</h3>
              <el-button class="button" @click="step = 3">Next</el-button>
            </div>
          </div>
          <div class="model" v-else-if="step === 3">
            <div class="day">
              <h1>第二天：吉首市区游</h1>
              <h3>-
                **上午**：游览**乾州古城**，这里有很多历史遗迹和文化景观，虽然需要门票，但可以选择性的参观一些免费区域，预计花费不超过50元。</h3>
              <h3>- **下午**：前往**峒河公园**散步，欣赏自然风光，免费开放。</h3>
              <h3>- **住宿**：继续在吉首市区住宿，预算100元/晚。</h3>
              <h3>- **餐饮**：在当地小餐馆享用午餐和晚餐，预计每餐30元，共计60元。</h3>
              <el-button class="button" @click="step = 4">Next</el-button>
            </div>
          </div>
          <div class="model" v-else-if="step === 4">
            <div class="day">
              <h1>第三天：吉首 - 凤凰古城</h1>
              <h3>- **交通**：乘坐长途汽车前往凤凰古城，车票约50元。</h3>
              <h3>-
                **凤凰古城**：古城本身不需要门票，但参观一些特殊景点如杨家祠堂、沈从文故居等需要购票，可以选择性地参观，预计门票费用不超过100元。</h3>
              <h3>- **住宿**：在古城附近找一家便宜的客栈，预算100元/晚。</h3>
              <h3>- **餐饮**：品尝凤凰特色小吃，如血粑鸭、苗家糍粑等，预计两餐共60元。</h3>
              <el-button class="button" @click="step = 5">Next</el-button>
            </div>
          </div>
          <div class="model" v-else-if="step === 5">
            <div class="day">
              <h1>第四天：返回吉首并离开</h1>
              <h3>- **交通**：返回吉首的交通费用约50元。</h3>
              <h3>- **餐饮**：在吉首吃最后一顿早餐，预计20元。</h3>
              <el-button class="button" @click="step = 6">Next</el-button>
            </div>
          </div>
          <div class="model" v-else>
            <div class="day">
              <h1>总计预算</h1>
              <h3>- 交通费：100（往返吉首）+ 50（吉首至凤凰往返）= 200元</h3>
              <h3>- 住宿费：3晚 x 100元/晚 = 300元</h3>
              <h3>- 餐饮费：约240元</h3>
              <h3>- 门票和其他费用：约150元</h3>
              <h3>总计：约890元</h3>
              <h4>
                注意：以上费用为大致估算，实际费用可能会因个人消费习惯、天气、交通等因素有所变动。为了控制预算，可以选择性的参观景点，合理安排餐饮，并尽量选择性价比高的住宿。</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="number === 2" id="zixuan">
      <div id="main">
        <div id="click-section">
          <div id="drawerboxes">
            <div class="drawerbox active" @click="twostep = 1">
              <button class="drawer-btn active" onclick="slideTo(1)">Map<span
                  class="drawer-head">1</span></button>
            </div>
            <div class="drawerbox" @click="twostep = 2">
              <button class="drawer-btn" onclick="slideTo(2)">Weather<span
                  class="drawer-head">2</span></button>
            </div>
            <div class="drawerbox" @click="twostep = 3">
              <button class="drawer-btn" onclick="slideTo(3)">Introduce<span
                  class="drawer-head">3</span></button>
            </div>
            <div class="drawerbox" @click="twostep = 4">
              <button class="drawer-btn" onclick="slideTo(4)">Recommend<span
                  class="drawer-head">4</span></button>
            </div>
          </div>
        </div>
        <div id="slide-section">
          <div id="slide-bar">
            <div id="bar"></div>
          </div>
          <div id="card-section">
            <div id="card1" class="card">
              <div class="card-title" v-if="mapflag === 1">Map</div>
              <!--下面这个div删了地图就显示不出来了-->
              <div>
                <!-- 技术支持和联系方式  -->
              </div>
              <div id="a-map">

              </div>
              <div id="container"></div>
              <el-button @click="initMap()" v-if="mapflag === 1" id="map_start">start</el-button>
              <div class="input-card" style="width:24rem;" v-if="mapflag === 0">
                <h4>设置地图当前行政区</h4>
                <div class="input-item">
                  <input id='city-name' placeholder="怀化市" type="text"
                         style="margin-right:1rem;">
                  <button class="btn" id="query"
                          @click="select()">去指定城市
                  </button>
                </div>
                <!-- <button class="btn" @click="removePolyline()">撤回划线</button> -->
                <button class="btn" @click="startPolyline()">开始划线</button>
                <button class="btn" @click="stopPolyline()">停止划线</button>
              </div>
            </div>
            <div id="card2" class="card">
              <div class="card-title">Weather</div>
              <div>
                <!-- <input id="search-city" type="text" v-model="city" placeholder="请输入城市名称" />
                <button @click="getCityCode()">查询天气</button>
                <div v-if="weather">
                    <h2>{{ weather.location.name }} 的天气</h2>
                    <p>温度：{{ weather.now.tmp }}℃</p>
                    <p>天气：{{ weather.now.cond_txt }}</p>
                </div> -->
                <div class="box">
                  <div id="he-plugin-standard"></div>
                </div>
              </div>
            </div>
            <div id="card3" class="card">
              <div class="card-title">湘西地区部分非遗介绍</div>
              <el-button @click="goToP()" id="to_feiyi" v-if="twostep === 3">goto</el-button>
            </div>
            <div id="card4" class="card">
              <div class="recommend">
                <div class="shell" v-if="twostep === 4">
                  <label for="button1" class="button" style="--i:0">凤凰古城</label>
                  <input type="radio" id="button1" name="page" checked>
                  <div class="page">
                    <div class="page_content">
                      <h1>凤凰古城</h1>
                      <p>仙剑三的取景地，也是茂茂心心念念的长安城。</p>
                      <span>
                                                凤凰古城旅游区由凤凰古城和南华山两个区域组成，总面积4.39平方公里，是以青山抱江的山水格局为基础，以史迹荟萃的人文古城为核心，以浓郁湘西民族风情为特色的旅游胜地。
                                                凤凰古城始建于唐，繁荣于明清，古城街巷自由舒展，空间灵活多变，文化底蕴厚重。民国内阁总理熊希龄、一代文豪沈从文、著名画家黄永玉等都出生在这里。凤凰古城属国家级历史文化名城，被誉为“中国最美的小城”。南华山属国家森林公园，是中国佛教七十二大福地之一，景区内花木楼阁，清泉古刹，秀美醉人。南华山神凤文化景区，以引凤桥、神凤殿等十多处主题景点匠心独创中国首个凤凰文化全体验景区；南华禅寺，古刹梵音掩映于深林之中，古树修竹，禅意绵绵，堪称禅宗圣地。
                                            </span>
                    </div>
                  </div>


                  <label for="button2" class="button" style="--i:1">芙蓉镇</label>
                  <input type="radio" id="button2" name="page">
                  <div class="page">
                    <div class="page_content">
                      <h1>芙蓉镇</h1>
                      <p>一个挂在瀑布上的千年古镇，美轮美奂的夜景，像极了神仙的天宫。</p>
                      <span>芙蓉镇不仅是一个具有悠久历史的千年古镇，也是融自然景色与古朴的民族风情为一体的旅游胜地，又是猛洞河风景区的门户、一个寻幽访古的最佳景点。正像陈运和《芙蓉镇》所说：“湘西口音满背篓
                                                猛洞河古老风韵流”。
                                            </span>
                      <br>
                      <span>四周是青山绿水，镇区内是曲折幽深的大街小巷，临水依依的土家吊脚木楼以及青石板铺就的五里长街，处处透析着淳厚古朴的土家族民风民俗，让游人至此赞不绝口，留连忘返。</span>
                      <br>
                      <span>胡绩伟先生游览猛洞河和芙蓉镇以后作词赞道：“武陵山秀水幽幽，三峡落溪州。悬崖壁峭绿油油，悠悠荡华舟。烹鲜鱼，戏灵猴，龙洞神仙游，芙蓉古镇吊脚楼，土家情意稠。”</span>
                    </div>
                  </div>


                  <label for="button3" class="button" style="--i:2">长潭岗景区</label>
                  <input type="radio" id="button3" name="page">
                  <div class="page">
                    <div class="page_content">
                      <h1>长潭岗景区</h1>
                      <p>两岸青山，一江碧水。若隐若现的古桥，简直是人间仙境。</p>
                      <span>
                                                湖南长潭岗景区位于湘西土家族苗族自治州凤凰县杭瑞高速勾机坡西北1公里，是一个以自然风光和人文景观为首要旅游资源的当地。长潭岗是一个充满着前史和文明遗产的小镇，这儿有着许多微妙的寺庙和奇观。
                                            </span>
                      <br>
                      <span>这儿的潭水明澈碧绿，如一面翡翠镶嵌在山间，让人窒息的美丽。
                                                除了自然风光外，长潭岗还保留着许多重要的前史文明遗产。例如韩山观音寺，是中原地区最陈旧的观音寺之一；福临禅寺，是一个陈旧的寺庙，早年聚集了许多释教高僧；大观古镇，是一个有着600多年历史的陈旧城镇，早年是战国时期楚国的边远地方要塞。这些前史和文明遗产不只保存了这个小镇的前史，更是我国传统文明翻开的一部分。</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="number === 3" id="three-d">
      <div class="three">
        <div class="title1">
          <span>湖南湘西</span>
        </div>
        <div>
          <img src="./img/R-C.jpg" alt="">
        </div>
        <div class="title2">
          <span>一个充满神秘色彩和浓郁民族风情的地区，以其独特的自然景观、悠久的历史文化和淳朴的民俗而著称。</span>
        </div>
      </div>
      <div class="lv-main">
        <div class="lv-day"><span>第1天:抵达吉首</span></div>
        <div class="lv-message">
          <div class="lv-message-img"><img src="./img/吉首.jpg" alt=""></div>
          <div class="lv-message-text">
            <span>- **交通**：根据出发地选择合适的交通方式抵达吉首市，预计费用在200-600元之间。</span>
            <br>
            <span>- **住宿**：入住吉首市区经济型酒店或特色民宿，预算约200元/晚。</span>
            <br>
            <span>- **餐饮**：品尝当地特色美食，如湘西米粉、酸萝卜等。</span>
          </div>
        </div>
        <div class="lv-day"><span>第2天:吉首市区游</span></div>
        <div class="lv-message">
          <div class="lv-message-img"><img src="./img/吉首市.jpg" alt=""></div>
          <div class="lv-message-text">
            <span>- **上午**：游览乾州古城，了解湘西历史文化。</span>
            <br>
            <span>- **下午**：参观吉首市博物馆，了解当地民族风情。</span>
            <br>
            <span>- **晚上**：逛一逛吉首夜市，感受当地的夜生活。</span>
          </div>
        </div>

        <div class="lv-day"><span>第3天:吉首 - 凤凰古城</span></div>
        <div class="lv-message">
          <div class="lv-message-img"><img src="./img/凤凰古城.jpg" alt=""></div>
          <div class="lv-message-text">
            <span>- **交通**：乘坐长途汽车前往凤凰古城，车程约2小时，票价约50元。</span>
            <br>
            <span>- **下午**：抵达凤凰古城后，办理入住手续，稍作休息。</span>
            <br>
            <span>- **晚上**：漫步在沱江边，欣赏古城夜景，品尝当地特色小吃。</span>
          </div>
        </div>

        <div class="lv-day"><span>第4天:凤凰古城全天游</span></div>
        <div class="lv-message">
          <div class="lv-message-img"><img src="./img/凤凰古城1.jpg" alt=""></div>
          <div class="lv-message-text">
            <span>- **上午**：游览杨家祠堂、沈从文故居等著名景点。</span>
            <br>
            <span>- **下午**：参观熊希龄故居，了解这位民国总理的生平事迹。</span>
            <br>
            <span>- **晚上**：观看大型实景演出《边城》，感受湘西文化的魅力。</span>
          </div>
        </div>

        <div class="lv-day"><span>第5天：凤凰古城 - 德夯苗寨</span></div>
        <div class="lv-message">
          <div class="lv-message-img"><img src="./img/德夯苗寨.jpg" alt=""></div>
          <div class="lv-message-text">
            <span>- **交通**：前往德夯苗寨，车程约1小时，票价约50元。</span>
            <br>
            <span>- **上午**：游览德夯苗寨，欣赏苗族建筑、服饰和歌舞表演。</span>
            <br>
            <span>- **下午**：参加苗族传统活动，如打糍粑、绣苗绣等。</span>
            <br>
            <span>- **晚上**：在苗寨内品尝苗族特色菜肴，感受浓厚的民族氛围。</span>
          </div>
        </div>

        <div class="lv-day"><span>第6天：德夯苗寨 - 张家界</span></div>
        <div class="lv-message">
          <div class="lv-message-img"><img src="./img/张家界.jpg" alt=""></div>
          <div class="lv-message-text">
            <span>- **交通**：前往张家界市，车程约4小时，票价约100元。</span>
            <br>
            <span>- **下午**：抵达张家界后，入住酒店休息。</span>
            <br>
            <span>- **晚上**：在张家界市区品尝当地美食，如三下锅等。</span>
          </div>
        </div>

        <div class="lv-day"><span>第7天：张家界国家森林公园</span></div>
        <div class="lv-message">
          <div class="lv-message-img"><img src="./img/张家界国家森林公园.jpg" alt=""></div>
          <div class="lv-message-text">
            <span>- **上午**：游览张家界国家森林公园，欣赏袁家界、天子山等自然景观。</span>
            <br>
            <span>- **下午**：游览金鞭溪，领略清澈的溪水和奇特的岩石景观。</span>
            <br>
            <span>- **晚上**：结束愉快的旅程，准备返程。</span>
          </div>
        </div>

        <div class="lv-over">
          <div class="lv-over-text">
            <h1>预算安排</h1>
            <span>- **交通费**：约600元（包括往返吉首的交通费和景区间交通费）</span>
            <br>
            <span>- **住宿费**：约1200元（6晚，约200元/晚）</span>
            <br>
            <span>- **餐饮费**：约1000元（每天约150元）</span>
            <br>
            <span>- **门票费**：约600元（包括乾州古城、凤凰古城、德夯苗寨、张家界国家森林公园等景点门票）</span>
            <br>
            <span>- **其他费用**：约300元（包括购物、娱乐等费用）</span>
            <h3>总计预算：约4700元</h3>
            <br>
            <h1>注意事项</h1>
            <span>1. 湘西地区属于山区地貌，气候多变，请随身携带雨具和保暖衣物。</span>
            <br>
            <span>2. 当地餐饮口味偏辣，如有不适，请提前告知商家。</span>
            <br>
            <span>3. 在景区内请注意安全，遵守当地的风俗习惯。</span>
            <br>
            <span>4. 如需购物，请选择正规商店，避免购买假冒伪劣产品。</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
