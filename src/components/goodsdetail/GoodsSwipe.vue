<template>
    <!-- 蒙版 -->
    <div id="goods-swipe">
        <van-swipe :loop="false" @change="changeSwipe" ref="swipe">
            <van-swipe-item
                v-for="item in swipeList" :key="item.index">
                <div class="swipe-item">
                    <img class="swipe-item-icon" :src=" Common.getImgUrl(item.icon)" alt="">
                    <div class="swipe-item-font-wrap">
                        <div class="swipe-item-font-con">
                            <span class="swipe-item-font-name">{{item.name}}</span>
                            <span class="swipe-item-font-fee">资费：{{((price)/100).toFixed(2)}}元</span>
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
            price: String,
        },
        data() {
            return {
                list: this.swipeList
            };
        },
        mounted() {
            
        },
        methods: {
            changeSwipe(index) {
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
                                .swipe-item-font-fee{
                                    font-size: .3rem;
                                    color: #6696FF;
                                    opacity: .8;
                                    align-items: flex-start;
                                }
                            }
                        }
                    }
                }
            }
            .van-swipe__indicators{
                opacity: 0;
            }
        }
    }
</style>