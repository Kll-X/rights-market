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
import {is_weixin} from '@/utils/func';


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

    function share(data) {
        window.wx.ready(function () {
            window.wx.onMenuShareAppMessage({
                title: data.title, // 分享标题
                desc: data.desc, // 分享描述
                link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: data.imgUrl ? data.imgUrl : location.origin + '/imgs/pro/share.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            window.wx.onMenuShareTimeline({
                title: data.name, // 分享标题
                link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: data.imgUrl ? data.imgUrl : location.origin + '/imgs/pro/share.png', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    console.log()
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
