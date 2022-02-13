<!-- 购物车界面的商品列表展示 -->
<template>
    <div class='cartlist'>
        <scroll class="content" ref="scroll" >
            <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>

             <!-- <ul> 
                <li>购物商品1</li>
                <li>购物商品2</li>
                <li>购物商品3</li>
                <li>购物商品4</li>
                <li>购物商品5</li>
                <li>购物商品6</li>
                <li>购物商品7</li>
                <li>购物商品8</li>
                <li>购物商品9</li>
                <li>购物商品10</li>
                <li>购物商品11</li>
                <li>购物商品12</li>
                <li>购物商品13</li>
                <li>购物商品14</li>
                <li>购物商品15</li>
                <li>购物商品16</li>
                <li>购物商品17</li>
                <li>购物商品18</li>
                <li>购物商品19</li>
                <li>购物商品20</li>
                <li>购物商品21</li>
                <li>购物商品22</li>
                <li>购物商品23</li>
                <li>购物商品24</li>
                <li>购物商品25</li>
                <li>购物商品26</li>
                <li>购物商品27</li>
                <li>购物商品28</li>
                <li>购物商品29</li>
                <li>购物商品30</li>
                <li>购物商品31</li>
                <li>购物商品32</li>
                <li>购物商品33</li>
                <li>购物商品34</li>
                <li>购物商品35</li>
                <li>购物商品36</li>
                <li>购物商品37</li>
                <li>购物商品38</li>
                <li>购物商品39</li>
                <li>购物商品40</li>
                <li>购物商品41</li>
                <li>购物商品42</li>
                <li>购物商品43</li>
                <li>购物商品44</li>
                <li>购物商品45</li>
                <li>购物商品46</li>
                <li>购物商品47</li>
                <li>购物商品48</li>
                <li>购物商品49</li>
                <li>购物商品50</li>
                <li>购物商品51</li>
                <li>购物商品52</li>
                <li>购物商品53</li>
                <li>购物商品54</li>
                <li>购物商品55</li>
                <li>购物商品56</li>
                <li>购物商品57</li>
                <li>购物商品58</li>
                <li>购物商品59</li>
                <li>购物商品60</li>
                <li>购物商品61</li>
                <li>购物商品62</li>
                <li>购物商品63</li>
                <li>购物商品64</li>
                <li>购物商品65</li>
                <li>购物商品66</li>
                <li>购物商品67</li>
                <li>购物商品68</li>
                <li>购物商品69</li>
                <li>购物商品70</li>
                <li>购物商品71</li>
                <li>购物商品72</li>
                <li>购物商品73</li>
                <li>购物商品74</li>
                <li>购物商品75</li>
                <li>购物商品76</li>
                <li>购物商品77</li>
                <li>购物商品78</li>
                <li>购物商品79</li>
                <li>购物商品80</li>
                <li>购物商品81</li>
                <li>购物商品82</li>
                <li>购物商品83</li>
                <li>购物商品84</li>
                <li>购物商品85</li>
                <li>购物商品86</li>
                <li>购物商品87</li>
                <li>购物商品88</li>
                <li>购物商品89</li>
                <li>购物商品90</li>
                <li>购物商品91</li>
                <li>购物商品92</li>
                <li>购物商品93</li>
                <li>购物商品94</li>
                <li>购物商品95</li>
                <li>购物商品96</li>
                <li>购物商品97</li>
                <li>购物商品98</li>
                <li>购物商品99</li>
                <li>购物商品100</li>
            </ul>  -->
        </scroll>
    </div>
</template>

<script>
import CartListItem from './CartListItem.vue'
import Scroll from 'components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
export default {
    name: 'CartList',
    data() {
        return {

        }
    },
    components:{
        Scroll,
        CartListItem,
    },
    computed:{
        ...mapGetters(['cartList'])
    },
    activated(){
        this.$refs.scroll.refresh()
    }
}
</script>
<style scoped>
    .cartlist{
        /* height: 100vh; */
        height: calc(100vh - 44px - 49px - 40px);
    }
    .content{
        /* height: calc(100% - 44px - 49px - 40px); */
        overflow: hidden;
        height: 100%;
    }
</style>