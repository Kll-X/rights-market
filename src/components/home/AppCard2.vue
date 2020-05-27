<template>
        <router-link tag='div' :class="{'app-card':true,'split-line':index>0}" :to="{name: 'goodsDetail', params: {mid:info.mid,saleid:info.saleid,proid: info.proid }}">
            <img class="logo" :src="Common.getImgUrl(info.icon)" alt="">
            <div class="detail-desc">
                <div class="title">
                    <div class="name">{{name}}</div>
                    &nbsp;
                    <img class="symbol" src="@imgs/half_mark.png"  alt="">
                </div>
                <div class="pay">
                    <span class="half-price" v-if="info.price">
                        {{(parseInt(info.price)/100).toFixed(2)}}
                    </span>
                    <span class="half-unit" v-if="info.price">
                        元/月
                    </span>
                    &nbsp;
                    <span class="normal-price" v-if="info.originprice">
                        {{(parseInt(info.originprice)/100).toFixed(2)}}元/月
                    </span>
                </div>
            </div>
            <span class="panic-buy" @click.stop="panicBuy">抢购</span>
        </router-link>
</template>

<script>
    export default {
        name: "app-card2",
        props:["info","index"],
        computed:{
            name(){
                if(this.info.name.length > 8){
                    return this.info.name.substring(0, 7) + '...'
                }else{
                   return this.info.name
                }
            }
        },
        methods:{
            panicBuy(){
                this.$router.push({name: 'goodsDetail', params: {mid:this.info.mid,saleid:this.info.saleid,proid: this.info.proid }})
            }
        }
    }
</script>

<style lang="less" scoped>
    .app-card{
        overflow: hidden;
        width: 100%;
        height: 1.4rem;
        // background: url("../../assets/imgs/home/appbg_vip.png") no-repeat center/100% 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding:0.24rem 0; 
        .logo{
            width:1.4rem;
            height:1.4rem;
            margin-right:0.24rem; 
            display: block;
        }
        .detail-desc{
            height: 100%;
            flex:1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .title{
                padding: 0.33rem 0 0.18rem;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                height:0.25rem;
                .name{
                    font-size: 0.24rem;
                    color:#68676d;
                    font-weight: bold;
                    // overflow: hidden;  /*超出部分隐藏*/
                    // white-space: nowrap;  /*禁止换行*/
                    // text-overflow: ellipsis; /*省略号*/
                }
                .symbol{
                    height:0.25rem;
                    padding-top: 0.02rem;
                }
            }
            .pay{
                text-align: left;
                .half-price{
                    font-size: 0.34rem;
                    font-weight: bold;
                    color:#f1c08a;
                }
                .half-unit{
                    font-size: 0.21rem;
                    color:#f1c08a;
                }
                .normal-price{
                    font-size: 0.21rem;
                    color:#c9cbce;
                    text-decoration: line-through
                }
            }
        }
        .panic-buy{
            width:1.24rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right:0.02rem;
            height:0.62rem;
            border: 1px solid #edae64;
            color:#edae64;
            border-radius: 0.62rem;
        }
    }
    .split-line{
        border-top: solid 1px rgb(215, 217, 219);;
    }
</style>