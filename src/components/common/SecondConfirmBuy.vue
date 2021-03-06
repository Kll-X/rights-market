<template>
    <div>
        <van-popup v-model="show" lock-scroll closeable :close-on-popstate="true" :close-on-click-overlay="false">
            <div class="white-board">
                <div class="title">
                    {{popupInfo.title}}
                </div>
                <div ref="content" class="content" v-html="popupInfo.content.txt" :style="popupInfo.content.style">
                </div>
            </div>
        </van-popup>
        <van-popup class="overlay-popup"
               v-model="info.payShow"
               position="bottom">
            <img class="close-popup" @click="info.payShow = false"
                src="@imgs/goodsdetail/close-popup.png" alt="">
            <div class="popup-title">{{info.paydetailList.name}}</div>
            <div class="popup-price">¥
                <span class="popup-price-font">{{((info.paydetailList.amount)/100).toFixed(2)}}</span>
                <span v-show="info.paydetailList.isVipOrder">/月</span>
            </div>
            <div class="popup-input">
                <div class="popup-ipt">
                    <van-cell-group>
                        <van-field v-model="info.orderObject.phoneMask" readonly placeholder="请输入您的订购号码" />
                    </van-cell-group>
                </div>
                <div class="popup-ipt">
                    <van-field
                        v-model="smsCode"
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
            <div v-show="info.paydetailList.isVipOrder" class="automatic-allow">
                <img @click.stop="allow('1')" class="allow1"  :src="allowChecked1?require('@imgs/login/new_checked.png'):require('@imgs/login/new_nocheck.png')" alt="">
                <label for="read1" class="read-desc"><span @click.stop="allow('1')">我已阅读并同意</span><span  style="color:#FD7028" @click.stop="showPopup(must_know)">《权益超市黄金会员须知》</span></label>
            </div>
            <div class="popup-btn submit" @click="submitBtn">确认支付</div>
        </van-popup>
    </div>
</template>

<script>
    import { sendSmsCode, placeOrder} from "@/api/goodsdetail";
    import { mapState } from 'vuex'
    import { Toast } from 'vant';
    export default {
        name: "second-confirm-buy",
        data(){
            return {
                coutdownShow: false,
                coutdownTime: 60,
                smsCode: '',
                allowChecked1: 0,
                popupInfo:{
                    title:'',
                    content:'',
                    btns:''
                },
                must_know:{
                    title:'权益超市黄金会员须知',
                    content:{
                        txt:`
                        <div>一、订购规则：</div>
                        <div>1、权益超市黄金会员（下文简称“会员”）当前仅支持移动用户办理，其中非个人客户（行业卡、物联网卡等）、欠费客户、余额不足的预付费客户、信用额度不足的后付费客户不能订购。</div>
                        <div>2、会员资费5元/月，订购费用将从会员登录手机号话费中自动扣除，订购成功即时生效，可享受相关会员权益；</div>
                        <div>3、 如无退订，默认次月自动续订会员，续订费用将从会员手机号话费中自动扣除；</div>
                        <div>4、会员退订后，会员有效期至当月月底，次月起不再扣费。</div>
                        <br />
                        <div>二、会员福利：
                        <div>1、入会有礼：用户首次成为中国移动权益超市黄金会员，即可获得入会礼1GB通用流量日包一份；领取次数有且只有一次，流量奖品24小时内直充到账，届时会有短信提示，还请注意查收；1GB流量为日包产品，到账后24小时内有效。</div>
                        <div>2、会员优惠购：会员用户可在“会员优惠购”专区订购权益产品。会员购买会员优惠购专区权益后将会收到订购短信提醒，还请实时关注。</div>
                        <div>3、精选5折购：会员用户可在“精选5折购”专区半价购买权益，每月限购一款。会员购买精选5折购专区权益后将会收到订购短信提醒，还请实时关注。</div>
                        <div>4、专属客服：会员用户可享受专属客服服务。</div>`
                    }
                },
                show: false,
            }
        },
        props:{
            info: {
                type: Object,
                default(){
                    return {
                        payShow: false,
                        //产品详情列表
                        paydetailList: {
                            price: '0',
                        },
                        // 产品订购对象
                        orderObject: {
                            phone: '',
                            phoneMask: '',//带mask
                        },
                        callback:''
                    }
                }
            },
        },
        ...mapState([
            "userInfo"
        ]),
        methods:{
            submitBtn() {
                let that = this;
                // 短信码不能为空
                if (this.smsCode == ''){
                    Toast('请输入验证码');
                    return false;
                }
                // 短信码六位数校验
                if (this.smsCode.length != 6){
                    Toast('请输入六位验证码');
                    return false;
                }
                // 如果当前订购产品是会员但却没有勾选同意
                if (this.info.paydetailList.isVipOrder && !this.allowChecked1) {
                    Toast('请确认权益超市黄金会员须知');
                    return false;
                }
                // 如果手机号为空，则跳转到登录页
                if (this.info.orderObject.phone == '') {
                    this.reLogin();
                    return false;
                }
                const toast = Toast({
                    message: '订购中...',
                    forbidClick: true,
                    duration: 0,
                });
                // 校验短信验证码
                let headers = {'phone': this.info.orderObject.phone};
                let data = Object.assign({},this.info.paydetailList,{smsCode:this.smsCode});
                window.console.log(data)
                placeOrder(data, headers).then((r) => {
                    toast.clear();
                    if (this.info.callback){
                        this.info.callback(r.data);
                    }else {
                        if (r.data.resultCode == 0) {
                            that.$router.push({name: 'myOrder', params: {type:'all'}});
                        } else {
                            Toast({message: r.data.msg, duration: 4000});
                        }
                    }
                }).catch(() => {
                    toast.clear();
                })
            },
            // 获取验证码
            getSms() {
                let that = this;
                sendSmsCode({mobile: this.info.orderObject.phone}).then((response) => {
                    if (response.data.code == 0) {
                        // 倒计时逻辑
                        that.coutdownShow = true;
                        that.coutdownFunc();
                    } else {
                        Toast(response.data.msg);
                    }
                })
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
            allow(i){
                this['allowChecked'+i] = !this['allowChecked'+i] ;
            },
            showPopup(target) {
                this.$toast.clear();
                this.popupInfo = target;
                this.show = true;
            },
        }
    }
</script>

<style scoped lang="less">
    .van-popup--center{
        border-radius:0.12rem;
    }
    .white-board{
        background:#fff;
        padding:0.6rem 0.38rem 0.83rem;
        box-sizing: border-box;
        width:5.8rem;
        .title{
            font-size:0.34rem;
            font-weight: bold;
            padding-bottom:0.47rem;
        }
        .content{
            overflow-y: auto;
            height: 5.28rem;
            text-align: left;
            font-size:0.24rem;
            font-weight:500;
            color:rgba(56,58,63,1);
            opacity:0.6;
        }
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
            .popup-price-font{
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
        .automatic-allow{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.21rem;
            margin:0 auto 0.5rem;
            .allow1{
                width:0.25rem;
                height: 0.25rem;
                margin-right: 0.13rem
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
</style>