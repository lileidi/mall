import {debounce} from './utils'
// 监听图片加载完成
export const itemListenerMixin = {
    mounted(){
        const refresh = debounce(this.$refs.scroll.refresh,50)
        this.itemimageListener = () =>{
            refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemimageListener)
        // console.log('我是混入中的内容');
    }
}

import BackTop from 'components/content/backTop/BackTop.vue'
export const backTopMixin = {
    components:{
        BackTop,
    },
    data(){
        return {
             // 默认BackTop是不显示，当滚到一定区域设置显示
        isShowBackTop:false,
        }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0)
        },
        listenShowBackTop(position){
             // 4、是否显示回顶箭头
            this.isShowBackTop = (-position.y) > 1000
        }
    }
}