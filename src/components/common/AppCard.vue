<template>
    <div class="appcard">
        <!-- 抄底购活动 -->
        <div :class="'type'+ cssType" :style="customStyle.wrapper" v-if="cssType == 0">
            <div class="icon">
                <img class="icon-img" :src="info.icon" alt="">
            </div>
            <div class="content">
                <div class="title" :style="customStyle.title">{{info.name}}</div>
                <div class="price">
                    <span class="price-current" :style="customStyle.currentPrice">{{parseFloat(info.price/100)}}元</span>
                    <span class="price-origin line-through" :style="customStyle.orginPrice">原价{{parseFloat(info.originprice/100)}}元</span>
                </div>
            </div>
            <div class="btn-order-wrapper">
                <div class="btn-order" v-if="canOrder" :class="info.exist?'ordered':''" :style="customStyle.btnOrder" @click="order">
                    订购
                </div>
                <div v-else class="btn-order ordered">
                    已过期
                </div>
            </div>
        </div>
        <!-- 会员优惠购 -->
        <div :class="'type'+ cssType" :style="customStyle.wrapper" v-if="cssType == 1">
            <router-link tag='div' :class="{'app-card':true,'vip':curCss.vip}" :to="{name: 'goodsDetail', params: {mid:info.mid,saleid:info.saleid,proid: info.proid }}">
                <div class="logo superscript_vip" :style="{background:'url('+Common.getImgUrl(info.icon)+') no-repeat center/100%'}"></div>
                <div class="name">{{appnameFormat(info.name,6)}}</div>
            <div v-show="curCss.vip" class="vip-pay">
                    会员价￥
                    <span class="price" v-if="info.price">{{info.price | price}}</span>
                </div>
                <div class="originprice" v-if="curCss.vip && info.originprice">
                    ￥{{info.originprice | price}}
                </div>
                <div class="pay" v-if="!curCss.vip">{{info.remark}}</div>
            </router-link>
        </div>
        <!-- 精选5折购 -->
        <div :class="'type'+ cssType" :style="customStyle.wrapper" v-if="cssType == 2">
            <router-link tag='div' :class="{'app-card':true}" :to="{name: 'goodsDetail', params: {mid:info.mid,saleid:info.saleid,proid: info.proid }}">
                <div class="logo superscript_vip" :style="{background:'url('+Common.getImgUrl(info.icon)+') no-repeat center/100%'}"></div>
                <div class="detail-desc">
                    <div class="title">
                        <div class="name">{{appnameFormat(info.name,12)}}</div>
                    </div>
                    <div class="pay">
                        <img class="symbol" src="@imgs/common/appcard/icon_discount_vip.png"  alt="">
                        <span class="half-unit" v-if="info.price">
                            &nbsp;￥
                        </span>
                        <span class="half-price" v-if="info.price">
                            {{info.price | price}}&nbsp;
                        </span>
                        <span class="normal-price" v-if="info.originprice">
                             ￥{{(info.originprice)| price}}
                        </span>
                    </div>
                </div>
                <span class="panic-buy" @click.stop="panicBuy">{{txt.orderBtn||'抢购'}}</span>
            </router-link>
        </div>
    </div>
    
</template>
<script>
    export default {
        name: "appcard",
        props: {
            'info':{
                type: Object
            },
            'cssType': {
                type: Number,
                default: 0
            },
            'txt': {
                type: Object,
            },
            'customStyle':{
                type: Object,
                default(){
                    return {
                        btnOrder:'',
                        title:'',
                        wrapper:''
                    }
                }
            }
        },
        data(){
            return{
                cssConfig:[{

                },{
                    vip:true
                    
                }],
                curCss:'',
                canOrder: true
            }
        },
        created() {
            this.curCss = this.cssConfig[this.cssType];
            if (new Date().getTime()>new Date(this.info.expiredate).getTime()) {
                this.canOrder = false;
            }
        },
        methods: {
            order() {
                if (this.info.exist) {
                    this.$emit('showToast',{
                        tips: '&nbsp;&nbsp;&nbsp;&nbsp;活动期间，同款权益只能购买一次，您可选择其他权益购买，详情参考活动说明。',
                        type: 0
                    })
                } else {
                    this.$emit('order',this.info)
                }
            },
            panicBuy(){
                this.$router.push({name: 'goodsDetail', params: {mid:this.info.mid,saleid:this.info.saleid,proid: this.info.proid }})
            },
            appnameFormat(name,length){
                if(name.length > length){
                    return name.substring(0, length-1) + '...'
                }else{
                    return name
                }
            }
        },
        filters: {
            appname(value) {
                if(value.length > 6){
                    return value.substring(0, 5) + '...'
                }else{
                    return value
                }
            },
            price(value){
                value = +value;
                let rlt;
                if (value%100 == 0) {
                    rlt = (value/100).toFixed(0);
                } else {
                    rlt = (value/100).toFixed(1);
                }
                return rlt;
            }
        }
    }
</script>
<style scoped lang='less'>
    .type0{
        display: flex;
        padding: .11rem .15rem;
        border-radius: .1rem;
        width: 5.75rem;
        height: .84rem;
        background-color: white;
        border:1px solid rgb(171, 207, 254);
        .icon {
            .icon-img{
                width: .89rem;
                height: .89rem;
            }
        }
        .content{
            padding-left: .2rem;
            width: 3.76rem;
            .title{
                font-size:.3rem;
                font-family:'FZZDHJW--GB1-0';
                font-weight:bold;
                color:rgb(53,53,53);
                text-align: left;
            }
            .price{
                text-align: left;
                .price-current{
                    font-size:.24rem;
                    font-family:'FZZDHJW--GB1-0';
                    font-weight:bold;
                    color:#ff4d36;
                }
                .price-origin{
                    font-size:.24rem;
                    font-family:'FZHTJW--GB1-0';                            
                    font-weight:400;
                    color:#999999;
                    padding-left:.1rem;
                }
            }
        }
        .btn-order-wrapper{
            display: flex;
            align-items: center;
            .btn-order{
                border: 1px solid #ff4d36;
                color: #ff4d36;
                border-radius: .5rem;
                font-size: .24rem;
                width: .92rem;      
                height: .38rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .btn-order.ordered{
                color:#999999;
                border: 1px solid #999999;
            }
        }
    }
    .type1{
        .app-card{
            border-radius: 0.1rem;
            width:2.2rem;
            height: 3rem;
            // background: #f5f7fa;
            background: url("../../assets/imgs/appbg_normal.png") no-repeat center/100% 100%;
            .logo{
                width:1.4rem;
                height:1.4rem;
                margin: 0.36rem 0.4rem -0.46rem;
                display: block;
                position: relative;
                top: -.7rem;
            }
            .name{
                width: 100%;
                font-size: 0.26rem;
                line-height: .26rem;
                color:#333;
                font-weight: bold;
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
            height: 2.3rem;
            margin-top: 1rem;
            background: url("../../assets/imgs/common/appcard/bg_appcard1.png") no-repeat center/100% 100%;
            .vip-pay{
                color: #edae63;
                width: 100%;
                font-size: 0.26rem;
                opacity: 0.8;
                overflow: hidden;  /*超出部分隐藏*/
                white-space: nowrap;  /*禁止换行*/
                text-overflow: ellipsis; /*省略号*/
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                -webkit-justify-content: center;
                align-items:flex-end;
                -webkit-align-items: flex-end;
                .symbol{
                    height:0.25rem;
                }
                .price{
                    color:#edae63;
                    font-size: 0.36rem;
                    font-weight: bold;
                }
            }
            .originprice{
                width: 100%;
                font-size: 0.21rem;
                opacity: 0.8;
                overflow: hidden;  /*超出部分隐藏*/
                white-space: nowrap;  /*禁止换行*/
                text-overflow: ellipsis; /*省略号*/
                color:#999999;
                text-decoration: line-through
            }
        }
        .marginRight{
            margin-right: 0.10rem
        }
        .wrap{
            margin-top: 0.1rem;
        }
    }
    .type2{
        width: 6.75rem;
        border-bottom: 1px solid #f0f0f0;
        .app-card{
            overflow: hidden;
            width: 100%;
            height: 1.4rem;
            display: flex;
            display: -webkit-flex; 
            justify-content: flex-start;
            -webkit-justify-content: flex-start;
            align-items:center;
            -webkit-align-items: center;
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
                display: -webkit-flex; 
                flex-direction: column;
                justify-content: flex-start;
                -webkit-justify-content: flex-start;
                align-items:flex-start;
                -webkit-align-items: flex-start;
                .title{
                    padding: 0.19rem 0 0.16rem 0;
                    display: flex;
                    display: -webkit-flex; 
                    justify-content: center;
                    -webkit-justify-content: center;
                    align-items:flex-start;
                    -webkit-align-items: flex-start;
                    // height:0.25rem;
                    .name{
                        font-size: 0.3rem;
                        color:#68676d;
                        font-weight: bold;
                        // overflow: hidden;  /*超出部分隐藏*/
                        white-space: nowrap;  /*禁止换行*/
                        // text-overflow: ellipsis; /*省略号*/
                    }

                }
                .pay{
                    display: flex;
                    align-items: flex-end;
                    text-align: left;
                    .symbol{
                        width: 1rem;
                        margin-top: 0.05rem;
                    }
                    .half-price{
                        font-size: 0.36rem;
                        font-weight: bold;
                        color:#f1c08a;
                        line-height: .36rem;
                        align-self: flex-end;
                    }
                    .half-unit{
                        font-size: 0.26rem;
                        line-height: .29rem;
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
                background-color:#fdf6e6;
                color:#edae63;
                border-radius: 0.62rem;
            }
        }
    }
    .line-through{
        text-decoration:line-through;
    }
    .superscript_vip{
        position: relative;
    }
    .superscript_vip:after{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: .61rem;
        height: .28rem;
        background:url("../../assets/imgs/common/appcard/superscript_appcard_vip.png") no-repeat center/100%;
    }
</style>