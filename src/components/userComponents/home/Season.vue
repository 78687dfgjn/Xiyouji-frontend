<script>
export default {
  name: "Season"
}
</script>

<template>
  <div class="outer-box">
    <div class="season">
      <div class="spring">
        <div class="text">
          <h1>春</h1>
          <span>spring</span>
          <ul>
            <li>春光旖旎景色妍，</li>
            <li>花开似锦柳如烟。</li>
            <li>燕子归来寻旧垒，</li>
            <li>蜜蜂飞去采新鲜。
            </li>

          </ul>
          <a href="#" style="float:right;font-size: 18px;">更多</a>
        </div>
      </div>
      <div class="summer">
        <div class="text">
          <h1>夏</h1>
          <span>summer</span>


          <ul>
            <li>夏日炎炎如火烧，</li>
            <li>绿树浓荫避炎潮。</li>
            <li>蝉鸣声声催人急，</li>
            <li>清风徐来送微潮。
            </li>
          </ul>
          <a href="#" style="float:right;font-size: 18px;">更多</a>
        </div>
      </div>
      <div class="autumn">
        <div class="text">
          <h1>秋</h1>
          <span>autumn</span>
          <ul>
            <li>秋来叶落金满地，</li>
            <li>果实累累挂满枝。</li>
            <li>微风拂面凉意起，</li>
            <li>明月当空思绪随。
            </li>
          </ul>
          <a href="#" style="float:right;font-size: 18px;">更多</a>
        </div>
      </div>
      <div class="winter">
        <div class="text">
          <h1>冬</h1>
          <span>winter</span>
          <ul>
            <li>冬雪覆盖静无言，</li>
            <li>银装素裹美如仙。</li>
            <li>寒风凛冽刺骨冷，</li>
            <li>炉火通红暖心田。
            </li>
          </ul>
          <a href="#" style="float:right;font-size: 18px;">更多</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer-box {
  /* margin-top: 25px; */
  color: #ffffff;
}

.season {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 340px;
  cursor: pointer;
}

.text a {
  text-decoration: none;
  color: red;
  transition: all 0.3s;
}

.text a:hover {
  color: aqua;
}

.text {
  /* //height: 58%; */
  height: 300px;
  padding-top: 30px;
  width: 300px;
  /* //background-color: rgba(255, 255, 255, 0.4); 添加透明背景 */
  background-color: rgba(0, 0, 0, 0.3);
  /* 添加透明背景 */
  backdrop-filter: blur(2px);
  /* 添加模糊效果 */
  opacity: 0;
  transition: opacity 0.3s;
  text-align: center;
}

.text:hover {
  opacity: 1;
}

.text:hover h1 {
  text-shadow: 0 0 10px black,
  0 0 20px #fff,
  0 0 30px #fff,
  0 0 50px #fff,
  0 0 80px #fff;
}

.text ul {
  list-style-type: none;
}

.text li {
  padding-left: 15px;
  list-style-type: none;
  font-size: 18px;
  color: #deffff;
}

.spring {
  background-image: url("images/spring.jpg");
  background-position: center;
  background-size: cover;
}

.text span {
  display: block;
  /* //margin-top: 12px; */
  padding-top: 12px;
  margin-bottom: 10px;
  font-size: 36px;
}

.summer {
  background-image: url("images/summer.jpg");
  background-position: center;
}

.autumn {
  background-image: url("images/autumn.jpg");
  background-position: center;
}

.winter {
  background-image: url("images/winter.jpg");
  background-position: center;
}

.text h1, span, li {
  opacity: 0;
}

.text h1 {
  font-size: 50px;
  display: block;
  //transition: text-shadow 5s;
  transition: opacity 0.3s;
}

.text span {
  transition: all 2s;
}

.text li {
  transition: all 4s;
}

.text:hover h1 {
  opacity: 1;
}

.text:hover li {
  opacity: 1;
}

.text:hover span {
  opacity: 1;
}
</style>
