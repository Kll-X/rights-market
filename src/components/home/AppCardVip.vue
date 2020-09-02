<template>
    <div id="app-card-vip">
        <div class="vip-list">
            <!-- <app-card1 v-for="(item,j) in vipApps" :key="j" :item="item" :index="j" :vip="true"  @click.native="blocklogHandler('会员优惠购','0011',(j<9?'000'+(j+1):'00'+(j+1)),'',item.mid,item.name)"></app-card1> -->
            <swiper class="vip-swipe" ref="vipSwipe" :options="vipSwipe">
                <swiper-slide v-for="(item, j) in vipApps" :key="j">
                    <!-- <router-link tag="div" to="/sort" class="text-font">{{item}}</router-link> -->
                    <!-- <app-card1 :item="item" :index="j" @click.native="blocklogHandler('会员优惠购','0011',(j<9?'000'+(j+1):'00'+(j+1)),'',item.mid,item.name)"></app-card1> -->
                    <router-link tag='div' :class="{'app-card':true}" :to="{name: 'goodsDetail', params: {mid:item.mid,saleid:item.saleid,proid: item.proid }}">
                        <img class="logo" :src="Common.getImgUrl(item.icon)" alt="">
                        <div class="name">{{item.name}}</div>
                        <div class="vip-pay">
                            <span class="price" v-if="item.price">会员价¥</span>
                            &nbsp;
                            <span class="price-font">{{(parseInt(item.price)/100)}}</span>
                        </div>
                        <div class="originprice" v-if="item.originprice">
                            ¥{{(parseInt(item.originprice)/100)}}
                        </div>
                    </router-link>
                </swiper-slide>
                <swiper-slide>
                    <router-link tag='div' :class="{'app-card':true}" to="/vip">
                        <div class="search-more">查看更多</div>
                        <div class="search-icon"></div>
                    </router-link>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
    // import GuideHeadline from '@/components/home/GuideHeadline.vue'; 
    // import AppCard1 from '@/components/home/AppCard1.vue';    
    import { blocklogMixin } from "@/mixins/log"

    export default {
        name: "vip-buy",
        props:["vipApps"],
        mixins:[blocklogMixin],
        created(){
            // 曝光统计：会员优惠购
            // this.blocklogHandler('会员优惠购','0011','');
        },
        components:{
            // AppCard1
        },
        data() {
            return {
                vipSwipe: {
                    slidesPerView : 3.5,
                    slidesOffsetAfter : 12,
                },
            }
        },
    }
</script>

<style lang="less" scoped>
    #app-card-vip{
        .app-card{
            overflow: hidden;
            border-radius: 0.1rem;
            width: 1.8rem;
            height: 2.77rem;
            // background: #f7f7f7;
            background: url("../../assets/imgs/appbg_normal.png") no-repeat center/100% 100%;
            .logo{
                width:1.3rem;
                height:1.3rem;
                margin: 0.19rem auto 0;
                display: block;
            }
            .name{
                box-sizing: border-box;
                width: 100%;
                font-size: 0.26rem;
                height: 0.45rem;
                color:#333;
                font-weight: 500;
                margin-bottom: 0.03rem;
                padding: 0 .1rem;
                overflow: hidden;  /*超出部分隐藏*/
                white-space: nowrap;  /*禁止换行*/
                text-overflow: ellipsis; /*省略号*/
                display:flex;
                align-items:center;
                justify-content:center;
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
            .search-more{
                width: 100%;
                text-align: center;
                font-size: .26rem;
                background: linear-gradient(to bottom, #583E15, #271A05);
                background-clip: text;
                color: transparent;
                margin-top: 1rem;
            }
            .search-icon{
                margin-top: .19rem;
                display: inline-block;
                width: .3rem;
                height: .3rem;
                line-height: .3rem;
                background: linear-gradient(180deg,rgba(88,62,21,1),rgba(39,26,5,1));
                border-radius: 50%;
                text-align: center;
                position: relative;
                &::after{
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border-right: .02rem solid #FFF;
                    border-bottom: .02rem solid #FFF;
                    width: .1rem;
                    height: .1rem;
                    margin-top: -.05rem;
                    margin-left: -.08rem;
                    transform: rotate(-45deg);
                }
            }
        }
        .vip-pay{
            width: 100%;
            font-size: 0.24rem;
            height: 0.33rem;
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
                height:0.25rem;
            }
            .price{
                color:#EDAE63;
            }
            .price-font{
                font-size: .32rem;
                color: #EDAE63;
                font-weight: bold
            }
        }
        .originprice{
            width: 100%;
            font-size: 0.24rem;
            overflow: hidden;  /*超出部分隐藏*/
            white-space: nowrap;  /*禁止换行*/
            text-overflow: ellipsis; /*省略号*/
            color:#BDBFC2;
            text-decoration: line-through
        }
    }
</style>