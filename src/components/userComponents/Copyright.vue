<script>
export default {
  name: "Copyright"
}
</script>

<template>
  <div class="outer-box">
    <div class="logo">
      <img src="../../assets/LOGO1bak.png" alt=""> <span>栖游集</span>
    </div>
    <h2 class="middle">网站</h2>
    <div class="footer">
      <span>备考序号</span>
    </div>
  </div>
</template>

<style scoped>
.outer-box {
  width: 100%;
  height: 260px;
  //margin-top: 20px;
  background-color: #3e3e3e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fefefe;
}

.middle {
  color: #fefefe;
  font-size: 24px;
}

.outer-box .logo {
  display: flex;
  height: 160px;
  align-content: center;
  justify-content: center;
}

.outer-box .logo img {
  height: 160px;
}

.logo span {
  //display: inline-block;
  //height: 90px;
  //margin-top: 10%;
  font-size: 32px;
  height: 50px;
  font-family: 宋体, serif;
  position: relative;
  left: -16%;
  top: 22%;
}
</style>
