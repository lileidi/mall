import Vue from 'vue'
import Router from 'vue-router'


const Home = () =>
    import ('../views/home/Home.vue')
const Type = () =>
    import ('../views/type/Type.vue')
const Gocart = () =>
    import ('../views/gocart/Gocart.vue')
const Profile = () =>
    import ('../views/profile/Profile.vue')
const Detail = () =>
    import('../views/detail/Detail.vue')

// 1、安装插件
Vue.use(Router)


// 3、导出router
export default new Router({
    // 2、插件路由对象
    // 配置映射关系
    routes: [{
            path: '',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/type',
            component: Type
        },
        {
            path: '/gocart',
            component: Gocart
        },
        {
            path: '/profile',
            component: Profile
        },
        {
            // 设置动态路由
            path: '/detail/:iid',
            component: Detail
        }

    ],
    mode: 'history'
})