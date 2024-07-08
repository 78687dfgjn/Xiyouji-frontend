import Vue from 'vue'
import App from '@/App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.css'
import '@/assets/css/font_class.css'
import request from '@/utils/request'
import store from '@/store'
import '@/views/userViews/TourismIntroduction/js/mapUsePlugins.js'
import BaiduMap from 'vue-baidu-map'

Vue.prototype.request = request

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(ElementUI, {size: "mini"})

//引入icon库
import '@/assets/icon/iconfont.css'


Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'WFazjQE0iXFZR802XUZaYIu0Dp9yXl67'
})


Vue.prototype.request = request

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// 保持页面在顶部
router.beforeEach((to, from, next) => {
    // 检查当前路由是否是文章页面
    if (to.path.startsWith('/user/postPage/')) {
        //滚动到顶部
        window.scrollTo(0, 0);
    }
    next();
});


//先写页面
/*router.beforeEach((to, from, next) => {
    //登录注册放行
    // console.log(to.path)
    if (to.path.indexOf("Login") !== -1 || to.path.indexOf("Register") !== -1) {
        //不再执行后面语句
        return next()
    }
    //检查登录状态
    const account = localStorage.getItem("accountData") && localStorage.getItem("accountData") != "" ? JSON.parse(localStorage.getItem("accountData")) : null
    //查看是否有token
    if (!account || account.token == "") {
        ElementUI.Message({
            message: '请先登录',
            type: 'error',
        });
        //如果account为null，跳转用户登录页面
        if (!account) {
            router.push("/userLogin").then()
        } else {
            if (account.identity === "admin") {
                router.push("/adminLogin").then()
            } else if (account.identity === "user") {
                router.push("/userLogin").then()
            }
        }
    } else {
        //已登录，放行
        next();
        //当从可视化到其他不是可视化的页面时，跳转到新页面后刷新
        if (from.path.indexOf("DataShow") !== -1 && to.path.indexOf("DataShow") === -1) {
            console.log("跨域？太小儿科了");
            setTimeout(() => {
                location.reload();
            }, 200)
        }
    }
});*/
