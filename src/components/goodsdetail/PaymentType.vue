<template>
    <!-- 单选框 -->
    <div id="payment-type">
        <van-radio-group class="radio-select" v-model="radio" @change="changeRadio()" checked-color="#FD7028">
            <van-cell-group v-show="!item.disable"
                v-for="item in radioObj.list" :key="item.index">
                <van-cell :title="item.name" clickable @click="radio = item.value">
                    <template #title>
                        <img v-show="item.value==1" class="payment-type-icon" src="@imgs/goodsdetail/cost.png" alt="">
                        <img v-show="item.value==2" class="payment-type-icon" src="@imgs/goodsdetail/cost-month.png" alt="">
                        <img v-show="item.value==3" class="payment-type-icon" src="@imgs/goodsdetail/alipay.png" alt="">
                        <img v-show="item.value==4" class="payment-type-icon" src="@imgs/goodsdetail/wechat.png" alt="">
                        <span class="payment-type-title">{{item.name}}</span>
                    </template>
                    <template #right-icon>
                        <van-radio :name="item.value" />
                    </template>
                </van-cell>
            </van-cell-group>
            <div class="clear-line"></div>
            <!-- <van-radio :disabled="item.disable" v-show="!item.hidden"
                v-for="item in radioObj.list" :key="item.index"
                :name="item.value">
                <div></div>
                <div class="radio-font" v-for="label in item.label" :key="label.index">{{label}}</div>
                <span v-show="item.vip" class="radio-vip"></span>
            </van-radio> -->
        </van-radio-group>
    </div>
</template>

<script>
    export default {
        name: 'paymenttype',
        props: {
            radioObj: Object,
        },
        data() {
            return {
                radio: this.radioObj.value
            };
        },
        mounted() {
            
        },
        methods: {
            changeRadio() {
                this.radioObj.value = this.radio;
                this.$emit('change', this.radio, this.radioObj);
            }
        },
    }
</script>

<style lang="less">
    #payment-type{
        text-align: left;
        .radio-font{
            padding: 0 .48rem;
        }
        .radio-select{
            position: relative;
            .clear-line{
                position: absolute;
                width: 100%;
                height: .02rem;
                bottom: 0rem;
                background: #FFF;
                // z-index: 2;
            }
        }
        .van-cell-group{
            border-bottom: .02rem solid #F0F0F0;
            .van-cell{
                padding: .35rem 0;
                .payment-type-icon{
                    width: .47rem;
                    height: .47rem;
                    vertical-align: top;
                    margin-right: .17rem;
                }
                .payment-type-title{
                    font-size: .32rem;
                    color: #333;
                    font-weight: 500;
                    vertical-align: top;
                }
            }
            &:after{
                border: 0;
            }
        }
        
        // radio样式重写
        // .radio-select{
        //     text-align: left;
        //     font-size: 0;
        //     .van-radio{
        //         display: inline-block;
        //         min-width: 2.16rem;
        //         font-size: .24rem;
        //         text-align: center;
        //         position: relative;
        //         margin-right: .16rem;
        //         margin-bottom: .26rem;
        //         .radio-vip{
        //             position: absolute;
        //             width: .56rem;
        //             height: .3rem;
        //             bottom: 0;
        //             right: 0;
        //             background-image: url('../../assets/imgs/goodsdetail/vipIcon.png');
        //             background-size: .56rem .3rem;
        //         }
        //     }
        //     // .van-radio:nth-child(3n){
        //     //     margin-right: 0;
        //     // }
        //     .van-radio:last-child{
        //         margin-right: 0;
        //     }
        //     .van-radio__icon{
        //         opacity: 0;
        //         position: absolute;
        //         top: 0;
        //     }
        //     .van-radio__label{
        //         display: inline-block;
        //         min-width: 2.16rem;
        //         margin-left: 0;
        //         padding: .19rem 0;
        //         background: #F5F7FA;
        //         border-radius: .1rem;
        //         line-height: .3rem;
        //     }
        //     .van-radio__icon--checked+.van-radio__label{
        //         background: #E6EEFF;
        //         // color: #FFF;
        //     }
        // }
    }
</style>