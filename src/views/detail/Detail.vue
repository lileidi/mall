<!-- 详情页页面展示 -->
<template>
    <div id='detail'>
        <detail-nav-bar class="detailnavbar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType = "3" >
                <!-- 导航栏 、图片轮播、商品基本信息、店铺信息、商品信息数据展示、商品参数和尺寸展示、商品评论、商品推荐数据-->
            <detail-swiper :topImages="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommends" ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <!-- <toast :message="message" :show="show" ></toast> -->
    </div>
</template>

<script>
// 导入子组件
// 导入顶文字导航栏组件
import  DetailNavBar from './clildComps/DetailNavBar.vue'
import DetailSwiper from './clildComps/DetailSwiper.vue'
import DetailBaseInfo from './clildComps/DetailBaseInfo.vue'
import DetailShopInfo from './clildComps/DetailShopInfo.vue'
import DetailGoodsInfo from './clildComps/DetailGoodsInfo.vue'
import DetailParamInfo from './clildComps/DetailParamInfo.vue'
import DetailCommentInfo from './clildComps/DetailCommentInfo.vue'
import DetailBottomBar from './clildComps/DetailBottomBar.vue'

import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
// import BackTop from 'components/content/backTop/BackTop.vue'
// import Toast from 'components/common/toast/Toast.vue'

// 导入请求数据
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
import {debounce} from 'common/utils.js'
import {mapActions} from 'vuex'
export default {
    name: 'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        Scroll,
        // BackTop,
        // Toast,
    },
    data() {
        return {
            // 记录获取到的商品id
            iid:null,
            // 记录获取到的轮播图片
            topImages:[],
            // goods是创建一个对象用于拿接口res中商品数据进行整合
            goods:{},
            // shop是创建店铺信息的数据整合
            shop:{},
            // detailInfo保存商品的详情数据
            detailInfo:{},
            // 保存商品的参数和尺寸数据对象
            paramInfo:{},
            // 保存商品的讨论评价信息
            commentInfo:{},
            // 保存推荐商品数据
            recommends:[],
            itemimageListener:null,
            // 保存主题的高度,通过获取对应的offsetTop的值添加进去
            themeTopYs:[],
            // 获取主题高度的函数
            getThemeTopY:null,
            // 用于获取主题下标赋值
            currentIndex:0,
            // 默认BackTop是不显示，当滚到一定区域设置显示
            // isShowBackTop:false,
            // message:'',
            // show:false
        }
    },
    // 使用混入对象
    mixins:[itemListenerMixin,backTopMixin],
    created(){
        // 1、保存传入的iid
        this.iid = this.$route.params.iid
        // 2、根据iid请求详情数据
        getDetail(this.iid).then(res =>{
            // console.log(res);
            // 对获取到的大数据res进行分离，拿一个个所需要的数据
            // 1、获取顶部的图片轮播数据
            const data = res.result
            this.topImages = data.itemInfo.topImages
            // 2、获取商品信息,通过创建一个类对来自几个不同地方的数据进行整合
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            // 3、创建店铺信息对象，对需要的数据整合
            this.shop = new Shop(data.shopInfo)
            // 4、保存商品的详情数据
            this.detailInfo = data.detailInfo
            // 5、保存商品的参数和尺寸数据
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            // 6、取出评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }
        }),
        // 3、请求详情页推荐数据
        getRecommend().then(res =>{
            // console.log(res);
            this.recommends = res.data.list
        })
        // 4、给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖，提高性能)
        this.getThemeTopY = debounce(() =>{
            // console.log('-----');
            this.themeTopYs = []  
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopYs);
        },100)


/*
        // 1、第一次获取，值不对
        // 值不对的原因：this.$refs.params.$el压根没有渲染
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);


        // 2、第二次获取，值不对
        // 值不对的原因：图片没有计算在内，等到dom渲染完，图片完成加载出来计算值才能正确
        // 根据新的数据，对应的DOM是已经被渲染出来；但是图片依旧没有加载完成(目前获取的offsetTop不含图片)
        // offsetTop值不对原因：图片加载问题
        this.$nextTick(() =>{ 
            this.themeTopYs = []  
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopYs);
        })

*/

    },
    methods:{
        ...mapActions(['addCart']),
        // 1、监听图片加载完成
        imageLoad(){
            this.$refs.scroll.refresh()
            // 在每次图片加载完成后都来获取，但是会过于频繁，用防抖解决
            // this.themeTopYs = []
            // this.themeTopYs.push(0);
            // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            // console.log(this.themeTopYs);
            this.getThemeTopY()

        },
        // 2、监听导航点击，滚动到相应的主题高度
        titleClick(index){
            // console.log(index);
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },
        // 3、监听侦测scroll滚动位置Y和主题高度Y作比较，根据获取主题下标能切换到导航文字
        contentScroll(position){
            // console.log(position);
            // 1、获取y值
            // 2、positionY和主题中的值进行对比
            // 3、拿到主题下标this.currentIndex，并且赋值为（=）给导航文字的下标currentIndex
                //  [0, 5313, 6011, 6364]
                // positionY 在0-5313之间，index = 0
                // positionY 在5313-6011之间，index = 1
                // positionY 在6011-6364之间，index = 2

                // positionY 在6364之后，index = 3
            const positionY = -position.y
            let length = this.themeTopYs.length
            for(var i = 0;i <length;i++){
                    // 这个if只能判断出0,1,2,没有3（不能用）
                // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
                //     console.log(i);
                // }
                    // 这个if把i < length -1 和 i === length - 1 分开判断做处理
                if(this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i] && 
                positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))){
                    //  console.log(i);
                    this.currentIndex = i;
                    // console.log(this.currentIndex);
                    this.$refs.nav.currentIndex = this.currentIndex
                 }
            }
            // 4、是否显示回顶箭头
            // this.isShowBackTop = (-position.y) > 1000
            this.listenShowBackTop(position)
        } ,
        // backClick(){
        //     // 第三个参数默认300
        //     this.$refs.scroll.scrollTo(0,0)
        // },

        // 4、加入购物车
        addToCart(){
            // 1、获取购物车所需要展示的信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            // 2、将商品加入购物车里,用到Vuex(1、acrions返回Promise 2、mapActions)
            // mutations中处理事件的话这样用
            // this.$store.commit('addCart',product)
            this.addCart(product).then(res =>{
                // console.log(res);
                // this.show = true;
                // this.message = res;
                // setTimeout(() =>{
                //     this.show = false;
                //     this.message = ''
                // },1500)

                this.$toast.show(res,2000)
            })

            // actions中处理事件这样用，dispatch分发任务
            // this.$store.dispatch('addCart',product).then(res =>{
            //     console.log(res);
            // })

        }

    },
    mounted(){
    //    console.log('mounted');
    },
    // updated里有数据，但是一更新就得重新渲染，过于频繁
    // updated(){
    //     this.themeTopYs = []
    //     this.themeTopYs.push(0);
    //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //     console.log(this.themeTopYs);
    // },
    destroyed(){
        this.$bus.$off('itemImageLoad',this.itemimageListener)
    },
    
}
</script>
<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .detailnavbar{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        height: calc(100% - 44px - 53px);
    }
    
</style>