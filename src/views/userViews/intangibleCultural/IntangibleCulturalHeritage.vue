<script>
export default {
  name: "IntangibleCulturalHeritage",
  data() {
    return {
      flag: 0,
      condition: '暂停',
      isPlay: 0
    }
  },
  methods: {
    toggleFlag(num) {
      this.flag = num
    },
    playOrPause() {
      if (this.isPlay === 0) {
        this.condition = '播放'
        this.isPlay = 1
      } else {
        this.condition = '暂停'
        this.isPlay = 0
      }
    }
  },
  mounted() {
    // 获取所有的item元素
    const images = document.getElementsByClassName('ima');
    //存储图片的地址
    const imageUrls = [
      '././image/湘西土家族毛古斯舞.png',
      '././image/土家族民歌.png',
      '././image/35.jpg',
      '././image/42.jpg',
      '././image/51.jpg',
      '././image/61.jpg',
      '././image/72.jpg',
      '././image/87.jpg'
    ];
    //循环遍历每个image
    for (var i = 0; i < images.length; i++) {
      // 获取当前image
      var image = images[i];
      const j = i;
      // image.addEventListener('mouseover', () => {
      //   //下面这个报了一个莫名其妙的错误
      //   //document.body.style.backgroundImage = 'url(' + require(imageUrls[i]) + ')';
      //   if (j === 0) {
      //     document.body.style.backgroundImage = 'url(' + require('././image/湘西土家族毛古斯舞.png') + ')';
      //   } else if (j === 1) {
      //     document.body.style.backgroundImage = 'url(' + require('././image/土家族民歌.png') + ')';
      //   } else if (j === 2) {
      //     document.body.style.backgroundImage = 'url(' + require('././image/35.jpg') + ')';
      //   } else if (j === 3) {
      //     document.body.style.backgroundImage = 'url(' + require('././image/42.jpg') + ')';
      //   } else if (j === 4) {
      //     document.body.style.backgroundImage = 'url(' + require('././image/51.jpg') + ')';
      //   } else if (j === 5) {
      //     document.body.style.backgroundImage = 'url(' + require('././image/61.jpg') + ')';
      //   } else if (j === 6) {
      //     document.body.style.backgroundImage = 'url(' + require('././image/72.jpg') + ')';
      //   } else {
      //     document.body.style.backgroundImage = 'url(' + require('././image/87.jpg') + ')';
      //   }
      //   document.body.style.backgroundSize = 'cover';
      // });
      // image.addEventListener('mouseout', () => {
      //   // document.body.style.backgroundImage = '';
      //   document.querySelector('').style.backgroundImage = 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)';
      // });
    }

  }
}
</script>

<template>
  <div class="out" id="feiyi" style="background-color: #f2f2f2">
    <button @click="playOrPause()" id="myAudio">{{ condition }}</button>
    <!--    <audio v-if="isPlay===0" autoplay loop preload="auto" volume="0.1"-->
    <!--           src="././image/此生不换 - 青鸟飞鱼.mp3"></audio>-->
    <div id="cont" v-show="flag === 0">


      <!-- <img v-for="(url, index) in imageUrls" :src="url" @mouseover="changeBackground(url)" @mouseout="resetBackground()" :key="index"> -->
      <div class="imb" id="aa">
        <img src="./image/湘西土家族毛古斯舞.png" class="ima" id="a" @click="toggleFlag(1)">
        <span id="sa">湘西土家族毛古斯舞</span>
      </div>

      <div class="imb" id="bb">
        <img src="./image/土家族民歌.png" class="ima" id="b" @click="toggleFlag(2)">
        <span id="sb">土家族民歌</span>
      </div>

      <div class="imb" id="cc">
        <img src="./image/35.jpg" class="ima" id="c" @click="toggleFlag(3)">
        <span id="sc">土家族织锦技艺</span>
      </div>

      <div class="imb" id="dd">
        <img src="./image/42.jpg" class="ima" id="d" @click="toggleFlag(4)">
        <span id="sd">彩扎（凤凰纸扎）</span>
      </div>

      <div class="imb" id="ee">
        <img src="./image/51.jpg" class="ima" id="e" @click="toggleFlag(5)">
        <span id="se">挑花（苗族挑花）</span>
      </div>

      <div class="imb" id="ff">
        <img src="./image/61.jpg" class="ima" id="f" @click="toggleFlag(6)">
        <span id="sf">苗医药（钻节风疗法）</span>
      </div>

      <div class="imb" id="gg">
        <img src="./image/72.jpg" class="ima" id="g" @click="toggleFlag(7)">
        <span id="sg">苗画</span>
      </div>

      <div class="imb" id="hh">
        <img src="./image/87.jpg" class="ima" id="h" @click="toggleFlag(8)">
        <span id="sh">湘西苗族鼓舞</span>
      </div>

    </div>

    <div class="troduction" v-show="flag === 1">
      <button @click="toggleFlag(0)">返回</button>
      <div class="t_head">
        <div class="left">
          <video controls>
            <source src="./image/湘西土家族毛古斯舞.mp4" type="video/mp4">
            您的浏览器不支持视频播放
          </video>
        </div>
        <div class="right">
          <h1>湘西土家族毛古斯舞</h1>
          <div>
            <span>类别：</span>
            <span>传统舞蹈</span>
          </div>
          <div>
            <span>级别：</span>
            <span>国家级</span>
          </div>
          <div>
            <span>批次：</span>
            <span>第一批</span>
          </div>
        </div>
      </div>
      <div class="t_body">
        <h1>介绍</h1>
        <br>
        <span>湘西土家族毛古斯舞是一种具有人物、对白、简单的故事情节和一定的表演程式的原始戏剧活动。它以近似戏曲的写意、虚拟、假定等艺术手法和原始、古拙的美学形态，表现土家先民渔、猎、农耕等生产内容，既有舞蹈的雏形，又具有戏剧表演性，两者杂糅交织，形成浑然一体的祭祀性舞剧，因而在学术界博得“中国舞蹈的最远源头”、“原始戏剧的活化石”等誉称。</span>
        <br>
        <img src="./image/11.jpg" alt="">
        <br>
        <br>
        <span>湘西土家族传统舞蹈毛古斯（组照2）--扫进五谷丰登 永顺县文化局 卢瑞生摄</span>
        <br>
        <img src="./image/12.jpg" alt="">
        <br>
        <br>
        <span>湘西土家族传统舞蹈毛古斯（组照）--祭祖 永顺县文化局 卢瑞生摄</span>
        <br>
        <span>其传统节目主要有《布利贴》（采果子）、《实姐》（狩猎）、《宋坐》（捕鱼）、《借日》（做阳春）、《倮嘎尼阿移》（抢新娘）及寓言剧《哭七卡卜》（熊外婆）等。</span>
        <br>
        <img src="./image/13.jpg" alt="">
        <br>
        <br>
        <span>湘西土家族毛古斯舞大型山水实景剧《石林远古人》在洛塔石林隆重上演</span>
        <br>
        <img src="./image/14.png" alt="">
        <br>
        <br>
        <span>结草为服是毛古斯的显著特征。其服，有以稻草为之，有用棕片结成，表演中所使用的道具也是用一根二尺来的小棍外面缠以稻草制成。表演渔、猎、农耕时，它可以是猎具、渔具、农具;而在“祭梅山”、“接新娘”等场次中，它又代表人类自身生产——“种的繁衍”的工具。</span>
        <br>
        <img src="./image/15.png" alt="">
        <img src="./image/16.png" alt="">
        <br>
        <br>
        <span>2006年5月，湘西土家族毛古斯舞被列为首批国家级非物质文化遗产代表性项目名录。</span>
      </div>
    </div>

    <div class="troduction" v-show="flag === 2">
      <button @click="toggleFlag(0)">返回</button>
      <div class="t_head">
        <div class="left">
          <video controls>
            <source src="./image/土家族民歌.mp4" type="video/mp4">
            您的浏览器不支持视频播放
          </video>
        </div>
        <div class="right">
          <h1>土家族民歌</h1>
          <div>
            <span>类别：</span>
            <span>传统音乐</span>
          </div>
          <div>
            <span>级别：</span>
            <span>国家级</span>
          </div>
          <div>
            <span>批次：</span>
            <span>第四批</span>
          </div>
        </div>
      </div>
      <div class="t_body">
        <h1>介绍</h1>
        <br>
        <span>土家族民歌是土家族人民在长期的社会实践中集体创作的民间歌谣。它以群众喜闻乐见的形式，高亢激越的声调，婉转柔和的情韵，抒发内心中的真情实感，具有不朽的艺术魅力。2014年，土家族民歌入选国家级非物质文化遗产名录。</span>
        <br>
        <img src="./image/21.png" alt="">
        <br>
        <br>
        <span>土家族民歌内容十分丰富，主要有仪式歌，如土家族史诗《摆手歌》，巫师神歌《梯玛歌》、哭嫁歌等，也有情歌、山歌、劳动号子、薅草锣鼓歌、儿歌等生活歌，还有红军歌谣等时政歌。</span>
        <br>
        <img src="./image/22.jpg" alt="">
        <br>
        <br>
        <img src="./image/23.jpg" alt="">
        <br>
        <br>
        <img src="./image/24.jpg" alt="">
        <br>
        <br>
        <img src="./image/25.jpg" alt="">
        <br>
        <br>
        <img src="./image/26.png" alt="">
        <br>
        <br>
        <img src="./image/27.png" alt="">
      </div>
    </div>

    <div class="troduction" v-show="flag === 3">
      <button @click="toggleFlag(0)">返回</button>
      <div class="t_head">
        <div class="left">
          <video controls>
            <source src="./image/土家族织锦技艺.mp4" type="video/mp4">
            您的浏览器不支持视频播放
          </video>
        </div>
        <div class="right">
          <h1>土家族织锦技艺</h1>
          <div>
            <span>类别：</span>
            <span>传统技艺</span>
          </div>
          <div>
            <span>级别：</span>
            <span>国家级</span>
          </div>
          <div>
            <span>批次：</span>
            <span>第一批</span>
          </div>
        </div>
      </div>
      <div class="t_body">
        <h1>介绍</h1>
        <br>
        <span>湘西土家族织锦工艺是酉水流域土家族传统的民间手工技艺。它以独特的方式蕴含着本民族的文化心理，显露着不同时代的文化积淀，充分展示了中华民族文化的创造力。湘西土家族织锦工艺是湘西土家地区社会发展历程的缩影，在整个中国工艺文化中占重要地位，多次代表中国的形象进行国际文化交流，对见证中华民族多元文化有积极意义。同时，土家织锦又是土家族显著标志之一，对土家族的认同性和凝聚力有着特殊价值。湘西酉水流域土家地区是土家织锦手工技艺的原生地和最后一块热土，是全国土家族中至今仍保留有民间自发织造风尚的唯一区域。因此，保护和继承这份文化遗产，显得十分必要，十分紧迫。</span>
        <br>
        <span>湘西土家族织锦工艺有着悠久的历史，湘西北酉水流域的考古发现，及大量的历史文献证实：它起始于商周，初雏在秦汉，基本成型于两晋，成熟在唐宋，明清臻于完美。千百年以来，土家织锦一直是酉水流域土家族普及面最广、影响最深、工艺最完善、作品最丰富的民族民间工艺文化形式。</span>
        <br>
        <img src="./image/31.jpg" alt="">
        <br>
        <br>
        <span>湘西土家织锦民间俗称“打花”，主要有土花铺盖(土家语西兰卡普)和花带两大品种。其中西兰卡普最具代表性和典型性。她使用古老的腰式斜织机，采用“通经断纬”的挖花技术，具有汉唐“经锦”的遗风，有“数纱花”“对斜”平纹素色系列和“上下斜”斜纹彩色系列两大流派。其技术之精湛，艺术之完美，原理之科学实属罕见。土家花带是土家织锦中普及面更广的一个小品种，它采用“通经通纬”起“经花”的手法织成，几乎不需要专用工具，完全在织造者的双膝间完成，是织造工艺中最古老的方式之一。</span>
        <br>
        <span>土家织锦以图纹命名，但“名存形异”又是其重要的艺术特色之一。传统的西兰卡普有360余种，其中斜纹彩色织锦200余种，平纹素色织锦150余种，土家花带50余种，图纹题材涉及到动物、植物、生产生活、抽象几何等七大方面。其图纹种类的数量是全国少数民族织锦中罕见的。</span>
        <br>
        <img src="./image/32.jpg" alt="">
        <br>
        <br>
        <span>土家织锦60米长卷；拍摄者：彭岸</span>
        <br>
        <span>然而如今的西兰卡普仅剩有80余种，其中还有一半平时很难见到。至于土家花带更是自生自灭，土家织锦已濒临消亡。土家织锦技艺的传承以家庭(族)式的口传心授和“摹仿记忆”为主。由于社会的变革和种种原因，传统工艺人才严重的流失，许多精湛的技艺逐渐失传，老艺人谢世，中年人“洗手”，青年人打工。土家织锦的手工技艺在历史上继合作社，文革时期之后，出现了第二次断代。</span>
        <br>
        <span>土家织锦民间称为打花，主要有土花铺盖(土家语“西兰卡普”)和土家花带两大品种。</span>
        <br>
        <span>一、西兰卡普在土家织锦中最具代表性和典型性。西兰卡普采用“通经暗纬，断纬挖花”的工艺，又分为“数纱花”“对斜”平纹素色系列和“上下斜”斜纹彩色系列两大流派。“数纱花”“对斜”平纹素色织锦是在普通平纹布面上，以喂(纬)线挖花而成。色彩不多，图纹受土家民间“十字挑花”
                    的数经纬工艺影响，成品明暗对比强烈，起花部分凸出成浅浮雕感。原生地主要在永顺县境内。“上下斜”斜纹彩色织锦是西兰卡普中的主导品种。它是在“对斜”平纹素色织锦上发展起来的，质地较厚，非常结实。它的图纹构成和色彩构成都更趋成熟，单个纹样复杂，且完整丰满。为适合纹样或带状纹样展开，也有以棋格状或散点状四方连续。其色彩十分浓艳富丽，以黑及重色为主，大胆使用补色，层层渐变推移，使之具有强烈的节奏变化和响亮的对比效果。但又恰到好处地运用色彩秩序化的退晕手法使对比色得到和谐的统一。“上下斜”彩色斜纹组织结构工艺相对复杂，原生地主要在龙山、保靖、古丈三县境内。</span>
        <br>
        <img src="./image/33.jpg" alt="">
        <br>
        <br>
        <span>土家织锦披肩《双面单八勾》 拍摄者：颜碧君</span>
        <br>
        <span>西兰卡普的工艺比较复杂，全部是手工技艺，其主要工艺流程有：</span>
        <br>
        <span>1、纺捻线：利用纺车纺轮将脱籽棉花纺成棉纱，再将棉纱两或三根并捻成棉线。棉线用于站(经)线和加固用的棱罗线(暗纬)。而不捻的棉纱染色后，做喂(纬)线。</span>
        <br>
        <span>2、染色：棉纱棉线经碱水(或石灰水)煮沸脱脂，清洗凉干后染色。土红、茜草根染红色，苋菜染玫瑰红，狗屎苞染紫色，黄栀子或椿树皮染黄色，马桑树叶或板栗球壳染黑色等。以上均为冷或热煮染，先取熬汁水，染色时添加碱性的石灰水或草木灰水固色，其浓度以手试感觉到打滑即可(约PH值9—10)，染色后的纱线需露天放置2—3天。</span>
        <br>
        <span>靛蓝染深浅蓝色，工艺复杂。先用大青叶制作靛蓝，再用靛蓝进行发缸制染液，添加石灰水和酒糟，当染液出现绿色时最佳。冷染时以浸染的次数多少来决定蓝色的深浅，然后将染件悬挂在通风处，让空气氧化显色，再加醋固色。蚕丝的染法与棉大同小异，但需加明矾固色。</span>
        <br>
        <span>3、倒线：利用纺车将棉纱(线)倒在竹筒上，便于牵线。</span>
        <br>
        <span>4、牵线：用三根以上的光滑竹、木杆插入地下，将倒在竹筒上的站(经)线固定排列，竹筒不少于16个，然后往复牵线。该工序要求起端站(经)线排列次序不变，并用“花岔岔”(8字套)分组。如果按32根/手为单位计算站(经)线，一尺二幅宽的织锦(40公分)，需牵站(经)线数为：40公分×3道/公分×4根/道=480根(480根÷32根/手=15手)。</span>
        <br>
        <img src="./image/34.jpg" alt="">
        <br>
        <br>
        <span>用植物染色而成的丝线； 拍摄者：彭岸</span>
        <br>
        <span>5、装筘：依牵线时的站(经)线顺序及分组，依次将站(经)线用挑子穿入筘眼。</span>
        <br>
        <span>6、滚线：将牵好已装筘的站(经)线进行梳理，卷上滚棒。该工序要求梳线及卷棒时张力均匀，以保证今后操作正常及产品质量。</span>
        <br>
        <span>7、捡综：将综杆一端分开，用长约8公分的竹条撑开综杆。将一棉线用近8字形的套结，循环缠住综杆和站(经)线。该工序要求按穿筘时站(经)线顺序进行，一根也不允许错。</span>
        <br>
        <span>8、翻篙：将综杆和花岔岔互换位置。</span>
        <br>
        <span>9、捡花：将站(经)线分为三层，把将来准备起花的那一层清理出来。</span>
        <br>
        <span>10、捆杆上机：站(经)线用分站(经)杆分组，用绳索捆扎联动机构，调整综杆与杠杆“鱼儿”及踏杆的位置。站(经)线头端打结上滚棒，调试撑子力度。</span>
        <br>
        <span>11、织布边：试织一段对斜(平纹)布头，以固定控制织锦面。</span>
        <br>
        <span>12、挑织：挑织时先将束腰的绊带(一般多用宽布带或牛皮绊带)套腰后，拉紧站(经)线，心计默数或参照现成的纹饰，选色喂(纬)线用挑子挑起成束的站(经)线，数纱夹色喂(纬)线，梭罗(布刀)打喂(纬)，带投梭穿梭罗线(即暗纬)。织造时身体微微后靠，脚踏分站(经)杆，一手提综，另一手投梭插梭罗，每一喂(纬)向的粗色喂(纬)挑挖完成后即错综过喂(纬)打喂(纬)，如此循环。</span>
        <br>
        <span>在织造过程中，织物为三层站(经)的错综过喂(纬)，即上下各半分站(经)后，再将面站(经)分成对半。挑织夹色喂(纬)全是从织物背面完成的，俗称反织法。呈“挑三压一”的顺序织入，织造时背面线绒头似乎是杂乱无章，正面复纱跨度小而均等，纹饰井然。</span>
        <br>
        <span>在织造过程中必须因势利导，有极强的程序性和相当的偶然性。挑起成束的站(经)线，数纱夹色喂(纬)通常全凭经验和感觉，因此，同一图案，不同的织锦也会有不同的细微变化，不会完全相同。完全手工操作的织锦与大工业生产的产品的根本区别就在于此：土家织锦手工制作凝聚了工匠们的心智和经验，同时还有制作中的特殊情感。</span>
        <br>
        <span>土家织锦是一种限制性很强的手工技艺，工艺和技巧决定着织锦水平的高低。一定对象的制约，使土家妇女能充分掌握利用材料、工具和工艺制作过程的规律和特征，并发挥技巧的技术性能，展示出织锦艺术特有的技艺美感。</span>
        <br>
        <img src="./image/35.jpg" alt="">
        <br>
        <br>
        <span>2009年11月，黎秋梅赴美国宾夕法妮亚州费城纺织工坊博物馆展示精湛的土家族织锦技艺</span>
        <br>
        <span>二、土家花带是土家织锦中的一个小品种。主要用于背带、腰带、裙带等等。宽约二寸，窄约二指，有素色和彩色两种，但多以素色为主，采用“通经通纬”起“经(站)花”手段，是中国最古老的织造方式之一。它不受场地、时间的限制，一切均在织造人的双膝间完成，因此往往成为西兰卡普的基础和前奏，也是土家妇女中普及面最广的民间传统工艺之一。原生地以永顺为主。</span>
        <br>
        <span>土家花带的织造大多用线，工艺流程中的纺捻线、染色与西兰卡普相同，倒线仅数量上的不同。织造分六步：</span>
        <br>
        <span>1、牵站线：将倒好的站(经)线成圈形套挂在织造人的双膝上，用篙筒分组，装上提综线。</span>
        <span>2、织边：试织一段无花的边，以固定控制织锦面。</span>
        <span>3、提综：将下层站(经)线提至上层。</span>
        <span>4、捡花：由于无筘，站(经)线密度太大，所以捡花多用手捡数线，也有用挑子挑线。</span>
        <span>5、送喂(纬)线：喂(纬)线在挑子上缠绕一圈后，顺势由挑子带过，连续不断。显花处喂(纬)线在下，由站(经)线显露起花，这与西兰卡普由喂(纬)线起花相反。</span>
        <span>6、挑织：用挑子拍打织锦面，打紧喂(纬)线，如此循环反复。</span>
        <br>
        <span>三、土家织锦的传统图纹约有409种。其中“上下斜”斜纹彩色织锦图纹200余种，“对斜”平纹素色织锦图纹150余种，土家花带图纹50余种。图纹涉及到动物、植物、生活生产用品、天象地属、文字、几何勾纹及其它综合类等各个方面，被称之“高度浓缩了的土家族文化。”</span>
        <br>
        <span>四十八勾是土家织锦中最具代表性的古老图纹之一，中心部位近似菱形及八个勾组成，以此对称地向外缘逐渐推移递进，勾勾相连，层层色变，从而形成一种强大的向外张力，十分壮观。四十八勾有驱秽避邪，消灾纳吉，祈子求昌，兴旺种族的含义，是“生殖信仰”和祖先崇拜的另一种表述方式。有时甚至具有某种类似本民族“图腾”的功能而被视为神物，渗透着超自然的神灵幻想，成为万物有灵的物化形态。所以民间有“四十八勾名堂大”之说。</span>
        <br>
        <span>台台花则是最具有民俗性的典型图纹。地方语“条”即“台”，这种呈长条状的图纹，由“补毕”(小船)、“泽哦哩”(水波浪)和“面纹形”组合而成。整体以桃红、浅绿、淡黄等娇嫩的色彩为主，小块而艳丽的锦条包围着大面积的黑色，素雅中显出几分生机。它只能用于小孩“窝窝背笼”(摇篮)的“盖裙”及包裹婴儿的襁褓，含有保护小孩生灵的功利目的，是祖先的崇拜，族源的隐喻，并且具有强烈的地域文化特点，只分布于湘西州的龙山、永顺、保靖和古丈的土家山寨。</span>
        <br>
        <span>在土家织锦的各类纹样中，最有魅力的要数被称之为“美不过的岩墙花”，其色调变化丰富，冷暖转化自然，造型取其意而得其神。多种组织结构在同一织物中互相穿插排列，工艺复杂而合理。</span>
        <br>
        <span>“扎土盖”(万字格)是土家织锦中最常用的纹样之一。“万字流水”以卐纹为主体，表示源远流长，永不衰竭。将万字纹分解成为各种勾纹，大量作为陪衬和填充物使用，成为土家织锦突出的装饰特点。</span>
        <br>
        <span>近年来，吉首大学、云南大学、武汉科技学院等各院校纷纷来湘西北创办科研教学基地，并吸引了国内外众多著名的专家学者前来考查研究。</span>
      </div>
    </div>

    <div class="troduction" v-show="flag === 4">
      <button @click="toggleFlag(0)">返回</button>
      <div class="t_head">
        <div class="left">
          <video controls>
            <source src="./image/彩扎（凤凰纸扎）.mp4" type="video/mp4">
            您的浏览器不支持视频播放
          </video>
        </div>
        <div class="right">
          <h1>彩扎（凤凰纸扎）</h1>
          <div>
            <span>类别：</span>
            <span>传统美术</span>
          </div>
          <div>
            <span>级别：</span>
            <span>国家级</span>
          </div>
          <div>
            <span>批次：</span>
            <span>第二批</span>
          </div>
        </div>
      </div>
      <div class="t_body">
        <h1>介绍</h1>
        <br>
        <span>“纸扎艺术”是我国各地民族民间古老的传统手工技艺。凤凰县的“纸扎技艺”尤为精湛,历史悠久,流传很广。自唐垂拱二年〔公元686年〕凤凰地域初始建县〔渭阳县〕就有纸扎艺人问世,沿袭至今已有一千三百多年历史。</span>
        <br>
        <img src="./image/41.jpg" alt="">
        <br>
        <br>
        <img src="./image/42.jpg" alt="">
        <br>
        <br>
        <img src="./image/43.jpg" alt="">
        <br>
        <br>
        <span>纸扎作品《狮子头》 作者：聂方俊 </span>
        <br>
        <span>《凤凰厅志·乾隆志》记载：“元宵前数日,城乡敛钱,扮各样花灯,为龙马禽兽魚虾各状……至十五日夜,笙歌鼎沸,灯烛辉煌……”，又据《凤凰县志》记述：“本县的纸马人物,有很高的艺术水平。一百多年以前,这一民间工艺就已经繁荣起来,清末至民国初期,县城有十多家纸扎铺子,散在大街、虹桥、东正街、十字街等处。纸扎工艺的主要原材料是竹块、篾条、木棍,扎成各种人物、动物、花草、虫魚、用具等形象,糊以皮纸,施加彩绘,形象逼真,维妙维肖。各个季节有应时的纸扎工艺品……春节时,城乡人民照例玩灯欢庆,纸扎的狮头、龙头、蚌壳、彩船、虾、蟹、魚、鳖、云朵、盆花、灯笼等,千姿百态,五彩纷呈。</span>
      </div>
    </div>

    <div class="troduction" v-show="flag === 5">
      <button @click="toggleFlag(0)">返回</button>
      <div class="t_head">
        <div class="left">
          <video controls>
            <source src="./image/挑花（苗族挑花）.mp4" type="video/mp4">
            您的浏览器不支持视频播放
          </video>
        </div>
        <div class="right">
          <h1>挑花（苗族挑花）</h1>
          <div>
            <span>类别：</span>
            <span>传统美术</span>
          </div>
          <div>
            <span>级别：</span>
            <span>国家级</span>
          </div>
          <div>
            <span>批次：</span>
            <span>第三批</span>
          </div>
        </div>
      </div>
      <div class="t_body">
        <h1>介绍</h1>
        <br>
        <span>苗族挑花（俗称数纱）。主要流行于湘西土家族苗族自治州泸溪县，流传到古丈、吉首及沅陵等县市相邻地区。它是在家织布上走针引线，针线全都在布料表面行走，花样挑花后，最后一针落在起针的地方。</span>
        <br>
        <img src="./image/51.jpg" alt="">
        <br>
        <br>
        <span>苗族挑花历史相当悠久，源于何时尚无记载。但从其图腾崇拜、氏族崇拜、自然崇拜的如狗脑花、枫叶花、阳球花等纹样中，可以看出挑花的历史久远。</span>
        <br>
        <span>苗族挑花工艺流程和材料并不复杂，只有家织布和针线。但其技艺与绣花截然不同。挑花是从第一针，只到一副图案挑成，针线全部在布料表面行走。数纱行针，经三纬四，不能数错一根纱。因此，挑花是极其细致而严格的手工工艺。挑花图案常用的有60多种。</span>
        <br>
        <img src="./image/52.jpg" alt="">
        <br>
        <br>
        <span>挑花有较高的艺术价值，受到国内外民艺学家的重视。其具体与抽象兼有的艺术形式、朴实而单纯的对比色彩，古老而神秘的几何图形，成为研究、探讨的对象。挑花作品投入市场，有效可观的前景。</span>
        <br>
        <span>2010年6月，苗族挑花被列入国家级非物质文化遗产保护项目名录。</span>
        <br>
        <img src="./image/53.jpg" alt="">
        <br>
        <br>
        <span>蟾蜍花</span>
      </div>
    </div>

    <div class="troduction" v-show="flag === 6">
      <button @click="toggleFlag(0)">返回</button>
      <div class="t_head">
        <div class="left">
          <video controls>
            <source src="./image/苗医药（钻节风疗法）.mp4" type="video/mp4">
            您的浏览器不支持视频播放
          </video>
        </div>
        <div class="right">
          <h1>苗医药（钻节风疗法）</h1>
          <div>
            <span>类别：</span>
            <span>传统医药</span>
          </div>
          <div>
            <span>级别：</span>
            <span>国家级</span>
          </div>
          <div>
            <span>批次：</span>
            <span>第三批</span>
          </div>
        </div>
      </div>
      <div class="t_body">
        <h1>介绍</h1>
        <br>
        <span>湘西苗医药是苗族人民世代相传的一种民间医药，是我国苗族地区传统医药百花园中的一朵奇葩。</span>
        <br>
        <img src="./image/61.jpg" alt="">
        <br>
        <br>
        <span>苗药房</span>
        <br>
        <span>湘西苗医药广为流传于湘西土家族苗族自治州的花垣县、吉首市、凤凰县、保靖县、古丈县、泸溪县以及周边的贵州、重庆、湖北等地。</span>
        <br>
        <span>湘西土家族苗族自治州位于湖南省西北部，地处云贵高原的尾峰，武陵山脉中段，这里山峦叠嶂、森林密布，为各种药材的生长提供了良好的环境条件，是一块得天独厚的药材基地，自然生长的药材种类繁多，储量丰富，为苗医苗药提供了广阔的发展前景。</span>
        <br>
        <img src="./image/62.jpg" alt="">
        <br>
        <br>
        <span>苗医师在碾药</span>
        <br>
        <img src="./image/63.jpg" alt="">
        <br>
        <br>
        <span>苗医师在为幼儿诊断</span>
        <br>
        <span>湘西苗医药历史悠久，相传在远古时代母系氏族社会，就有各奶嘎，汉语叫母药王。各奶嘎一生研创苗医药，四处奔波，为民治病，治愈了十万八千个“黛熊”、“黛夷”（苗族子孙）的疾病，所以被人们称为“母药王”。</span>
        <br>
        <img src="./image/64.jpg" alt="">
        <br>
        <br>
        <span>惹加坝（汉译 铁马鞭）</span>
        <br>
        <img src="./image/65.jpg" alt="">
        <br>
        <br>
        <span>惹先姑（汉译：马齿苋）</span>
        <br>
        <span>湘西苗医药发展到了近现代，出现了许多苗医药大师，著名的有龙万家、廖喜堂、廖天灯、石凤金、石板塘、杨光福、龙玉六等，他们一边行医为民治病，一边收授徒弟，使苗族医药得到了继承和发扬。</span>
        <br>
        <img src="./image/66.jpg" alt="">
        <br>
        <br>
        <span>苗医常用草药 山乌龟</span>
        <br>
        <span>湘西苗医药是祖国医学宝库中的珍贵遗产，它具有悠久的历史和丰富的内容，具有独特的风格和民族特色，对研究苗族历史、宗教、民俗，发展苗族医药具有重要的价值。</span>
        <br>
        <span>湘西苗医药活跃在湘、黔、渝、鄂四省边区，深受各民族喜爱。对加强边区民族团结，构建和谐社会具有重要的社会意义。</span>
        <br>
        <img src="./image/67.jpg" alt="">
        <br>
        <br>
        <span>窝罗务（汉译玉竹）</span>
      </div>
    </div>

    <div class="troduction" v-show="flag === 7">
      <button @click="toggleFlag(0)">返回</button>
      <div class="t_head">
        <div class="left">
          <video controls>
            <source src="./image/苗画.mp4" type="video/mp4">
            您的浏览器不支持视频播放
          </video>
        </div>
        <div class="right">
          <h1>苗画</h1>
          <div>
            <span>类别：</span>
            <span>传统美术</span>
          </div>
          <div>
            <span>级别：</span>
            <span>国家级</span>
          </div>
          <div>
            <span>批次：</span>
            <span>第三批</span>
          </div>
        </div>
      </div>
      <div class="t_body">
        <h1>介绍</h1>
        <br>
        <span>苗画，起初只是作为苗族刺绣的花样稿，包括服饰、被面，床帘、门帘、堂帘、床檐、壁挂、佩饰等各个方面，其渊源与苗族绣花一样可追溯到苗族古老的纹身习俗。</span>
        <br>
        <img src="./image/71.jpg" alt="">
        <br>
        <br>
        <span>龙凤呈祥</span>
        <br>
        <span>湘西苗画所表现的主题就是反映一种喜庆吉祥、人寿年丰的物象。梁氏家族创作的苗画以龙、凤、花、草、鱼、虾、虫、鸟、竹、木等作为主要的表现内容，再配以氏族图腾崇拜图案，把反映古老先民的部族迁徒与自然界的山川、河流、云彩、日月、人物、建筑以及传说中的仙人善神等很好的结合起来，采用写实与抽象，夸张与变形，自由与严谨相结合的表现手法，再融入自己内心世界和思想感情，使苗画既有古朴原始，又有热情奔放和浪漫的风格，达到了真善美的和谐统一，体现了古典艺术与现代艺术审美追求的结合，凸现出一种非常独特的审美价值，形成了独特的生存环境下的苗族独特的文化符号。</span>
        <br>
        <img src="./image/72.jpg" alt="">
        <br>
        <br>
        <img src="./image/73.jpg" alt="">
        <br>
        <br>
        <span>长2米宽50公分的鲤鱼跳龙门</span>
      </div>
    </div>

    <div class="troduction" v-show="flag === 8">
      <button @click="toggleFlag(0)">返回</button>
      <div class="t_head">
        <div class="left">
          <video controls>
            <source src="./image/湘西苗族鼓舞.mp4" type="video/mp4">
            您的浏览器不支持视频播放
          </video>
        </div>
        <div class="right">
          <h1>湘西苗族鼓舞</h1>
          <div>
            <span>类别：</span>
            <span>传统舞蹈</span>
          </div>
          <div>
            <span>级别：</span>
            <span>国家级</span>
          </div>
          <div>
            <span>批次：</span>
            <span>第一批</span>
          </div>
        </div>
      </div>
      <div class="t_body">
        <h1>介绍</h1>
        <br>
        <img src="./image/81.jpg" alt="">
        <br>
        <br>
        <span>湘西苗族鼓舞，是我国苗族地区最独特的舞蹈艺术。它流传在湖南省湘西土家族苗族自治州境内的吉首市、凤凰县、泸溪县、保靖县、花垣县、古丈县等。</span>
        <br>
        <img src="./image/82.jpg" alt="">
        <br>
        <br>
        <img src="./image/83.jpg" alt="">
        <br>
        <br>
        <span>湘西苗族鼓舞历史悠久，据历史文献记载源于汉代以前，产生在苗族祭礼活动中。随着时代的变迁，苗族鼓舞己成为苗族人民最喜爱的舞蹈艺术形式。湘西苗族鼓舞的种类多达几十种，常见的有：花鼓舞、猴儿鼓舞、女子单人鼓舞、男子单人鼓舞、团圆鼓舞。这些舞蹈动作的特点是：打鼓起舞，节奏明快，动作舒展大方，双手交替击鼓，两脚轮换跳跃，全身不停扭摆。“猴儿鼓舞”灵巧多变，风趣诙谐，挑逗戏耍，时儿打鼓、时儿离鼓、表演协调。“花鼓舞”温婉妖媚，轻盈柔软，身态柔美，极富表现。“男女鼓舞”多为屈膝矮桩，全身舞动，动作精犷，豪放刚健，“女子鼓舞”双脚轮梭，步伐灵活，头稍摇动，腰随扭摆，含蓄抒情。“团圆鼓舞”场面宏大，时儿边歌边舞，柔慢抒情，时儿激情狂舞，轻松活泼。</span>
        <br>
        <img src="./image/84.jpg" alt="">
        <br>
        <br>
        <img src="./image/85.jpg" alt="">
        <br>
        <br>
        <img src="./image/86.jpg" alt="">
        <br>
        <br>
        <img src="./image/87.jpg" alt="">
        <br>
        <br>
      </div>
    </div>

  </div>
</template>

<style scoped>
button {
  background-color: aquamarine;
  height: 40px;
  width: 50px;
  border-radius: 7px;
  border: 0cm;
  cursor: pointer;
  transition: all 0.5s;
}

#myAudio {
  border-radius: 50%;
  height: 40px;
  width: 60px;
}

button:hover {
  background-color: rgb(253, 108, 5);
}

.out {
  display: flex;
  justify-content: center;
}

.troduction {
  width: 85%;
  padding: 30px;
  opacity: 0.8;
  background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
}

.troduction h1 {
  font-size: 28px;
  font-style: italic;
}

.t_head {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.t_head .left {
  /* width: 50%; */
}

.t_head .right {
  /* width: 50%; */
  font-size: 18px;
}

.t_head .right div {
  margin: 30px 0;
}

.t_body {
  text-align: center;
}

.t_body span {
  display: block;
  font-size: 14px;
}

/* html,body{
	height: 100%;
} */

/* body {
    background-color: #E7E7E7;
    display: table;
} */

#cont {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  /* overflow: hidden; */
  /* height: 800px; */
}

#cont span {
  opacity: 1;
  color: #a32323;
  font-size: 30px;
  text-shadow: 0 0 10px #fff,
  0 0 20px #fff,
  0 0 30px #fff,
  0 0 50px #fff,
  0 0 80px #fff;
}

.ima {
  width: 310px;
  padding: 10px;
  margin-bottom: 30px;
  background-color: #FFFFFF;
  transition: transform 0.8s;
  -webkit-transform: transform 0.8s;
  cursor: pointer;
}

.imb {
  text-align: center;
  width: 320px;
  margin: 30px;
  /* background-color: #FFFFFF; */
  transition: transform 0.8s;
  -webkit-transform: transform 0.8s;
  cursor: pointer;
}

.ima:hover {
  transform: scale(1.4) rotate(0deg) !important;
}

.imb:hover {
  transform: scale(1.1) rotate(0deg) !important;
}

#a {
  transform: rotate(12deg);
}

#aa:hover #sa {
  opacity: 0;
}

#aa {
  transform: rotate(12deg);
}

#b {
  transform: rotate(-5deg);
}

#bb {
  transform: rotate(-5deg);
}

#bb:hover #sb {
  opacity: 0;
}

#c {
  transform: rotate(10deg);
}

#cc {
  transform: rotate(10deg);
}

#cc:hover #sc {
  opacity: 0;
}

#d {
  transform: rotate(8deg);
}

#dd {
  transform: rotate(8deg);
}

#dd:hover #sd {
  opacity: 0;
}

#e {
  transform: rotate(-10deg);
}

#ee {
  transform: rotate(-10deg);
}

#ee:hover #se {
  opacity: 0;
}

#f {
  transform: rotate(-5deg);
}

#ff {
  transform: rotate(-5deg);
}

#ff:hover #sf {
  opacity: 0;
}

#g {
  transform: rotate(10deg);
}

#gg {
  transform: rotate(10deg);
}

#gg:hover #sg {
  opacity: 0;
}

#h {
  transform: rotate(8deg);
}

#hh {
  transform: rotate(8deg);
}

#hh:hover #sh {
  opacity: 0;
}
</style>
