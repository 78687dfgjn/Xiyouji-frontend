<template>
  <div class="outer-box">
    <div class="message">
      <h1>该功能暂未开放，请敬请期待</h1>
      <p>我们正在努力开发中，敬请期待。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

<style scoped>
.outer-box {
  width: 100%;
  height: 600px;
  //width: 100%;
  //height: 100%;
  display: flex;
  //align-items: center;
  justify-content: center;
}

.message {
  flex: 1;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  //max-width: 400px;
  margin: 0 auto;
}

.message h1 {
  color: #333333;
  font-size: 24px;
  margin-bottom: 20px;
}

.message p {
  color: #666666;
  font-size: 16px;
}
</style>
