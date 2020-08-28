import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GoodsDetail from './views/GoodsDetail.vue'
import MyOrder from './views/MyOrder.vue'
import Mine from './views/Mine.vue'
import Custompage from './views/CustomPage.vue'
import VipBenefit from './views/VipBenefit.vue'
import Sort from './views/Sort.vue'
import HalfPrice from './views/HalfPrice.vue'
import VipPreferential from './views/VipPreferential.vue'
import Vip from './views/Vip.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [{
            path: '*',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                title: '中国移动权益超市',
                keepAlive:true
            }
        },
        {
            path: '/sort/:type?',
            name: 'sort',
            component: Sort,
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/activities',
            name: 'activities',
            component: () =>
                import ( /* webpackChunkName: "activities" */ './views/Activities.vue'),
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/mine',
            name: 'mine',
            component: Mine,
            meta: {
                title: '中国移动权益超市'
            }
            // component: () =>
            //     import ( /* webpackChunkName: "mine" */ './views/Mine.vue')
        },
        {
            path: '/myOrder/:type',
            name: 'myOrder',
            component: MyOrder,
            meta: {
                title: '中国移动权益超市'
            }
            // component: () =>
            //     import ( /* webpackChunkName: "myOrder" */ './views/MyOrder.vue')
        },
        {
            path: '/goodsDetail/:mid/:proid?/:saleid?/:paytype?/:tc?',
            name: 'goodsDetail',
            component: GoodsDetail,
            meta: {
                title: '中国移动权益超市'
            }
            // component: () =>
                // import ( /* webpackChunkName: "goodsDetail" */ './views/GoodsDetail.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () =>
                import ( /* webpackChunkName: "search" */ './views/Search.vue'),
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ( /* webpackChunkName: "login" */ './views/Login.vue'),
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/custompage/:customId',
            name: 'custompage',
            component: Custompage,
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/getRights',
            name: 'getRights',
            component: () =>
                import ( /* webpackChunkName: "getRights" */ './views/GetRights.vue'),
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/vipBenefit',
            name: 'vipBenefit',
            component: VipBenefit,
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/vipPreferential',
            name: 'vipPreferential',
            component: VipPreferential,
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/vip',
            name: 'vip',
            component: Vip,
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/halfPrice',
            name: 'halfPrice',
            component: HalfPrice,
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/newGuest',
            name: 'newGuest',
            component: () =>
                import( /* webpackChunkName: "newGuest" */ './views/NewGuest.vue'),
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/customerService',
            name: 'customerService',
            component: () =>
                import( /* webpackChunkName: "customerService" */ './views/CustomerService.vue'),
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/faq',
            name: 'faq',
            component: () =>
                import( /* webpackChunkName: "newGuest" */ './views/Faq.vue'),
            meta: {
                title: '中国移动权益超市'
            }
        },
        {
            path: '/networkError',
            component: require('./views/NetworkError.vue').default,
            name: 'networkError',
            meta: {
                title: '网络异常'
            }
        }
    ]
})
