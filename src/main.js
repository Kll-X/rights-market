import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import Common from './common';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import {is_weixin,share} from '@/utils/func';


Vue.use(Vant).use(Lazyload);
Vue.use(Common);
Vue.use(VueAwesomeSwiper );


Vue.use(Vuex);
Vue.config.productionTip = false
window.preRoute = ''

router.beforeEach((to, from, next) => {
    window.preRoute = Object.assign({},from);

    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (is_weixin()){
        let shareData;
        if (to.name == 'custompage' && to.params.customId==2){
            shareData = {
                title: "权益超市618开幕节",
                desc: "热门app会员5折、会员9元购等优惠好礼来袭，等你来撩！",
                link: location.origin + '/' + location.search + '#' + to.fullPath,
                imgUrl: location.origin + '/imgs/pro/share_618.png',
            }
        }else{
            shareData = {
                title: "中国移动权益超市来啦",
                desc: "你知道的会员、你不知道的划算权益，都在这里，速点！",
                link: location.origin + '/' + location.search + '#' + to.fullPath,
                imgUrl: location.origin + '/imgs/pro/share.png',
            }
        }
        share(shareData)
    }
    next();

})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
