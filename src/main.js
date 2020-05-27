import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import Common from './common'


Vue.use(Vant).use(Lazyload);
Vue.use(Common);


Vue.use(Vuex);
Vue.config.productionTip = false
window.preRoute = ''

router.beforeEach((to, from, next) => {
    window.preRoute = Object.assign({},from);

    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
