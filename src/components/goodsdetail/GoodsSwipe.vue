<template>
    <!-- 蒙版 -->
    <div id="goods-swipe">
        <van-swipe :loop="false" @change="changeSwipe" ref="swipe">
            <van-swipe-item :class="{'van-swipe-five': (itemDetail.fivego == 1 && swipeIndex == index)}"
                v-for="(item, index) in swipeList" :key="index">
                <div class="swipe-item">
                    <img class="swipe-item-icon" :src=" Common.getImgUrl(item.icon)" alt="">
                    <div class="swipe-item-font-wrap">
                        <div class="swipe-item-font-con">
                            <span class="swipe-item-font-name">
                                {{item.name}}
                                <img v-show="itemDetail.fivego == 1" class="swipe-item-vip-icon" src="@imgs/goodsdetail/vip.png" alt="">
                            </span>
                            <!-- 非会员或未登录的样式 -->
                            <span v-show="!isVip && itemDetail.fivego != 1" class="swipe-item-font-fee">
                                资费：{{((itemDetail.price)/100).toFixed(2)}}元
                                <span v-show="itemDetail.price2" class="swipe-item-font-postposition">
                                    会员：{{((itemDetail.price2)/100).toFixed(2)}}元
                                </span>
                            </span>
                            <!-- 登录是会员或者五折产品的样式 -->
                            <span v-show="isVip || itemDetail.fivego == 1" class="swipe-item-font-fee" :class="{'swipe-item-font-vip': itemDetail.price2}">
                                <i v-show="itemDetail.fivego != 1 && itemDetail.price2">会员价：</i>
                                <i v-show="itemDetail.fivego != 1 && !itemDetail.price2">资费：</i>
                                <i v-show="itemDetail.fivego == 1">5折：</i>
                                {{((itemDetail.price)/100).toFixed(2)}}元
                                <span v-show="itemDetail.price2" class="swipe-item-font-postposition swipe-item-font-postposition-delete">
                                    {{((itemDetail.price2)/100).toFixed(2)}}元
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    export default {
        props: {
            swipeList: Array,
            isVip: Number,
            itemDetail: Object,
        },
        data() {
            return {
                list: this.swipeList,
                swipeIndex: 0,
            };
        },
        mounted() {
            
        },
        methods: {
            changeSwipe(index) {
                this.swipeIndex = index;
                this.$emit('change', index);
            }
        },
    }
</script>

<style lang="less">
    #goods-swipe{
        height: 2.4rem;
        background: #FFF;
        width: 100%;
        overflow: hidden;
        .van-swipe{
            margin: 0 .45rem;
            height: 2.4rem;
            overflow: visible;
            .van-swipe__track{
                .van-swipe-item{
                    background-image: url('../../assets/imgs/goodsdetail/swipeBg.png');
                    background-size: 6.6rem 2.4rem;
                    .swipe-item{
                        padding: .53rem 0 .61rem .45rem;
                        font-size: 0;
                        text-align: left;
                        .swipe-item-icon{
                            display: inline-block;
                            vertical-align: top;
                            width: 1.26rem;
                            height: 1.26rem;
                            margin-right: .25rem;
                        }
                        .swipe-item-font-wrap{
                            display: inline-block;
                            width: calc(~"100% - 1.74rem");
                            vertical-align: top;
                            .swipe-item-font-con{
                                display: flex;
                                height: 1.26rem;
                                flex-flow: column;
                                align-items: center;
                                text-align: left;
                                color: #0F0B1A;
                                i{
                                    font-style: normal;
                                }
                                span{
                                    flex: 1;
                                    width: 100%;
                                    display: flex;
                                }
                                .swipe-item-font-name{
                                    font-size: .36rem;
                                    opacity: .8;
                                    align-items: flex-end;
                                }
                                .swipe-item-vip-icon{
                                    width: 1rem;
                                    height: .26rem;
                                    margin-left: .16rem;
                                    margin-bottom: .08rem;
                                }
                                .swipe-item-font-fee{
                                    font-size: .3rem;
                                    color: #6696FF;
                                    opacity: .8;
                                    align-items: flex-start;
                                    .swipe-item-font-postposition{
                                        font-size: .22rem;
                                        color: #EDAE63;
                                        opacity: .8;
                                        margin-left: .15rem;
                                        margin-top: .05rem;
                                        align-items: flex-start;
                                    }
                                }
                                .swipe-item-font-vip{
                                    color: #EDAE63;
                                    .swipe-item-font-postposition-delete{
                                        color: #BDBFC2;
                                        text-decoration: line-through;
                                    }
                                }
                            }
                        }
                    }
                }
                .van-swipe-five{
                    background-image: url('../../assets/imgs/goodsdetail/swipeFive.png');
                }
            }
            .van-swipe__indicators{
                opacity: 0;
            }
        }
    }
</style>