<template>
    <!-- 商品详情 -->
    <!-- <div id="detail-card">
        <div class="card-title">{{cardTitle}}</div>
        <van-tabs v-model="active" swipeable :border="false" title-active-color="#6696FF" color="#6696FF" animated>
            <van-tab title="权益说明">
                <div class="card-introduce" v-html="cardIntroduce.qyremark"></div>
                <div v-show="isSpecial">
                    <img class="" src="@imgs/goodsdetail/tx1.png" alt="">
                    <img class="" src="@imgs/goodsdetail/tx2.png" alt="">
                </div>
            </van-tab>
            <van-tab title="订购说明">
                <div class="card-introduce" v-html="orderremark"></div>
            </van-tab>
        </van-tabs>
    </div> -->
    <!-- 新版详情样式 -->
    <div id="detail-card">
        <!-- <div class="detail-card-title">权益说明</div> -->
        <div class="detail-card-introduce" v-html="cardIntroduce.qyremark"></div>
    </div>
</template>

<script>
    export default {
        name: 'detailcard',
        props: {
            cardTitle: String,
            cardIntroduce: Object,
        },
        data() {
            return {
                active: 0,
                isSpecial: false,// 判断当前产品是否是被写死的
                mid: this.$route.params.mid,
                orderremark: '订购说明<br/><br/>1.订购对象：中国移动用户<br/><br/>2.订购规则：<br/>（1）话费单次订购：话费支付，订购后立刻扣费、发放权益，次月不自动续订。<br/>（2）话费连续包月：话费支付，订购后立刻扣费、发放权益，次月1日起按月自动扣费续订、发放权益。<br/>（3）微信支付、支付宝支付单次订购：订购后立刻扣费、发放权益，次月不自动续订。<br/>订购成功后，请以下发短信内容为准。<br/><br/>3.权益发放说明<br/>（1）单次订购：扣费成功后，权益将自动发放至本机号码所绑定的权益账号。<br/>（2）连续包月：扣费成功后，权益将自动发放至本机号码所绑定的权益账号。次月1日起自动为续订用户发放权益。<br/><br/>4.退订规则：<br/>（1）单次订购：不支持退订，不自动续订。<br/>（2）连续包月：退订次月生效，次月1日起不再自动扣费。退订时、不影响已经发放的会员使用。成功退订信息请以下发短信内容为准。<br/><br/>5.温馨提示：<br/>（1）若手机号码属于欠费状态，将无法自动发放权益；欠费用户充值复机后，次日凌晨会自动重新给用户发放权益。<br/>（2）若续订号码次月1~5日均处于欠费状态时，本月将不再自动为用户发放权益。请在每月5日前及时充值，保持手机号码正常、不欠费。<br/>（3）请在订购时确保电话畅通不欠费，欠费将无法订购成功。<br/>（4）订购本业务的费用是否纳入保底消费、消费抵扣等问题请详询当地10086。<br/>（5）本活动与苹果公司（Apple Inc.）无关。<br/>（6）若因为权益方原因终止所订权益的服务或核销使用，请联系相应权益方咨询处理。',
            }
        },
        mounted() {
            if (this.$route.params.mid == '2') {
                this.isSpecial = true;
            } else {
                this.isSpecial = false;
            }
        },
        watch:{
            $route(to){
                if (to.params.mid == '2') {
                    this.isSpecial = true;
                } else {
                    this.isSpecial = false;
                }
            }
        },
    }
</script>

<style lang="less">
    #detail-card{
        font-size: 0;
        padding: 0 .35rem .35rem;
        .card-title{
            position: relative;
            height: .88rem;
            line-height: .88rem;
            padding-left: .57rem;
            text-align: left;
            font-size: .3rem;
            font-weight: 500;
        }
        .card-title:after{
            content: '';
            position: absolute;
            width: .1rem;
            height: .28rem;
            left: .35rem;
            top: 50%;
            margin-top: -.14rem;
            background: #6696FF;
        }
        .card-image{
            width: 100%;
        }
        .card-introduce{
            padding: .1rem .5rem .35rem;
            text-align: left;
            font-size: .24rem;
        }
        .van-tabs{
            .van-tabs__wrap{
                width: 3.5rem;
                margin: 0 auto;
                .van-tab__text{
                    font-size: .28rem;
                }
            }
        }
        // 新版样式
        .detail-card-title{
            font-size: .34rem;
            color: #333;
            font-weight: bold;
            text-align: left;
            margin-bottom: .38rem;
        }
        .detail-card-introduce{
            text-align: left;
            font-size: .28rem !important;
            line-height: .4rem !important;
            color: #666;
        }
    }
</style>