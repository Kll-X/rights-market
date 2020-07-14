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
    import {getWxconfig,assertionQryUID} from '@/api/common';
    import {is_weixin,getQuery} from '@/utils/func'
    import {signLogin} from '@/api/login'
    import {myVip} from '@/api/vipbenefit';
    import {actSignLogin} from '@/api/custompage.js';
    import { NEWVIPGIFT } from '@/utils/constant'



    export default {
        data(){
            return {
                popupInfo: {
                    flag: false,
                    loginTimer:null,
                },
                st_login:true
            }
        },
        created(){
            let channelCode = getQuery('channelCode');
            let selfChannelCode = getQuery('selfChannelCode');
            let locationCode = getQuery('location') || this.$route.query.location;
            channelCode && this.SET_CHANNEL(channelCode);
            selfChannelCode && this.SET_SELFCHANNEL(selfChannelCode);
            locationCode && this.SET_SYSINFO({
                locationCode: locationCode
            });
            messageBus.$on('msg_checkLogin',(type,noGetPhoneNum)=>{
                this.checkLogin(type,noGetPhoneNum)
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
            this.checkRouteToLogin();
            //微信分享相关
            if (is_weixin()) {
                getWxconfig({
                    url: location.href.split('#')[0]
                }).then(res => {
                    let debug = false;
                    if (res.data.resultCode === 0) {
                        res = res.data.data;
                       window.console.log(res);
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
                        // const shareData = {
                        //     title: "中国移动权益超市来啦",
                        //     desc: "你知道的会员、你不知道的划算权益，都在这里，速点！",
                        //     link: location.origin + '/' + location.hash,
                        //     imgUrl: location.origin + '/imgs/pro/share.png',
                        // }
                        // that.share(shareData);
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
                n &&  this.getVipInfo()
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
                'SET_SYSINFO',
                'SET_SELFCHANNEL'
            ]),
            checkRouteToLogin(){
                if(this.$route.name == 'home'){
                    messageBus.$emit('msg_checkLogin','quick');
                }else if(this.$route.name == 'vipBenefit'){
                    // messageBus.$emit('msg_checkLogin','quick')
                }else{
                    // 其他页面只检测-自动取号
                    messageBus.$emit('msg_checkLogin')
                }
            },
            checkTypeLogin(type){
                let that = this;
                if(!that.userInfo.phone){// 要在没登录的情况下才执行下面逻辑
                    if(type == 'quick'){
                   window.console.log('唤起检测-弹窗登录');
                    // 先判断是否30分钟内曾弹出过登录窗，若是，则不弹出
                    if((!getCookie('ql') && that.$route.name == 'home') || that.$route.name == 'vipBenefit'){
                        setCookie('ql','true',30);
                        messageBus.$emit('msg_updatePlan');
                        that.SET_SHOWQUICKLOGIN(true);
                    }
                    }else if(type == 'init'){
                       window.console.log('唤起检测-页面登录');
                        that.$router.replace({name: 'login'});
                    }else{
                       window.console.log('唤起检测-已尝试自动取号')
                    }
                }
            },
            getVipInfo(){
                let that = this;
                myVip({
                    proId:NEWVIPGIFT.proId,
                    salesId:NEWVIPGIFT.salesId,
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
            countDown(time=4){
               window.console.log(time)
                let that = this;
                let t = getCookie('t');
                // 定时同步清空store用户信息
                    if(this.sysInfo.channel == 'st' && time != 0){
                        time = 0.5
                    }
                    let remainingTime = t?time*60*60*1000 - (Date.parse(new Date()) - t):time*60*60*1000;
                    if(time == 0){
                        remainingTime = 0
                    }
                    //window.console.log(remainingTime);
                    that.loginTimer = setTimeout(() => {
                        // 缓存到期，用户数据初始化
                        delCookie('p');
                        delCookie('pm');
                        delCookie('t');
                        delCookie('pc');
                        delCookie('pnsign');
                        delCookie('uid');
                        if(time == 0){
                            delCookie('ql');
                        }
                        that.SET_USERINFO(
                            {
                                id:'',
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
                                orderId:'',
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
                       window.console.log('转为未登录')
                    }, remainingTime);
            },
            checkLogin(type,noGetPhoneNum=false){
                let that = this;
                //检测是否登录状态
                let p = getCookie('p')?decodeURIComponent(getCookie('p')):'';
                let pm = getCookie('pm');
                let t = getCookie('t');
                let pc = getCookie('pc');
                let pnsign = getCookie('pnsign');
                let uid = getCookie('uid');
                let iswhite = getCookie('iswhite');
                let sign = that.$route.query.sign ? that.$route.query.sign : getQuery('sign');
                let actsign = that.$route.query.actSign ? that.$route.query.actSign : getQuery('actSign');
                actsign = actsign?decodeURIComponent(actsign):actsign;
                if(that.sysInfo.channel == 'st'){//是手厅就走一次单点登录，防止用户要换号码
                    console.info('手厅',type);
                    if(that.st_login){
                        console.info('st_login',that.st_login);
                        that.st_login = false;
                        window.leadeon.getUserInfo({
                            debug:false,
                            success: function(res1) {
                                console.info('getUserInfo_success',res1);
                                let token = res1.token;
                                // 获取明文uid 
                                function getUid(token) { 
                                    return token.match(/UID=\w+/g)[0]; 
                                }
                                if(!res1.phoneNumber) {
                                    //没有手机，app没登录，删除页面存在的登录信息
                                    console.info("没有手机，app没登录，删除页面存在的登录信息");
                                    messageBus.$emit('msg_countDown',0);
                                } else {
                                    let uid;
                                    if(token){
                                        uid = getUid(token).slice(4);
                                    } 
                                    //有手机号，当前app处于登录状态，需要判断是否跟页面缓存手机号相等，同步信息
                                    console.info("有手机号，当前app处于登录状态，需要同步信息")
                                    //手机号不相等，则需要更改页面的登录信息，检测会话uid是否有效
                                    console.info("需要更改页面的登录信息，检测会话uid是否有效")
                                    window.leadeon.checkUID({
                                        debug:false,
                                        domain:window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''),
                                        chanelId:"12111",
                                        success:function(res1){//传给后端uid
                                            console.info('checkUID_success');
                                            assertionQryUID({
                                                phone:that.userInfo.phone,
                                                uid:res1.uid
                                            }).then((res)=>{
                                                if(res.data.resultCode == 0){//单点登录成功
                                                    if(res.data.data){
                                                        console.info('assertionQryUID_success');
                                                        // 单点登录成功，更新用户信息
                                                        that.SET_USERINFO(Object.assign({},res.data.data,{uid:uid,iswhite:iswhite}));
                                                        // cookie缓存登录状态
                                                        setCookie('p',encodeURIComponent(res.data.data.phone));
                                                        setCookie('pm',res.data.data.phoneMask);
                                                        setCookie('t',Date.parse(new Date()));
                                                        setCookie('pc',res.data.data.provinceCode);
                                                        setCookie('pnsign',res.data.data.pnsign);
                                                        setCookie('uid',uid);
                                                        messageBus.$emit('msg_countDown');
                                                        messageBus.$emit('msg_resetBanner2');
                                                        messageBus.$emit('msg_loginCheck');                                                    
                                                    }
                                                }else{//没单点登录成功
                                                    console.info('assertionQryUID_fail');
                                                    messageBus.$emit('msg_loginFail');
                                                }
                                            })
                                        },
                                        error: function(res) {
                                            console.info('checkUID_error',JSON.stringify(res));
                                            messageBus.$emit('msg_loginFail');
                                        }
                                    })
                                }
                            },
                            error: function() {
                                console.info('getUserInfo_error');
                            }
                        })
                    }else{
                        console.info('st_login',that.st_login);
                        if(!(p && pm && t && pc)){// 没登录
                            console.info('p && pm && t && pc == false,没登录');
                            window.leadeon.showLogin({
                                debug: false,
                                urlType: '3' ,//1为本网地址；2为异网地址；3为同时支持本网和异网地址；（url有值时urlType必填）-5.3新加
                                success: function(res) {
                                    console.info('showLogin_success',res);
                                },
                                error: function(err) {
                                    console.info('showLogin_err',err);
                                    messageBus.$emit('msg_loginFail');
                                }
                            })
                        }
                    }
                }else if(sign){//sign单点登录，防止用户要换号码(不管是否有“已登录”的状态缓存)
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
                            messageBus.$emit('msg_resetBanner2');
                            messageBus.$emit('msg_loginCheck');
                        }else {
                            messageBus.$emit('msg_loginFail');
                        }
                    });
                }else if(actsign){
                    actSignLogin({
                        phone: that.userInfo.phone,
                        actSign: actsign
                    }).then(res=>{
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
                            messageBus.$emit('msg_resetBanner2');
                            messageBus.$emit('msg_loginCheck');
                        } else {
                            messageBus.$emit('msg_loginFail');
                        }
                    })
                }else{
                    if (p && pm && t && pc) {//已登录状态
                        // 读取缓存，更新用户信息
                        that.SET_USERINFO({
                            phone:p,
                            phoneMask:pm,
                            timestamp:t,
                            provinceCode:pc,
                            pnsign: pnsign,
                            uid: uid,
                            iswhite:iswhite
                        });
                        messageBus.$emit('msg_countDown');
                    } else {//非登录状态,自动取号
                        if(noGetPhoneNum){
                           window.console.log('唤起检测-不取号-登录');
                            that.checkTypeLogin(type)
                        }else{
                            window.getPhoneNum(function(info) {//取号成功获得phone,phoneMask，等待用户点击一键登录时再触发真正的登录请求
                                if (info) {
                                    let obj = {};
                                    obj.phoneShow = info.phone;
                                    obj.phoneMaskShow = info.phoneMask;
                                    that.SET_USERINFO(obj);
                                }
                                that.checkTypeLogin(type)
                            });
                        }
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
                           window.console.log()
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
               window.console.log('offline',sessionStorage.locationUrl)
                this.$router.replace('/networkError')
            });
            window.addEventListener('online',()=>{
                if(sessionStorage.locationUrl){
                   window.console.log('online',sessionStorage.locationUrl)
                    window.location.href=sessionStorage.locationUrl;
                }
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
