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
               v-model="popupShow[0]"
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
                        @focus="analysisFuc"
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
        <van-popup v-model="popupShow[1]" :close-on-click-overlay="false" :close-on-popstate="true">
            <div class="popup2">
                <div class="title">{{'您即将订购'+info.paydetailList.name}}</div>
                <div class="txt">
                    <div>{{'订购产品:'+info.paydetailList.name + (info.order?('-' + info.order):'')}}</div>
                    <div>{{'订购资费:'+ ((info.paydetailList.amount)/100).toFixed(2) +'元'}}</div>
                </div>
                <div v-show="info.paydetailList.isVipOrder" class="automatic-allow">
                    <img @click.stop="allow('2')" class="allow1"  :src="allowChecked2?require('@imgs/login/new_checked.png'):require('@imgs/login/new_nocheck.png')" alt="">
                    <label for="read1" class="read-desc"><span @click.stop="allow('2')">我已阅读并同意</span><span  style="color:#FD7028" @click.stop="showPopup(must_know)">《权益超市黄金会员须知》</span></label>
                </div>
                <div class="btns">
                    <div class="btn" @click="info.payShow=false">残忍拒绝</div>
                    <div class="btn" @click="confirmBuyHandler">确认订购</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import { sendSmsCode, placeOrder} from "@/api/goodsdetail";
    import { mapState } from 'vuex'
    import { Toast } from 'vant';
    import { blocklogMixin } from "@/mixins/log";
    export default {
        name: "second-confirm-buy",
        mixins: [blocklogMixin],
        computed:{
            popupShow(){
                return [
                    this.info.payShow&&this.info.type==0,
                    this.info.payShow&&this.info.type==1,
                ]
            }
        },
        data(){
            return {
                coutdownShow: false,
                coutdownTime: 60,
                smsCode: '',
                allowChecked1: 0,
                allowChecked2: 0,
                canbuy:true, //手厅版防止短时间多次点击
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
                        <div>1、权益超市黄金会员（下文简称“黄金会员”）当前仅支持移动用户办理，其中非个人客户（行业卡、物联网卡等）、欠费客户、余额不足的预付费客户、信用额度不足的后付费客户不能订购。</div>
                        <div>2、黄金会员资费5元/月，订购费用将从会员登录手机号话费中自动扣除，订购成功即时生效，可享受相关会员权益；</div>
                        <div>3、如无退订，默认次月自动续订黄金会员，续订费用将从会员手机号话费中自动扣除；</div>
                        <div>4、会员退订后，黄金会员有效期至当月月底，次月起不再扣费。</div>
                        <br />
                        <div>二、会员福利：</div>
                        <div>1、流量礼包：用户成为中国移动权益超市黄金会员，则可每月领取1GB通用流量日包一份，若当月未领取，则次月无法补领；当月流量礼包领取后，24小时内直充到账，届时会有短信提示，请注意查收；1GB通用流量为日包产品，到账后24小时内有效。</div>
                        <div>2、会员优惠购：黄金会员用户可在“会员优惠购”专区订购权益产品。黄金会员购买会员优惠购专区权益后将会收到订购短信提醒，请实时关注。</div>
                        <div>3、会员福利社：黄金会员用户每月可在“会员福利社”领取福利优惠券，同一优惠券每月最多领取一次，领取及使用规则以单个优惠券页面规则为准。</div>
                        <div>4、精选5折购：黄金会员用户可在“精选5折购”专区半价购买权益，每月限购一款。黄金会员购买精选5折购专区权益后将会收到订购短信提醒，请实时关注。</div>
                        <div>5、专属客服：黄金会员用户可享受专属客服服务。</div>`
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
                        callback:'' //订购结果回调函数
                    }
                }
            },
        },
        watch:{
            'show'(value){
                if (!value) this.blocklogHandler('订购界面的会员须知弹窗', '0024', '0001');
            },
            'info.payShow': {
                handler: function (value) {
                    if (!value && !this.info.type) {
                        this.smsCode = '';
                        if (this.info.paydetailList.isVipOrder) {
                            this.blocklogHandler('超市会员订购短验确认', '0023', '0000')
                        } else {
                            this.blocklogHandler('商品订购短验确认', '0022', '0000', '', this.info.paydetailList.mid, this.info.paydetailList.name);
                        }
                    } 
                }
            },
        },
        ...mapState([
            "userInfo"
        ]),
        methods:{
            submitBtn(dontneedSms) {
                let that = this;
                let blockName = '';
                let blockId = '';
                if (this.info.paydetailList.isVipOrder) {
                    blockName = '超市会员订购短验确认';
                    blockId = '0023';
                } else {
                    blockName = '商品订购短验确认';
                    blockId = '0022';
                }
                if (!dontneedSms) {
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
                }
                // 如果当前订购产品是会员但却没有勾选同意
                if (this.info.paydetailList.isVipOrder && !this['allowChecked'+ (+this.info.type + 1)]) {
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
                console.log(this.info.paydetailList)
                let headers = {'phone': this.info.orderObject.phone};
                let data = Object.assign({},this.info.paydetailList,{smsCode:this.smsCode});
                window.console.log(data)
                placeOrder(data, headers).then((r) => {
                    toast.clear();
                    if (this.info.callback){
                        this.info.callback(r.data);
                    }else {
                        if (r.data.resultCode == 0) {
                            this.blocklogHandler(blockName, blockId, '0005', '', this.info.paydetailList.mid, this.info.paydetailList.name);
                            that.$router.push({name: 'myOrder', params: {type:'all'}});
                        } else if (r.data.resultCode == -1 && r.data.data.code == -1) {
                            this.blocklogHandler(blockName, blockId, '0004', '', this.info.paydetailList.mid, this.info.paydetailList.name);
                            that.$toast({message: '请输入正确的验证码哦', duration: 4000});
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
                let blockName = '';
                let blockId = '';
                if (this.info.paydetailList.isVipOrder) {
                    blockName = '超市会员订购短验确认';
                    blockId = '0023';
                } else {
                    blockName = '商品订购短验确认';
                    blockId = '0022';
                }
                this.blocklogHandler(blockName, blockId, '0003');
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
            // 埋点
            analysisFuc() {
                if (this.info.paydetailList.isVipOrder) {
                    this.blocklogHandler('超市会员订购短验确认', '0023', '0002');
                } else {
                    this.blocklogHandler('商品订购短验确认', '0022', '0002', '', this.info.paydetailList.mid, this.info.paydetailList.name);
                }
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
                this.blocklogHandler('超市会员订购短验确认', '0023', '0006');
                this['allowChecked'+i] = !this['allowChecked'+i] ;
            },
            showPopup(target) {
                this.blocklogHandler('超市会员订购短验确认', '0023', '0007')
                this.$toast.clear();
                this.popupInfo = target;
                this.show = true;
            },
            confirmBuyHandler(){
                if (this.canbuy){
                    this.info.payShow=false;
                    this.submitBtn(true);
                    this.canbuy = false;
                    setTimeout(()=>{
                        this.canbuy = true;
                    },3000)
                } else {
                    this.$toast('请勿频繁操作')
                }
            }
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
            color:rgb(35, 47, 77);
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

    .popup2{
        background-color: white;
        width: 5.8rem;
        padding: .7rem .4rem .4rem .4rem;
        box-sizing: border-box;
        border-radius: .16rem;
        .title{
            font-size: .36rem;
            color: #343434;
        }
        .txt{
            padding: .4rem .2rem 0 .2rem;
            font-size: .32rem;
            font-weight:400;
            color: #666666;
            text-align: left;
        }
        .automatic-allow{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.21rem;
            margin:.4rem auto 0.5rem;
            .allow1{
                width:0.25rem;
                height: 0.25rem;
                margin-right: 0.13rem
            }
        }
        .btns{
            display: flex;
            justify-content: space-between;
            margin-top: .6rem;
            .btn{
                width: 2.4rem;
                height: .7rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: .32rem;
                box-sizing: border-box;
                border-radius: .35rem;
            }
            .btn:nth-child(1){
                color: #fd7028;
                border: 2px solid #fd7028;
            }
            .btn:nth-child(2){
                background-color: #fd7028;
                color: white;
            }
        }
    }
</style>