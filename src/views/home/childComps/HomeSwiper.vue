<template>
<!-- // 本组件是使用封装好的轮播图组件 -->
  <swiper>
    <!-- swiper里有多个swiper-item，swiper-item数据拿的是banners里数组 -->
    <swiper-item v-for="(item, id) in banners" :key="id">
      <!-- 拿数组里图片img，img是个link链接 -->
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      // 轮播swiper-item的数据
      banners: {
        // 类型：数组
        type: Array,
        // 默认值：函数，返回数组
        default() {
          return []
        }
      }
    },
    data(){
      return {
        idLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){
        // console.log('---');
        // 为了获取正确的offsetTop:
        // 监听轮播图的四张图片（影响获取正确的offsetTop值）加载四次会发出四次事件，四次事件都一样，过于频繁，只需要发送一次就可
        // 这里发出的是只一次：在data设置isLoad变量（记录状态）判断是否有发送出去，没有加载才需要加载去发出事件，然后true是发送完了就不用发送第二次了，最后这里发出的是只一次
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>