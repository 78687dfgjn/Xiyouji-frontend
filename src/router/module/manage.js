export default [
    {
        path: '/manage',
        name: '管理系统',
        component: () => import('@/views/manageViews/ManageSystem.vue'),
        children: [
            {
                path: 'home',
                name: '系统首页',
                component: () => import('@/views/manageViews/Home.vue'),
            },
            {
                path: 'updatePassword',
                name: '修改密码',
                component: () => import('@/views/commonViews/UpdatePassword.vue')
            },
            {
                path: 'account', name: '用户管理',
                component: () => import('@/views/manageViews/dataManage/User.vue'),
            },
            {
                path: 'accountOperate', name: '用户操作管理',
                component: () => import('@/views/manageViews/dataManage/AccountOperate.vue'),
            },
            {
                path: 'commodity', name: '商品管理',
                component: () => import('@/views/manageViews/dataManage/Commodity.vue'),
            },
            {
                path: 'category', name: '分类管理',
                component: () => import('@/views/manageViews/dataManage/Category.vue'),
            },
            {
                path: 'transaction', name: '交易记录管理',
                component: () => import('@/views/manageViews/dataManage/Transaction.vue'),
            },
            {
                path: 'commoditySales', name: '商品销售量管理',
                component: () => import('@/views/manageViews/dataManage/CommoditySales.vue'),
            },
            {
                path: 'storeSales', name: '商店销售量管理',
                component: () => import('@/views/manageViews/dataManage/StoreSales.vue'),
            },
            {
                path: 'userComment', name: '用户评价管理',
                component: () => import('@/views/manageViews/dataManage/UserComment.vue'),
            },


            {
                path: 'person',
                name: '个人中心',
                component: () => import('@/views/commonViews/PersonInfo.vue'),
            },
            {
                path: 'userDataShow',
                name: '湘西一带用户消费额',
                component: () => import('@/views/manageViews/dataShow/UserDataShow.vue'),
            },
            {
                path: 'commodityDataShow',
                name: '湘西一带商品销售情况',
                component: () => import('@/views/manageViews/dataShow/CommodityDataShow.vue'),
            },

        ]
    },

    {
        path: '/adminLogin',
        name: '管理员登录',
        redirect: '/adminLogin/loginForm',
        component: () => import('@/views/manageViews/AdminLogin.vue'),
        children: [
            {
                path: 'loginForm',
                name: '管理员账号表单',
                component: () => import('@/components/manageComponents/LoginForm.vue')
            },
            {
                path: 'face',
                name: '人脸校验',
                component: () => import('@/components/manageComponents/Face.vue'),
            },
        ]
    },

]
