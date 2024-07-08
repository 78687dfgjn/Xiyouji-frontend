import Vue from 'vue'
import VueRouter from 'vue-router'
import manage from "@/router/module/manage";
import user from "@/router/module/user";
import common from "@/router/module/common";

Vue.use(VueRouter)

const routes = [
    //数组或对象解构，相当于数组转对象，或给对象添加解构对象所有属性

    //公共路由
    ...common,

    //管理员路由
    ...manage,

    //用户路由配置
    ...user
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
