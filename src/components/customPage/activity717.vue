<template>
    <div class="main-wrapper">
        <div class="main bg" :class="isLongPage?'longpage':''">
            <div class="applist">
                <AppCard v-for="item in applist" :key="item.title" :info="item" :customStyle="appcardStyle" @showToast="showToast" @order="orderHandler(item,false,false,true)"></AppCard>
            </div>
            <div class="btn-gohome" @click="$router.push({name:'home'})"></div>
            <div class="btn-rules" @click="showRules"></div>
            <CustomToast :toast='toast'></CustomToast>
            <SecondConfirmBuy :info="SecondConfirmInfo"></SecondConfirmBuy>
        </div>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex';
    import { Toast } from 'vant';
    import AppCard from '@components/common/AppCard.vue';
    import CustomToast from '@components/common/CustomToast.vue';
    import {APPLIST_717,VIPORDER} from '@/utils/constant';
    import SecondConfirmBuy from '@/components/common/SecondConfirmBuy'
    import messageBus from "@/utils/messageBus";
    import { pagelogMixin } from "@/mixins/log"
    export default {
        name: "avctivity717",
        data(){
            return{
                applist:APPLIST_717,
                isLongPage: false,
                toast: {
                    tips: '提示',
                    show: false,
                    type: 0,
                    link: '',
                    linkTxt: '确认',
                    handlerConfirm: '',
                    contentStyle:null,
                    tipsStyle:null
                },
                appcardStyle:{
                    btnOrder: {
                        color:'#47a12a',
                        borderColor: '#47a12a'      
                    },
                    title: {
                        fontSize: '.28rem'
                    },
                    currentPrice: {
                        fontSize: '.34rem'
                    },
                    orginPrice: {
                        fontSize: '.23rem',
                        paddingLeft: '.5rem'
                    },
                    wrapper: {
                        paddingTop: '.14rem',
                        paddingBottom: '.13rem' 
                    }
                },
                SecondConfirmInfo: {
                    payShow: false,
                    paydetailList: {
                        price: '0',
                    },
                    orderObject: {
                        phone: '',
                        phoneMask: ''
                    },
                    callback:''
                },
            }
            
        },              
        mixins: [pagelogMixin],
        components: {
            AppCard,
            SecondConfirmBuy,
            CustomToast
        },
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ])
        },
        created() {            
            if (screen.availHeight/screen.availWidth>=1.78) {
                this.isLongPage = true;
            }
        },
        methods:{
            ...mapMutations([
                'SET_USERINFO'
            ]),
            gotolink(url) {
                window.location.href = url;
            },
            showToast(toast) {
                this.toast = Object.assign({
                    tips: '提示',
                    show: false,
                    type: 0,
                    link: '',
                    linkTxt: '确认',
                    handlerConfirm: '',
                    contentStyle:null,
                    tipsStyle:null
                },toast);
                this.toast.show = true;
            },
            // 立即订购
            orderHandler(order,formatted,isVipOrder,dontneedVip){
                if(!this.checkLogin()) return;
                let that = this;
                if(!this.userInfo.isVip && !isVipOrder && !dontneedVip){
                    that.showToast({
                        tips:'<div style="text-align: center"><div>本次活动仅限</div><div>权益超市黄金会员参加，</div>快去开通会员！</div>',
                        type:2,
                        icon: require("@imgs/custompage/2/tips_info.png"),
                        cancel:'再想想',
                        confirm: '立即开通',
                        handlerConfirm: ()=>{
                            that.toast.show = false;
                            let order;
                            order = Object.assign({},VIPORDER);
                            order.name = '黄金会员订购';
                            order.channelCode = that.sysInfo.channelCode;
                            order.selfChannelCode = that.sysInfo.selfChannelCode;
                            order.isVipOrder = true;
                            that.orderHandler(order,true,true);
                        }
                    })
                    return;
                }
                if(order.date){
                    if(new Date().getTime()<new Date(order.startdate).getTime()){
                        Toast('活动尚未开始');
                        return;
                    }
                    if(new Date().getTime()>new Date(order.expiredate).getTime()){
                        Toast('已过期');
                        return;
                    }
                }
                let data;
                if (formatted){
                    data = order;
                } else {
                    data= {
                        proId: order.proid,
                        name: order.name,
                        salesId: order.saleid,
                        channelCode: this.sysInfo.channelCode ,
                        selfChannelCode: this.sysInfo.selfChannelCode ,
                        dealType: 0,
                        isPay: 1,
                        payType: 10,
                        amount: order.price,
                        orderWay: '1',//话费支付单次点播
                        aid:'20200717001'
                    }
                }
                let secondConfirmType = this.sysInfo.selfChannelCode == '00010017'? 1 : 0;
                this.SecondConfirmInfo.orderObject.phone = this.userInfo.phone
                this.SecondConfirmInfo.orderObject.phoneMask = this.userInfo.phoneMask
                this.SecondConfirmInfo.paydetailList = data;
                this.SecondConfirmInfo.payShow = true;
                this.SecondConfirmInfo.type = secondConfirmType;
                this.SecondConfirmInfo.callback = res =>{
                    if (res.resultCode == 0) {
                        that.SecondConfirmInfo.payShow = false;
                        that.showToast({
                            tips:`<div style="text-align: center"><div style="color:#362BB5;font-size:1.2em">权益受理成功!</div><div>订单已受理</div><div>开通结果以短信为准</div><div style="font-size:.65em;">您可前往"移动花卡"微信公众号-权益-权益超市-"我的订单"查看开通结果</div></div>`,
                            closeTxt: '返回活动页面',
                            closeTxtStyle: {
                                backgroundColor: '#362BB5'
                            },
                            type: 3,
                        })
                        if (isVipOrder) {
                            that.getVipInfo();
                        } 
                    } else if(res.resultCode == -137){
                        that.SecondConfirmInfo.payShow = false;
                        that.showToast({
                            tips:`<div style="text-align: center"><div>尊敬的会员用户</div><div>本次活动优惠已达上限，</div><div>更多会员权益，请点击查看</div></div>`,
                            type: 1,
                            linkTxt:'查看更多会员权益',
                            link: {name:'vipBenefit'},
                            icon: require("@imgs/custompage/2/tips_fail.png"),
                        })
                    }else{
                        Toast({message: res.msg, duration: 4000});
                    }
                }
            },
            checkLogin(){
                if(!this.userInfo.phone){
                    Toast('请先登录');
                    let backUrl = encodeURIComponent(this.$route.fullPath);
                    if(this.sysInfo.channel == 'st'){
                        messageBus.$emit('msg_checkLogin','init');
                    }else{
                        this.$router.replace({name: 'login', query: {'backUrl': backUrl}});
                    }
                    return false;
                }else {
                    return true;
                }
            },
            showRules() {
                this.showToast({
                    tips: '1.活动时间：7月17日-7月19日；</br>2.共计3款产品（爱奇艺黄金VIP会员季卡、爱奇艺黄金VIP会员半年卡、爱奇艺黄金VIP会员年卡），限时开展五折活动，用户可选择多款权益订购；</br>3.仅限移动用户通过本活动页参与，非个人客户（行业卡、物联网卡等）、欠费客户、余额不足的预付费客户、信用额度不足的后付费客户不能参与；</br>4.用户订购权益产品后，即时生效，期间无法退订；</br>5.用户订购成功后的订单，可在已有的权益超市-订单详情页中查看订单情况；</br>6.用户订购成功后，将向手机号码绑定的账户下发权益，权益到账情况可至权益方端内进行查看；</br>7.用户使用话费订购权益产品，暂不支持第三方支付；</br>8.24小时内，用户仅可订购3款权益产品。',
                    contentStyle: {
                        padding: '.3rem .26rem',
                        width: '5.5rem',
                        maxHeight: '70vh',
                        overflow: 'scroll',
                    },
                    tipsStyle: {
                        textAlign: 'justify',
                        fontSize: '.26rem',
                        color: '#1A1A1A',
                        lineHeight: '.44rem'
                    }
                })
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang='less'>
.main-wrapper{
    min-height: 100vh;
    background: url("../../assets/imgs/custompage/3/bg_pure.png") center/100%;
}
.main{
    position: relative;
    width: 100%;
    height: 13.34rem;
    font-size:.3rem;
    color:rgba(53,53,53,1);
    .applist{
        margin: 0 .62rem .67rem .62rem;
        padding-top: 5.9rem;
        height: 4rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .btn-rules{
        position: absolute;
        right: 0;
        top: 4.7rem;
        width: 1.58rem;
        height: .5rem;
        background: url("../../assets/imgs/custompage/3/btn_rules.png") center/100% no-repeat;
    }
    .btn-gohome{
        width: 4.66rem;
        height: .9rem;
        margin:0 auto;
        background: url("../../assets/imgs/custompage/3/btn_gohome.png") center/100% no-repeat;
    }
}
.bg{
    background: url('../../assets/imgs/custompage/3/bg.png') center/100% no-repeat;
}
.longpage{
    background-image: url('../../assets/imgs/custompage/3/bg_long.png');
    height: 16.23rem;
    .applist{
        padding-top: 7rem;
        height: 5rem;
        margin-bottom: 1rem;
    }
}
</style>