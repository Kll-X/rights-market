<template>
    <div id="new-guest">
        <div class="new-guest-wrap">
            <!-- <img class="new-guest-bg" src="@imgs/newguest/newguest-bg.png" alt=""> -->
            <div class="new-guest-gift">
                <div v-show="hasNewGift == '0' || hasNewGift ==  ''" class="new-guest-btn" @click="receiveFunc"></div>
                <div v-show="hasNewGift == '1'" class="new-guest-btn new-guest-received"></div>
            </div>
            <div class="new-guest-rule">
                <span @click="show = true">领取规则</span>
            </div>
        </div>
        <van-overlay :show="show" @click="show = false">
            <div class="overlay-wrapper" @click.stop>
                <span @click="show = false" class="close-overlay"></span>
                <div class="overlay-title">入会有礼</div>
                <div class="overlay-con">
                    1、用户首次成为中国移动权益超市黄金会员，即可获得入会礼1GB通用流量日包一份。<br>
                    2、领取次数有且只有一次，流量奖品24小时内直充到账，届时会有短信提示，还请注意查收。<br>
                    3、1GB流量为日包产品，到账后24小时内有效。
                </div>
            </div>
        </van-overlay>
        <BackHome/>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { placeOrder } from "@/api/goodsdetail";
    import { delCookie } from "@/utils/cookie";
    import { Toast } from 'vant';
    import BackHome from '@/components/common/BackHome.vue';
    import messageBus from "@/utils/messageBus";
    import { NEWVIPGIFT } from '@/utils/constant'
    import { pagelogMixin } from "@/mixins/log"

    export default {
        name: "newguest",       
        mixins: [pagelogMixin],
        components: {
            BackHome
        },
        computed:{
            ...mapState([
                "userInfo",
                "sysInfo"
            ])
        },
        watch:{
            '$store.state.userInfo.hasNewGift'(n){
                this.hasNewGift = n;
            },
        },
        data() {
            return {
                show: false,
                hasNewGift: 0, // 0:未领取 1：已领取
            };
        },
        mounted() {
            if (this.userInfo.phone) this.hasNewGift = this.userInfo.hasNewGift;
        },
        methods: {
            receiveFunc() {
                if (!this.userInfo.phone) {
                    delCookie('ql');
                    messageBus.$emit('msg_checkLogin','quick')
                } else {
                    if (this.userInfo.isVip == 0) {
                        this.$router.push({name: 'vipBenefit'});
                    } else {
                        let headers = {'phone': this.userInfo.phone};
                        let data = Object.assign({},NEWVIPGIFT);
                        data.channelCode = this.sysInfo.channelCode;
                        const toast = Toast({
                            message: '领取中,请稍等…',
                            forbidClick: true,
                            duration: 0,
                        });
                        // 下单
                        placeOrder(data, headers).then((r) => {
                            toast.clear();
                            if (r.data.resultCode == 0) {
                                this.get_now();
                                this.hasNewGift = 1;
                                messageBus.$emit('msg_getVipInfo');
                            } else if(r.data.resultCode == -1 && r.data.data.code == -1) {
                                Toast({message: '请输入正确的验证码哦', duration: 4000});
                            } else if(r.data.resultCode == -102) {
                                Toast({message: '订购异常,请稍后重试!', duration: 4000});
                            } else if(r.data.resultCode == -117) {
                                Toast({message: '退订异常,请稍后重试！', duration: 4000});
                            } else if(r.data.resultCode == -116) {
                                Toast({message: '退订异常,请稍后重试！', duration: 4000});
                            } else if(r.data.resultCode == -113) {
                                Toast({message: '订购异常，检查下话费余额后重试哦！', duration: 4000});
                            } else if(r.data.resultCode == -118) {
                                Toast({message: r.data.msg, duration: 4000});
                            } else if(r.data.resultCode == -112) {
                                Toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                            } else if(r.data.resultCode == 4) {
                                Toast({message: '异常了,bug修复中,请稍后再试！', duration: 4000});
                            } else {
                                Toast({message: r.data.msg, duration: 4000});
                            }
                        }).catch(() => {
                            toast.clear();
                        })
                    }
                }
            },
            get_now(){
                messageBus.$emit('msg_showPopup',{
                    flag: true,
                    title: '成功领取',
                    content: '恭喜您成功领取...',
                    mask: true,
                    btns: [
                        {
                            txt: '我知道了',
                            handler: () => {
                                messageBus.$emit('msg_showPopup',false);
                                this.ever_get = 1
                            }
                        }
                    ]
                })
            },
        },
    }
</script>

<style scoped lang="less">
    #new-guest {
        font-size: .26rem;
        font-weight: 400;
        color: #3E3C3B;
        .new-guest-wrap{
            background: url('../assets/imgs/newguest/newguest-bg.png') 0 0 no-repeat;
            background-size: 100%;
            padding-top: 4rem;
            .new-guest-gift{
                position: relative;
                width: 6.31rem;
                height: 7.21rem;
                margin: 0 auto;
                background-image: url('../assets/imgs/newguest/newguest-gift.png');
                background-size: 6.31rem 7.21rem;
                .new-guest-btn{
                    position: absolute;
                    top: 5.5rem;
                    left: 50%;
                    width: 3.39rem;
                    height: 1.03rem;
                    margin-left: -1.695rem;
                    background-image: url('../assets/imgs/newguest/newguest-btn.png');
                    background-size: 3.39rem 1.03rem;
                }
                .new-guest-received{
                    background-image: url('../assets/imgs/newguest/newguest-btn-received.png');
                }
            }
            .new-guest-rule{
                margin-top: .28rem;
                span{
                    border-bottom: .02rem solid #3E3C3B;
                }
            }
        }
        .overlay-wrapper{
            width: 5.8rem;
            margin: 0 auto;
            margin-top: 4.7rem;
            padding: .63rem .38rem .83rem;
            background: #FFF;
            border-radius: .12rem;
            position: relative;
            .close-overlay{
                position: absolute;
                width: .24rem;
                height: .24rem;
                top: .25rem;
                right: .25rem;
                background-image: url('../assets/imgs/newguest/icon-close.png');
                background-size: .24rem .24rem;
            }
            .overlay-title{
                font-size: .36rem;
                margin-bottom: .47rem;
            }
            .overlay-con{
                font-size: .24rem;
                line-height: .36rem;
                text-align: left;
                color: #a4a4a6;
            }
        }
    }
</style>
