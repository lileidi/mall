<template>
<!-- 首页是唯一的，用id选择器 -->
  <div id="home">
        <!-- 使用导航栏组件，并且首页是替换center部分插槽（组件：导入——注册——使用） -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 为了解决文字导航吸顶，复制一份 ：1、有吸顶2、保持titles一致-->
    <tab-control  :titles="['流行','新款','精选']"
                    @tabClick="tabClick" 
                    ref="tabControl1"
                    class="clone-tab-control"
                    v-show="isTabFixed"/>
        <!-- ref准确拿到该组件 -->
        <!-- :probeType="3"这里一定要用上v-bind传的是number3进行位置侦测，不用v-bind只是传个字符串 -->
        <!--@scroll="contentScroll"：给自定义事件scroll设置contentScroll方法，在方法里面传入首页需要监听位置侦测的position  -->
    <scroll 
            class="content" 
            ref="scroll" 
            :probeType="3" 
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="LoadMore">
         <!-- 使用轮播图组件 、使用推荐信息组件、使用流行特性背景图组件、使用文字导航组件-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <fashion-view/>
      <tab-control  :titles="['流行','新款','精选']"
                    @tabClick="tabClick" 
                    ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
        <!-- 组件是不能直接监听点击的，用.native (原生的)监听-->
        <!-- 修饰符.native什么时候使用：在我们需要监听一个组件的原生事件时，必须为对应事件加上.native修饰符才能进行监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
// 公共组件部分
// 导入导航栏navbar组件
import NavBar from 'components/common/navbar/NavBar'
// 导入文字导航tab-control组件
import TabControl from 'components/content/TabControl/TabControl.vue'
// 导入商品数据组件
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
// import BackTop from 'components/content/backTop/BackTop.vue'

// 子组件部分
// 导入首页轮播图home-swiper组件
// 导入首页推荐信息recommend组件
// 导入首页流行特性背景图组件
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FashionView from './childComps/FashionView.vue'



// 导入方法部分
// 导入首页开发的数据请求
import {getHomeMultidata , 
        getHomeGoods
        } from 'network/home'

import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
export default {
    name:"Home",
    //注册导航栏组件
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FashionView,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return {
        // result:null
        // bannners是轮播数据
        // recommends是轮播下面的推荐信息的数据
        // goods是首页商品的数据
        banners:[],
        recommends:[],
        goods:{
          // 第一页是默认全部请求，如果有上下拉动作再把相对页请求更多数据
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        // 设置默认商品类型为'pop'
        currentType:'pop',
        // 默认BackTop是不显示，当滚到一定区域设置显示
        // isShowBackTop:false,
        // 用于文字导航的吸顶,获取滚动位置到顶部的距离
        tabOffsetTop:0,
        // 拿到距离，判断记录是否需要吸顶
        isTabFixed:false,
        // 用于记录首页离开时的位置Y
        saveY:0,
        // 监听首页的函数
        itemimageListener:null,


      }
    },
    // 计算属性，一般使用组件调用比较长的放在计算属性里
    computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
    },
    // created执行主要逻辑，具体方法实现（具体逻辑）写在methods里
    created(){
      // 1、首页开发——请求多个数据
      this.getHomeMultidata()
      // 2、请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    // 离开首页时不让销毁掉并且离开时记录位置，回来还是那个位置
    destroyed(){
      console.log('home destoryed');
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,10)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      // 1、保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 2、取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemimageListener)
    },
    mounted(){

      // 1、图片加载完成的事件监听

          // 注意：这里debug出现错误分析可能的原因：
          // 如果这块监听事件放在created（）{}中，会出现错误，因为在created组件创建就拿可能this.$refs.scroll不存在null/undefined
          // 所以应该放在mounted中监听执行refresh()

          // 这里因为都监听每一张图片执行一次refresh()，影响性能
          // 解决：利用debounce(refresh)防抖函数减少请求执行的频率，请求30次变1次提高性能
          // const refresh = 来接收防抖函数return出来的函数，这里全局变量不会销毁，因为被下面内部函数调用refresh()形成闭包
      // const refresh = this.debounce(this.$refs.scroll.refresh,50)

      // this.itemimageListener = () =>{
          // console.log('-------');
          // 接收到事件进行图片加载事件监听，如果监听到图片加载完成就进行刷新
          // this.$refs.scroll.refresh()
        // refresh()
      // }
          //监听item中图片加载完成:加载完后调用refresh()进行刷新（得到新的高度），重新计算滚动区域
          //解决滚动高度不正确问题： 监听每一张图片是否加载完成，只要有一张图片加载完成，就执行一次refresh()
      // this.$bus.$on('itemImageLoad',this.itemimageListener)

    },
    methods:{
      // 事件监听相关的方法
     
      // 点击文字根据下标拿相应数据方法
      tabClick(index){
        // 点击根据下标拿类型，用类型去拿数据展示
        // console.log(index);
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 让用于吸顶的tabControl1、页面滚动的tabContro2和用户点击的index保持一致
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // 滚动后回到顶部的方法
      // backClick(){
      //   // console.log('backClick');
      //   // 1、拿组件 组件的属性 属性的方法
      //     // this.$refs.scroll.scroll.scrollTo(0,0,500)
      //     // 2、在组件设置好方法，在这里直接拿组件的方法,scrollTo方法不传第三个参数就使用默认值300ms
      //     this.$refs.scroll.scrollTo(0,0)
      // },
      // 拿位置侦测方法，传入position才会有position，哪一页需要才传
      contentScroll(position){
        // console.log(position);
          // 1、判断BackTop是否显示
          // 拿到position取出y值(负值)，y值和1000做对比，大于1000显示BackTop，小于隐藏
          this.listenShowBackTop(position)
        // this.isShowBackTop = (-position.y) > 1000
        // 2、决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 拿到上拉事件，给事件设置方法处理
      LoadMore(){
          // console.log('上拉加载更多');
          // 加载谁就是在currentType记录谁，根据类型去加载
          this.getHomeGoods(this.currentType)

          // 不可滚动的原因：
          // item图片（异步加载）的懒加载导致列表高度还未确定，所以要在图片加载成功后调用betterscroll的finishup
          // （一开始的计算item高度可能是不包括img的，然后图片异步加过来了意味着item会变大了，滚不动，然后需要对图片刷新，重新计算）
          // 要做的两件事：1、监听图片加载完成 2、一旦图片加载完成拿到refresh方法进行重新计算
          // 一旦拿到refresh，会重新计算可滚动的高度区域
          this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad(){
        // 2、获取tabControl的offsetTop值
        // 所有的组件都有一个属性$el：用于获取组件中的元素 （组件没有offsetTop，组件的元素有）
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop);
      },



      // 网络请求相关的方法
      getHomeMultidata(){
         getHomeMultidata().then(res =>{
        // console.log(res);
        // this 指当前组件对象，所以this.result拿的是组件的data的result
        // 这里有关js的垃圾回收机制：res（变量）指向data（对象），箭头函数执行完会回收掉变量res,它指向的data对象就会变成一个没有被指向的对象，孤零零的对象
        // 然后这时候垃圾回收发现data没有被引用指向的时候就会也回收掉
        // 如果在data里面返回一个result来接收res变量的话，result和res一样有指向data对象，函数执行完res被回收，因data还被result指向，所以没有被回收掉
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;

      })
      },

      getHomeGoods(type){
        // 设置记录page，加载时进行复用，页码要加1
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
        // console.log(res);
        // 保存数据
        // for(var n of res.data.list){
        //   this.goods[type].list.push(n)
        // }
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多：
        // scroll默认加载一次，这里加载完一次数据又要得去拿数据来再次加载，调用finishPullUp()
        // 在Scroll组件里设置好方法，这里取方法调用
        this.$refs.scroll.finishPullUp()
      })
      }
    },

}
</script>

<style scoped>
/* 进行滚动不让导航栏被遮住  */
  #home{
    /* padding-top: 44px; */
    width: 100vw;
    height: 100vh;
  }
  .home-nav{
    background: var(--color-tint);
    color: #fff;


    /* 设置导航栏部分固定定位，进行原生滚动不让被遮住 */
    /* 该项目用了better-scroll插件，直接可以实现局部滚动，所以固定定位没有必要了，对better-scroll没影响 */
    /* position: fixed;
    top:0;
    left:0;
    right:0;
    z-index:9; */
  }
  /* 粘性定位失效，去掉 */
  /* .tab-control{
    position: sticky;
    top: 44px;
    z-index:9;
  } */
  .content{
      overflow: hidden;
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;

    /* height:300px; */
    /* height:calc(100% - 93px);
    overflow: hidden; */
    /* margin-top:44px; */
  }
  .clone-tab-control{
    position: relative;
    z-index: 9;
  }

</style>