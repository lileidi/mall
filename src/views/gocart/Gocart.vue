<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
// 从vuex中导入辅助函数mapgetters
// mapgetters辅助函数仅仅是将store中的getter映射到的局部计算属性
import {mapGetters} from 'vuex'
export default {
    name:'Gocart',
    components:{
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed:{
      // 两种语法：数组形式，对象形式
      ...mapGetters([
        'cartLength',
        'cartList'
      ])
      // ...mapGetters({
      //   length:'cartLength',
      //   list:'cartList'
      // })
    }

}
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>