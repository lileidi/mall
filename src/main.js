import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'



Vue.config.productionTip = false
// 利用vue实例作为事件总线，让事件在组件之间通信
// 因为vue中不存在$bus，所以利用原型属性设置，设置为一个vue实例（vue实例可以发射事件，可以接收事件）
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// 解决移动端300ms延迟
FastClick.attach(document.body)
// 使用懒加载的插件
Vue.use(VueLazyLoad,{
    // 传入占位符图片，在图片未显示时占位
    loading:require('./assets/img/common/placeholder.png')
})

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')