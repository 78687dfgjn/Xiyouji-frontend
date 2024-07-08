export default [
    {
        path: '/user',
        name: "用户页面",
        component: () => import("@/views/userViews/UserSystem.vue"),
        // redirect: '/user/home',
        children: [
            {
                path: 'home', name: '首页',
                component: () => import("@/views/userViews/Home.vue")
            },
            {
                path: 'chat', name: '智能顾问',
                component: () => import('@/views/userViews/Chat.vue'),
            },
            {
                path: 'person', name: '个人中心',
                component: () => import('@/views/userViews/PersonInfo.vue')
            },
            {
                path: 'updateAccount',
                name: '个人信息修改',
                component: () => import('@/views/commonViews/PersonInfo.vue')
            },
            {
                path: 'updatePassword',
                name: '修改密码',
                component: () => import('@/views/commonViews/UpdatePassword.vue')
            },
            {
                path: 'shop', name: '快购好物',
                component: () => import('@/views/userViews/Shop.vue')
            },
            {
                path: 'recommend', name: '智能推荐',
                component: () => import('@/views/userViews/TourismIntroduction/IntelligentRecommendation.vue')
            },
            {
                path: 'destination', name: '精品推荐',
                component: () => import('@/views/userViews/TourismIntroduction/TargetPage.vue')
            },
            {
                path: 'guide', name: '旅游规划智能生成',
                component: () => import('@/views/userViews/TourismIntroduction/TravelGuide.vue')
            },

            {
                path: 'heritage', name: '非遗之旅',
                component: () => import('@/views/userViews/intangibleCultural/IntangibleCulturalHeritage.vue')
            },


            {
                path: 'community', name: '社区',
                component: () => import('@/views/userViews/Community/Community.vue'),
            },
            {
                path: 'postEditing', name: '发布帖子',
                component: () => import('@/views/userViews/Community/PostEditing.vue'),
            },
            {
                path: 'community/test2', name: '发布图片',
                component: () => import('@/views/userViews/Community/ImgEditing.vue'),
            },
            {
                path: 'postPage/:postId',
                name: '帖子详情',
                component: () => import('@/views/userViews/Community/PostPage.vue'),
            },
            {
                path: 'test',
                name: '测试',
                component: () => import('@/views/userViews/test.vue'),
            },
            {
                path: 'accountCenter',
                name: '用户中心',
                component: () => import('@/views/userViews/AccountCenter/AccountCenter.vue'),
                children: [
                    {
                        path: '', // 空路径表示默认子路由
                        redirect: '/accountPosts' // 重定向到 /accountPosts
                    },
                    {
                        path: 'accountPosts',
                        name: '我的发帖',
                        component: () => import('@/views/userViews/AccountCenter/AccountPosts.vue')
                    },
                    {
                        path: 'accountComments',
                        name: '我的评论',
                        component: () => import('@/views/userViews/AccountCenter/AccountComments.vue')
                    },
                    {
                        path: 'accountCollect',
                        name: '我的收藏',
                        component: () => import('@/views/userViews/AccountCenter/AccountCollect.vue')
                    },
                    {
                        path: 'accountFootprint',
                        name: '我的足迹',
                        component: () => import('@/views/userViews/AccountCenter/AccountFootprint.vue')
                    },
                    {
                        path: 'followAccount',
                        name: '我的关注',
                        component: () => import('@/views/userViews/AccountCenter/FollowAccount.vue')
                    },
                    {
                        path: 'fansAccount',
                        name: '我的关注',
                        component: () => import('@/views/userViews/AccountCenter/FansAccount.vue')
                    },
                ]
            },

        ]
    },
    //设置重定向到login
    {
        path: '',
        redirect: '/userLogin'
    },
    {
        path: '/userLogin',
        name: '用户登录',
        component: () => import('@/views/userViews/UserLogin.vue')
    },
    {
        path: '/userRegister',
        name: '用户注册',
        component: () => import('@/views/userViews/UserRegister.vue')
    },

]
