<style scoped>
.outer-box {
  margin: 20px;
  display: flex;
}

.left {
  width: 50%;
  padding: 0 20px;
}

.right {
  width: 50%;
  /* height: 500px; */
  /* background-color: pink; */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.right .outdiv {
  margin: 10px;
  cursor: pointer;
}

.right .indiv:hover {
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
}

.right div .indiv {
  /* display: flex;
  justify-content: space-around; */
  height: 250px;
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 8px;
}

.right .classify {
  font-size: 25px;
  font-weight: bolder;
}

.right .in_top {
  height: 60%;
  /* background-color: skyblue; */
  overflow: hidden;
}

.right .in_top img {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  transition: all 1.5s;
}

.right .in_top img:hover {
  transform: scale(1.2);
}

.right .in_body {
  height: 30%;
  padding: 10px;
  background-color: #fff;
}

.right .in_bottom {
  height: 9%;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.right .in_bottom .name {
  color: aqua;
  font-weight: lighter;
  cursor: pointer;
}

.right .in_bottom .name:hover {
  text-decoration: underline;
}

.right .in_bottom .aa1 {
  display: inline-block;
  height: 90%;
  width: 20px;
}

.right .in_bottom .aa1 img {
  height: 90%;
  width: 90%;
  //transform: scale(3);
}

.step {
  margin-bottom: 50px;
}
</style>

<template>
  <div class="outer-box">
    <!--    <el-button @click="outerDialogVisible = true">显示对话框</el-button>-->
    <!--    <el-progress :percentage="12" color="#13ce66" :stroke-width="20"></el-progress>-->
    <!--    <el-dialog-->
    <!--        title="旅游规划"-->
    <!--        :visible.sync="outerDialogVisible"-->
    <!--        width="30%"-->

    <!--    >-->
    <div class="left">
      <div class="step">
        <el-steps :active="stepActive" align-center finish-status="success">
          <el-step title="步骤1" description="输入预算"></el-step>
          <el-step title="步骤2" description="选择旅游目的地"></el-step>
          <el-step title="步骤3" description="输入预估旅游天数"></el-step>
          <el-step title="步骤4" description="确认生成"></el-step>
        </el-steps>
      </div>


      <div v-if="budget.step === 1">
        <span>请输入你的预算：</span>
        <el-select v-model="budget.unit" placeholder="请选择">
          <el-option v-for="item in budget.units" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </div>


      <el-form :model="form" ref="form" label-width="100px" v-loading.fullscreen="loading"
               element-loading-text="正在全力为你制定旅游计划…………">

        <div v-if="budget.step === 1">
          <el-form-item label="预算">
            <span style="display:flex">{{ form.budgetMoney * budget.unit }}元</span>
            <el-slider v-model="form.budgetMoney" show-input :max="budget.max" :step="budget.step">
              <!--            @change="budgetChange"-->
            </el-slider>
          </el-form-item>
        </div>

        <div v-if="budget.step === 2">
          <span>请选择旅游目的地：</span>
          <el-form-item label="目的地" prop="region">
            <el-cascader v-model="form.districtValue" placeholder="请选择所属地区" :options="district.districtOptions"
                         :props="{ expandTrigger: 'hover', multiple: true }" @change="stepActive = 2" clearable
                         filterable></el-cascader>
          </el-form-item>
        </div>

        <div v-if="budget.step === 3">
          <span>请输入预估旅游天数：</span>
          <el-form-item label="旅游天数">
            <el-input-number v-model="form.days" :min="1" :max="100" label="旅游天数"
                             @change="stepActive = 3"></el-input-number>
          </el-form-item>
        </div>

        <el-form-item>
        </el-form-item>

      </el-form>

      <div v-if="budget.step !== 4">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="toFront">上一步</el-button>
        <el-button type="primary" @click="toNext">下一步</el-button>
      </div>


      <div v-if="budget.step === 4">
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm">确认生成</el-button>
        </span>
      </div>
    </div>
    <!--    </el-dialog>-->

    <div class="right">

      <div class="outdiv">
        <span class="classify">来一次说走就走的旅行：</span>
        <div class="indiv" @click="goToPage(1)">
          <div class="in_top">
            <img src="./img/R-C.jpg" alt="">
          </div>
          <div class="in_body">
            <span>吉首</span>
            <span>-</span>
            <span>凤凰</span>
            <h2>简单攻略</h2>
          </div>
          <div class="in_bottom">
            <div class="aa1">
              <img src="./img/name.png" alt="">
            </div>
            <span class="name">伍六七</span>
          </div>
        </div>
      </div>

      <div class="outdiv">
        <span class="classify">一些简单的帮助为您的旅游更添风味：</span>
        <div class="indiv" @click="goToPage(2)">
          <div class="in_top">
            <img src="./img/R-C.jpg" alt="">
          </div>
          <div class="in_body">
            <span></span>
            <h2>简单工具+景点推荐</h2>
          </div>
          <div class="in_bottom">
            <div class="aa1">
              <img src="./img/name.png" alt="">
            </div>
            <span class="name">小阿柒</span>
          </div>
        </div>
      </div>

      <div class="outdiv">
        <span class="classify">来一场全方面沉浸式体验的旅游：</span>
        <div class="indiv" @click="goToPage(3)">
          <div class="in_top">
            <img src="./img/R-C.jpg" alt="">
          </div>
          <div class="in_body">
            <span>吉首</span>
            <span>-</span>
            <span>凤凰古城</span>
            <span>-</span>
            <span>德夯苗寨</span>
            <span>-</span>
            <span>张家界</span>
            <h2>攻略</h2>
          </div>
          <div class="in_bottom">
            <div class="aa1">
              <img src="./img/name.png" alt="">
            </div>
            <span class="name">梅花十三</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "IntelligentRecommendation",
  data() {
    return {
      stepActive: 1,
      loading: false,
      positionList: [],
      district: {
        districtOptions: [
          {
            value: '湘西',
            label: '湘西',
            children: [],
          }
        ],
      },
      outerDialogVisible: false,
      budget: {
        max: 99,
        step: 1,
        unit: 1,
        units: [{
          value: 1,
          label: '元'
        }, {
          value: 10,
          label: '百元'
        }, {
          value: 100,
          label: '千元'
        }, {
          value: 1000,
          label: '万元'
        }, {
          value: 10000,
          label: '更多'
        },
        ],
      },
      form: {
        budgetMoney: 0,
        days: 0,
        districtValue: [],
      },
      region: {
        province: [
          {
            required: false,
            message: "请选择用户所属省份",
            trigger: "change",
          },
        ],
        city: [
          {
            required: false,
            message: "请选择用户所属城市",
            trigger: "change",
          },
        ],
        county: [
          {
            required: false,
            message: "请选择用户所属县区",
            trigger: "change",
          },
        ],
      },
    }
  },
  methods: {
    toNext() {
      if (this.budget.step < 4) {
        this.stepActive = this.budget.step + 1;
        this.budget.step += 1;
      }
    },
    toFront() {
      if (this.budget.step > 1) {
        this.stepActive = this.budget.step - 1;
        this.budget.step -= 1;
      }
    },
    goToPage(x) {
      // this.$router.push({path: '/user/destination', query: {flag: x}});
      this.$router.push({name: "精品推荐", query: {flag: x}});
      //跳转页面并且把x的值传入该页面中
    },
    cancel() {
      this.stepActive = 1;
      this.form.budgetMoney = 0;
      this.form.days = 1;
      this.budget.max = 100;
      this.budget.step = 1;
      this.form.districtValue = [];
      this.outerDialogVisible = false
    },
    budgetChange() {
      this.stepActive = 1;
      if (this.form.budgetMoney === this.budget.max) {
        this.budget.max *= 10;
        this.budget.step *= 10;
        // this.budget.budgetMoney--;
        this.budget.unit = this.budget.max / 100;
      }
    },
    getAllPosition(posStr) {


    },
    submitForm() {
      this.$router.push(
          {
            name: '旅游规划智能生成',
            params:
                {
                  "content": "根据您的需求，我为您定制了一份湘西非遗文化旅游计划：<br/><b style=\"color: #007bff;\">第一天</b>：<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;早上</b>前往老司城遗址，探索古老的城址，感受历史的沧桑。<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;中午</b>品尝当地特色美食。<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;下午</b>前往凤凰古城，在这座保存完好的古城中漫步，感受古镇的宁静与神秘。<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;晚上</b>入住当地特色客栈，体验湘西独特的民俗文化。<br/><b style=\"color: #007bff;\">第二天</b>：<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;早上</b>前往乾州古城，探索这座古老城市的遗址，感受历史的韵味。<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;中午</b>品尝当地美食。<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;下午</b>游览德夯风景名胜区，欣赏湘西的壮丽自然风光。<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;晚上</b>在风景名胜区附近的民宿住宿，享受宁静的夜晚。<br/><b style=\"color: #007bff;\">第三天</b>：<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;早上</b>游览猛洞河风景名胜区，欣赏清澈的河水和美丽的风景。<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;中午</b>品尝当地美食。<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;下午</b>前往里耶-乌龙山风景名胜区吕洞山风景名胜区，徒步登山，领略湘西的壮丽山川风光。<br/><b style=\"color: #007bff;\">&nbsp;&nbsp;&nbsp;&nbsp;晚上</b>游览白沙镇和边城镇的古镇苗寨，体验湘西的民俗文化。<br/>结束愉快的旅程。<br/>根据您的预算和旅游天数，这份旅游计划是非常合适的。希望您在湘西的旅行中能够留下美好的回忆！祝旅途愉快！",
                  "position": {
                    "positionList": [{
                      "name": "老司城遗址公园",
                      "location": {"lat": 29.018994, "lng": 109.945659},
                      "uid": "d8f910d52ff8cbd321f0171f",
                      "province": "湖南省",
                      "city": "湘西土家族苗族自治州",
                      "cityid": 274,
                      "district": "永顺县",
                      "adcode": 433127,
                      "business": "",
                      "tag": "4A景区",
                      "address": "湘西土家族苗族自治州-永顺县-灵溪镇老司城村",
                      "children": [{
                        "uid": "2a5aff4f4765bea76e20b990",
                        "show_name": "大门",
                        "name": "老司城遗址公园-大门"
                      }]
                    }, {
                      "name": "凤凰古城",
                      "location": {"lat": 27.953214, "lng": 109.609029},
                      "uid": "161a0ed2db9e2e505cd4fe15",
                      "province": "湖南省",
                      "city": "湘西土家族苗族自治州",
                      "cityid": 274,
                      "district": "凤凰县",
                      "adcode": 433123,
                      "business": "",
                      "tag": "5A景区",
                      "address": "湘西土家族苗族自治州-凤凰县-沱江镇",
                      "children": [{
                        "uid": "708e1055aa9c325417948e6b",
                        "show_name": "奇峰广场游客中心",
                        "name": "凤凰古城-奇峰广场游客中心"
                      }]
                    }, {
                      "name": "乾州古城",
                      "location": {"lat": 28.260531, "lng": 109.706574},
                      "uid": "49d95938767d8d43c61e511e",
                      "province": "湖南省",
                      "city": "湘西土家族苗族自治州",
                      "cityid": 274,
                      "district": "吉首市",
                      "adcode": 433101,
                      "business": "",
                      "tag": "4A景区",
                      "address": "湘西土家族苗族自治州-吉首市-人民中路",
                      "children": [{
                        "uid": "ac1e3b64061ca8312fb90845",
                        "show_name": "西北门",
                        "name": "乾州古城-西北门"
                      }]
                    }, {
                      "name": "吉首市德夯风景名胜区管理处",
                      "location": {"lat": 28.274385, "lng": 109.706178},
                      "uid": "4a74a4946fa41e5dc17da218",
                      "province": "湖南省",
                      "city": "湘西土家族苗族自治州",
                      "cityid": 274,
                      "district": "吉首市",
                      "adcode": 433101,
                      "business": "",
                      "tag": "行政单位",
                      "address": "湘西土家族苗族自治州-吉首市-朝阳路2号",
                      "children": []
                    }, {
                      "name": "猛洞河漂流",
                      "location": {"lat": 28.948023, "lng": 109.963097},
                      "uid": "9e77cd5adc18633c901fc971",
                      "province": "湖南省",
                      "city": "湘西土家族苗族自治州",
                      "cityid": 274,
                      "district": "永顺县",
                      "adcode": 433127,
                      "business": "",
                      "tag": "4A景区",
                      "address": "湘西土家族苗族自治州-永顺县-S230",
                      "children": []
                    }, {
                      "name": "里耶-乌龙山风景名胜区管理处",
                      "location": {"lat": 29.446939, "lng": 109.443786},
                      "uid": "1beddc8ecb4fc6ae8a36ee58",
                      "province": "湖南省",
                      "city": "湘西土家族苗族自治州",
                      "cityid": 274,
                      "district": "龙山县",
                      "adcode": 433130,
                      "business": "",
                      "tag": "行政单位",
                      "address": "湘西土家族苗族自治州-龙山县-湘鄂路皇冠幼儿园北侧约30米",
                      "children": []
                    }, {
                      "name": "吕洞山",
                      "location": {"lat": 28.469103, "lng": 109.673616},
                      "uid": "eef2d52895402ea43be4a625",
                      "province": "湖南省",
                      "city": "湘西土家族苗族自治州",
                      "cityid": 274,
                      "district": "保靖县",
                      "adcode": 433125,
                      "business": "",
                      "tag": "风景区",
                      "address": "湘西土家族苗族自治州-保靖县-吕洞山景区",
                      "children": []
                    }, {
                      "name": "苗寨",
                      "location": {"lat": 28.849257, "lng": 109.763131},
                      "uid": "0a46dc0f6f7d0a5e30621203",
                      "province": "湖南省",
                      "city": "湘西土家族苗族自治州",
                      "cityid": 274,
                      "district": "永顺县",
                      "adcode": 433127,
                      "business": "",
                      "tag": "村庄",
                      "address": "湘西土家族苗族自治州-永顺县",
                      "children": []
                    }, {
                      "name": "苗寨",
                      "location": {"lat": 27.967118, "lng": 109.562037},
                      "uid": "b86c6206c8a9292107026f76",
                      "province": "湖南省",
                      "city": "湘西土家族苗族自治州",
                      "cityid": 274,
                      "district": "凤凰县",
                      "adcode": 433123,
                      "business": "",
                      "tag": "村庄",
                      "address": "湘西土家族苗族自治州-凤凰县-沱江镇",
                      "children": []
                    }], "allToll": 0, "weatherForest": null
                  }
                }
          }
      )
      return
      this.stepActive = 4;
      this.outerDialogVisible = false;
      console.log(this.form)
      // setTimeout(() => {
      this.loading = true;
      // }, 1000)
      // 使用map和forEach来遍历数组，并使用正则表达式替换字符串中的数字和斜杠
      const formattedDistrictValue = this.form.districtValue.map(district => {
        // return [
        //   '{省份：' + district[0], // 省份名称前添加“省份：”
        //   '市区：' + district[1], // 市区名称前添加“市区：”
        //   '县区：' + district[2] + '}' // 县区名称前添加“县区：”
        //   // '县区：' + district[2].replace(/[\d\/]/g, '') + '}' // 县区名称前添加“县区：”
        // ];
        return [
          '{所属分类：' + district[1], //所属分类
          '地点名：' + district[2] + '}' //
        ];

      });
      let question = '接下来请为我定制一份旅游计划，要求推荐的均为湘西（湖南西部）非遗文化，我的旅游目的地包括湘西的以下地区('
          + formattedDistrictValue +
          ')我的预算是' + this.form.budgetMoney * this.budget.unit + '元'
          + '我的预估旅游天数为' + this.form.days + '天';
      console.log(question);
      /**
       * 第一次请求制定旅游计划
       */
      this.request.post("/chat", {
        question,
      }).then(res => {
        if (res.code === "200") {
          const question = "提取出要参观的景区，（要求格式为所有景区存在一个数组中发给我）" + res.data
          /**
           * 第二次请求将景点提出
           */
          console.log("输出景区" + question)
          this.request.post("/chat", {
            question,
            /**
             * 第二次请求返回参数为res1
             */
          }).then(res1 => {
            if (res1.code === "200") {
              console.log(res1.data)
              /**
               * 第三次请求将使用百度地图api获得，位置经纬度以便在地图上展示
               */
              this.request.post("/baidu/position", {
                positionStr: res1.data
                /**
                 * 第三次请求返回参数为res2
                 */
              }).then(res2 => {
                console.log(res2)
                this.positionList = res2.data
                console.log(this.positionList)
                this.loading = false;
                this.$router.push(
                    {
                      name: '旅游规划智能生成',
                      params: {
                        content: res.data,
                        position: res2.data,
                      }
                    }
                )
              })
            }
          })
        }
      })
      this.cancel()
    },
    getDistrict() {
      //获取湘西地区
      this.request.get("/xiangxi").then((res) => {
        res.data.forEach((item) => {
          // 查找省份对象是否已存在
          let provinceObj = this.district.districtOptions[0].children.find(
              (option) => option.label === item.category
          );
          if (!provinceObj) {
            // 如果省份对象不存在，则创建省份对象并添加到数组中
            provinceObj = {
              value: item.category,
              label: item.category,
              children: [],
            };
            this.district.districtOptions[0].children.push(provinceObj);
          }

          // 查找城市对象是否已存在
          let cityObj = provinceObj.children.find(
              (option) => option.label === item.areaName
          );
          if (!cityObj) {
            // 如果城市对象不存在，则创建城市对象并添加到省份的children数组中
            cityObj = {
              value: item.areaName,
              label: item.areaName,
              // children: [],
            };
            provinceObj.children.push(cityObj);
          }

          // // 创建区县对象并添加到城市的children数组中
          // cityObj.children.push({
          //   value: item.district,
          //   label: item.district,
          // });
        });
        console.log(this.district.districtOptions)
      });
      //获取位置不全的地区
      /*this.request.get("/account/district").then((res) => {
        res.data.forEach((item) => {
          // 查找省份对象是否已存在
          let provinceObj = this.district.districtOptions.find(
              (option) => option.label === item.province
          );
          if (!provinceObj) {
            // 如果省份对象不存在，则创建省份对象并添加到数组中
            provinceObj = {
              value: item.province,
              label: item.province,
              children: [],
            };
            this.district.districtOptions.push(provinceObj);
          }

          // 查找城市对象是否已存在
          let cityObj = provinceObj.children.find(
              (option) => option.label === item.city
          );
          if (!cityObj) {
            // 如果城市对象不存在，则创建城市对象并添加到省份的children数组中
            cityObj = {
              value: item.city,
              label: item.city,
              children: [],
            };
            provinceObj.children.push(cityObj);
          }

          // 创建区县对象并添加到城市的children数组中
          cityObj.children.push({
            value: item.id + "/" + item.county,
            label: item.county,
          });
        });
      });*/
    },
  },
  mounted() {
    this.getDistrict();
  },
  created() {
  }
}
</script>



