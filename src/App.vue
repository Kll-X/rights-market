<template>
    <div id="app">
        <router-view/>
        <quick-login v-show="showQuickLogin"></quick-login>
        <Popup v-show="popupInfo.flag" v-bind="popupInfo"></Popup>
    </div>
</template>
<script>
    import flexible from '@/utils/flexible.js';
    import { mapState,mapMutations } from 'vuex';
    import { getCookie,setCookie,delCookie } from "@/utils/cookie";
    import QuickLogin from '@components/home/QuickLogin.vue';
    import messageBus from "@/utils/messageBus";
    import Popup from '@components/common/Popup'
    import {getWxconfig} from '@/api/common';
    import {is_weixin,getQuery} from '@/utils/func'
    import {signLogin} from '@/api/login'
    import {myVip} from '@/api/vipbenefit';


    export default {
        data(){
            return {
                popupInfo: {
                    flag: false,
                    loginTimer:null
                }
            }
        },
        created(){
            let that = this;
            let channelCode = getQuery('channelCode');
            let locationCode = getQuery('location') || this.$route.query.location;
            channelCode && this.SET_CHANNEL(channelCode);
            locationCode && this.SET_SYSINFO({
                locationCode: locationCode
            });
            messageBus.$on('msg_checkLogin',(type)=>{
                this.checkLogin(type)
            });
            messageBus.$on('msg_showPopup',info=>{
                this.popupInfo = info;
            });
            messageBus.$on('msg_countDown',(time)=>{
                this.countDown(time)
            });
            messageBus.$on('msg_getVipInfo',()=>{
                this.getVipInfo()
            });
            // 判断路由当前是首页则调起检测-弹窗登录
            if(this.$route.name == 'home'){
                messageBus.$emit('msg_checkLogin','quick')
            }else{
                // 其他页面只检测-自动取号
                messageBus.$emit('msg_checkLogin')
            }
            //微信分享相关
            if (is_weixin()) {
                getWxconfig({
                    url: location.href.split('#')[0]
                }).then(res => {
                    const debug = false;
                    if (res.data.resultCode === 0) {
                        res = res.data.data;
                        console.log(res);
                        const jsApiList = [
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'onMenuShareAppMessage',
                            'onMenuShareTimeline',
                            'getLocalImgData'
                        ]; // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        window.wx.config({
                            debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: 'wx544cfd61241c9399', // 必填，公众号的唯一标识
                            timestamp: res.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.noncestr, // 必填，生成签名的随机串
                            signature: res.signature, // 必填，签名，见附录1
                            jsApiList: jsApiList
                        });
                        const shareData = {
                            title: "中国移动权益超市来啦",
                            desc: "你知道的会员、你不知道的划算权益，都在这里，速点！",
                            link: location.origin + '/' + location.hash,
                            imgUrl: location.origin + '/imgs/pro/share.png',
                        }
                        that.share(shareData);
                    }
                })
            }
        },
        components:{
            QuickLogin,
            Popup
        },
        beforeMount(){
            flexible()
        },
        computed:{
            ...mapState([
                'showQuickLogin',
                "userInfo",
                "sysInfo"
            ]),
        },
        watch:{
            '$store.state.userInfo.phone'(n){
                n && n!='null' &&  this.getVipInfo()
            },
            '$route'(){
                setTimeout(() => { //用setTimeout才有效
                    document.documentElement.scrollTop = 0;
                }, 0);
            }
        },
        methods:{
            ...mapMutations([
                'SET_USERINFO',
                'SET_SHOWQUICKLOGIN',
                'SET_CHANNEL',
                'SET_SYSINFO'
            ]),
            getVipInfo(){
                let that = this;
                myVip({
                    proId:'6000692',
                    salesId:'102125',
                    channelCode:that.sysInfo.channelCode,
                    phone:that.userInfo.phone,
                }).then((res)=>{
                    if(res.data.resultCode == 0){ //获得vip信息
                        res.data.data.isVip = 1;
                        that.SET_USERINFO(res.data.data);
                    }else{
                        that.SET_USERINFO({isVip:0});
                    }
                })
            },
            countDown(time){
                let that = this;
                let t = getCookie('t');
                // 定时同步清空store用户信息
                    let remainingTime = t?4*60*60*1000 - (Date.parse(new Date()) - t):4*60*60*1000;
                    if(time == 0){
                        remainingTime = 0
                    }
                    // console.log(remainingTime);
                    that.loginTimer = setTimeout(() => {
                        // 缓存到期，用户数据初始化
                        delCookie('p');
                        delCookie('pm');
                        delCookie('t');
                        delCookie('pc');
                        if(time == 0){
                            delCookie('ql');
                        }
                        that.SET_USERINFO(
                            {
                                avatar: require('@imgs/home/avatar@2x.png'),
                                token: '',
                                userInformation: '',
                                phone: '',
                                phoneMask: '',
                                phoneShow: '',
                                phoneMaskShow: '',
                                timestamp: '',
                                provinceCode: null,
                                iswhite:0,
                                isVip:'',
                                expireTime:'',
                                cancelFlag:'',
                                hasNewGift:'',
                                vipTypeTag:['全网会员','5G高级会员'],
                                vipLevelTag:['普通','黄金','铂金'],
                                vipType:'',
                                vipLevel:'',
                                effectTime:'',
                                returnOrderId:'',
                                effect:'',
                                effectDaysBefore:''
                            }
                        );
                        console.log('转为未登录')
                    }, remainingTime);
            },
            checkLogin(type){
                let that = this;
                let sign = that.$route.query.sign ? that.$route.query.sign : getQuery('sign');
                if(sign){//单点登录(不管是否有“已登录”的状态缓存)
                    signLogin({
                        phone:that.userInfo.phone,
                        sign:sign,
                        mobileSign:''
                    }).then(res => {
                        if(res.data.resultCode == 0){
                            // 单点登录成功，更新用户信息
                            that.SET_USERINFO(res.data.data);
                            // cookie缓存登录状态
                            setCookie('p',encodeURIComponent(res.data.data.phone));
                            setCookie('pm',res.data.data.phoneMask);
                            setCookie('t',Date.parse(new Date()));
                            setCookie('pc',res.data.data.provinceCode);
                            setCookie('pnsign',res.data.data.pnsign);
                            messageBus.$emit('msg_countDown');
                            messageBus.$emit('msg_check_resetbannerData2');
                            messageBus.$emit('msg_loginCheck');
                        }else {
                            messageBus.$emit('msg_loginFail');
                        }
                    });
                }else{
                    //检测是否登录状态
                    let p = decodeURIComponent(getCookie('p'));
                    let pm = getCookie('pm');
                    let t = getCookie('t');
                    let pc = getCookie('pc');
                    let pnsign = getCookie('pnsign');
                    if (p && pm && t && pc) {//已登录状态
                        // 读取缓存，更新用户信息
                        that.SET_USERINFO({
                            phone:p,
                            phoneMask:pm,
                            timestamp:t,
                            provinceCode:pc,
                            pnsign: pnsign
                        });
                        messageBus.$emit('msg_countDown');
                    } else {//非登录状态,自动取号
                        window.getPhoneNum(function(info) {//取号成功获得phone,phoneMask，等待用户点击一键登录时再触发真正的登录请求
                            if (info) {
                                let obj = {};
                                obj.phoneShow = info.phone;
                                obj.phoneMaskShow = info.phoneMask;
                                that.SET_USERINFO(obj);
                            }
                            if(type == 'quick'){
                                console.log('唤起检测-自动取号-弹窗登录');
                                // 先判断是否30分钟内曾弹出过登录窗，若是，则不弹出
                                if(!getCookie('ql') && (that.$route.name == 'home' || that.$route.name == 'vipBenefit')){
                                    setCookie('ql','true',30);
                                    messageBus.$emit('msg_updatePlan');
                                    that.SET_SHOWQUICKLOGIN(true);
                                }
                            }else if(type == 'init'){
                                console.log('唤起检测-自动取号-页面登录');
                                that.$router.replace({name: 'login'});
                            }else{
                                console.log('唤起检测-自动取号')
                            }
                        });
                    }
                }
            },
            share(data) {
                window.wx.ready(function () {
                    window.wx.onMenuShareAppMessage({
                        title: data.name, // 分享标题
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
        },
        mounted(){
            window.addEventListener('offline', ()=>{
                // 网络由正常常到异常时触发
                sessionStorage.locationUrl=window.location.href;
                this.$router.replace('/networkError')
            });
            window.addEventListener('online',()=>{
                window.location.href=sessionStorage.locationUrl
            });
        },
        beforeDestroy: function () {
            messageBus.$off(['msg_checkLogin', 'msg_showPopup','msg_countDown','msg_getVipInfo']);
        }
    }
</script>
<style lang="less">
#app {
    font-family: Source Han Sans CN,'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

html, body {
    padding: 0;
    margin: 0;
}
body{
    font-size: .3em;
}
</style>
