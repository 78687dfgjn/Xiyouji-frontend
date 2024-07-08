<style scoped>
.custom-card {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.custom-card p {
  font-size: 16px;
  line-height: 1.6;
}

.custom-card b {
  color: #007bff;
}


</style>
<template>
  <div>
    <el-button @click="test1">测试</el-button>
    <h1>百度地图</h1>
    <input type="text" v-model.lazy="keyword"/>
    <el-card class="custom-card">
      <p>
        根据您的需求，我为您定制了一份非遗文化旅游计划：<br/>
        <b>第一天：</b> 张家界市永定区<br/>
        <b>第二天：</b> 张家界市武陵源区<br/>
        <b>上午：</b> 前往武陵源区的非遗文化保护基地，参与手工艺品制作体验活动。<br/>
        <b>中午：</b> 享用当地特色午餐，品尝湖南地道美食。<br/>
        <b>下午：</b> 游览武陵源区的非遗文化景点，如传统村落、古建筑等，感受湖南传统文化的魅力。<br/>
        <b>第三天：</b> 张家界市慈利县、桑植县<br/>
        <b>上午：</b> 前往慈利县参观非遗文化传承机构，了解当地传统技艺的保护和传承工作。<br/>
        <b>中午：</b> 品尝慈利县特色美食，体验湖南地道饮食文化。<br/>
        <b>下午：</b> 游览桑植县的非遗文化景点，如传统手工艺品展示馆、文化遗产保护区等，感受湖南非物质文化遗产的魅力。<br/>
        根据您的预算和旅游天数，以上行程可以满足您对非遗文化的探索需求。希望您在湖南省张家界市的旅行中能够收获丰富的文化体验。祝您旅途愉快！<br/><b>&nbsp;&nbsp;&nbsp;&nbsp;上午：</b>
        参观永定区的非遗文化展览馆，了解当地传统手工艺品的制作过程和历史背景。<br/>
        <b>中午：</b> 品尝当地特色美食，体验湖南传统饮食文化。<br/>
        <b>下午：</b> 游览永定区的古村落，感受湖南乡村的文化氛围。<br/>

      </p>
    </el-card>
    <div id="map" ref="map" style="display: none"></div>
  </div>
</template>
<style scoped lang="scss">
#map {
  height: 90vh;
  width: 100%;
}
</style>
<script>
export default {
  name: 'Test',
  data() {
    return {
      map: null,
      point: null,
      marker: null,
      keyword: "",
      local: null,
    };
  },
  methods: {
    test1() {
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
    }
  },
  mounted() {
    this.map = new window.BMapGL.Map(this.$refs.map);
    this.point = new window.BMapGL.Point(113.665, 34.784);
    this.map.centerAndZoom(this.point, 15);
    this.map.enableScrollWheelZoom(true);
    //添加一个点
    this.marker = new window.BMapGL.Marker(this.point); // 创建标注
    this.map.addOverlay(this.marker); // 将标注添加到地图中
    this.local = new window.BMapGL.LocalSearch(this.map, {
      renderOptions: {map: this.map},
    });
  },
  watch: {
    keyword: {
      handler() {
        if (this.keyword === "") {
          this.local.clearResults();
          this.map.centerAndZoom(this.point, 15);
        } else {
          this.local.search(this.keyword);
        }
      },
    },
  },
};
</script>

