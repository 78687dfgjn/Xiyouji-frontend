<script>
export default {
  name: "TourismIntroduction",
  data() {
    return {}
  },
  mounted() {
    // 获取所有的item元素
    var items = document.getElementsByClassName('item');
    // 循环遍历每个item
    for (var i = 0; i < items.length; i++) {
      // 获取当前item
      var item = items[i];
      var frame = item.getElementsByClassName('frame')[0];
      var frontBox = frame.getElementsByClassName('front')[0];
      var leftBox = frame.getElementsByClassName('left')[0];
      var rightBox = frame.getElementsByClassName('right')[0];
      // 设置背景图片
      frontBox.style.backgroundImage = 'url(' + require('./img1/' + (i + 1).toString().padStart(2, '0') + '.jpg') + ')';
      //frontBox.style.backgroundImage = 'url(img/' + (i + 1).toString().padStart(2, '0') + '.jpg)';
      leftBox.style.backgroundImage = 'url(' + require('./img1/' + (i + 1).toString().padStart(2, '0') + '.jpg') + ')';
      //leftBox.style.backgroundImage = 'url(img/' + (i + 1).toString().padStart(2, '0') + '.jpg)';
      rightBox.style.backgroundImage = 'url(' + require('./img1/' + (i + 1).toString().padStart(2, '0') + '.jpg') + ')';
      //rightBox.style.backgroundImage = 'url(img/' + (i + 1).toString().padStart(2, '0') + '.jpg)';
    }
    (function () {
      "use strict";
      var shell = document.getElementsByClassName('shell')[0];
      var slider = shell.getElementsByClassName('shell_slider')[0];
      var items = shell.getElementsByClassName('item');
      var prevBtn = shell.getElementsByClassName('prev')[0];
      var nextBtn = shell.getElementsByClassName('next')[0];
      // 定义变量
      var width, height, totalWidth, margin = 20,
          currIndex = 0,
          interval, intervalTime = 3000;

      function init() {
        // 初始化函数
        resize();
        move(Math.floor(items.length / 2));
        bindEvents();
        timer();
      }

      function resize() {
        // 窗口大小变化时调整大小
        width = Math.max(window.innerWidth * .48, 275);
        height = window.innerHeight * .7;
        totalWidth = width * items.length;
        // 设置slider宽度
        slider.style.width = totalWidth + "px";
        // 设置每个item的宽度和高度
        for (var i = 0; i < items.length; i++) {
          let item = items[i];
          item.style.width = (width - (margin * 2)) + "px";
          item.style.height = height + "px";
        }
      }

      function bindEvents() {
        // 窗口大小变化时调整大小
        window.onresize = resize;
        // 点击prev按钮切换item
        prevBtn.addEventListener('click', () => {
          prev();
        });
        nextBtn.addEventListener('click', () => {
          next();
        });
      }

      init();

      function move(index) {
        // 移动shell到指定的item
        if (index < 1) index = items.length;
        if (index > items.length) index = 1;
        currIndex = index;
        // 遍历所有item
        for (var i = 0; i < items.length; i++) {
          let item = items[i],
              box = item.getElementsByClassName('frame')[0];
          if (i == (index - 1)) {
            // 当前item添加active类并设置3D效果
            item.classList.add('item--active');
            item.querySelector('.bottom_span').classList.add('appear');
            box.style.transform = "perspective(1200px)";
          } else {
            // 其他item移除active类并设置3D效果
            item.classList.remove('item--active');
            item.querySelector('.bottom_span').classList.remove('appear');
            box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
          }
        }
        // 移动slider
        slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
        // 设置body背景图片
        var frontBox = items[index - 1].getElementsByClassName('front')[0];
        document.body.style.backgroundImage = frontBox.style.backgroundImage;
      }

      function timer() {
        // 定时器，自动切换shell
        clearInterval(interval);
        interval = setInterval(() => {
          move(++currIndex);
        }, intervalTime);
      }

      // 切换item
      function prev() {
        move(--currIndex);
        timer();
      }

      function next() {
        move(++currIndex);
        timer();
      }
    })();

  }
}
</script>

<template>

  <div>
    <audio autoplay="autoplay" loop="loop" src="intangibleCultural/newStatic/music/藤柒吖%20-%20一直很安静.mp3"></audio>

    <div class="shell">
      <div class="shell_body">
        <div class="button">
          <div class="prev">左</div>
          <div class="next">右</div>
        </div>

        <div class="shell_slider">
          <div class="item">
            <div class="frame">
              <div class="box front">
                <h1>凤凰古城</h1>
                <span>地址：位于湘西土家族苗族自治州凤凰县凤凰古城</span>
              </div>
              <div class="box left"></div>
              <div class="box right"></div>
            </div>
            <div class="bottom_span">
              <span>依山傍水的凤凰古城，是最美丽的小城，也是苗族、土家族等少数民族聚居的地方，整齐划一的吊脚楼，蜿蜒清澈的沱江缓缓流过，宏伟古朴的石桥横跨在沱江之上，漫步在沱江边上，欣赏璀璨迷人的夜景，乘船在江上游玩，感受水乡带来的安逸和美好。</span>
            </div>
          </div>
          <div class="item">
            <div class="frame">
              <div class="box front">
                <h1>芙蓉古镇</h1>
                <span>地址：位于湘西土家族苗族自治州永顺县芙蓉路南150米</span>
              </div>
              <div class="box left"></div>
              <div class="box right"></div>
            </div>
            <div class="bottom_span">
              <span>挂在瀑布上的千年古镇，三面环水，飞流直下的瀑布穿镇而过，景色非常壮观！近距离欣赏声势浩大的瀑布美景，夜幕降临，暖黄色的灯光映衬着山崖之上错落有致的吊脚楼，流光溢彩的夜景，十分迷人，现实版的千与千寻。</span>
            </div>
          </div>
          <div class="item">
            <div class="frame">
              <div class="box front">
                <h1>德夯大峡谷</h1>
                <span>地址：位于湘西土家族苗族自治州吉首市德夯大峡谷</span>
              </div>
              <div class="box left"></div>
              <div class="box right"></div>
            </div>
            <div class="bottom_span">
              <span>壮观的德夯大峡谷，溪流纵横，绝壁高耸，在山势跌宕的峡谷之中，藏着风情浓郁的村庄，依山而建的苗寨，千山飞瀑环抱，造型奇特，沿着幽长的峡谷游玩，俯瞰德夯苗寨，自然风光秀丽迷人。</span>
            </div>
          </div>
          <div class="item">
            <div class="frame">
              <div class="box front">
                <h1>矮寨大桥</h1>
                <span>地址：位于湘西土家族苗族自治州吉首市矮寨镇65国道</span>
              </div>
              <div class="box left"></div>
              <div class="box right"></div>
            </div>
            <div class="bottom_span">
              <span>横跨在德夯大峡谷之上的矮寨大桥，是我国基建狂魔的杰作，宏伟壮观，仿佛在云端之上漫步，站在观景平台上，近距离观赏大桥雄姿，无不令人骄傲，还可以俯瞰德夯苗寨的全貌，轻松拍出绝美风景大片。</span>
            </div>
          </div>
          <div class="item">
            <div class="frame">
              <div class="box front">
                <h1>乾州古城</h1>
                <span>地址：位于湘西土家族苗族自治州吉首市人民南路</span>
              </div>
              <div class="box left"></div>
              <div class="box right"></div>
            </div>
            <div class="bottom_span">
              <span>乾州的城，凤凰的兵。乾州古城，为湘西州府所在，拥有四千二百年的历史，走进这座安静淳朴的古城，明清古建筑保存完好，粉墙黛瓦的建筑整齐干净，细品湘西悠久的历史文化，还可以品尝湘味小吃。</span>
            </div>
          </div>
          <div class="item">
            <div class="frame">
              <div class="box front">
                <h1>红石林国家地质公园</h1>
                <span>地址：位于湘西土家族苗族自治州古丈县花兰村</span>
              </div>
              <div class="box left"></div>
              <div class="box right"></div>
            </div>
            <div class="bottom_span">
              <span>这是一处极具特色的喀斯特地貌，也是全球唯一的寒武纪形成的红色碳酸盐岩石林景区，在湘西隐秘的山谷之中，映入眼帘的是千姿百态、栩栩如生的石头，造型优美的奇峰石林美不胜收，感叹大自然的鬼斧神工，一睹四亿年前古海洋的风采。</span>
            </div>
          </div>
          <div class="item">
            <div class="frame">
              <div class="box front">
                <h1>里耶古镇</h1>
                <span>地址：位于湘西土家族苗族自治州龙山县里耶镇辟疆街一号</span>
              </div>
              <div class="box left"></div>
              <div class="box right"></div>
            </div>
            <div class="bottom_span">
              <span>湘西四大古镇之一的里耶古镇，有着2000多年的历史，原始古朴建筑，这里也是发现秦简的地方，素有“北有西安兵马俑，南有里耶秦简牍”的美誉，感受秦风古韵，探寻这片土地上的恢宏历史。</span>
            </div>
          </div>
          <div class="item">
            <div class="frame">
              <div class="box front">
                <h1>边城茶峒</h1>
                <span>地址：位于湘西土家族苗族自治州花垣县境东南茶峒镇</span>
              </div>
              <div class="box left"></div>
              <div class="box right"></div>
            </div>
            <div class="bottom_span">
              <span>边城茶峒，是沈从文笔下翠翠生活的地方，也是一处仿佛被时间遗忘的古镇，充满了文学氛围，静谧美好。群山环抱的茶峒，在青石板路上闲逛，撑一艘小船，流水潺潺，感受古镇里独有的悠然与闲适。</span>
            </div>
          </div>
          <div class="item">
            <div class="frame">
              <div class="box front">
                <h1>奇梁洞</h1>
                <span>地址：位于湘西土家族苗族自治州凤凰县北路</span>
              </div>
              <div class="box left"></div>
              <div class="box right"></div>
            </div>
            <div class="bottom_span">
              <span>凤凰城的底下艺术宫殿『奇梁洞』，有着”华夏洞王“的称号，溶洞还有一处酒鬼酒的窖藏基地，窖藏真酒散发的淡淡酒香，沁人心脾。进入溶洞内，千姿百态的钟乳石，一条清溪穿洞而过，加上五光十色的霓虹灯，勾勒出一幅幅瑰丽多彩的自然画卷。</span>
            </div>
          </div>
          <div class="item">
            <div class="frame">
              <div class="box front">
                <h1>墨戎苗寨</h1>
                <span>地址：位于湘西土家族苗族自治州古丈县墨戎镇229省道旁</span>
              </div>
              <div class="box left"></div>
              <div class="box right"></div>
            </div>
            <div class="bottom_span">
              <span>依然而建的墨戎苗寨，古朴清幽的村寨连片而成，有着湘西”小千户“的美誉，黑瓦木墙的吊脚楼错落有致，撑一把雨伞，漫步在朦胧的烟雨之中，仿佛踏入了婉约秀美的山水画中，极具诗情画意，感受浓郁的苗族风情。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  font-family: "Source Sans Pro", sans-serif;
}

html,
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
  transition: background-image .7s ease-in-out;
}

.shell {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* background: rgba(99, 99, 99, 0.8); */
  overflow: hidden;
}

.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 380px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -80px;
}

.prev,
.next {
  transition: transform 0.25s ease;
  z-index: 99999;
  bottom: 5px;
  color: #fff;
  cursor: pointer;
  height: 70px;
  width: 100px;
  border-radius: 8px;
  /* background-color: pink; */
  line-height: 70px;
  text-align: center;
  font-size: 50px;
  transition: all 1.5s;
}

.prev:hover,
.next:hover {
  background-color: pink;
}

.shell_body {
  width: 100%;
  transform: scale(.8);
  padding: 20px 0 150px 0;
}

.shell_slider {
  position: relative;
  transition: transform 1s ease-in-out;
  background: transparent;
}

.item {
  position: relative;
  float: left;
  margin: 0 20px;
}

.frame {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 1s ease-in-out;
  transform-style: preserve-3d;
}

.frame:after {
  content: "";
  position: absolute;
  bottom: -25%;
  width: 100%;
  height: 60px;
  background: #ffffff1c;
  box-shadow: 0px 0px 15px 5px #ffffff1c;
  transform: rotateX(90deg) translate3d(0px, -20px, 0px);
}

.frame h1 {
  text-align: center;
}

.frame span {
  font-size: 20px;
}

.bottom_span {
  width: 100%;
  padding: 10px;
  opacity: 0;
  transition: all 3s;
  font-size: 20px;
  color: rgb(20, 226, 48);
  background: rgba(99, 99, 99, 0.9);
  border-radius: 5px /* text-shadow: 0 0 10px black,
    0 0 20px #fff,
    0 0 30px #fff,
    0 0 50px #fff,
    0 0 80px #fff; */
}

.bottom_span span {
  /* text-align: center;
  display: flex;
  justify-content: center;
  align-items: center */
}

.appear {
  opacity: 1;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid #fff;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.box h1,
.box span {
  color: #fff;
  transform: translateZ(20px);
}

.box h1 {
  text-shadow: 0 0 30px #1f05b4;
  font-size: 100px;
}

.box span {
  position: absolute;
  bottom: 20px;
  padding: 0 25px;
  text-shadow: 0 0 10px #1f05b4;
}

.front,
.left,
.right {
  box-shadow: 0 0 50px #ffffff;
  background-size: cover;
}

.right,
.left {
  top: 0;
  width: 60px;
  backface-visibility: hidden;
}

.left {
  left: 0;
  border-left-width: 5px;
  transform: translate3d(1px, 0, -60px) rotateY(-90deg);
  transform-origin: 0%;
}

.right {
  right: 0;
  border-right-width: 5px;
  transform: translate3d(-1px, 0, -60px) rotateY(90deg);
  transform-origin: 100%;
}
</style>
