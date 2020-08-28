<template>
    <div :class="{'app-card':true,'marginRight':index%3!=2,'wrap':index>2,'vip':limit}" @click.stop="jump">
        <img class="logo" :src="Common.getImgUrl(info.icon)" alt="">
        <img class="status" v-if="statusSrc" :src="statusSrc" alt="">
        <div class="name">{{name}}</div>
        <div v-show="limit" class="vip-pay">
            <!-- <img class="symbol" src="@imgs/vip_mark.png"  alt=""> -->
            <span class="symbol">秒杀价¥</span>
            <!-- &nbsp; -->
            
            <span class="price" v-if="info.price">{{(parseInt(info.price)/100).toFixed(2)}}</span>
        </div>
        <div class="originprice" v-if="limit && info.originprice">
            ¥{{(parseInt(info.originprice)/100).toFixed(2)}}
        </div>
        <div class="leftPercent-wrapper">
            <div  class="leftPercent" :style="{width:+leftPercent != 0?1.8*(+leftPercent)+'rem':0}"></div>
            <div  class="leftPercentText">
                剩余{{parseInt(+leftPercent * 100) +'%'}}
            </div>
        </div>
    </div>
</template>

<script>
    import messageBus from "@/utils/messageBus";
    import {delCookie } from "@/utils/cookie";
    import {VIPORDER} from "@/utils/constant";
    import { blocklogMixin } from "@/mixins/log";

    import { mapState } from 'vuex'

    export default {
        name: "app-card3",
        props:["info","index","limit","activityStatus","startTime","endTime"],
        mixins:[blocklogMixin],
        computed:{
            ...mapState([ 
                "userInfo" ,
                "sysInfo"
            ]),
            leftPercent(){
                let left = (this.info.availableNum/this.info.num) + '' - 0;
                if(left>0 && left<=0.01){
                    return 0.01
                }else{
                    return Math.floor(left * 100)/100
                }
                
            },
            name(){
                if(this.info.name.length > 8){
                    return this.info.name.substring(0, 7) + '...'
                }else{
                   return this.info.name
                }
                
            },
            statusSrc() {
                return +this.activityStatus == 2 || new Date().getTime() > new Date(this.endTime).getTime()?require('@imgs/limit_over.png'):(+this.activityStatus == 1 && +this.leftPercent === 0)?require('@imgs/limit_noleft.png'):''
            }
        },
        methods:{
            jump(){
                if(!this.userInfo.phone){//没登录，引导登录
                    delCookie('ql');
                    messageBus.$emit('msg_checkLogin','quick',true);
                }else if(this.userInfo.phone && this.userInfo.isVip !== 1){//登陆了但还没开通会员，弹框引导开通会员
                    messageBus.$emit('msg_showPopup',{
                        flag: true,
                        title: '您还不是会员哦',
                        content: '秒杀活动为会员用户专享，立即开通会员享受秒杀活动超低价',
                        mask: true,
                        btns: [
                            {
                                txt: '稍后再说',
                                style:{
                                    backgroundColor:'rgb(255,2555,255)',
                                    color: 'rgb(237, 174, 99)',
                                    border: '1px solid rgb(237, 174, 99)'
                                },
                                handler: () => {
                                    this.blocklogHandler('秒杀-非会员弹窗','0038','0000');
                                    messageBus.$emit('msg_showPopup',false);
                                }
                            },
                            {
                                txt: '立即开通',
                                style:{
                                    backgroundColor:'rgb(237, 174, 99)',
                                    border: '1px solid rgb(237, 174, 99)',
                                    color: 'rgb(255,255,255)'
                                },
                                handler: () => {
                                    this.blocklogHandler('秒杀-非会员弹窗','0038','0001');
                                    // let that = this;
                                    // let data = Object.assign({},VIPORDER);
                                    // data.channelCode = that.sysInfo.channelCode;
                                    // data.smsCode = that.subscribeSmsCode;
                                    // data.selfChannelCode = that.sysInfo.selfChannelCode?that.sysInfo.selfChannelCode:''; //订购、退订增传selfChannelCode子段
                                    // data.isVipOrder = true;
                                    // let  SecondConfirmInfo = {
                                    //     payShow: true,
                                    //     paydetailList: data,
                                    //     orderObject: {
                                    //         phone: that.userInfo.phone,
                                    //         phoneMask: that.userInfo.phoneMask
                                    //     },
                                    //     callback:res =>{
                                    //         if (res.resultCode == 0) {
                                    //             //订购成功，关闭底部弹窗
                                    //             messageBus.$emit('msg_subscribePopup',false);
                                    //             for(let i=1;i<25;i++){
                                    //                 setTimeout(()=>{
                                    //                     console.log(i*5000,new Date());
                                    //                     if (that.userInfo.isVip !== 1) {
                                    //                         messageBus.$emit('msg_getVipInfo');
                                    //                     }
                                    //                 },i*5000)
                                    //             }
                                    //             that.$toast({message: '订单已受理，开通结果以短信为准', duration: 4000,onClose:()=>{
                                    //                 that.$router.push({name: 'myOrder', params: {type:'all'}});
                                    //             }});
                                    //         }
                                    //         // else{
                                    //         //     that.$toast({message: '订购失败', duration: 4000});
                                    //         // }
                                    //         else if(res.resultCode == -1 && res.data.code == -1) {
                                    //             that.$toast({message: '请输入正确的验证码哦', duration: 4000});
                                    //         } else if(res.resultCode == -102) {
                                    //             that.$toast({message: '订购异常,请稍后重试!', duration: 4000});
                                    //         } else if(res.resultCode == -117) {
                                    //             that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                                    //         } else if(res.resultCode == -116) {
                                    //             that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                                    //         } else if(res.resultCode == -113) {
                                    //             that.$toast({message: '订购异常，检查下话费余额后重试哦！', duration: 4000});
                                    //         } else if(res.resultCode == -118) {
                                    //             that.$toast({message: res.msg, duration: 4000});
                                    //         } else if(res.resultCode == -112) {
                                    //             that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                                    //         } else if(res.resultCode == 4) {
                                    //             that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                                    //         } else {
                                    //             that.$toast({message: res.msg, duration: 4000});
                                    //         }
                                    //     }
                                    // };
                                    messageBus.$emit('msg_showPopup',false);

                                    messageBus.$emit('msg_subscribePopup');
                                }
                            }
                        ]
                    });
                }else if(this.userInfo.phone && this.userInfo.isVip === 1){//已登陆并已开通会员，跳转商品详情页
                    this.$router.push({name: 'goodsDetail', params: {mid:this.info.mid,saleid:this.info.saleid,proid: this.info.proid }})
                }else{
                    console.log('其他情况')
                }
                // if(+this.activityStatus === 1){//活动进行中
                //     if(new Date().getTime() > new Date(this.endTime).getTime()){//活动已结束
                //         this.$toast('活动已结束')
                //     }else if(new Date().getTime() < new Date(this.startTime).getTime()){//活动还没开始
                //         this.$toast('活动还没开始')
                //     }else{
                //         if(+this.leftPercent <= 0){//没剩余商品了
                //             this.$toast('哎呀，亲您来迟了！')
                //         }else{
                //             if(!this.userInfo.phone){//没登录，引导登录
                //                 delCookie('ql');
                //                 messageBus.$emit('msg_checkLogin','quick',true);
                //             }else if(this.userInfo.phone && this.userInfo.isVip !== 1){//登陆了但还没开通会员，弹框引导开通会员
                //                 messageBus.$emit('msg_showPopup',{
                //                     flag: true,
                //                     title: '您还不是会员哦',
                //                     content: '秒杀活动为会员用户专享， 立即开通会员享受秒杀活动 的超低价吧',
                //                     mask: true,
                //                     btns: [
                //                         {
                //                             txt: '稍后再说',
                //                             style:{
                //                                 backgroundColor:'rgb(255,2555,255)',
                //                                 color: 'rgb(237, 174, 99)',
                //                                 border: '1px solid rgb(237, 174, 99)'
                //                             },
                //                             handler: () => {
                //                                 messageBus.$emit('msg_showPopup',false);
                //                             }
                //                         },
                //                         {
                //                             txt: '立即开通',
                //                             style:{
                //                                 backgroundColor:'rgb(237, 174, 99)',
                //                                 border: '1px solid rgb(237, 174, 99)',
                //                                 color: 'rgb(255,255,255)'
                //                             },
                //                             handler: () => {
                //                                 let that = this;
                //                                 let data = Object.assign({},VIPORDER);
                //                                 data.channelCode = that.sysInfo.channelCode;
                //                                 data.smsCode = that.subscribeSmsCode;
                //                                 data.selfChannelCode = that.sysInfo.selfChannelCode?that.sysInfo.selfChannelCode:''; //订购、退订增传selfChannelCode子段

                //                                 let  SecondConfirmInfo = {
                //                                     payShow: true,
                //                                     paydetailList: data,
                //                                     orderObject: {
                //                                         phone: that.userInfo.phone,
                //                                         phoneMask: that.userInfo.phoneMask
                //                                     },
                //                                     callback:res =>{
                //                                         if (res.resultCode == 0) {
                //                                             //订购成功，关闭底部弹窗
                //                                             messageBus.$emit('msg_subscribePopup',false);
                //                                             messageBus.$emit('msg_getVipInfo');
                //                                             that.$toast({message: '订单已受理，开通结果以短信为准', duration: 4000,onClose:()=>{
                //                                                 that.$router.push({name: 'myOrder', params: {type:'all'}});
                //                                             }});
                //                                         }
                //                                         // else{
                //                                         //     that.$toast({message: '订购失败', duration: 4000});
                //                                         // }
                //                                         else if(res.resultCode == -1 && res.data.code == -1) {
                //                                             that.$toast({message: '请输入正确的验证码哦', duration: 4000});
                //                                         } else if(res.resultCode == -102) {
                //                                             that.$toast({message: '订购异常,请稍后重试!', duration: 4000});
                //                                         } else if(res.resultCode == -117) {
                //                                             that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                //                                         } else if(res.resultCode == -116) {
                //                                             that.$toast({message: '退订异常,请稍后重试！', duration: 4000});
                //                                         } else if(res.resultCode == -113) {
                //                                             that.$toast({message: '订购异常，检查下话费余额后重试哦！', duration: 4000});
                //                                         } else if(res.resultCode == -118) {
                //                                             that.$toast({message: res.msg, duration: 4000});
                //                                         } else if(res.resultCode == -112) {
                //                                             that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                //                                         } else if(res.resultCode == 4) {
                //                                             that.$toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                //                                         } else {
                //                                             that.$toast({message: res.msg, duration: 4000});
                //                                         }
                //                                     }
                //                                 };
                //                                 messageBus.$emit('msg_showPopup',false);

                //                                 messageBus.$emit('msg_subscribePopup',SecondConfirmInfo);
                //                             }
                //                         }
                //                     ]
                //                 });
                //             }else if(this.userInfo.phone && this.userInfo.isVip === 1){//已登陆并已开通会员，跳转商品详情页
                //                 this.$router.push({name: 'goodsDetail', params: {mid:this.info.mid,saleid:this.info.saleid,proid: this.info.proid }})
                //             }else{
                //                 console.log('其他情况')
                //             }
                //         }
                //     }
                // }else if(+this.activityStatus === 2){//活动已结束
                //     this.$toast('活动已结束')
                // }else{//活动还没开始
                //     this.$toast('活动还没开始')
                // }
            }
        }
    }
</script>

<style lang="less" scoped>
    .app-card{
        overflow: hidden;
        border-radius: 0.1rem;
        width:2.2rem;
        height: 3rem;
        // background: #f5f7fa;
        background: url("../../assets/imgs/appbg_normal.png") no-repeat center/100% 100%;
        position: relative;
        .logo{
            width:1.4rem;
            height:1.4rem;
            margin-bottom:0.15rem;
            display: block;
            position: relative;
            top:0;
            left: 50%;
            transform: translateX(-50%)
        }
        .status{
            width:1.4rem;
            height:1.4rem;
            display: block;
            position: absolute;
            top:0;
            left: 50%;
            transform: translateX(-50%)
        }
        .name{
            width: 100%;
            font-size: 0.24rem;
            color:#68676d;
            font-weight: bold;
            margin-bottom: 0.08rem;
            // overflow: hidden;  /*超出部分隐藏*/
            // white-space: nowrap;  /*禁止换行*/
            // text-overflow: ellipsis; /*省略号*/
        }
        .pay{
            width: 100%;
            font-size: 0.21rem;
            color:#8aacfe;
            opacity: 0.8;
            overflow: hidden;  /*超出部分隐藏*/
            white-space: nowrap;  /*禁止换行*/
            text-overflow: ellipsis; /*省略号*/
        }
    }
    .vip.app-card{
        height: 3.3rem;
        background: url("../../assets/imgs/appbg_limitbuy.png") no-repeat left bottom/100% 80%;
        .vip-pay{
            width: 100%;
            font-size: 0.21rem;
            opacity: 0.8;
            overflow: hidden;  /*超出部分隐藏*/
            white-space: nowrap;  /*禁止换行*/
            text-overflow: ellipsis; /*省略号*/
            display: flex;
            display: -webkit-flex; 
            justify-content: center;
            -webkit-justify-content: center;
            align-items:center;
            -webkit-align-items: center;
            margin-bottom: 0.08rem;
            .symbol{
                // height:0.25rem;
                font-size: 0.23rem;
                color:#FD7028
            }
            .price{
                color:#FD7028;
                font-size: 0.28rem;
                font-weight: bold;
            }
        }
        .originprice{
            width: 100%;
            font-size: 0.21rem;
            opacity: 0.8;
            overflow: hidden;  /*超出部分隐藏*/
            white-space: nowrap;  /*禁止换行*/
            text-overflow: ellipsis; /*省略号*/
            color:#c9cbce;
            text-decoration: line-through;
            margin-bottom:0.08rem;
        }
        .leftPercent-wrapper{
            width: 1.8rem;
            height: 0.26rem;
            background:#FED5C7;
            border-radius: 0.26rem;
            margin:0 auto;
            overflow: hidden;
            padding: 0;
            box-sizing: border-box;
            .leftPercent{
                display: block;
                height: 0.26rem;
                background: #FD7028;
                text-align: center;
                border-radius: 0.26rem;
                padding: 0;
                margin: 0;
                border: 0;
                box-sizing: border-box;
            }
            .leftPercentText{
                height: 0.26rem;
                border-radius: 0.26rem;
                font-size: 0.2rem;
                color: #fff;
                padding: 0;
                margin: 0;
                border: 0;
                box-sizing: border-box;
                position: relative;
                top:-0.26rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
    .marginRight{
        margin-right: 0.10rem
    }
    .wrap{
        margin-top: 0.1rem;
    }
</style>