import ElementUI from 'element-ui';
import router from "@/router";

export default {
    name: "resCodeHandle",
    codeHandle(code) {
        //默认先跳到用户登录页面
        if (code === "401") {
            ElementUI.Message({
                message: '请先登录',
                type: 'error',
            });
            // window.location.href = 'http://localhost:8080';
            router.push("/userLogin").then(r => {
                    // console.log(router)
                }
            )
        }
    },
}
// const admin = (localStorage.getItem("admin"));
// if (admin == null || admin === '{}') {
//     // 如果未登录且不是登录或注册接口，则跳转到登录页面
//     if (!response.config.url.endsWith('/login') && !response.config.url.endsWith('/register')) {
//         ElementUI.Message({
//             message: '请先登录',
//             type: 'error',
//         });
//         // window.location.href = 'http://localhost:8080';
//         router.push("/").then(r => {
//                 console.log(router)
//             }
//         )
//     }
// }
