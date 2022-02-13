import {
    ADD_COUNTER,
    ADD_TO_CART,
} from './mutation-types'

export default{
        [ADD_COUNTER](state,payload){
            payload.count ++
        },
        [ADD_TO_CART](state,payload){
            payload.checked = true
            state.cartList.push(payload)
        }
        // mutations唯一的目的是修改state中状态
        // mutations中的每一个方法尽可能完成的事件比较单一一点，同步操作
        // addCart(state,payload){
            // state.cartList.push(payload)
            // payload是新添加的商品
            // let oldProduct = null;
            // for(var item in state.cartList){
            //     if(item.iid === payload.iid){
            //         oldProduct = item
            //     }
            // }

            // 1、查找之前的数组中有没有该商品
            // let product = state.cartList.find(function(item) {
            //     return item.iid === payload.iid
            // })
            // let oldProduct = state.cartList.find(item => item.iid === payload.iid)

            // 2、判断oldProduct
            // 如果原数组有oldProduct对象,则count+=1；如果原数组还没有则添加新的product对象，count = 1
            // if(oldProduct){
            //     oldProduct.count += 1
            // }else{
            //     payload.count = 1
            //     state.cartList.push(payload)
            // }
        // }
}