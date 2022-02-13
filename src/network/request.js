// 先在项目终端下载axios库（npm install axios --save），然导入axios库进行网络数据请求
import axios from 'axios'
// 封装request面对组件进行网络请求
export function request(config) {
    // 1、创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    // 2、axios的拦截器

    // 请求拦截
    instance.interceptors.request.use(config => {
        // console.log(config);
        // 1、比如config中的一些信息不符合服务器的要求
        // 2、比如每次发送网络请求时，都希望在界面中显示一个请求的图标
        // 3、某些网络请求（比如登录token），必须携带一些特殊信息
        return config
    }), err => {
        // console.log(err);
    }

    // 响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data;
    }, err => {
        console.log(err);
    })

    // 3、发送真正的网络请求
    // instance(config)返回的是一个promise
    return instance(config)
}