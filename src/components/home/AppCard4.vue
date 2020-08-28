<template>
    <router-link tag='div' :class="{'app-card':true,'marginRight':index%4!=3,'wrap':index>3,'vip':vip}" :to="{name: 'goodsDetail', params: {mid:info.mid,saleid:info.saleid,proid: info.proid }}">
        <img class="logo" :src="Common.getImgUrl(info.icon)" alt="">
        <div class="name">{{name}}</div>
        <div class="vip-pay" v-show="info.price">
            <!-- <img class="symbol" src="@imgs/vip_mark.png"  alt=""> -->
            <!-- &nbsp; -->
            <span class="price" v-if="info.price">¥{{(parseInt(info.price)/100)}}</span>
            &nbsp; 
            <span>起</span>
        </div>
        <!-- <div class="originprice" v-if="vip && info.originprice">
            ¥{{(parseInt(info.originprice)/100).toFixed(2)}}起
        </div>
        <div class="pay" v-if="!vip">{{info.remark}}</div> -->
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
        width:1.58rem;
        height: 2.45rem;
        // background: #f7f7f7;
        background: url("../../assets/imgs/appbg_normal.png") no-repeat left bottom/100% 75%;
        position: relative;
        .logo{
            width:1.3rem;
            height:1.3rem;
            margin-bottom:0.2rem;
            display: block;
            position: relative;
            top:0;
            left: 50%;
            transform: translateX(-50%)
        }
        .status{
            width:1.4rem;
            height:1.4rem;
            display: block;
            position: absolute;
            top:0;
            left: 50%;
            transform: translateX(-50%)
        }
        .name{
            box-sizing: border-box;
            width: 100%;
            font-size: 0.26rem;
            color:#333;
            padding: 0 .15rem;
            margin-bottom: 0.15rem;
            text-align: left;
            overflow: hidden;  /*超出部分隐藏*/
            white-space: nowrap;  /*禁止换行*/
            text-overflow: ellipsis; /*省略号*/
        }
        .pay{
            box-sizing: border-box;
            width: 100%;
            font-size: 0.26rem;
            color:#FD7028;
            font-weight: bold;
            padding: 0 .1rem;
            overflow: hidden;  /*超出部分隐藏*/
            white-space: nowrap;  /*禁止换行*/
            text-overflow: ellipsis; /*省略号*/
        }
        .vip-pay{
            width: 100%;
            font-size: 0.26rem;
            opacity: 0.8;
            overflow: hidden;  /*超出部分隐藏*/
            white-space: nowrap;  /*禁止换行*/
            text-overflow: ellipsis; /*省略号*/
            text-align: left;
            padding: 0 .15rem;
            color:#FD7028;
            .symbol{
                height:0.25rem;
            }
            .price{
                font-size: 0.28rem;
                font-weight: bold;
            }
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
            display: -webkit-flex; 
            justify-content: center;
            -webkit-justify-content: center;
            align-items:center;
            -webkit-align-items: center;
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
        margin-right: 0.16rem
    }
    .wrap{
        margin-top: 0.26rem;
    }
</style>