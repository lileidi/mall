<!-- toast组件，在详情页点击加入购物车会弹出相应提示信息 -->
<template>
    <div class='toast' v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>

export default {
    name: 'Toast',
    data() {
        return {

        }
    },
    props:{
        // message:{
        //     type:String,
        //     default: ''
        // },
        // show:{
        //     type:Boolean,
        //     default:false
        // }
    },
    data(){
        return {
            message:'',
            isShow:false
        }
    },
    methods:{
        show(message="默认文字",duration=2000){
            this.isShow = true
            this.message = message

            setTimeout(() =>{
                this.isShow = false
                this.message = ''

            },duration)
        }
    }
}
</script>
<style scoped>
    .toast{
        font-size: 16px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;

        background-color: rgba(0,0,0,0.6);
        color: #fff;
        padding: 8px 8px;
        border-radius: 15px;
    }
</style>