<template>
  <TabBar>
     <TabBarItem path="/home" activeColor="#d81e06"> 
        <img slot="item-icon" src="@/assets/img/tabbar/shouye.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/shouye-active.svg" alt="">
        <div slot="item-text">首页</div>
     </TabBarItem>
     <TabBarItem path="/type" activeColor="#d81e06" >
        <img slot="item-icon" src="@/assets/img/tabbar/fenglei.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/fenglei-active.svg" alt="">
        <div slot="item-text">分类</div>
     </TabBarItem>
     <TabBarItem path="/gocart" activeColor="#d81e06" >
        <img slot="item-icon" src="@/assets/img/tabbar/gouwuche.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/gouwuche-active.svg" alt="">
        <div slot="item-text">购物车</div>
     </TabBarItem>
     <TabBarItem path="/profile" activeColor="#d81e06">
        <img slot="item-icon" src="@/assets/img/tabbar/wode.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/wode-active.svg" alt="">
        <div slot="item-text">我的</div>
     </TabBarItem>
   </TabBar>
</template>

<script>

import TabBar from '@/components/common/tabber/TabBar.vue'
import TabBarItem from '@/components/common/tabber/TabBarItem.vue'
export default {
    name:'MainTabBar',
    components:{
    TabBar,
    TabBarItem,
  }

}
</script>

<style>

</style>