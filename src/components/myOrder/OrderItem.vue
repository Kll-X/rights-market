<template>
    <div class="order-item" @click="gotoDetail">
        <div class="top">
            <img class="icon" :src="Common.getImgUrl(info.iconUrl)" alt="">
            <div class="content">
                <div class="title">
                    <span class="txt">{{nameTxt}}</span>
                    <img v-if="info.salesType == 1 || info.salesType ==2" class="tips-vip" src="@imgs/myorder/tips_vip.png">
                    <img v-if="info.salesType == 3" class="tips-seckilling" src="@imgs/myorder/seckilling.png">
                </div>
                <div>
                    <span class="payType">{{info.payType | payTypeTxt}} </span>
<!--                    <span class="payType">{{info.qyPayType | qyPayTypeTxt}} </span>-->
<!--                    <span class="orderWay">{{info.orderWay | orderWayTxt}} </span>-->
                </div>
                <div class="price">
                    {{info.salesType | salesTypeTxt}}{{(info.price/100).toFixed(2)}}元
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="orderDate">
                <span>订购日期：</span>{{info.updateTime | timeFormat}}
            </div>
            <div class="handlerBtns" v-if="!isVipOrder">
                <div class="btn-bind" v-if="needBind && !+info.td"  @click.stop="blocklogHandler('订单列表', '0036', '00002');bindHandler(info.name)">去绑定</div>
                <div class="btn-unsubscribe" v-if="info.status === 1 && info.orderWay == 2 && info.td!= -1 && info.td!= 5" @click.stop="tdHandler">退订</div>
                <div class="btn-td" v-if="info.td == -1" @click.stop="">已退订</div>
                <div class="btn-tding" v-if="info.td == 5" @click.stop="">退订中</div>
            </div>
            <div class="handlerBtns" v-if="isVipOrder">
                <div class="btn-unsubscribe" v-if="info.status === 1 && info.effect == 0 && info.custVipId" @click.stop="tdHandler">退订</div>
                <div class="btn-td" v-if="info.effect == 1" @click.stop="">已退订</div>
                <div class="btn-tding" v-if="info.effect == 2" @click.stop="">退订中</div>
            </div>
            <div class="tips">
                <div class="tip-btn-bind" v-if="needBind && !+info.td">如手机号码未绑定QQ或微信号，绑定后可正常使用。如当前浏览器无法绑定，可复制绑定链接至微信/qq中绑定。</div>
            </div>
        </div>
        <div class="tag-wrapper">
            <div class="tag" :class="`color-${info.status}`"></div>
        </div>
    </div>
</template>

<script>
    import messageBus from "@/utils/messageBus";
    import {placeOrder,queryOrderStatus} from "@/api/myOrder";
    import { mapState } from 'vuex';
    import {APPLIST_CUSTOMPAGE,VIPORDER,APPLIST_CHAODIGOU} from '@/utils/constant'
    import { blocklogMixin } from "@/mixins/log"

    export default {
        name: "order-item",
        props: {
            info: {
                type: Object,
                required: true
            }
        },
        mixins:[blocklogMixin],
        data(){
            return {
                detailLinkFlag: true,
                detailLinkPath: '',
                isVipOrder:false
            }
        },
        created() {
            //517活动订单polyfill
            for (let item of APPLIST_CHAODIGOU) {
                if(+item.salesid == +this.info.salesId) {
                    this.info.price = item.currentPrice;
                    this.info.iconUrl = item.icon.search('http')>-1?item.icon:location.origin+'/'+item.icon;
                    this.info.name = item.title;
                    this.info.payType = 1;
                    this.detailLinkFlag = false;
                    break;
                }
            }
            //活动订单(618、717)polyfill
            for (let item of APPLIST_CUSTOMPAGE) {
                if(+item.saleid == +this.info.salesId) {
                    this.info.price = item.price;
                    this.info.iconUrl = item.icon.search('http')>-1?item.icon:location.origin+'/'+item.icon;
                    this.info.name = item.name;
                    this.info.payType = 1;
                    item.detailLinkFlag!==undefined && (this.detailLinkFlag = item.detailLinkFlag);
                    item.detailLinkPath!==undefined && (this.detailLinkPath = item.detailLinkPath);
                    break;
                }
            }
            //会员订单polyfill
            if(+VIPORDER.salesId == +this.info.salesId) {
                //会员订单跳转到会员权益页
                this.detailLinkPath = {name: 'vipBenefit'};
                //会员订单根据effect判断状态
                this.isVipOrder = true;
            }
        },
        methods: {
            gotoDetail(){
                //操作统计：点击订单
                this.blocklogHandler('订单列表', '0036', '00001');
                if (this.detailLinkFlag){
                    if (this.detailLinkPath) {
                        this.$router.push(this.detailLinkPath);
                    }else {
                        this.$router.push({
                            name: 'goodsDetail',
                            params: {
                                mid:this.info.mid,
                                saleid:this.info.saleid,
                                proid: this.info.proid }
                        })
                    }
                }
            },
            bindHandler(name){
                let that = this;
                let targetUrl = '';
                if (name.search('腾讯视频') > -1){
                    targetUrl = 'https://film.qq.com/act/phone-reward/index.html';
                }else if(name.search('qq音乐') > -1 || name.search('QQ音乐') > -1){
                    targetUrl = 'https://y.qq.com/m/cact/telecombind/index.html';
                }

                if(that.sysInfo.channel == 'st'){
                    messageBus.$emit('msg_showPopup',{
                        flag: true,
                        title: '账号绑定',
                        content: `请在浏览器中打开以下链接，并将您的 手机号与需要的QQ账号或微信账号绑 定，即可享受会员权益。<div style="margin-top:0.4rem;padding:0.33rem 0.25rem;color:#6696FF;font-size:0.24rem;background:#eee;word-wrap: break-word;word-break:break-all;">账号绑定链接：${targetUrl}</div>`,
                        mask: true,
                        closeBtn:true,
                        btns: [
                            {
                                txt: '复制链接',
                                handler: () => {
                                    function copyText(text) {
                                        let oInput = document.createElement('input');
                                        oInput.value = text;
                                        document.body.appendChild(oInput);
                                        oInput.select();
                                        document.execCommand("Copy"); 
                                        oInput.className = 'oInput';
                                        oInput.style.display = 'none';
                                    }
                                    copyText(targetUrl);
                                    that.$toast('复制成功')
                                }
                            }
                        ]
                    })
                }else{
                    window.location.href = targetUrl
                }
                
            },
            tdHandler(){
                let that = this;
                that.blocklogHandler('订单列表', '0036', '00003');
                let orderData;
                if(+VIPORDER.salesId == +this.info.salesId) {
                    orderData = Object.assign({},VIPORDER);
                    orderData.channelCode = that.sysInfo.channelCode;
                    orderData.selfChannelCode = that.sysInfo.selfChannelCode;
                    orderData.dealType = 1;
                    orderData.custVipId = that.info.custVipId;
                } else {
                    orderData = {
                        proId: that.info.prodId,
                        name: that.info.name,
                        salesId: that.info.salesId,
                        channelCode: that.sysInfo.channelCode,
                        selfChannelCode: that.sysInfo.selfChannelCode,
                        dealType: 1,
                        isPay: 1,
                        orderWay: 2,
                        amount: that.info.price,
                        payType: that.info.qyPayType,
                        renewId: that.info.renewId,
                        custVipId: that.info.custVipId
                    }
                }
          
                messageBus.$emit('msg_showPopup',{
                    flag: true,
                    title: '是否退订该产品?',
                    content: '业务退订次月生效，即下个月1号起不再自动扣费及发放权益。具体退订结果以短信下发为准',
                    mask: true,
                    btns: [
                        {
                            txt: '继续退订',
                            handler: () => {
                                placeOrder(orderData,{
                                    phone: that.userInfo.phone,
                                }).then(res=>{
                                    messageBus.$emit('msg_showPopup',{
                                        flag: false
                                    })
                                    if (res.data.resultCode === 0 ){
                                        that.$toast('退订申请成功');
                                        // 退订成功，要改变订单状态
                                        if (that.isVipOrder) {
                                            that.info.effect = 2;
                                        } else {
                                            that.info.td = 5;
                                        }
                                        setTimeout(()=>{
                                            queryOrderStatus({
                                                orderId: that.info.orderId,
                                                channelCode: that.sysInfo.channelCode
                                            },{
                                                phone: that.userInfo.phone
                                            }).then(res => {
                                               window.console.log(res)
                                                if (res.data.resultCode === 0) {
                                                    let orderData = res.data.data;
                                                    that.$emit('orderChange', orderData);
                                                }
                                            })
                                        }, 5000)
                                    } else {
                                        that.$toast('退订失败了,请稍后重试！');
                                    }
                                })
                            }
                        },{
                            txt: '考虑一下',
                            handler: () => {
                                messageBus.$emit('msg_showPopup',{
                                    flag: false
                                })
                            }
                        }
                    ]
                })
            }
        },
        filters: {
            timeFormat: function (value) {
                value = value || '';
                value = value.replace(/-/g,'/');
                let time = new Date(value);
                let year = time.getFullYear();
                let month = time.getMonth()+1;
                let date = time.getDate();
                return year + '-' + (month<=9?'0'+month:month) + '-' + (date<=9?'0'+date:date);
            },
            payTypeTxt: function (value) {
                let txt;
                switch(value){
                    case 1: txt = '话费支付 单次点播';break;
                    case 2: txt = '话费支付 连续包月';break;
                    case 3: txt = '第三方支付 单次点播';break;
                }
                return txt;
            },
            qyPayTypeTxt: function (value) {
                let txt;
                switch(value){
                    case '10': txt = '话费支付';break;
                    case '11': txt = '第三方支付';break;
                }
                return txt;
            },
            orderWayTxt: function (value) {
                let txt;
                switch (+value) {
                    case 1: txt = '单次点播';break;
                    case 2: txt = '连续包月';break;
                    default: txt = '单次点播';
                }
                return txt;
            },
            salesTypeTxt: function (value) {
                let txt;
                switch (+value) {
                    case 0: txt='资费：';break;
                    case 1: txt='五折价：';break;
                    case 2: txt='会员价：';break;
                    case 3: txt='秒杀价：';break;
                }
                return txt;
            }
        },
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ]),
            needBind(){
                // return this.info.name.search('腾讯视频') > -1  || this.info.name.search('qq音乐') > -1 || this.info.name.search('QQ音乐') > -1 ;
                let name = this.info.name || '';
                // let opt1 = name.search('腾讯视频') > -1 && this.info.status === 1;
                let opt1 = false;
                let opt2 = (name.search('qq音乐') > -1 || name.search('QQ音乐') > -1)&& (this.info.status === 1 || this.info.status === 0) ;
                return opt1 || opt2;
            },
            nameTxt(){
                let maxLength=13;
                if (this.info.salesType) maxLength = 8;
                return this.info.name.length > (maxLength+1) ? this.info.name.slice(0,maxLength)+'...' : this.info.name;
            }
        }
    }
</script>

<style scoped lang="less">
.order-item{
    border-radius: .16rem;
    padding: .35rem .3rem .4rem .3rem;
    background-color: #ffffff;
    position: relative;
    box-shadow: 0 .06rem .12rem 0 rgba(20,59,153,0.1);
    .tag-wrapper{
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        top: .57rem;
        .tag{
            position: relative;
            left: .06rem;
            width: 1.06rem;
            height: .56rem;
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
}
.top{
    display: flex;
    padding-bottom:.31rem;
    position: relative;
    .icon{
        width: 1rem;
        height: 1rem;
        margin-right:.26rem;
    }
    .content{
        display: flex;
        flex-direction: column;
        text-align: left;
        flex-grow: 1;
        .title{
            display: flex;
            align-items: center;
            padding: .1rem 0;
            .txt{
                color: #0F0B1A;
                font-size: .3rem;
                opacity: .8;
                font-weight: 500;
                line-height: .3rem;
            }
            .tips-seckilling{
                width: 1.3rem;
                padding-left: .1rem;
            }
            .tips-vip{
                padding-left: .1rem;
                width: 1rem;
            }
        }
        .payType, .orderWay{
            color: #0F0B1A;
            font-size: .26rem;
            opacity: .6;
            font-weight: 400;
            line-height: .3rem;
        }
        .price{
            color: #0F0B1A;
            font-size: .26rem;
            opacity: .6;
            font-weight: 400;
            line-height: .3rem;
        }
    }
}
.top:after{
    content: '';
    display: block;
    width: 106%;
    height: 1px;
    background-color: #e8e8e8;
    position: absolute;
    bottom: 0;
    left: -3%;
}
.bottom{
    padding-top: .3rem;
    text-align: left;
    .orderDate{
        color: #0F0B1A;
        font-size: .26rem;
        opacity: .6;
        font-weight: 400;
        line-height: .3rem;
    }
    .handlerBtns{
        display: flex;
        justify-content: center;
        .btn-bind{
            display: inline-block;
            width: 2.8rem;
            height: .7rem;
            background-color: #6696FF;
            border-radius: .35rem;
            text-align: center;
            line-height: .7rem;
            color: white;
            margin: .3rem .1rem 0 .1rem;
        }
        .btn-unsubscribe{
            display: inline-block;
            width: calc(~"2.8rem - 4px");
            height: calc(~".7rem - 4px");
            border:2px solid rgb(102,150,255);
            border-radius:.35rem;
            text-align: center;
            line-height: .7rem;
            color: rgb(102,150,255);
            margin: .3rem .1rem 0 .1rem;
        }
        .btn-td,.btn-tding{
            color: #bdbfc2;
            display: inline-block;
            width: calc(~"2.8rem - 4px");
            height: calc(~".7rem - 4px");
            border:2px solid #bdbfc2;
            border-radius:.35rem;
            text-align: center;
            line-height: .7rem;
            margin: .3rem .1rem 0 .1rem;
        }
    }
    .tips{
        .tip-btn-bind{
            font-size:.22rem;
            font-weight:400;
            color:rgba(15,11,26,1);
            line-height:.3rem;
            opacity:0.6;
            margin-top: .17rem;
            text-align: center;
        }
    }
}
.color-1{
    background-image: url("../../assets/imgs/myorder/mark_success.png");
}
.color-2{
    background-image: url("../../assets/imgs/myorder/mark_close.png");
}
.color-0{
    background-image: url("../../assets/imgs/myorder/mark_trading.png");
}
</style>
