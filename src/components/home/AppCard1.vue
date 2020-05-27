<template>
        <router-link tag='div' :class="{'app-card':true,'marginRight':index%3!=2,'wrap':index>2,'vip':vip}" :to="{name: 'goodsDetail', params: {mid:info.mid,saleid:info.saleid,proid: info.proid }}">
            <img class="logo" :src="Common.getImgUrl(info.icon)" alt="">
            <div class="name">{{name}}</div>
            <div v-show="vip" class="vip-pay">
                <img class="symbol" src="@imgs/vip_mark.png"  alt="">
                &nbsp;
                <span class="price" v-if="info.price">{{(parseInt(info.price)/100).toFixed(2)}}元/月</span>
            </div>
            <div class="originprice" v-if="vip && info.originprice">
                {{(parseInt(info.originprice)/100).toFixed(2)}}元/月
            </div>
            <div class="pay" v-if="!vip">{{info.remark}}</div>
        </router-link>
</template>

<script>
    export default {
        name: "app-card1",
        props:["info","index","vip"],
        computed:{
            name(){
                if(this.info.name.length > 8){
                    return this.info.name.substring(0, 7) + '...'
                }else{
                   return this.info.name
                }
                
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
        .logo{
            width:1.4rem;
            height:1.4rem;
            margin: 0.36rem 0.4rem 0.24rem;
            display: block;
        }
        .name{
            width: 100%;
            font-size: 0.24rem;
            color:#68676d;
            font-weight: bold;
            margin-bottom: 0.12rem;
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
        background: url("../../assets/imgs/appbg_vip.png") no-repeat center/100% 100%;
        .vip-pay{
            width: 100%;
            font-size: 0.21rem;
            opacity: 0.8;
            overflow: hidden;  /*超出部分隐藏*/
            white-space: nowrap;  /*禁止换行*/
            text-overflow: ellipsis; /*省略号*/
            display: flex;
            justify-content: center;
            align-items: center;
            .symbol{
                height:0.25rem;
            }
            .price{
                color:#efbe89
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
            text-decoration: line-through
        }
    }
    .marginRight{
        margin-right: 0.10rem
    }
    .wrap{
        margin-top: 0.1rem;
    }
</style>