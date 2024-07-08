import Vue from 'vue'
import Vuex from 'vuex'
// import administratorInfo from './administratorInfo'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        logoInfo: {
            isCollapse: false,
            sideWidth: 200,
            showLogo: true,
        },
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
    },
    actions: {
        getUserInfo(context) {
            context.state.userInfo =
                JSON.parse(localStorage.getItem("accountData") ? localStorage.getItem("accountData") : {});
        }
    }
})
