<template>
    <div class="main bg">
        <div class="applist">
            <AppCard v-for="item in applist" :key="item.title" :info="item" @showToast="showToast" @order="orderFunc"></AppCard>
        </div>
        <div class="btn-rules" @click="showRules"></div>
        <div class="toast" :class="'type'+toast.type" v-show="toast.show">
            <div class="content" :style="toast.contentStyle">
                <div v-html="toast.tips" class="toast-tips" :style="toast.tipsStyle">
                </div>
                <div v-if="toast.type == 1" class="btn-gotolink" @click="gotolink(toast.link)">
                    {{toast.linkTxt}}
                </div>         
                <div v-if="toast.type == 2" class="btns-confirm">
                    <div class="cancel" @click="toast.show=false">取消</div>
                    <div class="confirm" @click="toast.handlerConfirm()">确定</div>
                </div>
            </div>
            <div v-if="toast.type == 0" class="btn-close" @click="toast.show=false"></div>
        </div>
        <!-- 二次确认蒙版 -->
        <van-popup class="overlay-popup"
            v-model="payShow"
            position="bottom">
            <img class="close-popup" @click="payShow = false"
                src="@imgs/goodsdetail/close-popup.png" alt="">
            <div class="popup-title">产品订购</div>
            <div class="popup-price">¥
                <span>{{((paydetailList.price)/100).toFixed(2)}}</span>
            </div>
            <div class="popup-input">
                <div class="popup-ipt">
                    <van-cell-group>
                        <van-field v-model="phoneNumber" readonly placeholder="请输入您的订购号码" />
                    </van-cell-group>
                </div>
                <div class="popup-ipt">
                    <van-field
                        v-model="orderObject.smsCode"
                        center
                        clearable
                        maxlength="6"
                        type="digit"
                        placeholder="请输入验证码">
                        <van-button slot="button" size="small" type="default" :disabled="coutdownShow"
                            @click="getSms">
                            <span v-show="!coutdownShow">获取验证码</span>
                            <span v-show="coutdownShow">{{ coutdownTime }}s</span>
                        </van-button>
                    </van-field>
                </div>
            </div>
            <div class="popup-btn submit" @click="submitBtn">确认支付</div>
        </van-popup>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex';
    import { Toast } from 'vant';
    import { setCookie } from "@/utils/cookie";
    import {getListRights,checkRules,actSignLogin,placeActOrder} from '@/api/custompage.js';
    import { sendSmsCode} from "@/api/goodsdetail";
    import AppCard from '@components/common/AppCard3.vue';
    import messageBus from "@/utils/messageBus";
    import {APPLIST_CHAODIGOU,STATISTICS_ACTIVITY} from '@/utils/constant';
    import {pvAnalysis} from '@/assets/js/analysis';
    export default {
        name: "chaodigou",
        data(){
            return{
                applist:APPLIST_CHAODIGOU,
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
                payShow: false,
                // 计时器参数
                coutdownShow: false,
                coutdownTime: 60,
                //产品详情列表
                paydetailList: {
                    price: '0',
                },
                // 产品订购对象
                orderObject: {
                    mobile: '',
                    smsCode: '',
                },
                phoneNumber: ''
            }
            
        },              
        components: {
            AppCard
        },
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ])
        },
        created() {
            if (!this.$route.query.actSign) {
                this.reLogin();
                return;
            }
            actSignLogin({
                phone: this.userInfo.phone,
                actSign: this.$route.query.actSign
            }).then(res=>{
                if(res.data.resultCode == 0){
                    // 单点登录成功，更新用户信息
                    this.SET_USERINFO(res.data.data);
                    // cookie缓存登录状态
                    setCookie('p',encodeURIComponent(res.data.data.phone));
                    setCookie('pm',res.data.data.phoneMask);
                    setCookie('t',Date.parse(new Date()));
                    setCookie('pc',res.data.data.provinceCode);
                    setCookie('pnsign',res.data.data.pnsign);
                    setCookie('iswhite',res.data.data.iswhite);
                    messageBus.$emit('msg_countDown');

                    this.phoneNumber = this.userInfo.phoneMask;
                    this.orderObject.mobile = this.userInfo.phone;
                    getListRights({
                        phone: this.userInfo.phone,
                    },{
                        channelcode: process.env.VUE_APP_BUILD == 'production'? '67043':'67047'
                    }).then(res=>{
                        this.filterCanOrder(this.applist,res.data.data)
                    })
                    if (!res.data.data.medalType) {
                        this.showToast({
                            tips: '订购优惠价权益产品，需先认证移动勋章。',
                            type: 1,
                            link: process.env.VUE_APP_BUILD=='production'?'https://shop.10086.cn/zhuanqu/anniversary/index.html#/equity/index':'https://shop.10086.cn/zhuanqu/test/anniversary/index.html#/equity/index',
                            linkTxt: '立即认证'
                        })
                    }
                } else {
                    this.reLogin();
                }
            })
            //pv、uv统计
            if (process.env.VUE_APP_BUILD == 'production') {
                pvAnalysis(STATISTICS_ACTIVITY[517].activityId);
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
            // 倒计时方法
            coutdownFunc() {
                if (this.coutdownTime == 0) {
                    this.coutdownShow = false;
                    this.coutdownTime = 60;
                    return;
                }
                this.coutdownTime--;
                setTimeout(() => {
                    this.coutdownFunc();
                }, 1000);
            },
            // 立即订购
            orderFunc(appinfo) {
                checkRules({
                    phone:this.userInfo.phone
                },{
                    "channelcode":process.env.VUE_APP_BUILD == 'production'? '67043':'67047',
                    "salesid": appinfo.salesid
                }).then(res=>{
                    if (res.data.resultCode == 0) {
                        // 判断是否登录
                        if (!this.phoneNumber) { // 跳转到登录页面
                            this.reLogin();
                        } else {
                            // 弹出二次确认框
                            this.paydetailList.saleid = appinfo.salesid;
                            this.paydetailList.name = appinfo.title;
                            this.paydetailList.price = appinfo.currentPrice;
                            this.paydetailList.proid = appinfo.proid;
                            this.payShow = true;
                        }
                    } else if (res.data.resultCode == -1030) {
                        this.showToast({
                            tips: '&nbsp;&nbsp;&nbsp;&nbsp;很遗憾，活动期间您已购买5款权益产品，购买次数已达上限，详情参考活动说明。'
                        })
                    } else if (res.data.resultCode == -1021) {
                        this.showToast({
                            tips: '&nbsp;&nbsp;&nbsp;&nbsp;活动期间，同款权益只能购买一次,您可选择其他权益购买,详情参考活动说明。'
                        })                
                    } else if (res.data.resultCode == -118) {
                        this.showToast({
                            tips: '&nbsp;&nbsp;&nbsp;&nbsp;很遗憾，您今日购买次数已达上限，可24小时后继续前来选购，详情参考活动说明。'
                        })
                    }
                })
    
            },
            // 获取验证码
            getSms() {
                let that = this;
                sendSmsCode({mobile: this.orderObject.mobile}).then((response) => {
                    if (response.data.code == 0) {
                        // 倒计时逻辑
                        that.coutdownShow = true;
                        that.coutdownFunc();
                    } else {
                        Toast(response.data.msg);
                        // this.$router.replace({name: 'goodsDetail', params: {mid: this.mid, proid: this.paydetailList.proid, saleid: this.paydetailList.saleid}});
                        // let backUrl = encodeURIComponent(this.$route.fullPath + '?autobuy=true');
                        // this.$router.replace({name: 'login', query: {'backUrl': backUrl}});
                    }
                })
            },
            // 购买的方法
            submitBtn() {
                let that = this;
                // 短信码不能为空
                if (this.orderObject.smsCode == ''){
                    Toast('请输入验证码');
                    return false;
                }
                // 短信码六位数校验
                if (this.orderObject.smsCode.length != 6){
                    Toast('请输入六位验证码');
                    return false;
                }
                // 如果手机号为空，则跳转到登录页
                if (this.orderObject.mobile == '') {
                    this.reLogin();
                    return false;
                }
                const toast = Toast({
                    message: '订购中...',
                    forbidClick: true,
                    duration: 0,
                });
                // 校验短信验证码
                let headers = {'phone': this.orderObject.mobile};
                let data = {
                    proId: this.paydetailList.proid,
                    name: this.paydetailList.name,
                    salesId: this.paydetailList.saleid,
                    channelCode: this.sysInfo.channelCode ,
                    dealType: 0,
                    isPay: 1,
                    payType: 10,
                    amount: this.paydetailList.price,
                    orderWay: '1',//话费支付单次点播
                    smsCode: this.orderObject.smsCode,
                }
                placeActOrder(data, headers).then((r) => {
                    toast.clear();
                    if (r.data.resultCode == 0) {
                        that.$router.push({name: 'myOrder', params: {type:'all'}});
                    } else {
                        Toast({message: r.data.msg, duration: 4000});
                    }
                }).catch(() => {
                    toast.clear();
                })
            },
            showRules() {
                this.showToast({
                    tips: '活动说明</br>1.凡在2020.6.30之前,获得移动20周年认证勋章的用户, 2020.5.17-2020.7.31期间均可在该活动页面,任选5款优惠价权益产品进行购买,同款权益产品限购买一次,24小时内限购一款；</br>2.订购权益产品后,您将会收到订购短信提醒,还请实时关注；</br>3.订购权益产品后,即时生效,从订购第1天起算,满30天失效。',
                    contentStyle: {
                        marginTop: '2.9rem',
                        padding: '.3rem .26rem',
                        width: '4.25rem'
                    },
                    tipsStyle: {
                        textAlign: 'justify'
                    }
                })
            },
            filterCanOrder(currentList,newList) {
                newList.forEach((newItem)=>{
                    currentList.find(item=>{
                        return item.salesid == newItem.salesid;
                    }).exist = newItem.exist;
                })
            },
            reLogin() {
                this.showToast({
                    tips: '登录失败请尝试重新登录',
                    type: 1,
                    link: process.env.VUE_APP_BUILD=='production'?'https://shop.10086.cn/zhuanqu/anniversary/index.html#/equity/index':'https://shop.10086.cn/zhuanqu/test/anniversary/index.html#/equity/index',
                    linkTxt: '重新登录'
                })
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang='less'>
.main{
    position: relative;
    width: 100%;
    height: 23.8rem;
    /*font-family:FZZhengHeiS-EB-GB;*/
    font-size:.3rem;
    /*font-weight:400;*/
    color:rgba(53,53,53,1);
    .applist{
        margin: 0 .62rem;
        padding-top: 2.83rem;
    }
    .btn-rules{
        position: absolute;
        right: 0;
        top: .21rem;
        width: 1.35rem;
        height: .56rem;
        background: url("../../assets/imgs/custompage/1/btn_rules.png") center/100% no-repeat;
    }
    .overlay-popup{
            box-sizing: border-box;
            padding: .6rem .35rem .5rem .35rem;
            border-top-left-radius: .16rem;
            border-top-right-radius: .16rem;
            font-size: 0;
            .close-popup{
                position: absolute;
                top: .3rem;
                right: .3rem;
                width: .5rem;
                height: .5rem;
                z-index: 9999;
            }
            .popup-title{
                width: 5.3rem;
                margin: 0 auto;
                font-size: .36rem;
                text-align: center;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .popup-price{
                margin: .4rem 0 .3rem;
                font-size: .36rem;
                span{
                    font-size: .6rem;
                }
            }
            .popup-detail{
                margin-bottom: .6rem;
                .popup-detail-icon{
                    display: inline-block;
                    vertical-align: top;
                    width: 1.2rem;
                    height: 1.2rem;
                    margin-right: .24rem;
                }
                .popup-detail-font{
                    display: inline-block;
                    width: calc(~"100% - 1.44rem");
                    vertical-align: top;
                    .popup-detail-font-con{
                        display: flex;
                        height: 1.2rem;
                        flex-flow: column;
                        align-items: center;
                        text-align: left;
                        color: #0F0B1A;
                        span{
                            flex: 1;
                            width: 100%;
                            display: flex;
                        }
                        .popup-detail-font-name{
                            font-size: .36rem;
                            opacity: .8;
                            align-items: flex-end;
                        }
                        .popup-detail-font-fee{
                            font-size: .3rem;
                            color: #6696FF;
                            opacity: .8;
                            align-items: flex-start;
                        }
                    }
                }
            }
            .popup-radio{
                margin-bottom: .57rem;
                .popup-order-radio{
                    // padding-bottom: .26rem;
                    border-bottom: .01rem solid #d7d9db;
                    margin-bottom: .2rem;
                }
            }
            .popup-input{
                margin-bottom: .69rem;
                .popup-ipt{
                    border-bottom: 1px solid #d7d9db;
                    .van-cell-group{
                        &:after{
                            border-width: 0;
                        }
                    }
                    .van-cell{
                        padding: .25rem 0;
                        font-size: .32rem;
                        .van-field__button{
                            .van-button{
                                padding: 0;
                                margin-right: 0.27rem;
                                border: 0;
                                font-size: .28rem;
                                color: #FD7028;
                            }
                        }
                    }
                }
            }
            .popup-btn{
                width: 6rem;
                height: .88rem;
                line-height: .88rem;
                font-size: .36rem;
                color: #FFF;
                background: #FD7028;
                text-align: center;
                border-radius: 2rem;
                margin: 0 auto;
                transition: opacity .2s;
                &:active{
                    opacity: .8;
                }
            }
            .submit{
                background: #FD7028;
                color: #FFF;
            }
        }
    .toast{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.6);
        .content{
            background-color: white;
            margin: 4.9rem 1.36rem 0 1.36rem;
            width: 3.96rem;
            padding: .6rem .4rem;
            border-radius: .2rem;
            .toast-tips{
                font-family: SourceHanSansCN-Regular;
                text-align: left;
                line-height: .46rem;
            }
            .btn-gotolink{
                display: inline-block;
                padding: .12rem .28rem;
                background-color: #f97637;
                font-size:.36rem;
                font-family:SourceHanSansCN-Regular;
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
                    background-color: #f97637;
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
}
.bg{
    background: url('../../assets/imgs/custompage/1/bg.png') center/100% no-repeat;
}
</style>