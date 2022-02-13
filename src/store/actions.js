import {
    ADD_COUNTER,
    ADD_TO_CART,
} from './mutation-types'

export default {
    // actions中处理异步和复杂操作
        addCart(context,payload){
            return new Promise((resolve,reject) =>{
                // payload是新添加的商品
                // 1、查找之前的数组中有没有该商品
                let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

                // 2、判断oldProduct
                if(oldProduct){
                    context.commit(ADD_COUNTER,oldProduct)
                    resolve('当前的商品数量+1')
                }else{
                    payload.count = 1
                    // state.cartList.push(payload)
                    context.commit(ADD_TO_CART,payload)
                    resolve('添加了新的商品')
                }
            })
        }
}