<template>
    <router-link tag='div' :class="{'hot-card':true}" :to="{name: 'goodsDetail', params: {mid:this.info.mid,saleid:this.info.saleid,proid: this.info.proid }}">
        <div class="card-item">
            <div>
                <img class="img" :src="Common.getImgUrl(info.icon)" alt="">
            </div>            
            <div class="item-dec">
                <div class="item-dec-line1">
                    <img v-if="(is_hotOrNew < this.hotCount)&&(is_hotOrNew >=0)" class="hot-item" src="@imgs/home/hotSell_hot.png">
                    <img v-else-if="is_hotOrNew >=this.hotCount" class="new-item" src="@imgs/home/hotSell_new.png">
                    <span class="item-name">{{info.name}}{{info.tcremark}}</span>
                </div>               
                <div class="item-price">
                    <div v-if="info.originprice == null"><span class="item-price-flag">¥</span><span class="item-price-num">{{item_price}}</span></div>
                    <div v-else><span class="item-price-flag">会员价¥</span><span class="item-price-num">{{item_price}}</span><span class="origin-price">原价¥{{item_originPrice}}</span></div>
                </div>
            </div>
        </div>
        <div class="buy-item">
            <img class="buy-item" src="@imgs/home/hotSell_buy.png">
        </div>
    </router-link>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "hot-card",
        props:["info","index","saleId","hotCount"],
        data(){
            return{
                isHotItem:false,
                isNewItem:false,
            }
        },
        computed:{
            ...mapState([
                "sysInfo"
            ]),
            is_hotOrNew(){
                this.info.saleid = this.info.saleid+""
                return this.saleId.indexOf(this.info.saleid);            
            },
            item_price(){
                let price = this.info.price/100
                let temp = String(price).indexOf(".") + 1;//获取小数点的位置
                //let count = String(price).length - temp;//获取小数点后的个数
                if(temp > 0) {//有小数
                    return price.toFixed(1)
                } else {//没小数
                    return price
                }
            },
            item_originPrice(){
                let price = this.info.originprice/100
                let temp = String(price).indexOf(".") + 1;//获取小数点的位置
                //let count = String(price).length - temp;//获取小数点后的个数
                if(temp > 0) {//有小数
                    return price.toFixed(1)
                } else {//没小数
                    return price
                }
            }
        },
        methods:{
        }
    }
</script>

<style lang="less" scoped>
    .hot-card{
        height: 1.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: .01rem solid rgba(240, 240, 240, 1);
        .img{
            width: 1.3rem;
            height: 1.3rem
        }
        .card-item{
            display: flex;
        }
        .buy-item{
            width: 1.16rem;
            height: 0.56rem;
        }
        .item-dec{
            display: flex;
            flex-direction: column;
            text-align: left;
            justify-content: center;  
            .item-dec-line1{
                display: flex;
                align-items: center;
                .hot-item,.new-item{
                    width: .64rem;
                    height: .31rem;
                    margin-left: .2rem;               
                } 
            }     
             
        }
        .item-price{
            margin-left: .21rem;
            color: #fd7028;
            margin-top: 0.16rem;
            .item-price-flag{
                font-size: 0.26rem;
                line-height: 0.26rem;
            }
            .item-price-num{
                font-size: 0.36rem;
                font-weight: bold;
                margin-left: 0.03rem;
                line-height: 0.36rem;
            }
            .origin-price{
                margin-left: .24rem;
                color: #999999;
                font-size: .26rem;
                line-height: .26rem;
            }
        }
        .item-name{
            font-size: 0.3rem;
            color: #333333;
            margin-left: .13rem;
        }
    }
</style>