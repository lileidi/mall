<template>
      <div class="tab-bar-item" @click="itemClick">
          <div v-if="!isActive">
              <slot name="item-icon"></slot>
          </div>
         <div v-else>
              <slot  name="item-icon-active"></slot>
         </div>       
         <div :style="activeStyle">
             <slot name ="item-text"></slot>            
         </div>
         
         <!-- <img src="../../assets/img/tabbar/shouye.svg" alt="">
         <div class="text">首页</div> -->
     </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    data() {
        return {
            // isActive:true,
        }
    },
    computed:{
        isActive(){
            // /home -> item1(/home) = true
            // /home -> item1(/type) = false
            // /home -> item1(/gocart) = false
            // /home -> item1(/profile) = false
            // return this.$route.path.indexof(this.path) !== -1
           return this.$route.path == this.path
        },
        activeStyle(){
            return this.isActive?{color:this.activeColor} : {}
        }
    },
    methods:{
        itemClick(){
            // console.log('itemClick');
            this.$router.replace(this.path)
        }
    }

}
</script>

<style scoped>
 .tab-bar-item{
    text-align: center;
    flex: 1;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
      margin-bottom: 2px;
  }
  .active{
      color: red;
  }
</style>