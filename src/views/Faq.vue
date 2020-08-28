<template>
    <div id="faq">
        <div class="faq-title">常见问题</div>
        <van-collapse class="faq-content" v-model="activeNames">
            <van-collapse-item v-for="(item, index) in faqList" :key="index"
                :name="item.id" @click.native="blocklogHandler('常见问题列表','0035','000'+(index+1));">
                <template #title>
                    <div class="faq-content-title">
                        <div class="faq-content-icon">0{{ item.id }}</div>
                        <span class="faq-content-font">{{ item.title }}</span>
                    </div>
                </template>
                <div v-html="item.content"></div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
    import { pagelogMixin,blocklogMixin } from "@/mixins/log"
    export default {
        name: "faq",
        mixins: [pagelogMixin,blocklogMixin],
        data(){
            return{
                faqList: [{
                    id: 1,
                    title: '谁都可以订购权益超市的权益么？',
                    content: '答：不是的，仅限中国移动用户订购哦。',
                }, {
                    id: 2,
                    title: '权益购买后如何使用？',
                    content: '答：扣费成功后，权益会自动发放至本机号码所绑定的权益方账号；对于连续订购的权益，次月初扣费后自动下发；下发完成后具体使用规则以权益方官方说明为准。',
                }, {
                    id: 3,
                    title: '连续订购规则是什么？',
                    content: '答：连续订购话费支付后，订购后立即扣费并进行权益发放，下次扣费发生在次月1日哦，逐步完成扣费并进行权益下发，权益累加在已有权益中。其中单次扣费的权益次月不再进行扣费哦。',
                }, {
                    id: 4,
                    title: '权益怎么退订呢？',
                    content: '答：对于连续订购的权益，退订后次月生效，即次月1日起不再自动扣费。退订时，不影响已经下发的权益的使用。退订成功以短信内容为准哦。',
                }, {
                    id: 5,
                    title: '为什么会出现无法订购的情况？',
                    content: '答：以下情况会出现无法订购的情况：<br>' + 
                            '（1）手机号码处于欠费状态，将无法自动完成权益下发；若连续订购号码次月1日到5日处于欠费状态，本月将不再自动发放权益。<br>' + 
                            '（2）欠费用户充值复机后，次日凌晨会自动重新给用户发放权益；请保持手机号码不欠费哦。',
                }, {
                    id: 6,
                    title: '其它说明',
                    content: '（1）订购权益超市的费用是否纳入保底消费、消费抵扣等问题请详询当地10086；<br>' +
                            '（2）每个权益具体使用规则以权益方官方发布为准；<br>' + 
                            '（3）所有订购均与苹果公司（Apple Inc.）无关；<br>' +
                            '（4）若因为权益方原因终止所订购权益的服务或核销使用，请联系相应权益方咨询处理。',
                }, ],
                activeNames: [],
            }
        },
        components: {
        },
        computed:{
        },
        mounted() {
            this.blocklogHandler('常见问题列表','0035','');
        },
    }
</script>

<style lang="less">
    #faq{
        font-family:Source Han Sans CN;
        text-align: left;
        padding: 0 .35rem .7rem;
        .faq-title {
            font-size: .34rem;
            color: #333;
            padding: .34rem 0 .3rem .02rem;
            font-weight: bold;
        }
        .faq-content{
            &::after{
                display: none;
            }
            .van-collapse-item{
                border-bottom: .02rem solid #D7D9DB;
                .van-cell{
                    &::after{
                        display: none;
                    }
                    height: .35rem;
                    line-height: .35rem;
                    padding: .35rem 0;
                    box-sizing: content-box;
                    .van-cell__title{
                        .faq-content-title{
                            height: .35rem;
                            line-height: .35rem;
                            font-size: 0;
                            .faq-content-icon{
                                position: relative;
                                display: inline-block;
                                width: .54rem;
                                height: .35rem;
                                text-align: center;
                                background: #FD6F27;
                                color: #FFF;
                                font-size: .3rem;
                                font-weight: 500;
                                margin-right: .17rem;
                                &::after{
                                    content: '';
                                    position: absolute;
                                    bottom: -.07rem;
                                    left: 0;
                                    width: 0;
                                    height: 0;
                                    border: 0.07rem solid;
                                    border-color: #FD6F27 transparent transparent #FD6F27;
                                }
                            }
                            .faq-content-font{
                                font-size: .3rem;
                                font-weight: 500;
                                color: #333;
                            }
                        }
                    }
                    .van-icon {
                        height: .35rem;
                        line-height: .35rem;
                    }
                }
                .van-collapse-item__wrapper{
                    .van-collapse-item__content{
                        padding: 0 0 .4rem .71rem;
                        font-size: .28rem;
                        line-height: .4rem;
                        color: #656565;
                    }
                }
                &::after{
                    display: none;
                }
            }
        }
    }
</style>