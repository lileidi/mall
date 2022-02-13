//针对首页中不同的url都去请求request时，做出的一个统一管理的首页请求。
//不同的url只要面向这个home.js进行请求
import { request } from "./request";
// getHomeMultidata请求的是轮播图和推荐信息相关数据
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
// getHomeGoods请求的是商品（流行、新款、精品）的数据
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}

//把一个数组放进另一个数组
// let totalNums = []

// const num1 = [20, 10, 30, 40]
//     // 1、for遍历然后添加
//     // for (let n of num1) {
//     //     totalNums.push(n)
//     // }
//     // 2、直接push语法：遍历添加
// totalNums.push(...num1)