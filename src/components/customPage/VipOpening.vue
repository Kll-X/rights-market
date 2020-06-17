<template>
    <div class="vip-opening">
        <div class="part-crazy" v-if="showTimeFlag">
            <div class="title">年卡5折&nbsp;&nbsp;&nbsp;&nbsp;限时狂欢</div>
            <div class="content">
                <CarzyAppCard v-for="item in applist_crazy" :key="item.title" :info="item" @order="orderHandler(item,false,false,true)"></CarzyAppCard>
            </div>
        </div>
        <div class="tips" :class="!showTimeFlag?'tips-outdate':''">
            <img @click="tipsHandler" :class="userInfo.isVip?'tips-getrights':'tips-openvip'" :src="tipsSrc" alt="">
        </div>
        <div class="part-new" :class="!showTimeFlag?'margin-top56':''">
            <div class="title">
                <span>新人礼包</span><span class="tips-vip">会员专享</span>
            </div>
            <div class="content">
                <div class="reward" @click="gotoReward(item.link,index)" v-for="(item,index) in newRewards" :key="item.title">
                    <div class="reward-title">
                        <img :src="item.title" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="part-nine">
            <div class="title">
                <span>会员9元购</span><span class="tips-vip">限购1款</span>
            </div>
            <div class="content">
                <BarAppCard class="appcard" v-for="item in applist_nine" :key="item.title" :info="item" @order="orderHandler(item)"></BarAppCard>
            </div>
        </div>
        <div class="part-discount">
            <div class="title">
                <span>会员5折购</span><span class="tips-vip">每月1款</span>
            </div>
            <div class="content">
                <BarAppCard class="appcard" v-for="item in applist_halfprice" :key="item.title" :info="item" @order="orderHandler(item)"></BarAppCard>
            </div>
        </div>
        <SecondConfirmBuy :info="SecondConfirmInfo"></SecondConfirmBuy>
        <div class="toast" :class="'type'+toast.type" v-if="toast.show">
            <div class="content" :style="toast.contentStyle">
                <div v-if="toast.type == 4" class="btn-close-gray" @click="toast.show=false"></div>
                <div>
                    <img v-if="toast.icon" :src="toast.icon" alt="">
                </div>
                <div v-html="toast.tips" class="toast-tips" :style="toast.tipsStyle">
                </div>
                <div v-if="toast.type == 1" class="btn-gotolink" @click="gotolink(toast.link)">
                    {{toast.linkTxt}}
                </div>
                <div v-if="toast.type == 2" class="btns-confirm">
                    <div class="cancel" @click="toast.show=false">{{toast.cancel||'取消'}}</div>
                    <div class="confirm" @click="toast.handlerConfirm()">{{toast.confirm ||'确定'}}</div>
                </div>
                <div v-if="toast.type == 3" class="btns-confirm" style="margin-top:.3rem;">
                    <span class="btn-primary" @click="toast.show=false">{{toast.closeTxt||'取消'}}</span>
                </div>
            </div>
            <div v-if="toast.type == 0" class="btn-close" @click="toast.show=false"></div>
        </div>
        <div class="rules" @click="showRules">
            活动规则
        </div>
    </div>
</template>
<script>
    import CarzyAppCard from '@/components/common/AppCard4'
    import BarAppCard from '@/components/common/AppCard5'
    import SecondConfirmBuy from '@/components/common/SecondConfirmBuy'
    import {APPLIST_VIPOPENING,APPLIST_VIPOPENING_NINE,AID_VIPOPENING,VIPORDER,STATISTICS_ACTIVITY} from '@/utils/constant'
    import { mapState,mapMutations } from 'vuex'
    import { getData } from "@/api/halfprice";
    import { Toast } from 'vant';
    import {myVip} from '@/api/vipbenefit';
    import {customAnalysis,pvAnalysis} from "@/assets/js/analysis";
    import messageBus from "@/utils/messageBus";

    export default {
        name: "vip-opening",
        data(){
            return{
                applist_crazy:[],
                applist_nine:[],
                applist_halfprice:[],
                newRewards:[
                    {
                        title: require('@imgs/custompage/2/txt_1G.png'),
                        link: {name: 'newGuest'}
                    }, {
                        title: require('@imgs/custompage/2/txt_didi.png'),
                        link: 'https://dev.coc.10086.cn/coc/web/coc2020/couponCollection/'
                    }, {
                        title: require('@imgs/custompage/2/txt_qinju.png'),
                        link: 'https://dev.coc.10086.cn/coc/web/coc2020/couponCollection/'
                    }, {
                        title: require('@imgs/custompage/2/txt_58.png'),
                        link: 'https://dev.coc.10086.cn/coc/web/coc2020/couponCollection/'
                    }, {
                        title: require('@imgs/custompage/2/txt_jinjiang.png'),
                        link: 'https://dev.coc.10086.cn/coc/web/coc2020/couponCollection/'
                    }, {
                        title: require('@imgs/custompage/2/txt_yuetu.png'),
                        link: 'https://dev.coc.10086.cn/coc/web/coc2020/couponCollection/'
                    }
                ],
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
                showTimeFlag: true
            }
        },
        created(){
            document.title = '权益超市618开幕节';
            this.applist_crazy = APPLIST_VIPOPENING;
            if(new Date().getTime()>new Date('2020/6/23').getTime()){
                this.showTimeFlag = false;
            }
            this.applist_nine = APPLIST_VIPOPENING_NINE;
            getData().then(res=>{
                let list = res.data.data;
                list.forEach(item => {
                    item.icon = this.Common.getImgUrl(item.icon)
                })
                this.applist_halfprice = list;
            })
            pvAnalysis(STATISTICS_ACTIVITY["618"].activityId);
        },
        methods:{
            ...mapMutations([
                'SET_USERINFO',
            ]),
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
                            order.isVipOrder = true;
                            that.orderHandler(order,true,true);
                        }
                    })
                    return;
                }
                if(order.date){
                    if(new Date().getTime()<new Date(order.startdate).getTime()){
                        Toast.fail('活动尚未开始');
                        return;
                    }
                    if(new Date().getTime()>new Date(order.expiredate).getTime()){
                        Toast.fail('已过期');
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
                        dealType: 0,
                        isPay: 1,
                        payType: 10,
                        amount: order.price,
                        orderWay: '1',//话费支付单次点播
                        aid: AID_VIPOPENING
                    }
                }
                this.SecondConfirmInfo.orderObject.phone = this.userInfo.phone
                this.SecondConfirmInfo.orderObject.phoneMask = this.userInfo.phoneMask
                this.SecondConfirmInfo.paydetailList = data;
                this.SecondConfirmInfo.payShow = true;
                this.SecondConfirmInfo.callback = res =>{
                    that.SecondConfirmInfo.payShow = false;
                    if (res.resultCode == 0) {
                        customAnalysis(STATISTICS_ACTIVITY["618"].activityId,STATISTICS_ACTIVITY["618"].key_sales,order.saleid);
                        that.showToast({
                            tips:`<div style="text-align: center"><div style="color:#fc7074;font-size:1.2em">产品受理成功!</div><div>订单已受理</div><div>开通结果以短信为准</div><div style="font-size:.65em;">您可前往"移动花卡"微信公众号-权益-权益超市-"我的订单"查看开通结果</div></div>`,
                            closeTxt: '返回活动页面',
                            type: 3,
                            icon: require("@imgs/custompage/2/tips_success.png"),
                        })
                        if (isVipOrder) {
                            that.getVipInfo();
                        }
                    } else if(res.resultCode == -137){
                        that.showToast({
                            tips:`<div style="text-align: center"><div>尊敬的会员用户</div><div>本次活动优惠已达上限，</div><div>更多会员权益，请点击查看</div></div>`,
                            type: 1,
                            linkTxt:'查看更多会员权益',
                            link: {name:'vipBenefit'},
                            icon: require("@imgs/custompage/2/tips_fail.png"),
                        })
                    }else{
                        Toast.fail({message: res.msg, duration: 4000});
                    }
                }
            },
            tipsHandler(){
                if(!this.userInfo.isVip) {
                    let order;
                    order = Object.assign({},VIPORDER);
                    order.name = '黄金会员订购';
                    order.channelCode = this.sysInfo.channelCode;
                    order.isVipOrder = true;
                    this.orderHandler(order,true,true);
                }
            },
            checkLogin(){
                if(!this.userInfo.phone){
                    Toast.fail('请先登录');
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
            showRules(){
                let rules = `<p><b><font>（一）权益订购规则</font></b></p><p>1、用户订购权益产品后，即时生效，月卡产品从订购第1天起算，满30天失效；年卡产品从订购第1天起算，满365天失效，期间无法退订；</p><p>2、用户订购成功后的订单，可在权益超市-订单详情页中查看订单情况；</p><p>3、用户订购成功后，将向手机号码绑定的账户下发权益，权益到账情况可至权益方端内进行查看；</p><p>4、用户订购单款权益产品，权益具体包含内容可至权益方端内进行查看或在权益超市-分类栏目-搜索单款权益-产品详情页查看；</p><p>5、权益超市的会员产品，用户须使用话费订购，暂不支持第三方支付；</p><p>6、24小时内，用户仅可订购3款权益产品；</p><p>7、订购权益时需保证手机号码通信状态正常（无欠费、无停机）且保证账户余额大于权益产品首次费用金额，否则订购将会失败。</p><p>&nbsp;</p><p><b><font>（二）权益超市会员规则</font></b></p><p>1、权益超市<font>黄金</font><font>会员</font>5元/月，使用话费支付，<font>订购立即生效，按月自动续订长期生效</font><font>。</font><font>用户可在会员页面</font><font>发起</font><font>退订</font>, <font>退订次月生效</font><font>。</font></p><p>2、<font>热门权益优惠购</font><font>内容说明：用户每月可享受在会员的精品货架专区，以会员价购买热门权益产品的福利。</font></p><p>3.会员半价购内容：新入会会员，在会员半价购专区内，每月可享受一次半价购的福利。</p><p><span style="color: rgb(0, 0, 0);">&nbsp;</span></p><p><b><font>（三）</font>618开幕活动规则</b></p><p><b><span style="color: rgb(0, 0, 0);">1、限时狂欢-年卡五折</span></b><b></b></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>1）共计三款权益产品，限时开展五折活动，用户可选择多款权益订购；</span></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>2）限时时间：单款产品限时时间结束，则用户无法订购；</span></p><p><span style="color: rgb(0, 0, 0);">a</span><span style="color: rgb(0, 0, 0);">.爱奇艺黄金会员年卡-五折：</span><span style="color: rgb(0, 0, 0);">6</span><span style="color: rgb(0, 0, 0);"><font>月</font>18日-6月20日</span></p><p><span style="color: rgb(0, 0, 0);">b.</span><span style="color: rgb(0, 0, 0);"><font>芒果</font>T</span><span style="color: rgb(0, 0, 0);">V</span><span style="color: rgb(0, 0, 0);"><font>会员年卡</font>-五折：</span><span style="color: rgb(0, 0, 0);">6</span><span style="color: rgb(0, 0, 0);"><font>月</font>18日-6月21日</span></p><p><span style="color: rgb(0, 0, 0);">c</span><span style="color: rgb(0, 0, 0);">.</span><span style="color: rgb(0, 0, 0);"><font>优酷视频会员年卡</font>-五折：</span><span style="color: rgb(0, 0, 0);">6</span><span style="color: rgb(0, 0, 0);"><font>月</font>18日-6月22日</span></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>3）年卡五折活动，数量有限，用户先到先得。</span></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>4）所有用户均可参加。</span></p><p><span style="color: rgb(0, 0, 0);">&nbsp;</span></p><p><b><span style="color: rgb(0, 0, 0);">2、新人礼包</span></b><b></b></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>1）仅限权益超市黄金会员用户参加；</span></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>1）1</span><span style="color: rgb(0, 0, 0);">GB</span><span style="color: rgb(0, 0, 0);"><font>日流量，</font></span><font>全国全网通用流量，领取后</font>24小时生效。24小时后未使用部分失效，无法继续使用；</p><p><font>（</font>2）5份优惠券礼包，会员用户均可领取。单个优惠券每个用户限领一次；</p><p><font>（</font>3）优惠券数量根据权益提供方规定，会员用户先到先得。若活动期间内，数量领取完毕，则会员用户无法继续领取。</p><p><font>（</font>4）优惠券的使用规则详见优惠券领取页或各权益方端内使用页面。</p><p><b><span style="color: rgb(0, 0, 0);">3、会员5折购</span></b><b></b></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>1）仅限权益超市黄金会员用户参加；</span></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>2）会员用户可在指定权益中任选1款进行订购，活动期间内仅限订购1款；</span></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>3）因活动推广原因可能进行部分5折购权益的调整，指定权益范围以“618权益超市开幕节”活动页面展示为主；</span></p><p><b><span style="color: rgb(0, 0, 0);">4、会员9元购</span></b><b></b></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>1）仅限权益超市黄金会员用户参加；</span></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>2）会员用户可在指定权益中任选1款进行订购，活动期间内仅限订购1款；</span></p><p><span style="color: rgb(0, 0, 0);"><font>（</font>3）因活动推广原因可能进行部分9元购权益的调整，指定权益范围以“618会员开幕节”活动页面展示为主；</span></p><p><br></p>`;
                this.showToast({
                    type: 4,
                    tips: rules,
                    contentStyle: {
                        width: '70%',
                        margin: '0'
                    },
                    tipsStyle: {
                        height: '60vh',
                        overflow: 'scroll'
                    }
                });
            },
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
            gotoReward(link,index){
                let that = this;
                if(!this.checkLogin()) return;
                if(!this.userInfo.isVip) {
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
                            order.isVipOrder = true;
                            that.orderHandler(order,true,true);
                        }
                    })
                    return;
                }
                customAnalysis(STATISTICS_ACTIVITY["618"].activityId,STATISTICS_ACTIVITY["618"].key_new,index);
                if(typeof link == 'string') {
                    location.href = link + '?pnsign=' + this.userInfo.pnsign
                }else {
                    this.$router.push(link)
                }
            },
            gotolink(link){
                if(typeof link == 'string') {
                    location.href = link;
                }else {
                    this.$router.push(link)
                }
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
        },
        computed:{
            ...mapState([ 
                "userInfo" ,
                "sysInfo"
            ]),
            tipsSrc(){
                return this.userInfo.isVip?require('../../assets/imgs/custompage/2/tips_getRights.png'):require('../../assets/imgs/custompage/2/tips_openvip.png');
            }
        },
        components: {
            CarzyAppCard,
            BarAppCard,
            SecondConfirmBuy
        }
    }
</script>
<style scoped lang='less'>
    .vip-opening{
        background: url("../../assets/imgs/custompage/2/bg.png") center/100% no-repeat;
        height: 36.22rem;
        padding:0 1.5%;
    }
    .part-crazy{
        padding-top: 4.3rem;
        width: 100%;
        .title{
            font-size: .4rem;
            color: #fff450;
            font-weight: bold;
        }
        .content{
            display: flex;
            width: 100%;
            margin:.14rem auto 0 auto;
            padding: .28rem 0;
            border-radius: .1rem;
            justify-content: space-around;
            background-color: #8658ff;
        }
    }
    .tips{
        height: 1.7rem;
        .tips-openvip{
            margin-top: -.15rem;
            width: 72%;
        }
         .tips-getrights{
            margin-top: .15rem;
            width: 66%;
        }
    }
    .tips-outdate{
        position: relative;
        top: 5.1rem;
    }
    .part-new,.part-nine,.part-discount{
        position: relative;
        margin-top: .6rem;
        .title{
            position: absolute;
            top: -.5rem;
            background-image: linear-gradient(to right, rgba(250, 113, 115,1),rgba(250, 113, 115,1) ,rgba(250, 113, 115,0.2),rgba(250, 113, 115,0));
            color: white;
            font-weight: bold;
            font-size: .35rem;
            line-height: .6rem;
            .tips-vip{
                color: rgb(251, 201, 123);
                font-size: .17rem;
                padding-left: .1rem;
            }
        }
    }
    .part-new{
        .content{
            background-color: #8658ff;
            padding: .2rem 3%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            width: 94%;
            margin:0 auto;
            .reward{
                background: url('../../assets/imgs/custompage/2/app_new.png') center/100%;
                width: 2.25rem;
                height: 1.05rem;
                margin: .1rem 0;
                .reward-title{
                    padding-top: .16rem;
                    img{
                        width: 60%;;
                    }
                }
            }
        }
    }
    .part-nine,.part-discount{
        margin-top: 1rem;
        .title{
            background-image: linear-gradient(to right, rgba(246, 129, 220,1),rgba(246, 129, 220,1) ,rgba(246, 129, 220,0.2),rgba(246, 129, 220,0));  
        }
        .content{
            background-color:white;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: .22rem 0 .15rem 0;
            .appcard{
                margin: .13rem 0;
            }
        }
    }
    .toast{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background-color: rgba(0,0,0,.6);
        display: flex;
        justify-content: center;
        align-items: center;
        .content{
            background-color: white;
            width: 3.96rem;
            padding: .6rem .4rem;
            border-radius: .2rem;
            position: relative;
            .toast-tips{
                text-align: left;
                line-height: .46rem;
            }
            .btn-close-gray{
                width: 0.2rem;
                height: 0.2rem;
                background: url('../../assets/imgs/icon_close.png') center/100% no-repeat;
                position: absolute;
                top: .2rem;
                right: .2rem;
            }
            .btn-gotolink{
                display: inline-block;
                padding: .12rem .28rem;
                background-color: #f97637;
                font-size:.36rem;
                font-weight:400;
                line-height:.46rem;
                color: white;
                margin-top: .6rem;
            }
            .btns-confirm{
                .confirm{
                    display: inline-block;
                    margin-left: .25rem;
                    width: 1.98rem;
                    height: .59rem;
                    line-height: .59rem;
                    color: white;
                    background-color: #fc7074;
                }
                .cancel{
                    display: inline-block;
                    width: 1.98rem;
                    height: .59rem;
                    line-height: .59rem;
                    color: white;
                    background-color: #dadada;
                }
            }
            .btn-primary{
                color: white;
                background: #fc7074;
                padding: .1rem .3rem;
            }
        }
        .btn-close{
            width: .83rem;
            height: .83rem;
            background: url('../../assets/imgs/custompage/1/btn_close.png') center/100% no-repeat;
            margin-top: .34rem;
            margin-left: 3.33rem;
        }
    }
    .toast.type2 .content{
        width: 4.21rem;
        padding: .6rem .29rem;
    }
    .margin-top56{
        margin-top: 5.6rem;
    }
    .rules{
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        right: 0;
        top: 3rem;
        width: 1.3rem;
        color: white;
        font-size: .19rem;
        height: .5rem;
        line-height: .5rem;
        border-top-left-radius: .4rem;
        border-bottom-left-radius: .4rem;
    }
</style>