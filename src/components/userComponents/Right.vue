<script>
export default {
  name: "Right",
  data() {
    return {}
  },
  methods: {
    goChat() {
      if (this.$route.path !== "/user/chat") {
        this.$router.push({
          path: "/user/chat"
        })
      }
    },
    goTo404() {
      this.$router.push({
        path: "/404"
      })
    }
  },
  mounted() {
    ////右侧导航
    //获取元素
    const elevator = document.querySelector('.dtdh .hdb')
    const guding = document.querySelector('.dtdh .ycbk')
    const hdb = document.querySelector('dtdh .hdb span')
    // const like = document.querySelector('. .like')
    // const xb = document.querySelector('.xbody')
    window.addEventListener('scroll', function () {
      const n = document.documentElement.scrollTop
      // if (n >= (like.offsetTop + xb.offsetTop)) {  //like顶部到xb顶部的距离加上xb顶部的距离到页面顶部的距离
      if (n >= 500) {//要改这个参数********************
        elevator.style.display = 'inline-block'
        guding.style.borderRadius = '17px 0 0 0'
      } else {
        elevator.style.display = 'none'
        guding.style.borderRadius = '17px 0 0 17px'
      }
    })
    const scrollStep = -70     //设定滑动速度
    elevator.addEventListener('click', function () {
      //点击返回顶部
      let sj = document.documentElement.scrollTop
      // const scrollInterval = setInterval(function () {
      sj += scrollStep
      //设置页面滚动
      // if (sj > 0) {
      //   window.scrollTo(0, sj)
      // } else {
      window.scrollTo(0, 0)
      //滚到顶部时清除定时器
      // clearInterval(scrollInterval)
      // }
      //document.documentElement.scrollTop = n
      //document.body.scrollTop = n
      // }, 15)//每隔15ms滚动一次。
    })

  }
}

</script>

<template>
  <div class="dtdh">
    <div class="ycbk">
      <div @click="goChat">
        <a href="#">
          <img src="@/assets/community.svg" alt="">
        </a>
        <a href="#">消息</a>
      </div>
      <div @click="goTo404">
        <a href="">
          <img src="@/assets/service.svg" alt="">
        </a>
        <a>官方客服</a>
      </div>
      <div @click="goTo404">
        <a href="#">
          <img src="@/assets/post.svg" alt="">
        </a>
        <a>反馈</a>
      </div>
      <div @click="goTo404">
        <a href="#">
          <img src="@/assets/warn.svg" alt="">
        </a>
        <a>举报</a>
      </div>
    </div>
    <div class="hdb">
      <span><img src="@/assets/top.svg" alt=""></span>
      <span>回顶部</span>
    </div>
  </div>
</template>

<style scoped>
.ycbk {
  position: fixed;
  right: 0;
  top: 254px;
  width: 60px;
  height: 348px;
  background-color: #fff;
  border-radius: 17px 0 0 17px;
  z-index: 2;
  font-size: 12px;
}

.ycbk div {
  width: 60px;
  height: 56px;
  margin: 25px 0;
  text-align: center;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* transition: all 2s; */
}

.ycbk div:hover {
  background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
}

.ycbk div a {
  width: 60px;
  padding: 0;
  text-decoration: none;
  color: black;
}

.hdb {
  position: fixed;
  right: 0;
  top: 602px;
  width: 60px;
  height: 76px;
  text-align: center;
  background-color: #fff;
  border-radius: 0 0 0 17px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: none;
}

.hdb:hover {
  background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
}

.hdb span {
  display: inline-block;
  width: 60px;
  padding: 0;
  color: black;
  cursor: pointer;
  font-size: 12px;
}
</style>
