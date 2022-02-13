//详情页请求相关数据
import {request} from './request'
export function getDetail(iid){
    return request({
        url:'./detail',
        params:{
            iid
        }
    })
}
// 详情页请求推荐商品的接口
export function getRecommend(){
    return request({
        url:'/recommend'
    })
}
// 创建一个对象整合我们所需获取的商品信息数据
export class Goods{
    constructor(itemInfo,columns,services){

        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}
// 创建一个对象整合我们所需获取的商家店铺信息数据
export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}
// 创建一个对象整合我们所需要的商品参数和尺寸相关信息
export class GoodsParam{
    constructor(info,rule){
        // 注：images可能没有值（某些有，某些没有）
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}