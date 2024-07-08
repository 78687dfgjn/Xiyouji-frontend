import axios from 'axios'
import resCodeHandle from "@/utils/resCodeHandle";
import nprogress from "nprogress"
import "nprogress/nprogress.css"

const request = axios.create({
    // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上
    // '/api'前缀在，页面里面写接口的时候就不要加 '/api'了，
    // 否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
    // baseURL: 'http://8.138.10.52:6060',
    baseURL: 'http://localhost:6060',
    //后端的星火有点慢，先不写了
    // timeout: 12000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // console.log(localStorage.getItem("token"));
    // const token = localStorage.getItem("token")
    const account = localStorage.getItem("accountData") ? JSON.parse(localStorage.getItem("accountData")) : null
    if (account) {
        config.headers['token'] = account.token;  // 设置请求头
    }
    nprogress.start()
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        nprogress.done()
        let res = response.data;
        // 如果是返回的文件
        // if (response.config.responseType === 'blob') {
        //     return res
        // }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        resCodeHandle.codeHandle(res.code)

        //因为设置了统一结果类，所以res.data才是数据本身
        // res = res.data
        return res;
    },
    error => {
        nprogress.done()
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

