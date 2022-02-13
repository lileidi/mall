<!-- better-scroll滚动组件 -->
<template>
<!-- ref如果绑定在组件中，那么通过this.$refs.refname获取的是一个组件对象 -->
<!-- ref如果绑定在普通的元素中，那么通过this.$refs.refname获取的是一个元素对象 -->
<!-- ref属性是明确拿到那个子组    ref/children-->
    <div class='wrapper' ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
// 引入BScroll插件
import BScroll from 'better-scroll'
export default {
    name: 'Scroll',
    // 每个用该组件不一定都需要侦测，实时侦测影响性能
    // 所以设置probeType属性让外面传进来用
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            scroll:null,
            message:'hhh'
        }
    },
    // 渲染挂载，DOM元素已经存在DOM树里
    mounted(){
        // 1、创建BScroll对象（$el,position）
        this.scroll = new BScroll(this.$refs.wrapper,{
            //这里封装该组件考虑复用，probeType不能写死影响性能，需要侦测再设置
            // 应用属性this.probeType
            probeType:this.probeType,
            // 上拉事件，监听滚动到底部
            pullUpLoad:this.pullUpLoad,
            // 设置observeDOM:true才可以滚动
            observeDOM:true,
            observeImage:true,
            // mouseWheel:true,
            // 滚动默认原生事件的click = false，要手动设置click = true进行事件监听，而且对button不起作用
            click :true,
            
        })
        // 2、监听滚动的位置
        if(this.probeType === 2 || this.probeType === 3){
            this.scroll.on('scroll',(position) =>{
            // console.log(position);
            // 自定义事件用$emit,把position传出去
            this.$emit('scroll',position)
        })
        }


        // 3、监听上拉事件————监听scroll滚动到底部
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',() =>{
            // console.log('上拉加载更多');
            // 监听到组件pullUpLoad:true时才把pullingUp事件发出去
            this.$emit('pullingUp')
        })
        }
        

        //这里是使用滚动后回到顶部的方法 （x,y,time）
        // 属性的方法
        this.scroll.scrollTo(0,0)
    },
    methods:{
        // 定义滚动后回到顶部的方法
        scrollTo(x,y,time = 300){
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        // 定义加载完成一次后继续取数据来再次加载方法,完成上拉加载更多
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()
        },
        // 定义图片加载完成重新计算滚动区域
        refresh(){
            // console.log('----');
            this.scroll && this.scroll.refresh()
        },
        // 定义获取scroll的y
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>
<style scoped>

</style>