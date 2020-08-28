<template>
    <!-- 单选框 -->
    <div id="swipe-radio">
        <van-radio-group class="radio-select" v-model="radio" @change="changeRadio()">
            <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide v-for="(item, index) in radioObj.list" :key="index">
                    <van-radio :disabled="item.disable" v-show="!item.hidden"
                        :name="item.value">
                        <div class="radio-font" v-for="label in item.label" :key="label.index">
                            <!-- 标识 -->
                            <div v-show="(isVip || isStarVip) && itemDetail.price2 && itemDetail.tc == item.value" class="radio-font-icon">
                                <span v-show="!item.fivego">优惠购</span>
                            </div>
                            <div v-show="item.fivego" class="radio-font-icon">
                                <span>5折购</span>
                            </div>
                            <div v-show="itemDetail.aid !='0'" class="radio-font-icon radio-font-icon-seckill">
                                <span>1元秒杀</span>
                            </div>
                            <div class="radio-font-title">
                                <div class="radio-font-title-con"><span>{{label}}</span></div>
                            </div>
                            <div class="swipe-price" v-show="itemDetail.tc == item.value">
                                <div class="swipe-price-fee">¥<span ref="price1"></span></div>
                                <!-- 是会员，并且有price2的情况 -->
                                <div v-show="((isVip || isStarVip) && nowPrice2) || item.fivego || (nowPrice2 && nowPrice2!= '0' && itemDetail.aid != '0')" class="swipe-price-origin swipe-price-delete">
                                    ¥<span ref="price2"></span>
                                </div>
                                <!-- 未登录非会员的样式 -->
                                <div v-show="(!isVip && !isStarVip) && nowPrice2 && !item.fivego && itemDetail.aid == '0'" class="swipe-price-origin swipe-price-vip">
                                    <span class="swipe-price-vip-con">会员价¥<span ref="price2"></span></span>
                                </div>
                            </div>
                            <div class="swipe-price" v-show="itemDetail.tc != item.value">
                                <div class="swipe-price-fee">¥<span>{{(item.price/100)}}</span></div>
                                <!-- 是会员，并且有price2的情况 -->
                                <div v-show="(isVip || isStarVip) && item.price2 || item.fivego" class="swipe-price-origin swipe-price-delete">
                                    ¥<span>{{(item.price2/100)}}</span>
                                </div>
                                <!-- 未登录非会员的样式 -->
                                <div v-show="(!isVip && !isStarVip) && item.price2 && !item.fivego" class="swipe-price-origin swipe-price-vip">
                                    <span class="swipe-price-vip-con">会员价¥{{(item.price2/100)}}</span>
                                </div>
                            </div>
                        </div>
                    </van-radio>
                </swiper-slide>
            </swiper>
            <!-- <van-swipe :loop="false" :show-indicators="false" :width="150" ref="swiperadio">
                <van-swipe-item v-for="(item, index) in radioObj.list" :key="index">
                    <div class="swipe-item">
                        <van-radio :disabled="item.disable" v-show="!item.hidden"
                            :name="item.value">
                            <div class="radio-font" v-for="label in item.label" :key="label.index">{{label}}</div>
                        </van-radio>
                    </div>
                </van-swipe-item>
            </van-swipe> -->
            <!-- <van-radio :disabled="item.disable" v-show="!item.hidden"
                v-for="item in radioObj.list" :key="item.index"
                :name="item.value">
                <div class="radio-font" v-for="label in item.label" :key="label.index">{{label}}</div>
                <span v-show="item.vip" class="radio-vip"></span>
            </van-radio> -->
        </van-radio-group>
    </div>
</template>

<script>
    export default {
        name: 'swiperadio',
        props: {
            radioObj: Object,
            itemDetail: Object,
            isVip: Number,
            isStarVip:Number,
        },
        computed: {
            // 定义swiper，在下面就可以引用这个swiper了；
            swiper: function () {
                return this.$refs.mySwiper.$swiper;
            },
        },
        watch: {
            'radio': {
                deep: true,
                handler: function (value) {
                    for (let index = 0; index < this.radioObj.list.length; index++) {
                        const item = this.radioObj.list[index];
                        if (item.value == value && this.radioObj.list.length > 3) {
                            this.swiper.slideTo(index - 1);
                        }
                    }
                }
            },
            'radioObj': {
                deep: true,
                handler: function (value) {
                    if (value.list.length <= 3) {
                        this.swiper.slideTo(0, 0);
                        this.swiper.allowTouchMove = false;
                    } else {
                        this.swiper.allowTouchMove = true;
                    }
                }
            },
            'itemDetail': {
                deep: true,
                handler: function (value) {
                    this.nowPrice = value.price;
                    this.nowPrice2 = value.price2;
                },
            }
        },
        data() {
            return {
                radio: this.radioObj.value,
                swiperOptions: {
                    slidesPerView : 3.25,
                    slidesOffsetBefore : 17.5,
                    slidesOffsetAfter : 17.5,
                },
                nowPrice: '0',
                nowPrice2: '',
            };
        },
        mounted() {
            this.nowPrice = this.itemDetail.price;
            if (this.itemDetail.price2) this.nowPrice2 = this.itemDetail.price2;
            let time1 = setInterval(()=> {
                if (this.$refs.price1) {
                    this.initValue();
                    clearInterval(time1);
                }
            }, 100);
            
        },
        methods: {
            changeRadio() {
                this.radioObj.value = this.radio;
                this.$emit('change', this.radio, this.radioObj);
            },
            initValue() {
                this.$nextTick(() => {
                    for (let index = 0; index < this.$refs.price1.length; index++) {
                        const item = this.$refs.price1[index];
                        item.innerHTML = this.itemDetail.price/100;
                    }
                    for (let index = 0; index < this.$refs.price2.length; index++) {
                        const item = this.$refs.price2[index];
                        item.innerHTML = this.itemDetail.price2/100;
                    }
                })
            },
        },
    }
</script>

<style lang="less">
    #swipe-radio{
        .radio-title{
            text-align: left;
            font-size: .28rem;
        }
        .radio-font{
            .radio-font-icon{
                position: absolute;
                top: 0;
                width: 1.1rem;
                height: .32rem;
                line-height: .32rem;
                text-align: center;
                background:linear-gradient(135deg,rgba(241,211,143,1),rgba(237,173,99,1));
                border-radius: .1rem 0 .16rem 0rem;
                font-size: .22rem;
                color: #462F12;
            }
            .radio-font-icon-seckill{
                background:linear-gradient(135deg,rgba(245,95,95,1),rgba(245,95,95,1));
                color: #FFF;
            }
            .radio-font-title{
                box-sizing: border-box;
                position: absolute;
                display: table;
                width: 100%;
                top: .4rem;
                line-height: .3rem;
                padding: 0 .3rem;
                .radio-font-title-con{
                    display: table-cell;
                    vertical-align: middle;
                    height: .53rem;
                    span{
                        display: inline-block;
                        max-height: .6rem;
                        overflow: hidden;
                    }
                }
            }
            .swipe-price{
                .swipe-price-fee{
                    width: 100%;
                    position: absolute;
                    top: 1.17rem;
                    font-size: .36rem;
                    color: #FD7027;
                    font-family: SourceHanSansCN-Heavy;
                    font-weight: 500;
                    span{
                        font-size: .56rem;
                        font-weight: bold;
                    }
                }
                .swipe-price-origin{
                    width: 100%;
                    position: absolute;
                    top: 1.8rem;
                }
                .swipe-price-delete{
                    font-size: .26rem;
                    color: #656565;
                    text-decoration: line-through;
                }
                .swipe-price-vip{
                    .swipe-price-vip-con{
                        width: 2rem;
                        height: .36rem;
                        line-height: .36rem;
                        text-align: center;
                        display: inline-block;
                        background: linear-gradient(135deg,rgba(241,211,143,1),rgba(237,173,99,1));
                        border-radius: .18rem;
                    }
                }
            }
        }
        // radio样式重写
        .radio-select{
            text-align: left;
            font-size: 0;
            .van-radio{
                display: inline-block;
                // width: 2.16rem;
                // height: 2.6rem;
                font-size: .24rem;
                text-align: center;
                position: relative;
                margin-right: .16rem;
                margin-bottom: .26rem;
                
                .radio-vip{
                    position: absolute;
                    width: .56rem;
                    height: .3rem;
                    bottom: 0;
                    right: 0;
                    background-image: url('../../assets/imgs/goodsdetail/vipIcon.png');
                    background-size: .56rem .3rem;
                }
            }
            // .van-radio:nth-child(3n){
            //     margin-right: 0;
            // }
            .van-radio:last-child{
                margin-right: 0;
            }
            .van-radio__icon{
                opacity: 0;
                position: absolute;
                top: 0;
            }
            .van-radio__label{
                box-sizing: border-box;
                display: inline-block;
                width: 2.16rem;
                height: 2.6rem;
                margin-left: 0;
                padding: .19rem 0;
                background: #F5F7FA;
                border-radius: .1rem;
                border: .02rem solid #D8D8D8;
                border-radius: .1rem;
                background: #FFF;
                box-shadow: 0 .02rem .04rem 0 rgba(0, 0, 0, 0.15);
                position: relative;
            }
            .van-radio__icon--checked+.van-radio__label{
                background: #FCEDE6;
                border-color: #FD7028;
            }
        }
    }
</style>